import React from 'react';
import './App.css';
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddTask" element={<AddTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;