import { useState } from 'react'
import Sidebar, { type Page } from './components/layout/Sidebar'
import TopBar from './components/layout/TopBar'
import BottomNav from './components/layout/BottomNav'
import CreateActivity from './components/CreateActivity'
import ProfileCopilot from './components/ProfileCopilot'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import TrustCenter from './pages/TrustCenter'
import OpportunityHub from './pages/OpportunityHub'
import Analytics from './pages/Analytics'
import ProfilePage from './pages/ProfilePage'
import Marketplace from './pages/Marketplace'
import Discover from './pages/Discover'
import Messages from './pages/Messages'
import Communities from './pages/Communities'
import Learning from './pages/Learning'
import Settings from './pages/Settings'
import RecruiterHub from './pages/RecruiterHub'
import SecurityCentre from './pages/SecurityCentre'
import References from './pages/References'
import ApplicationTracking from './pages/ApplicationTracking'
import OrdersBilling from './pages/OrdersBilling'
import MissionControl from './pages/MissionControl'
import CopilotPage from './pages/CopilotPage'

type AppView = 'landing' | 'auth-signin' | 'auth-signup' | 'app'

export default function App() {
  const [view, setView] = useState<AppView>('landing')
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [showCreateActivity, setShowCreateActivity] = useState(false)
  const [showCopilot, setShowCopilot] = useState(false)

  const navigate = (page: Page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Dashboard />
      case 'trust': return <TrustCenter />
      case 'verification': return <TrustCenter />
      case 'opportunity': return <OpportunityHub />
      case 'analytics': return <Analytics />
      case 'cv': return <ProfilePage />
      case 'marketplace': return <Marketplace />
      case 'discover': return <Discover />
      case 'messages': return <Messages />
      case 'connections': return <Discover />
      case 'communities': return <Communities />
      case 'learning': return <Learning />
      case 'settings': return <Settings />
      case 'recruiter': return <RecruiterHub />
      case 'security': return <SecurityCentre />
      case 'references': return <References />
      case 'tracking': return <ApplicationTracking />
      case 'orders': return <OrdersBilling />
      case 'mission-control': return <MissionControl />
      case 'copilot': return <CopilotPage />
      default: return <Dashboard />
    }
  }

  // Landing page
  if (view === 'landing') {
    return (
      <Landing
        onGetStarted={() => setView('auth-signup')}
        onSignIn={() => setView('auth-signin')}
      />
    )
  }

  // Auth flows
  if (view === 'auth-signin' || view === 'auth-signup') {
    return (
      <Auth
        initialView={view === 'auth-signup' ? 'account-type' : 'signin'}
        onComplete={() => setView('app')}
        onBack={() => setView('landing')}
      />
    )
  }

  // Main app
  return (
    <div className="min-h-screen bg-[#F8FAFF] flex">
      <Sidebar currentPage={currentPage} onNavigate={navigate} />

      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar onNavigate={navigate} onCreateActivity={() => setShowCreateActivity(true)} />
        <main className="flex-1">
          {renderPage()}
        </main>
      </div>

      <BottomNav
        currentPage={currentPage}
        onNavigate={navigate}
        onCreateActivity={() => setShowCreateActivity(true)}
      />

      {/* Create Activity modal — always available */}
      {showCreateActivity && (
        <CreateActivity onClose={() => setShowCreateActivity(false)} />
      )}

      {/* PROFILE Copilot — dockable floating panel */}
      <ProfileCopilot
        open={showCopilot}
        onToggle={() => setShowCopilot(v => !v)}
        currentPage={currentPage}
      />
    </div>
  )
}
