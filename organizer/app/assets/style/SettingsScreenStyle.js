import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
    page:{
      backgroundColor: "white",
    },
  
    container: {
      flex: 1, 
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
    },
  
    imgLogo: {
      flex: 1,
      width: 200,
      height: 200,
      resizeMode: "contain"
    },
  
    icon: {
      width: 24,
      height: 24,
    },
  
    title: {
      textAlign: "center",
      fontFamily: "gloria",
      fontSize: 25,
      alignItems: "center",
      color: "#000",
    },

    welcomeTitle: {
        fontSize: 25,
        textAlign: "center",
        fontFamily: "gloria",
        color: "#fff"
    },

    add:{
        backgroundColor: '#0fa400',
    },

    cancel:{
        backgroundColor: '#e25a00',
    },

    buttonContainer:{
        justifyContent: "center",
        alignItems: "center",
    },

    lineStyle:{
        width: "100%",
        borderBottomWidth: 1,
        borderColor:"black",
        margin:20,
    },

    linkTextStyle:{
        color:"red",
        fontFamily: "patrickH",
        fontSize: 17
    },

    footer:{
        flexDirection: "row",
    },

    modalContent: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },

    headerContainer: {
        top: 0,
        right: 0,
        left: 0,
        padding: 10,
        width: '100%',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        ...Platform.select({
          ios: {
            shadowColor: 'black',
            shadowOffset: { height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          android: {
            elevation: 10,
          },
        }),
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
    },

    footerContainer:{
        bottom: 0,
        padding: 12,
        width: '100%',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        ...Platform.select({
          ios: {
            shadowColor: 'black',
            shadowOffset: { height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          android: {
            elevation: 10,
          },
        }),
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
    },

    bodyContainer:{
      justifyContent: "center",
      alignItems: "center",
  },

  textColor: {
      color: "black",
      marginLeft: 8,    
      fontFamily: "patrickH",
      fontSize: 15,
  },

  inputStyle:{
      borderBottomColor: "black",
      borderBottomWidth: 1,
      fontFamily: "patrickH",
      fontSize: 20,
      width: '60%',
      color: "black",
      padding: 20,
  },

  });