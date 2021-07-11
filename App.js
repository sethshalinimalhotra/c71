import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import trans from './screens/trans';
import search from './screens/search';


export default class App extends React.Component {
  render(){return (
   <AppContainer />
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
//c70 step 1 add the defaultNavigationOptions 
const TabNavigator = createBottomTabNavigator({
  Transaction: {screen: trans},
  Search: {screen: search},
},
{
  defaultNavigationOptions: (({navigation})=>({
    tabBarIcon: ({})=>{
      const routeName = navigation.state.routeName;
      if(routeName === 'Transaction'){
        return(
          <Image source={require('./assets/book.png')}
          style={{width:40, height:49}}/>
        )
      }
      else if(routeName=== 'Search'){
        return(
          <Image source={require('./assets/searchingbook.png')} 
          style={{width:40, height:49}}
          />
        )
      }
    }
  }))
  }
 /* , can show as an example
  {
    tabBarOptions:{
      activeTintColor: 'green',
      inactiveTintColor: 'blue',
    }
  } */
)

const AppContainer = createAppContainer(TabNavigator);