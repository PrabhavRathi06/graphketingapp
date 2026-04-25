import React,{useState,useEffect} from 'react';
import {
FlatList,
ActivityIndicator
} from 'react-native';

import {fetchComments} from '../api/commentsApi';
import Loader from '../components/Loader';
import ErrorView from '../components/ErrorView';
import CommentCard from '../components/CommentCard';

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
   } else{
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
 if(loadingMore || !hasMore) return;

 const nextPage=page+1;
 setPage(nextPage);
 loadComments(nextPage,true);
};

const handlePress=(item)=>{
 navigation.navigate('CommentDetail',{
   comment:item
 });
};

const renderItem=({item})=>(
 <CommentCard
   item={item}
   onPress={handlePress}
 />
);

if(loading){
 return <Loader/>;
}

if(error){
 return <ErrorView onRetry={()=>loadComments(1)} />;
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
   loadingMore ? <ActivityIndicator/> : null
 }
/>
);

}