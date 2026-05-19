import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import { Onboarding, Login } from './pages/AuthPages';
import Home from './pages/Home';
import { BuyFuel, Rewards, Credit } from './pages/CorePages';
import {
  More, Analytics, Trips, History, Wallet, PayBill,
  EVCharging, Profile, KYC, Notifications, EcoTrack,
  FuelCards, BankTransfer, MobileMoney, Settings,
  Corporate, Support, Documents, Challenges, Favorites,
} from './pages/AllPages';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"               element={<Onboarding />} />
        <Route path="/login"          element={<Login />} />
        <Route path="/home"           element={<Home />} />
        <Route path="/buy-fuel"       element={<BuyFuel />} />
        <Route path="/rewards"        element={<Rewards />} />
        <Route path="/credit"         element={<Credit />} />
        <Route path="/more"           element={<More />} />
        <Route path="/analytics"      element={<Analytics />} />
        <Route path="/trips"          element={<Trips />} />
        <Route path="/history"        element={<History />} />
        <Route path="/wallet"         element={<Wallet />} />
        <Route path="/pay-bill"       element={<PayBill />} />
        <Route path="/ev-charging"    element={<EVCharging />} />
        <Route path="/profile"        element={<Profile />} />
        <Route path="/kyc"            element={<KYC />} />
        <Route path="/notifications"  element={<Notifications />} />
        <Route path="/eco-track"      element={<EcoTrack />} />
        <Route path="/fuel-cards"     element={<FuelCards />} />
        <Route path="/bank-transfer"  element={<BankTransfer />} />
        <Route path="/mobile-money"   element={<MobileMoney />} />
        <Route path="/settings"       element={<Settings />} />
        <Route path="/corporate"      element={<Corporate />} />
        <Route path="/support"        element={<Support />} />
        <Route path="/documents"      element={<Documents />} />
        <Route path="/challenges"     element={<Challenges />} />
        <Route path="/favorites"      element={<Favorites />} />
        <Route path="*"               element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AnimatedRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
