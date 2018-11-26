import React from 'react';
import { Alert, Picker, View} from 'react-native';
import { Container, Textarea, Content, DatePicker,
    Text, Form, Item, Input, Right, Button, Card, CardItem } from 'native-base';
import CustomHeaderBack from "../components/Navigation/CustomHeaderBack";
import Modal from "react-native-modal";
import ModalContent from "../components/Navigation/ModalContent";
import Icon from 'react-native-vector-icons/FontAwesome';
import { handleItemCreation } from '../actions/createItemAction';

import styles from '../assets/style/ItemScreensStyle';

export default class CreateItemScreen extends React.Component {

    constructor(props) {
        super(props);    
        this.state = { chosenDate: new Date(),
            tipoItem: 'SIM' ,
            nomeInput: '',
            description: '',
            modalVisible: false };
        this.setDate = this.setDate.bind(this);
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    setTipo(tipo){
        this.setState({ tipoItem: tipo });
    }
    
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    goHome = () => {
        let {navigate} = this.props.navigation;
        console.log("aaa")

        navigate('Home');
    }
    handleCreateItem = () => {
        data = {
          typeItem: this.state.tipoItem,
          nameItem: this.state.nomeInput,
          descriptionItem: this.state.descriptionInput,
          dateItem: this.state.chosenDate,
        }

        const responseFunction = async (responseJSON) => {
            const result = responseJSON;

            if(result){
                // Works on both iOS and Android
                Alert.alert(
                    'Sucesso',
                    'Seu item foi criado!',
                    [
                        {text: 'OK', onPress:() => this.goHome()},
                    ],
                    { cancelable: false }
                    )
            }else{
                Alert.alert(
                    'Erro',
                    'Não foi possível completar a criação do item.',
                    [
                        {text: 'OK', onPress: console.log("ok")},
                    ],
                    { cancelable: false }
                    )
            }
        }

        result = handleItemCreation(data, responseFunction);

    };
    
    render() {
        let {navigate} = this.props.navigation;
        return (
            <Container>
                <CustomHeaderBack navigation={this.props.navigation} />

                <Content style={styles.formContainer}>
                    <Form>
                        <Text style={styles.welcomeTitle}>Criar Item</Text>
                        
                        <Picker
                            selectedValue={this.state.tipoItem}
                            onValueChange={(value) => this.setTipo(value)}>
                            <Picker.Item style={ styles.fontContainer } label="Simples" value="SIM" />
                            <Picker.Item style={ styles.fontContainer } label="Lembrete" value="LEM" />
                            <Picker.Item style={ styles.fontContainer } label="Tarefa" value="TAR" />                                
                        </Picker>

                        <Text></Text>
                        <Item last></Item>

                        <Input style={ styles.fontContainer } placeholder="Nome" 
                         onChangeText={(nomeInput) => this.setState({nomeInput})} />
                        <Item last></Item>

                        <Text></Text>
                        <Textarea style={ styles.fontContainer } placeholder="Descrição"
                         onChangeText={(descriptionInput) => this.setState({descriptionInput})}
                         rowSpan={5} cowSpan={5} bordered />
                       
                        <Item last>
                            <DatePicker style={ styles.fontContainer } placeHolderText="Data" onDateChange={this.setDate}/>
                        </Item>

                        <Button style={ styles.tags }
                        full onPress={() =>  this.setModalVisible(true) }>
                            <Text style={ styles.fontTags } >#Tags</Text>
                        </Button>

                        <Card>
                            <CardItem header bordered>
                                <Text></Text>
                            </CardItem>
                        </Card>
                        
                        <Modal isVisible={this.state.modalVisible}
                            onBackdropPress={ ()=> this.setModalVisible(false)}
                            onBackButtonPress={ ()=> this.setModalVisible(false)}>
                            <View style={ styles.modalContent }>
                                <View style={ styles.headerContainer }>
                                    <Text style={ styles.title }>Adicionar Tags</Text>
                                    <Right>
                                        <Button
                                        onPress={ ()=> this.setModalVisible(false)}
                                        transparent>
                                            <Icon name="close" />
                                        </Button>
                                    </Right>
                                </View>    
                                      
                                <ModalContent />
                                
                                <View style={styles.footerContainer}>        
                                    <Button style={styles.cancel} 
                                    onPress={ ()=> this.setModalVisible(false)}>
                                        <Text style={ styles.fontContainer }> Cancelar </Text>
                                    </Button>
                                    <Right>
                                        <Button style={styles.add}>
                                            <Text style={ styles.fontContainer }> Salvar </Text>
                                        </Button>
                                    </Right>
                                </View>
                            </View>
                        </Modal>

                        <Text></Text>

                        <View style={styles.footer}>        
                            <Button style={styles.cancel} 
                             onPress={() => navigate('Home')}>
                                <Text style={ styles.fontContainer }> Cancelar </Text>
                            </Button>
                            <Right>
                                <Button style={styles.add}
                                onPress={ this.handleCreateItem }>
                                    <Text style={ styles.fontContainer }> Salvar </Text>
                                </Button>
                            </Right>
                        </View>

                    </Form>
                </Content>
                
            </Container>

        );
    }
}

