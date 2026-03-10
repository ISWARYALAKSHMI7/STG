import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiShield } from 'react-icons/fi';

/* =============================================
   LOGIN PAGE
   Apple-inspired auth form with glassmorphism
   - Sign Up: collects name, email, password, confirm password
   - Stores users in localStorage
   - Login: validates against stored users
   ============================================= */

const LoginPage = ({ setIsLoggedIn, setUser }) => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('login'); // 'login' | 'signup'
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', isPaid: false });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    // Helper: get all registered users from localStorage
    const getStoredUsers = () => {
        try {
            return JSON.parse(localStorage.getItem('stg_users') || '[]');
        } catch {
            return [];
        }
    };

    // Helper: save user to localStorage
    const saveUser = (user) => {
        const users = getStoredUsers();
        users.push(user);
        localStorage.setItem('stg_users', JSON.stringify(users));
    };

    // Helper: find user by email
    const findUser = (email) => {
        return getStoredUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
    };

    const validate = () => {
        const e = {};
        if (mode === 'signup' && !form.name.trim()) e.name = 'Name is required';
        if (!form.email.trim()) e.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
        if (!form.password) e.password = 'Password is required';
        else if (form.password.length < 6) e.password = 'Min 6 characters';

        if (mode === 'signup') {
            if (!form.confirmPassword) e.confirmPassword = 'Please confirm your password';
            else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';

            // Check if email is already registered
            if (!e.email && findUser(form.email)) {
                e.email = 'This email is already registered. Please login.';
            }
        }

        if (mode === 'login') {
            if (!e.email && !e.password) {
                const existingUser = findUser(form.email);
                if (!existingUser) {
                    e.email = 'No account found with this email. Please sign up first.';
                } else if (existingUser.password !== form.password) {
                    e.password = 'Incorrect password. Try again.';
                }
            }
        }

        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setLoading(true);

        // Simulate async auth
        await new Promise(r => setTimeout(r, 900));

        if (mode === 'signup') {
            // Register the user in localStorage
            saveUser({
                name: form.name,
                email: form.email,
                password: form.password,
                isPaid: form.isPaid,
            });
            setLoading(false);
            setSuccessMsg('Account created successfully! You can now login.');
            // Switch to login mode after successful signup
            setMode('login');
            setForm(p => ({ ...p, password: '', confirmPassword: '', name: '' }));
            return;
        }

        // Login mode — user already validated in validate()
        const existingUser = findUser(form.email);
        setIsLoggedIn(true);
        setUser({
            name: existingUser.name,
            email: existingUser.email,
            isPaid: existingUser.isPaid,
        });
        setLoading(false);
        navigate('/');
    };

    const update = (key, val) => {
        setForm(p => ({ ...p, [key]: val }));
        if (errors[key]) setErrors(p => ({ ...p, [key]: '' }));
        if (successMsg) setSuccessMsg('');
    };

    return (
        <div className="page-wrapper min-h-screen flex items-center justify-center px-4 py-16 cyber-grid-bg">
            {/* Glow orbs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full opacity-20 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #00F5FF, transparent)' }} />
                <div className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full opacity-15 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #BF00FF, transparent)' }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-md"
            >
                {/* Card */}
                <div className="glass-card border border-cyan-500/15 p-8 rounded-2xl"
                    style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 40px rgba(0,245,255,0.07)' }}>

                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-xl font-black text-black font-orbitron mx-auto mb-3 glow-cyan">
                            STG
                        </div>
                        <h1 className="font-orbitron font-bold text-2xl text-white">
                            {mode === 'login' ? 'Welcome Back' : 'Join STG Esports'}
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">
                            {mode === 'login' ? 'Enter the arena' : 'Create your player account'}
                        </p>
                    </div>

                    {/* Success message */}
                    <AnimatePresence>
                        {successMsg && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-4 p-3 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 text-sm text-center"
                            >
                                ✅ {successMsg}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Toggle */}
                    <div className="flex rounded-xl overflow-hidden border border-white/10 mb-7">
                        {['login', 'signup'].map(m => (
                            <button key={m} onClick={() => { setMode(m); setErrors({}); setSuccessMsg(''); }}
                                className={`flex-1 py-2.5 text-sm font-semibold font-orbitron transition-all duration-300 ${mode === m ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-black' : 'text-gray-400 hover:text-white'
                                    }`}>
                                {m === 'login' ? 'Login' : 'Sign Up'}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name (signup only) */}
                        {mode === 'signup' && (
                            <div>
                                <label className="form-label">Player Name <span className="text-red-400">*</span></label>
                                <div className="relative">
                                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input className={`form-input pl-9 ${errors.name ? 'border-red-500/70' : ''}`}
                                        placeholder="Your in-game name" value={form.name}
                                        onChange={e => update('name', e.target.value)} />
                                </div>
                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="form-label">Email <span className="text-red-400">*</span></label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input type="email" className={`form-input pl-9 ${errors.email ? 'border-red-500/70' : ''}`}
                                    placeholder="you@email.com" value={form.email}
                                    onChange={e => update('email', e.target.value)} />
                            </div>
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="form-label">Password <span className="text-red-400">*</span></label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input type={showPass ? 'text' : 'password'}
                                    className={`form-input pl-9 pr-10 ${errors.password ? 'border-red-500/70' : ''}`}
                                    placeholder="Min 6 characters" value={form.password}
                                    onChange={e => update('password', e.target.value)} />
                                <button type="button" onClick={() => setShowPass(p => !p)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                                    {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                        </div>

                        {/* Confirm Password (signup only) */}
                        {mode === 'signup' && (
                            <div>
                                <label className="form-label">Confirm Password <span className="text-red-400">*</span></label>
                                <div className="relative">
                                    <FiShield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input type={showConfirmPass ? 'text' : 'password'}
                                        className={`form-input pl-9 pr-10 ${errors.confirmPassword ? 'border-red-500/70' : ''}`}
                                        placeholder="Re-enter your password" value={form.confirmPassword}
                                        onChange={e => update('confirmPassword', e.target.value)} />
                                    <button type="button" onClick={() => setShowConfirmPass(p => !p)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                                        {showConfirmPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                            </div>
                        )}

                        {/* Paid member toggle (signup) */}
                        {mode === 'signup' && (
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div
                                    onClick={() => update('isPaid', !form.isPaid)}
                                    className={`w-10 h-6 rounded-full relative transition-all duration-300 ${form.isPaid ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-white/10'}`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${form.isPaid ? 'left-5' : 'left-1'}`} />
                                </div>
                                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                    Register as Paid Member <span className="text-yellow-400">⭐</span>
                                </span>
                            </label>
                        )}

                        {/* Submit */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={!loading ? { scale: 1.03 } : {}}
                            whileTap={!loading ? { scale: 0.97 } : {}}
                            className="btn-primary w-full py-3.5 mt-2 text-sm flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                                        className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full" />
                                    {mode === 'signup' ? 'Creating Account...' : 'Authenticating...'}
                                </>
                            ) : (
                                mode === 'login' ? 'LOGIN TO ARENA' : 'CREATE ACCOUNT'
                            )}
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-white/5" />
                        <span className="text-xs text-gray-600">or continue as</span>
                        <div className="flex-1 h-px bg-white/5" />
                    </div>

                    {/* Guest */}
                    <button
                        onClick={() => { setIsLoggedIn(true); setUser({ name: 'Guest', email: 'guest@stg.gg', isPaid: false }); navigate('/'); }}
                        className="btn-outline w-full py-3 text-sm">
                        Continue as Guest
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
