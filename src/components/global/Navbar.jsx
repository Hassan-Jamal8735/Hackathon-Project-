import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/button';
import {
  HomeIcon,
  ChartBarIcon,
  ArrowUpTrayIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  CogIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { currentUser, userData, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
  };

  // Navigation items for authenticated users
  const navigation = currentUser ? [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Upload', href: '/upload', icon: ArrowUpTrayIcon },
    { name: 'Analysis', href: '/analysis', icon: ShieldCheckIcon },
    { name: 'Legal Guidance', href: '/legal', icon: DocumentTextIcon },
    ...(userData?.role === 'admin' ? [{ name: 'Admin', href: '/admin', icon: CogIcon }] : [])
  ] : [];

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm shadow-lg border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-400 flex items-center hover:text-blue-300 transition-colors duration-200">
                <ShieldCheckIcon className="h-6 w-6 mr-2 text-blue-400" />
                TruthShield
              </Link>
            </div>
            
            {/* Desktop Navigation Links - Only show when logged in */}
            {currentUser && (
              <div className="hidden md:ml-6 md:flex md:space-x-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `inline-flex items-center px-3 py-2 text-sm font-medium rounded-md mx-1 transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-900/50 text-blue-300 border-b-2 border-blue-400 shadow-lg'
                          : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                      }`
                    }
                  >
                    <item.icon className="mr-2 h-5 w-5" aria-hidden="true" />
                    {item.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                {/* User info and dropdown */}
                <div className="hidden md:flex items-center space-x-4">
                  <div className="flex flex-col text-right">
                    <span className="text-sm font-medium text-slate-200">
                      {currentUser.displayName || currentUser.email}
                    </span>
                    <span className="text-xs text-slate-400 capitalize">
                      {userData?.role || 'User'}
                    </span>
                  </div>

                  <div className="relative">
                    <div className="h-8 w-8 rounded-full bg-blue-900/50 border border-blue-700/50 flex items-center justify-center text-blue-300 font-semibold">
                      {(currentUser.displayName || currentUser.email).charAt(0).toUpperCase()}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    Logout
                  </Button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
                  >
                    <span className="sr-only">Open main menu</span>
                    {mobileMenuOpen ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {mobileMenuOpen && currentUser && (
          <div className="md:hidden border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-base font-medium rounded-md transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-900/50 text-blue-300 border-l-4 border-blue-400'
                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="mr-3 h-6 w-6" aria-hidden="true" />
                  {item.name}
                </NavLink>
              ))}

              {/* User info in mobile menu */}
              <div className="px-3 py-2 border-t border-slate-700/50">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-900/50 border border-blue-700/50 flex items-center justify-center text-blue-300 font-semibold">
                    {(currentUser.displayName || currentUser.email).charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-slate-200">
                      {currentUser.displayName || currentUser.email}
                    </p>
                    <p className="text-xs text-slate-400 capitalize">
                      {userData?.role || 'User'}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full mt-3 p-2 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;