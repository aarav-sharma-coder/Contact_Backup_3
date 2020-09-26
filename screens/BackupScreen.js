import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

export default class WelcomeScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            date:"",
            userId:firebase.auth().currentUser.email,
        }
    }
    sendNotification = () => {
        //to get the first name and last name
        db.collection("users")
          .where("email_id", "==", this.state.userId)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              var name = doc.data().first_name;
              var lastName = doc.data().last_name;
    
              // to get the donor id and book nam
              db.collection("Notifications")
                .get()
                .then((snapshot) => {
                  snapshot.forEach((doc) => {
                   date= doc.data().date;
    
                    //targert user id is the donor id to send notification to the user
                    db.collection("Notifications").add({
                      message:
                        "Last backup:"+ date,
                    });
                  });
                });
            });
          });
      };
    render(){
        return(
            <View style={styles.container} >
        <MyHeader title="Backup Screen" navigation={this.props.navigation}/>
        <View style={styles.formContainer}>
            <TouchableOpacity
            style = {styles.Button}
            onPress={() => this.sendNotification(),
                this.backup()
            }
            >
                <Text style={styles.buttonText}>Backup</Text>
            </TouchableOpacity>
            <View>
                <TouchableOpacity
                style={styles.button}
                onPress={this.send()}
                >
                 <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:"#6fc0b8"
    },
    formContainer:{
      flex: 0.88,
      justifyContent:'center'
    },
    button: {
        width: "80%",
        height: RFValue(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(25),
        backgroundColor: "#ffff",
        shadowColor: "#000",
        marginBottom:RFValue(10),
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10.32,
        elevation: 16,
      },
      buttonText: {
        color: "#32867d",
        fontWeight: "200",
        fontSize: RFValue(20),
      },
})