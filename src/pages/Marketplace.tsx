import { useState } from 'react'
import { Star, ShoppingBag, Filter, Search, Heart } from '../components/ui/icons'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import VerificationBadge from '../components/ui/VerificationBadge'
import { useToast } from '../components/ui/Toast'

type Category = 'all' | 'services' | 'courses' | 'templates' | 'consulting' | 'software'

const categories: { id: Category; label: string; count: number }[] = [
  { id: 'all', label: 'All', count: 847 },
  { id: 'services', label: 'Services', count: 312 },
  { id: 'courses', label: 'Courses', count: 248 },
  { id: 'templates', label: 'Templates', count: 156 },
  { id: 'consulting', label: 'Consulting', count: 87 },
  { id: 'software', label: 'Software', count: 44 },
]

const listings = [
  {
    id: 1,
    title: 'System Design Masterclass',
    seller: { name: 'Amara Diallo', title: 'Staff Eng · Meta', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=36&h=36&fit=crop&auto=format', verified: true },
    category: 'courses',
    price: 249,
    rating: 4.9,
    reviews: 1842,
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=220&fit=crop&auto=format',
    tags: ['System Design', 'Architecture', 'Interviews'],
    students: 12400,
    featured: true,
  },
  {
    id: 2,
    title: 'Cloud Architecture Review',
    seller: { name: 'James Okafor', title: 'SWE III · Google', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=36&h=36&fit=crop&auto=format', verified: true },
    category: 'consulting',
    price: 350,
    priceUnit: '/hr',
    rating: 4.8,
    reviews: 293,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=220&fit=crop&auto=format',
    tags: ['Cloud', 'GCP', 'AWS', 'Architecture'],
    students: null,
    featured: false,
  },
  {
    id: 3,
    title: 'ATS-Optimized CV Templates',
    seller: { name: 'Priya Sharma', title: 'Career Coach', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=36&h=36&fit=crop&auto=format', verified: true },
    category: 'templates',
    price: 29,
    rating: 4.7,
    reviews: 4821,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=220&fit=crop&auto=format',
    tags: ['CV', 'Templates', 'ATS', 'Design'],
    students: null,
    featured: false,
  },
  {
    id: 4,
    title: 'Mock Technical Interviews',
    seller: { name: 'Kwame Mensah', title: 'Principal Eng · Shopify', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=36&h=36&fit=crop&auto=format', verified: true },
    category: 'services',
    price: 120,
    priceUnit: '/session',
    rating: 5.0,
    reviews: 147,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=220&fit=crop&auto=format',
    tags: ['Interviews', 'Coaching', 'Big Tech'],
    students: null,
    featured: true,
  },
  {
    id: 5,
    title: 'DevOps Automation Suite',
    seller: { name: 'Elena Torres', title: 'Platform Eng', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=36&h=36&fit=crop&auto=format', verified: false },
    category: 'software',
    price: 89,
    priceUnit: '/mo',
    rating: 4.6,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=220&fit=crop&auto=format',
    tags: ['DevOps', 'Automation', 'CI/CD', 'Kubernetes'],
    students: null,
    featured: false,
  },
  {
    id: 6,
    title: 'Data Science Bootcamp',
    seller: { name: 'Fatima Al-Hassan', title: 'ML Lead · IBM', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=36&h=36&fit=crop&auto=format', verified: true },
    category: 'courses',
    price: 399,
    rating: 4.9,
    reviews: 6340,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=220&fit=crop&auto=format',
    tags: ['Data Science', 'Python', 'ML', 'AI'],
    students: 28700,
    featured: false,
  },
]

export default function Marketplace() {
  const [active, setActive] = useState<Category>('all')
  const [savedItems, setSavedItems] = useState<number[]>([])
  const { toast } = useToast()
  const filtered = active === 'all' ? listings : listings.filter(l => l.category === active)

  const toggleSaved = (id: number, title: string) => {
    const nextSaved = !savedItems.includes(id)
    setSavedItems(current => nextSaved ? [...current, id] : current.filter(itemId => itemId !== id))
    toast(nextSaved ? 'success' : 'info', nextSaved ? 'Saved to your shortlist' : 'Removed from shortlist', title)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Marketplace</h1>
          <p className="text-slate-500 text-sm mt-0.5">Professional services, courses, and tools from verified experts</p>
        </div>
        <Button icon={<ShoppingBag size={14} />}>List Your Service</Button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search services, courses, templates..."
          className="w-full pl-10 pr-32 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#1565D8]/40 focus:ring-2 focus:ring-[#1565D8]/10 transition-all placeholder:text-slate-400"
        />
        <Button variant="ghost" size="sm" icon={<Filter size={13} />} className="absolute right-2 top-1/2 -translate-y-1/2">
          Filters
        </Button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {categories.map(({ id, label, count }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap cursor-pointer transition-all ${
              active === id
                ? 'bg-[#1565D8] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {label}
            <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${active === id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(item => (
          <div key={item.id} className={`bg-white rounded-2xl border overflow-hidden card-hover cursor-pointer ${item.featured ? 'border-[#F4B400]/40 ring-2 ring-[#F4B400]/20' : 'border-slate-100'}`}>
            <div className="relative h-44 bg-slate-100 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              {item.featured && (
                <div className="absolute top-3 left-3">
                  <Badge variant="gold" size="sm" icon={<Star size={9} />}>Featured</Badge>
                </div>
              )}
              <button
                onClick={e => { e.stopPropagation(); toggleSaved(item.id, item.title) }}
                className="absolute top-3 right-3 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow cursor-pointer hover:bg-white transition-colors"
              >
                <Heart size={13} fill={savedItems.includes(item.id) ? '#EF4444' : 'none'} color={savedItems.includes(item.id) ? '#EF4444' : '#94A3B8'} />
              </button>
              <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <img src={item.seller.avatar} alt={item.seller.name} className="w-6 h-6 rounded-full object-cover" />
                <span className="text-xs font-medium text-slate-600">{item.seller.name}</span>
                {item.seller.verified && <VerificationBadge level="verified" size="sm" />}
              </div>
              <h3 className="font-bold text-slate-800 text-sm leading-snug" style={{ fontFamily: 'Plus Jakarta Sans' }}>{item.title}</h3>
              <div className="flex items-center gap-1.5 mt-2">
                <Star size={12} className="text-[#F4B400]" fill="#F4B400" />
                <span className="text-xs font-bold text-slate-700">{item.rating}</span>
                <span className="text-xs text-slate-400">({item.reviews.toLocaleString()} reviews)</span>
              </div>
              {item.students && (
                <div className="text-xs text-slate-400 mt-0.5">{item.students.toLocaleString()} students</div>
              )}
              <div className="flex flex-wrap gap-1 mt-2">
                {item.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                <div>
                  <span className="text-lg font-black text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans' }}>${item.price}</span>
                  {item.priceUnit && <span className="text-xs text-slate-400">{item.priceUnit}</span>}
                </div>
                <Button size="sm" variant="secondary">View</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
