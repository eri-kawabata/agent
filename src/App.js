import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';
import AgentList from './components/AgentList';
import AgentDetail from './components/AgentDetail';
import { getAgents } from './services/agentService';

function App() {
  const [agents, setAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      setIsLoading(true);
      try {
        const data = await getAgents();
        setAgents(data);
      } catch (error) {
        console.error('Error fetching agents:', error);
        // エラー処理、例えばエラーメッセージを表示
      } finally {
        setIsLoading(false);
      }
    };
    fetchAgents();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleToggleFavorite = (agentId) => {
    if (favorites.includes(agentId)) {
      setFavorites(favorites.filter((id) => id !== agentId));
    } else {
      setFavorites([...favorites, agentId]);
    }
  };

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <BrowserRouter>
      <div className="App">
        <h1>不動産エージェント検索</h1>
        <SearchBar onSearch={handleSearch} />
        {isLoading ? (
          <div className="loader">Loading...</div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <AgentList
                  agents={filteredAgents}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              }
            />
            <Route path="/agent/:id" element={<AgentDetail />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;