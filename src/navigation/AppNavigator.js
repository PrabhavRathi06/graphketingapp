import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CommentsListScreen from '../screens/CommentsListScreen';
import CommentDetailScreen from '../screens/CommentDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
 return (
   <Stack.Navigator>
      <Stack.Screen
        name="CommentsList"
        component={CommentsListScreen}
        options={{title: 'Comments'}}
      />

      <Stack.Screen
        name="CommentDetail"
        component={CommentDetailScreen}
      />
   </Stack.Navigator>
 );
}