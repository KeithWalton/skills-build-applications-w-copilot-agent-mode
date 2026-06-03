import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <NavLink className="navbar-brand" to="/">OctoFit Tracker</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto">
            {[
              { to: '/activities', label: 'Activities' },
              { to: '/leaderboard', label: 'Leaderboard' },
              { to: '/teams', label: 'Teams' },
              { to: '/users', label: 'Users' },
              { to: '/workouts', label: 'Workouts' },
            ].map(({ to, label }) => (
              <li className="nav-item" key={to}>
                <NavLink
                  className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                  to={to}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
