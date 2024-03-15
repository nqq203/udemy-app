import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SignUp from './page/SignUp/SignUp';
import InstructorCourse from './page/Course/InstructorCourse';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" />
          <Route path="/sign-up" element={<SignUp />}/>
          <Route path="/instructor/courses" element={<InstructorCourse />}/>
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}