<<<<<<< HEAD
import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { QueryProvider, QueryClient } from 'react-query';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SignUp from './page/SignUp/SignUp';
import HomePage from './page/homepage/homepage';
import ViewListSearch from './page/viewListSearch/viewListSearch';
import Cart from './page/cart/cart';
import Payment from './page/payment/payment';
import MyCourses from './page/myLearning/myCourses';
import ProfileInfo from './page/profile/profileInfo';
import ProfilePhoto from './page/profile/profilePhoto';
import ProfilePrivacy from './page/profile/profilePrivacy';
import MyWishList from './page/myLearning/myWishList';
import MyArchived from './page/myLearning/myArchived';
import MyLearningTools from './page/myLearning/myLearningTools';


const queryClient = new QueryClient();

=======
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';


import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import ProductDetail from "./pages/ProdDetailPage/ProductDetail";
>>>>>>> 22fe4fb167898c300f49645d271375aaa2c9149d

export default function App() {
  return (
    <BrowserRouter>
      <QueryProvider client={queryClient}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/sign-up" element={<SignUp />}/>
            <Route path="/view-list-courses" element={<ViewListSearch />}/>
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
            <Route path="/detail" element={<ProductDetail/>} />
          </Routes>
        </main>
        <Footer/>
      </QueryProvider>
    </BrowserRouter>
  );
}
