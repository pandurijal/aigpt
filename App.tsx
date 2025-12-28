import React, { useMemo, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AiAdvisor from './components/AiAdvisor';
import Home from './pages/Home';
import Category from './pages/Category';
import ToolDetail from './pages/ToolDetail';
import { TOOLS_DATA } from './data';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Create context string for Gemini Advisor based on all tools
  const toolsContext = useMemo(() => {
    return TOOLS_DATA.map(t => `- ${t.name} (Kategori: ${t.category}): ${t.shortDescription}. Fitur: ${t.features.join(', ')}`).join('\n');
  }, []);

  // Only show search in header on non-home pages or if desired
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col font-sans text-neutral-900 bg-white">
      <Header onSearch={setSearchQuery} showSearch={true} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onSearchChange={setSearchQuery} searchQuery={searchQuery} />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/tool/:id" element={<ToolDetail />} />
        </Routes>
      </main>

      <Footer />
      <AiAdvisor toolsContext={toolsContext} />
    </div>
  );
}

export default App;