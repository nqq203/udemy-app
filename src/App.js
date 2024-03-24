import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SignUp from './page/SignUp/SignUp';
import InstructorCourse from './page/CreateCourse/InstructorCourse';
import InstructorCreateCourse from './page/CreateCourse/InstructorCreateCourse';
import InstructorCourseLandingPage from './page/CreateCourse/InstructorCourseLandingPage';

export default function App() { 
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/login" />
          <Route path="/sign-up" element={<SignUp />}/>
          <Route path="/instructor/courses" element={<InstructorCourse />}/>
          <Route path="/instructor/courses/create" element={<InstructorCreateCourse />}/>
          
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}