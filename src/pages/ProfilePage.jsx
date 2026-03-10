import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiEdit } from 'react-icons/fi';

/* =============================================
   PROFILE / PERSONAL DETAILS PAGE
   ============================================= */

const ProfilePage = ({ isLoggedIn, user }) => {
    const navigate = useNavigate();

    if (!isLoggedIn) {
        return (
            <div className="page-wrapper pt-32 flex items-center justify-center px-4">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    className="glass-card border border-cyan-500/20 p-10 text-center max-w-md w-full">
                    <div className="text-5xl mb-4">👤</div>
                    <h2 className="font-orbitron font-bold text-white text-xl mb-3">Not Logged In</h2>
                    <p className="text-gray-400 mb-5">Please login to view your profile.</p>
                    <button onClick={() => navigate('/login')} className="btn-primary w-full py-3">Go to Login</button>
                </motion.div>
            </div>
        );
    }

    const details = [
        { label: 'Player Name', value: user?.name || '—' },
        { label: 'Email', value: user?.email || '—' },
        { label: 'Account Type', value: user?.isPaid ? '⭐ Paid Member' : 'Free Member' },
        { label: 'Member Since', value: 'March 2026' },
        { label: 'Total Matches', value: '48' },
        { label: 'Win Rate', value: '63%' },
    ];

    return (
        <div className="page-wrapper pt-24 pb-20 px-4 sm:px-6 max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                {/* Profile Card */}
                <div className="glass-card border border-cyan-500/20 p-8 rounded-2xl mb-6"
                    style={{ boxShadow: '0 0 40px rgba(0,245,255,0.06)' }}>
                    <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                        {/* Avatar */}
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-4xl font-black text-black font-orbitron glow-cyan flex-shrink-0">
                            {user?.name?.[0]?.toUpperCase() || 'P'}
                        </div>
                        <div>
                            <h1 className="font-orbitron font-bold text-white text-2xl">{user?.name}</h1>
                            <p className="text-gray-400 text-sm">{user?.email}</p>
                            {user?.isPaid && (
                                <span className="inline-block mt-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full font-orbitron">
                                    ⭐ PAID MEMBER
                                </span>
                            )}
                        </div>
                        <button className="sm:ml-auto btn-outline text-xs px-4 py-2 flex items-center gap-2">
                            <FiEdit className="w-3.5 h-3.5" /> Edit Profile
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {details.map(d => (
                            <div key={d.label} className="bg-white/3 rounded-xl px-4 py-3 border border-white/5">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">{d.label}</p>
                                <p className="text-white font-medium text-sm">{d.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { label: 'View Achievements', icon: '🏆', action: () => navigate('/achievements'), color: 'yellow' },
                        { label: 'Go to Battles', icon: '⚔️', action: () => navigate('/battles'), color: 'cyan' },
                    ].map(qk => (
                        <motion.button key={qk.label} onClick={qk.action}
                            whileHover={{ scale: 1.03, y: -3 }} whileTap={{ scale: 0.97 }}
                            className="glass-card border border-white/5 hover:border-cyan-500/30 p-5 text-left transition-all duration-300 flex items-center gap-4">
                            <span className="text-3xl">{qk.icon}</span>
                            <span className="font-orbitron font-semibold text-white text-sm">{qk.label}</span>
                            <span className="ml-auto text-gray-400">→</span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default ProfilePage;
