import React from 'react';
import AgentCard from './AgentCard';

function AgentList({ agents, favorites, onToggleFavorite }) { // props を追加
  return (
    <ul>
      {agents.map((agent) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          isFavorite={favorites.includes(agent.id)} // お気に入り状態を渡す
          onToggleFavorite={onToggleFavorite} // お気に入り状態を更新する関数を渡す
        />
      ))}
    </ul>
  );
}

export default AgentList;