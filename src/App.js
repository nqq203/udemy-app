import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from 'react-query'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SignUp from './page/SignUp/SignUp';
import SignIn from './page/SignIn/SignIn';
import Cart from './page/Cart/Cart';
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" />
          <Route path="/sign-up" element={<SignUp />}/>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}