import { Pressable, StyleSheet, Text, View } from 'react-native';
import Arrow from './Arrow';
import { useNavigation } from '@react-navigation/native';


export default function Head() {

  const nav = useNavigation()
  return (
    <View style={styles.header}>
      <Pressable onPress={()=>nav.navigate('Home')}>
          <Arrow></Arrow>
      </Pressable>
      <Text style={styles.mainTitle}>Barão</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#78bba4',
        display: 'flex',
        justifyContent: 'center'
    
    },

    mainTitle:{
      alignSelf:'center',
      fontSize: 40,
      position: 'absolute'

      
    }


})
