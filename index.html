import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Page, BackHeader, BottomNav, Prog, stagger, fadeItem, Row } from '../components/UI';
import { stations, creditTiers, omcLoyalty } from '../data/appData';
import { useApp } from '../context/AppContext';

/* ─── BUY FUEL ─────────────────────────────────── */
export function BuyFuel() {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');
  const [selected, setSelected] = useState(null);
  const [litres, setLitres] = useState('20');
  const [payMethod, setPayMethod] = useState('wallet');

  const list = stations.filter(s => {
    const q = s.name.toLowerCase().includes(search.toLowerCase());
    return tab === 'all' ? q : (q && s.myCard);
  });

  if (selected) {
    const total = (parseFloat(litres || 0) * selected.price).toFixed(2);
    return (
      <Page>
        <BackHeader title={selected.name} sub="Complete your purchase" onBack={() => setSelected(null)} />
        <div style={{ padding:'0 20px 40px' }}>
          {/* Station info */}
          <div className="card" style={{ marginBottom:20, display:'flex', gap:14, alignItems:'center' }}>
            <div style={{ width:56, height:56, borderRadius:16, background:'rgba(13,148,136,0.12)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:22, color:'var(--teal-light)' }}>{selected.icon}</div>
            <div>
              <div style={{ fontWeight:700, fontSize:16, color:'#fff', marginBottom:2 }}>{selected.name}</div>
              <div style={{ fontSize:12, color:'var(--muted)' }}>{selected.addr}</div>
              <div style={{ fontSize:12, color:'var(--muted)', marginTop:2 }}>⭐ {selected.rating} · {selected.dist} km</div>
            </div>
          </div>

          {/* Litres */}
          <div style={{ marginBottom:18 }}>
            <span className="label">Litres</span>
            <input className="input" type="number" value={litres} onChange={e=>setLitres(e.target.value)} style={{ fontSize:26, fontWeight:800, paddingRight:60 }} />
            <div style={{ display:'flex', gap:8, marginTop:10 }}>
              {[10,20,30,50].map(l => (
                <motion.button key={l} whileTap={{ scale:0.92 }} onClick={() => setLitres(String(l))}
                  style={{ flex:1, padding:'9px 0', borderRadius:10, border:`1px solid ${litres===String(l)?'var(--teal)':'var(--navy-border)'}`, background:litres===String(l)?'rgba(13,148,136,0.15)':'rgba(255,255,255,0.03)', color:litres===String(l)?'var(--teal-light)':'var(--muted)', fontFamily:'Inter', fontWeight:600, fontSize:13, cursor:'pointer' }}>
                  {l}L
                </motion.button>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="glow-card" style={{ marginBottom:18 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
              <span style={{ color:'var(--muted)', fontSize:13 }}>GH¢ {selected.price} × {litres||0}L</span>
            </div>
            <div className="divider" />
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontWeight:700, fontSize:15, color:'#fff' }}>Total</span>
              <motion.span
                key={total}
                initial={{ scale:0.9, opacity:0 }}
                animate={{ scale:1, opacity:1 }}
                className="amount"
                style={{ fontSize:24, color:'var(--teal-light)' }}
              >GH¢ {total}</motion.span>
            </div>
          </div>

          {/* Payment method */}
          <span className="label">Payment Method</span>
          {[['wallet','💰','PowerFlex Wallet','GH¢ 1,250 available'],['fuelcard','⛽','Fuel Card','4 cards available'],['credit','💳','PowerFlex Credit','GH¢ 1,500 available']].map(([id,ic,l,s]) => (
            <motion.div key={id} whileTap={{ scale:0.98 }} onClick={() => setPayMethod(id)}
              style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 15px', borderRadius:14, marginBottom:8, cursor:'pointer', background:payMethod===id?'rgba(13,148,136,0.1)':'rgba(255,255,255,0.03)', border:`1px solid ${payMethod===id?'var(--teal)':'var(--navy-border)'}`, transition:'all .2s' }}>
              <span style={{ fontSize:20 }}>{ic}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:500, color:'#fff' }}>{l}</div>
                <div style={{ fontSize:11, color:'var(--muted)', marginTop:2 }}>{s}</div>
              </div>
              <div style={{ width:18, height:18, borderRadius:'50%', border:`2px solid ${payMethod===id?'var(--teal)':'rgba(255,255,255,0.2)'}`, background:payMethod===id?'var(--teal)':'transparent', display:'flex', alignItems:'center', justifyContent:'center' }}>
                {payMethod===id && <div style={{ width:6, height:6, borderRadius:'50%', background:'#fff' }}/>}
              </div>
            </motion.div>
          ))}

          <motion.button whileTap={{ scale:0.97 }} className="btn-primary" style={{ marginTop:20 }}
            onClick={() => { showToast(`✓ Payment of GH¢ ${total} confirmed!`); navigate('/home'); }}>
            ⚡ Pay GH¢ {total} via QR
          </motion.button>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div style={{ background:'var(--navy-card)', padding:'52px 20px 16px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
          <motion.button whileTap={{ scale:0.9 }} onClick={() => navigate(-1)}
            style={{ width:40, height:40, borderRadius:12, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:18 }}>←</motion.button>
          <div>
            <div style={{ fontWeight:700, fontSize:18, color:'#fff' }}>Select Station</div>
            <div style={{ fontSize:12, color:'var(--muted)' }}>Choose where to buy fuel</div>
          </div>
        </div>
        <input className="input" placeholder="🔍  Search stations, brands..." value={search} onChange={e=>setSearch(e.target.value)} style={{ marginBottom:12 }} />
        <div style={{ display:'flex', gap:4, background:'rgba(255,255,255,0.05)', borderRadius:12, padding:4 }}>
          {[['all',`All Stations (${stations.length})`],['cards','My Fuel Cards (4)']].map(([v,l]) => (
            <motion.button key={v} whileTap={{ scale:0.95 }} onClick={() => setTab(v)}
              style={{ flex:1, padding:'9px 8px', borderRadius:9, border:'none', background:tab===v?'var(--teal)':'transparent', color:tab===v?'#fff':'var(--muted)', fontFamily:'Inter', fontWeight:600, fontSize:12, cursor:'pointer', transition:'all .2s' }}>
              {l}
            </motion.button>
          ))}
        </div>
        <div style={{ fontSize:11, color:'var(--muted)', marginTop:10 }}>Sorted by: <span style={{ color:'var(--teal-light)' }}>Distance</span></div>
      </div>

      <div style={{ padding:'14px 20px 90px' }}>
        <AnimatePresence>
          {list.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity:0, y:16 }}
              animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:-10 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(s)}
              style={{ background:'var(--navy-card)', border:'1px solid var(--navy-border)', borderRadius:18, padding:'15px 16px', marginBottom:10, cursor:'pointer' }}
              whileHover={{ borderColor:'rgba(13,148,136,0.3)' }}
              whileTap={{ scale:0.98 }}
            >
              <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                <div style={{ width:48, height:48, borderRadius:14, background:'rgba(13,148,136,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:20, color:'var(--teal-light)', flexShrink:0 }}>{s.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap', marginBottom:4 }}>
                    <span style={{ fontWeight:700, fontSize:14, color:'#fff' }}>{s.name}</span>
                    {s.nearest && <span className="badge badge-teal">Nearest</span>}
                    {s.myCard && <span className="badge badge-green">Your Card</span>}
                  </div>
                  <div style={{ fontSize:11, color:'var(--muted)', marginBottom:5 }}>📍 {s.addr}</div>
                  <div style={{ display:'flex', gap:10 }}>
                    <span style={{ fontSize:11, color:'var(--muted)' }}>⭐ {s.rating}</span>
                    <span style={{ fontSize:11, color:'var(--muted)' }}>{s.dist} km</span>
                    <span className={`badge ${s.open?'badge-teal':'badge-red'}`}>{s.open?'Open':'Closed'}</span>
                  </div>
                </div>
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <div style={{ fontWeight:800, fontSize:17, color:'var(--teal-light)' }}>GH¢ {s.price}</div>
                  <div style={{ fontSize:10, color:'var(--muted)' }}>per litre</div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <BottomNav />
    </Page>
  );
}

/* ─── REWARDS ──────────────────────────────────── */
export function Rewards() {
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText('KWAME2024').catch(()=>{});
    setCopied(true);
    showToast('Referral code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Page>
      <BackHeader title="Loyalty Rewards" sub="Earn & redeem across all OMCs" />
      <div style={{ padding:'0 20px 90px' }}>
        {/* Points card */}
        <motion.div
          initial={{ opacity:0, scale:0.95 }}
          animate={{ opacity:1, scale:1 }}
          className="green-card"
          style={{ marginBottom:20 }}
        >
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
            <span style={{ fontSize:16 }}>⭐</span>
            <span style={{ fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.7)', letterSpacing:'0.06em', textTransform:'uppercase' }}>PowerFlex Points</span>
          </div>
          <div className="amount" style={{ fontSize:48, color:'#fff', marginBottom:20, letterSpacing:'-0.02em' }}>3,250</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
            {[['From fuel',2000],['Cross-brand',450],['Early payment',300],['Referrals',500]].map(([l,v]) => (
              <div key={l} style={{ background:'rgba(0,0,0,0.2)', borderRadius:12, padding:'10px 12px' }}>
                <div style={{ fontSize:10, color:'rgba(255,255,255,0.6)', marginBottom:4 }}>{l}</div>
                <div style={{ fontWeight:700, fontSize:16, color:'#fff' }}>{v.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Redeem */}
        <div className="sec-title">🎁 Redeem Points</div>
        {[['💰','Wallet Credit','100 pts = GH¢ 1.00'],['⛽','Fuel Discount','500 pts = 5% off'],['🎁','OMC Rewards','Varies by partner']].map(opt => (
          <motion.div key={opt[1]} whileTap={{ scale:0.98 }} onClick={() => showToast(`Redirecting to ${opt[1]}...`, 'info')}
            style={{ background:'var(--navy-card)', border:'1px solid var(--navy-border)', borderRadius:16, padding:'14px 16px', display:'flex', alignItems:'center', gap:14, marginBottom:10, cursor:'pointer' }}
            whileHover={{ borderColor:'rgba(13,148,136,0.3)' }}>
            <div style={{ width:44, height:44, borderRadius:13, background:'rgba(13,148,136,0.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>{opt[0]}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600, fontSize:14, color:'#fff' }}>{opt[1]}</div>
              <div style={{ fontSize:12, color:'var(--muted)', marginTop:2 }}>{opt[2]}</div>
            </div>
            <span style={{ color:'var(--muted)', fontSize:18 }}>›</span>
          </motion.div>
        ))}

        {/* OMC Loyalty */}
        <div className="sec-title" style={{ marginTop:20 }}>OMC Loyalty Status</div>
        <motion.div variants={stagger} initial="initial" animate="animate">
          {omcLoyalty.map(omc => (
            <motion.div key={omc.brand} variants={fadeItem} className="card" style={{ marginBottom:10 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:40, height:40, borderRadius:12, background:`${omc.color}22`, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:13, color:omc.color }}>
                    {omc.brand.slice(0,2).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight:600, fontSize:14, color:'#fff' }}>{omc.brand}</div>
                    <span className="badge badge-teal" style={{ marginTop:3 }}>{omc.tier}</span>
                  </div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontWeight:700, fontSize:15, color:'#fff' }}>{omc.pts.toLocaleString()}</div>
                  <div style={{ fontSize:11, color:'var(--teal-light)' }}>+{omc.today} Today</div>
                </div>
              </div>
              <Prog value={omc.pct} max={100} color={omc.color} />
            </motion.div>
          ))}
        </motion.div>

        {/* Refer */}
        <div className="glow-card" style={{ marginTop:20 }}>
          <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:14 }}>
            <div style={{ width:40, height:40, borderRadius:12, background:'rgba(13,148,136,0.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>👥</div>
            <div>
              <div style={{ fontWeight:700, fontSize:14, color:'#fff' }}>Refer Friends</div>
              <div style={{ fontSize:12, color:'var(--muted)' }}>Earn 50 points per referral!</div>
            </div>
          </div>
          <div style={{ background:'rgba(13,148,136,0.08)', borderRadius:12, padding:'12px 14px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <div style={{ fontSize:11, color:'var(--muted)', marginBottom:4 }}>Your referral code</div>
              <div style={{ fontWeight:800, fontSize:20, color:'var(--teal-light)', letterSpacing:'0.1em' }}>KWAME2024</div>
            </div>
            <motion.button whileTap={{ scale:0.92 }} onClick={handleCopy}
              style={{ background:copied?'var(--green)':'var(--teal)', border:'none', borderRadius:10, padding:'10px 18px', color:'#fff', fontFamily:'Inter', fontWeight:700, fontSize:13, cursor:'pointer', transition:'all .2s' }}>
              {copied ? '✓ Copied!' : 'Copy'}
            </motion.button>
          </div>
        </div>
      </div>
      <BottomNav />
    </Page>
  );
}

/* ─── CREDIT ───────────────────────────────────── */
export function Credit() {
  const { showToast } = useApp();
  const [paying, setPaying] = useState(false);
  const [amount, setAmount] = useState('');

  return (
    <Page>
      <BackHeader title="PowerFlex Credit" sub="Buy now, pay later" />
      <div style={{ padding:'0 20px 90px' }}>
        {/* Credit card */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          style={{ borderRadius:24, padding:22, background:'linear-gradient(135deg,#0a1628 0%,#112240 50%,#0f2d1a 100%)', border:'1px solid rgba(13,148,136,0.3)', marginBottom:14, position:'relative', overflow:'hidden' }}
        >
          <motion.div
            animate={{ rotate:360 }}
            transition={{ duration:20, repeat:Infinity, ease:'linear' }}
            style={{ position:'absolute', top:-60, right:-60, width:180, height:180, borderRadius:'50%', background:'radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 70%)' }}
          />
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
            <span className="badge badge-green">Tier 3 – Silver</span>
          </div>
          <div style={{ fontSize:12, color:'var(--muted)', marginBottom:4 }}>Available Credit</div>
          <div className="amount" style={{ fontSize:38, color:'#fff', marginBottom:16 }}>GH¢ 1,500</div>
          <div style={{ marginBottom:14 }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'var(--muted)', marginBottom:6 }}>
              <span>Limit: GH¢ 2,000</span><span>25% used</span>
            </div>
            <Prog value={25} max={100} color="var(--teal)" />
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:'rgba(255,255,255,0.07)', borderRadius:14, padding:'12px 14px' }}>
            <div>
              <div style={{ fontSize:11, color:'var(--muted)' }}>Balance Due</div>
              <div className="amount" style={{ fontSize:18, color:'#fff' }}>GH¢ 520.00</div>
            </div>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:11, color:'var(--muted)' }}>Due Date</div>
              <div style={{ fontWeight:700, fontSize:13, color:'#fff' }}>5/18/2026</div>
            </div>
            <motion.button whileTap={{ scale:0.95 }} className="btn-primary" style={{ width:'auto', padding:'10px 18px', fontSize:13 }} onClick={() => setPaying(true)}>
              Pay Now
            </motion.button>
          </div>
        </motion.div>

        {/* Due soon */}
        <div style={{ background:'rgba(61,90,62,0.15)', border:'1px solid rgba(61,90,62,0.3)', borderRadius:16, padding:'14px 16px', marginBottom:22, display:'flex', gap:12, alignItems:'center' }}>
          <span style={{ fontSize:20 }}>⚠️</span>
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:'#6aab6c' }}>Payment Due Soon</div>
            <div style={{ fontSize:12, color:'var(--muted)', marginTop:2 }}>GH¢ 520.00 due on 5/18/2026</div>
          </div>
        </div>

        {/* Pay modal */}
        <AnimatePresence>
          {paying && (
            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              exit={{ opacity:0 }}
              style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', zIndex:200, display:'flex', alignItems:'flex-end', justifyContent:'center' }}
              onClick={() => setPaying(false)}
            >
              <motion.div
                initial={{ y:'100%' }}
                animate={{ y:0 }}
                exit={{ y:'100%' }}
                transition={{ type:'spring', damping:28, stiffness:300 }}
                onClick={e => e.stopPropagation()}
                style={{ background:'var(--navy-card)', borderRadius:'24px 24px 0 0', padding:'28px 24px 48px', width:'100%', maxWidth:430 }}
              >
                <div style={{ fontWeight:700, fontSize:18, color:'#fff', marginBottom:6 }}>Pay Credit Balance</div>
                <div style={{ fontSize:13, color:'var(--muted)', marginBottom:22 }}>Wallet Balance: GH¢ 1,250.00</div>
                <span className="label">Amount (GH¢)</span>
                <input className="input" type="number" value={amount} onChange={e=>setAmount(e.target.value)} style={{ fontSize:26, fontWeight:800, marginBottom:14 }} autoFocus />
                <div style={{ display:'flex', gap:8, marginBottom:22 }}>
                  {[520,260,100].map(v => (
                    <motion.button key={v} whileTap={{ scale:0.92 }} onClick={() => setAmount(String(v))}
                      style={{ flex:1, padding:'9px', borderRadius:10, background:amount===String(v)?'rgba(13,148,136,0.2)':'rgba(255,255,255,0.05)', border:`1px solid ${amount===String(v)?'var(--teal)':'var(--navy-border)'}`, color:amount===String(v)?'var(--teal-light)':'var(--muted)', fontFamily:'Inter', fontWeight:600, fontSize:12, cursor:'pointer' }}>
                      {v===520?'Full':'GH¢ '+v}
                    </motion.button>
                  ))}
                </div>
                <div style={{ display:'flex', gap:10 }}>
                  <button className="btn-ghost" onClick={() => setPaying(false)} style={{ flex:1 }}>Cancel</button>
                  <motion.button whileTap={{ scale:0.97 }} className="btn-primary" style={{ flex:2 }}
                    onClick={() => { showToast('✓ Payment submitted!'); setPaying(false); setAmount(''); }}>
                    Pay Now
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tiers */}
        <div className="sec-title">Credit Tiers</div>
        {creditTiers.map((t, i) => (
          <motion.div
            key={t.n}
            initial={{ opacity:0, x:-10 }}
            animate={{ opacity:1, x:0 }}
            transition={{ delay: i * 0.07 }}
            style={{ borderRadius:16, padding:t.current?1:0, background:t.current?'linear-gradient(135deg,var(--teal),var(--green))':'transparent', marginBottom:10 }}
          >
            <div style={{ borderRadius:t.current?15:16, padding:'13px 16px', background:t.current?'var(--navy-card)':'var(--navy-el)', border:t.current?'none':'1px solid var(--navy-border)', display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:34, height:34, borderRadius:10, background:t.done?'rgba(13,148,136,0.2)':'rgba(255,255,255,0.05)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>
                {t.done ? '✓' : '🔒'}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:2 }}>
                  <span style={{ fontWeight:700, fontSize:14, color:t.done?'#fff':'var(--muted)' }}>Tier {t.n} – {t.name}</span>
                  {t.current && <span className="badge badge-teal">Current</span>}
                </div>
                <div style={{ fontSize:12, color:'var(--muted)' }}>GH¢ {t.limit.toLocaleString()} · {t.dur} · {t.rate}</div>
              </div>
              {!t.done && <div style={{ fontSize:11, color:'var(--muted)', textAlign:'right' }}>{t.need} to<br/>unlock</div>}
            </div>
          </motion.div>
        ))}
      </div>
      <BottomNav />
    </Page>
  );
}
