import type { AuthUser } from '../domain';
import { createContext } from 'react-router';


export const authContext = createContext<AuthUser | null>(null);
