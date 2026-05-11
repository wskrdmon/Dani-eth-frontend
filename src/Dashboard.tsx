import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

interface DashboardProps {
  openVulnDrawer: (cveId: string) => void;
  goToView: (view: string) => void;
  setVulnTab: (tab: string) => void;
}

type RiskScoreData = {
  score: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  previous: number;
};

type QuickStat = {
  title: string;
  value: number;
  animatedValue: number;
  color: string;
  icon: string;
  softBg: string;
  subtext: string;
};

type HeatmapItem = {
  name: string;
  count: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  color: string;
  hubTab: string;
};

type VulnerabilityItem = {
  cve: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  asset: string;
  detectedAt: string;
};

type PatchSegment = {
  label: string;
  done: number;
  total: number;
  color: string;
};

type ScanItem = {
  id: string;
  target: string;
  progress: number;
  eta: string;
  status: 'RUNNING' | 'PAUSED' | 'QUEUED';
};

const severityOrder: Record<HeatmapItem['severity'], number> = {
  CRITICAL: 4,
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

const initialQuickStats: QuickStat[] = [
  {
    title: 'Issues Críticos',
    value: 14,
    animatedValue: 0,
    color: '#ef4444',
    icon: '⚠️',
    softBg: 'rgba(239, 68, 68, 0.12)',
    subtext: '+2 vs ayer',
  },
  {
    title: 'Alta Prioridad',
    value: 33,
    animatedValue: 0,
    color: '#fb923c',
    icon: '🔴',
    softBg: 'rgba(251, 146, 60, 0.12)',
    subtext: '7 requieren revisión',
  },
  {
    title: 'Resueltos Este Mes',
    value: 142,
    animatedValue: 0,
    color: '#10b981',
    icon: '✅',
    softBg: 'rgba(16, 185, 129, 0.12)',
    subtext: '94% dentro de SLA',
  },
];

const baseHeatmapData: HeatmapItem[] = [
  { name: 'Web Applications', count: 23, severity: 'CRITICAL', color: '#ef4444', hubTab: 'applications' },
  { name: 'Databases', count: 18, severity: 'CRITICAL', color: '#ef4444', hubTab: 'servers' },
  { name: 'APIs', count: 31, severity: 'HIGH', color: '#fb923c', hubTab: 'applications' },
  { name: 'Cloud Infrastructure', count: 12, severity: 'HIGH', color: '#fb923c', hubTab: 'network' },
  { name: 'Network Devices', count: 15, severity: 'MEDIUM', color: '#f59e0b', hubTab: 'network' },
  { name: 'Containers', count: 8, severity: 'MEDIUM', color: '#f59e0b', hubTab: 'servers' },
  { name: 'Mobile Apps', count: 4, severity: 'LOW', color: '#10b981', hubTab: 'applications' },
];

const initialVulns: VulnerabilityItem[] = [
  { cve: 'CVE-2024-1234', title: 'SQL Injection en autenticación', severity: 'critical', asset: 'api.company.com', detectedAt: '2026-02-09 14:32' },
  { cve: 'CVE-2024-5678', title: 'XSS en perfil de usuario', severity: 'high', asset: 'portal.company.com', detectedAt: '2026-02-09 13:10' },
  { cve: 'CVE-2024-3094', title: 'Authentication Bypass en Firewall', severity: 'critical', asset: 'fw-prod-01.company.com', detectedAt: '2026-02-09 12:54' },
  { cve: 'CVE-2024-9012', title: 'Privilege Escalation en Kernel', severity: 'critical', asset: 'prod-web-01', detectedAt: '2026-02-09 12:20' },
  { cve: 'CVE-2024-8881', title: 'Exposed .git directory', severity: 'medium', asset: 'app.company.com', detectedAt: '2026-02-09 11:52' },
  { cve: 'CVE-2024-7711', title: 'Open Redirect en SSO', severity: 'high', asset: 'sso.company.com', detectedAt: '2026-02-09 11:21' },
  { cve: 'CVE-2024-6623', title: 'Weak TLS Configuration', severity: 'medium', asset: 'mail.company.com', detectedAt: '2026-02-09 10:43' },
  { cve: 'CVE-2024-5142', title: 'Default Credentials en Router', severity: 'high', asset: 'edge-router-02', detectedAt: '2026-02-09 10:12' },
  { cve: 'CVE-2024-4108', title: 'Directory Listing Habilitado', severity: 'low', asset: 'cdn.company.com', detectedAt: '2026-02-09 09:47' },
  { cve: 'CVE-2024-3222', title: 'JWT Validation Weakness', severity: 'critical', asset: 'auth.company.com', detectedAt: '2026-02-09 09:10' },
];

const patchSegments: PatchSegment[] = [
  { label: 'Critical', done: 8, total: 14, color: '#ef4444' },
  { label: 'High', done: 21, total: 33, color: '#fb923c' },
  { label: 'Medium', done: 34, total: 48, color: '#f59e0b' },
  { label: 'Low', done: 26, total: 29, color: '#10b981' },
];

const initialScans: ScanItem[] = [
  { id: 'scan-1', target: 'api.company.com', progress: 73, eta: '4 min', status: 'RUNNING' },
  { id: 'scan-2', target: 'portal.company.com', progress: 45, eta: '9 min', status: 'RUNNING' },
  { id: 'scan-3', target: 'vpn.company.com', progress: 12, eta: '16 min', status: 'QUEUED' },
];

export const Dashboard: React.FC<DashboardProps> = ({ openVulnDrawer, goToView, setVulnTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [riskScore, setRiskScore] = useState<RiskScoreData>({
    score: 6.8,
    trend: 'increasing',
    previous: 6.2,
  });

  const [animatedScore, setAnimatedScore] = useState(0);
  const [quickStats, setQuickStats] = useState<QuickStat[]>(initialQuickStats);
  const [recentVulns, setRecentVulns] = useState<VulnerabilityItem[]>(initialVulns);
  const [activeScans, setActiveScans] = useState<ScanItem[]>(initialScans);

  useEffect(() => {
    const fakeLoad = setTimeout(() => {
      setIsLoading(false);
      setHasError(false);
    }, 1200);

    return () => clearTimeout(fakeLoad);
  }, []);

  useEffect(() => {
    if (isLoading || hasError) return;

    const timeout = setTimeout(() => setAnimatedScore(riskScore.score), 250);
    return () => clearTimeout(timeout);
  }, [riskScore.score, isLoading, hasError]);

  useEffect(() => {
    if (isLoading || hasError) return;

    const intervals = initialQuickStats.map((stat, index) => {
      let current = 0;
      const increment = Math.max(1, Math.ceil(stat.value / 30));

      return setInterval(() => {
        current += increment;

        setQuickStats((prev) =>
          prev.map((item, i) =>
            i === index
              ? { ...item, animatedValue: current >= stat.value ? stat.value : current }
              : item
          )
        );

        if (current >= stat.value) {
          clearInterval(intervals[index]);
        }
      }, 35);
    });

    return () => intervals.forEach(clearInterval);
  }, [isLoading, hasError]);

  useEffect(() => {
    if (isLoading || hasError) return;

    const realtimeInterval = setInterval(() => {
      setRiskScore((prev) => {
        const delta = Number((Math.random() * 0.4 - 0.15).toFixed(1));
        const nextScore = Math.min(10, Math.max(0, Number((prev.score + delta).toFixed(1))));
        const trend =
          nextScore > prev.score ? 'increasing' : nextScore < prev.score ? 'decreasing' : 'stable';

        return {
          previous: prev.score,
          score: nextScore,
          trend,
        };
      });

      setActiveScans((prev) =>
        prev.map((scan) => {
          if (scan.status === 'PAUSED') return scan;
          if (scan.status === 'QUEUED') {
            return {
              ...scan,
              status: Math.random() > 0.55 ? 'RUNNING' : 'QUEUED',
            };
          }

          const nextProgress = Math.min(100, scan.progress + Math.floor(Math.random() * 8 + 2));

          return {
            ...scan,
            progress: nextProgress,
            eta:
              nextProgress >= 100
                ? '0 min'
                : `${Math.max(1, Math.ceil((100 - nextProgress) / 8))} min`,
            status: nextProgress >= 100 ? 'PAUSED' : 'RUNNING',
          };
        })
      );

      setRecentVulns((prev) => {
        const shouldRotate = Math.random() > 0.65;
        if (!shouldRotate) return prev;

        const newItem: VulnerabilityItem = {
          cve: `CVE-2026-${Math.floor(1000 + Math.random() * 8999)}`,
          title: 'Nueva vulnerabilidad detectada por escaneo continuo',
          severity: Math.random() > 0.7 ? 'critical' : Math.random() > 0.45 ? 'high' : 'medium',
          asset: ['api.company.com', 'auth.company.com', 'gateway.company.com', 'k8s-node-01'][Math.floor(Math.random() * 4)],
          detectedAt: '2026-02-09 15:01',
        };

        return [newItem, ...prev].slice(0, 10);
      });
    }, 5000);

    return () => clearInterval(realtimeInterval);
  }, [isLoading, hasError]);

  const heatmapData = useMemo(() => {
    return [...baseHeatmapData].sort((a, b) => {
      const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
      if (severityDiff !== 0) return severityDiff;
      return b.count - a.count;
    });
  }, []);

  const gaugeColor = useMemo(() => {
    if (animatedScore <= 3) return '#10b981';
    if (animatedScore <= 7) return '#f59e0b';
    if (animatedScore <= 8.5) return '#fb923c';
    return '#ef4444';
  }, [animatedScore]);

  const overallPatchProgress = useMemo(() => {
    const done = patchSegments.reduce((acc, item) => acc + item.done, 0);
    const total = patchSegments.reduce((acc, item) => acc + item.total, 0);
    return Math.round((done / total) * 100);
  }, []);

  const totalPatchUnits = useMemo(
    () => patchSegments.reduce((acc, item) => acc + item.total, 0),
    []
  );

  const riskDelta = useMemo(() => {
    if (!riskScore.previous) return 0;
    return Number((((riskScore.score - riskScore.previous) / riskScore.previous) * 100).toFixed(1));
  }, [riskScore]);

  const handleHeatmapClick = (hubTab: string) => {
    setVulnTab(hubTab);
    goToView('vulnerability');
  };

  const handleViewAll = () => {
    goToView('vulnerability');
  };

  const handleOpenScans = () => {
    goToView('ai-pentesting');
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setHasError(false);
    }, 1000);
  };

  if (hasError) {
    return (
      <div className="card">
        <div className="card-body" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>⚠️</div>
          <div style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
            No se pudieron cargar los widgets del dashboard
          </div>
          <div className="widget-subtext" style={{ marginBottom: '20px' }}>
            Revisa la conexión o intenta nuevamente.
          </div>
          <button className="btn btn-primary" onClick={handleRetry}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ display: 'grid', gap: '24px' }}>
        <div className="dashboard-top-grid">
          <div className="card"><div className="card-body skeleton-block" style={{ height: 220 }} /></div>
          <div className="quick-stats-grid">
            <div className="card"><div className="card-body skeleton-block" style={{ height: 220 }} /></div>
            <div className="card"><div className="card-body skeleton-block" style={{ height: 220 }} /></div>
            <div className="card"><div className="card-body skeleton-block" style={{ height: 220 }} /></div>
          </div>
        </div>
        <div className="card"><div className="card-body skeleton-block" style={{ height: 320 }} /></div>
        <div className="card"><div className="card-body skeleton-block" style={{ height: 320 }} /></div>
        <div className="dashboard-bottom-grid">
          <div className="card"><div className="card-body skeleton-block" style={{ height: 240 }} /></div>
          <div className="card"><div className="card-body skeleton-block" style={{ height: 240 }} /></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="dashboard-top-grid">
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="card-body" style={{ textAlign: 'center' }}>
            <div className="widget-label">Risk Score</div>

            <div
              style={{ width: '100%', height: 220, position: 'relative' }}
              title={`Anterior: ${riskScore.previous} | Cambio: ${riskDelta > 0 ? '+' : ''}${riskDelta}%`}
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="65%"
                  innerRadius="70%"
                  outerRadius="100%"
                  barSize={18}
                  startAngle={180}
                  endAngle={0}
                  data={[{ value: animatedScore, fill: gaugeColor }]}
                >
                  <PolarAngleAxis type="number" domain={[0, 10]} angleAxisId={0} tick={false} />
                  <RadialBar dataKey="value" cornerRadius={12} background animationDuration={1500} />
                </RadialBarChart>
              </ResponsiveContainer>

              <div className="gauge-center-value">
                <div style={{ fontSize: '40px', fontWeight: 700, color: gaugeColor }}>
                  {animatedScore.toFixed(1)}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: '#8b92a8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {riskScore.trend === 'increasing'
                    ? '↑ Increasing'
                    : riskScore.trend === 'decreasing'
                    ? '↓ Decreasing'
                    : '→ Stable'}
                </div>
              </div>
            </div>

            <div className="widget-subtext">
              Score anterior: {riskScore.previous} · cambio: {riskDelta > 0 ? '+' : ''}{riskDelta}%
            </div>
          </div>
        </motion.div>

        <div className="quick-stats-grid">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              className="card quick-stat-card"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              style={{ background: stat.softBg }}
            >
              <div className="card-body">
                <div className="quick-stat-icon">{stat.icon}</div>
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: 700,
                    color: stat.color,
                    marginBottom: '8px',
                  }}
                >
                  {stat.animatedValue}
                </div>
                <div style={{ fontSize: '14px', color: '#e4e6eb', marginBottom: '6px' }}>
                  {stat.title}
                </div>
                <div className="widget-subtext">{stat.subtext}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="card"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
      >
        <div className="card-header">
          <div className="card-title">🔥 Risk Heatmap por Asset</div>
          <div className="widget-subtext">Click para abrir Vulnerability Hub filtrado</div>
        </div>
        <div className="card-body">
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={heatmapData} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 16 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={140} tick={{ fill: '#8b92a8', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{ background: '#12161f', border: '1px solid #2a3144', borderRadius: 10 }}
                />
                <Bar dataKey="count" radius={[0, 10, 10, 0]}>
                  {heatmapData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                      cursor="pointer"
                      onClick={() => handleHeatmapClick(entry.hubTab)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">📋 Vulnerabilidades Recientes</div>
          <button className="btn btn-secondary" onClick={handleViewAll}>Ver Todas</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>CVE ID</th>
              <th>Title</th>
              <th>Asset</th>
              <th>Severity</th>
              <th>Detected Date</th>
            </tr>
          </thead>
          <tbody>
            {recentVulns.slice(0, 10).map((vuln) => (
              <tr key={vuln.cve} style={{ cursor: 'pointer' }} onClick={() => openVulnDrawer(vuln.cve)}>
                <td style={{ fontWeight: 600, color: '#00d4ff' }}>{vuln.cve}</td>
                <td>{vuln.title}</td>
                <td>{vuln.asset}</td>
                <td>
                  <div className={`severity-badge severity-${vuln.severity}`}>
                    {vuln.severity.toUpperCase()}
                  </div>
                </td>
                <td style={{ color: '#8b92a8' }}>{vuln.detectedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-bottom-grid">
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          <div className="card-header">
            <div className="card-title">🩹 Patch Progress</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#00d4ff' }}>{overallPatchProgress}%</div>
          </div>
          <div className="card-body">
            <div className="patch-progress-track" title="Progreso total segmentado por severidad">
              {patchSegments.map((segment) => (
                <div
                  key={segment.label}
                  title={`${segment.label}: ${segment.done}/${segment.total}`}
                  style={{
                    width: `${(segment.total / totalPatchUnits) * 100}%`,
                    background: segment.color,
                  }}
                />
              ))}
            </div>

            <div style={{ display: 'grid', gap: '12px', marginTop: '20px' }}>
              {patchSegments.map((segment) => (
                <div key={segment.label} className="patch-legend-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="patch-dot" style={{ background: segment.color }}></span>
                    <span>{segment.label}</span>
                  </div>
                  <span className="widget-subtext">
                    {segment.done}/{segment.total}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28 }}
        >
          <div className="card-header">
            <div className="card-title">🚀 Active Scans</div>
            <button className="btn btn-secondary" onClick={handleOpenScans}>Abrir AI Pentesting</button>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gap: '16px' }}>
              {activeScans.map((scan) => (
                <div
                  key={scan.id}
                  className={`scan-item ${scan.status === 'RUNNING' ? 'pulse-scan' : ''}`}
                  onClick={handleOpenScans}
                  title={`${scan.target} · ${scan.progress}% · ETA ${scan.eta}`}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', gap: '16px' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{scan.target}</div>
                      <div className="widget-subtext">ETA: {scan.eta}</div>
                    </div>
                    <div className={`severity-badge ${scan.status === 'RUNNING' ? 'severity-low' : 'severity-medium'}`}>
                      {scan.status}
                    </div>
                  </div>
                  <div className="scan-progress-track">
                    <div className="scan-progress-fill" style={{ width: `${scan.progress}%` }}></div>
                  </div>
                  <div className="widget-subtext" style={{ marginTop: '8px' }}>
                    {scan.progress}% completado
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};