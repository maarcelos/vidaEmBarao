import { StyleSheet, Text, View, AsyncStorage ,ScrollView, Pressable} from 'react-native';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { MENU_URL } from '@env';
import Day from './Day';


export default function Menu() {
  
  const [dia, setDia]= useState([])
  const [food, setFood] = useState([])
  const active= [true, false, false, false, false]

    const getDayNumber = (dataString)=>{
      const date = new Date(Date.parse(dataString))
      const nDay = date.getDate()

      return nDay
    }

    const getDayWeek = (dataString)=>{
      const daysOfWeek = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
      const date = new Date(Date.parse(dataString))
      const wDay = daysOfWeek[date.getDay()]

      return wDay
    }

    const handleActiveDay = (index, menu)=> {
      setDia((prevDia)=>{
          return prevDia.map(component => {
            return {...component, props : {...component.props, pressed : component.key == index ? true : false}}
          })
        })
      setFood(initializeFood(menu, index))
    }

    const initializeDay = (menu) => {
      return menu.map((day,index) =>(
          <Day key={index} dayWeek={getDayWeek(day['DATA'])} dayNumber={getDayNumber(day['DATA'])} pressed={active[index]} onPress={()=>handleActiveDay(index, menu)}></Day>
        ))
    }


    const initializeFood = (data, index) => {
      const firstDay = <ScrollView ontentContainerStyle={{ flex: 1 }}>
      <Text style={styles.sectionHeader}>Almoço</Text>
        <Text style={styles.item}>{data[index]["Almoço"]["PRATO PRINCIPAL"].toLowerCase()}</Text>
        <Text style={styles.item}>{data[index]["Almoço"]["GUARNICAO"].toLowerCase()}</Text>
        <Text style={styles.item}>{data[index]["Almoço"]["SALADA"].toLowerCase()}</Text>
        <Text style={styles.item}>{data[index]["Almoço"]["SOBREMESA"].toLowerCase()}</Text>
        <Text style={styles.item}>{data[index]["Almoço"]["SUCO"].toLowerCase()}</Text>
      <Text style={styles.sectionHeader}>Almoço Vegetariano</Text>
        <Text style={styles.item}>{data[index]["Almoço Vegano"]["PRATO PRINCIPAL"].toLowerCase()}</Text>
        <Text style={styles.item}>{data[index]["Almoço Vegano"]["GUARNICAO"].toLowerCase()}</Text>
        <Text style={styles.item}>{data[index]["Almoço Vegano"]["SALADA"].toLowerCase()}</Text>
        <Text style={styles.item}>{data[index]["Almoço Vegano"]["SOBREMESA"].toLowerCase()}</Text>
        <Text style={styles.item}>{data[index]["Almoço Vegano"]["SUCO"].toLowerCase()}</Text>
      <Text style={styles.sectionHeader}>Jantar</Text>
        <Text style={styles.item}>{data[index]["Jantar"]["PRATO PRINCIPAL"].toLowerCase()}</Text>
        <Text style={styles.item}>{data[index]["Jantar"]["GUARNICAO"].toLowerCase()}</Text>
        <Text style={styles.item}>{data[index]["Jantar"]["SALADA"].toLowerCase()}</Text>
        <Text style={styles.item}>{data[index]["Jantar"]["SOBREMESA"].toLowerCase()}</Text>
        <Text style={styles.item}>{data[index]["Jantar"]["SUCO"].toLowerCase()}</Text>
      <Text style={styles.sectionHeader}>Jantar Vegetariano</Text>
        <Text style={styles.item}>{data[index]["Jantar Vegano"]["PRATO PRINCIPAL"].toLowerCase()}</Text>
        <Text style={styles.item}>{data[index]["Jantar Vegano"]["GUARNICAO"].toLowerCase()}</Text>
        <Text style={styles.item}>{data[index]["Jantar Vegano"]["SALADA"].toLowerCase()}</Text>
        <Text style={styles.item}>{data[index]["Jantar Vegano"]["SOBREMESA"].toLowerCase()}</Text>
        <Text style={styles.item}>{data[index]["Jantar Vegano"]["SUCO"].toLowerCase()}</Text>
    </ScrollView>
      return firstDay
    }

    useEffect(()=>{
      fetch(MENU_URL)
      .then(response => response.json())
      .then(data => {
        setDia(initializeDay(data))
        setFood(initializeFood(data, 0))
      })
      .catch(error => {
        console.error(error);
      });
    }, []);


    return (
    <View style={styles.body}>
        <View style={styles.tableGrid}>
          <View style={styles.tableContent}>
            <Text style={styles.mainTitle}>Cardápio</Text>
            <View style={styles.dayWeeks}>
              {dia}
            </View>
              {food}
          </View>
        </View>
    </View>
  );
}

 
const styles = StyleSheet.create({
  
  body:{
    flex:1,
  },
  
  tableGrid:{
    flex:1,
    display: 'flex',

  },

  dayWeeks:{
    
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 10,
  },

  tableContent:{
    flex:1,
    paddingHorizontal: '5%',
  },


  mainTitle:{
    
    fontSize: 30,
    paddingTop: 10,
    paddingBottom: 20
  },

  item:{
    fontSize: 18,
    padding: 7
  },
  sectionHeader: {
    padding: 7,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  }
});
