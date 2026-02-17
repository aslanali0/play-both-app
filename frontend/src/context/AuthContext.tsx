import React, { createContext, useState, useEffect, useContext } from 'react';
import type { User, AuthContext, UserProfile } from '../types/user.ts';
import api from '../api/api.ts';

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/auth/me", {
        params: { token }
      });
      const userData = res.data
      setUser(userData);
      if(userData?.username){
         const response = await api.get("/profile/me", {
            params:{
              username : userData?.username
            },
          },)
          setProfile(response.data)
      }
    } catch (err) {
      console.error("Auth error:", err);
      localStorage.removeItem("token");
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, profile, loading, refreshUser, handleLogout }}>
      {!loading ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth, must be in AuthProvider");
  return context;
};
