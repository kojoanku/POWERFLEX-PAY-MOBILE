import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Bell } from 'lucide-react';
import { useState } from 'react';
import { Page, BottomNav, MorphCard, stagger, fadeItem, QATile } from '../components/UI';
import { useApp } from '../context/AppContext';
import { stations, transactions } from '../data/appData';

const QA = [
  { icon:'⛽', label:'Buy Fuel',   path:'/buy-fuel'  },
  { icon:'💳', label:'Pay Bill',   path:'/pay-bill'  },
  { icon:'⚡', label:'EV Charge',  path:'/ev-charging'},
  { icon:'📊', label:'Analytics',  path:'/analytics' },
  { icon:'🚗', label:'Trips',      path:'/trips'     },
  { icon:'❤️', label:'Favorites',  path:'/favorites' },
  { icon:'💰', label:'Wallet',     path:'/wallet'    },
  { icon:'🧾', label:'History',    path:'/history'   },
];

export default function Home() {
  const navigate = useNavigate();
  const { currentUser, walletBalance, unread } = useApp();
  const [showBal, setShowBal] = useState(false);
  const nearby = stations.slice(0, 2);
  const recent = transactions.slice(0, 3);

  return (
    <Page>
      <div className="page-content">
        {/* Top bar */}
        <div style={{ background:'linear-gradient(180deg, var(--navy-card) 0%, var(--navy) 100%)', padding:'52px 20px 24px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:22 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <motion.div
                whileTap={{ scale:0.9 }}
                onClick={() => navigate('/profile')}
                style={{ width:46, height:46, borderRadius:'50%', background:'linear-gradient(135deg,var(--teal),var(--green))', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:17, color:'#fff', cursor:'pointer' }}
              >
                {currentUser.initials}
              </motion.div>
              <div>
                <div style={{ fontSize:12, color:'var(--muted)' }}>Good morning</div>
                <div style={{ fontWeight:700, fontSize:16, color:'#fff' }}>{currentUser.name}</div>
              </div>
            </div>
            <motion.div whileTap={{ scale:0.88 }} onClick={() => navigate('/notifications')} style={{ position:'relative', cursor:'pointer' }}>
              <Bell size={22} color="rgba(255,255,255,0.5)" />
              {unread > 0 && <div style={{ position:'absolute', top:-2, right:-2, width:8, height:8, borderRadius:'50%', background:'var(--teal)' }} />}
            </motion.div>
          </div>

          {/* Wallet card with morph border */}
          <MorphCard onClick={() => navigate('/wallet')} style={{ marginBottom:0 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
              <div style={{ fontSize:11, color:'var(--muted)', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase' }}>Total Balance</div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span className="badge badge-teal">✓ Verified</span>
                <motion.button whileTap={{ scale:0.85 }} onClick={e=>{e.stopPropagation();setShowBal(!showBal)}} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--muted)', display:'flex' }}>
                  {showBal ? <Eye size={16}/> : <EyeOff size={16}/>}
                </motion.button>
              </div>
            </div>
            <motion.div
              animate={{ opacity:1 }}
              key={showBal}
              initial={{ opacity:0 }}
              transition={{ duration:0.2 }}
              className="amount"
              style={{ fontSize:38, color:'#fff', marginBottom:20, letterSpacing:'-0.03em' }}
            >
              {showBal ? `GH¢ ${walletBalance.toLocaleString()}` : 'GH¢ ••••••'}
            </motion.div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
              {[
                { label:'Points',     val:'3,250'     },
                { label:'Credit',     val:'GH¢ 1,500' },
                { label:'Fuel Cards', val:'4'         },
              ].map(s => (
                <div key={s.label} style={{ background:'rgba(255,255,255,0.06)', borderRadius:12, padding:'10px 12px', textAlign:'center' }}>
                  <div style={{ fontWeight:700, fontSize:13, color:'#fff' }}>{s.val}</div>
                  <div style={{ fontSize:10, color:'var(--muted)', marginTop:3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </MorphCard>
        </div>

        <div style={{ padding:'0 20px' }}>
          {/* Credit alert */}
          <motion.div
            initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
            onClick={() => navigate('/credit')}
            style={{ background:'linear-gradient(135deg, rgba(13,148,136,0.12), rgba(61,90,62,0.1))', border:'1px solid rgba(13,148,136,0.25)', borderRadius:16, padding:'14px 16px', marginBottom:20, display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer' }}
          >
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:20 }}>💳</span>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:'#fff' }}>Active Credit</div>
                <div style={{ fontSize:11, color:'var(--muted)' }}>Due: {currentUser.creditDueDate}</div>
              </div>
            </div>
            <div style={{ fontWeight:800, fontSize:16, color:'var(--teal-light)' }}>GH¢ {currentUser.creditDue}</div>
          </motion.div>

          {/* Quick actions */}
          <div style={{ marginBottom:24 }}>
            <div className="sec-title">Quick Actions</div>
            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
              style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:8, marginBottom:8 }}
            >
              {QA.slice(0,4).map(a => (
                <motion.div key={a.label} variants={fadeItem}>
                  <QATile icon={a.icon} label={a.label} onClick={() => navigate(a.path)} />
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
              style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:8 }}
            >
              {QA.slice(4).map(a => (
                <motion.div key={a.label} variants={fadeItem}>
                  <QATile icon={a.icon} label={a.label} onClick={() => navigate(a.path)} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Nearby stations */}
          <div style={{ marginBottom:24 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <div className="sec-title" style={{ marginBottom:0 }}>Nearby Stations</div>
              <button onClick={() => navigate('/buy-fuel')} style={{ fontSize:12, color:'var(--teal-light)', background:'none', border:'none', cursor:'pointer', fontFamily:'Inter' }}>View all →</button>
            </div>
            {nearby.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity:0, x:-10 }}
                animate={{ opacity:1, x:0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => navigate('/buy-fuel')}
                style={{ background:'var(--navy-card)', border:'1px solid var(--navy-border)', borderRadius:16, padding:'14px 16px', marginBottom:8, display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer' }}
              >
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:42, height:42, borderRadius:12, background:'rgba(13,148,136,0.12)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:16, color:'var(--teal-light)' }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:600, color:'#fff' }}>{s.name}</div>
                    <div style={{ fontSize:11, color:'var(--muted)' }}>{s.dist} km away</div>
                  </div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontWeight:800, fontSize:15, color:'var(--teal-light)' }}>GH¢ {s.price}</div>
                  <div style={{ fontSize:10, color:'var(--muted)' }}>per litre</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recent transactions */}
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <div className="sec-title" style={{ marginBottom:0 }}>Recent Transactions</div>
              <button onClick={() => navigate('/history')} style={{ fontSize:12, color:'var(--teal-light)', background:'none', border:'none', cursor:'pointer', fontFamily:'Inter' }}>View all →</button>
            </div>
            <div className="card">
              {recent.map(tx => (
                <div key={tx.id} className="row">
                  <div className="icon-box" style={{ background:'rgba(255,255,255,0.05)', fontSize:18 }}>{tx.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:500, color:'#fff' }}>{tx.label}</div>
                    <div style={{ fontSize:11, color:'var(--muted)', marginTop:2 }}>{tx.date}</div>
                  </div>
                  <span style={{ fontWeight:700, fontSize:14, color: tx.amount > 0 ? '#10b981' : '#fff' }}>
                    {tx.amount > 0 ? '+' : ''}GH¢ {Math.abs(tx.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </Page>
  );
}
