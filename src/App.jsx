import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Ticker from './components/Ticker';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import StockDetails from './pages/StockDetails';
import Bookmarks from './pages/Bookmarks';
import Analysis from './pages/Analysis';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import AIDisclaimer from './pages/AIDisclaimer';
import LegalDisclaimer from './pages/LegalDisclaimer';

// Simple Error Boundary
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <div className="p-20 text-white text-center"><h1>Error Loading Dashboard</h1><button onClick={() => window.location.reload()}>Reload</button></div>;
    return this.props.children;
  }
}

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen bg-background text-white flex flex-col relative overflow-x-hidden">
          <Navbar />
          <Ticker />
          
          <main className="relative z-10 flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/stock/:id" element={<StockDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/ai-disclaimer" element={<AIDisclaimer />} />
              <Route path="/legal" element={<LegalDisclaimer />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
