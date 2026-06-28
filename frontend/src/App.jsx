import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import DocsPage from "./pages/DocsPage";
import BlogPage from "./pages/BlogPage";

import Dashboard from "./pages/Dashboard";
import Repositories from "./pages/Repositories";
import AIReviews from "./pages/AIReviews";
import HistoryPage from "./pages/HistoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* Marketing Pages */}
        <Route
          path="/features"
          element={<FeaturesPage />}
        />

        <Route
          path="/pricing"
          element={<PricingPage />}
        />

        <Route
          path="/docs"
          element={<DocsPage />}
        />

        <Route
          path="/blog"
          element={<BlogPage />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Repositories */}
        <Route
          path="/repositories"
          element={<Repositories />}
        />

        {/* AI Reviews */}
        <Route
          path="/reviews"
          element={<AIReviews />}
        />

        {/* History */}
        <Route
          path="/history"
          element={<HistoryPage />}
        />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={<LandingPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;