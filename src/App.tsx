// @ts-nocheck
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Dashboard } from './Dashboard';
import { VulnerabilityHub } from './VulnerabilityHub';
import { AIPentesting } from './AIPentesting';
import { PatchManagement } from './PatchManagement';
import { Team } from './Team';
import { Reports } from './Reports';
import { Settings } from './Settings';
import './App.css';
import { VulnDrawer } from './VulnDrawer';
import { ReassignModal } from './ReassignModal';
import React, { useState } from 'react';

const DaniETH = () => {
  const [activeView, setActiveView] = useState('dashboard');
  
  // ---> ESTADO NUEVO: Controla si el menú lateral está abierto en celulares <---
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

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
      
      {/* ---> NUEVO: OVERLAY OSCURO PARA CELULARES <--- */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* ---> ACTUALIZADO: Sidebar ahora recibe isOpen <--- */}
      <Sidebar 
        activeView={activeView} 
        setActiveView={(view) => {
          setActiveView(view);
          setIsSidebarOpen(false); // Cierra el menú al seleccionar una opción
        }} 
        isOpen={isSidebarOpen}
      />

      {/* Main Container */}
      <div className="main-container">
        
        {/* ---> ACTUALIZADO: Header ahora recibe toggleSidebar <--- */}
        <Header 
          activeView={activeView} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Content */}
        <div className="content fade-in-view" key={activeView}>
          
          {/* Dashboard View */}
          {activeView === 'dashboard' && <Dashboard openVulnDrawer={openVulnDrawer} />}
          
          {/* Vulnerability Hub View */}
          {activeView === 'vulnerability' && (
            <VulnerabilityHub
              vulnTab={vulnTab}
              setVulnTab={setVulnTab}
              showToast={showToast}
              openVulnDrawer={openVulnDrawer}
            />
          )}

          {/* AI Pentesting View */}
          {activeView === 'ai-pentesting' && <AIPentesting showToast={showToast} />}

          {/* Patch Management View */}
          {activeView === 'patch' && (
            <PatchManagement 
              patchTab={patchTab}
              setPatchTab={setPatchTab}
              showToast={showToast}
              openReassignModal={openReassignModal}
            />
          )}
         
          {/* Team & Assets View - NEW */}
          {activeView === 'team' && <Team teamTab={teamTab} setTeamTab={setTeamTab} />}

          {/* Reports View - NEW */}
          {activeView === 'reports' && <Reports showToast={showToast} />}
          
          {/* Settings View */}
          {activeView === 'settings' && <Settings showToast={showToast} />}
        </div>
      </div>

      {/* Vulnerability Drawer - CLEANED UP */}
      <VulnDrawer 
        vulnDrawerOpen={vulnDrawerOpen} 
        closeVulnDrawer={closeVulnDrawer} 
        selectedVuln={selectedVuln} 
        showToast={showToast} 
      />
      
      {/* Reassign Modal */}
      <ReassignModal 
        reassignModalOpen={reassignModalOpen} 
        closeReassignModal={closeReassignModal} 
        selectedAssignee={selectedAssignee} 
        setSelectedAssignee={setSelectedAssignee} 
        confirmReassign={confirmReassign} 
      />
      
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