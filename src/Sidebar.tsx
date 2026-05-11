// src/components/layout/Sidebar.tsx
import React from 'react';

// 1. Agregamos isOpen a las propiedades
interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isOpen: boolean; 
}

// 2. Recibimos isOpen en los parámetros
export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen }) => {
  return (
    // 3. LA MAGIA: Si isOpen es true, le inyecta la clase "open"
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="logo">
        <h1>🛡️ Dani-ETH</h1>
      </div>
      
      <div 
        className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
        onClick={() => setActiveView('dashboard')}
      >
        <div className="nav-icon">📊</div>
        Dashboard
      </div>
      
      <div 
        className={`nav-item ${activeView === 'vulnerability' ? 'active' : ''}`}
        onClick={() => setActiveView('vulnerability')}
      >
        <div className="nav-icon">🔍</div>
        Vulnerability Hub
      </div>
      
      <div 
        className={`nav-item ${activeView === 'ai-pentesting' ? 'active' : ''}`}
        onClick={() => setActiveView('ai-pentesting')}
      >
        <div className="nav-icon">🤖</div>
        AI Pentesting
      </div>
      
      <div 
        className={`nav-item ${activeView === 'patch' ? 'active' : ''}`}
        onClick={() => setActiveView('patch')}
      >
        <div className="nav-icon">🔧</div>
        Patch Management
      </div>
      
      <div 
        className={`nav-item ${activeView === 'team' ? 'active' : ''}`}
        onClick={() => setActiveView('team')}
      >
        <div className="nav-icon">👥</div>
        Team & Assets
      </div>
      
      <div 
        className={`nav-item ${activeView === 'reports' ? 'active' : ''}`}
        onClick={() => setActiveView('reports')}
      >
        <div className="nav-icon">📈</div>
        Reports
      </div>
      
      <div 
        className={`nav-item ${activeView === 'settings' ? 'active' : ''}`}
        onClick={() => setActiveView('settings')}
      >
        <div className="nav-icon">⚙️</div>
        Settings
      </div>
      
      <div style={{ marginTop: 'auto', padding: '20px', textAlign: 'center', color: '#8b92a8', fontSize: '12px' }}>
        v1.0.0
      </div>

    </div>
  );
};