import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ViewListSearch from './page/viewListSearch/viewListSearch';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ViewListSearch />}/>
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}