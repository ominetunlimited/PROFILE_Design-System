import { Play, Clock, TrendingUp, Star, Zap } from 'lucide-react'
import Badge from '../components/ui/Badge'

const inProgress = [
  { title: 'System Design at Scale', provider: 'PROFILE Learning', progress: 64, lessons: 24, total: 36, img: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=200&h=120&fit=crop&auto=format', category: 'Engineering' },
  { title: 'Cloud Cost Optimisation', provider: 'AWS Skill Builder', progress: 28, lessons: 8, total: 28, img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&h=120&fit=crop&auto=format', category: 'Cloud' },
]

const recommended = [
  { title: 'Staff Engineer Leadership', provider: 'PROFILE Learning', rating: 4.9, reviews: 2840, hours: 12, img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=160&fit=crop&auto=format', category: 'Leadership', match: 96 },
  { title: 'Go for Senior Engineers', provider: 'Gophers Academy', rating: 4.8, reviews: 1240, hours: 18, img: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=300&h=160&fit=crop&auto=format', category: 'Languages', match: 91 },
  { title: 'PostgreSQL Mastery', provider: 'Database Institute', rating: 4.7, reviews: 3210, hours: 15, img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=160&fit=crop&auto=format', category: 'Data', match: 84 },
]

const paths = [
  { title: 'Staff Engineer Track', desc: 'Architecture, leadership, and technical strategy', courses: 8, hours: 96, progress: 25, color: '#1565D8', bg: '#EEF4FF' },
  { title: 'Cloud Architecture', desc: 'GCP, AWS, and multi-cloud design patterns', courses: 6, hours: 72, progress: 42, color: '#16A34A', bg: '#DCFCE7' },
  { title: 'Engineering Leadership', desc: 'Managing teams, roadmaps, and technical vision', courses: 5, hours: 60, progress: 0, color: '#7C3AED', bg: '#EDE9FE' },
]

export default function Learning() {
  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Learning Center</h1>
        <p className="text-slate-500 text-sm mt-0.5">Curated courses and certifications aligned to your career path.</p>
      </div>

      {/* Continue learning */}
      <div className="mb-7">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-slate-700" style={{ fontFamily: 'Plus Jakarta Sans' }}>Continue Learning</h2>
          <button className="text-xs text-[#1565D8] font-semibold cursor-pointer">View all</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inProgress.map(c => (
            <div key={c.title} className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex card-hover cursor-pointer">
              <div className="w-32 shrink-0 bg-slate-100">
                <img src={c.img} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-4">
                <Badge variant="blue" size="sm">{c.category}</Badge>
                <h3 className="font-bold text-slate-800 text-sm mt-1.5 leading-tight">{c.title}</h3>
                <div className="text-xs text-slate-400 mt-0.5">{c.provider}</div>
                <div className="mt-3">
                  <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                    <span>Lesson {c.lessons}/{c.total}</span>
                    <span className="font-bold text-[#1565D8]">{c.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full">
                    <div className="h-1.5 rounded-full bg-[#1565D8]" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
                <button className="mt-3 flex items-center gap-1 text-xs font-bold text-[#1565D8] cursor-pointer">
                  <Play size={11} fill="#1565D8" /> Resume
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning paths */}
      <div className="mb-7">
        <h2 className="font-bold text-slate-700 mb-3" style={{ fontFamily: 'Plus Jakarta Sans' }}>Career Paths</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {paths.map(p => (
            <div key={p.title} className="bg-white border border-slate-100 rounded-2xl p-5 card-hover cursor-pointer">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: p.bg }}>
                <Zap size={18} color={p.color} />
              </div>
              <h3 className="font-bold text-slate-800 text-sm" style={{ fontFamily: 'Plus Jakarta Sans' }}>{p.title}</h3>
              <p className="text-xs text-slate-500 mt-1 mb-3">{p.desc}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                <span>{p.courses} courses</span>
                <span>{p.hours} hours</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full">
                <div className="h-1.5 rounded-full" style={{ width: `${p.progress}%`, backgroundColor: p.color }} />
              </div>
              <div className="mt-1 text-[11px] font-bold" style={{ color: p.color }}>
                {p.progress > 0 ? `${p.progress}% complete` : 'Not started'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-slate-700" style={{ fontFamily: 'Plus Jakarta Sans' }}>Recommended for You</h2>
          <button className="text-xs text-[#1565D8] font-semibold cursor-pointer">Browse all</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommended.map(c => (
            <div key={c.title} className="bg-white rounded-2xl border border-slate-100 overflow-hidden card-hover cursor-pointer">
              <div className="h-36 bg-slate-100 overflow-hidden relative">
                <img src={c.img} alt="" className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2">
                  <span className="text-[10px] bg-[#1565D8] text-white px-2 py-0.5 rounded-full font-bold">
                    <TrendingUp size={8} className="inline mr-0.5" />{c.match}% match
                  </span>
                </div>
              </div>
              <div className="p-4">
                <Badge variant="outline" size="sm">{c.category}</Badge>
                <h3 className="font-bold text-slate-800 text-sm mt-2 leading-snug">{c.title}</h3>
                <div className="text-xs text-slate-400 mt-0.5">{c.provider}</div>
                <div className="flex items-center gap-2 mt-2">
                  <Star size={11} className="text-[#F4B400]" fill="#F4B400" />
                  <span className="text-xs font-bold text-slate-700">{c.rating}</span>
                  <span className="text-xs text-slate-400">({c.reviews.toLocaleString()})</span>
                  <span className="text-xs text-slate-400 ml-auto flex items-center gap-0.5"><Clock size={10} />{c.hours}h</span>
                </div>
                <button className="mt-3 w-full py-2 bg-[#EEF4FF] hover:bg-[#DBEAFE] text-[#1565D8] text-xs font-bold rounded-xl cursor-pointer transition-colors">
                  Enroll Free
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
