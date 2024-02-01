import { Session } from '@supabase/supabase-js';
import { createContext } from 'react';

const SessionContext = createContext<{ currentSession: Session | null }>({ currentSession: null });

export default SessionContext;
