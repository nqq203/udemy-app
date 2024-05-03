import React, { useRef } from 'react';
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
import InstructorReviews from './page/CreateCourse/InstructorReviews/InstructorReviews';
import SignIn from './page/SignIn/SignIn';
import ShoppingCart from './page/ShoppingCart/ShoppingCart';
import ViewListSearch from './page/viewListSearch/viewListSearch';
import Cart from './page/cart/cart';
import Payment from './page/payment/payment';
import MyCourses from './page/myLearning/myCourses';
import ProfileInfo from './page/profile/profileInfo';
import ProfilePhoto from './page/profile/profilePhoto';
import ProfilePrivacy from './page/profile/profilePrivacy';
import ProfilePurchaseHistory from './page/profile/profilePurchaseHistory';
import MyWishList from './page/myLearning/myWishList';
import MyArchived from './page/myLearning/myArchived';
import MyLearningTools from './page/myLearning/myLearningTools';
import Lecture from './page/lecture/lecture';
import { AuthProvider } from './context/AuthContext';
import CourseDetail from "./page/courseDetail/CourseDetail";
import PaymentSuccess from './page/payment/paymentSuccess';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Oauth from './page/Oauth/Oauth';
import EmailActivation from './page/EmailActivation/EmailActivation';
import ForgotPassword from './page/ForgotPassword/ForgotPassword';
import ResetPassword from './page/ResetPassword/ResetPassword';
import { ResetTv } from '@mui/icons-material'; import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaymentBuyNow from './page/payment/paymentBuyNow';
import { GlobalStyles } from './AppStyle';

const queryClient = new QueryClient();
const initialOptions = {
  clientId: "Ae7aB3Ho8RlhyOoOYcHPtAoPle_RkcwlsiLjMv95ilt8TQuQsvad25Xw_gbuWvj6bbTJEjzjcjlbOSDJ",
  currency: "USD",
  intent: "capture",
};

export default function App() {

  return (
    <AuthProvider>
      <GlobalStyles />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <PayPalScriptProvider options={initialOptions}>
            <AppWrapper>
              <Header />
              <MainContent>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/sign-in" element={<SignInWrapper />} />
                  <Route path="/sign-up" element={<SignUpWrapper />} />
                  <Route path="/forgot-password" element={<ForgotPasswordWrapper />} />
                  <Route path="/reset-password/:token" element={<ResetPassword />} />
                  <Route path="/view-list-courses" element={<ViewListSearch />} />
                  <Route path="/view-lecture" element={<Lecture />} />
                  <Route path="/shopping-cart" element={<ShoppingCart />} />
                  <Route path="/course-detail/:courseId" element={<CourseDetail />} />
                  <Route path="/instructor" element={<PrivateRoute element={InstructorLayout} />} >
                    <Route path="courses" index element={<InstructorCourse />} />
                    <Route path="create" element={<InstructorCreateCourse />} />
                    <Route path="statistics" element={<InstructorStatistic />} />
                    <Route path="reviews" element={<InstructorReviews />} />
                </Route>
                <Route path="profile">
                  <Route path="info" element={<PrivateRoute element={ProfileInfo} />} />
                  <Route path="photo" element={<PrivateRoute element={ProfilePhoto} />} />
                  <Route path="privacy" element={<PrivateRoute element={ProfilePrivacy} />} />
                  <Route path="payment-history" element={<PrivateRoute element={ProfilePurchaseHistory} />} />
                </Route>
                <Route path="cart" element={<PrivateRoute element={Cart} />} />
                <Route path="payment">
                  <Route path="checkout" element={<Payment />} /> 
                  <Route path="checkout/:id" element={<PaymentBuyNow />} />
                  <Route path="success" element={<PaymentSuccess />} />
                </Route>
                <Route path="my-courses">
                  <Route path="learning" element={<PrivateRoute element={MyCourses} />} />
                  <Route path="wishlist" element={<PrivateRoute element={MyWishList} />} />
                  <Route path="archived" element={<PrivateRoute element={MyArchived} />} />
                  <Route path="learning-tools" element={<PrivateRoute element={MyLearningTools} />} />
                </Route>
                <Route path="/oauth2/" element={<Oauth />}/>
                <Route path="/activate-account/:token" element={<EmailActivation />} />
              </Routes>
            </MainContent>
            <Footer/>
          </AppWrapper>
        </PayPalScriptProvider>
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

function SignInWrapper() {
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem('accessToken');
  return !!token || isAuthenticated ? <Navigate to="/" /> : <SignIn />;
}

function SignUpWrapper() {
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem('accessToken');
  return !!token || isAuthenticated ? <Navigate to="/" /> : <SignUp />;
}

function ForgotPasswordWrapper() {
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem('accessToken');
  return !!token || isAuthenticated ? <Navigate to="/" /> : <ForgotPassword />;
}
function PrivateRoute({ element }) {
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem('accessToken');
  const RouteElement = element;
  return !!token || isAuthenticated ? (
    <RouteElement />
  ) : (
    <Navigate to="/sign-in" replace />
  );
}