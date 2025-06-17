import { createContext } from "react";
import type { AuthContextType } from "@/types/contextTypes";
/* 
//will be deprecated in favor of AuthContext
export const TokenContext = createContext<contextToken | null>(null); */

export const AuthContext = createContext<AuthContextType| undefined>(undefined);