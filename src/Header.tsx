import React from 'react';

interface HeaderProps {
  activeView: string;
}

export const Header: React.FC<HeaderProps> = ({ activeView }) => {
  return (
    <div className="header">
      <div className="header-title">
        {activeView === 'dashboard' && 'Security Dashboard'}
        {activeView === 'vulnerability' && 'Vulnerability Hub'}
        {activeView === 'ai-pentesting' && 'AI Pentesting Engine'}
        {activeView === 'patch' && 'Patch Management'}
        {activeView === 'team' && 'Team & Assets'}
        {activeView === 'reports' && 'Reports'}
        {activeView === 'settings' && 'Settings'}
      </div>
      <div className="header-right">
        <select className="lang-selector">
          <option>GB English</option>
          <option>ES Español</option>
          <option>FR Français</option>
        </select>
        <div className="theme-toggle">🌙</div>
        <div className="user-profile">
          <div className="avatar">AD</div>
          <span>Admin User</span>
        </div>
      </div>
    </div>
  );
};