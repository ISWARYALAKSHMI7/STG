import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { achievements } from '../data/dummyData';

/* =============================================
   ACHIEVEMENTS PAGE
   ============================================= */

const rarityConfig = {
    Common: { color: 'cyan', gradient: 'from-cyan-500 to-cyan-700', glow: 'rgba(0,245,255,0.3)', border: 'border-cyan-500/25' },
    Rare: { color: 'purple', gradient: 'from-purple-500 to-purple-700', glow: 'rgba(191,0,255,0.3)', border: 'border-purple-500/25' },
    Epic: { color: 'blue', gradient: 'from-blue-500 to-indigo-600', glow: 'rgba(99,102,241,0.3)', border: 'border-blue-500/25' },
    Legendary: { color: 'gold', gradient: 'from-yellow-400 to-orange-500', glow: 'rgba(255,215,0,0.35)', border: 'border-yellow-500/30' },
};

const AchievementCard = ({ a, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const r = rarityConfig[a.rarity];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, boxShadow: `0 20px 50px ${r.glow}` }}
            className={`glass-card border ${r.border} transition-all duration-400 p-5 relative overflow-hidden ${!a.earned ? 'opacity-55' : ''}`}
        >
            {/* Top glow strip */}
            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${r.gradient}`} />

            {/* Lock overlay for unearned */}
            {!a.earned && (
                <div className="absolute top-3 right-3 text-gray-600 text-lg">🔒</div>
            )}

            {/* Icon */}
            <div className="flex items-start gap-4 mb-4">
                <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                    transition={{ duration: 0.4 }}
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${r.gradient} flex items-center justify-center text-2xl flex-shrink-0`}
                    style={{ boxShadow: `0 0 20px ${r.glow}` }}
                >
                    {a.icon}
                </motion.div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-orbitron font-bold text-white text-sm">{a.title}</h3>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{a.description}</p>
                </div>
            </div>

            {/* Rarity + XP */}
            <div className="flex items-center justify-between text-xs mb-3">
                <span className={`px-2 py-0.5 rounded-full font-semibold bg-gradient-to-r ${r.gradient} text-black text-[10px] uppercase tracking-wide`}>
                    {a.rarity}
                </span>
                <span className="text-gray-400">+{a.xp} XP</span>
            </div>

            {/* Progress bar (for unearned) */}
            {!a.earned && a.progress !== undefined && (
                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="text-gray-300 font-semibold">{a.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${a.progress}%` } : {}}
                            transition={{ duration: 1, delay: index * 0.08 + 0.3, ease: 'easeOut' }}
                            className={`h-full bg-gradient-to-r ${r.gradient} rounded-full`}
                        />
                    </div>
                </div>
            )}

            {/* Earned date */}
            {a.earned && a.date && (
                <div className="text-xs text-gray-500 mt-1">Earned: {a.date}</div>
            )}
        </motion.div>
    );
};

const AchievementsPage = () => {
    const earned = achievements.filter(a => a.earned);
    const unearned = achievements.filter(a => !a.earned);
    const totalXp = earned.reduce((s, a) => s + a.xp, 0);

    return (
        <div className="page-wrapper pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }} className="text-center mb-10">
                <span className="section-tag">Profile</span>
                <h1 className="font-orbitron text-4xl sm:text-5xl font-black text-white mt-3">
                    Your <span className="gradient-text-gold">Achievements</span>
                </h1>
                <p className="text-gray-400 mt-3">Showcase of your glory on the battlefield</p>
            </motion.div>

            {/* XP Summary Bar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="glass-card border border-yellow-500/20 p-6 rounded-2xl mb-12"
                style={{ boxShadow: '0 0 40px rgba(255,215,0,0.07)' }}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                    {[
                        { label: 'Total XP', value: totalXp.toLocaleString(), suffix: 'XP' },
                        { label: 'Unlocked', value: earned.length, suffix: `/ ${achievements.length}` },
                        { label: 'Legendary', value: earned.filter(a => a.rarity === 'Legendary').length, suffix: 'earned' },
                        { label: 'In Progress', value: unearned.length, suffix: 'remaining' },
                    ].map(stat => (
                        <div key={stat.label}>
                            <p className="font-orbitron font-black text-2xl gradient-text-gold">{stat.value} <span className="text-sm text-gray-500 font-normal font-inter">{stat.suffix}</span></p>
                            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Earned Achievements */}
            <section className="mb-12">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} className="flex items-center gap-3 mb-6">
                    <span className="text-xl">🏆</span>
                    <h2 className="font-orbitron font-bold text-lg text-white">Earned</h2>
                    <span className="text-sm font-semibold text-yellow-400">({earned.length})</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-yellow-500/40 to-transparent" />
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {earned.map((a, i) => <AchievementCard key={a.id} a={a} index={i} />)}
                </div>
            </section>

            {/* In Progress / Locked */}
            <section>
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} className="flex items-center gap-3 mb-6">
                    <span className="text-xl">🔒</span>
                    <h2 className="font-orbitron font-bold text-lg text-white">In Progress</h2>
                    <span className="text-sm font-semibold text-gray-400">({unearned.length})</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-gray-500/30 to-transparent" />
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {unearned.map((a, i) => <AchievementCard key={a.id} a={a} index={i} />)}
                </div>
            </section>
        </div>
    );
};

export default AchievementsPage;
