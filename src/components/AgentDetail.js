import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAgent } from '../services/agentService';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function AgentDetail() {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAgent = async () => {
      setIsLoading(true);
      try {
        const data = await getAgent(parseInt(id));
        setAgent(data);
      } catch (error) {
        console.error('Error fetching agent:', error);
        // エラー処理、例えばエラーメッセージを表示
      } finally {
        setIsLoading(false);
      }
    };
    fetchAgent();
  }, [id]);

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  if (!agent) {
    return <div>Agent not found.</div>;
  }

  return (
    <div className="agent-detail">
      <h2>{agent.name}</h2>
      <p>{agent.area}</p>
      <p>{agent.tel}</p>
      {agent.description && <p>{agent.description}</p>}
      {agent.email && <p>{agent.email}</p>}
      {agent.image && <img src={agent.image} alt={agent.name} />}
      {agent.lat && agent.lng && (
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
      )}
    </div>
  );
}

export default AgentDetail;