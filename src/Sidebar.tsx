// src/components/layout/Sidebar.tsx
import React from 'react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <div className="sidebar">
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
    </div>
  );
};