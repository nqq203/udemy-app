import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import styled from 'styled-components';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './page/homepage/homepage';
import SignUp from './page/SignUp/SignUp';
import InstructorCourse from './page/CreateCourse/InstructorListCourse/InstructorCourse';
import InstructorCreateCourse from './page/CreateCourse/InstructorListCourse/InstructorCreateCourse';
import InstructorLayout from './page/CreateCourse/InstructorLayout';
import InstructorStatistic from './page/CreateCourse/InstructorListCourse/InstructorStatistic';
import SignIn from './page/SignIn/SignIn';
import ShoppingCart from './page/ShoppingCart/ShoppingCart';
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
import ProductDetail from "./pages/ProdDetailPage/ProductDetail";
import Lecture from './page/lecture/lecture';
import { AuthProvider } from './context/AuthContext';
import CourseDetail from "./page/courseDetail/CourseDetail";


const queryClient = new QueryClient();

export default function App() { 
  return (
    <AuthProvider>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />}/>
            <Route path="/view-list-courses" element={<ViewListSearch />}/>
            <Route path="/view-lecture" element={<Lecture />}/>
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/detail" element={<CourseDetail/>} />
            <Route path="/instructor" element={<InstructorLayout />} >
              <Route path="courses" index element={<InstructorCourse />}/>
              <Route path="create" element={<InstructorCreateCourse />}/>
              <Route path="statistics" element={<InstructorStatistic />} />
            </Route>
            <Route path="/profile">
              <Route path="info" element={<ProfileInfo />} />
              <Route path="photo" element={<ProfilePhoto />} />
              <Route path="privacy" element={<ProfilePrivacy />} />
            </Route>
            <Route path="cart" element={<Cart />} />
            <Route path="payment" element={<Payment />} />
            <Route path="my-courses">
              <Route path="learning" element={<MyCourses />} />
              <Route path="wishlist" element={<MyWishList />} />
              <Route path="archived" element={<MyArchived />} />
              <Route path="learning-tools" element={<MyLearningTools />} />
            </Route>
          </Routes>
        </MainContent>
        <Footer/>
        </AppWrapper>
      </QueryClientProvider> 
    </BrowserRouter>
    </AuthProvider>
  );
}

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  // Apply necessary padding or margins as needed for your layout
`;