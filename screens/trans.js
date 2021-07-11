import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
//c71 step 7 import firebase and firestore
import firebase from 'firebase';
import db from '../config';
//step 5 import permissions and bar code scanner
//step 6 npm install expo-permissions
export default class trans extends React.Component {
  constructor(){
    super();
    //step 7 lets define 3 states
    //three states to store camera permissions 
    //, is scanning is done , and store scanned data
    
    //step 12
    //button state normal when start and clicked when button is clicked
    //<barcodescanner comp automatocally scans , it has a prop called onBarCodeScanned
    //can write a function to read bar code

    //c70 step 4 add new states for bookid and studentid
    this.state= {
      hasCameraPermissions : null,
      scanned: false,
      sacnnedData: '',
      buttonState: 'normal',
      scannedBookId:'',
      scannedStudentId:'',
    }
  }
  //step 8 
  //function to get camera permissions
  //is async as can take time to get camera permissions

  //c70 step 5 
  // now pass button id for which button is pressed
  getCameraPermissions = async(id)=>{
    //askAsync() returns an object with status key
    //contaning status of permission
    //if permission granted then it becomes granted.
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status==="granted",
      sacnnedData: "Ready to scan",
      buttonState: id,
    })

  }
  //c71 create handle transaction
  //c71 create firestore db and npm install firebase and copy into config.js file 
  handleTransaction=async()=>{
    var transactionMessage;
    //c71 step 8 read from db 
    db.collection("books").doc(this.state.scannedBookId).get()
    .then((doc)=>{
      console.log(doc.data())
      
    })

  }
  //step 13 
  //function to read from bar code scanner
  //function automatically recives data and type
  //changed scanned to true, save scanned data and change button State back to normal
  handleBarcodeScanned= async(type,data)=>{
    
this.setState({
  scanned: true,
  sacnnedData: data,
  buttonState: 'normal'
})
  }
    render(){
      
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;
      //step 14 create barcode scanner tab 
      //if bar code scanned if already scanned then no need to scan again else scan.
    //  if(buttonState === 'clicked' && hasCameraPermissions){
      //c70  step 6 change as we dont have clicked any more
      if(buttonState !== 'normal' && hasCameraPermissions){
          return(
            <BarCodeScanner
            onBarCodeScanned={scanned? "no data": this.handleBarcodeScanned}
            />
          )
      }
      //step 15 rest will come in else if button state is normal
      else if(buttonState === 'normal'){
      //onpress of touchable opactity call get camera permisions
      //and then display if persmiison granted
      //now create new state button state 
  return (
    
    //c 69 step 1 create button for QR code scanning using TA
    //c6p step 2 add styling to button
    /* step 10  based on wheter permission 
    was granted we display text  using ternary operator*/
    //step 11 we need to display bar code scanner when button is pressed but 
    //how do we know button was pressed ??
    //lets create button state normal and clicked

    <View>
     
      <View>
        {/*C70 step3 add header  with image now lets change getCaeraPerms*/}
        <Image 
        source = {require('../assets/book.png')}
        style ={{width:200, height:200}}
        />
      </View>
       {/* c70 step2  create input boxes for bookID and student ID*/}
<View>
  
  <TextInput placeHolder="Book Id"
  value={this.state.scannedBookId}
  />
    <TouchableOpacity style={styles.button} onPress={()=>{
      this.getCameraPermissions("BookId")
    }}>
      <Text >Scan</Text>
    </TouchableOpacity>
</View>
<View>
  <TextInput placeHolder="Student Id"
  value={this.state.scannedStudentId}
  />
    <TouchableOpacity style={styles.button}
    onPress={()=>{
      this.getCameraPermissions("StudentId")
    }}
    >
      <Text >Scan</Text>
    </TouchableOpacity>
</View>
{/* c71 step1 create submit button */}
<View>
  <TouchableOpacity style = {styles.button} onPress={async()=>{
    alert("calling");
    this.handleTransaction()}}>
    <Text> Submit</Text>
    
  </TouchableOpacity>
</View>
      <View>
{/* not required in c70*/}
      </View>
      <Text> Borrow or Return a book</Text>
      {/* step 16 write the scanned data or show request camera permissions */}
      <Text>{
        hasCameraPermissions===true? this.state.sacnnedData: "Request Camera permisson"
      }
      </Text>
      {/*step 9 pnPress of  button call get camera permissions*/}
      <TouchableOpacity style={styles.submitButton} 
      onPress = {this.getCameraPermissions}>
          <Text style={styles.submitButtonText}> Scan QR code</Text>
      </TouchableOpacity >
      <StatusBar style="auto" />
    </View>
  );
    }
    }
}
//step 2 adding styling to button
//step 3 npm install expo-bar-code scanner
//step 4  sww bar code scanner doc 
const styles = StyleSheet.create({
    button: {
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
     
      width: 200,
      
      
    },
    submitButton:{
      backgroundColor: 'blue',
      width:100,
      height: 50
    },
    submitButtonText:{
      padding: 10,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: "bold",
      color: "white"
    }
  });