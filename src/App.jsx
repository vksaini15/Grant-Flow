import React, { useState } from 'react';
import { 
  PieChart, DollarSign, Calculator, Search, Filter, 
  ArrowRight, ShieldCheck, Download, Award, TrendingUp, ChevronRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';

const TOTAL_BUDGET = 250000;

const BUDGET_FLOWS = [
  { source: 'Student Activity Fee ($250k)', target: 'Technical & Engineering Clubs', amount: 95000, color: '#3b82f6', percent: '38%' },
  { source: 'Student Activity Fee ($250k)', target: 'Cultural & Arts Societies', amount: 55000, color: '#ec4899', percent: '22%' },
  { source: 'Student Activity Fee ($250k)', target: 'Sports & Athletics Council', amount: 45000, color: '#10b981', percent: '18%' },
  { source: 'Student Activity Fee ($250k)', target: 'Open Project Innovation Grants', amount: 35000, color: '#f59e0b', percent: '14%' },
  { source: 'Student Activity Fee ($250k)', target: 'Union Emergency Contingency Reserve', amount: 20000, color: '#6366f1', percent: '8%' }
];

const EXPENDITURE_LOGS = [
  { id: 1, club: 'OWASP Student Chapter', category: 'Technical', item: 'Hackathon Server Infrastructure & CTF Cloud Credits', spent: 1850, date: 'Nov 02, 2026', status: 'Audited' },
  { id: 2, club: 'Robotics & Automation Society', category: 'Technical', item: 'Micro-controller Kits, LiPo Packs & 3D Filament', spent: 3400, date: 'Oct 28, 2026', status: 'Audited' },
  { id: 3, club: 'Music & Dramatics Society', category: 'Cultural', item: 'Stage Acoustic Rental & PA Microphone Upgrades', spent: 2100, date: 'Oct 22, 2026', status: 'Audited' },
  { id: 4, club: 'Inter-College Badminton Team', category: 'Sports', item: 'Yonex Tournament Shuttles & Stringing Services', spent: 890, date: 'Oct 15, 2026', status: 'Audited' },
  { id: 5, club: 'Autonomous Drone Lab', category: 'Innovation Grant', item: 'Carbon Fiber Quadcopter Frames & ESC Motors', spent: 4200, date: 'Oct 08, 2026', status: 'Audited' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('flow');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Interactive Grant Calculator State
  const [calcClubName, setCalcClubName] = useState('');
  const [calcMembers, setCalcMembers] = useState(25);
  const [calcEventType, setCalcEventType] = useState('Hackathon / Tech Fest');
  const [calcHasOutreach, setCalcHasOutreach] = useState(true);
  const [estimatedGrant, setEstimatedGrant] = useState(null);

  const calculateGrant = (e) => {
    e.preventDefault();
    let base = 500;
    
    // Member tier
    if (calcMembers > 50) base += 1200;
    else if (calcMembers > 20) base += 700;
    else base += 300;

    // Event multiplier
    if (calcEventType === 'Hackathon / Tech Fest') base += 1500;
    if (calcEventType === 'National Conference') base += 1200;
    if (calcEventType === 'Internal Workshop') base += 400;

    // Public community benefit bonus
    if (calcHasOutreach) base += 600;

    setEstimatedGrant(base);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const filteredLogs = EXPENDITURE_LOGS.filter(log => {
    const matchesSearch = log.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.item.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || log.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#090d16', color: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Top Header */}
      <header style={{ background: '#0f172a', borderBottom: '1px solid #1e293b', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '38px', height: '38px', background: '#3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={22} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>GrantFlow</h1>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Student Union Budget Transparency & Open-Ledger Portal</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', background: '#064e3b', color: '#6ee7b7', padding: '6px 12px', borderRadius: '999px', border: '1px solid #059669' }}>
          <ShieldCheck size={16} /> Verified 2026-2027 Fiscal Year Ledger
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
        
        {/* Metric Summary Ribbon */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '24px' }}>
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Total Student Fee Pool</span>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#38bdf8', marginTop: '4px' }}>$250,000</div>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Derived from 12,500 active students</span>
          </div>

          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Disbursed to Clubs</span>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#10b981', marginTop: '4px' }}>$195,000</div>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Across 48 recognized campus orgs</span>
          </div>

          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Unallocated Project Pool</span>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#f59e0b', marginTop: '4px' }}>$35,000</div>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Open for student initiative grants</span>
          </div>

          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Emergency Reserve</span>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#818cf8', marginTop: '4px' }}>$20,000</div>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Locked for unexpected contingencies</span>
          </div>
        </section>

        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => setActiveTab('flow')}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'flow' ? '#3b82f6' : '#1e293b',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <PieChart size={16} /> Budget Allocation Sankey Breakdown
          </button>

          <button
            onClick={() => setActiveTab('ledger')}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'ledger' ? '#3b82f6' : '#1e293b',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Search size={16} /> Public Expenditure Database
          </button>

          <button
            onClick={() => setActiveTab('calc')}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'calc' ? '#3b82f6' : '#1e293b',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Calculator size={16} /> Grant Eligibility Calculator
          </button>
        </div>

        {/* Tab 1: Interactive Sankey Flow Simulator */}
        {activeTab === 'flow' && (
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Capital Allocation Path (Student Union Treasury)</h3>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0' }}>Interactive breakdown tracking fee collection down to distinct departmental pots</p>
              </div>
              <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: '700' }}>100% Accounted</span>
            </div>

            {/* Visual Sankey Nodes & Vectors */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {BUDGET_FLOWS.map((flow, index) => (
                <div key={index} style={{ background: '#030712', borderRadius: '12px', padding: '16px', border: '1px solid #1e293b' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#94a3b8' }}>{flow.source}</span>
                      <ArrowRight size={14} color="#64748b" />
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#f8fafc' }}>{flow.target}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '15px', fontWeight: '800', color: flow.color }}>${flow.amount.toLocaleString()}</span>
                      <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '6px' }}>({flow.percent})</span>
                    </div>
                  </div>

                  {/* Flow Volume Bar */}
                  <div style={{ width: '100%', height: '8px', background: '#1e293b', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: flow.percent, height: '100%', background: flow.color, borderRadius: '999px', transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Searchable Spending Database */}
        {activeTab === 'ledger' && (
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '12px', marginBottom: '20px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748b' }} />
                <input
                  type="text"
                  placeholder="Search club name or purchased equipment..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px 10px 36px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                style={{ padding: '10px 12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc', fontSize: '13px' }}
              >
                <option value="All">All Categories</option>
                <option value="Technical">Technical</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
                <option value="Innovation Grant">Innovation Grant</option>
              </select>
            </div>

            {/* Expenditure Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
                    <th style={{ padding: '10px 14px' }}>Organization</th>
                    <th style={{ padding: '10px 14px' }}>Category</th>
                    <th style={{ padding: '10px 14px' }}>Purchased Items / Service</th>
                    <th style={{ padding: '10px 14px' }}>Amount</th>
                    <th style={{ padding: '10px 14px' }}>Date</th>
                    <th style={{ padding: '10px 14px' }}>Audit Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #1e293b' }}>
                      <td style={{ padding: '12px 14px', fontWeight: '700', color: '#f8fafc' }}>{item.club}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ fontSize: '11px', background: '#1e293b', color: '#38bdf8', padding: '3px 8px', borderRadius: '4px' }}>
                          {item.category}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>{item.item}</td>
                      <td style={{ padding: '12px 14px', fontWeight: '700', color: '#10b981' }}>${item.spent}</td>
                      <td style={{ padding: '12px 14px', color: '#64748b' }}>{item.date}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ fontSize: '11px', color: '#047857', background: '#ecfdf5', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>
                          ✓ {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Interactive Grant-Eligibility Calculator */}
        {activeTab === 'calc' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '24px' }}>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Calculator size={20} color="#f59e0b" />
                <h3 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Project Funding Estimator</h3>
              </div>
              <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '20px' }}>
                Find out how much funding your student group or technical team is eligible to claim from the unallocated $35,000 project pool.
              </p>

              <form onSubmit={calculateGrant} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#94a3b8' }}>Student Club / Project Initiative Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Campus Satellite Team"
                    value={calcClubName}
                    onChange={e => setCalcClubName(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: '#94a3b8' }}>Active Student Beneficiaries ({calcMembers})</label>
                    <input
                      type="range"
                      min={5}
                      max={120}
                      value={calcMembers}
                      onChange={e => setCalcMembers(parseInt(e.target.value))}
                      style={{ width: '100%', marginTop: '8px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', color: '#94a3b8' }}>Proposed Initiative Type</label>
                    <select
                      value={calcEventType}
                      onChange={e => setCalcEventType(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#fff', fontSize: '13px', marginTop: '4px' }}
                    >
                      <option value="Hackathon / Tech Fest">Hackathon / Tech Fest</option>
                      <option value="National Conference">National Conference</option>
                      <option value="Internal Workshop">Internal Workshop</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                  <input
                    type="checkbox"
                    id="outreach"
                    checked={calcHasOutreach}
                    onChange={e => setCalcHasOutreach(e.target.checked)}
                  />
                  <label htmlFor="outreach" style={{ fontSize: '12px', color: '#cbd5e1', cursor: 'pointer' }}>
                    Open to campus-wide student participation (+ Community Grant Multiplier)
                  </label>
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: '10px',
                    padding: '12px',
                    background: '#f59e0b',
                    color: '#000000',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '800',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Estimate Eligible Grant Pool
                </button>
              </form>
            </div>

            {/* Estimation Output Card */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Estimated Grant Approval
              </span>
              
              <div style={{ fontSize: '48px', fontWeight: '900', color: estimatedGrant ? '#10b981' : '#64748b', margin: '8px 0' }}>
                ${estimatedGrant ? estimatedGrant.toLocaleString() : '---'}
              </div>

              <p style={{ fontSize: '12px', color: '#cbd5e1', maxWidth: '320px', margin: '0 auto 16px auto' }}>
                {estimatedGrant ? `Calculated based on ${calcMembers} members and official ${calcEventType} criteria.` : 'Complete the form parameters to run the university treasury grant evaluation.'}
              </p>

              {estimatedGrant && (
                <div style={{ background: '#030712', padding: '12px', borderRadius: '8px', border: '1px solid #1e293b', fontSize: '12px', color: '#6ee7b7' }}>
                  ✓ Within the $35,000 active innovation allocation cap
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}