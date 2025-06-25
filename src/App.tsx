import './styles/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Map from './pages/Map';
import Characters from './pages/Characters';
import CharacterDetailPage from './pages/CharacterDetail';
import Nations from './pages/Nations';
import Aircrafts from './pages/Aircrafts';
import TimeLine from './pages/TimeLine';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:slug" element={<CharacterDetailPage />} />
            <Route path="/nations" element={<Nations />} />
            <Route path="/aircrafts" element={<Aircrafts />} />
            <Route path="/timeline" element={<TimeLine />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
