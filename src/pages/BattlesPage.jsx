import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCopy, FiCheckCircle } from 'react-icons/fi';
import { tournaments, roomMatches } from '../data/dummyData';

/* =============================================
   BATTLES PAGE
   Tournaments + Room Matches + Registration
   ============================================= */

// Accent color map
const accentMap = {
    cyan: {
        border: 'border-cyan-500/30',
        hoverBorder: 'hover:border-cyan-500/70',
        text: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        glow: 'rgba(0,245,255,0.25)',
        badge: 'bg-cyan-500/20 text-cyan-300',
    },
    purple: {
        border: 'border-purple-500/30',
        hoverBorder: 'hover:border-purple-500/70',
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        glow: 'rgba(191,0,255,0.25)',
        badge: 'bg-purple-500/20 text-purple-300',
    },
    gold: {
        border: 'border-yellow-500/30',
        hoverBorder: 'hover:border-yellow-500/70',
        text: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        glow: 'rgba(255,215,0,0.25)',
        badge: 'bg-yellow-500/20 text-yellow-300',
    },
};

// ── Battle Card ──────────────────────────────
const BattleCard = ({ battle, onRegister }) => {
    const a = accentMap[battle.accent] || accentMap.cyan;
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6, boxShadow: `0 20px 60px ${a.glow}` }}
            className={`glass-card border ${a.border} ${a.hoverBorder} transition-all duration-400 p-6 flex flex-col gap-4`}
        >
            {/* Icon + Title */}
            <div className="flex items-start gap-4">
                <div className={`text-4xl p-3 rounded-xl ${a.bg}`}>{battle.image}</div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-orbitron font-bold text-white text-base leading-tight mb-1">
                        {battle.name}
                    </h3>
                    <p className="text-xs text-gray-400">{battle.game}</p>
                </div>
            </div>

            {/* Tags row */}
            <div className="flex flex-wrap gap-2 text-xs">
                <span className={`px-2 py-1 rounded-md ${a.badge} font-medium`}>{battle.status}</span>
                <span className="px-2 py-1 rounded-md bg-white/5 text-gray-300">{battle.teams}</span>
                <span className="px-2 py-1 rounded-md bg-white/5 text-gray-300">{battle.date}</span>
            </div>

            {/* Prize + Register */}
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                <div>
                    <p className="text-xs text-gray-500 mb-0.5">Prize Pool</p>
                    <p className={`font-orbitron font-bold text-lg ${a.text}`}>{battle.prize}</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onRegister(battle)}
                    className="btn-primary text-xs px-5 py-2.5"
                >
                    Register
                </motion.button>
            </div>
        </motion.div>
    );
};

// ── Registration Modal ───────────────────────
const RegistrationModal = ({ battle, onClose }) => {
    const [form, setForm] = useState({
        teamName: '', player1: '', player2: '', player3: '',
        player4: '', player5: '', mobile: '',
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [roomData] = useState({
        roomId: `STG${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        password: `PASS${Math.floor(1000 + Math.random() * 9000)}`,
    });
    const [copied, setCopied] = useState('');

    const validate = () => {
        const e = {};
        const req = { teamName: 'Team Name', player1: 'Player 1', player2: 'Player 2', player3: 'Player 3', player4: 'Player 4', mobile: 'Mobile Number' };
        Object.entries(req).forEach(([k, l]) => {
            if (!form[k].trim()) e[k] = `${l} is required`;
        });
        if (form.mobile && !/^\d{10}$/.test(form.mobile.replace(/\s/g, ''))) {
            e.mobile = 'Enter a valid 10-digit mobile number';
        }
        return e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const e2 = validate();
        if (Object.keys(e2).length) { setErrors(e2); return; }
        setSubmitted(true);
    };

    const handleCopy = (text, key) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(''), 2000);
    };

    const fields = [
        { key: 'teamName', label: 'Team Name', placeholder: 'Enter your team name', required: true },
        { key: 'player1', label: 'Player 1 (IGN)', placeholder: 'In-game name', required: true },
        { key: 'player2', label: 'Player 2 (IGN)', placeholder: 'In-game name', required: true },
        { key: 'player3', label: 'Player 3 (IGN)', placeholder: 'In-game name', required: true },
        { key: 'player4', label: 'Player 4 (IGN)', placeholder: 'In-game name', required: true },
        { key: 'player5', label: 'Player 5 (IGN)', placeholder: 'Optional substitute', required: false },
        { key: 'mobile', label: 'Mobile Number', placeholder: '10-digit mobile number', required: true },
    ];

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
                    className="glass-card border border-cyan-500/20 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                    style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 40px rgba(0,245,255,0.1)' }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/5">
                        <div>
                            <h2 className="font-orbitron font-bold text-white text-lg">Team Registration</h2>
                            <p className="text-xs text-gray-400 mt-0.5">{battle.name}</p>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                            <FiX className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6">
                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {fields.map((f) => (
                                    <div key={f.key}>
                                        <label className="form-label">
                                            {f.label}
                                            {f.required && <span className="text-red-400 ml-1">*</span>}
                                            {!f.required && <span className="text-gray-500 ml-1 font-normal normal-case tracking-normal">(optional)</span>}
                                        </label>
                                        <input
                                            type={f.key === 'mobile' ? 'tel' : 'text'}
                                            className={`form-input ${errors[f.key] ? 'border-red-500/70' : ''}`}
                                            placeholder={f.placeholder}
                                            value={form[f.key]}
                                            onChange={(e) => {
                                                setForm((p) => ({ ...p, [f.key]: e.target.value }));
                                                if (errors[f.key]) setErrors((p) => ({ ...p, [f.key]: '' }));
                                            }}
                                        />
                                        {errors[f.key] && (
                                            <p className="text-red-400 text-xs mt-1">{errors[f.key]}</p>
                                        )}
                                    </div>
                                ))}
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="btn-primary w-full mt-6 py-3 text-sm"
                                >
                                    CONFIRM REGISTRATION
                                </motion.button>
                            </form>
                        ) : (
                            /* ── Success view ── */
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                                    className="text-6xl mb-4"
                                >
                                    🎉
                                </motion.div>
                                <h3 className="font-orbitron font-bold text-white text-xl mb-1">Registration Successful!</h3>
                                <p className="text-gray-400 text-sm mb-6">Your team <span className="text-cyan-400 font-semibold">{form.teamName}</span> is registered.</p>

                                {/* Room card */}
                                <div className="glass-card border border-cyan-500/30 p-6 rounded-xl glow-cyan mb-6">
                                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Match Credentials</p>
                                    {[
                                        { label: 'ROOM ID', value: roomData.roomId, key: 'roomId' },
                                        { label: 'PASSWORD', value: roomData.password, key: 'password' },
                                    ].map((item) => (
                                        <div key={item.key} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                            <div className="text-left">
                                                <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                                                <p className="font-orbitron font-bold text-white text-lg tracking-wider">{item.value}</p>
                                            </div>
                                            <button
                                                onClick={() => handleCopy(item.value, item.key)}
                                                className="p-2 rounded-lg hover:bg-white/10 transition-all"
                                            >
                                                {copied === item.key
                                                    ? <FiCheckCircle className="w-5 h-5 text-green-400" />
                                                    : <FiCopy className="w-5 h-5 text-gray-400 hover:text-white" />}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mb-4">Room credentials will be shared 30 min before the match via mobile.</p>
                                <button onClick={onClose} className="btn-outline text-sm w-full py-3">
                                    Done
                                </button>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// ── Battles Page ─────────────────────────────
const BattlesPage = () => {
    const [selectedBattle, setSelectedBattle] = useState(null);

    return (
        <div className="page-wrapper pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
            {/* Page header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center mb-14"
            >
                <span className="section-tag">All Battles</span>
                <h1 className="font-orbitron text-4xl sm:text-5xl font-black text-white mt-3">
                    Choose Your <span className="gradient-text">Battle</span>
                </h1>
                <p className="text-gray-400 mt-3 max-w-xl mx-auto">
                    Register your squad, receive credentials, and compete for real cash prizes.
                </p>
            </motion.div>

            {/* ── TOURNAMENTS ── */}
            <section className="mb-14">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-6"
                >
                    <span className="text-2xl">🏆</span>
                    <h2 className="font-orbitron font-bold text-xl text-white">Tournaments</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 to-transparent" />
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tournaments.map((t) => (
                        <BattleCard key={t.id} battle={t} onRegister={setSelectedBattle} />
                    ))}
                </div>
            </section>

            {/* ── ROOM MATCHES ── */}
            <section>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-6"
                >
                    <span className="text-2xl">🎮</span>
                    <h2 className="font-orbitron font-bold text-xl text-white">Room Matches</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-purple-500/40 to-transparent" />
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {roomMatches.map((r) => (
                        <BattleCard key={r.id} battle={r} onRegister={setSelectedBattle} />
                    ))}
                </div>
            </section>

            {/* Registration Modal */}
            <AnimatePresence>
                {selectedBattle && (
                    <RegistrationModal
                        battle={selectedBattle}
                        onClose={() => setSelectedBattle(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default BattlesPage;
