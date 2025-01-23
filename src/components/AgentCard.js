import React from 'react';
import { Link } from 'react-router-dom'; // Link をインポート

function AgentCard({ agent, isFavorite, onToggleFavorite }) { // props を追加
  return (
    <li>
      <Link to={`/agent/${agent.id}`}> {/* Link でエージェント詳細ページに遷移 */}
        <h2>{agent.name}</h2>
      </Link>
      <p>{agent.area}</p>
          <p>{agent.tel}</p>
           <button onClick={() => onToggleFavorite(agent.id)}> {/* お気に入りボタン */}
        {isFavorite ? 'お気に入りから削除' : 'お気に入りに追加'}
      </button>
    </li>
  );
}

export default AgentCard;