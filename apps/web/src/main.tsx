import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { WEEKDAYS } from './schedule';

function App() {
  return <main className="shell">
    <header><p className="eyebrow">GYM_SCHEDULER</p><h1>Your weekly rhythm.</h1><p className="intro">A simple space to plan the work that keeps you moving.</p></header>
    <section className="board" aria-label="Weekly gym schedule">{WEEKDAYS.map((day, index) => <article className="day-card" key={day}><div><span className="day-number">0{index + 1}</span><h2>{day}</h2></div><p className="empty">No exercises yet</p><button type="button">+ Add exercise</button></article>)}</section>
  </main>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
