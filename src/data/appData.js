export const user = {
  name: 'Kwame Asante', email: 'kwame@example.com',
  phone: '+233 24 XXX XXXX', initials: 'KA',
  walletBalance: 1250, points: 3250,
  creditAvailable: 1500, creditLimit: 2000,
  creditDue: 520, creditDueDate: '5/18/2026',
  fuelCards: 4, verified: true,
};

export const stations = [
  { id:1, name:'Shell Osu Oxford St.',    brand:'Shell',        price:14.5,  dist:0.8, rating:4.5, open:true,  myCard:true,  nearest:true,  icon:'S', addr:'Oxford Street, Osu' },
  { id:2, name:'TotalEnergies Airport',   brand:'TotalEnergies',price:14.45, dist:1.2, rating:4.7, open:true,  myCard:true,  nearest:false, icon:'T', addr:'Liberation Road, Airport' },
  { id:3, name:'Engen Cantonments',       brand:'Engen',        price:14.4,  dist:2.1, rating:4.3, open:true,  myCard:false, nearest:false, icon:'E', addr:'Liberation Link, Cantonments' },
  { id:4, name:'GOIL Airport',            brand:'GOIL',         price:14.2,  dist:3.5, rating:4.4, open:true,  myCard:true,  nearest:false, icon:'G', addr:'Airport Road' },
  { id:5, name:'Shell Accra Mall',        brand:'Shell',        price:14.5,  dist:1.2, rating:4.6, open:true,  myCard:true,  nearest:false, icon:'S', addr:'Accra Mall, Tetteh Quarshie' },
  { id:6, name:'GOIL East Legon',         brand:'GOIL',         price:14.3,  dist:2.5, rating:4.3, open:true,  myCard:true,  nearest:false, icon:'G', addr:'Boundary Road, East Legon' },
];

export const evNetworks = [
  { id:1, name:'ECG Ghana',           sub:'Fast charging',       color:'#0d9488', icon:'⚡' },
  { id:2, name:'GridCo Ghana',        sub:'Ultra-fast',           color:'#3d5a3e', icon:'🔌' },
  { id:3, name:'ChargeUp Ghana',      sub:'Nationwide network',   color:'#0f766e', icon:'🔋' },
  { id:4, name:'GreenCharge Africa',  sub:'100% renewable',       color:'#4a6d4b', icon:'🌿' },
  { id:5, name:'VoltHub Ghana',       sub:'Smart charging',       color:'#0e7490', icon:'💡' },
  { id:6, name:'EV Connect Ghana',    sub:'Payment integrated',   color:'#166534', icon:'🚗' },
];

export const transactions = [
  { id:1, icon:'⛽', label:'Shell - Accra Mall',      date:'Jan 7, 2025', time:'14:30', amount:-150, status:'completed' },
  { id:2, icon:'⚡', label:'GridCo Accra Central',    date:'Jan 6, 2025', time:'09:15', amount:-45,  status:'completed' },
  { id:3, icon:'🏦', label:'Bank Transfer',           date:'Jan 5, 2025', time:'11:00', amount:+500, status:'completed' },
  { id:4, icon:'📱', label:'Mobile Money',            date:'Jan 4, 2025', time:'16:45', amount:-200, status:'completed' },
  { id:5, icon:'💡', label:'ECG Electricity',         date:'Jan 3, 2025', time:'08:20', amount:-85,  status:'pending'   },
  { id:6, icon:'⛽', label:'GOIL Airport',            date:'Jan 2, 2025', time:'17:00', amount:-120, status:'completed' },
];

export const trips = [
  { id:1, type:'business', client:'ABC Ltd',  from:'Accra Mall',  to:'Tema Industrial', date:'Jan 7',  dur:45, km:28.5, cost:35 },
  { id:2, type:'personal', client:'',        from:'East Legon',  to:'Airport City',    date:'Jan 6',  dur:25, km:12.3, cost:15 },
  { id:3, type:'commute',  client:'',        from:'Home',        to:'Office',          date:'Jan 6',  dur:40, km:18,   cost:22 },
  { id:4, type:'personal', client:'',        from:'Osu',         to:'Cantonments',     date:'Jan 5',  dur:15, km:5.2,  cost:8  },
];

export const creditTiers = [
  { n:1, name:'Starter',  limit:500,  dur:'24 hours', rate:'0.5–1%',  done:true,  current:false },
  { n:2, name:'Bronze',   limit:1000, dur:'36 hours', rate:'1–1.5%',  done:true,  current:false },
  { n:3, name:'Silver',   limit:2000, dur:'1 week',   rate:'2–3%',    done:true,  current:true  },
  { n:4, name:'Gold',     limit:3500, dur:'2 weeks',  rate:'3.5–4%',  done:false, current:false, need:2 },
  { n:5, name:'Platinum', limit:5000, dur:'1 month',  rate:'5–6%',    done:false, current:false, need:7 },
];

export const omcLoyalty = [
  { brand:'Shell Ghana',   tier:'Gold',     pts:2450, pct:6,  color:'#0d9488', today:18 },
  { brand:'GOIL',          tier:'Silver',   pts:1820, pct:62, color:'#3d5a3e', today:34 },
  { brand:'TotalEnergies', tier:'Platinum', pts:3200, pct:41, color:'#0e7490', today:35 },
  { brand:'Star Oil',      tier:'Standard', pts:980,  pct:11, color:'#4a6d4b', today:37 },
];

export const billCats = [
  { id:'electricity', label:'Electricity', icon:'⚡', color:'#0d9488' },
  { id:'water',       label:'Water',       icon:'💧', color:'#0e7490' },
  { id:'internet',    label:'Internet',    icon:'📶', color:'#3d5a3e' },
  { id:'tv',          label:'TV/Cable',    icon:'📺', color:'#4a6d4b' },
  { id:'airtime',     label:'Airtime',     icon:'📱', color:'#0f766e' },
  { id:'insurance',   label:'Insurance',   icon:'🛡️', color:'#166534' },
];

export const onboardSlides = [
  { icon:'⚡', title:'Welcome to PowerFlex Pay', sub:'Your all-in-one fuel & EV payment platform across Ghana', color:'#0d9488' },
  { icon:'⛽', title:'Pay for Fuel Anywhere',    sub:'500+ partner stations with instant QR payment',            color:'#3d5a3e' },
  { icon:'🔋', title:'Charge Your EV',           sub:'Find EV stations with real-time availability',             color:'#0e7490' },
  { icon:'⭐', title:'Earn & Redeem Rewards',    sub:'Loyalty points on every transaction across all OMCs',      color:'#0f766e' },
  { icon:'🛡️', title:'Bank-Grade Security',      sub:'Biometric auth and encryption protecting your money',      color:'#1a3356' },
];

export const spendData = [
  { day:'1',  v:180 }, { day:'5',  v:320 }, { day:'10', v:580 },
  { day:'15', v:900 }, { day:'20', v:1200 }, { day:'25', v:1500 },
];

export const spendCats = [
  { name:'Fuel',       amount:1200, color:'#0d9488', pct:48 },
  { name:'EV Charging',amount:450,  color:'#3d5a3e', pct:18 },
  { name:'Transfers',  amount:600,  color:'#0e7490', pct:24 },
  { name:'Other',      amount:250,  color:'#1a3356', pct:10 },
];
