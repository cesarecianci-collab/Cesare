import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import VINCheck from './pages/VINCheck'
import TuningLab from './pages/TuningLab'
import PartMarket from './pages/PartMarket'
import MijnGarage from './pages/MijnGarage'
import DynoDatabase from './pages/DynoDatabase'
import AankoopCoach from './pages/AankoopCoach'

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#0a0b0d' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vin-check" element={<VINCheck />} />
          <Route path="/tuning" element={<TuningLab />} />
          <Route path="/parts" element={<PartMarket />} />
          <Route path="/garage" element={<MijnGarage />} />
          <Route path="/dyno" element={<DynoDatabase />} />
          <Route path="/coach" element={<AankoopCoach />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
