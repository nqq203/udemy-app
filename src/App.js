import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
x} from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SignUp from './page/SignUp/SignUp';
import InstructorCourse from './page/CreateCourse/InstructorListCourse/InstructorCourse';
import InstructorCreateCourse from './page/CreateCourse/InstructorListCourse/InstructorCreateCourse';
import InstructorLayout from './page/CreateCourse/InstructorLayout';
import InstructorStatistic from './page/CreateCourse/InstructorListCourse/InstructorStatistic';

export default function App() { 
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/login" />
          <Route path="/sign-up" element={<SignUp />}/>
          <Route path="/instructor" element={<InstructorLayout />} >
            <Route path="courses" index element={<InstructorCourse />}/>
            <Route path="create" element={<InstructorCreateCourse />}/>
            <Route path="statistics" element={<InstructorStatistic />} />
          </Route>
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}