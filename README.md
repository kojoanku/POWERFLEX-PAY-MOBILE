# ⚡ PowerFlex Pay

**Enterprise Fuel & EV Management Platform for Ghana**

> All-in-one wallet, loyalty, credit, trip tracking and EV charging app — built with React + Vite + Tailwind CSS.

---

## 🚀 Deploy to Vercel in 3 steps

### Option A — Vercel CLI (fastest)
```bash
npm install -g vercel
vercel
```
Follow the prompts. Done. Your app is live.

### Option B — GitHub → Vercel (recommended for teams)
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Vercel auto-detects Vite — click **Deploy**
5. Done ✅

### Option C — Manual drag & drop
1. Run `npm run build`
2. Go to [vercel.com](https://vercel.com)
3. Drag the `/dist` folder onto the Vercel dashboard

---

## 🛠 Local development

```bash
# Install
npm install

# Start dev server (hot reload)
npm run dev
# → http://localhost:3000

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📱 App features (35 screens)

| Screen | Route |
|--------|-------|
| Onboarding (5 slides) | `/` |
| Login (Email / Corporate / Biometric) | `/login` |
| Home Dashboard | `/home` |
| Buy Fuel (17 stations + QR payment) | `/buy-fuel` |
| Loyalty Rewards | `/rewards` |
| PowerFlex Credit (5 tiers BNPL) | `/credit` |
| More Menu | `/more` |
| Analytics & Budget | `/analytics` |
| Trip History | `/trips` |
| Transactions | `/history` |
| Favorites | `/favorites` |
| Wallet | `/wallet` |
| Pay Bill (ECG, Water, etc.) | `/pay-bill` |
| EV Charging (7 networks) | `/ev-charging` |
| Edit Profile | `/profile` |
| Ghana Card KYC (6-step) | `/kyc` |
| Notifications | `/notifications` |
| Eco Track | `/eco-track` |
| Fuel Cards | `/fuel-cards` |
| Bank Transfer | `/bank-transfer` |
| Mobile Money | `/mobile-money` |
| Settings | `/settings` |
| Corporate | `/corporate` |
| Help & Support | `/support` |
| Documents | `/documents` |
| Challenges | `/challenges` |

---

## 🏗 Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 + custom CSS variables |
| Routing | React Router v6 |
| Charts | Recharts |
| Icons | Lucide React |
| Fonts | Syne (display) · DM Sans (body) · JetBrains Mono |
| Deployment | Vercel |

---

## 📁 Project structure

```
powerflex/
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx               # Router + all routes
│   ├── index.css             # Global styles + design tokens
│   ├── context/
│   │   └── AppContext.jsx    # Global state (wallet, user, toasts)
│   ├── components/
│   │   ├── BottomNav.jsx     # Bottom navigation bar
│   │   └── UI.jsx            # Shared UI components
│   ├── data/
│   │   └── appData.js        # All mock data
│   └── pages/
│       ├── Onboarding.jsx
│       ├── Login.jsx
│       ├── Home.jsx
│       ├── BuyFuel.jsx
│       ├── Rewards.jsx
│       ├── Credit.jsx
│       ├── More.jsx
│       ├── Analytics.jsx
│       └── AllPages.jsx      # All remaining 18 pages
├── index.html
├── vite.config.js
├── tailwind.config.js
├── vercel.json               # SPA routing + cache headers
└── package.json
```

---

## 🎨 Design tokens

```css
--bg-primary:    #0a0a0f   /* Main background */
--bg-card:       #16161f   /* Card surfaces */
--accent:        #6366f1   /* Indigo — primary CTA */
--neon:          #00ff88   /* Green — success / confirm */
--gold:          #f59e0b   /* Amber — rewards / warnings */
--text-primary:  #f0f0f8
--text-muted:    #5a5a70
```

---

## 🔌 Connecting a real backend

Replace the mock data in `src/data/appData.js` with API calls:

```js
// Example: replace static transactions with real API
const { data } = await fetch('/api/transactions').then(r => r.json());
```

Recommended backend: **Supabase** (auth + database) or **Firebase**.

---

## 📄 License

MIT — build your dream.
