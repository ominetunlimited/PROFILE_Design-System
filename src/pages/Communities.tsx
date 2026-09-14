import { useState } from 'react'
import { Users, TrendingUp, Lock, Plus, Search } from 'lucide-react'
import Badge from '../components/ui/Badge'

const communities = [
  { id: 1, name: 'Distributed Systems Engineers', members: 42800, posts: '1.2k/week', verified: true, joined: true, category: 'Engineering', cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=120&fit=crop&auto=format', privacy: 'public' },
  { id: 2, name: 'Product Designers — Africa & Diaspora', members: 18400, posts: '340/week', verified: true, joined: true, category: 'Design', cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=120&fit=crop&auto=format', privacy: 'public' },
  { id: 3, name: 'ML / AI Researchers', members: 67200, posts: '2.8k/week', verified: true, joined: false, category: 'Research', cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=120&fit=crop&auto=format', privacy: 'public' },
  { id: 4, name: 'Climate Tech Professionals', members: 9800, posts: '180/week', verified: false, joined: false, category: 'Sustainability', cover: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=400&h=120&fit=crop&auto=format', privacy: 'public' },
  { id: 5, name: 'Senior Engineers Peer Group', members: 2400, posts: '120/week', verified: true, joined: false, category: 'Leadership', cover: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=120&fit=crop&auto=format', privacy: 'private' },
  { id: 6, name: 'Healthcare Tech', members: 14200, posts: '480/week', verified: true, joined: false, category: 'Healthcare', cover: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=120&fit=crop&auto=format', privacy: 'public' },
]

export default function Communities() {
  const [joined, setJoined] = useState<number[]>([1, 2])
  const [tab, setTab] = useState<'discover' | 'mine'>('discover')

  const displayed = tab === 'mine' ? communities.filter(c => joined.includes(c.id)) : communities

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Communities</h1>
          <p className="text-slate-500 text-sm mt-0.5">Professional groups and guilds for every discipline and region.</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-[#1565D8] text-white text-sm font-bold rounded-xl cursor-pointer">
          <Plus size={14} /> Create Community
        </button>
      </div>

      <div className="relative mb-5">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder="Search communities by topic, skill, or region..." className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#1565D8]/40 placeholder:text-slate-400" />
      </div>

      <div className="flex gap-2 mb-5">
        {(['discover', 'mine'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize cursor-pointer transition-all ${tab === t ? 'bg-[#1565D8] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'}`}>
            {t === 'mine' ? 'My Communities' : 'Discover'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayed.map(c => (
          <div key={c.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden card-hover cursor-pointer">
            <div className="h-24 bg-slate-100 overflow-hidden relative">
              <img src={c.cover} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute top-2 right-2 flex gap-1.5">
                {c.privacy === 'private' && <span className="text-[10px] bg-black/40 text-white px-1.5 py-0.5 rounded-full font-semibold flex items-center gap-1 backdrop-blur-sm"><Lock size={8} />Private</span>}
                {c.verified && <span className="text-[10px] bg-[#1565D8]/80 text-white px-1.5 py-0.5 rounded-full font-semibold backdrop-blur-sm">Verified</span>}
              </div>
            </div>
            <div className="p-4">
              <Badge variant="outline" size="sm">{c.category}</Badge>
              <h3 className="font-bold text-slate-800 mt-2 text-sm leading-snug" style={{ fontFamily: 'Plus Jakarta Sans' }}>{c.name}</h3>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Users size={11} />{c.members.toLocaleString()}</span>
                <span className="flex items-center gap-1"><TrendingUp size={11} />{c.posts}</span>
              </div>
              <button
                onClick={e => { e.stopPropagation(); setJoined(prev => prev.includes(c.id) ? prev.filter(x => x !== c.id) : [...prev, c.id]) }}
                className={`mt-3 w-full py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  joined.includes(c.id)
                    ? 'bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500'
                    : 'bg-[#1565D8] text-white hover:bg-[#1255C0]'
                }`}
              >
                {joined.includes(c.id) ? 'Joined ✓' : c.privacy === 'private' ? 'Request to Join' : 'Join Community'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
