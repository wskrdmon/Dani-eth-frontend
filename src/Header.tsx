import React, { useState } from 'react';

interface HeaderProps {
  activeView: string;
  toggleSidebar: () => void; // Declaramos la función
}

// AQUÍ ESTABA EL ERROR: Faltaba recibir "toggleSidebar" al lado de "activeView"
export const Header: React.FC<HeaderProps> = ({ activeView, toggleSidebar }) => {
  // Estado para controlar el menú del perfil
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Diccionario para títulos más limpio
  const viewTitles: Record<string, string> = {
    'dashboard': 'Security Dashboard',
    'vulnerability': 'Vulnerability Hub',
    'ai-pentesting': 'AI Pentesting Engine',
    'patch': 'Patch Management',
    'team': 'Team & Assets',
    'reports': 'Reports',
    'settings': 'Settings'
  };

  return (
    <div className="header">
      
      {/* Envolvemos la hamburguesa y el título en un flex para alinearlos */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        
        {/* ESTE ES EL BOTÓN HAMBURGUESA QUE FALTABA */}
        <button className="hamburger-btn" onClick={toggleSidebar}>
          ☰
        </button>

        <div className="header-title">
          {/* BREADCRUMBS */}
          <span style={{ color: '#8b92a8', fontSize: '0.85em', marginRight: '8px', fontWeight: 'normal' }}>
            Dani-ETH /
          </span>
          {viewTitles[activeView]}
        </div>
      </div>

      <div className="header-right">
        
        {/* SELECTOR DE IDIOMAS */}
        <select className="lang-selector">
          <option>GB English</option>
          <option>ES Español</option>
          <option>FR Français</option>
          <option>DE Deutsch</option>
        </select>
        
        {/* TOGGLE DE TEMA */}
        <div className="theme-toggle">🌙</div>

        {/* NOTIFICACIONES */}
        <div 
          className="notifications" 
          style={{ 
            position: 'relative', cursor: 'pointer', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', padding: '0 8px'
          }}
        >
          <span style={{ fontSize: '20px' }}>🔔</span>
          <span style={{
            position: 'absolute', top: '-5px', right: '0px', background: '#ef4444', 
            color: 'white', fontSize: '10px', fontWeight: 'bold', padding: '2px 5px', 
            borderRadius: '50%'
          }}>
            3
          </span>
        </div>

        {/* PERFIL DE USUARIO */}
        <div 
          className="user-profile" 
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          style={{ position: 'relative', cursor: 'pointer' }}
        >
          <div className="avatar">AD</div>
          <span>Admin User</span>

          {/* MENÚ DESPLEGABLE */}
          {isProfileOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 15px)', right: '0',
              background: '#0A0E17', border: '1px solid #1A1F2E', borderRadius: '8px',
              padding: '8px 0', minWidth: '180px', zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }}>
              <div style={{ padding: '10px 16px', color: '#8b92a8', cursor: 'pointer' }} className="nav-item">👤 Mi Perfil</div>
              <div style={{ padding: '10px 16px', color: '#8b92a8', cursor: 'pointer' }} className="nav-item">⚙️ Configuración</div>
              <div style={{ padding: '10px 16px', color: '#8b92a8', cursor: 'pointer' }} className="nav-item">❓ Ayuda</div>
              <div style={{ borderTop: '1px solid #1A1F2E', margin: '4px 0' }}></div>
              <div style={{ padding: '10px 16px', color: '#ef4444', cursor: 'pointer' }} className="nav-item">🚪 Cerrar Sesión</div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};