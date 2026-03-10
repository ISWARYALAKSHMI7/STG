import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import Footer from '../components/Footer';
import { features } from '../data/dummyData';

/* =============================================
   HOME PAGE - Apple-inspired hero + features
   ============================================= */

// Reusable fade-in-up animation wrapper
const FadeInUp = ({ children, delay = 0, className = '' }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Animated stat counter card
const StatCard = ({ value, label, delay }) => (
    <FadeInUp delay={delay}>
        <div className="glass-card p-5 text-center glass-card-hover">
            <div className="font-orbitron text-2xl font-bold gradient-text mb-1">{value}</div>
            <div className="text-xs text-gray-400 uppercase tracking-widest">{label}</div>
        </div>
    </FadeInUp>
);

// Feature card with icon
const FeatureCard = ({ icon, title, desc, index }) => (
    <FadeInUp delay={index * 0.12}>
        <div className="glass-card glass-card-hover p-6 h-full group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
            <h3 className="font-orbitron font-semibold text-white text-base mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
        </div>
    </FadeInUp>
);

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="page-wrapper">
            {/* ─── HERO SECTION ─── */}
            <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden cyber-grid-bg">
                {/* Background glow orbs */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
                        style={{ background: 'radial-gradient(circle, #00F5FF, transparent)' }}
                    />
                    <div
                        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
                        style={{ background: 'radial-gradient(circle, #BF00FF, transparent)' }}
                    />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-16">
                    {/* Pre-heading tag */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="section-tag">India's #1 Esports Platform</span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="font-orbitron font-black mt-4 leading-tight tracking-tight"
                        style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
                    >
                        WELCOME TO{' '}
                        <span className="gradient-text block">STG ESPORTS</span>
                    </motion.h1>

                    {/* Sub-heading */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.55 }}
                        className="mt-5 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        The ultimate battleground for PUBG, BGMI &amp; Free Fire champions.
                        <br />
                        <span className="text-gray-300">To see us in live —</span> watch every battle unfold in real time.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
                    >
                        <motion.button
                            onClick={() => navigate('/live')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="btn-primary text-base px-8 py-4 flex items-center gap-2 justify-center"
                        >
                            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                            WATCH LIVE
                        </motion.button>
                        <motion.button
                            onClick={() => navigate('/battles')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="btn-outline text-base px-8 py-4"
                        >
                            JOIN BATTLES
                        </motion.button>
                    </motion.div>

                    
                </div>
            </section>

            {/* ─── STATS SECTION ─── */}
            <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <StatCard value="10,000+" label="Active Players" delay={0} />
                    <StatCard value="₹50L+" label="Prize Distributed" delay={0.1} />
                    <StatCard value="500+" label="Tournaments" delay={0.2} />
                    <StatCard value="24/7" label="Live Action" delay={0.3} />
                </div>
            </section>

            {/* ─── FEATURES SECTION ─── */}
            <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
                <FadeInUp className="text-center mb-12">
                    <span className="section-tag">Platform Features</span>
                    <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white mt-3">
                        Everything You Need to{' '}
                        <span className="gradient-text">Dominate</span>
                    </h2>
                </FadeInUp>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((f, i) => (
                        <FeatureCard key={f.title} {...f} index={i} />
                    ))}
                </div>
            </section>

            {/* ─── CTA BANNER ─── */}
            <section className="py-20 px-4 sm:px-6">
                <FadeInUp>
                    <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden glass-card border border-cyan-500/20">
                        {/* Gradient BG */}
                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                background:
                                    'linear-gradient(135deg, rgba(0,245,255,0.3), rgba(191,0,255,0.3))',
                            }}
                        />
                        <div className="relative z-10 text-center py-16 px-6">
                            <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white mb-4">
                                Ready to Battle?
                            </h2>
                            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
                                Register your team and compete for glory and cash prizes — every single day.
                            </p>
                            <motion.button
                                onClick={() => navigate('/battles')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-primary text-base px-10 py-4"
                            >
                                VIEW ALL BATTLES →
                            </motion.button>
                        </div>
                    </div>
                </FadeInUp>
            </section>

            <Footer />
        </div>
    );
};

export default HomePage;
