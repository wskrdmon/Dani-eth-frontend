// @ts-nocheck
import { Sidebar } from './Sidebar';
import React, { useState } from 'react';

const DaniETH = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [vulnDrawerOpen, setVulnDrawerOpen] = useState(false);
  const [selectedVuln, setSelectedVuln] = useState(null);
  const [aiAnalyticsOpen, setAiAnalyticsOpen] = useState(false);
  const [analyticsTab, setAnalyticsTab] = useState('patterns');
  const [patchTab, setPatchTab] = useState('network');
  const [vulnTab, setVulnTab] = useState('network');
  const [teamTab, setTeamTab] = useState('security');
  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState(null);
  const [currentPatchId, setCurrentPatchId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (title, message) => {
    setToastMessage({ title, message });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const openVulnDrawer = (cveId) => {
    setSelectedVuln(cveId);
    setVulnDrawerOpen(true);
  };

  const closeVulnDrawer = () => {
    setVulnDrawerOpen(false);
    setSelectedVuln(null);
  };

  const openReassignModal = (patchId) => {
    setCurrentPatchId(patchId);
    setReassignModalOpen(true);
  };

  const closeReassignModal = () => {
    setReassignModalOpen(false);
    setCurrentPatchId(null);
    setSelectedAssignee(null);
  };

  const confirmReassign = () => {
    if (!selectedAssignee) {
      showToast('No Selection', 'Please select a team member to reassign the patch');
      return;
    }
    
    const names = {
      'john': 'John Smith',
      'sarah': 'Sarah Johnson',
      'max': 'Max Quinn',
      'emily': 'Emily Chen'
    };
    
    showToast('Reassignment Successful', `Patch has been reassigned to ${names[selectedAssignee]}`);
    closeReassignModal();
  };

  return (
    <div style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          background: #0a0e17;
          color: #e4e6eb;
          overflow-x: hidden;
        }

        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          width: 260px;
          height: 100vh;
          background: #12161f;
          border-right: 1px solid #1e2533;
          padding: 24px 0;
          z-index: 100;
        }

        .logo {
          padding: 0 24px 32px;
          border-bottom: 1px solid #1e2533;
          margin-bottom: 24px;
        }

        .logo h1 {
          font-size: 24px;
          color: #00d4ff;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-item {
          padding: 14px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s;
          color: #8b92a8;
          border-left: 3px solid transparent;
        }

        .nav-item:hover {
          background: rgba(0, 212, 255, 0.1);
          color: #00d4ff;
          border-left-color: #00d4ff;
        }

        .nav-item.active {
          background: rgba(0, 212, 255, 0.1);
          color: #00d4ff;
          border-left-color: #00d4ff;
        }

        .nav-icon {
          font-size: 20px;
        }

        .main-container {
          margin-left: 260px;
          min-height: 100vh;
        }

        .header {
          height: 72px;
          background: #12161f;
          border-bottom: 1px solid #1e2533;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .header-title {
          font-size: 24px;
          font-weight: 600;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .lang-selector {
          padding: 8px 12px;
          background: #1a1f2e;
          border: 1px solid #2a3144;
          border-radius: 6px;
          color: #e4e6eb;
          cursor: pointer;
          font-size: 14px;
        }

        .theme-toggle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #1a1f2e;
          border: 1px solid #2a3144;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          transition: all 0.2s;
        }

        .theme-toggle:hover {
          background: #2a3144;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 16px;
          background: #1a1f2e;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .user-profile:hover {
          background: #2a3144;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00d4ff, #0066ff);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
        }

        .content {
          padding: 32px;
        }

        .card {
          background: #12161f;
          border: 1px solid #1e2533;
          border-radius: 12px;
          margin-bottom: 24px;
          overflow: hidden;
        }

        .card-header {
          padding: 20px 24px;
          border-bottom: 1px solid #1e2533;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-title {
          font-size: 18px;
          font-weight: 600;
        }

        .card-body {
          padding: 24px;
        }

        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #00d4ff, #0066ff);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 212, 255, 0.4);
        }

        .btn-secondary {
          background: #1a1f2e;
          color: #e4e6eb;
          border: 1px solid #2a3144;
        }

        .btn-secondary:hover {
          background: #2a3144;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
        }

        .table th {
          text-align: left;
          padding: 16px;
          background: #1a1f2e;
          color: #8b92a8;
          font-size: 13px;
          font-weight: 600;
          border-bottom: 1px solid #1e2533;
        }

        .table td {
          padding: 16px;
          border-bottom: 1px solid #1e2533;
          font-size: 14px;
        }

        .table tr:hover {
          background: rgba(0, 212, 255, 0.05);
        }

        .severity-badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
        }

        .severity-critical {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .severity-high {
          background: rgba(251, 146, 60, 0.2);
          color: #fb923c;
        }

        .severity-medium {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }

        .severity-low {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .tab {
          padding: 14px 24px;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.2s;
          color: #8b92a8;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
        }

        .tab.active {
          color: #00d4ff;
          border-bottom-color: #00d4ff;
        }

        .tab:hover {
          color: #00d4ff;
        }

        .drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 200;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }

        .drawer-overlay.active {
          opacity: 1;
          pointer-events: all;
        }

        .drawer {
          position: fixed;
          top: 0;
          right: -600px;
          width: 600px;
          height: 100vh;
          background: #12161f;
          box-shadow: -4px 0 24px rgba(0, 0, 0, 0.3);
          z-index: 201;
          transition: right 0.3s;
          overflow-y: auto;
        }

        .drawer.active {
          right: 0;
        }

        .drawer-header {
          padding: 24px;
          border-bottom: 1px solid #1e2533;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          background: #12161f;
          z-index: 10;
        }

        .drawer-title {
          font-size: 20px;
          font-weight: 600;
          color: #00d4ff;
        }

        .drawer-content {
          padding: 24px;
        }

        .close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #1a1f2e;
          border: 1px solid #2a3144;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 18px;
        }

        .close-btn:hover {
          background: #ef4444;
          border-color: #ef4444;
          color: white;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 300;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }

        .modal-overlay.active {
          opacity: 1;
          pointer-events: all;
        }

        .modal {
          background: #12161f;
          border-radius: 12px;
          border: 1px solid #1e2533;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          padding: 24px;
          border-bottom: 1px solid #1e2533;
        }

        .modal-title {
          font-size: 20px;
          font-weight: 600;
        }

        .modal-body {
          padding: 24px;
        }

        .modal-footer {
          padding: 24px;
          border-top: 1px solid #1e2533;
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .toast {
          position: fixed;
          top: 24px;
          right: 24px;
          background: #12161f;
          border: 1px solid #00d4ff;
          border-radius: 12px;
          padding: 16px 20px;
          min-width: 300px;
          box-shadow: 0 4px 24px rgba(0, 212, 255, 0.3);
          z-index: 400;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .toast-title {
          font-weight: 600;
          margin-bottom: 4px;
          color: #00d4ff;
        }

        .toast-message {
          font-size: 14px;
          color: #8b92a8;
        }

        code {
          background: #1a1f2e;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 13px;
        }
      `}</style>
      
      {/* Sidebar importado */}
        <Sidebar activeView={activeView} setActiveView={setActiveView} />



      {/* Main Container */}
      <div className="main-container">
        {/* Header */}
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
              <option>🇬🇧 English</option>
              <option>🇪🇸 Español</option>
              <option>🇫🇷 Français</option>
            </select>
            <div className="theme-toggle">🌙</div>
            <div className="user-profile">
              <div className="user-avatar">AD</div>
              <div>Admin User</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          {/* Dashboard View */}
          {activeView === 'dashboard' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', marginBottom: '24px' }}>
                {/* Risk Score Gauge */}
                <div className="card">
                  <div className="card-body" style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Risk Score</h3>
                    <div style={{ fontSize: '48px', fontWeight: '700', color: '#fb923c', marginBottom: '8px' }}>
                      6.8
                    </div>
                    <div style={{ fontSize: '14px', color: '#8b92a8' }}>MODERATE</div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  <div className="card">
                    <div className="card-body">
                      <div style={{ fontSize: '36px', fontWeight: '700', color: '#ef4444', marginBottom: '8px' }}>14</div>
                      <div style={{ fontSize: '14px', color: '#8b92a8' }}>Issues Críticos</div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div style={{ fontSize: '36px', fontWeight: '700', color: '#fb923c', marginBottom: '8px' }}>33</div>
                      <div style={{ fontSize: '14px', color: '#8b92a8' }}>Alta Prioridad</div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div style={{ fontSize: '36px', fontWeight: '700', color: '#10b981', marginBottom: '8px' }}>142</div>
                      <div style={{ fontSize: '14px', color: '#8b92a8' }}>Resueltos Este Mes</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Vulnerabilities */}
              <div className="card">
                <div className="card-header">
                  <div className="card-title">📋 Vulnerabilidades Recientes</div>
                  <button className="btn btn-secondary">Ver Todas</button>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>CVE ID</th>
                      <th>Descripción</th>
                      <th>Asset</th>
                      <th>Severidad</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ cursor: 'pointer' }} onClick={() => openVulnDrawer('CVE-2024-1234')}>
                      <td style={{ fontWeight: 600, color: '#00d4ff' }}>CVE-2024-1234</td>
                      <td>SQL Injection en autenticación</td>
                      <td>api.company.com</td>
                      <td><div className="severity-badge severity-critical">CRITICAL</div></td>
                      <td style={{ color: '#fb923c' }}>In Progress</td>
                    </tr>
                    <tr style={{ cursor: 'pointer' }} onClick={() => openVulnDrawer('CVE-2024-5678')}>
                      <td style={{ fontWeight: 600, color: '#00d4ff' }}>CVE-2024-5678</td>
                      <td>XSS en perfil de usuario</td>
                      <td>portal.company.com</td>
                      <td><div className="severity-badge severity-high">HIGH</div></td>
                      <td style={{ color: '#ef4444' }}>Open</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Vulnerability Hub View */}
          {activeView === 'vulnerability' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '4px' }}>Vulnerability Hub</h2>
                <div style={{ fontSize: '14px', color: '#8b92a8' }}>Gestión centralizada de vulnerabilidades detectadas</div>
              </div>

              {/* Vulnerability Tabs */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '2px solid #1e2533' }}>
                <div 
                  className={`tab ${vulnTab === 'network' ? 'active' : ''}`}
                  onClick={() => setVulnTab('network')}
                >
                  🌍 Network & Perimeter Infrastructure
                  <span style={{ marginLeft: '8px', fontSize: '12px', padding: '2px 8px', background: vulnTab === 'network' ? 'rgba(0, 212, 255, 0.2)' : 'rgba(139, 146, 168, 0.2)', borderRadius: '10px', color: vulnTab === 'network' ? '#00d4ff' : '#8b92a8' }}>12</span>
                </div>
                <div 
                  className={`tab ${vulnTab === 'applications' ? 'active' : ''}`}
                  onClick={() => setVulnTab('applications')}
                >
                  🌐 Applications & Web
                  <span style={{ marginLeft: '8px', fontSize: '12px', padding: '2px 8px', background: vulnTab === 'applications' ? 'rgba(0, 212, 255, 0.2)' : 'rgba(139, 146, 168, 0.2)', borderRadius: '10px', color: vulnTab === 'applications' ? '#00d4ff' : '#8b92a8' }}>23</span>
                </div>
                <div 
                  className={`tab ${vulnTab === 'servers' ? 'active' : ''}`}
                  onClick={() => setVulnTab('servers')}
                >
                  🖥️ Servers & Services
                  <span style={{ marginLeft: '8px', fontSize: '12px', padding: '2px 8px', background: vulnTab === 'servers' ? 'rgba(0, 212, 255, 0.2)' : 'rgba(139, 146, 168, 0.2)', borderRadius: '10px', color: vulnTab === 'servers' ? '#00d4ff' : '#8b92a8' }}>18</span>
                </div>
              </div>

              {/* Filters and Sort */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <input 
                  type="text" 
                  placeholder="Search vulnerabilities..." 
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    background: '#1a1f2e',
                    border: '1px solid #2a3144',
                    borderRadius: '8px',
                    color: '#e4e6eb',
                    fontSize: '14px'
                  }}
                />
                <select className="lang-selector" style={{ minWidth: '150px' }}>
                  <option>All Severities</option>
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <select className="lang-selector" style={{ minWidth: '180px' }} onChange={(e) => showToast('Sorting', `Sorted by ${e.target.value}`)}>
                  <option value="">Sort by...</option>
                  <option value="severity-desc">Severity (High to Low)</option>
                  <option value="severity-asc">Severity (Low to High)</option>
                  <option value="repetitions-desc">Repetitions (Most First)</option>
                  <option value="repetitions-asc">Repetitions (Least First)</option>
                  <option value="date-desc">Date (Newest First)</option>
                  <option value="cvss-desc">CVSS Score (High to Low)</option>
                </select>
              </div>

              {/* Network Tab */}
              {vulnTab === 'network' && (
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">🌍 Network & Perimeter Infrastructure (12)</div>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>CVE ID</th>
                        <th>Severity</th>
                        <th>Title</th>
                        <th>Asset</th>
                        <th>CVSS</th>
                        <th>Repetitions</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr onClick={() => openVulnDrawer('CVE-2024-3094')} style={{ cursor: 'pointer' }}>
                        <td style={{ fontWeight: 600, color: '#00d4ff' }}>CVE-2024-3094</td>
                        <td><div className="severity-badge severity-critical">CRITICAL</div></td>
                        <td>Authentication Bypass in Firewall</td>
                        <td>fw-prod-01.company.com</td>
                        <td>9.8</td>
                        <td><span style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '4px 8px', borderRadius: '6px', color: '#ef4444', fontWeight: 600 }}>5 assets</span></td>
                        <td><span style={{ color: '#ef4444' }}>🎯 Exploitable</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Applications Tab */}
              {vulnTab === 'applications' && (
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">🌐 Applications & Web (23)</div>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>CVE ID</th>
                        <th>Severity</th>
                        <th>Title</th>
                        <th>Asset</th>
                        <th>CVSS</th>
                        <th>Repetitions</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr onClick={() => openVulnDrawer('CVE-2024-1234')} style={{ cursor: 'pointer' }}>
                        <td style={{ fontWeight: 600, color: '#00d4ff' }}>CVE-2024-1234</td>
                        <td><div className="severity-badge severity-critical">CRITICAL</div></td>
                        <td>SQL Injection in Auth System</td>
                        <td>api.company.com/auth</td>
                        <td>9.8</td>
                        <td><span style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '4px 8px', borderRadius: '6px', color: '#ef4444', fontWeight: 600 }}>8 endpoints</span></td>
                        <td><span style={{ color: '#ef4444' }}>🎯 Exploitable</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Servers Tab */}
              {vulnTab === 'servers' && (
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">🖥️ Servers & Services (18)</div>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>CVE ID</th>
                        <th>Severity</th>
                        <th>Title</th>
                        <th>Asset</th>
                        <th>CVSS</th>
                        <th>Repetitions</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr onClick={() => openVulnDrawer('CVE-2024-9012')} style={{ cursor: 'pointer' }}>
                        <td style={{ fontWeight: 600, color: '#00d4ff' }}>CVE-2024-9012</td>
                        <td><div className="severity-badge severity-critical">CRITICAL</div></td>
                        <td>Privilege Escalation in Kernel</td>
                        <td>prod-web-01</td>
                        <td>9.4</td>
                        <td><span style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '4px 8px', borderRadius: '6px', color: '#ef4444', fontWeight: 600 }}>15 servers</span></td>
                        <td><span style={{ color: '#fb923c' }}>⏳ In Progress</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* AI Pentesting View */}
          {activeView === 'ai-pentesting' && (
            <div>
              <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '4px' }}>AI Pentesting Engine</h2>
                  <div style={{ fontSize: '14px', color: '#8b92a8' }}>Autonomous security testing with real-time analysis</div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn btn-secondary" onClick={() => showToast('Scan Paused', 'Active scans have been paused')}>⏸️ Pause Scan</button>
                  <button className="btn btn-primary" onClick={() => showToast('New Scan', 'Starting new pentesting scan...')}>+ New Scan</button>
                </div>
              </div>

              {/* Engine Status Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div className="card">
                  <div className="card-body">
                    <div style={{ fontSize: '13px', color: '#8b92a8', marginBottom: '8px' }}>Tools Executing</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                      <div style={{ fontSize: '28px', fontWeight: 700, color: '#00d4ff' }}>5</div>
                      <div style={{ fontSize: '14px', color: '#8b92a8' }}>/ 12 total</div>
                    </div>
                    <div style={{ fontSize: '14px', color: '#10b981' }}>Active</div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <div style={{ fontSize: '13px', color: '#8b92a8', marginBottom: '8px' }}>Active Branches</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                      <div style={{ fontSize: '28px', fontWeight: 700, color: '#fb923c' }}>8</div>
                      <div style={{ fontSize: '14px', color: '#8b92a8' }}>paths</div>
                    </div>
                    <div style={{ fontSize: '14px', color: '#8b92a8' }}>3 completed</div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <div style={{ fontSize: '13px', color: '#8b92a8', marginBottom: '8px' }}>Vulnerabilities Found</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                      <div style={{ fontSize: '28px', fontWeight: 700, color: '#ef4444' }}>14</div>
                      <div style={{ fontSize: '14px', color: '#8b92a8' }}>issues</div>
                    </div>
                    <div style={{ fontSize: '14px', color: '#ef4444' }}>3 critical</div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <div style={{ fontSize: '13px', color: '#8b92a8', marginBottom: '8px' }}>Scan Progress</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                      <div style={{ fontSize: '28px', fontWeight: 700, color: '#00d4ff' }}>67</div>
                      <div style={{ fontSize: '14px', color: '#8b92a8' }}>%</div>
                    </div>
                    <div style={{ fontSize: '14px', color: '#8b92a8' }}>~15 min remaining</div>
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                {/* Engine Rationale */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">🧠 Engine Rationale</div>
                  </div>
                  <div className="card-body">
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ fontSize: '13px', color: '#8b92a8', marginBottom: '8px' }}>Current Focus</div>
                      <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#e4e6eb' }}>
                        Analyzing authentication endpoints for potential bypass vulnerabilities. Initial reconnaissance revealed non-standard JWT implementation.
                      </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ fontSize: '13px', color: '#8b92a8', marginBottom: '8px' }}>Decision Process</div>
                      <div style={{ marginBottom: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{ width: '24px', height: '24px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>✓</div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Identified API surface area</div>
                          <div style={{ fontSize: '13px', color: '#8b92a8' }}>Found 47 endpoints across 8 services</div>
                        </div>
                      </div>
                      <div style={{ marginBottom: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{ width: '24px', height: '24px', background: '#00d4ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0, color: '#0a0e17', fontWeight: 700 }}>→</div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Prioritizing auth mechanisms</div>
                          <div style={{ fontSize: '13px', color: '#8b92a8' }}>Testing JWT validation in /api/v2/auth/*</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{ width: '24px', height: '24px', background: '#1a1f2e', border: '2px solid #2a3144', borderRadius: '50%', flexShrink: 0 }}></div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px', color: '#8b92a8' }}>Next: Privilege escalation</div>
                          <div style={{ fontSize: '13px', color: '#8b92a8' }}>Queued for execution</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '13px', color: '#8b92a8', marginBottom: '8px' }}>Reasoning</div>
                      <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#e4e6eb' }}>
                        Authentication bypass represents highest risk impact. Exploiting this vector could provide unauthorized access to sensitive data.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tools Execution */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">⚙️ Tools Execution (5 active)</div>
                  </div>
                  <div className="card-body">
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600 }}>🔍 SQLMap</div>
                          <div style={{ fontSize: '13px', color: '#8b92a8' }}>SQL injection testing on /api/auth/login</div>
                        </div>
                        <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 600 }}>RUNNING</div>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: '#1a1f2e', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: '73%', height: '100%', background: 'linear-gradient(90deg, #00d4ff, #0066ff)', borderRadius: '3px' }}></div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600 }}>🎯 Nuclei</div>
                          <div style={{ fontSize: '13px', color: '#8b92a8' }}>Template-based vulnerability scanning</div>
                        </div>
                        <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 600 }}>RUNNING</div>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: '#1a1f2e', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: '45%', height: '100%', background: 'linear-gradient(90deg, #00d4ff, #0066ff)', borderRadius: '3px' }}></div>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600 }}>🔐 JWT_Tool</div>
                          <div style={{ fontSize: '13px', color: '#8b92a8' }}>JWT token security analysis</div>
                        </div>
                        <div style={{ fontSize: '12px', color: '#00d4ff', fontWeight: 600 }}>STARTING</div>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: '#1a1f2e', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: '12%', height: '100%', background: 'linear-gradient(90deg, #00d4ff, #0066ff)', borderRadius: '3px' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logs and Next Steps */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Execution Logs */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">📋 Execution Logs</div>
                  </div>
                  <div className="card-body">
                    <div style={{ fontFamily: 'monospace', fontSize: '12px', lineHeight: '1.8' }}>
                      <div style={{ color: '#10b981', marginBottom: '4px' }}>[14:32:15] SQLMap started on /api/auth/login</div>
                      <div style={{ color: '#00d4ff', marginBottom: '4px' }}>[14:32:18] Parameter 'username' appears injectable</div>
                      <div style={{ color: '#fb923c', marginBottom: '4px' }}>[14:32:22] Time-based blind SQL injection confirmed</div>
                      <div style={{ color: '#ef4444', marginBottom: '4px' }}>[14:32:45] Database: PostgreSQL 13.2 detected</div>
                      <div style={{ color: '#10b981', marginBottom: '4px' }}>[14:33:01] Extracted 47 database tables</div>
                      <div style={{ color: '#8b92a8', marginBottom: '4px' }}>[14:33:12] Nuclei scan: 156 templates loaded</div>
                      <div style={{ color: '#00d4ff', marginBottom: '4px' }}>[14:33:18] Found exposed .git directory</div>
                      <div style={{ color: '#fb923c', marginBottom: '4px' }}>[14:33:24] JWT algorithm 'none' accepted</div>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">🎯 Next Steps</div>
                  </div>
                  <div className="card-body">
                    <div style={{ marginBottom: '12px', padding: '12px', background: '#1a1f2e', borderRadius: '8px', borderLeft: '3px solid #ef4444' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px', color: '#ef4444' }}>1. Exploit JWT Vulnerability</div>
                      <div style={{ fontSize: '13px', color: '#8b92a8', marginBottom: '8px' }}>
                        Craft admin token using "none" algorithm bypass
                      </div>
                      <div style={{ fontSize: '12px', color: '#8b92a8' }}>
                        Priority: CRITICAL • ETA: 2 minutes
                      </div>
                    </div>

                    <div style={{ marginBottom: '12px', padding: '12px', background: '#1a1f2e', borderRadius: '8px', borderLeft: '3px solid #fb923c' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px', color: '#fb923c' }}>2. Extract Database Schema</div>
                      <div style={{ fontSize: '13px', color: '#8b92a8', marginBottom: '8px' }}>
                        Complete SQLMap enumeration of PostgreSQL
                      </div>
                      <div style={{ fontSize: '12px', color: '#8b92a8' }}>
                        Priority: HIGH • ETA: 5 minutes
                      </div>
                    </div>

                    <div style={{ padding: '12px', background: '#1a1f2e', borderRadius: '8px', borderLeft: '3px solid #00d4ff' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px', color: '#00d4ff' }}>3. Test Privilege Escalation</div>
                      <div style={{ fontSize: '13px', color: '#8b92a8', marginBottom: '8px' }}>
                        Attempt to escalate from user to admin role
                      </div>
                      <div style={{ fontSize: '12px', color: '#8b92a8' }}>
                        Priority: MEDIUM • ETA: 8 minutes
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Patch Management View - COMPLETED */}
          {activeView === 'patch' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '4px' }}>Patch Management</h2>
                <div style={{ fontSize: '14px', color: '#8b92a8' }}>Manage patches across infrastructure</div>
              </div>

              {/* Patch Tabs */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '2px solid #1e2533' }}>
                <div 
                  className={`tab ${patchTab === 'network' ? 'active' : ''}`}
                  onClick={() => setPatchTab('network')}
                >
                  🌍 Network & Perimeter
                  <span style={{ marginLeft: '8px', fontSize: '12px', padding: '2px 8px', background: patchTab === 'network' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(139, 146, 168, 0.2)', borderRadius: '10px', color: '#ef4444' }}>10</span>
                </div>
                <div 
                  className={`tab ${patchTab === 'application' ? 'active' : ''}`}
                  onClick={() => setPatchTab('application')}
                >
                  🌐 Application Security
                  <span style={{ marginLeft: '8px', fontSize: '12px', padding: '2px 8px', background: patchTab === 'application' ? 'rgba(251, 146, 60, 0.2)' : 'rgba(139, 146, 168, 0.2)', borderRadius: '10px', color: '#fb923c' }}>17</span>
                </div>
                <div 
                  className={`tab ${patchTab === 'servers' ? 'active' : ''}`}
                  onClick={() => setPatchTab('servers')}
                >
                  🖥️ Servers & Containers
                  <span style={{ marginLeft: '8px', fontSize: '12px', padding: '2px 8px', background: patchTab === 'servers' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(139, 146, 168, 0.2)', borderRadius: '10px', color: '#ef4444' }}>20</span>
                </div>
              </div>

              {/* Network Patches */}
              {patchTab === 'network' && (
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">🌍 Network & Perimeter Patches</div>
                    <button className="btn btn-primary" onClick={() => showToast('Auto-Assign', 'Patches distributed to team')}>
                      Auto-Assign All
                    </button>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>CVE</th>
                        <th>Asset</th>
                        <th>Current → Target</th>
                        <th>Severity</th>
                        <th>Assigned</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ color: '#00d4ff', fontWeight: 600 }}>CVE-2024-3094</td>
                        <td>Cisco ASA Firewall</td>
                        <td>9.14.2 → 9.18.4</td>
                        <td><div className="severity-badge severity-critical">CRITICAL</div></td>
                        <td>Michael Torres</td>
                        <td>
                          <button className="btn btn-secondary" onClick={() => openReassignModal('CVE-2024-3094')}>
                            Reassign
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Application Patches */}
              {patchTab === 'application' && (
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">🌐 Application Security Patches</div>
                    <button className="btn btn-primary" onClick={() => showToast('Auto-Assign', 'Patches distributed to team')}>
                      Auto-Assign All
                    </button>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>CVE</th>
                        <th>Asset</th>
                        <th>Current → Target</th>
                        <th>Severity</th>
                        <th>Assigned</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ color: '#00d4ff', fontWeight: 600 }}>CVE-2024-1234</td>
                        <td>React Authentication Module</td>
                        <td>16.14.0 → 18.2.0</td>
                        <td><div className="severity-badge severity-critical">CRITICAL</div></td>
                        <td>John Smith</td>
                        <td>
                          <button className="btn btn-secondary" onClick={() => openReassignModal('CVE-2024-1234')}>
                            Reassign
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Server Patches */}
              {patchTab === 'servers' && (
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">🖥️ Servers & Containers Patches</div>
                    <button className="btn btn-primary" onClick={() => showToast('Auto-Assign', 'Patches distributed to team')}>
                      Auto-Assign All
                    </button>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>CVE</th>
                        <th>Asset</th>
                        <th>Current → Target</th>
                        <th>Severity</th>
                        <th>Assigned</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ color: '#00d4ff', fontWeight: 600 }}>CVE-2024-9012</td>
                        <td>Linux Kernel</td>
                        <td>5.15.0 → 6.1.0</td>
                        <td><div className="severity-badge severity-critical">CRITICAL</div></td>
                        <td>Lisa Martinez</td>
                        <td>
                          <button className="btn btn-secondary" onClick={() => openReassignModal('CVE-2024-9012')}>
                            Reassign
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Team & Assets View - NEW */}
          {activeView === 'team' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '4px' }}>Team & Assets</h2>
                <div style={{ fontSize: '14px', color: '#8b92a8' }}>Manage team members and workload</div>
              </div>

              {/* Team Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div className="card">
                  <div className="card-body" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#00d4ff', marginBottom: '8px' }}>24</div>
                    <div style={{ fontSize: '13px', color: '#8b92a8' }}>Total Members</div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#fb923c', marginBottom: '8px' }}>47</div>
                    <div style={{ fontSize: '13px', color: '#8b92a8' }}>Active Tasks</div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#ef4444', marginBottom: '8px' }}>5</div>
                    <div style={{ fontSize: '13px', color: '#8b92a8' }}>Overloaded</div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#10b981', marginBottom: '8px' }}>12</div>
                    <div style={{ fontSize: '13px', color: '#8b92a8' }}>Available</div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#00d4ff', marginBottom: '8px' }}>2.3d</div>
                    <div style={{ fontSize: '13px', color: '#8b92a8' }}>Avg Completion</div>
                  </div>
                </div>
              </div>

              {/* Team Tabs */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '2px solid #1e2533' }}>
                <div 
                  className={`tab ${teamTab === 'security' ? 'active' : ''}`}
                  onClick={() => setTeamTab('security')}
                >
                  🛡️ Security Engineering
                </div>
                <div 
                  className={`tab ${teamTab === 'infrastructure' ? 'active' : ''}`}
                  onClick={() => setTeamTab('infrastructure')}
                >
                  🖥️ Infrastructure
                </div>
                <div 
                  className={`tab ${teamTab === 'application' ? 'active' : ''}`}
                  onClick={() => setTeamTab('application')}
                >
                  💻 Application Team
                </div>
              </div>

              {/* Security Team */}
              {teamTab === 'security' && (
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">🛡️ Security Engineering Team (10 members)</div>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Member</th>
                        <th>Role</th>
                        <th>Tasks Assigned</th>
                        <th>Completed</th>
                        <th>Avg Time</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="user-avatar" style={{ width: '32px', height: '32px' }}>JS</div>
                            <div>John Smith</div>
                          </div>
                        </td>
                        <td>Sr. Security Engineer</td>
                        <td><span style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '4px 12px', borderRadius: '6px', color: '#ef4444', fontWeight: 600 }}>7</span></td>
                        <td>12</td>
                        <td>1.8 days</td>
                        <td><span style={{ color: '#10b981' }}>● Online</span></td>
                      </tr>
                      <tr>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="user-avatar" style={{ width: '32px', height: '32px' }}>SJ</div>
                            <div>Sarah Johnson</div>
                          </div>
                        </td>
                        <td>Security Analyst</td>
                        <td><span style={{ background: 'rgba(251, 146, 60, 0.2)', padding: '4px 12px', borderRadius: '6px', color: '#fb923c', fontWeight: 600 }}>5</span></td>
                        <td>15</td>
                        <td>2.1 days</td>
                        <td><span style={{ color: '#10b981' }}>● Online</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Infrastructure Team */}
              {teamTab === 'infrastructure' && (
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">🖥️ Infrastructure Team (8 members)</div>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Member</th>
                        <th>Role</th>
                        <th>Tasks Assigned</th>
                        <th>Completed</th>
                        <th>Avg Time</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="user-avatar" style={{ width: '32px', height: '32px' }}>MT</div>
                            <div>Michael Torres</div>
                          </div>
                        </td>
                        <td>DevOps Engineer</td>
                        <td><span style={{ background: 'rgba(251, 146, 60, 0.2)', padding: '4px 12px', borderRadius: '6px', color: '#fb923c', fontWeight: 600 }}>6</span></td>
                        <td>10</td>
                        <td>2.4 days</td>
                        <td><span style={{ color: '#10b981' }}>● Online</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Application Team */}
              {teamTab === 'application' && (
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">💻 Application Team (6 members)</div>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Member</th>
                        <th>Role</th>
                        <th>Tasks Assigned</th>
                        <th>Completed</th>
                        <th>Avg Time</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="user-avatar" style={{ width: '32px', height: '32px' }}>AP</div>
                            <div>Alex Patel</div>
                          </div>
                        </td>
                        <td>Full Stack Developer</td>
                        <td><span style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '4px 12px', borderRadius: '6px', color: '#f59e0b', fontWeight: 600 }}>4</span></td>
                        <td>13</td>
                        <td>1.6 days</td>
                        <td><span style={{ color: '#10b981' }}>● Online</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Reports View - NEW */}
          {activeView === 'reports' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '4px' }}>Reports</h2>
                <div style={{ fontSize: '14px', color: '#8b92a8' }}>Generate comprehensive security reports</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                {/* Vulnerability Report */}
                <div className="card" style={{ cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00d4ff'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e2533'}>
                  <div className="card-body">
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Vulnerability Report</h3>
                    <p style={{ fontSize: '14px', color: '#8b92a8', marginBottom: '16px' }}>
                      Detailed listing of vulnerabilities with AI actions and tool results
                    </p>
                    <button className="btn btn-primary" onClick={() => showToast('Generating Report', 'Vulnerability report is being created...')}>
                      Generate Report
                    </button>
                  </div>
                </div>

                {/* Patches by Technology */}
                <div className="card" style={{ cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00d4ff'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e2533'}>
                  <div className="card-body">
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔧</div>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Patches by Technology</h3>
                    <p style={{ fontSize: '14px', color: '#8b92a8', marginBottom: '16px' }}>
                      Organized by technology stack showing all pending patches
                    </p>
                    <button className="btn btn-primary" onClick={() => showToast('Generating Report', 'Patch report is being created...')}>
                      Generate Report
                    </button>
                  </div>
                </div>

                {/* Patches by Server */}
                <div className="card" style={{ cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00d4ff'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e2533'}>
                  <div className="card-body">
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🖥️</div>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Patches by Server</h3>
                    <p style={{ fontSize: '14px', color: '#8b92a8', marginBottom: '16px' }}>
                      Organized by infrastructure showing patches per server
                    </p>
                    <button className="btn btn-primary" onClick={() => showToast('Generating Report', 'Server patch report is being created...')}>
                      Generate Report
                    </button>
                  </div>
                </div>

                {/* Risk Heatmap */}
                <div className="card" style={{ cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00d4ff'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e2533'}>
                  <div className="card-body">
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗺️</div>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Risk Heatmap</h3>
                    <p style={{ fontSize: '14px', color: '#8b92a8', marginBottom: '16px' }}>
                      Visual risk exposure map by asset type and severity
                    </p>
                    <button className="btn btn-primary" onClick={() => showToast('Generating Report', 'Heatmap report is being created...')}>
                      Generate Report
                    </button>
                  </div>
                </div>

                {/* Personnel Report */}
                <div className="card" style={{ cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00d4ff'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e2533'}>
                  <div className="card-body">
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Personnel & Assignments</h3>
                    <p style={{ fontSize: '14px', color: '#8b92a8', marginBottom: '16px' }}>
                      Team workload analysis with completion metrics
                    </p>
                    <button className="btn btn-primary" onClick={() => showToast('Generating Report', 'Personnel report is being created...')}>
                      Generate Report
                    </button>
                  </div>
                </div>

                {/* Executive Summary */}
                <div className="card" style={{ cursor: 'pointer', transition: 'all 0.2s', gridColumn: 'span 2' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00d4ff'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e2533'}>
                  <div className="card-body">
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Executive Summary</h3>
                    <p style={{ fontSize: '14px', color: '#8b92a8', marginBottom: '16px' }}>
                      Comprehensive report consolidating all security metrics and trends for leadership
                    </p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <select className="lang-selector">
                        <option>Last Week</option>
                        <option>Last Month</option>
                        <option>Last Quarter</option>
                      </select>
                      <select className="lang-selector">
                        <option>PDF</option>
                        <option>PowerPoint</option>
                        <option>Excel</option>
                      </select>
                      <button className="btn btn-primary" onClick={() => showToast('Generating Report', 'Executive summary is being created...')}>
                        Generate Executive Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings View */}
          {activeView === 'settings' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '4px' }}>Settings</h2>
                <div style={{ fontSize: '14px', color: '#8b92a8' }}>Configure system preferences and team permissions</div>
              </div>

              {/* General Settings */}
              <div className="card" style={{ marginBottom: '24px' }}>
                <div className="card-header">
                  <div className="card-title">⚙️ General Settings</div>
                </div>
                <div className="card-body">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                    {/* Theme Selection */}
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Theme</div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <div 
                          style={{ 
                            flex: 1,
                            padding: '16px',
                            background: '#1a1f2e',
                            border: '2px solid #00d4ff',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            textAlign: 'center'
                          }}
                        >
                          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🌙</div>
                          <div style={{ fontSize: '13px', fontWeight: 600 }}>Dark</div>
                          <div style={{ fontSize: '11px', color: '#00d4ff', marginTop: '4px' }}>Active</div>
                        </div>
                        <div 
                          style={{ 
                            flex: 1,
                            padding: '16px',
                            background: '#1a1f2e',
                            border: '2px solid #2a3144',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            textAlign: 'center'
                          }}
                          onClick={() => showToast('Theme', 'Light theme coming soon')}
                        >
                          <div style={{ fontSize: '24px', marginBottom: '8px' }}>☀️</div>
                          <div style={{ fontSize: '13px', fontWeight: 600 }}>Light</div>
                          <div style={{ fontSize: '11px', color: '#8b92a8', marginTop: '4px' }}>Coming Soon</div>
                        </div>
                      </div>
                    </div>

                    {/* Language Selection */}
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Language</div>
                      <select 
                        className="lang-selector" 
                        style={{ width: '100%', padding: '12px 16px', fontSize: '14px' }}
                        onChange={(e) => showToast('Language Changed', `Language set to ${e.target.options[e.target.selectedIndex].text}`)}
                      >
                        <option value="en">🇬🇧 English</option>
                        <option value="es">🇪🇸 Español</option>
                        <option value="fr">🇫🇷 Français</option>
                        <option value="de">🇩🇪 Deutsch</option>
                        <option value="zh">🇨🇳 中文</option>
                      </select>
                    </div>

                    {/* AI Workers */}
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
                        AI Engine Workers: <span id="worker-display">8</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="16" 
                        defaultValue="8"
                        style={{ 
                          width: '100%',
                          height: '6px',
                          background: '#1a1f2e',
                          borderRadius: '3px',
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                        onChange={(e) => {
                          document.getElementById('worker-display').textContent = e.target.value;
                          showToast('Workers Updated', `AI engine now using ${e.target.value} workers`);
                        }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#8b92a8', marginTop: '8px' }}>
                        <span>1</span>
                        <span>16</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#8b92a8', marginTop: '8px' }}>
                        More workers = faster scans, higher CPU usage
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Permissions */}
              <div className="card">
                <div className="card-header">
                  <div className="card-title">👥 Team Member Permissions</div>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Member</th>
                      <th>Portal Access</th>
                      <th>Run Engine</th>
                      <th>Receive Alerts</th>
                      <th>Alert Channel</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div className="user-avatar" style={{ width: '36px', height: '36px' }}>JS</div>
                          <div>
                            <div style={{ fontWeight: 600 }}>John Smith</div>
                            <div style={{ fontSize: '13px', color: '#8b92a8' }}>Sr. Security Engineer</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          onChange={(e) => showToast('Permission Updated', `Portal access ${e.target.checked ? 'granted' : 'revoked'}`)}
                          style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                        />
                      </td>
                      <td>
                        <input 
                          type="checkbox" 
                          defaultChecked
                          onChange={(e) => showToast('Permission Updated', `Engine access ${e.target.checked ? 'granted' : 'revoked'}`)}
                          style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                        />
                      </td>
                      <td>
                        <input 
                          type="checkbox" 
                          defaultChecked
                          onChange={(e) => showToast('Permission Updated', `Alerts ${e.target.checked ? 'enabled' : 'disabled'}`)}
                          style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                        />
                      </td>
                      <td>
                        <select 
                          className="lang-selector" 
                          style={{ fontSize: '13px', padding: '6px 10px' }}
                          onChange={(e) => showToast('Alert Channel', `Alerts via ${e.target.value}`)}
                        >
                          <option value="Email">📧 Email</option>
                          <option value="WhatsApp">💬 WhatsApp</option>
                          <option value="Discord">🎮 Discord</option>
                        </select>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div className="user-avatar" style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>SJ</div>
                          <div>
                            <div style={{ fontWeight: 600 }}>Sarah Johnson</div>
                            <div style={{ fontSize: '13px', color: '#8b92a8' }}>Penetration Tester</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <input 
                          type="checkbox" 
                          defaultChecked
                          onChange={(e) => showToast('Permission Updated', `Portal access ${e.target.checked ? 'granted' : 'revoked'}`)}
                          style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                        />
                      </td>
                      <td>
                        <input 
                          type="checkbox" 
                          defaultChecked
                          onChange={(e) => showToast('Permission Updated', `Engine access ${e.target.checked ? 'granted' : 'revoked'}`)}
                          style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                        />
                      </td>
                      <td>
                        <input 
                          type="checkbox" 
                          defaultChecked
                          onChange={(e) => showToast('Permission Updated', `Alerts ${e.target.checked ? 'enabled' : 'disabled'}`)}
                          style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                        />
                      </td>
                      <td>
                        <select 
                          className="lang-selector" 
                          style={{ fontSize: '13px', padding: '6px 10px' }}
                          defaultValue="WhatsApp"
                          onChange={(e) => showToast('Alert Channel', `Alerts via ${e.target.value}`)}
                        >
                          <option value="Email">📧 Email</option>
                          <option value="WhatsApp">💬 WhatsApp</option>
                          <option value="Discord">🎮 Discord</option>
                        </select>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div className="user-avatar" style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #10b981, #059669)' }}>MQ</div>
                          <div>
                            <div style={{ fontWeight: 600 }}>Max Quinn</div>
                            <div style={{ fontSize: '13px', color: '#8b92a8' }}>Security Analyst</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <input 
                          type="checkbox" 
                          defaultChecked
                          onChange={(e) => showToast('Permission Updated', `Portal access ${e.target.checked ? 'granted' : 'revoked'}`)}
                          style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                        />
                      </td>
                      <td>
                        <input 
                          type="checkbox" 
                          onChange={(e) => showToast('Permission Updated', `Engine access ${e.target.checked ? 'granted' : 'revoked'}`)}
                          style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                        />
                      </td>
                      <td>
                        <input 
                          type="checkbox" 
                          defaultChecked
                          onChange={(e) => showToast('Permission Updated', `Alerts ${e.target.checked ? 'enabled' : 'disabled'}`)}
                          style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                        />
                      </td>
                      <td>
                        <select 
                          className="lang-selector" 
                          style={{ fontSize: '13px', padding: '6px 10px' }}
                          defaultValue="Discord"
                          onChange={(e) => showToast('Alert Channel', `Alerts via ${e.target.value}`)}
                        >
                          <option value="Email">📧 Email</option>
                          <option value="WhatsApp">💬 WhatsApp</option>
                          <option value="Discord">🎮 Discord</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Vulnerability Drawer - CLEANED UP */}
      <div className={`drawer-overlay ${vulnDrawerOpen ? 'active' : ''}`} onClick={closeVulnDrawer}></div>
      <div className={`drawer ${vulnDrawerOpen ? 'active' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-title">{selectedVuln}</div>
          <div className="close-btn" onClick={closeVulnDrawer}>✕</div>
        </div>
        <div className="drawer-content">
          {/* Header Info */}
          <div style={{ marginBottom: '24px' }}>
            <div className="severity-badge severity-critical" style={{ marginBottom: '16px' }}>CRITICAL</div>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
              SQL Injection in Authentication System
            </h2>
            <div style={{ fontSize: '14px', color: '#8b92a8' }}>
              Detected 2 hours ago • CVSS 9.8 • api.company.com/auth
            </div>
          </div>

          {/* Detailed Explanation */}
          <div style={{ marginBottom: '24px', background: '#1a1f2e', padding: '20px', borderRadius: '8px', border: '1px solid #2a3144' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              📖 Detailed Explanation
            </h3>
            <p style={{ fontSize: '14px', color: '#e4e6eb', lineHeight: '1.6', marginBottom: '12px' }}>
              A critical SQL injection vulnerability has been detected in the authentication system at the <code>/api/auth/login</code> endpoint. 
              This vulnerability allows attackers to bypass authentication by injecting malicious SQL queries.
            </p>
            <p style={{ fontSize: '14px', color: '#e4e6eb', lineHeight: '1.6', marginBottom: '12px' }}>
              <strong style={{ color: '#fb923c' }}>Attack Vector:</strong> The application constructs SQL queries using string concatenation without proper input validation. 
              An attacker can submit input like <code style={{ color: '#ef4444' }}>admin' OR '1'='1</code> to manipulate the query logic.
            </p>
            <p style={{ fontSize: '14px', color: '#e4e6eb', lineHeight: '1.6' }}>
              <strong style={{ color: '#fb923c' }}>Impact:</strong> Successful exploitation grants unauthorized access as any user, enables data exfiltration, 
              and potentially allows execution of arbitrary SQL commands.
            </p>
          </div>

          {/* Technical Details */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>🔬 Technical Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: '#1a1f2e', padding: '12px', borderRadius: '6px' }}>
                <div style={{ fontSize: '12px', color: '#8b92a8', marginBottom: '4px' }}>CVSS Score</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#ef4444' }}>9.8 / 10.0</div>
              </div>
              <div style={{ background: '#1a1f2e', padding: '12px', borderRadius: '6px' }}>
                <div style={{ fontSize: '12px', color: '#8b92a8', marginBottom: '4px' }}>Attack Complexity</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#10b981' }}>Low</div>
              </div>
              <div style={{ background: '#1a1f2e', padding: '12px', borderRadius: '6px' }}>
                <div style={{ fontSize: '12px', color: '#8b92a8', marginBottom: '4px' }}>Privileges Required</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#ef4444' }}>None</div>
              </div>
              <div style={{ background: '#1a1f2e', padding: '12px', borderRadius: '6px' }}>
                <div style={{ fontSize: '12px', color: '#8b92a8', marginBottom: '4px' }}>User Interaction</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#ef4444' }}>None</div>
              </div>
            </div>
          </div>

          {/* Remediation Steps */}
          <div style={{ marginBottom: '24px', background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 102, 255, 0.1))', padding: '20px', borderRadius: '8px', border: '1px solid rgba(0, 212, 255, 0.3)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#00d4ff' }}>
              ✅ Remediation Steps
            </h3>
            
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                <div style={{ minWidth: '28px', height: '28px', background: '#00d4ff', color: '#0a0e17', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>1</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px', color: '#e4e6eb' }}>
                    Implement Parameterized Queries (Immediate)
                  </div>
                  <div style={{ fontSize: '13px', color: '#8b92a8', lineHeight: '1.5' }}>
                    Replace all string concatenation with parameterized queries or prepared statements.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                <div style={{ minWidth: '28px', height: '28px', background: '#00d4ff', color: '#0a0e17', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>2</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px', color: '#e4e6eb' }}>
                    Add Input Validation (Within 24h)
                  </div>
                  <div style={{ fontSize: '13px', color: '#8b92a8', lineHeight: '1.5' }}>
                    Implement strict input validation using whitelisting. Validate username format and reject SQL keywords.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                <div style={{ minWidth: '28px', height: '28px', background: '#00d4ff', color: '#0a0e17', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>3</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px', color: '#e4e6eb' }}>
                    Deploy WAF Rules (Within 48h)
                  </div>
                  <div style={{ fontSize: '13px', color: '#8b92a8', lineHeight: '1.5' }}>
                    Configure WAF to block common SQL injection patterns as an additional defense layer.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ minWidth: '28px', height: '28px', background: '#00d4ff', color: '#0a0e17', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>4</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px', color: '#e4e6eb' }}>
                    Verify Fix (After implementation)
                  </div>
                  <div style={{ fontSize: '13px', color: '#8b92a8', lineHeight: '1.5' }}>
                    Re-run automated security scans and conduct manual penetration testing.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button className="btn btn-primary" onClick={() => showToast('Plan Generated', 'Remediation plan created')}>
              🤖 Generate Remediation Plan
            </button>
            <button className="btn btn-secondary" onClick={() => showToast('Ticket Created', 'JIRA ticket VULN-001 created')}>
              📋 Create JIRA Ticket
            </button>
            <button className="btn btn-secondary" onClick={() => showToast('Task Assigned', 'Assigned to John Smith')}>
              👤 Assign to Team Member
            </button>
          </div>
        </div>
      </div>

      {/* Reassign Modal */}
      <div className={`modal-overlay ${reassignModalOpen ? 'active' : ''}`} onClick={closeReassignModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-title">Reassign Patch</div>
          </div>
          <div className="modal-body">
            <p style={{ marginBottom: '16px', color: '#8b92a8' }}>Select a team member to reassign this patch:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div 
                style={{ padding: '12px', background: selectedAssignee === 'john' ? 'rgba(0, 212, 255, 0.2)' : '#1a1f2e', border: '1px solid ' + (selectedAssignee === 'john' ? '#00d4ff' : '#2a3144'), borderRadius: '8px', cursor: 'pointer' }}
                onClick={() => setSelectedAssignee('john')}
              >
                <div style={{ fontWeight: 600 }}>John Smith</div>
                <div style={{ fontSize: '13px', color: '#8b92a8' }}>Sr. Security Engineer • 7 tasks</div>
              </div>
              <div 
                style={{ padding: '12px', background: selectedAssignee === 'sarah' ? 'rgba(0, 212, 255, 0.2)' : '#1a1f2e', border: '1px solid ' + (selectedAssignee === 'sarah' ? '#00d4ff' : '#2a3144'), borderRadius: '8px', cursor: 'pointer' }}
                onClick={() => setSelectedAssignee('sarah')}
              >
                <div style={{ fontWeight: 600 }}>Sarah Johnson</div>
                <div style={{ fontSize: '13px', color: '#8b92a8' }}>Security Analyst • 5 tasks</div>
              </div>
              <div 
                style={{ padding: '12px', background: selectedAssignee === 'max' ? 'rgba(0, 212, 255, 0.2)' : '#1a1f2e', border: '1px solid ' + (selectedAssignee === 'max' ? '#00d4ff' : '#2a3144'), borderRadius: '8px', cursor: 'pointer' }}
                onClick={() => setSelectedAssignee('max')}
              >
                <div style={{ fontWeight: 600 }}>Max Quinn</div>
                <div style={{ fontSize: '13px', color: '#8b92a8' }}>Penetration Tester • 3 tasks</div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={closeReassignModal}>Cancel</button>
            <button className="btn btn-primary" onClick={confirmReassign}>Confirm Reassignment</button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast">
          <div className="toast-title">{toastMessage.title}</div>
          <div className="toast-message">{toastMessage.message}</div>
        </div>
      )}
    </div>
  );
};

export default DaniETH;
