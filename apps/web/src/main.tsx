import { FormEvent, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { Schedule } from '@gym-scheduler/contracts';
import './styles.css';
import { WEEKDAYS } from './schedule';

let accessToken: string | undefined;
const api = 'http://localhost:3000/api/v1';

function App() {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [username, setUsername] = useState('demo@gym.local');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function login(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError('');
    try {
      const response = await fetch(`${api}/auth/login`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
      if (!response.ok) throw new Error('Invalid credentials');
      accessToken = (await response.json()).accessToken;
      const scheduleResponse = await fetch(`${api}/schedules/me`, { credentials: 'include', headers: { Authorization: `Bearer ${accessToken}` } });
      if (!scheduleResponse.ok) throw new Error('Could not load schedule');
      setSchedule(await scheduleResponse.json());
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'Something went wrong'); }
    finally { setLoading(false); }
  }

  async function logout() { await fetch(`${api}/auth/logout`, { method: 'POST', credentials: 'include' }); accessToken = undefined; setSchedule(null); }

  if (!schedule) return <main className="shell auth-shell"><header><p className="eyebrow">GYM_SCHEDULER</p><h1>Plan your strongest week.</h1><p className="intro">Sign in to open your personal seven-day schedule.</p></header><form className="login-form" onSubmit={login}><label>Email<input value={username} onChange={(event) => setUsername(event.target.value)} /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>{error && <p className="error" role="alert">{error}</p>}<button type="submit" disabled={loading}>{loading ? 'Opening…' : 'Open schedule'}</button></form></main>;

  return <main className="shell"><header className="board-header"><div><p className="eyebrow">GYM_SCHEDULER / THIS WEEK</p><h1>Your weekly rhythm.</h1><p className="intro">A simple space to plan the work that keeps you moving.</p></div><button className="logout" type="button" onClick={logout}>Log out</button></header><section className="board" aria-label="Weekly gym schedule">{schedule.days.map((day) => <article className="day-card" key={day.id}><div><span className="day-number">0{day.order}</span><h2>{day.dayOfWeek}</h2></div><p className="empty">{day.exercises.length ? `${day.exercises.length} exercises` : 'No exercises yet'}</p><button type="button">+ Add exercise</button></article>)}</section></main>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
