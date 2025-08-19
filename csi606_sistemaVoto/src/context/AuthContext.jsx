// src/context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../components/firebase"; // Ajuste o caminho se necessário

// Cria o contexto
const AuthContext = createContext();

// Cria um "hook" personalizado para facilitar o uso do contexto
export function useAuth() {
  return useContext(AuthContext);
}

// Cria o componente "Provedor" que vai envolver a aplicação
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Para esperar o Firebase verificar o status

  useEffect(() => {
    // onAuthStateChanged é um "ouvinte" que avisa o React sempre que o login/logout acontece
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Limpa o ouvinte quando o componente é desmontado
  }, []);

  const value = {
    currentUser,
  };

  // Só renderiza a aplicação depois de verificar o status do usuário
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
