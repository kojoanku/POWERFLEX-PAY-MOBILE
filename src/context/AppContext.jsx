import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { authService, walletService } from '../services/api';

const Ctx = createContext(null);

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on mount
  useEffect(() => {
    const storedUser = authService.getStoredUser();
    if (storedUser && authService.isLoggedIn()) {
      setCurrentUser(storedUser);
      setIsAuthenticated(true);
      // Load wallet balance
      walletService.getWallet()
        .then(data => setWalletBalance(data.wallet?.available_balance || 0))
        .catch(err => console.error('[v0] Failed to load wallet:', err));
    }
    setLoading(false);
  }, []);

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const login = useCallback((user, token) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setWalletBalance(0);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const updateWallet = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const data = await walletService.getWallet();
      setWalletBalance(data.wallet?.available_balance || 0);
    } catch (err) {
      console.error('[v0] Failed to update wallet:', err);
    }
  }, [isAuthenticated]);

  return (
    <Ctx.Provider value={{ 
      currentUser, 
      setCurrentUser,
      walletBalance, 
      setWalletBalance,
      showToast, 
      loading,
      isAuthenticated,
      login,
      logout,
      updateWallet,
    }}>
      {children}
      {toast && (
        <div style={{
          position:'fixed', bottom:'90px', left:'50%', transform:'translateX(-50%)',
          background: toast.type==='success' ? '#0d9488' : toast.type==='error' ? '#ef4444' : '#1a3356',
          color:'#fff', padding:'12px 22px', borderRadius:'12px',
          fontFamily:'Inter', fontSize:'14px', fontWeight:600,
          zIndex:9999, whiteSpace:'nowrap',
          boxShadow:'0 8px 32px rgba(0,0,0,0.5)',
          animation:'fadeUp .3s ease',
          maxWidth:'90vw', textAlign:'center',
        }}>
          {toast.msg}
        </div>
      )}
    </Ctx.Provider>
  );
}

export const useApp = () => useContext(Ctx);
