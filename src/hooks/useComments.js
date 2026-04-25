import {useState,useEffect} from 'react';
import {fetchComments} from '../api/commentsApi';

export default function useComments(){

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

  setError(null);

  const data=await fetchComments(pageNumber);

  if(data.length===0){
    setHasMore(false);
  }else{
    setComments(prev =>
      isPagination
      ? [...prev,...data]
      : data
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

const retry=()=>{
 setPage(1);
 setHasMore(true);
 loadComments(1);
};

return{
comments,
loading,
error,
loadingMore,
loadMore,
retry
};

}