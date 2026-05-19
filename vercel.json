import { createContext, useContext, useState, useCallback } from 'react';
import { user as U } from '../data/appData';

const Ctx = createContext(null);

export function AppProvider({ children }) {
  const [currentUser] = useState(U);
  const [walletBalance, setWalletBalance] = useState(U.walletBalance);
  const [toast, setToast] = useState(null);
  const [unread] = useState(3);

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  return (
    <Ctx.Provider value={{ currentUser, walletBalance, setWalletBalance, showToast, unread }}>
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
