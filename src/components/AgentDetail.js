import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAgent } from '../services/agentService';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function AgentDetail() {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getAgent(id);
        setAgent(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAgent();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!agent) {
    return <div>Agent not found.</div>;
  }

  return (
    <div>
      <h2>{agent.name}</h2>
      <p>{agent.area}</p>
      <p>{agent.tel}</p>
      {/* 必要に応じて他の情報を追加 */}
      <p>{agent.description}</p> {/* 例: エージェントの説明 */}
      <p>{agent.email}</p> {/* 例: エージェントのメールアドレス */}
      {agent.image && <img src={agent.image} alt={agent.name} />} {/* 例: エージェントの画像 */}
      <MapContainer center={[agent.lat, agent.lng]} zoom={13} style={{ height: '400px' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[agent.lat, agent.lng]}>
          <Popup>
            <h3>{agent.name}</h3>
            <p>{agent.area}</p>
            <p>{agent.tel}</p>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default AgentDetail;