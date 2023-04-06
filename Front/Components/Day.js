import { StyleSheet, Text, View, Pressable } from 'react-native';



export default function Day(props) {

  const {dayWeek, dayNumber, pressed, onPress} = props;


  return (

    <Pressable onPress={onPress}>
      <View style={[styles.container, pressed ? styles.press : styles.unpress]}>
        <Text style={pressed? styles.pressDayWeek : styles.unpress}>{dayWeek}</Text>
        <View style={[styles.circle, pressed ? styles.pressCircle : styles.unpress]}>
          <Text style={pressed? styles.pressDay : styles.unpress}>{dayNumber}</Text>
        </View>
      </View>
    </Pressable>
  )
}


const styles = StyleSheet.create({

    container:{
      display: 'flex',
      paddingTop: 5,
      paddingBottom: 3,
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 100,
      height: 80,
      width: 50
    },
    press:{
      backgroundColor:'#78bba4',
    },
    unpress:{},

    circle:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 45,
      width: 45,
      borderRadius: 45,
    },
    
    pressCircle: {
      backgroundColor: 'white',
      borderColor: '#78bba4'
    },

    pressDayWeek:{
      color: 'white',
    },
    pressDay:{
      color: '#78bba4',
      fontWeight: 'bold',
      fontSize : 20
    }
  
})
