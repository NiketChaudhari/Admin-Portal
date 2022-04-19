import React from 'react';
import "./styles.css"
import { Routes, Route } from "react-router-dom";
import LOGIN from "./pages/LOGIN";
import DASHBOARD from "./pages/DASHBOARD";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LOGIN />} />
      <Route path="/DASHBOARD" element={<DASHBOARD />} />
    </Routes>
  );
}

export default App;






