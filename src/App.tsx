import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import StoriesPage from './pages/StoriesPage';
import FeaturesPage from './pages/FeaturesPage';
import PublicationsPage from './pages/PublicationsPage';
import ForumsPage from './pages/ForumsPage';
import VolunteerPage from './pages/VolunteerPage';
import AuthPage from './pages/AuthPage'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/forums" element={<ForumsPage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
           <Route path="/auth" element={<AuthPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
