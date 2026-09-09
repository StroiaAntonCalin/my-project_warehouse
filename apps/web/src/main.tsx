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
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  const [isRegistering, setIsRegistering] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function login(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError('');
    try {
      if (isRegistering && password !== confirmPassword) throw new Error('Passwords do not match');
      const response = await fetch(`${api}/auth/${isRegistering ? 'register' : 'login'}`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) { const message = Array.isArray(payload.message) ? payload.message.join(', ') : payload.message; throw new Error(message || `Request failed (${response.status})`); }
      accessToken = payload.accessToken;
      const scheduleResponse = await fetch(`${api}/schedules/me`, { credentials: 'include', headers: { Authorization: `Bearer ${accessToken}` } });
      if (!scheduleResponse.ok) throw new Error('Could not load schedule');
      setSchedule(await scheduleResponse.json());
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'Something went wrong'); }
    finally { setLoading(false); }
  }

  async function logout() { await fetch(`${api}/auth/logout`, { method: 'POST', credentials: 'include' }); accessToken = undefined; setSchedule(null); }
  async function addExercise(dayOrder: number) {
    const name = drafts[dayOrder]?.trim(); if (!name || !accessToken) return;
    const response = await fetch(`${api}/schedules/me/days/${dayOrder}/exercises`, { method: 'POST', credentials: 'include', headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) });
    if (!response.ok) { setError('Could not add exercise'); return; }
    const exercise = await response.json(); setSchedule((current) => { if (!current) return current; const days = current.days.map((day) => day.order === dayOrder ? { ...day, exercises: [...day.exercises, exercise] } : day) as Schedule['days']; return { ...current, days }; }); setDrafts((current) => ({ ...current, [dayOrder]: '' }));
  }
  async function removeExercise(dayOrder: number, exerciseId: string) {
    if (!accessToken) return;
    await fetch(`${api}/schedules/me/days/${dayOrder}/exercises/${exerciseId}`, { method: 'DELETE', credentials: 'include', headers: { Authorization: `Bearer ${accessToken}` } });
    setSchedule((current) => { if (!current) return current; const days = current.days.map((day) => day.order === dayOrder ? { ...day, exercises: day.exercises.filter((exercise) => exercise.id !== exerciseId).map((exercise, index) => ({ ...exercise, order: index + 1 })) } : day) as Schedule['days']; return { ...current, days }; });
  }

  if (!schedule) return <main className="shell auth-shell"><header><p className="eyebrow">GYM_SCHEDULER</p><h1>{isRegistering ? 'Start your strongest week.' : 'Plan your strongest week.'}</h1><p className="intro">{isRegistering ? 'Create an account and get your personal seven-day schedule.' : 'Sign in to open your personal seven-day schedule.'}</p></header><form className="login-form" onSubmit={login}><label>Email<input type="email" required value={username} onChange={(event) => setUsername(event.target.value)} /></label><label>Password<div className="password-field"><input type={showPassword ? 'text' : 'password'} required value={password} onChange={(event) => setPassword(event.target.value)} /><button className="show-password" type="button" onClick={() => setShowPassword((current) => !current)}>{showPassword ? 'Hide' : 'Show'}</button></div></label>{isRegistering && <label>Confirm password<div className="password-field"><input type={showConfirmPassword ? 'text' : 'password'} required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} /><button className="show-password" type="button" onClick={() => setShowConfirmPassword((current) => !current)}>{showConfirmPassword ? 'Hide' : 'Show'}</button></div></label>}{error && <p className="error" role="alert">{error}</p>}<button type="submit" disabled={loading}>{loading ? 'Please wait…' : isRegistering ? 'Create account' : 'Open schedule'}</button><button className="logout" type="button" onClick={() => { setIsRegistering((current) => !current); setError(''); }}>{isRegistering ? 'Already have an account? Sign in' : 'New here? Create an account'}</button></form></main>;

  return <main className="shell"><header className="board-header"><div><p className="eyebrow">GYM_SCHEDULER / THIS WEEK</p><h1>Your weekly rhythm.</h1><p className="intro">A simple space to plan the work that keeps you moving.</p></div><button className="logout" type="button" onClick={logout}>Log out</button></header><section className="board" aria-label="Weekly gym schedule">{schedule.days.map((day) => <article className="day-card" key={day.id}><div><span className="day-number">0{day.order}</span><h2>{day.dayOfWeek}</h2></div><div className="exercise-list">{day.exercises.map((exercise) => <div className="exercise" key={exercise.id}><span>{exercise.order}. {exercise.name}</span><button className="remove" type="button" onClick={() => removeExercise(day.order, exercise.id)} aria-label={`Remove ${exercise.name}`}>×</button></div>)}</div><div className="exercise-add"><input aria-label={`Exercise for ${day.dayOfWeek}`} placeholder="Exercise name" value={drafts[day.order] ?? ''} onChange={(event) => setDrafts((current) => ({ ...current, [day.order]: event.target.value }))} /><button type="button" onClick={() => addExercise(day.order)}>Add</button></div></article>)}</section></main>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
