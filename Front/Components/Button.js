import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function Button(props) {
  return (
    <View>
    <Pressable onPress={()=>props.nav.navigate('Menu')} style={styles.button}>
        <Text style={styles.text}>{props.text}</Text>
    </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        height: 100,
        width: 100

    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    }

})
