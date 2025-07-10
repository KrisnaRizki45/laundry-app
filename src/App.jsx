import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Sidebar from './components/Sidebar';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
      <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<Register />} path="/register" />
          <Route element={<Sidebar />} path="/sidebar" />
      </Routes>
  );
}

export default App;
