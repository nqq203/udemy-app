import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Cart from './page/cart/cart';
import Payment from './page/payment/payment';
import MyCourses from './page/myLearning/myCourses';
import ProfileInfo from './page/profile/profileInfo';
import ProfilePhoto from './page/profile/profilePhoto';
import ProfilePrivacy from './page/profile/profilePrivacy';
import MyWishList from './page/myLearning/myWishList';
import MyArchived from './page/myLearning/myArchived';
import MyLearningTools from './page/myLearning/myLearningTools';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main> 
        <Routes>
          <Route path="/" />
          <Route path="profile">
            <Route path="info" element={<ProfileInfo />} />
            <Route path="photo" element={<ProfilePhoto />} />
            <Route path="privacy" element={<ProfilePrivacy />} />
          </Route>

          <Route path="cart" element={<Cart />} />
          <Route path="payment" element={<Payment />} />
          <Route path="my-courses">
            <Route path="learning" element={<MyCourses />} />
            <Route path="wishlist" element={<MyWishList />}/>
            <Route path="archived" element={<MyArchived />}/>
            <Route path="learning-tools" element={<MyLearningTools />} />
          </Route>
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}