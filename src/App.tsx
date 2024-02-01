import { RouterProvider } from 'react-router-dom';
import { appRouter } from './config/routes';
import { useState, useEffect } from 'react';
import supabase from './api';
import { Session } from '@supabase/supabase-js';
import SessionContext from './context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const storedSessionInfo = localStorage.getItem(
    `sb-${String(import.meta.env.VITE_SUPABASE_DOMAIN_NAME)}-auth-token`,
  );
  const [session, setSession] = useState<Session | null>(
    storedSessionInfo ? (JSON.parse(storedSessionInfo) as Session) : null,
  );

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ currentSession: session }}>
      <RouterProvider router={appRouter} />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </SessionContext.Provider>
  );
}

export default App;
