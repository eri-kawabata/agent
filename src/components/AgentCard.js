import React from 'react';
import { Link } from 'react-router-dom';

function AgentCard({ agent, isFavorite, onToggleFavorite }) {
  return (
    <li className="agent-card">
      <Link to={`/agent/${agent.id}`}>
        {agent.image && <img src={agent.image} alt={agent.name} />}
        <h2>{agent.name}</h2>
        <p>{agent.area}</p>
        <p>{agent.tel}</p>
      </Link>
      <button onClick={() => onToggleFavorite(agent.id)}>
        {isFavorite ? 'お気に入りから削除' : 'お気に入りに追加'}
      </button>
    </li>
  );
}

export default AgentCard;