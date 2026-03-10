import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiMenu, FiX, FiUser, FiLogOut, FiAward, FiChevronDown
} from 'react-icons/fi';

/**
 * Navbar Component
 * Apple-inspired navigation with glassmorphism and smooth animations
 */
const Navbar = ({ isLoggedIn, setIsLoggedIn, user, setUser }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    // Add scroll listener for glass effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/battles', label: 'Battles' },
        { to: '/create-battles', label: 'Create Battles' },
        { to: '/live', label: 'Live' },
        { to: '/achievements', label: 'Achievements' },
    ];

    const handleLogin = () => {
        navigate('/login');
        setMenuOpen(false);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setDropdownOpen(false);
        navigate('/');
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-black/60 backdrop-blur-xl border-b border-cyan-500/10 shadow-2xl'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-sm font-black text-black font-orbitron glow-cyan group-hover:scale-105 transition-transform">
                            STG
                        </div>
                        <span className="font-orbitron font-bold text-lg gradient-text tracking-wider hidden sm:block">
                            ESPORTS
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive
                                        ? 'text-cyan-400 bg-cyan-400/10'
                                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* User Section */}
                    <div className="hidden md:flex items-center gap-3">
                        {isLoggedIn ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-xs font-bold text-black">
                                        {user?.name?.[0] || 'U'}
                                    </div>
                                    <span className="text-sm font-medium text-gray-200 group-hover:text-white">
                                        {user?.name || 'Player'}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: dropdownOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <FiChevronDown className="text-gray-400 w-4 h-4" />
                                    </motion.div>
                                </button>

                                {/* Dropdown */}
                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 top-full mt-2 w-56 glass-card border border-cyan-500/20 rounded-xl overflow-hidden shadow-2xl"
                                            style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.8), 0 0 30px rgba(0,245,255,0.1)' }}
                                        >
                                            {/* User info */}
                                            <div className="px-4 py-3 border-b border-white/5">
                                                <p className="text-xs text-gray-400">Signed in as</p>
                                                <p className="text-sm font-semibold text-white">{user?.email || 'player@stg.gg'}</p>
                                                {user?.isPaid && (
                                                    <span className="inline-block mt-1 text-xs bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold px-2 py-0.5 rounded-full">
                                                        ⭐ PAID MEMBER
                                                    </span>
                                                )}
                                            </div>
                                            {/* Menu items */}
                                            {[
                                                { icon: <FiUser className="w-4 h-4" />, label: 'Personal Details', action: () => { navigate('/profile'); setDropdownOpen(false); } },
                                                { icon: <FiAward className="w-4 h-4" />, label: 'Achievements', action: () => { navigate('/achievements'); setDropdownOpen(false); } },
                                            ].map((item) => (
                                                <button
                                                    key={item.label}
                                                    onClick={item.action}
                                                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                                                >
                                                    <span className="text-cyan-400">{item.icon}</span>
                                                    {item.label}
                                                </button>
                                            ))}
                                            <div className="border-t border-white/5">
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all duration-200"
                                                >
                                                    <FiLogOut className="w-4 h-4" />
                                                    Logout
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <button onClick={handleLogin} className="btn-primary text-sm">
                                Login
                            </button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                        {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/5"
                    >
                        <div className="px-4 py-4 space-y-1">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                                            ? 'text-cyan-400 bg-cyan-400/10'
                                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                            <div className="pt-2">
                                {isLoggedIn ? (
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/5 rounded-lg">
                                        Logout
                                    </button>
                                ) : (
                                    <button onClick={handleLogin} className="btn-primary w-full text-sm mt-2">
                                        Login
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
