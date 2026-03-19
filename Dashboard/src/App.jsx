import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DataProvider } from './context/DataContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Results from './pages/Results';
import Demo from './pages/Demo';
import Team from './pages/Team';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

const AppContent = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 selection:bg-indigo-500/30 font-sans">
      <Navbar />
      <main className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/results" element={<Results />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;
