import { StyleSheet, Text, View, StatusBar, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Components/Home';
import Menu from './Components/Menu';
import Head from './Components/Head';




const Stack = createNativeStackNavigator()


export default function App() {
    
  return (
      
    <View style={[styles.container]}>
        <NavigationContainer>
        <Head></Head>

          <Stack.Navigator 
            initialRouteName='Home'>
        
          <Stack.Screen
            name='Home'
            component={Home}
            options={{headerShown: false}}/>
        
          <Stack.Screen
            name='Menu'
            component={Menu}
            options={{headerShown: false}}/>

          </Stack.Navigator>
        </NavigationContainer>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },

  
});
