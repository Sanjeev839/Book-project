import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SearchContext } from './Context/Context';
import Layout from './Layout';
import Home from './components/Home/Home';
import Courses from './components/courses/Courses';
import Signup from './components/Signup';
import Contact from './components/Contact';
import About from './components/About';
import Add from './Add';

const App = () => {
  const { user } = useContext(SearchContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="course" element={user ? <Courses /> : <Navigate to="/signup" />} />
          <Route path="contact" element={user ? <Contact /> : <Navigate to="/signup" />} />
          <Route path="about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/add' element={user ? <Add /> : <Navigate to="/signup" />}/>
        </Route>
        
      </Routes>
    </Router>
  );
};

export default App;
