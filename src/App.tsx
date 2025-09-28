import { Routes, Route } from 'react-router-dom'
import BottomNavbar from './components/BottomNavbar'

// Pages
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Workouts from './pages/Workouts'
import Meal from './pages/Meal'
import Chat from './pages/Chat'
import Stats from './pages/Stats'
import Profile from './pages/Profile'
import Subscription from './pages/Subscription'
import Registar from './pages/Registar'

export default function App() {
  return (
    <div className="min-h-screen pb-20">
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/meal" element={<Meal />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/registar" element={<Registar />} />
        </Routes>
      </main>
      <BottomNavbar />
    </div>
  )
}