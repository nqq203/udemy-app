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

const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <QueryProvider client={queryClient}>
        <Header />
        <main>
          <Routes>
            <Route path="/" />
            <Route path="/sign-up" element={<SignUp />}/>
          </Routes>
        </main>
        <Footer/>
      </QueryProvider> 
    </BrowserRouter>
  );
}