
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireRole?: 'customer' | 'collector' | 'admin';
  requireProfileComplete?: boolean;
}

export const ProtectedRoute = ({ 
  children, 
  requireAuth = false,
  requireRole,
  requireProfileComplete = false
}: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (requireAuth && !user) {
      navigate('/auth');
      return;
    }

    if (requireRole && profile?.role !== requireRole) {
      navigate('/');
      return;
    }

    if (requireProfileComplete && !profile?.is_profile_complete) {
      navigate('/profile-setup');
      return;
    }

    if (user && profile && !profile.is_profile_complete && 
        window.location.pathname !== '/profile-setup') {
      navigate('/profile-setup');
      return;
    }
  }, [user, profile, loading, navigate, requireAuth, requireRole, requireProfileComplete]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center">
        <div className="text-emerald-600">Memuat...</div>
      </div>
    );
  }

  return <>{children}</>;
};
