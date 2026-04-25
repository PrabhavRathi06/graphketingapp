const BASE_URL='https://jsonplaceholder.typicode.com/comments';

export const fetchComments = async(page=1)=>{
 const response = await fetch(
  `${BASE_URL}?_page=${page}&_limit=10`
 );

 if(!response.ok){
   throw new Error('Failed to fetch comments');
 }

 return response.json();
};
