import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiPlus, FiX, FiCalendar, FiUsers } from 'react-icons/fi';
import { myTournaments } from '../data/dummyData';

/* =============================================
   CREATE BATTLES PAGE (Paid Members Only)
   ============================================= */

// Create Tournament Modal
const CreateTournamentModal = ({ onClose, onCreated }) => {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        name: '', game: 'PUBG Mobile', date: '', time: '',
        prize: '', maxTeams: '16', entryFee: '', description: '',
    });
    const [errors, setErrors] = useState({});

    const games = ['PUBG Mobile', 'BGMI', 'Free Fire', 'COD Mobile'];

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Tournament name is required';
        if (!form.date) e.date = 'Date is required';
        if (!form.time) e.time = 'Time is required';
        if (!form.prize.trim()) e.prize = 'Prize pool is required';
        return e;
    };

    const handleNext = () => {
        if (step === 1) {
            const e = validate();
            if (Object.keys(e).length) { setErrors(e); return; }
        }
        setStep(2);
    };

    const handleCreate = () => {
        onCreated({ ...form, id: Date.now(), status: 'Upcoming', registered: 0, total: parseInt(form.maxTeams) });
        onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => e.target === e.currentTarget && onClose()}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-card border border-purple-500/25 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                    style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 40px rgba(191,0,255,0.1)' }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/5">
                        <div>
                            <h2 className="font-orbitron font-bold text-white text-lg">Create Tournament</h2>
                            <p className="text-xs text-gray-400 mt-0.5">Step {step} of 2</p>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                            <FiX className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Step indicator */}
                    <div className="px-6 pt-4 flex gap-2">
                        {[1, 2].map((s) => (
                            <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-white/10'}`} />
                        ))}
                    </div>

                    <div className="p-6 space-y-4">
                        {step === 1 ? (
                            <>
                                <div>
                                    <label className="form-label">Tournament Name <span className="text-red-400">*</span></label>
                                    <input className={`form-input ${errors.name ? 'border-red-500/70' : ''}`} placeholder="e.g. STG Champions League S5"
                                        value={form.name} onChange={(e) => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: '' })); }} />
                                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="form-label">Game</label>
                                    <select className="form-input" value={form.game} onChange={(e) => setForm(p => ({ ...p, game: e.target.value }))}>
                                        {games.map(g => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="form-label">Date <span className="text-red-400">*</span></label>
                                        <input type="date" className={`form-input ${errors.date ? 'border-red-500/70' : ''}`}
                                            value={form.date} onChange={(e) => { setForm(p => ({ ...p, date: e.target.value })); setErrors(p => ({ ...p, date: '' })); }} />
                                        {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
                                    </div>
                                    <div>
                                        <label className="form-label">Time <span className="text-red-400">*</span></label>
                                        <input type="time" className={`form-input ${errors.time ? 'border-red-500/70' : ''}`}
                                            value={form.time} onChange={(e) => { setForm(p => ({ ...p, time: e.target.value })); setErrors(p => ({ ...p, time: '' })); }} />
                                        {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
                                    </div>
                                </div>
                                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                    onClick={handleNext} className="btn-primary w-full py-3 text-sm mt-2">
                                    Next →
                                </motion.button>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="form-label">Prize Pool <span className="text-red-400">*</span></label>
                                    <input className={`form-input ${errors.prize ? 'border-red-500/70' : ''}`} placeholder="e.g. ₹10,000"
                                        value={form.prize} onChange={(e) => { setForm(p => ({ ...p, prize: e.target.value })); setErrors(p => ({ ...p, prize: '' })); }} />
                                    {errors.prize && <p className="text-red-400 text-xs mt-1">{errors.prize}</p>}
                                </div>
                                <div>
                                    <label className="form-label">Max Teams</label>
                                    <select className="form-input" value={form.maxTeams} onChange={(e) => setForm(p => ({ ...p, maxTeams: e.target.value }))}>
                                        {['8', '16', '32', '64'].map(n => <option key={n}>{n} Teams</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="form-label">Entry Fee (optional)</label>
                                    <input className="form-input" placeholder="e.g. ₹50 per team" value={form.entryFee}
                                        onChange={(e) => setForm(p => ({ ...p, entryFee: e.target.value }))} />
                                </div>
                                <div>
                                    <label className="form-label">Description (optional)</label>
                                    <textarea rows={3} className="form-input resize-none" placeholder="Tournament rules, notes..."
                                        value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} />
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => setStep(1)} className="btn-outline flex-1 py-3 text-sm">← Back</button>
                                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                        onClick={handleCreate} className="btn-primary flex-1 py-3 text-sm">
                                        🚀 Create
                                    </motion.button>
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// My Tournament Card
const MyTournamentCard = ({ t }) => {
    const pct = Math.round((t.registered / t.total) * 100);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="glass-card border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 p-5"
        >
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-orbitron font-semibold text-white text-sm">{t.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${t.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {t.status}
                </span>
            </div>
            <p className="text-xs text-gray-400 mb-1">{t.game}</p>
            <div className="flex gap-3 text-xs text-gray-400 mb-4">
                <span className="flex items-center gap-1"><FiCalendar className="w-3 h-3" />{t.date}</span>
                <span className="flex items-center gap-1"><FiUsers className="w-3 h-3" />{t.registered}/{t.total}</span>
            </div>
            {/* Progress bar */}
            <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Registration</span>
                    <span className="text-purple-400 font-semibold">{pct}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                    />
                </div>
            </div>
            <p className="text-purple-400 font-orbitron font-bold">{t.prize}</p>
        </motion.div>
    );
};

// ── Create Battles Page ────────────────────
const CreateBattlesPage = ({ isLoggedIn, user }) => {
    const [createModal, setCreateModal] = useState(false);
    const [tourneys, setTourneys] = useState(myTournaments);
    const isPaid = user?.isPaid || false;

    if (!isLoggedIn) {
        return (
            <div className="page-wrapper pt-32 flex items-center justify-center px-4">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    className="glass-card border border-yellow-500/20 p-10 text-center max-w-md w-full">
                    <div className="text-6xl mb-4">🔒</div>
                    <h2 className="font-orbitron font-bold text-white text-2xl mb-3">Login Required</h2>
                    <p className="text-gray-400 mb-6">Please login to access the Create Battles section.</p>
                    <a href="/login" className="btn-primary inline-block">Go to Login</a>
                </motion.div>
            </div>
        );
    }

    if (!isPaid) {
        return (
            <div className="page-wrapper pt-32 flex items-center justify-center px-4">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    className="glass-card border border-yellow-500/30 p-10 text-center max-w-md w-full"
                    style={{ boxShadow: '0 0 40px rgba(255,215,0,0.15)' }}>
                    <div className="text-6xl mb-4">⭐</div>
                    <div className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-4 font-orbitron">
                        PAID MEMBERS ONLY
                    </div>
                    <h2 className="font-orbitron font-bold text-white text-2xl mb-3">Upgrade Your Account</h2>
                    <p className="text-gray-400 mb-6">Only paid members can create tournaments and battles. Upgrade now to unlock this feature.</p>
                    <button className="btn-primary w-full py-3">Upgrade to Paid — ₹299/mo</button>
                    <p className="text-gray-500 text-xs mt-3">Includes: Create tournaments, priority support, custom branding</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="page-wrapper pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="section-tag">Paid Member</span>
                        <span className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold px-2 py-0.5 rounded-full">⭐ PRO</span>
                    </div>
                    <h1 className="font-orbitron text-4xl sm:text-5xl font-black text-white">
                        My <span className="gradient-text">Tournaments</span>
                    </h1>
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setCreateModal(true)}
                    className="btn-primary flex items-center gap-2 text-sm px-6 py-3">
                    <FiPlus className="w-4 h-4" /> CREATE TOURNAMENT
                </motion.button>
            </motion.div>

            {tourneys.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-5xl mb-4">🏆</div>
                    <p className="text-gray-400">No tournaments yet. Create your first one!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tourneys.map(t => <MyTournamentCard key={t.id} t={t} />)}
                </div>
            )}

            <AnimatePresence>
                {createModal && (
                    <CreateTournamentModal
                        onClose={() => setCreateModal(false)}
                        onCreated={(t) => { setTourneys(p => [t, ...p]); }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default CreateBattlesPage;
