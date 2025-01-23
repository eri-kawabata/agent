import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';
import AgentList from './components/AgentList';
import AgentDetail from './components/AgentDetail';
import { getAgents } from './services/agentService'; // 修正済み

function App() {
  const [agents, setAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]); // お気に入り状態を管理する state

  useEffect(() => {
    const fetchAgents = async () => {
      const data = await getAgents();
      setAgents(data);
    };
    fetchAgents();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleFavorite = (agentId) => {  // お気に入り状態を更新する関数
    if (favorites.includes(agentId)) {
      setFavorites(favorites.filter((id) => id !== agentId));
    } else {
      setFavorites([...favorites, agentId]);
    }
  };

  return (
    <BrowserRouter> {/* BrowserRouter で囲む */}
      <div className="App">
        <h1>不動産エージェント検索</h1>
        <SearchBar onSearch={handleSearch} />
        <Routes> {/* Routes でルーティングを定義 */}
          <Route 
            path="/" 
            element={
              <AgentList 
                agents={filteredAgents} 
                favorites={favorites}  // favorites を渡す
                onToggleFavorite={handleToggleFavorite}  // onToggleFavorite を渡す
              />
            } 
          />
          <Route path="/agent/:id" element={<AgentDetail />} /> {/* エージェント詳細ページのルート */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;