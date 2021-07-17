 import React from 'react';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
 import { 
   SafeAreaView, 
   StyleSheet, 
   View, 
   Text,
   TextInput 
  } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
 import Icons from 'react-native-vector-icons/Ionicons';
//  import { AsyncStorage } from '@react-native-async-storage/async-storage';

import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'

 const colors={primary:"#8B0000", white:"#fff"};

 const App = () => {
   const [textInput,setTextInput]= React.useState('');
   const [todos,setTodos]= React.useState([]);

   React.useEffect(()=>{getTodosFromDevice();},[]);
   React.useEffect(()=>{saveTodoToUserDevice(todos);},[todos]);

   const ListItem = ({todo}) =>{
    return <View style={styles.listItem}>
      <View style={{flex:1}}>
        <Text 
        style={{
          fontWeight:'bold',
          fontSize:20,
          color:'black',
          textDecorationLine:todo?.completed ? "line-through":"none",
        }}>
        {todo?.task}
        </Text>
      </View>
      {!todo?.completed && (
        <TouchableOpacity style={styles.actionIcon} onPress={()=>markTodoComplete(todo?.id)}>
        <Icons name="checkmark" size={20} color={colors.white} />
        </TouchableOpacity>
      )}
      <TouchableOpacity 
      style={[styles.actionIcon,{backgroundColor:'red'}]} 
      onPress={()=>deleteTodo(todo?.id)}>
        <Icons name="trash" size={20} color={colors.white} />
      </TouchableOpacity>
    </View>;
   };

   const saveTodoToUserDevice = async (todos)=>{
    //  try {
    //    const stringifyTodos= JSON.stringify(todos);
    //    await AsyncStorage.setItem('todos',stringifyTodos);
    //  }catch(e)
    //  {console.log(e);}
    const stringifyTodos= JSON.stringify(todos);
    RNSecureStorage.set('todos', stringifyTodos, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
    .then((res) => {
    console.log(res);
    }, (err) => {
    console.log(err);
    });
   }

   const getTodosFromDevice = async () => {
    //  try{
    //    const todos = await AsyncStorage.getItem('todos');
    //    if(todos!=null){
    //      setTodos(JSON.parse(todos));
    //    }
    //  }catch(error){
    //    console.log(error);
    //  }
    RNSecureStorage.get('todos').then((values) => {
      setTodos(JSON.parse(values))
      }).catch((err) => {
      console.log(err)
      })
   }

   const addTodo = () => {
     if(textInput == "")
     {
       Alert.alert('Error','Can not be empty');
     }
     else
    {
      const newTodo={
        id:Math.random(),
        task:textInput,
        completed:false
      };
      setTodos([...todos,newTodo]);
      setTextInput('');
    }
   }

   const markTodoComplete = (todoId) => {
     const newTodos = todos.map(item=>{
       if(item.id==todoId) {
         return {...item, completed:true};
       }
       return item;
     });
     setTodos(newTodos);
   }

   const deleteTodo = (todoId) => {
     const newTodos = todos.filter(item => item.id!=todoId);
     setTodos(newTodos);
   }

   const clearTodo = () => {
     Alert.alert('Confirm','Clear all Todos?',[
       {
         text:"Yes",
         onPress:setTodos([])
       },
       {
         text:"No"
       }
      ]);
   }

   return <SafeAreaView style={{flex: 1, backgroundColor:'#FFFFE0'}}>
     <View style={styles.header}>
       <Text style={{fontWeight:'bold',fontSize:25,color:colors.primary}}>TODO App
       </Text>
       <Icons name="trash" size={25} color="red" onPress={clearTodo}/>
     </View>
     <FlatList 
     contentContainerStyle={{padding:20, paddingBottom:100}}
     showsVerticalScrollIndicator={false}
     data={todos} 
     renderItem={({item}) => <ListItem todo={item} />} 
     />
     <View style={styles.footer}>
       <View style={styles.inputContainer}>
         <TextInput 
          placeholder="Add todo" 
          value={textInput}
          onChangeText={text=> setTextInput(text)}
         />
       </View>
       <TouchableOpacity onPress={addTodo}>
       <View style={styles.iconContainer}>
         <Icons name="add" size={40} color="white" />
       </View>
       </TouchableOpacity>
     </View>
   </SafeAreaView>
 };
 
 const styles = StyleSheet.create({
   header:{
    padding:20,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
   },
   footer:{
     position:"absolute",
     bottom:0,
     color:colors.white,
     width:'100%',
     flexDirection:'row',
     alignItems:'center',
     paddingHorizontal:20,
   },
   inputContainer:{
     backgroundColor:"#EEE8AA",
     elevation:40,
     flex:1,
     height:50,
     marginVertical:20,
     marginRight:20,
     paddingHorizontal:20,
     borderRadius:40,
   },
   iconContainer:{
     backgroundColor:colors.primary,
     borderRadius:50,
     width:50,
     height:50,
     elevation:40,
     justifyContent:'center',
     alignItems:'center'
   },
   listItem:{
     padding:20,
     backgroundColor:'#FFFACD',
     flexDirection:'row',
     elevation:12,
     borderRadius:50,
     marginVertical:10
   },
   actionIcon:{
     height:25,
     width:25,
     backgroundColor:'green',
     justifyContent:'center',
     alignItems:'center',
     marginLeft:5,
     borderRadius:3,
   }
 });

 export default App;