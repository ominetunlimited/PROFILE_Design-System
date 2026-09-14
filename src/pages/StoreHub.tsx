import { useState } from 'react'
import {
  Store, Plus, Search, Filter, Star, Heart, Package,
  Settings, Tag, ChevronRight, Globe,
  DollarSign, Eye, Edit2, CreditCard
} from 'lucide-react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import VerificationBadge from '../components/ui/VerificationBadge'
import EmptyState from '../components/ui/EmptyState'

type StoreView = 'browse' | 'my-store' | 'create'

const stores = [
  {
    id: 1,
    name: 'Amara Diallo Design Studio',
    owner: { name: 'Amara Diallo', title: 'UX Research Lead · Figma', verified: true },
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=48&h=48&fit=crop&auto=format',
    cover: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=180&fit=crop&auto=format',
    category: 'Design & UX',
    rating: 4.9, reviews: 247, sales: 1840,
    tagline: 'Premium UX courses, templates and consulting for product teams',
    products: 12, featured: true,
  },
  {
    id: 2,
    name: 'Kwame Mentorship Lab',
    owner: { name: 'Kwame Mensah', title: 'Principal Eng · Shopify', verified: true },
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&auto=format',
    cover: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=180&fit=crop&auto=format',
    category: 'Engineering & Career',
    rating: 5.0, reviews: 88, sales: 420,
    tagline: 'Mock interviews, code reviews, and mentorship for senior engineers',
    products: 5, featured: false,
  },
  {
    id: 3,
    name: 'DataSpark Academy',
    owner: { name: 'Dr. Fatima Al-Hassan', title: 'ML Lead · IBM', verified: true },
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=48&h=48&fit=crop&auto=format',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=180&fit=crop&auto=format',
    category: 'Data & AI',
    rating: 4.8, reviews: 1200, sales: 9800,
    tagline: 'Deep-dive courses in ML, data science, and applied AI for practitioners',
    products: 8, featured: true,
  },
]

const myProducts = [
  { id: 1, name: 'Infrastructure Architecture Audit', type: 'service', price: 850, unit: '/project', sales: 12, views: 340, status: 'active' },
  { id: 2, name: 'System Design Interview Prep', type: 'service', price: 180, unit: '/session', sales: 28, views: 620, status: 'active' },
  { id: 3, name: 'Cloud Migration Playbook', type: 'template', price: 49, unit: '', sales: 67, views: 1240, status: 'active' },
]

const createSteps = ['Store info', 'Products', 'Payments', 'Launch']

export default function StoreHub() {
  const [view, setView] = useState<StoreView>('browse')
  const [saved, setSaved] = useState<number[]>([])
  const [createStep, setCreateStep] = useState(1)
  const [hasStore] = useState(true) // mock: user already has a store

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            {view === 'browse' ? 'Marketplace' : view === 'my-store' ? 'My Store' : 'Create Store'}
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {view === 'browse' ? 'Professional services, courses, and tools from verified experts'
              : view === 'my-store' ? '3 products · $2,840 total revenue'
              : 'Set up your professional storefront'}
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-slate-100 rounded-xl p-0.5">
            {(['browse', 'my-store'] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-[10px] text-sm font-semibold transition-all cursor-pointer ${
                  view === v ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
                }`}
              >
                {v === 'browse' ? 'Browse' : 'My Store'}
              </button>
            ))}
          </div>
          {view === 'browse' && <Button size="sm" icon={<Plus size={14} />} onClick={() => setView('create')}>Open Store</Button>}
          {view === 'my-store' && <Button size="sm" icon={<Plus size={14} />}>Add product</Button>}
        </div>
      </div>

      {/* Browse view */}
      {view === 'browse' && (
        <>
          <div className="relative mb-5">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search stores, services, courses..." className="w-full pl-10 pr-32 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0057D9]/40 focus:ring-2 focus:ring-[#0057D9]/10 placeholder:text-slate-400" />
            <Button variant="ghost" size="sm" icon={<Filter size={13} />} className="absolute right-2 top-1/2 -translate-y-1/2">Filter</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stores.map(store => (
              <div key={store.id} className={`bg-white border rounded-2xl overflow-hidden card-hover cursor-pointer ${store.featured ? 'border-[#F4B400]/40 ring-2 ring-[#F4B400]/20' : 'border-slate-100'}`}>
                <div className="relative h-36 bg-slate-100">
                  <img src={store.cover} alt={store.name} className="w-full h-full object-cover" />
                  {store.featured && (
                    <div className="absolute top-3 left-3"><Badge variant="gold" size="sm" icon={<Star size={9} />}>Featured</Badge></div>
                  )}
                  <button
                    onClick={e => { e.stopPropagation(); setSaved(s => s.includes(store.id) ? s.filter(x => x !== store.id) : [...s, store.id]) }}
                    className="absolute top-3 right-3 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow cursor-pointer"
                  >
                    <Heart size={13} fill={saved.includes(store.id) ? '#EF4444' : 'none'} color={saved.includes(store.id) ? '#EF4444' : '#94A3B8'} />
                  </button>
                  {/* Owner avatar overlapping */}
                  <div className="absolute -bottom-5 left-4">
                    <div className="relative">
                      <img src={store.avatar} alt={store.owner.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-white" />
                      {store.owner.verified && (
                        <div className="absolute -bottom-1 -right-1">
                          <VerificationBadge level="verified" size="sm" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="pt-7 px-4 pb-4">
                  <div className="font-bold text-sm text-slate-800 leading-tight">{store.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{store.owner.name} · {store.category}</div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">{store.tagline}</p>
                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-50">
                    <div className="flex items-center gap-1">
                      <Star size={11} className="text-[#F4B400]" fill="#F4B400" />
                      <span className="text-xs font-bold text-slate-700">{store.rating}</span>
                      <span className="text-xs text-slate-400">({store.reviews})</span>
                    </div>
                    <span className="text-xs text-slate-400">{store.products} products</span>
                    <Button size="sm" variant="secondary" className="ml-auto">Visit store</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* My Store view */}
      {view === 'my-store' && (
        hasStore ? (
          <div className="space-y-5">
            {/* Store stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { icon: DollarSign, label: 'Total revenue', value: '$2,840', color: '#00C853' },
                { icon: Package, label: 'Total sales', value: '107', color: '#0057D9' },
                { icon: Eye, label: 'Profile views', value: '2,204', color: '#7C3AED' },
                { icon: Star, label: 'Avg rating', value: '4.9', color: '#F4B400' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="bg-white border border-slate-100 rounded-2xl p-4">
                  <Icon size={16} style={{ color }} className="mb-2" />
                  <div className="text-xl font-black text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>{value}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Products list */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-slate-800 text-sm">Products & Services</h2>
                <Button variant="outline" size="sm" icon={<Plus size={13} />}>Add product</Button>
              </div>
              <div className="space-y-2">
                {myProducts.map(p => (
                  <div key={p.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                      <Tag size={16} className="text-slate-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-slate-800">{p.name}</div>
                      <div className="text-xs text-slate-500">{p.type} · {p.sales} sales · {p.views} views</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-black text-slate-800 text-base" style={{ fontFamily: 'Plus Jakarta Sans' }}>${p.price}{p.unit}</div>
                      <Badge variant="success" size="sm">{p.status}</Badge>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors">
                      <Edit2 size={14} className="text-slate-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Store settings */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
              <Settings size={16} className="text-slate-400" />
              <div className="flex-1">
                <div className="font-semibold text-sm text-slate-800">Store settings</div>
                <div className="text-xs text-slate-500">Edit branding, payment, policies</div>
              </div>
              <ChevronRight size={14} className="text-slate-300" />
            </div>
          </div>
        ) : (
          <EmptyState
            icon={<Store size={28} />}
            title="You don't have a store yet"
            description="Create your PROFILE store to sell services, courses, templates, and tools to a global professional audience."
            action={{ label: 'Create store', onClick: () => setView('create'), icon: <Plus size={14} /> }}
          />
        )
      )}

      {/* Create store flow */}
      {view === 'create' && (
        <div className="max-w-xl">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
            {createSteps.map((step, i) => {
              const n = i + 1
              return (
                <div key={step} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    n < createStep ? 'bg-[#00C853] text-white' : n === createStep ? 'bg-[#0057D9] text-white' : 'bg-slate-100 text-slate-400'
                  }`}>{n}</div>
                  <span className={`text-xs font-semibold whitespace-nowrap ${n <= createStep ? 'text-slate-700' : 'text-slate-400'}`}>{step}</span>
                  {i < createSteps.length - 1 && <div className="w-8 h-0.5 bg-slate-200 shrink-0" />}
                </div>
              )
            })}
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4">
            {createStep === 1 && (
              <>
                <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Store information</h3>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Store name</label>
                  <input type="text" placeholder="James Okafor Engineering" className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#0057D9]/40 focus:ring-2 focus:ring-[#0057D9]/10" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Tagline</label>
                  <input type="text" placeholder="What do you offer in one sentence?" className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#0057D9]/40 focus:ring-2 focus:ring-[#0057D9]/10" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Category</label>
                  <select className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-[#0057D9]/40">
                    <option>Engineering & Technology</option>
                    <option>Design & UX</option>
                    <option>Data & AI</option>
                    <option>Business & Career</option>
                    <option>Research & Academia</option>
                  </select>
                </div>
              </>
            )}

            {createStep === 2 && (
              <>
                <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Add your first product</h3>
                <p className="text-sm text-slate-500">You can add more later. Start with your flagship service or best-selling item.</p>
                <div className="grid grid-cols-3 gap-2">
                  {['Service', 'Course', 'Template'].map(label => (
                    <button key={label} className="border-2 border-slate-200 hover:border-[#0057D9] rounded-xl p-3 text-center cursor-pointer transition-all">
                      <div className="text-xs font-bold text-slate-600">{label}</div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {createStep === 3 && (
              <>
                <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Payment setup</h3>
                <p className="text-sm text-slate-500">Add a payment method to receive earnings. PROFILE handles secure escrow for all transactions.</p>
                <Button fullWidth variant="outline" icon={<CreditCard size={14} />}>Connect bank account</Button>
                <Button fullWidth variant="outline" icon={<Globe size={14} />}>Connect PayPal</Button>
              </>
            )}

            {createStep === 4 && (
              <>
                <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Ready to launch</h3>
                <div className="bg-[#DCFCE7] border border-[#00C853]/20 rounded-xl p-4 flex items-center gap-3">
                  <Store size={18} className="text-[#00C853] shrink-0" />
                  <p className="text-sm text-[#166534] font-medium">Your store is ready. Verified professionals get 3× more store traffic.</p>
                </div>
              </>
            )}

            <div className="flex gap-2 pt-2">
              {createStep > 1 && <Button variant="outline" fullWidth onClick={() => setCreateStep(s => s - 1)}>Back</Button>}
              <Button fullWidth onClick={() => createStep < 4 ? setCreateStep(s => s + 1) : setView('my-store')}>
                {createStep === 4 ? 'Launch store' : 'Continue'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
