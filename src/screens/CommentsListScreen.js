import React,{useCallback,useMemo} from 'react';
import {
FlatList,
ActivityIndicator
} from 'react-native';

import Loader from '../components/Loader';
import ErrorView from '../components/ErrorView';
import CommentCard from '../components/CommentCard';
import useComments from '../hooks/useComments';

export default function CommentsListScreen({navigation}) {

const {
comments,
loading,
error,
loadingMore,
refreshing,
loadMore,
retry,
onRefresh
}=useComments();

const handlePress=useCallback((item)=>{
navigation.navigate('CommentDetail',{
comment:item
});
},[navigation]);

const renderItem=useCallback(
({item})=>(
<CommentCard
 item={item}
 onPress={handlePress}
/>
),
[handlePress]
);

const memoizedComments=useMemo(
()=>comments,
[comments]
);

if(loading){
 return <Loader />;
}

if(error){
 return <ErrorView onRetry={retry} />;
}

return(
<FlatList
data={memoizedComments}
refreshing={refreshing}
onRefresh={onRefresh}
keyExtractor={(item)=>item.id.toString()}
renderItem={renderItem}
onEndReached={loadMore}
onEndReachedThreshold={0.5}
initialNumToRender={10}
maxToRenderPerBatch={10}
windowSize={5}
removeClippedSubviews
ListFooterComponent={
loadingMore
? <ActivityIndicator/>
: null
}
/>
);

}