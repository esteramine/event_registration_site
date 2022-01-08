import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/auth';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from './pages/Home';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/register' element={<Register />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
