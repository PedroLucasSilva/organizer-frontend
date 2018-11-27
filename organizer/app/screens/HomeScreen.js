import React from 'react';
import { Alert, Text, View, ListView, AsyncStorage, RefreshControl} from 'react-native';
import { Container, Content, List, ListItem, Button, CheckBox } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustumHeader from '../components/Navigation/CustomHeader';
import CustomFab from '../components/Navigation/CustumFab';
import { handleListItem } from '../actions/listItemAction';
import { handleItemDeletation } from '../actions/deleteItemAction';

import styles from '../assets/style/HomeScreenStyle';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      datas : [],
      basic: true,
      listViewData: [],
      modalVisible: false,
      textSearch: "",
      user: null,
      refreshing: false,
    };
  }

  setAlert(data){
    Alert.alert(
      data.nameItem,
      "Descrição: " + data.descriptionItem + "\nTipo: " + data.identifierItem 
      + "\nData: " + data.dateItem + "\nTags: ",
      [],
      { cancelable: true }
    )
  }
  
  deleteRow(data, secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
    
    const responseFunction = async (responseJSON) => {
      const result = responseJSON;
    }    
    result = handleItemDeletation(this.state.user.codEmail, data, responseFunction);
  }

  changeCSS(data) {
    if (data.identifierItem == 'SIM') {
      return  <ListItem style={ styles.SIM } onPress={() => this.setAlert(data) }>
                <Text style={ styles.textColor }> {data.nameItem} </Text>
              </ListItem>
    } else 
    if (data.identifierItem == 'LEM') {
      return  <ListItem style={ styles.LEM } onPress={() => this.setAlert(data) }>
                <Text style={ styles.textColor }> {data.nameItem}</Text>
              </ListItem>;
    } else {
      return  <ListItem style={ styles.TAR } onPress={() => this.setAlert(data) }>
                <CheckBox style={ styles.checkBoxFeatures } checked={false} />
                <Text style={ styles.textColor }>{data.nameItem}</Text>
              </ListItem>;
    }
  }
  
	//changes the search text
	//this method is called inside the CustomHeader component
	changeTextSearch = (strValue) => {
		this.setState({
			textSearch: strValue
		});
	}
	
	displayItem(data){
		//filter items by name
		if(data.nameItem.toLowerCase().indexOf(this.state.textSearch.toLowerCase()) > -1){
			return this.changeCSS(data);
		}else{
			return null;
		}
  }

  listItems = async () =>{
    const responseFunction = async (responseJSON) => {
      const result = responseJSON;
      this.setState({datas: result})
      this.setState({listViewData: this.state.datas});
  
    }
    result = handleListItem(this.state.user.codEmail, responseFunction);
  }

_onRefresh = () => {
    this.setState({refreshing: true});
    this.listItems().then(() => {
      this.setState({refreshing: false});
    });
  }

componentDidMount(){
  (async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      console.log(value)
      this.setState({ user: JSON.parse(value) });
     } catch (error) {
       // Error retrieving data
     }
  })().then(_ => this.listItems())
}

chooseUpdateScreen = (data) =>{
  let {navigate} = this.props.navigation;
  if(data.identifierItem === 'TAR'){
    navigate('UpdateTarefa');
  } else if (data.identifierItem === 'LEM'){
    navigate('UpdateLembrete');
  } else {
    navigate('UpdateSimples');
  }
}

saveItem = async (responseJSON) => {
  try {
    //console.log(responseJSON)
    await AsyncStorage.setItem("item", JSON.stringify(responseJSON));
  } catch (error) {
    // Error saving data
  }
}

handleEditItem = (item) => {
  this.saveItem(item).then(
  this.chooseUpdateScreen(item))
}

  render() {
  
    return (
      <Container style={styles.page}>
        
        <CustumHeader onPress={() =>this.props.navigation.openDrawer()} changeTextSearch = {this.changeTextSearch} />

        <Content>

          <Text></Text>

          <List
            refreshControl={
              <RefreshControl
                 refreshing={this.state.refreshing}
                 onRefresh={this._onRefresh}
              />
            }
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            
            renderRow={data =>
              <View>
                {this.displayItem(data)}
              </View> 
            }

            renderLeftHiddenRow={data =>
              <Button full onPress={_ => this.handleEditItem(data)}>
                <Icon active name="edit" />
              </Button>}

            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => this.deleteRow(data, secId, rowId, rowMap)}>
                <Icon active name="trash" />
              </Button>}
          />
          </Content>
        <CustomFab navigation={this.props.navigation}/>

      </Container>
    );
  }
}
