@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* PowerFlex Color Palette */
  --teal:       #0d9488;
  --teal-light: #14b8a6;
  --teal-dark:  #0f766e;
  --teal-glow:  rgba(13,148,136,0.25);

  --navy:       #0a1628;
  --navy-card:  #112240;
  --navy-el:    #1a3356;
  --navy-border:rgba(255,255,255,0.08);

  --green:      #3d5a3e;
  --green-light:#4a6d4b;
  --green-glow: rgba(61,90,62,0.3);

  --white:      #ffffff;
  --off-white:  #e8f4f3;
  --muted:      rgba(255,255,255,0.45);
  --subtle:     rgba(255,255,255,0.12);

  --success:    #10b981;
  --danger:     #ef4444;
  --warning:    #f59e0b;
}

/* Scrollbar */
::-webkit-scrollbar { display: none; }
* { scrollbar-width: none; }

/* Page wrapper */
.page {
  min-height: 100dvh;
  width: 100%;
  background: var(--navy);
  overflow-y: auto;
  overflow-x: hidden;
}

/* Cards */
.card {
  background: var(--navy-card);
  border: 1px solid var(--navy-border);
  border-radius: 20px;
  padding: 20px;
}

.card-glass {
  background: rgba(17,34,64,0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(13,148,136,0.2);
  border-radius: 20px;
  padding: 20px;
}

/* Buttons */
.btn-primary {
  width: 100%;
  background: var(--teal);
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 16px 24px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.01em;
}
.btn-primary:hover { background: var(--teal-light); transform: translateY(-1px); }
.btn-primary:active { transform: scale(0.98); }

.btn-secondary {
  width: 100%;
  background: transparent;
  color: var(--teal-light);
  border: 1.5px solid var(--teal);
  border-radius: 14px;
  padding: 15px 24px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-secondary:hover { background: rgba(13,148,136,0.1); }

.btn-ghost {
  background: var(--subtle);
  color: var(--off-white);
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-ghost:hover { background: rgba(255,255,255,0.18); }

/* Input */
.input {
  width: 100%;
  background: var(--navy-el);
  border: 1.5px solid var(--navy-border);
  border-radius: 12px;
  padding: 14px 16px;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}
.input:focus { border-color: var(--teal); }
.input::placeholder { color: var(--muted); }

/* Label */
.label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--muted);
  text-transform: uppercase;
  display: block;
  margin-bottom: 8px;
}

/* Badge */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 600;
}
.badge-teal  { background: rgba(13,148,136,0.15); color: var(--teal-light); }
.badge-green { background: rgba(61,90,62,0.25);   color: #6aab6c; }
.badge-red   { background: rgba(239,68,68,0.15);   color: #f87171; }
.badge-white { background: rgba(255,255,255,0.1);  color: #fff; }

/* Bottom nav */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  background: rgba(10,22,40,0.97);
  backdrop-filter: blur(24px);
  border-top: 1px solid rgba(13,148,136,0.15);
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 8px 4px;
  z-index: 100;
}
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.2s;
  min-width: 56px;
}
.nav-item svg { color: rgba(255,255,255,0.3); transition: color 0.2s; }
.nav-item span { font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.3); transition: color 0.2s; }
.nav-item.active { background: rgba(13,148,136,0.12); }
.nav-item.active svg { color: var(--teal-light); }
.nav-item.active span { color: var(--teal-light); }

/* Quick action tile */
.qa-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: var(--navy-card);
  border: 1px solid var(--navy-border);
  border-radius: 16px;
  padding: 16px 10px;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
}
.qa-tile:hover { border-color: rgba(13,148,136,0.3); background: var(--navy-el); }
.qa-tile span { font-size: 11px; font-weight: 500; color: var(--off-white); }

/* Row */
.row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid var(--navy-border);
  cursor: pointer;
}
.row:last-child { border: none; padding-bottom: 0; }

/* Section title */
.sec-title {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--muted);
  text-transform: uppercase;
  margin-bottom: 12px;
}

/* Progress bar */
.prog-track {
  height: 6px;
  background: rgba(255,255,255,0.08);
  border-radius: 99px;
  overflow: hidden;
}
.prog-fill {
  height: 100%;
  border-radius: 99px;
  background: var(--teal);
  transition: width 0.8s cubic-bezier(0.4,0,0.2,1);
}

/* Divider */
.divider { height: 1px; background: var(--navy-border); margin: 16px 0; }

/* Morph highlight ring — used on key interactive elements */
@keyframes morphRing {
  0%   { box-shadow: 0 0 0 0 rgba(13,148,136,0.5); }
  70%  { box-shadow: 0 0 0 12px rgba(13,148,136,0); }
  100% { box-shadow: 0 0 0 0 rgba(13,148,136,0); }
}
.morph-ring { animation: morphRing 2s ease-out infinite; }

/* Shimmer skeleton */
@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.skeleton {
  background: linear-gradient(90deg, var(--navy-card) 25%, var(--navy-el) 50%, var(--navy-card) 75%);
  background-size: 400px 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}

/* Teal glow card */
.glow-card {
  background: linear-gradient(135deg, var(--navy-card) 0%, rgba(13,148,136,0.08) 100%);
  border: 1px solid rgba(13,148,136,0.25);
  border-radius: 24px;
  padding: 24px;
}

/* Army green accent card */
.green-card {
  background: linear-gradient(135deg, var(--green) 0%, #2d4a2e 100%);
  border-radius: 20px;
  padding: 20px;
}

/* Icon box */
.icon-box {
  width: 44px;
  height: 44px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Amount display */
.amount { font-weight: 800; letter-spacing: -0.03em; }

/* Teal text */
.teal { color: var(--teal-light); }
.muted { color: var(--muted); }
.white { color: #fff; }

/* Scrollable content above fixed nav */
.page-content { padding-bottom: 88px; }

/* Safe area */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .bottom-nav { height: calc(72px + env(safe-area-inset-bottom)); }
}
