import React,{useState,useEffect,useCallback} from 'react';
import {
View,
Text,
FlatList,
TouchableOpacity,
ActivityIndicator,
StyleSheet
} from 'react-native';

import {fetchComments} from '../api/commentsApi';

export default function CommentsListScreen({navigation}) {

const [comments,setComments]=useState([]);
const [page,setPage]=useState(1);
const [loading,setLoading]=useState(true);
const [loadingMore,setLoadingMore]=useState(false);
const [hasMore,setHasMore]=useState(true);
const [error,setError]=useState(null);

const loadComments=async(pageNumber=1,isPagination=false)=>{
 try{

   if(isPagination){
     setLoadingMore(true);
   }else{
     setLoading(true);
   }

   const data=await fetchComments(pageNumber);

   if(data.length===0){
      setHasMore(false);
   }else{
      setComments(prev =>
        isPagination ? [...prev,...data] : data
      );
   }

 }catch(err){
   setError('Something went wrong');
 }finally{
   setLoading(false);
   setLoadingMore(false);
 }
};

useEffect(()=>{
 loadComments();
},[]);

const loadMore=()=>{
 if(!loadingMore && hasMore){
   const nextPage=page+1;
   setPage(nextPage);
   loadComments(nextPage,true);
 }
};

const renderItem=({item})=>(
<TouchableOpacity
 style={styles.card}
 onPress={()=>
 navigation.navigate('CommentDetail',{
   comment:item
 })
 }
>
<Text style={styles.name}>
{item.name}
</Text>

<Text style={styles.email}>
{item.email}
</Text>

<Text
numberOfLines={2}
style={styles.body}
>
{item.body}
</Text>

</TouchableOpacity>
);

if(loading){
 return(
  <View style={styles.center}>
    <ActivityIndicator size="large"/>
  </View>
 );
}

if(error){
 return(
<View style={styles.center}>
<Text>{error}</Text>
</View>
);
}

return(
<FlatList
data={comments}
keyExtractor={(item)=>item.id.toString()}
renderItem={renderItem}
onEndReached={loadMore}
onEndReachedThreshold={0.5}
initialNumToRender={10}
maxToRenderPerBatch={10}
windowSize={5}
removeClippedSubviews
ListFooterComponent={
loadingMore ?
<ActivityIndicator/> : null
}
/>
);

}

const styles=StyleSheet.create({
center:{
flex:1,
justifyContent:'center',
alignItems:'center'
},
card:{
padding:16,
margin:10,
borderWidth:1,
borderRadius:8
},
name:{
fontWeight:'bold'
},
email:{
marginTop:4
},
body:{
marginTop:8
}
});