import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Ticker from './components/Ticker';
import Footer from './components/Footer';

// 14 Core Pages of BullRix AI 2.0
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import IndiaMarkets from './pages/IndiaMarkets';
import GlobalMarkets from './pages/GlobalMarkets';
import StockDetails from './pages/StockDetails';
import AIPredictionCenter from './pages/AIPredictionCenter';
import Chat from './pages/Chat';
import NewsIntelligence from './pages/NewsIntelligence';
import CompanyResearch from './pages/CompanyResearch';
import DocumentIntelligence from './pages/DocumentIntelligence';
import Watchlist from './pages/Watchlist';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';

// Legal & Reference Pages (Preserved)
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import AIDisclaimer from './pages/AIDisclaimer';
import LegalDisclaimer from './pages/LegalDisclaimer';

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error('App ErrorBoundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#101B2B] text-white flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FF5C75]/15 border border-[#FF5C75]/30 flex items-center justify-center text-[#FF5C75] mb-4">
            !
          </div>
          <h1 className="text-2xl font-bold mb-2">Error Loading BullRix Module</h1>
          <p className="text-xs text-[#8E9CAE] max-w-md mb-6">
            The application encountered an unexpected runtime state. You can reload the workspace safely.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary !px-6 !py-2.5 text-xs font-bold"
          >
            Reload Platform
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ErrorBoundary>
          <div className="min-h-screen bg-[#101B2B] text-[#F3F5F7] flex flex-col relative overflow-x-hidden font-sans">
            <Navbar />
            <Ticker />

            <main className="relative z-10 flex-1">
              <Routes>
                {/* 1. Landing Page */}
                <Route path="/" element={<LandingPage />} />

                {/* 2. Authentication */}
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/login" element={<AuthPage />} />

                {/* 3. Main Dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* 4. Indian Markets */}
                <Route path="/markets/india" element={<IndiaMarkets />} />

                {/* 5. Global Markets */}
                <Route path="/markets/global" element={<GlobalMarkets />} />

                {/* 6. Stock Details */}
                <Route path="/stock/:id" element={<StockDetails />} />

                {/* 7. AI Prediction Center */}
                <Route path="/predictions" element={<AIPredictionCenter />} />

                {/* 8. AI Research Chatbot */}
                <Route path="/chat" element={<Chat />} />

                {/* 9. News Intelligence */}
                <Route path="/news" element={<NewsIntelligence />} />

                {/* 10. Company Research */}
                <Route path="/research" element={<CompanyResearch />} />

                {/* 11. Document Intelligence */}
                <Route path="/documents" element={<DocumentIntelligence />} />

                {/* 12. Watchlist */}
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/bookmarks" element={<Watchlist />} />

                {/* 13. User Profile */}
                <Route path="/profile" element={<UserProfile />} />

                {/* 14. Settings */}
                <Route path="/settings" element={<Settings />} />

                {/* Preserved Legal & Meta Routes */}
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
      </AuthProvider>
    </Router>
  );
}

export default App;
