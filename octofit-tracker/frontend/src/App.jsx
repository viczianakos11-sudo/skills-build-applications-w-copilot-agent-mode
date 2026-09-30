import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import logo from '../../../docs/octofitapp-small.png';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './app.css';

const navigation = [
  { to: '/activities', label: 'Activities', number: '01' },
  { to: '/leaderboard', label: 'Leaderboard', number: '02' },
  { to: '/teams', label: 'Teams', number: '03' },
  { to: '/users', label: 'Athletes', number: '04' },
  { to: '/workouts', label: 'Workouts', number: '05' },
];

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/activities" aria-label="OctoFit Tracker home">
          <img src={logo} alt="" />
          <span>OCTOFIT<span className="brand-dot">.</span></span>
        </NavLink>
        <div className="topbar-note"><span className="status-dot" /> TRACKER / COMMUNITY</div>
      </header>

      <div className="workspace">
        <aside className="sidebar" aria-label="Main navigation">
          <p className="sidebar-label">Workspace</p>
          <nav className="nav flex-column">
            {navigation.map((item) => (
              <NavLink key={item.to} className={({ isActive }) => `side-link${isActive ? ' active' : ''}`} to={item.to}>
                <span className="side-number">{item.number}</span>
                <span>{item.label}</span>
                <span className="side-arrow" aria-hidden="true">↗</span>
              </NavLink>
            ))}
          </nav>
          <div className="sidebar-footer">
            <span className="sidebar-mark">OF</span>
            <span>MOVE WITH PURPOSE</span>
          </div>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/activities" replace />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="/activities" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;