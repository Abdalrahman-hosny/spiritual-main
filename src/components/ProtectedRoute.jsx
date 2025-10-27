import { Navigate, useLocation } from 'react-router-dom';

const clientRoutes = [
  '/',
  '/about-us',
  '/shop',
  '/product-details',
  '/cart',
  '/checkout',
  '/categoryProducts',
  '/trainer',
  '/courseDetails',
  '/contact-us',
  '/profile',
  '/wishlist',
  '/terms-and-conditions',
  '/privacy-policy',
  '/faqs'
];

const authRoutes = [
  '/login',
  '/register',
  '/verify-otp',
  '/forget-password',
  '/verify-reset',
  '/reset-password'
];

const dashboardRoutes = [
  '/dashboard',
  '/dashboard/courses',
  '/dashboard/courses/add',
  '/dashboard/courses/edit',
  '/dashboard/students',
  '/dashboard/brands',
  '/dashboard/store',
  '/dashboard/orders',
  '/dashboard/coupons',
  '/dashboard/profile',
  '/dashboard/settings'
];

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Get user from sessionStorage
  const user = JSON.parse(sessionStorage.getItem('user'));
  
  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isClientType = user.type === 'client';
  // Match exact route or route + subpaths (e.g. /dashboard or /dashboard/...)
  const isDashboardRoute = dashboardRoutes.some(route => currentPath === route || currentPath.startsWith(route + '/'));
  // Special-case '/' so it doesn't match every path via startsWith
  const isClientRoute = clientRoutes.some(route =>
    route === '/' ? currentPath === '/' : (currentPath === route || currentPath.startsWith(route + '/'))
  );
  const isAuthRoute = authRoutes.some(route => currentPath === route || currentPath.startsWith(route + '/'));

  // Allow auth routes for everyone
  if (isAuthRoute) {
    return children;
  }

  // Client type users
  if (isClientType) {
    // Prevent clients from accessing dashboard
    if (isDashboardRoute) {
      return <Navigate to="/not-found" replace />;
    }
    // Allow clients to access client routes
    return children;
  }
  
  // Non-client type users (energy_coach, healer, quran_memorizer, life_coach)
  else {
    // Prevent non-clients from accessing client routes
    if (isClientRoute) {
      return <Navigate to="/not-found" replace />;
    }
    // Allow non-clients to access dashboard routes
    return children;
  }
}