import { useQuery } from 'react-query';

import CircularProgress from '@mui/material/CircularProgress';

import CourseList from './courseList';
import { MyCourseLoading } from "./myLearningStyle";
import { callApiGetOrderByUser } from '../../api/order';

const getOrders = async () => {
  const userId = localStorage.getItem('_id');
  const orders = await callApiGetOrderByUser(userId);
  return orders;
}

export default function MyCourses() {
  const orderQuery = useQuery('orders', getOrders);

  const orders = orderQuery.data;
  if(orders === undefined || !orders.success){
    return;
  }
  if(orderQuery.isLoading){
    return (
        <MyCourseLoading>
            <CircularProgress color="inherit" />
        </MyCourseLoading>
    );
  }

  var myCourses = [];
  const orderData = orders.metadata;
  for(var i = 0; i < orderData.length; i++){
    for(var j = 0; j < orderData[i].items.length; j++){
      myCourses.push(orderData[i].items[j].itemId);
    }
  }
 
  return (
    <CourseList courses={myCourses} />
  )
}