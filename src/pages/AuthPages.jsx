import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { onboardSlides } from '../data/appData';

export function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const slide = onboardSlides[step];
  const isLast = step === onboardSlides.length - 1;

  return (
    <div style={{ minHeight:'100dvh', background:'var(--navy)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between', padding:'60px 28px 48px', position:'relative' }}>
      {!isLast && (
        <button onClick={() => navigate('/login')} style={{ position:'absolute', top:56, right:24, background:'none', border:'none', color:'var(--muted)', fontSize:14, cursor:'pointer', fontFamily:'Inter' }}>
          Skip
        </button>
      )}

      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity:0, scale:0.85, y:20 }}
            animate={{ opacity:1, scale:1, y:0 }}
            exit={{ opacity:0, scale:0.85, y:-20 }}
            transition={{ duration:0.4, ease:[0.4,0,0.2,1] }}
            style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center' }}
          >
            {/* Morphing icon */}
            <motion.div
              animate={{
                boxShadow: [`0 0 0 0 ${slide.color}44`, `0 0 0 24px ${slide.color}00`, `0 0 0 0 ${slide.color}00`],
              }}
              transition={{ duration:2.5, repeat:Infinity }}
              style={{
                width:120, height:120, borderRadius:36,
                background:`linear-gradient(135deg, ${slide.color}33, ${slide.color}11)`,
                border:`2px solid ${slide.color}55`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:52, marginBottom:40,
              }}
            >
              {slide.icon}
            </motion.div>

            <h1 style={{ fontWeight:800, fontSize:28, color:'#fff', lineHeight:1.2, marginBottom:16, letterSpacing:'-0.02em', maxWidth:300 }}>
              {slide.title}
            </h1>
            <p style={{ fontSize:15, color:'var(--muted)', lineHeight:1.7, maxWidth:300 }}>
              {slide.sub}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div style={{ display:'flex', gap:8, margin:'40px 0 32px' }}>
        {onboardSlides.map((_, i) => (
          <motion.div
            key={i}
            animate={{ width: i===step ? 28 : 8, background: i===step ? 'var(--teal)' : 'rgba(255,255,255,0.15)' }}
            transition={{ duration:0.3 }}
            style={{ height:8, borderRadius:99, cursor:'pointer' }}
            onClick={() => setStep(i)}
          />
        ))}
      </div>

      <div style={{ width:'100%', display:'flex', gap:12 }}>
        {step > 0 && (
          <motion.button whileTap={{ scale:0.95 }} className="btn-ghost" onClick={() => setStep(s=>s-1)} style={{ flex:0.6 }}>
            ← Back
          </motion.button>
        )}
        <motion.button
          whileTap={{ scale:0.97 }}
          className="btn-primary"
          onClick={() => isLast ? navigate('/login') : setStep(s=>s+1)}
        >
          {isLast ? '✦ Get Started' : 'Next →'}
        </motion.button>
      </div>
    </div>
  );
}

export function Login() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('email');
  const [email, setEmail] = useState('kwame@example.com');
  const [pass, setPass] = useState('password');
  const [showPass, setShowPass] = useState(false);

  return (
    <motion.div
      initial={{ opacity:0 }}
      animate={{ opacity:1 }}
      style={{ minHeight:'100dvh', background:'var(--navy)', display:'flex', flexDirection:'column', padding:'0 24px' }}
    >
      {/* Header */}
      <div style={{ paddingTop:72, paddingBottom:40, textAlign:'center' }}>
        <motion.div
          animate={{ boxShadow:['0 0 0 0 rgba(13,148,136,0.4)','0 0 0 20px rgba(13,148,136,0)','0 0 0 0 rgba(13,148,136,0)'] }}
          transition={{ duration:2.5, repeat:Infinity }}
          style={{ width:80, height:80, borderRadius:24, background:'linear-gradient(135deg,var(--teal),var(--teal-dark))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:36, margin:'0 auto 20px' }}
        >⚡</motion.div>
        <h1 style={{ fontWeight:800, fontSize:26, color:'#fff', marginBottom:6 }}>PowerFlex Pay</h1>
        <p style={{ fontSize:13, color:'var(--muted)' }}>Enterprise Fuel & EV Management</p>
      </div>

      {/* Steps indicator */}
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:6, marginBottom:32 }}>
        {['Login','2FA','Biometric','Security'].map((s,i) => (
          <div key={s} style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:28, height:28, borderRadius:'50%', background:i===0?'var(--teal)':'rgba(255,255,255,0.07)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:i===0?'#fff':'var(--muted)' }}>{i+1}</div>
            {i<3 && <div style={{ width:20, height:1, background:'rgba(255,255,255,0.08)' }}/>}
          </div>
        ))}
      </div>

      {/* Form */}
      <motion.div className="card" initial={{ y:20, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.1 }}>
        {/* Tab switcher */}
        <div style={{ display:'flex', background:'rgba(255,255,255,0.05)', borderRadius:12, padding:4, marginBottom:22, gap:4 }}>
          {['Email','Corporate','Biometric'].map(t => (
            <motion.button
              key={t}
              onClick={() => setTab(t.toLowerCase())}
              style={{ flex:1, padding:'8px 4px', borderRadius:9, border:'none', background:tab===t.toLowerCase()?'var(--teal)':'transparent', color:tab===t.toLowerCase()?'#fff':'var(--muted)', fontFamily:'Inter', fontWeight:600, fontSize:12, cursor:'pointer', transition:'all .2s' }}
              whileTap={{ scale:0.95 }}
            >{t}</motion.button>
          ))}
        </div>

        {tab==='biometric' ? (
          <div style={{ textAlign:'center', padding:'24px 0' }}>
            <motion.div
              whileTap={{ scale:0.9 }}
              animate={{ boxShadow:['0 0 0 0 rgba(13,148,136,0.4)','0 0 0 16px rgba(13,148,136,0)','0 0 0 0 rgba(13,148,136,0)'] }}
              transition={{ duration:2, repeat:Infinity }}
              onClick={() => navigate('/home')}
              style={{ width:80, height:80, borderRadius:'50%', background:'rgba(13,148,136,0.12)', border:'2px solid rgba(13,148,136,0.3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px', cursor:'pointer', fontSize:32 }}
            >🔏</motion.div>
            <p style={{ color:'var(--muted)', fontSize:14 }}>Tap to use Touch ID / Face ID</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom:14 }}>
              <span className="label">Email Address</span>
              <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div style={{ marginBottom:22, position:'relative' }}>
              <span className="label">Password</span>
              <input className="input" type={showPass?'text':'password'} value={pass} onChange={e=>setPass(e.target.value)} style={{ paddingRight:48 }} />
              <button onClick={()=>setShowPass(!showPass)} style={{ position:'absolute', right:14, top:36, background:'none', border:'none', cursor:'pointer', color:'var(--muted)', fontSize:16 }}>
                {showPass?'🙈':'👁️'}
              </button>
            </div>
            <motion.button whileTap={{ scale:0.98 }} className="btn-primary" onClick={()=>navigate('/home')}>
              Continue →
            </motion.button>
          </>
        )}
      </motion.div>

      {/* Security badges */}
      <div style={{ display:'flex', gap:8, marginTop:24, justifyContent:'center', flexWrap:'wrap', paddingBottom:40 }}>
        {['🛡️ Enterprise Security','🔒 Multi-Factor Auth','👆 Biometric'].map(b => (
          <span key={b} style={{ fontSize:11, color:'var(--muted)', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:99, padding:'5px 12px' }}>{b}</span>
        ))}
      </div>
    </motion.div>
  );
}
