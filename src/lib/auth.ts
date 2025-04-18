
import React, { useState, useEffect } from "react"; 

// Types pour l'authentification
export interface UserAuth {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  profilePicture?: string;
}

export interface AuthResponse {
  token: string;
  user: UserAuth;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

// Fonction pour s'inscrire
export const registerUser = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Erreur lors de l\'inscription');
  }
  
  const data = await response.json();
  
  // Stocker le token dans le localStorage
  localStorage.setItem('authToken', data.token);
  
  return data;
};

// Fonction pour se connecter
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Email ou mot de passe incorrect');
  }
  
  const data = await response.json();
  
  // Stocker le token dans le localStorage
  localStorage.setItem('authToken', data.token);
  
  return data;
};

// Fonction pour se déconnecter
export const logoutUser = (): void => {
  localStorage.removeItem('authToken');
  window.location.href = '/';
};

// Fonction pour vérifier si l'utilisateur est authentifié
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('authToken') !== null;
};

// Fonction pour obtenir le token d'authentification
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Fonction pour obtenir les informations de l'utilisateur actuel
export const getCurrentUser = async (): Promise<UserAuth | null> => {
  const token = getAuthToken();
  
  if (!token) {
    return null;
  }
  
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      localStorage.removeItem('authToken');
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des informations utilisateur:', error);
    return null;
  }
};

// Fonction pour vérifier si l'utilisateur est un administrateur
export const isAdmin = async (): Promise<boolean> => {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return false;
    }
    
    // Vérification stricte du rôle admin
    return user.role === 'admin';
  } catch (error) {
    console.error('Erreur lors de la vérification des droits admin:', error);
    return false;
  }
};

// Fonction pour vérifier si l'utilisateur a un rôle spécifique
export const hasRole = async (role: 'user' | 'admin'): Promise<boolean> => {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return false;
    }
    
    return user.role === role;
  } catch (error) {
    console.error('Erreur lors de la vérification des rôles:', error);
    return false;
  }
};

// Fonction de protection de routes pour les admins
export const requireAdmin = async (navigate: (path: string) => void): Promise<boolean> => {
  try {
    const adminStatus = await isAdmin();
    
    if (!adminStatus) {
      navigate('/');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Erreur lors de la vérification des permissions:', error);
    navigate('/');
    return false;
  }
};

// Fonction pour traiter le callback de l'authentification par OAuth
export const processAuthCallback = async (): Promise<void> => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  
  if (!token) {
    throw new Error('Aucun token trouvé dans l\'URL');
  }
  
  // Stocker le token et attendre un peu pour s'assurer que tout est mis à jour
  localStorage.setItem('authToken', token);
  
  // Attendre que le token soit bien enregistré
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Retourner sans redirection, car la redirection sera gérée par le composant
};
