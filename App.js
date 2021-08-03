import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import {onError} from '@apollo/client/link/error'
import { StyleSheet, Text, View,ScrollView,TextInput,Button,Alert  } from 'react-native';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useMutation
} from "@apollo/client";

import { Dimensions } from 'react-native';
import { POST_JOB } from './mutation';

const windowWidth = Dimensions.get('window').width;

const client = new ApolloClient({
  uri: 'https://api.graphql.jobs/',
  cache: new InMemoryCache()
});

const errorLink  = onError(({graphqlErrors,networkError })=>{
  if(graphqlErrors){
      graphqlErrors.map(({message, location, path})=>{
          console.log($(message));  
      });
  }

});



function InputForm() {

  const[title,setTitle] = useState('');
  const[commitmentId,setCommiD] = useState('');
  const[companyName,setcompanyName] = useState('');
  const[locationName,setlocation] = useState('');
  const[userEmail,setEmail] = useState('');
  const[description,setDesc] = useState('');
  const[applyUrl,setUrl] = useState('');
  
  const [postJob,{error}] =  useMutation(POST_JOB); 

  const addJob = () =>{
    postJob({
       variables: {
           title: title,
           commitmentId: commitmentId,
           companyName: companyName,
           locationName: locationName,
           userEmail: userEmail,
           description: description,
           applyUrl: applyUrl,
  
       }
   })
    if(error){
      console.log(error);
      Alert.alert(
        "Error",
        "An Error Occured",
      );
    }
    else if(!error){
      Alert.alert(
      "Success",
      "Job Successfully Created",
      );
     
      setTitle('');
      setCommiD('');
      setcompanyName('');
      setlocation('');
      setEmail('');
      setDesc('');
      setUrl('');
    }
  };

  return(
      <View style={styles.container}>
      <Text style = {styles.mainHeading}  >Job Input File </Text>
      <ScrollView>
       <Text style = {styles.heading}  >Enter Title:</Text>

      <TextInput
        style = {styles.inputfield}
        placeholder = "e.g. Awais Chaudhary"
        onChangeText = {(val)=>setTitle(val)}
        value={title}

      />

       <Text style = {styles.heading}  >Enter Commitment ID:</Text>

      <TextInput
        style = {styles.inputfield}
        placeholder = "e.g. C1238AD13C84FL"
        onChangeText = {(val)=>setCommiD(val)}
        value={commitmentId}
      />

      <Text style = {styles.heading}  >Enter Company Name:</Text>

      <TextInput
        style = {styles.inputfield}
        placeholder = "e.g. Company Name"
        onChangeText = {(val)=>setcompanyName(val)}
        value={companyName}
      />
       <Text style = {styles.heading}  >Enter Location:</Text>

      <TextInput
        style = {styles.inputfield}
        placeholder = "e.g. Lahore"
        onChangeText = {(val)=>setlocation(val)}
        value={locationName}
      />

      <Text style = {styles.heading}  >Enter User Email:</Text>

      <TextInput
        style = {styles.inputfield}
        placeholder = "e.g. awais@gmail.com"
        onChangeText = {(val)=>setEmail(val)}
        value={userEmail}
      />
      <Text style = {styles.heading}  >Enter Description:</Text>

      <TextInput
        style = {styles.inputfield}
        placeholder = "e.g. React Native Development"
        onChangeText = {(val)=>setDesc(val)}
        value={description}

      />
      <Text style = {styles.heading}  >Enter Apply URL:</Text>

      <TextInput
        style = {styles.inputfield}
        placeholder = "e.g. https://www.google.com/"
        onChangeText = {(val)=>setUrl(val)}
        value={applyUrl}

      />

      <Text >Title : {title}</Text>

       </ScrollView>
      <Button style = {styles.button}
        title="Create Job"
        onPress={addJob}  
      />
      <StatusBar style="auto" />
    </View>
  );

}

export default function App() {
    
  return (
    <ApolloProvider client={client}>
      <InputForm/>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 25,
    paddingBottom: 15,
    paddingHorizontal: 18,
    //marginHorizontal: 10,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  mainHeading:{
    marginHorizontal: 10,
    marginTop:14,
  //  backgroundColor: "pink",
    fontSize: 24,

  },
  item: {
    marginTop: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    backgroundColor: "pink",
    fontSize: 20
  },
  heading: {
    marginHorizontal: 10,
    marginTop:10,
    fontSize: 14
  },
  button: {
    marginHorizontal: 10,
    margin:30,
    
  },
  inputfield: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    height: 45,
    width: windowWidth*0.85  }
});