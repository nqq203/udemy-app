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
import HomePage from './page/homepage/homepage';
import SignUp from './page/SignUp/SignUp';

const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/sign-up" element={<SignUp />}/>
          </Routes>
        </main>
        <Footer/>
      </QueryClientProvider> 
    </BrowserRouter>
  );
}