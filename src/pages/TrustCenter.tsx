import { useState } from 'react'
import {
  Shield, CheckCircle, Clock, Upload,
  FileText, ChevronRight, ExternalLink, AlertCircle, Plus, Lock
} from '../components/ui/icons'
import Badge from '../components/ui/Badge'
import TrustScore from '../components/ui/TrustScore'
import VerificationBadge from '../components/ui/VerificationBadge'
import Button from '../components/ui/Button'

const credentials = [
  {
    id: 1,
    title: 'Bachelor of Science, Computer Science',
    issuer: 'Massachusetts Institute of Technology',
    type: 'education',
    date: 'June 2018',
    status: 'verified',
    verifier: 'MIT Registrar',
    trustPoints: 25,
  },
  {
    id: 2,
    title: 'Google Cloud Professional Cloud Architect',
    issuer: 'Google Cloud',
    type: 'certification',
    date: 'January 2024',
    status: 'verified',
    verifier: 'Google Certification',
    trustPoints: 15,
  },
  {
    id: 3,
    title: 'Software Engineer III',
    issuer: 'Google LLC',
    type: 'employment',
    date: 'March 2021 – Present',
    status: 'pending',
    verifier: 'Google HR',
    trustPoints: 30,
  },
  {
    id: 4,
    title: 'AWS Solutions Architect Associate',
    issuer: 'Amazon Web Services',
    type: 'certification',
    date: 'August 2022',
    status: 'verified',
    verifier: 'AWS Certification',
    trustPoints: 12,
  },
  {
    id: 5,
    title: 'Professional Reference — Dr. Sarah Chen',
    issuer: 'MIT CSAIL Research',
    type: 'reference',
    date: 'Submitted Oct 2023',
    status: 'action',
    verifier: null,
    trustPoints: 10,
  },
]

const timeline = [
  { date: 'Jan 15, 2024', event: 'Google Cloud Architect cert verified by Google Certification', points: '+15', positive: true },
  { date: 'Dec 2, 2023', event: 'AWS Solutions Architect cert verified', points: '+12', positive: true },
  { date: 'Nov 18, 2023', event: 'Professional reference request sent to Dr. Sarah Chen', points: '0', positive: false },
  { date: 'Sep 5, 2022', event: 'BSc Computer Science verified by MIT Registrar', points: '+25', positive: true },
  { date: 'Mar 1, 2021', event: 'Employment at Google submitted for verification', points: 'Pending', positive: false },
]

const trustBreakdown = [
  { category: 'Education Credentials', score: 25, max: 25, color: '#1565D8' },
  { category: 'Work Experience', score: 0, max: 30, color: '#7C3AED', pending: true },
  { category: 'Certifications', score: 27, max: 30, color: '#16A34A' },
  { category: 'References', score: 0, max: 15, color: '#F4B400', action: true },
  { category: 'Skills Assessed', score: 10, max: 15, color: '#0891B2' },
  { category: 'Portfolio Evidence', score: 12, max: 15, color: '#DB2777' },
  { category: 'Identity Verified', score: 10, max: 10, color: '#059669' },
  { category: 'Community Trust', score: 3, max: 10, color: '#9333EA' },
]

const statusIcon = { verified: CheckCircle, pending: Clock, action: AlertCircle }
const statusStyle = {
  verified: 'text-[#1565D8] bg-[#EEF4FF]',
  pending: 'text-amber-600 bg-amber-50',
  action: 'text-red-600 bg-red-50',
}

export default function TrustCenter() {
  const [activeTab, setActiveTab] = useState<'overview' | 'credentials' | 'timeline' | 'privacy'>('overview')
  const total = trustBreakdown.reduce((a, b) => a + b.score, 0)

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield size={20} className="text-[#1565D8]" />
            <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Trust Center</h1>
          </div>
          <p className="text-slate-500 text-sm">Your verified professional identity — built on evidence, confirmed by institutions.</p>
        </div>
        <Button icon={<Plus size={15} />}>Add Credential</Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6 overflow-x-auto">
        {(['overview', 'credentials', 'timeline', 'privacy'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          <div className="space-y-5">
            {/* Score breakdown */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <div className="flex items-center gap-6 mb-6">
                <TrustScore score={87} size="lg" />
                <div>
                  <div className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>{total}<span className="text-slate-400 text-lg">/150</span></div>
                  <div className="text-sm text-slate-500">Trust Points Earned</div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <VerificationBadge level="verified" size="sm" showLabel />
                    <VerificationBadge level="trusted" size="sm" showLabel />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {trustBreakdown.map(({ category, score, max, color, pending, action }) => (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-600 font-medium">{category}</span>
                      <div className="flex items-center gap-1.5">
                        {pending && <Badge variant="warning" size="sm">Pending</Badge>}
                        {action && <Badge variant="error" size="sm">Action needed</Badge>}
                        <span className="text-xs font-mono font-semibold text-slate-700">{score}/{max}</span>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-2 rounded-full transition-all duration-700"
                        style={{ width: `${(score / max) * 100}%`, backgroundColor: color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Credentials list */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Credentials</h3>
                <button className="text-[#1565D8] text-xs font-semibold flex items-center gap-1 cursor-pointer">
                  View all <ChevronRight size={12} />
                </button>
              </div>
              <div className="space-y-3">
                {credentials.slice(0, 4).map(cred => {
                  const StatusIcon = statusIcon[cred.status as keyof typeof statusIcon]
                  return (
                    <div key={cred.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${statusStyle[cred.status as keyof typeof statusStyle]}`}>
                        <StatusIcon size={15} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-slate-800 leading-tight">{cred.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{cred.issuer} · {cred.date}</div>
                        {cred.verifier && (
                          <div className="text-[11px] text-[#1565D8] mt-1 flex items-center gap-1">
                            <Shield size={10} /> Verified by {cred.verifier}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-bold text-green-600">+{cred.trustPoints}pts</span>
                        <ExternalLink size={12} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-[#0A2E8A] to-[#1565D8] rounded-2xl p-5 text-white">
              <Lock size={20} className="mb-3 text-blue-200" />
              <h4 className="font-bold text-base mb-1" style={{ fontFamily: 'Plus Jakarta Sans' }}>Blockchain Anchored</h4>
              <p className="text-blue-200 text-xs leading-relaxed">Your trust record is cryptographically signed and immutably anchored to the PROFILE Trust Chain.</p>
              <button className="mt-3 text-xs font-semibold text-[#F4B400] flex items-center gap-1 cursor-pointer">
                View chain record <ExternalLink size={11} />
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h4 className="font-bold text-slate-800 text-sm mb-3" style={{ fontFamily: 'Plus Jakarta Sans' }}>Pending Actions</h4>
              <div className="space-y-2.5">
                {credentials.filter(c => c.status !== 'verified').map(cred => (
                  <div key={cred.id} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${cred.status === 'pending' ? 'bg-amber-400' : 'bg-red-400'}`} />
                    <span className="text-xs text-slate-700 flex-1 leading-tight">{cred.title}</span>
                    {cred.status === 'action' && (
                      <button className="text-[11px] font-bold text-[#1565D8] cursor-pointer whitespace-nowrap">Fix</button>
                    )}
                  </div>
                ))}
              </div>
              <Button variant="secondary" size="sm" fullWidth className="mt-3">
                <Upload size={13} />Resume Verification
              </Button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h4 className="font-bold text-slate-800 text-sm mb-3" style={{ fontFamily: 'Plus Jakarta Sans' }}>Share Trust Report</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">Generate a verified PDF or shareable link of your trust profile to send to recruiters or institutions.</p>
              <Button variant="outline" size="sm" fullWidth icon={<FileText size={13} />}>
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'credentials' && (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>All Credentials</h3>
            <Button icon={<Plus size={14} />} size="sm">Add New</Button>
          </div>
          <div className="divide-y divide-slate-50">
            {credentials.map(cred => {
              const StatusIcon = statusIcon[cred.status as keyof typeof statusIcon]
              return (
                <div key={cred.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 cursor-pointer transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${statusStyle[cred.status as keyof typeof statusStyle]}`}>
                    <StatusIcon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-slate-800">{cred.title}</span>
                      <Badge
                        variant={cred.status === 'verified' ? 'blue' : cred.status === 'pending' ? 'warning' : 'error'}
                        size="sm"
                      >
                        {cred.status === 'verified' ? 'Verified' : cred.status === 'pending' ? 'In Review' : 'Action Needed'}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{cred.issuer} · {cred.date}</div>
                    {cred.verifier && <div className="text-[11px] text-[#1565D8] mt-1">Verified by {cred.verifier}</div>}
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-green-600">+{cred.trustPoints}</div>
                    <div className="text-[10px] text-slate-400">trust pts</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-bold text-slate-800 mb-5" style={{ fontFamily: 'Plus Jakarta Sans' }}>Trust Timeline</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-100" />
            <div className="space-y-5 ml-4">
              {timeline.map(({ date, event, points, positive }, i) => (
                <div key={i} className="flex items-start gap-4 relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 -ml-4 ${
                    positive ? 'bg-[#EEF4FF] text-[#1565D8]' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {positive ? <CheckCircle size={14} /> : <Clock size={14} />}
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="text-[11px] text-slate-400 font-medium">{date}</div>
                    <div className="text-sm text-slate-700 mt-0.5 leading-relaxed">{event}</div>
                  </div>
                  <span className={`text-sm font-bold shrink-0 ${
                    positive ? 'text-green-600' : points === 'Pending' ? 'text-amber-500' : 'text-slate-400'
                  }`}>{points}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'privacy' && (
        <div className="grid gap-4 max-w-xl">
          {[
            { label: 'Trust Score Visibility', desc: 'Show your overall trust score to profile visitors', on: true },
            { label: 'Credential Details Public', desc: 'Share full credential details with verified recruiters', on: true },
            { label: 'Employer Verification Visible', desc: 'Show current employer on public profile', on: false },
            { label: 'Reference Network Visible', desc: 'Allow others to see who has referenced you', on: true },
            { label: 'Trust Record Export', desc: 'Allow verified institutions to export your trust record', on: false },
          ].map(({ label, desc, on }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-start gap-4">
              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-800">{label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
              </div>
              <button className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer shrink-0 mt-0.5 ${on ? 'bg-[#1565D8]' : 'bg-slate-200'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${on ? 'left-5' : 'left-1'}`} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
