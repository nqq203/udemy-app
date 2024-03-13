import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';


import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import ProductDetail from "./pages/ProdDetailPage/ProductDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" />
          <Route path="/detail" element={<ProductDetail></ProductDetail>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
