import { useState } from 'react'
import {
  MapPin, Globe, Mail, Edit2, Download,
  Plus, Star, Award, ExternalLink, Calendar,
  Code, Layers, BrainCircuit, BarChart3
} from 'lucide-react'
import Badge from '../components/ui/Badge'
import TrustScore from '../components/ui/TrustScore'
import VerificationBadge from '../components/ui/VerificationBadge'
import Button from '../components/ui/Button'

const skills = [
  { name: 'Distributed Systems', level: 92, category: 'Engineering' },
  { name: 'Cloud Architecture', level: 88, category: 'Engineering' },
  { name: 'Go / Golang', level: 85, category: 'Languages' },
  { name: 'Kubernetes', level: 80, category: 'DevOps' },
  { name: 'TypeScript', level: 78, category: 'Languages' },
  { name: 'System Design', level: 90, category: 'Engineering' },
  { name: 'PostgreSQL', level: 76, category: 'Data' },
  { name: 'Team Leadership', level: 72, category: 'Leadership' },
]

const experience = [
  {
    title: 'Software Engineer III',
    company: 'Google',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=40&h=40&fit=crop&auto=format',
    period: 'Mar 2021 – Present',
    location: 'Mountain View, CA',
    verified: true,
    description: 'Lead infrastructure engineer on Google Maps routing systems. Designed distributed compute pipeline processing 8B+ daily route requests. Reduced P99 latency by 40% through algorithmic optimization.',
    tags: ['Go', 'Spanner', 'Kubernetes', 'Distributed Systems'],
  },
  {
    title: 'Backend Engineer',
    company: 'Stripe',
    logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=40&h=40&fit=crop&auto=format',
    period: 'Jun 2018 – Feb 2021',
    location: 'San Francisco, CA',
    verified: true,
    description: 'Built core payments infrastructure handling $350B+ annual payment volume. Designed fraud detection ML pipeline reducing false positives by 28%.',
    tags: ['Ruby', 'Java', 'MySQL', 'ML', 'Payments'],
  },
]

const education = [
  {
    degree: 'BSc Computer Science',
    institution: 'Massachusetts Institute of Technology',
    period: '2014 – 2018',
    gpa: '3.9 / 4.0',
    verified: true,
  },
]

const certifications = [
  { name: 'Google Cloud Professional Architect', issuer: 'Google Cloud', year: '2024', verified: true },
  { name: 'AWS Solutions Architect Associate', issuer: 'Amazon Web Services', year: '2022', verified: true },
  { name: 'Certified Kubernetes Administrator', issuer: 'CNCF', year: '2023', verified: true },
]

const portfolio = [
  {
    title: 'Distributed Route Planner',
    desc: 'Open-source route optimization at scale — 2.4k GitHub stars',
    tags: ['Go', 'Distributed Systems'],
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=180&fit=crop&auto=format',
  },
  {
    title: 'ML Fraud Detection Pipeline',
    desc: 'Real-time fraud scoring system. 28% reduction in false positives.',
    tags: ['ML', 'Python', 'Kafka'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=180&fit=crop&auto=format',
  },
  {
    title: 'PROFILE OS Contributor',
    desc: 'Core contributor to open-source professional identity protocol',
    tags: ['TypeScript', 'Protocol Design'],
    img: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=300&h=180&fit=crop&auto=format',
  },
]

type ProfileTab = 'overview' | 'experience' | 'education' | 'skills' | 'projects' | 'publications' | 'portfolio' | 'cv'

const tools = [
  { name: 'Figma', category: 'Design' }, { name: 'VS Code', category: 'Dev' }, { name: 'Terraform', category: 'DevOps' },
  { name: 'Datadog', category: 'Ops' }, { name: 'Notion', category: 'Productivity' }, { name: 'Slack', category: 'Comms' },
  { name: 'ChatGPT', category: 'AI' }, { name: 'Linear', category: 'Productivity' },
]

const projects = [
  {
    name: 'Distributed Route Planner', role: 'Lead Engineer', status: 'ongoing',
    desc: 'Open-source route optimization library processing 2B+ daily path requests. 2.4k GitHub stars.',
    skills: ['Go', 'Distributed Systems', 'gRPC'], img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=180&fit=crop&auto=format',
    attribution: true,
  },
  {
    name: 'ML Fraud Detection Pipeline', role: 'Co-author', status: 'completed',
    desc: 'Real-time fraud scoring at Stripe. Reduced false positives 28%, deployed to 100+ countries.',
    skills: ['ML', 'Python', 'Kafka', 'Spark'], img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=180&fit=crop&auto=format',
    attribution: true,
  },
]

const publications = [
  {
    title: 'Scaling Route Optimization: Lessons from 8 Billion Daily Requests',
    journal: 'ACM SIGOPS Operating Systems Review', year: '2024', doi: '10.1145/xyz',
    coauthors: ['M. Park', 'J. Lin'], verified: true,
  },
  {
    title: 'Adaptive Fraud Detection in High-Frequency Payment Streams',
    journal: 'IEEE Transactions on Dependable and Secure Computing', year: '2022', doi: '10.1109/abc',
    coauthors: ['A. Diallo', 'F. Al-Hassan'], verified: true,
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview')

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      {/* Cover + Avatar */}
      <div className="relative mb-4">
        <div className="h-40 lg:h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0A2E8A] via-[#1565D8] to-[#1E88E5]">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop&auto=format"
            alt="Profile cover"
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E8A]/60 to-transparent" />
        </div>

        <div className="absolute -bottom-12 left-5 flex items-end gap-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&auto=format"
              alt="James Okafor"
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-lg"
            />
            <div className="absolute -bottom-1.5 -right-1.5">
              <VerificationBadge level="verified" size="md" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 right-4 flex gap-2">
          <Button variant="ghost" size="sm" icon={<Edit2 size={13} />} className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20">
            Edit Profile
          </Button>
          <Button variant="ghost" size="sm" icon={<Download size={13} />} className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20">
            Download CV
          </Button>
        </div>
      </div>

      {/* Profile header */}
      <div className="mt-14 mb-5 flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>James Okafor</h1>
            <VerificationBadge level="verified" size="md" showLabel />
            <VerificationBadge level="premium" size="md" showLabel />
          </div>
          <div className="text-slate-600 font-medium mt-1">Software Engineer III · Google</div>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-500">
            <span className="flex items-center gap-1"><MapPin size={13} />Mountain View, CA</span>
            <span className="flex items-center gap-1"><Globe size={13} />jamesokafor.dev</span>
            <span className="flex items-center gap-1"><Mail size={13} />james@example.com</span>
          </div>
          <div className="flex gap-2 mt-3">
            <Badge variant="blue" size="md">Open to Opportunities</Badge>
            <Badge variant="gold" size="md">Top 1% Engineer</Badge>
          </div>
        </div>
        <TrustScore score={87} size="lg" />
      </div>

      {/* Social links + connections */}
      <div className="flex items-center gap-4 mb-5 pb-5 border-b border-slate-100 flex-wrap">
        <div className="flex gap-2">
          {[
            { icon: Globe, label: 'GitHub' },
            { icon: Globe, label: 'LinkedIn' },
            { icon: Globe, label: 'Website' },
          ].map(({ icon: Icon, label }) => (
            <button key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-600 text-xs font-medium cursor-pointer transition-colors">
              <Icon size={13} />{label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm ml-auto">
          <div className="text-center">
            <div className="font-bold text-slate-800">4,200</div>
            <div className="text-xs text-slate-400">Connections</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-slate-800">28,400</div>
            <div className="text-xs text-slate-400">Followers</div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm">Connect</Button>
          <Button variant="outline" size="sm">Message</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6 overflow-x-auto">
        {([
          ['overview', 'Overview'], ['experience', 'Experience'], ['education', 'Education'],
          ['skills', 'Skills & Tools'], ['projects', 'Projects'], ['publications', 'Publications'],
          ['portfolio', 'Portfolio'], ['cv', 'CV Builder'],
        ] as [ProfileTab, string][]).map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-5">
          <div className="space-y-5">
            {/* About */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-bold text-slate-800 mb-3" style={{ fontFamily: 'Plus Jakarta Sans' }}>About</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Software Engineer specializing in distributed systems and infrastructure at scale. At Google, I lead engineering on Maps routing infrastructure — systems that process billions of daily requests across 220+ countries. Previously at Stripe where I worked on core payments infrastructure.
              </p>
              <p className="text-sm text-slate-700 leading-relaxed mt-3">
                MIT CS grad. Open-source contributor. Interested in problems at the intersection of reliability, performance, and global scale.
              </p>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Skills</h3>
                <Badge variant="blue" size="sm">8 Verified</Badge>
              </div>
              <div className="space-y-3">
                {skills.map(({ name, level, category }) => (
                  <div key={name}>
                    <div className="flex justify-between text-xs mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-700">{name}</span>
                        <span className="text-slate-400 text-[10px]">{category}</span>
                      </div>
                      <span className="font-mono font-semibold text-slate-600">{level}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-1.5 rounded-full bg-[#1565D8]"
                        style={{ width: `${level}%`, transition: 'width 0.6s ease' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Certifications</h3>
                <button className="text-[#1565D8] text-xs font-semibold cursor-pointer">+ Add</button>
              </div>
              <div className="space-y-3">
                {certifications.map(cert => (
                  <div key={cert.name} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EEF4FF] flex items-center justify-center shrink-0">
                      <Award size={15} className="text-[#1565D8]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-800">{cert.name}</div>
                      <div className="text-xs text-slate-500">{cert.issuer} · {cert.year}</div>
                    </div>
                    {cert.verified && <VerificationBadge level="verified" size="sm" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick stats */}
            {[
              { icon: Code, label: 'Years Coding', value: '10+', color: '#1565D8', bg: '#EEF4FF' },
              { icon: Layers, label: 'Projects Delivered', value: '84', color: '#7C3AED', bg: '#EDE9FE' },
              { icon: BrainCircuit, label: 'Skills Verified', value: '8', color: '#16A34A', bg: '#DCFCE7' },
              { icon: BarChart3, label: 'Profile Strength', value: '78%', color: '#F4B400', bg: '#FFF8E1' },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className="bg-white rounded-xl border border-slate-100 p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: bg }}>
                  <Icon size={16} color={color} />
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-800 leading-none" style={{ fontFamily: 'Plus Jakarta Sans' }}>{value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'experience' && (
        <div className="space-y-4">
          {[...experience].map((exp, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>{exp.title}</h3>
                        {exp.verified && <VerificationBadge level="verified" size="sm" showLabel />}
                      </div>
                      <div className="text-sm text-slate-600 mt-0.5">{exp.company}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500 flex items-center gap-1"><Calendar size={11} />{exp.period}</div>
                      <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1 justify-end"><MapPin size={11} />{exp.location}</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed mt-3">{exp.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.tags.map(tag => <Badge key={tag} variant="blue" size="sm">{tag}</Badge>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {education.map(edu => (
            <div key={edu.degree} className="bg-white rounded-2xl border border-slate-100 p-5">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>{edu.degree}</h3>
                    {edu.verified && <VerificationBadge level="institution" size="sm" showLabel />}
                  </div>
                  <div className="text-sm text-slate-600 mt-0.5">{edu.institution}</div>
                  <div className="text-xs text-slate-400 mt-0.5">GPA: {edu.gpa}</div>
                </div>
                <div className="text-xs text-slate-500">{edu.period}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'education' && (
        <div className="space-y-4">
          {education.map(edu => (
            <div key={edu.degree} className="bg-white rounded-2xl border border-slate-100 p-5">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>{edu.degree}</h3>
                    {edu.verified && <VerificationBadge level="institution" size="sm" showLabel />}
                  </div>
                  <div className="text-sm text-slate-600 mt-0.5">{edu.institution}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{edu.period} · GPA: {edu.gpa}</div>
                </div>
                <Badge variant="success" size="sm">Verified</Badge>
              </div>
            </div>
          ))}
          <button className="w-full border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center text-sm font-semibold text-slate-400 hover:border-[#0057D9] hover:text-[#0057D9] transition-all cursor-pointer flex items-center justify-center gap-2">
            <Plus size={15} />Add education
          </button>
        </div>
      )}

      {activeTab === 'skills' && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
          <div>
            <h3 className="font-bold text-slate-800 mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>Skills</h3>
            <div className="space-y-3">
              {skills.map(skill => (
                <div key={skill.name} className="bg-white border border-slate-100 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-800">{skill.name}</span>
                      <Badge variant="outline" size="sm">{skill.category}</Badge>
                    </div>
                    <span className="text-xs font-bold text-[#0057D9]">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-1.5 bg-[#0057D9] rounded-full transition-all" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center text-sm font-semibold text-slate-400 hover:border-[#0057D9] hover:text-[#0057D9] transition-all cursor-pointer flex items-center justify-center gap-2">
              <Plus size={15} />Add skill
            </button>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>Tools</h3>
            <div className="flex flex-wrap gap-2">
              {tools.map(tool => (
                <div key={tool.name} className="bg-white border border-slate-100 rounded-xl px-3 py-2 flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-slate-700">{tool.name}</span>
                  <span className="text-[10px] font-bold text-slate-400">{tool.category}</span>
                </div>
              ))}
              <button className="border-2 border-dashed border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-400 hover:border-[#0057D9] hover:text-[#0057D9] transition-all cursor-pointer flex items-center gap-1">
                <Plus size={13} />Add tool
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="space-y-4">
          {projects.map(project => (
            <div key={project.name} className="bg-white rounded-2xl border border-slate-100 overflow-hidden card-hover cursor-pointer">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-48 h-36 md:h-auto bg-slate-100 shrink-0">
                  <img src={project.img} alt={project.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>{project.name}</h3>
                        {project.attribution && <Badge variant="blue" size="sm">Attributed</Badge>}
                        <Badge variant={project.status === 'ongoing' ? 'success' : 'outline'} size="sm">{project.status}</Badge>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">Role: {project.role}</div>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <ExternalLink size={14} className="text-slate-400" />
                    </button>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed mt-2">{project.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.skills.map(s => <Badge key={s} variant="blue" size="sm">{s}</Badge>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button className="w-full border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center text-sm font-semibold text-slate-400 hover:border-[#0057D9] hover:text-[#0057D9] transition-all cursor-pointer flex items-center justify-center gap-2">
            <Plus size={15} />Add project
          </button>
        </div>
      )}

      {activeTab === 'publications' && (
        <div className="space-y-4">
          {publications.map(pub => (
            <div key={pub.title} className="bg-white border border-slate-100 rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-start gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-800 text-sm leading-snug" style={{ fontFamily: 'Plus Jakarta Sans' }}>{pub.title}</h3>
                    {pub.verified && <VerificationBadge level="verified" size="sm" />}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">{pub.journal} · {pub.year}</div>
                  <div className="text-xs text-slate-400 mt-0.5">With {pub.coauthors.join(', ')}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button className="text-xs font-bold text-[#0057D9] hover:underline cursor-pointer flex items-center gap-1">
                      <ExternalLink size={10} />DOI: {pub.doi}
                    </button>
                    <Badge variant="blue" size="sm">Peer reviewed</Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button className="w-full border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center text-sm font-semibold text-slate-400 hover:border-[#0057D9] hover:text-[#0057D9] transition-all cursor-pointer flex items-center justify-center gap-2">
            <Plus size={15} />Add publication
          </button>
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolio.map(item => (
            <div key={item.title} className="bg-white rounded-2xl border border-slate-100 overflow-hidden card-hover cursor-pointer">
              <div className="h-36 overflow-hidden bg-slate-100">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-800 text-sm" style={{ fontFamily: 'Plus Jakarta Sans' }}>{item.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.tags.map(tag => <Badge key={tag} variant="blue" size="sm">{tag}</Badge>)}
                </div>
                <button className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#1565D8] cursor-pointer">
                  View Project <ExternalLink size={11} />
                </button>
              </div>
            </div>
          ))}
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 p-8 cursor-pointer hover:border-[#1565D8] hover:bg-[#EEF4FF] transition-all group">
            <div className="w-10 h-10 rounded-xl bg-slate-200 group-hover:bg-[#1565D8] flex items-center justify-center transition-colors">
              <Plus size={20} className="text-slate-500 group-hover:text-white transition-colors" />
            </div>
            <span className="text-sm font-semibold text-slate-400 group-hover:text-[#1565D8]">Add Portfolio Item</span>
          </div>
        </div>
      )}

      {activeTab === 'cv' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-8 max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>CV Builder</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" icon={<Download size={13} />}>Export PDF</Button>
              <Button size="sm" icon={<Star size={13} />}>AI Enhance</Button>
            </div>
          </div>
          <div className="space-y-6 text-sm">
            <div className="border-b-2 border-slate-900 pb-4">
              <h1 className="text-2xl font-black text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans' }}>James Okafor</h1>
              <div className="text-slate-600 mt-1">Software Engineer III · Distributed Systems & Infrastructure</div>
              <div className="text-xs text-slate-400 mt-1">Mountain View, CA · james@example.com · jamesokafor.dev</div>
            </div>
            {['Experience', 'Education', 'Certifications', 'Skills'].map(section => (
              <div key={section}>
                <div className="text-[11px] font-black tracking-widest text-slate-400 uppercase border-b border-slate-100 pb-1 mb-2">{section}</div>
                <div className="text-xs text-slate-500 italic">Click to edit {section.toLowerCase()}...</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
