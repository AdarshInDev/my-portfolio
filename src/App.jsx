import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";

import Music from "./components/layout/Music";

// Layout Components
import "../src/index.css";
import Contact from "./components/layout/Contact";
import Home from "./components/layout/Home";
import Navbar from "./components/layout/Navbar";
import Projects from "./components/layout/Projects";
import ProjectDetails from "./components/route_component/ProjectDetails";

// Enhanced ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force immediate scroll reset
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};

// Page transition component
const PageTransition = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset scroll position when component mounts
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

// Animated routes component with scroll handling adarsh
const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    // Reset scroll on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/music"
          element={
            <PageTransition>
              <Music />
            </PageTransition>
          }
        />
        <Route
          path="/projects"
          element={
            <PageTransition>
              <Projects />
            </PageTransition>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <PageTransition>
              <ProjectDetails />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-primary text-textPrimary">
        <Navbar />
        <main className="container mx-auto px-4 pt-16">
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;


