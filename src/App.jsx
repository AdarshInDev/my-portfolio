import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Navbar from './components/layout/Navbar';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Projects from './pages/Projects';

import ScrollToTop from './components/utils/ScrollToTop';

import Feedback from './pages/Feedback';
import Music from './pages/Music';
import SecretDashboard from './pages/SecretDashboard';
import Skills from './pages/Skills';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/music" element={<Music />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/dashboard-secret-x9z" element={<SecretDashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
