import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Fuel, Gift, CreditCard, MoreHorizontal } from 'lucide-react';

/* ── Page transition variants ── */
export const pageVariants = {
  initial:  { opacity: 0, x: 40, scale: 0.97 },
  animate:  { opacity: 1, x: 0,  scale: 1,   transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] } },
  exit:     { opacity: 0, x: -30, scale: 0.96, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } },
};

export const slideUp = {
  initial:  { opacity: 0, y: 32 },
  animate:  { opacity: 1, y: 0,  transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
  exit:     { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

/* Stagger children */
export const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};
export const fadeItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

/* ── Page wrapper ── */
export function Page({ children, style }) {
  return (
    <motion.div
      className="page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── Back header ── */
export function BackHeader({ title, sub, right, onBack }) {
  const navigate = useNavigate();
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'56px 20px 16px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack || (() => navigate(-1))}
          style={{ width:40, height:40, borderRadius:12, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:18 }}
        >←</motion.button>
        <div>
          <div style={{ fontWeight:700, fontSize:18, color:'#fff' }}>{title}</div>
          {sub && <div style={{ fontSize:12, color:'var(--muted)', marginTop:2 }}>{sub}</div>}
        </div>
      </div>
      {right}
    </div>
  );
}

/* ── Bottom nav ── */
const NAV = [
  { path:'/home',    Icon:Home,          label:'Home'    },
  { path:'/buy-fuel',Icon:Fuel,          label:'Fuel'    },
  { path:'/rewards', Icon:Gift,          label:'Rewards' },
  { path:'/credit',  Icon:CreditCard,    label:'Credit'  },
  { path:'/more',    Icon:MoreHorizontal,label:'More'    },
];

export function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <nav className="bottom-nav">
      {NAV.map(({ path, Icon, label }) => {
        const active = pathname.startsWith(path);
        return (
          <motion.div
            key={path}
            className={`nav-item ${active ? 'active' : ''}`}
            onClick={() => navigate(path)}
            whileTap={{ scale: 0.88 }}
          >
            <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
            <span>{label}</span>
          </motion.div>
        );
      })}
    </nav>
  );
}

/* ── Morph card — teal pulsing border on key highlights ── */
export function MorphCard({ children, style, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ borderColor: 'rgba(13,148,136,0.2)' }}
      animate={{ borderColor: ['rgba(13,148,136,0.2)', 'rgba(13,148,136,0.5)', 'rgba(13,148,136,0.2)'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        background: 'var(--navy-card)',
        border: '1.5px solid rgba(13,148,136,0.2)',
        borderRadius: 24,
        padding: 22,
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Amount display ── */
export function Amt({ v, size = 32, pos = false }) {
  const positive = v > 0;
  return (
    <span className="amount" style={{ fontSize: size, color: pos ? (positive ? '#10b981' : '#fff') : '#fff' }}>
      {pos && positive ? '+' : ''}GH¢ {Math.abs(v).toLocaleString()}
    </span>
  );
}

/* ── Progress bar ── */
export function Prog({ value, max, color = 'var(--teal)' }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="prog-track">
      <motion.div
        className="prog-fill"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        style={{ background: color }}
      />
    </div>
  );
}

/* ── Type badge ── */
export function TypeBadge({ type }) {
  const map = { business:'badge-teal', personal:'badge-green', commute:'badge-white' };
  return <span className={`badge ${map[type] || 'badge-teal'}`}>{type}</span>;
}

/* ── Quick action tile ── */
export function QATile({ icon, label, onClick }) {
  return (
    <motion.div className="qa-tile" onClick={onClick} whileTap={{ scale: 0.93 }} whileHover={{ y: -2 }}>
      <span style={{ fontSize: 22 }}>{icon}</span>
      <span>{label}</span>
    </motion.div>
  );
}

/* ── Row item ── */
export function Row({ icon, iconBg, label, sub, right, onClick }) {
  return (
    <motion.div className="row" onClick={onClick} whileTap={{ opacity: 0.7 }} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      {icon && (
        <div className="icon-box" style={{ background: iconBg || 'rgba(255,255,255,0.06)', fontSize: 20 }}>
          {icon}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: '#fff' }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{sub}</div>}
      </div>
      {right !== undefined
        ? <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--muted)', flexShrink: 0 }}>{right}</div>
        : onClick && <span style={{ color: 'var(--muted)', fontSize: 18, flexShrink: 0 }}>›</span>}
    </motion.div>
  );
}
