import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { Page, BackHeader, BottomNav, Prog, stagger, fadeItem, Row, TypeBadge, MorphCard } from '../components/UI';
import { transactions, trips, billCats, evNetworks, spendData, spendCats } from '../data/appData';
import { useApp } from '../context/AppContext';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar } from 'recharts';

/* ── MORE ─────────────────────────────────────────── */
const MORE_SECTIONS = [
  { title:'QUICK ACTIONS', items:[
    ['⚡','EV Charge','/ev-charging','rgba(13,148,136,0.15)'],
    ['💳','Fuel Cards','/fuel-cards','rgba(13,148,136,0.1)'],
    ['💰','Wallet','/wallet','rgba(61,90,62,0.2)'],
    ['📊','Analytics','/analytics','rgba(13,148,136,0.12)'],
    ['🧾','History','/history','rgba(255,255,255,0.06)'],
    ['❤️','Favorites','/favorites','rgba(61,90,62,0.15)'],
    ['🚗','Trips','/trips','rgba(13,148,136,0.1)'],
    ['🌿','Eco Track','/eco-track','rgba(61,90,62,0.2)'],
    ['🏆','Challenges','/challenges','rgba(13,148,136,0.1)'],
  ]},
  { title:'PAYMENTS & BILLS', items:[
    ['💸','Pay Bill','/pay-bill','rgba(61,90,62,0.15)'],
    ['🏦','Bank Transfer','/bank-transfer','rgba(13,148,136,0.1)'],
    ['📱','Mobile Money','/mobile-money','rgba(61,90,62,0.12)'],
  ]},
  { title:'ACCOUNT', items:[
    ['👤','Edit Profile','/profile','rgba(13,148,136,0.12)'],
    ['🛡️','KYC Verified','/kyc','rgba(61,90,62,0.2)'],
    ['🏢','Activate Corporate','/corporate','rgba(13,148,136,0.1)'],
    ['🔔','Notifications','/notifications','rgba(255,255,255,0.06)'],
  ]},
  { title:'SUPPORT & SETTINGS', items:[
    ['⚙️','Settings','/settings','rgba(255,255,255,0.05)'],
    ['❓','Help & Support','/support','rgba(13,148,136,0.1)'],
    ['📄','Documents','/documents','rgba(255,255,255,0.05)'],
    ['🔗','Refer & Earn','/rewards','rgba(61,90,62,0.15)'],
  ]},
];

export function More() {
  const navigate = useNavigate();
  const { currentUser, showToast } = useApp();
  const handleLogout = () => { showToast('Logged out', 'info'); setTimeout(()=>navigate('/'),800); };

  return (
    <Page>
      <div style={{ background:'linear-gradient(180deg,var(--navy-card) 0%,var(--navy) 100%)', padding:'54px 20px 22px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <motion.div
            whileTap={{ scale:0.92 }}
            onClick={() => navigate('/profile')}
            style={{ width:58, height:58, borderRadius:'50%', background:'linear-gradient(135deg,var(--teal),var(--green))', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:22, color:'#fff', cursor:'pointer' }}
          >{currentUser.initials}</motion.div>
          <div>
            <div style={{ fontWeight:700, fontSize:18, color:'#fff' }}>{currentUser.name}</div>
            <div style={{ fontSize:12, color:'var(--muted)', marginTop:2 }}>{currentUser.email}</div>
          </div>
        </div>
      </div>

      <div style={{ padding:'0 20px 90px' }}>
        {MORE_SECTIONS.map(sec => (
          <div key={sec.title} style={{ marginBottom:22 }}>
            <div className="sec-title" style={{ marginTop:20 }}>{sec.title}</div>
            <div className="card" style={{ padding:'4px 16px' }}>
              {sec.items.map(([ic,l,p,bg]) => (
                <Row key={l} icon={ic} iconBg={bg} label={l} onClick={() => navigate(p)} />
              ))}
            </div>
          </div>
        ))}

        <motion.button
          whileTap={{ scale:0.97 }}
          onClick={handleLogout}
          style={{ width:'100%', padding:16, borderRadius:14, background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)', color:'#ef4444', fontFamily:'Inter', fontWeight:700, fontSize:15, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}
        >
          <LogOut size={18} /> Logout
        </motion.button>
      </div>
      <BottomNav />
    </Page>
  );
}

/* ── ANALYTICS ────────────────────────────────────── */
export function Analytics() {
  const [tab, setTab] = useState('month');
  return (
    <Page>
      <BackHeader title="Analytics" sub="Track your spending" />
      <div style={{ padding:'0 20px 40px' }}>
        <div style={{ display:'flex', gap:4, background:'rgba(255,255,255,0.05)', borderRadius:12, padding:4, marginBottom:20 }}>
          {['Week','Month','Year'].map((t,i) => (
            <motion.button key={t} whileTap={{ scale:0.95 }} onClick={() => setTab(t.toLowerCase())}
              style={{ flex:1, padding:'9px 4px', borderRadius:9, border:'none', background:tab===t.toLowerCase()?'var(--teal)':'transparent', color:tab===t.toLowerCase()?'#fff':'var(--muted)', fontFamily:'Inter', fontWeight:600, fontSize:12, cursor:'pointer', transition:'all .2s' }}>
              {t}
            </motion.button>
          ))}
        </div>

        {/* Hero */}
        <MorphCard style={{ marginBottom:16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
            <span style={{ fontSize:13, color:'var(--muted)' }}>Total Spent This Month</span>
            <span style={{ background:'rgba(13,148,136,0.15)', color:'var(--teal-light)', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:99 }}>↓ 15%</span>
          </div>
          <div className="amount" style={{ fontSize:36, color:'#fff', marginBottom:20 }}>GH¢ 1,500</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {[['Days Remaining','24'],['Projected Total','GH¢ 7,500']].map(([l,v]) => (
              <div key={l} style={{ background:'rgba(255,255,255,0.06)', borderRadius:12, padding:12 }}>
                <div style={{ fontSize:10, color:'var(--muted)', marginBottom:4 }}>{l}</div>
                <div style={{ fontWeight:800, fontSize:18, color:'#fff' }}>{v}</div>
              </div>
            ))}
          </div>
        </MorphCard>

        {/* Budget */}
        <div className="card" style={{ marginBottom:16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <div>
              <div style={{ fontWeight:700, fontSize:15, color:'#fff' }}>Monthly Budget</div>
              <div style={{ fontSize:12, color:'var(--muted)', marginTop:2 }}>GH¢ 1,500 of GH¢ 2,500</div>
            </div>
            <span style={{ fontWeight:800, fontSize:18, color:'var(--teal-light)' }}>60%</span>
          </div>
          <Prog value={60} max={100} />
          <div style={{ fontSize:13, color:'#6aab6c', marginTop:10 }}>✓ On track! GH¢ 1,000 remaining</div>
        </div>

        {/* Trend chart */}
        <div className="card" style={{ marginBottom:16 }}>
          <div className="sec-title">Monthly Trend</div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={spendData} margin={{ top:8, right:0, left:-20, bottom:0 }}>
              <defs>
                <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0d9488" stopOpacity={0.35}/>
                  <stop offset="100%" stopColor="#0d9488" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill:'rgba(255,255,255,0.35)', fontSize:11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:'rgba(255,255,255,0.35)', fontSize:11 }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{ background:'var(--navy-card)', border:'1px solid rgba(13,148,136,0.3)', borderRadius:10, fontSize:12 }}/>
              <Area type="monotone" dataKey="v" stroke="#0d9488" strokeWidth={2} fill="url(#tealGrad)" dot={false}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Categories */}
        <div className="card">
          <div className="sec-title">Spending by Category</div>
          {spendCats.map(c => (
            <div key={c.name} style={{ marginBottom:14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <span style={{ fontSize:14, color:'#fff' }}>{c.name}</span>
                <span style={{ fontWeight:700, fontSize:13, color:'#fff' }}>GH¢ {c.amount.toLocaleString()}</span>
              </div>
              <Prog value={c.pct} max={100} color={c.color}/>
            </div>
          ))}
          <div className="divider"/>
          <div style={{ display:'flex', justifyContent:'space-between' }}>
            <span style={{ fontWeight:700, color:'#fff' }}>Total</span>
            <span style={{ fontWeight:800, fontSize:16, color:'#fff' }}>GH¢ 2,500</span>
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ── TRIPS ────────────────────────────────────────── */
export function Trips() {
  const [tab, setTab] = useState('all');
  const filtered = tab==='all' ? trips : trips.filter(t=>t.type===tab);
  return (
    <Page>
      <BackHeader title="Trip History" sub={`${trips.length} trips recorded`}/>
      <div style={{ padding:'0 20px 40px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:16 }}>
          {[['Distance',`${filtered.reduce((a,t)=>a+t.km,0).toFixed(1)} km`],['Fuel Cost',`GH¢ ${filtered.reduce((a,t)=>a+t.cost,0)}`],['Drive Time',`${Math.round(filtered.reduce((a,t)=>a+t.dur,0)/60)}h ${filtered.reduce((a,t)=>a+t.dur,0)%60}m`]].map(([l,v])=>(
            <div key={l} style={{ background:'var(--navy-card)', border:'1px solid var(--navy-border)', borderRadius:12, padding:12, textAlign:'center' }}>
              <div style={{ fontWeight:700, fontSize:13, color:'#fff' }}>{v}</div>
              <div style={{ fontSize:10, color:'var(--muted)', marginTop:3 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', gap:4, background:'rgba(255,255,255,0.05)', borderRadius:12, padding:4, marginBottom:16 }}>
          {['all','business','personal','commute'].map(t=>(
            <motion.button key={t} whileTap={{ scale:0.95 }} onClick={()=>setTab(t)}
              style={{ flex:1, padding:'8px 4px', borderRadius:9, border:'none', background:tab===t?'var(--teal)':'transparent', color:tab===t?'#fff':'var(--muted)', fontFamily:'Inter', fontWeight:600, fontSize:11, cursor:'pointer', transition:'all .2s', textTransform:'capitalize' }}>
              {t==='all'?'All':t.charAt(0).toUpperCase()+t.slice(1)}
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          {filtered.map((trip,i)=>(
            <motion.div key={trip.id} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ delay:i*0.05 }} className="card" style={{ marginBottom:10 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
                <TypeBadge type={trip.type}/>
                {trip.client && <span style={{ fontSize:11, color:'var(--muted)' }}>{trip.client}</span>}
              </div>
              <div style={{ display:'flex', gap:10, marginBottom:12 }}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, paddingTop:2 }}>
                  <div style={{ width:9, height:9, borderRadius:'50%', background:'var(--teal)' }}/>
                  <div style={{ width:1.5, height:22, background:'var(--navy-border)' }}/>
                  <div style={{ width:9, height:9, borderRadius:'50%', background:'var(--green-light)' }}/>
                </div>
                <div>
                  <div style={{ fontWeight:600, fontSize:14, color:'#fff', marginBottom:10 }}>{trip.from}</div>
                  <div style={{ fontWeight:600, fontSize:14, color:'#fff' }}>{trip.to}</div>
                </div>
              </div>
              <div style={{ display:'flex', gap:14, borderTop:'1px solid var(--navy-border)', paddingTop:10 }}>
                {[['📅',trip.date],['⏱',`${trip.dur}m`],['📍',`${trip.km}km`],['⛽',`GH¢${trip.cost}`]].map(([ic,v])=>(
                  <div key={v} style={{ display:'flex', alignItems:'center', gap:3 }}>
                    <span style={{ fontSize:11 }}>{ic}</span>
                    <span style={{ fontSize:11, color:'var(--muted)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Page>
  );
}

/* ── HISTORY ──────────────────────────────────────── */
export function History() {
  const [search, setSearch] = useState('');
  const list = transactions.filter(t=>t.label.toLowerCase().includes(search.toLowerCase()));
  const spent    = transactions.filter(t=>t.amount<0).reduce((a,t)=>a+Math.abs(t.amount),0);
  const received = transactions.filter(t=>t.amount>0).reduce((a,t)=>a+t.amount,0);
  return (
    <Page>
      <BackHeader title="Transactions"/>
      <div style={{ padding:'0 20px 40px' }}>
        <input className="input" placeholder="Search transactions..." value={search} onChange={e=>setSearch(e.target.value)} style={{ marginBottom:14 }}/>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:20 }}>
          <div className="card" style={{ background:'rgba(239,68,68,0.06)', borderColor:'rgba(239,68,68,0.2)' }}>
            <div style={{ fontSize:11, color:'#f87171', fontWeight:600, marginBottom:4 }}>Total Spent</div>
            <div className="amount" style={{ fontSize:18, color:'#f87171' }}>GH¢ {spent}</div>
          </div>
          <div className="card" style={{ background:'rgba(13,148,136,0.06)', borderColor:'rgba(13,148,136,0.2)' }}>
            <div style={{ fontSize:11, color:'var(--teal-light)', fontWeight:600, marginBottom:4 }}>Total Received</div>
            <div className="amount" style={{ fontSize:18, color:'var(--teal-light)' }}>GH¢ {received}</div>
          </div>
        </div>
        <div className="card">
          {list.map(tx=>(
            <div key={tx.id} className="row">
              <div className="icon-box" style={{ background:'rgba(255,255,255,0.05)', fontSize:18 }}>{tx.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:500, color:'#fff' }}>{tx.label}</div>
                <div style={{ fontSize:11, color:'var(--muted)', marginTop:2 }}>{tx.date} · {tx.time}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontWeight:700, fontSize:14, color:tx.amount>0?'var(--teal-light)':'#fff' }}>
                  {tx.amount>0?'+':''}GH¢ {Math.abs(tx.amount)}
                </div>
                <span className={`badge ${tx.status==='completed'?'badge-teal':'badge-green'}`} style={{ marginTop:4 }}>{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

/* ── WALLET ───────────────────────────────────────── */
export function Wallet() {
  const navigate = useNavigate();
  const { walletBalance, showToast } = useApp();
  const [showTopup, setShowTopup] = useState(false);
  const [amount, setAmount] = useState('');
  return (
    <Page>
      <BackHeader title="My Wallet" sub="Manage your balance"/>
      <div style={{ padding:'0 20px 40px' }}>
        <MorphCard style={{ textAlign:'center', padding:28, marginBottom:20 }}>
          <div style={{ fontSize:13, color:'var(--muted)', marginBottom:8 }}>Available Balance</div>
          <div className="amount" style={{ fontSize:44, color:'var(--teal-light)', marginBottom:22 }}>GH¢ {walletBalance.toLocaleString()}</div>
          <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
            <motion.button whileTap={{ scale:0.96 }} className="btn-primary" style={{ width:'auto', padding:'12px 28px' }} onClick={()=>setShowTopup(true)}>+ Top Up</motion.button>
            <motion.button whileTap={{ scale:0.96 }} className="btn-secondary" style={{ width:'auto', padding:'12px 28px' }} onClick={()=>navigate('/bank-transfer')}>Transfer</motion.button>
          </div>
        </MorphCard>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:22 }}>
          {[['⛽','Buy Fuel','/buy-fuel'],['💡','Pay Bills','/pay-bill'],['📤','Send Money','/mobile-money'],['📥','Request','/wallet']].map(([ic,l,p])=>(
            <motion.div key={l} whileTap={{ scale:0.95 }} onClick={()=>navigate(p)}
              style={{ background:'var(--navy-card)', border:'1px solid var(--navy-border)', borderRadius:14, padding:16, cursor:'pointer', display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:22 }}>{ic}</span>
              <span style={{ fontWeight:600, fontSize:14, color:'#fff' }}>{l}</span>
            </motion.div>
          ))}
        </div>
        <div className="sec-title">Recent Transactions</div>
        <div className="card">
          {transactions.slice(0,5).map(tx=>(
            <div key={tx.id} className="row">
              <div className="icon-box" style={{ background:'rgba(255,255,255,0.05)', fontSize:18 }}>{tx.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:500, color:'#fff' }}>{tx.label}</div>
                <div style={{ fontSize:11, color:'var(--muted)', marginTop:2 }}>{tx.date}</div>
              </div>
              <span style={{ fontWeight:700, fontSize:14, color:tx.amount>0?'var(--teal-light)':'#fff' }}>
                {tx.amount>0?'+':''}GH¢ {Math.abs(tx.amount)}
              </span>
            </div>
          ))}
        </div>
        <AnimatePresence>
          {showTopup && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', zIndex:200, display:'flex', alignItems:'flex-end', justifyContent:'center' }}
              onClick={()=>setShowTopup(false)}>
              <motion.div initial={{ y:'100%' }} animate={{ y:0 }} exit={{ y:'100%' }} transition={{ type:'spring', damping:28, stiffness:300 }}
                onClick={e=>e.stopPropagation()}
                style={{ background:'var(--navy-card)', borderRadius:'24px 24px 0 0', padding:'28px 24px 48px', width:'100%', maxWidth:430 }}>
                <div style={{ fontWeight:700, fontSize:18, color:'#fff', marginBottom:20 }}>Top Up Wallet</div>
                <span className="label">Amount (GH¢)</span>
                <input className="input" type="number" value={amount} onChange={e=>setAmount(e.target.value)} style={{ fontSize:22, fontWeight:800, marginBottom:12 }} autoFocus/>
                <div style={{ display:'flex', gap:8, marginBottom:20 }}>
                  {[50,100,200,500].map(v=>(
                    <motion.button key={v} whileTap={{ scale:0.92 }} onClick={()=>setAmount(String(v))}
                      style={{ flex:1, padding:9, borderRadius:10, background:amount===String(v)?'rgba(13,148,136,0.2)':'rgba(255,255,255,0.05)', border:`1px solid ${amount===String(v)?'var(--teal)':'var(--navy-border)'}`, color:amount===String(v)?'var(--teal-light)':'var(--muted)', fontFamily:'Inter', fontWeight:600, fontSize:13, cursor:'pointer' }}>
                      {v}
                    </motion.button>
                  ))}
                </div>
                <div style={{ display:'flex', gap:10 }}>
                  <button className="btn-ghost" onClick={()=>setShowTopup(false)} style={{ flex:1 }}>Cancel</button>
                  <motion.button whileTap={{ scale:0.97 }} className="btn-primary" style={{ flex:2 }} onClick={()=>{ showToast('Wallet topped up!'); setShowTopup(false); setAmount(''); }}>Confirm</motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Page>
  );
}

/* ── PAY BILL ─────────────────────────────────────── */
export function PayBill() {
  const [step, setStep] = useState('cats');
  const [selCat, setSelCat] = useState(null);
  const [acct, setAcct] = useState('');
  const [amt, setAmt] = useState('');
  const { showToast } = useApp();
  return (
    <Page style={{ background:'linear-gradient(180deg,var(--navy-el) 0%,var(--navy) 40%)' }}>
      <BackHeader title="Pay Bill" sub="Pay utilities and services" onBack={step==='cats'?undefined:()=>setStep('cats')}/>
      <div style={{ padding:'0 20px 40px' }}>
        {step==='cats' && (
          <>
            <div style={{ fontSize:14, color:'var(--muted)', marginBottom:16 }}>Select Bill Category</div>
            <motion.div variants={stagger} initial="initial" animate="animate" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              {billCats.map(cat=>(
                <motion.div key={cat.id} variants={fadeItem} whileTap={{ scale:0.94 }}
                  onClick={()=>{ setSelCat(cat); setStep('pay'); }}
                  style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:18, padding:'22px 14px', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
                  <div style={{ width:54, height:54, borderRadius:16, background:`${cat.color}22`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26 }}>{cat.icon}</div>
                  <span style={{ fontWeight:600, fontSize:14, color:'#fff' }}>{cat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
        {step==='pay' && selCat && (
          <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}>
            <div className="card" style={{ background:'rgba(255,255,255,0.04)', borderColor:'rgba(255,255,255,0.08)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
                <div style={{ width:46, height:46, borderRadius:14, background:`${selCat.color}22`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>{selCat.icon}</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:15, color:'#fff' }}>ECG (Electricity Company of Ghana)</div>
                  <div style={{ fontSize:12, color:'var(--muted)' }}>Enter payment details</div>
                </div>
              </div>
              <span className="label">Account / Meter Number</span>
              <input className="input" value={acct} onChange={e=>setAcct(e.target.value)} placeholder="Enter account number" style={{ marginBottom:14 }}/>
              <span className="label">Amount (GH¢)</span>
              <input className="input" type="number" value={amt} onChange={e=>setAmt(e.target.value)} placeholder="0.00" style={{ fontSize:24, fontWeight:800, marginBottom:8 }}/>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'var(--muted)', marginBottom:22 }}>
                <span>Wallet Balance</span><span>GH¢ 1,250</span>
              </div>
              <motion.button whileTap={{ scale:0.97 }} className="btn-primary"
                onClick={()=>{ if(!acct||!amt)return showToast('Fill in all fields','error'); showToast('✓ Bill paid successfully!'); setStep('cats'); setAcct(''); setAmt(''); }}>
                Continue to Payment
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </Page>
  );
}

/* ── EV CHARGING ──────────────────────────────────── */
export function EVCharging() {
  const [sel, setSel] = useState(null);
  const { showToast } = useApp();
  if (sel) return (
    <Page style={{ background:'linear-gradient(180deg,#091a0d 0%,var(--navy) 50%)' }}>
      <BackHeader title={sel.name} sub="Find nearby stations" onBack={()=>setSel(null)}/>
      <div style={{ padding:'0 20px 40px' }}>
        {[{id:1,name:'ECG Accra Mall Station',addr:'Accra Mall, Tetteh Quarshie',dist:1.2,rating:4.5,open:true,types:['CCS 150kW','CHAdeMO 50kW','Type 2 22kW']},{id:2,name:'GridCo Airport City Hub',addr:'Airport City, Liberation Rd',dist:2.5,rating:4.8,open:true,types:['CCS 350kW','Type 2 22kW']},{id:3,name:'ChargeUp East Legon',addr:'East Legon, Accra Mall',dist:3.8,rating:4.2,open:true,types:['CCS 50kW','Type 2 22kW']}].map((s,i)=>(
          <motion.div key={s.id} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07 }}
            className="card" style={{ marginBottom:10, cursor:'pointer' }} whileTap={{ scale:0.98 }}
            onClick={()=>showToast(`Navigating to ${s.name}`)}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
              <div style={{ fontWeight:700, fontSize:15, color:'#fff' }}>{s.name}</div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:14, color:'var(--teal-light)', fontWeight:700 }}>{s.dist} km</div>
                <div style={{ fontSize:11, color:'var(--muted)' }}>★ {s.rating}</div>
              </div>
            </div>
            <div style={{ fontSize:12, color:'var(--muted)', marginBottom:10 }}>📍 {s.addr}</div>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {s.types.map(t=><span key={t} className="badge badge-teal">{t}</span>)}
              <span className={`badge ${s.open?'badge-teal':'badge-red'}`}>{s.open?'Open':'Closed'}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Page>
  );
  return (
    <Page style={{ background:'linear-gradient(180deg,#091a0d 0%,var(--navy) 40%)' }}>
      <BackHeader title="EV Charging Stations" sub="Select a charging network"/>
      <div style={{ padding:'0 20px 40px' }}>
        <motion.div variants={stagger} initial="initial" animate="animate" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {evNetworks.map(net=>(
            <motion.div key={net.id} variants={fadeItem} whileTap={{ scale:0.94 }} onClick={()=>setSel(net)}
              style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:18, padding:'20px 14px', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
              <div style={{ width:56, height:56, borderRadius:16, background:`${net.color}22`, border:`1px solid ${net.color}33`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26 }}>{net.icon}</div>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontWeight:700, fontSize:13, color:'#fff', marginBottom:3 }}>{net.name}</div>
                <div style={{ fontSize:11, color:'var(--muted)' }}>{net.sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Page>
  );
}

/* ── PROFILE ──────────────────────────────────────── */
export function Profile() {
  const { currentUser, showToast } = useApp();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  return (
    <Page style={{ background:'linear-gradient(180deg,#1a0d3a 0%,var(--navy) 40%)' }}>
      <BackHeader title="Edit Profile" sub="Update your personal information"/>
      <div style={{ padding:'0 20px 40px' }}>
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <motion.div whileTap={{ scale:0.92 }} style={{ position:'relative', display:'inline-block' }}>
            <div style={{ width:80, height:80, borderRadius:'50%', background:'linear-gradient(135deg,var(--teal),var(--green))', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:28, color:'#fff', margin:'0 auto' }}>
              {currentUser.initials}
            </div>
            <div style={{ position:'absolute', bottom:0, right:0, width:26, height:26, borderRadius:'50%', background:'var(--teal)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, cursor:'pointer' }}>📷</div>
          </motion.div>
          <div style={{ fontSize:12, color:'var(--muted)', marginTop:8 }}>Tap to change photo</div>
        </div>
        {[['Full Name',name,setName,'text'],['Email Address',email,setEmail,'email'],['Phone Number',phone,setPhone,'tel'],['Address','','()=>{}','text'],['Date of Birth','','()=>{}','date']].map(([l,v,set,type])=>(
          <div key={l} style={{ marginBottom:16 }}>
            <span className="label">{l}</span>
            <input className="input" type={type} value={v} onChange={e=>typeof set==='function'&&set(e.target.value)} placeholder={l}/>
          </div>
        ))}
        <motion.button whileTap={{ scale:0.97 }} className="btn-primary" style={{ marginTop:8 }}
          onClick={()=>showToast('Profile updated!')}>
          💾 Save Changes
        </motion.button>
      </div>
    </Page>
  );
}

/* ── KYC ──────────────────────────────────────────── */
export function KYC() {
  const [step, setStep] = useState(1);
  const { showToast } = useApp();
  const navigate = useNavigate();
  const steps = ['Ghana Card Front','Ghana Card Back','Selfie','Turn Left','Turn Right','Processing'];
  return (
    <Page style={{ background:'linear-gradient(180deg,#0d1a3a 0%,var(--navy) 50%)' }}>
      <BackHeader title="Ghana Card Verification" sub="4-photo verification process"/>
      <div style={{ padding:'0 20px 40px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, marginBottom:28 }}>
          {steps.map((_,i)=>(
            <div key={i} style={{ display:'flex', alignItems:'center', gap:6 }}>
              <motion.div animate={{ background:i+1===step?'var(--teal)':i+1<step?'var(--green)':'rgba(255,255,255,0.08)', scale:i+1===step?1.1:1 }}
                style={{ width:26, height:26, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:i+1<=step?'#fff':'var(--muted)' }}>
                {i+1<step?'✓':i+1}
              </motion.div>
              {i<steps.length-1 && <div style={{ width:14, height:1, background:i+1<step?'var(--teal)':'rgba(255,255,255,0.1)' }}/>}
            </div>
          ))}
        </div>
        <div className="card" style={{ background:'rgba(255,255,255,0.04)', borderColor:'rgba(255,255,255,0.08)', marginBottom:18, display:'flex', gap:12 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:'rgba(13,148,136,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>💳</div>
          <div>
            <div style={{ fontWeight:700, fontSize:15, color:'#fff' }}>Step {step}: {steps[step-1]}</div>
            <div style={{ fontSize:12, color:'var(--muted)', marginTop:4, lineHeight:1.5 }}>Take a clear photo of your Ghana Card</div>
          </div>
        </div>
        <div style={{ background:'rgba(0,0,0,0.4)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:20, height:240, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginBottom:18, position:'relative', overflow:'hidden' }}>
          {step===6
            ? <motion.div animate={{ rotate:360 }} transition={{ duration:1.5, repeat:Infinity, ease:'linear' }} style={{ fontSize:38, display:'inline-block' }}>⟳</motion.div>
            : <><div style={{ fontSize:36, color:'rgba(255,255,255,0.2)' }}>📷</div><div style={{ color:'rgba(255,255,255,0.3)', fontSize:13, marginTop:8 }}>Camera not active</div></>
          }
          {/* Corner guides */}
          {[[0,0,'top','left'],[0,'auto','top','right'],['auto',0,'bottom','left'],['auto','auto','bottom','right']].map(([t,r,tv,lv],i)=>(
            <div key={i} style={{ position:'absolute', [tv]:14, [lv]:14, width:22, height:22, borderTop:tv==='top'?'2px solid rgba(13,148,136,0.6)':'none', borderBottom:tv==='bottom'?'2px solid rgba(13,148,136,0.6)':'none', borderLeft:lv==='left'?'2px solid rgba(13,148,136,0.6)':'none', borderRight:lv==='right'?'2px solid rgba(13,148,136,0.6)':'none' }}/>
          ))}
        </div>
        <motion.button whileTap={{ scale:0.97 }} className="btn-primary" style={{ marginBottom:10 }}
          onClick={()=>{ if(step<6)setStep(s=>s+1); else{ showToast('✓ Identity verified!'); navigate('/more'); } }}>
          📷 {step===6?'Complete Verification':'Open Camera'}
        </motion.button>
        {step<6 && <button className="btn-secondary" onClick={()=>setStep(s=>s+1)}>↑ Upload from Gallery</button>}
      </div>
    </Page>
  );
}

/* ── NOTIFICATIONS ────────────────────────────────── */
export function Notifications() {
  const notifs = [
    { id:1, type:'warning', title:'Payment due soon',      body:'GH¢ 520.00 credit due 5/18/2026', time:'2h ago', read:false },
    { id:2, type:'success', title:'Points earned',         body:'+25 PowerFlex Points from Shell', time:'3h ago', read:false },
    { id:3, type:'info',    title:'New station available', body:'ChargeUp opened near East Legon',  time:'1d ago', read:true  },
    { id:4, type:'success', title:'Transfer received',     body:'GH¢ 500 bank transfer completed',  time:'2d ago', read:true  },
  ];
  const iconMap = { warning:'⚠️', success:'✅', info:'ℹ️' };
  const colorMap = { warning:'rgba(245,158,11,0.12)', success:'rgba(13,148,136,0.12)', info:'rgba(13,148,136,0.08)' };
  return (
    <Page>
      <BackHeader title="Notifications"/>
      <div style={{ padding:'0 20px 40px' }}>
        {notifs.map((n,i)=>(
          <motion.div key={n.id} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.06 }}
            style={{ background:n.read?'var(--navy-card)':'rgba(13,148,136,0.06)', border:`1px solid ${n.read?'var(--navy-border)':'rgba(13,148,136,0.2)'}`, borderRadius:16, padding:'14px 16px', marginBottom:10, display:'flex', gap:12 }}>
            <div style={{ width:40, height:40, borderRadius:12, background:colorMap[n.type], display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>{iconMap[n.type]}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600, fontSize:14, color:'#fff', marginBottom:2 }}>{n.title}</div>
              <div style={{ fontSize:12, color:'var(--muted)', lineHeight:1.5, marginBottom:5 }}>{n.body}</div>
              <div style={{ fontSize:11, color:'var(--muted)' }}>{n.time}</div>
            </div>
            {!n.read && <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--teal)', marginTop:4, flexShrink:0 }}/>}
          </motion.div>
        ))}
      </div>
    </Page>
  );
}

/* ── ECO TRACK ────────────────────────────────────── */
export function EcoTrack() {
  const eco = { co2:42.5, evKm:380, trees:2.1, goal:60 };
  const weekData = [{ w:'W1',ev:80,fuel:120 },{ w:'W2',ev:95,fuel:90 },{ w:'W3',ev:110,fuel:70 },{ w:'W4',ev:95,fuel:60 }];
  return (
    <Page style={{ background:'linear-gradient(180deg,#091a0d 0%,var(--navy) 40%)' }}>
      <BackHeader title="Eco Track" sub="Your environmental impact"/>
      <div style={{ padding:'0 20px 40px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:18 }}>
          {[['🌍','CO₂ Saved',`${eco.co2} kg`,'var(--teal-light)'],['⚡','EV Distance',`${eco.evKm} km`,'var(--teal)'],['🌲','Trees Equiv.',`${eco.trees}`,'#6aab6c'],['🎯','Monthly Goal',`${eco.goal} kg`,'var(--muted)']].map(([ic,l,v,c])=>(
            <div key={l} className="card" style={{ textAlign:'center', padding:16 }}>
              <div style={{ fontSize:26, marginBottom:6 }}>{ic}</div>
              <div className="amount" style={{ fontSize:20, color:c }}>{v}</div>
              <div style={{ fontSize:11, color:'var(--muted)', marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
        <div className="card" style={{ background:'rgba(61,90,62,0.1)', borderColor:'rgba(61,90,62,0.3)', marginBottom:16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
            <span style={{ fontWeight:700, color:'#fff' }}>Progress to Monthly Goal</span>
            <span style={{ color:'#6aab6c', fontWeight:700 }}>{Math.round((eco.co2/eco.goal)*100)}%</span>
          </div>
          <Prog value={eco.co2} max={eco.goal} color="#3d5a3e"/>
          <div style={{ fontSize:12, color:'var(--muted)', marginTop:8 }}>{eco.goal - eco.co2} kg remaining</div>
        </div>
        <div className="card" style={{ marginBottom:16 }}>
          <div className="sec-title">EV vs Fuel (km)</div>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={weekData} margin={{ top:5, right:0, left:-20, bottom:0 }}>
              <XAxis dataKey="w" tick={{ fill:'rgba(255,255,255,0.35)', fontSize:11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:'rgba(255,255,255,0.35)', fontSize:11 }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{ background:'var(--navy-card)', border:'1px solid rgba(13,148,136,0.3)', borderRadius:10, fontSize:12 }}/>
              <Bar dataKey="ev" fill="#0d9488" radius={[4,4,0,0]} name="EV"/>
              <Bar dataKey="fuel" fill="#3d5a3e" radius={[4,4,0,0]} name="Fuel"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="sec-title">🌱 Green Tips</div>
        {[['🌙','Charge during off-peak hours (10pm–6am) to save 15% on energy costs'],['☀️','EV charging with GridCo uses 80% renewable energy'],['🌳','Your trips this month saved the equivalent of 2 trees']].map(([ic,t])=>(
          <div key={t} className="card" style={{ marginBottom:8, display:'flex', gap:12, alignItems:'flex-start', padding:'13px 16px' }}>
            <span style={{ fontSize:20 }}>{ic}</span>
            <span style={{ fontSize:13, color:'var(--muted)', lineHeight:1.6 }}>{t}</span>
          </div>
        ))}
      </div>
    </Page>
  );
}

/* ── FUEL CARDS ───────────────────────────────────── */
export function FuelCards() {
  const { showToast } = useApp();
  const cards = [
    { brand:'Shell Ghana',   num:'**** 4521', bal:320, g:['#0a1628','#0f766e'], active:true  },
    { brand:'TotalEnergies', num:'**** 8832', bal:180, g:['#0a1628','#3d5a3e'], active:true  },
    { brand:'GOIL',          num:'**** 2241', bal:95,  g:['#0a1628','#0e7490'], active:true  },
    { brand:'Star Oil',      num:'**** 6610', bal:50,  g:['#0a1628','#1a3356'], active:false },
  ];
  return (
    <Page>
      <BackHeader title="Fuel Cards" sub="Manage your payment cards"/>
      <div style={{ padding:'0 20px 40px' }}>
        {cards.map((c,i)=>(
          <motion.div key={c.brand} initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07 }}
            whileTap={{ scale:0.98 }} onClick={()=>c.active&&showToast(`${c.brand} selected`)}
            style={{ borderRadius:22, padding:22, background:`linear-gradient(135deg,${c.g[0]},${c.g[1]})`, border:'1px solid rgba(13,148,136,0.25)', marginBottom:16, opacity:c.active?1:0.55, position:'relative', overflow:'hidden', cursor:c.active?'pointer':'default' }}>
            <motion.div animate={{ scale:[1,1.1,1], opacity:[0.05,0.08,0.05] }} transition={{ duration:4, repeat:Infinity }}
              style={{ position:'absolute', top:-40, right:-40, width:150, height:150, borderRadius:'50%', background:'var(--teal)' }}/>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:24 }}>
              <div style={{ fontWeight:800, fontSize:16, color:'#fff' }}>{c.brand}</div>
              {!c.active && <span className="badge badge-white">Inactive</span>}
            </div>
            <div style={{ fontFamily:'monospace', fontSize:14, color:'rgba(255,255,255,0.6)', letterSpacing:'0.1em', marginBottom:16 }}>**** **** {c.num}</div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.5)', marginBottom:2 }}>Card Balance</div>
                <div className="amount" style={{ fontSize:22, color:'#fff' }}>GH¢ {c.bal}</div>
              </div>
              <div style={{ width:40, height:28, borderRadius:5, background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ width:24, height:16, borderRadius:2, border:'1.5px solid rgba(255,255,255,0.5)' }}/>
              </div>
            </div>
          </motion.div>
        ))}
        <button className="btn-secondary" onClick={()=>showToast('Add card — coming soon','info')}>+ Add New Fuel Card</button>
      </div>
    </Page>
  );
}

/* ── BANK TRANSFER ────────────────────────────────── */
export function BankTransfer() {
  const [fields, setFields] = useState({ bank:'', acct:'', amt:'', note:'' });
  const { showToast } = useApp();
  const set = k => e => setFields(f=>({...f,[k]:e.target.value}));
  return (
    <Page>
      <BackHeader title="Bank Transfer" sub="Transfer to any Ghana bank"/>
      <div style={{ padding:'0 20px 40px' }}>
        <div className="glow-card" style={{ marginBottom:16, display:'flex', justifyContent:'space-between' }}>
          <span style={{ fontSize:13, color:'var(--muted)' }}>Available Balance</span>
          <span style={{ fontWeight:700, color:'var(--teal-light)' }}>GH¢ 1,250.00</span>
        </div>
        {[['Select Bank','bank','text','e.g. GCB Bank, Ecobank'],['Account Number','acct','text','Enter account number'],['Amount (GH¢)','amt','number','0.00'],['Note (Optional)','note','text','Payment description']].map(([l,k,t,p])=>(
          <div key={k} style={{ marginBottom:16 }}>
            <span className="label">{l}</span>
            <input className="input" type={t} value={fields[k]} onChange={set(k)} placeholder={p} style={k==='amt'?{ fontSize:24, fontWeight:800 }:{}}/>
          </div>
        ))}
        <motion.button whileTap={{ scale:0.97 }} className="btn-primary" style={{ marginTop:8 }}
          onClick={()=>{ if(!fields.bank||!fields.acct||!fields.amt)return showToast('Fill in all fields','error'); showToast('✓ Transfer initiated!'); setFields({ bank:'',acct:'',amt:'',note:'' }); }}>
          🏦 Transfer Now
        </motion.button>
      </div>
    </Page>
  );
}

/* ── MOBILE MONEY ─────────────────────────────────── */
export function MobileMoney() {
  const [net, setNet] = useState('mtn');
  const [num, setNum] = useState('');
  const [amt, setAmt] = useState('');
  const { showToast } = useApp();
  const nets = [['mtn','MTN MoMo','#f59e0b'],['vodafone','Vodafone Cash','#ef4444'],['airteltigo','AirtelTigo','var(--teal)']];
  return (
    <Page>
      <BackHeader title="Mobile Money" sub="Send via mobile money"/>
      <div style={{ padding:'0 20px 40px' }}>
        <span className="label">Select Network</span>
        <div style={{ display:'flex', gap:8, marginBottom:20 }}>
          {nets.map(([id,l,c])=>(
            <motion.div key={id} whileTap={{ scale:0.93 }} onClick={()=>setNet(id)}
              style={{ flex:1, padding:'12px 6px', borderRadius:14, cursor:'pointer', textAlign:'center', background:net===id?`${c}22`:'rgba(255,255,255,0.04)', border:`1px solid ${net===id?c:'var(--navy-border)'}`, transition:'all .2s' }}>
              <div style={{ fontSize:20, marginBottom:4 }}>📱</div>
              <div style={{ fontSize:10, fontWeight:600, color:net===id?c:'var(--muted)' }}>{l}</div>
            </motion.div>
          ))}
        </div>
        <span className="label">Phone Number</span>
        <input className="input" type="tel" value={num} onChange={e=>setNum(e.target.value)} placeholder="+233 24 XXX XXXX" style={{ marginBottom:16 }}/>
        <span className="label">Amount (GH¢)</span>
        <input className="input" type="number" value={amt} onChange={e=>setAmt(e.target.value)} placeholder="0.00" style={{ fontSize:26, fontWeight:800, marginBottom:12 }}/>
        <div style={{ display:'flex', gap:8, marginBottom:24 }}>
          {[20,50,100,200].map(v=>(
            <motion.button key={v} whileTap={{ scale:0.92 }} onClick={()=>setAmt(String(v))}
              style={{ flex:1, padding:9, borderRadius:10, background:amt===String(v)?'rgba(13,148,136,0.2)':'rgba(255,255,255,0.05)', border:`1px solid ${amt===String(v)?'var(--teal)':'var(--navy-border)'}`, color:amt===String(v)?'var(--teal-light)':'var(--muted)', fontFamily:'Inter', fontWeight:600, fontSize:13, cursor:'pointer' }}>
              {v}
            </motion.button>
          ))}
        </div>
        <motion.button whileTap={{ scale:0.97 }} className="btn-primary"
          onClick={()=>{ if(!num||!amt)return showToast('Fill in all fields','error'); showToast(`✓ GH¢ ${parseFloat(amt).toFixed(2)} sent!`); setNum(''); setAmt(''); }}>
          📱 Send via Mobile Money
        </motion.button>
      </div>
    </Page>
  );
}

/* ── SETTINGS ─────────────────────────────────────── */
export function Settings() {
  const { showToast } = useApp();
  const [tog, setTog] = useState({ biometric:true, notifs:true, dark:true, autoSave:false, location:true });
  const flip = k => { setTog(t=>({...t,[k]:!t[k]})); showToast('Setting updated'); };
  return (
    <Page>
      <BackHeader title="Settings"/>
      <div style={{ padding:'0 20px 40px' }}>
        {[{t:'SECURITY',items:[['biometric','Biometric Login','Touch ID / Face ID']]},
          {t:'PREFERENCES',items:[['notifs','Push Notifications','Receive alerts'],['dark','Dark Mode','Use dark theme'],['autoSave','Auto-Save Trips','Log trips automatically'],['location','Location Services','Find nearby stations']]}
        ].map(sec=>(
          <div key={sec.t} style={{ marginBottom:22 }}>
            <div className="sec-title">{sec.t}</div>
            <div className="card" style={{ padding:'4px 16px' }}>
              {sec.items.map(([k,l,s])=>(
                <div key={k} className="row" onClick={()=>flip(k)} style={{ justifyContent:'space-between' }}>
                  <div>
                    <div style={{ fontSize:14, fontWeight:500, color:'#fff' }}>{l}</div>
                    <div style={{ fontSize:12, color:'var(--muted)', marginTop:2 }}>{s}</div>
                  </div>
                  <motion.div layout onClick={()=>flip(k)} style={{ width:44, height:26, borderRadius:13, background:tog[k]?'var(--teal)':'rgba(255,255,255,0.1)', position:'relative', cursor:'pointer', flexShrink:0 }} transition={{ duration:0.2 }}>
                    <motion.div layout style={{ width:20, height:20, borderRadius:'50%', background:'#fff', position:'absolute', top:3, left:tog[k]?21:3 }} transition={{ type:'spring', stiffness:400, damping:28 }}/>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="sec-title">APP INFO</div>
        <div className="card" style={{ padding:'4px 16px' }}>
          {[['Version','2.0.0'],['Build','20260518'],['Platform','Production']].map(([l,v])=>(
            <div key={l} className="row" style={{ justifyContent:'space-between' }}>
              <span style={{ fontSize:14, color:'var(--muted)' }}>{l}</span>
              <span style={{ fontSize:13, color:'var(--muted)', fontFamily:'monospace' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

/* ── CORPORATE ────────────────────────────────────── */
export function Corporate() {
  const { showToast } = useApp();
  return (
    <Page>
      <BackHeader title="Corporate Account" sub="Manage your fleet"/>
      <div style={{ padding:'0 20px 40px' }}>
        <MorphCard style={{ textAlign:'center', padding:28, marginBottom:22 }}>
          <div style={{ fontSize:48, marginBottom:14 }}>🏢</div>
          <div style={{ fontWeight:700, fontSize:18, color:'#fff', marginBottom:10 }}>Activate Corporate</div>
          <div style={{ fontSize:13, color:'var(--muted)', lineHeight:1.7, marginBottom:22 }}>Manage multiple fuel cards, track fleet spending, and get detailed business reports.</div>
          <motion.button whileTap={{ scale:0.97 }} className="btn-primary" onClick={()=>showToast('Corporate request submitted!','info')}>Request Corporate Access</motion.button>
        </MorphCard>
        <div className="sec-title">CORPORATE FEATURES</div>
        {[['💳','Multi-Card Management','Issue and manage cards for all drivers'],['📊','Fleet Analytics','Detailed spending and mileage reports'],['🧾','Invoice Generation','Auto-generate invoices for fuel purchases'],['👥','Team Management','Add and manage team members'],['🎯','Spend Controls','Set limits per card or driver'],['🔔','Real-time Alerts','Get notified of unusual spending']].map(([ic,l,s])=>(
          <div key={l} className="card" style={{ display:'flex', gap:14, alignItems:'center', marginBottom:10 }}>
            <div className="icon-box" style={{ background:'rgba(13,148,136,0.12)', fontSize:20 }}>{ic}</div>
            <div>
              <div style={{ fontWeight:600, fontSize:14, color:'#fff' }}>{l}</div>
              <div style={{ fontSize:12, color:'var(--muted)', marginTop:2 }}>{s}</div>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}

/* ── SUPPORT ──────────────────────────────────────── */
export function Support() {
  const { showToast } = useApp();
  const [msg, setMsg] = useState('');
  return (
    <Page>
      <BackHeader title="Help & Support"/>
      <div style={{ padding:'0 20px 40px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:24 }}>
          {[['💬','Live Chat','Chat now'],['📞','Call Us','+233 302 XXX'],['✉️','Email','support@'],['❓','FAQ','Common questions']].map(([ic,l,s])=>(
            <motion.div key={l} whileTap={{ scale:0.94 }} onClick={()=>showToast(`Opening ${l}...`,'info')}
              className="card" style={{ textAlign:'center', cursor:'pointer', padding:16 }}>
              <div style={{ fontSize:28, marginBottom:8 }}>{ic}</div>
              <div style={{ fontWeight:600, fontSize:14, color:'#fff' }}>{l}</div>
              <div style={{ fontSize:11, color:'var(--muted)', marginTop:4 }}>{s}</div>
            </motion.div>
          ))}
        </div>
        <div className="sec-title">Send a Message</div>
        <div className="card">
          <textarea className="input" value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Describe your issue..." style={{ height:100, resize:'none', marginBottom:14 }}/>
          <motion.button whileTap={{ scale:0.97 }} className="btn-primary"
            onClick={()=>{ if(!msg)return; showToast("Message sent! We'll respond within 24h"); setMsg(''); }}>
            Send Message
          </motion.button>
        </div>
      </div>
    </Page>
  );
}

/* ── DOCUMENTS ────────────────────────────────────── */
export function Documents() {
  const { showToast } = useApp();
  return (
    <Page>
      <BackHeader title="Documents"/>
      <div style={{ padding:'0 20px 40px' }}>
        {[['📄','January 2025 Statement','2025-02-01','245 KB'],['📄','December 2024 Statement','2025-01-01','312 KB'],['🧾','Tax Certificate 2024','2024-12-31','180 KB'],['🛡️','KYC Verification Letter','2024-11-15','92 KB']].map(([ic,n,d,s])=>(
          <motion.div key={n} whileTap={{ scale:0.98 }} onClick={()=>showToast(`Downloading ${n}...`,'info')}
            className="card" style={{ display:'flex', gap:14, alignItems:'center', marginBottom:10, cursor:'pointer' }}>
            <div className="icon-box" style={{ background:'rgba(13,148,136,0.12)', fontSize:22 }}>{ic}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600, fontSize:14, color:'#fff' }}>{n}</div>
              <div style={{ fontSize:12, color:'var(--muted)', marginTop:2 }}>{d} · {s}</div>
            </div>
            <span style={{ fontSize:18, color:'var(--muted)' }}>⬇</span>
          </motion.div>
        ))}
      </div>
    </Page>
  );
}

/* ── CHALLENGES ───────────────────────────────────── */
export function Challenges() {
  const { showToast } = useApp();
  const chs = [
    { id:1, t:'EV Pioneer',       d:'Charge at 3 different EV stations', r:150, p:2, total:3, exp:'7 days' },
    { id:2, t:'Budget Master',    d:'Stay under budget for 30 days',      r:200, p:18, total:30,exp:'12 days' },
    { id:3, t:'Cross-Brand Hero', d:'Buy fuel at 5 different OMCs',       r:300, p:4, total:5, exp:'14 days' },
    { id:4, t:'Early Bird',       d:'Make 5 early credit payments',        r:100, p:3, total:5, exp:'21 days' },
  ];
  return (
    <Page>
      <BackHeader title="Challenges" sub="Complete to earn bonus points"/>
      <div style={{ padding:'0 20px 40px' }}>
        {chs.map((c,i)=>(
          <motion.div key={c.id} initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07 }} className="card" style={{ marginBottom:12 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
              <div style={{ flex:1, marginRight:12 }}>
                <div style={{ fontWeight:700, fontSize:15, color:'#fff', marginBottom:4 }}>{c.t}</div>
                <div style={{ fontSize:13, color:'var(--muted)' }}>{c.d}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <span className="badge badge-teal">+{c.r} pts</span>
                <div style={{ fontSize:11, color:'var(--muted)', marginTop:4 }}>{c.exp}</div>
              </div>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'var(--muted)', marginBottom:8 }}>
              <span>{c.p} / {c.total} completed</span>
              <span style={{ color:c.p===c.total?'var(--teal-light)':'var(--muted)', fontWeight:600 }}>{Math.round((c.p/c.total)*100)}%</span>
            </div>
            <Prog value={c.p} max={c.total} color={c.p===c.total?'var(--teal)':'var(--green)'}/>
            {c.p===c.total && (
              <motion.button whileTap={{ scale:0.96 }} className="btn-primary" style={{ marginTop:14, padding:10 }}
                onClick={()=>showToast(`+${c.r} points claimed! 🎉`)}>
                🎉 Claim Reward
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>
    </Page>
  );
}

/* ── FAVORITES ────────────────────────────────────── */
export function Favorites() {
  const { showToast } = useApp();
  const [tab, setTab] = useState('stations');
  const data = {
    stations:[['🐚','Shell - Accra Mall','1.2 km','Jan 7'],['🟢','GOIL Airport','3.5 km','Jan 5'],['⚡','GridCo Accra Central','5.8 km','Jan 6']],
    banks:[['🏦','GCB Bank','****4521'],['🏦','Ecobank GH','****8832']],
    mobile:[['📱','MTN MoMo','+233 24 *** ****'],['📱','Vodafone Cash','+233 20 *** ****']],
  };
  return (
    <Page>
      <BackHeader title="Favorites"/>
      <div style={{ padding:'0 20px 40px' }}>
        <div style={{ display:'flex', gap:4, background:'rgba(255,255,255,0.05)', borderRadius:12, padding:4, marginBottom:20 }}>
          {['stations','banks','mobile'].map(t=>(
            <motion.button key={t} whileTap={{ scale:0.95 }} onClick={()=>setTab(t)}
              style={{ flex:1, padding:'8px 4px', borderRadius:9, border:'none', background:tab===t?'var(--teal)':'transparent', color:tab===t?'#fff':'var(--muted)', fontFamily:'Inter', fontWeight:600, fontSize:12, cursor:'pointer', transition:'all .2s', textTransform:'capitalize' }}>
              {t==='stations'?'Stations':t==='banks'?'Banks':'Mobile Money'}
            </motion.button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} transition={{ duration:0.2 }}>
            {data[tab].map((item,i)=>(
              <div key={i} className="card" style={{ display:'flex', alignItems:'center', gap:14, marginBottom:10 }}>
                <div className="icon-box" style={{ background:'rgba(13,148,136,0.12)', fontSize:20 }}>{item[0]}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600, fontSize:14, color:'#fff' }}>{item[1]}</div>
                  <div style={{ fontSize:12, color:'var(--muted)', marginTop:2 }}>{item[2]}</div>
                  {item[3] && <div style={{ fontSize:12, color:'var(--muted)' }}>Last visit: {item[3]}</div>}
                </div>
                <motion.button whileTap={{ scale:0.88 }} onClick={()=>showToast(`${item[1]} removed`,'info')}
                  style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:10, padding:8, cursor:'pointer', color:'#f87171', fontSize:16 }}>🗑️</motion.button>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Page>
  );
}
