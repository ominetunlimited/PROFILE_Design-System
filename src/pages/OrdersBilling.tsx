import { useState } from 'react'
import {
  CreditCard, Download, Package, CheckCircle, Clock,
  Star, RotateCcw, AlertTriangle, ChevronRight, Plus, Shield
} from 'lucide-react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

type OrderStatus = 'completed' | 'pending' | 'refunded' | 'failed'
type Tab = 'orders' | 'payment' | 'subscription'

const orders = [
  {
    id: 'ORD-2025-0142', item: 'System Design Masterclass', seller: 'Amara Diallo',
    type: 'course', amount: 249, status: 'completed' as OrderStatus,
    date: 'Jan 20, 2025', image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=48&h=48&fit=crop&auto=format',
  },
  {
    id: 'ORD-2025-0098', item: 'ATS-Optimized CV Templates', seller: 'Priya Sharma',
    type: 'template', amount: 29, status: 'completed' as OrderStatus,
    date: 'Jan 10, 2025', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=48&h=48&fit=crop&auto=format',
  },
  {
    id: 'ORD-2025-0071', item: 'Cloud Architecture Review · 2hr session', seller: 'James Okafor',
    type: 'service', amount: 700, status: 'completed' as OrderStatus,
    date: 'Jan 5, 2025', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=48&h=48&fit=crop&auto=format',
  },
  {
    id: 'ORD-2024-1894', item: 'Mock Technical Interviews · 3 sessions', seller: 'Kwame Mensah',
    type: 'service', amount: 360, status: 'refunded' as OrderStatus,
    date: 'Dec 12, 2024', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=48&h=48&fit=crop&auto=format',
  },
]

const paymentMethods = [
  { id: 1, type: 'Visa', last4: '4242', expiry: '09/27', default: true },
  { id: 2, type: 'Mastercard', last4: '8888', expiry: '03/26', default: false },
]

const statusConfig: Record<OrderStatus, { label: string; variant: 'success' | 'warning' | 'error' | 'outline'; icon: typeof CheckCircle }> = {
  completed: { label: 'Completed', variant: 'success', icon: CheckCircle },
  pending:   { label: 'Pending',   variant: 'warning', icon: Clock },
  refunded:  { label: 'Refunded',  variant: 'outline', icon: RotateCcw },
  failed:    { label: 'Failed',    variant: 'error',   icon: AlertTriangle },
}

export default function OrdersBilling() {
  const [tab, setTab] = useState<Tab>('orders')

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>Orders & Billing</h1>
        <p className="text-slate-500 text-sm mt-0.5">Purchase history, invoices, and payment methods</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6 w-fit">
        {(['orders', 'payment', 'subscription'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-[10px] text-sm font-semibold transition-all cursor-pointer capitalize ${
              tab === t ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
            }`}
          >
            {t === 'payment' ? 'Payment methods' : t === 'subscription' ? 'Plan & subscription' : 'Orders'}
          </button>
        ))}
      </div>

      {tab === 'orders' && (
        <div className="space-y-3">
          {/* Summary strip */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: 'Total spent', value: '$1,338', icon: Package },
              { label: 'Orders', value: '4', icon: CreditCard },
              { label: 'Certificates earned', value: '2', icon: Star },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-white border border-slate-100 rounded-xl p-3.5 text-center">
                <Icon size={16} className="text-slate-400 mx-auto mb-1.5" />
                <div className="text-xl font-black text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>{value}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {orders.map(order => {
            const cfg = statusConfig[order.status]
            const StatusIcon = cfg.icon
            return (
              <div key={order.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <img src={order.image} alt={order.item} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-slate-800 truncate">{order.item}</div>
                  <div className="text-xs text-slate-500">by {order.seller} · {order.date}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge variant="outline" size="sm">{order.type}</Badge>
                    <Badge variant={cfg.variant} size="sm" icon={<StatusIcon size={9} />}>{cfg.label}</Badge>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black text-slate-800 text-base" style={{ fontFamily: 'Plus Jakarta Sans' }}>${order.amount}</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">{order.id}</div>
                  <button className="mt-1.5 flex items-center gap-1 text-[11px] text-[#0057D9] font-semibold hover:underline cursor-pointer">
                    <Download size={10} />Invoice
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {tab === 'payment' && (
        <div className="space-y-4">
          {paymentMethods.map(pm => (
            <div key={pm.id} className={`bg-white border rounded-2xl p-4 flex items-center gap-4 ${pm.default ? 'border-[#0057D9]/30' : 'border-slate-100'}`}>
              <div className="w-12 h-8 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center shrink-0">
                <CreditCard size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm text-slate-800">{pm.type} ending in {pm.last4}</div>
                <div className="text-xs text-slate-500">Expires {pm.expiry}</div>
              </div>
              <div className="flex items-center gap-2">
                {pm.default && <Badge variant="blue" size="sm">Default</Badge>}
                <button className="p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors">
                  <ChevronRight size={14} className="text-slate-400" />
                </button>
              </div>
            </div>
          ))}
          <Button variant="outline" fullWidth icon={<Plus size={14} />}>Add payment method</Button>

          <div className="mt-6 p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-3">
            <Shield size={16} className="text-[#0057D9] mt-0.5 shrink-0" />
            <p className="text-xs text-slate-600 leading-relaxed">All payments are secured with industry-standard 256-bit encryption. PROFILE never stores your full card number — only the last four digits for identification purposes.</p>
          </div>
        </div>
      )}

      {tab === 'subscription' && (
        <div className="space-y-4">
          {/* Current plan */}
          <div className="bg-gradient-to-br from-[#003A8C] to-[#0057D9] rounded-2xl p-5 text-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">Current plan</div>
                <div className="text-2xl font-black" style={{ fontFamily: 'Plus Jakarta Sans' }}>PROFILE Pro</div>
                <div className="text-white/70 text-sm mt-0.5">$19/month · billed monthly</div>
              </div>
              <Badge variant="gold" size="sm">Active</Badge>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="text-white/60 text-xs mb-0.5">Next renewal</div>
              <div className="text-white font-semibold text-sm">February 20, 2025</div>
            </div>
          </div>

          {/* Plan features */}
          <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-50">
            {[
              'Unlimited verified credentials',
              'Priority Trust Score boosting',
              'Advanced analytics & recruiter insights',
              'PROFILE Copilot (AI assistant)',
              'Custom portfolio domain',
              'Direct Connect (freelancer pitch flow)',
            ].map(feature => (
              <div key={feature} className="flex items-center gap-3 p-3.5">
                <CheckCircle size={15} className="text-[#00C853] shrink-0" />
                <span className="text-sm text-slate-700">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" fullWidth>Upgrade to Enterprise</Button>
            <Button variant="ghost" fullWidth className="text-red-500">Cancel plan</Button>
          </div>
        </div>
      )}
    </div>
  )
}
