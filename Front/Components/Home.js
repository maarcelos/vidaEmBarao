import { StyleSheet, Text, View, StatusBar} from 'react-native';
import Button from './Button';

export default function Home({navigation}) {
  return (

        <View style={styles.body}>
            <Button nav={navigation} text='Menu'></Button>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },

  body: {
    marginVertical: '10%',
    marginHorizontal: '10%'
  }
});
