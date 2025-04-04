
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: 'user' | 'admin';
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRole, 
  redirectTo = "/login" 
}) => {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin w-8 h-8 border-t-2 border-primary rounded-full"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  
  // Check role if specified
  if (allowedRole === "admin" && !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
