import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEye } from 'react-icons/fi';
import { liveStreams } from '../data/dummyData';

/* =============================================
   LIVE STREAMING PAGE
   ============================================= */

const LiveStreamingPage = () => {
    const [featured, setFeatured] = useState(liveStreams[0]);

    const accentColors = {
        0: '#00F5FF',
        1: '#BF00FF',
        2: '#FFD700',
        3: '#39FF14',
    };

    return (
        <div className="page-wrapper pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center mb-10"
            >
                <span className="section-tag">Live Now</span>
                <h1 className="font-orbitron text-4xl sm:text-5xl font-black text-white mt-3">
                    Watch <span className="gradient-text">Live Battles</span>
                </h1>
                <p className="text-gray-400 mt-3">Catch all the action in real-time — STG battles streaming live</p>
            </motion.div>

            {/* Featured Stream */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mb-10"
            >
                <div
                    className="glass-card border border-cyan-500/20 rounded-2xl overflow-hidden"
                    style={{ boxShadow: '0 0 60px rgba(0,245,255,0.08)' }}
                >
                    {/* Simulated video player */}
                    <div
                        className="relative w-full flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(135deg, #0D0D1A, #050510)',
                            aspectRatio: '16/9',
                            maxHeight: '480px',
                        }}
                    >
                        {/* Grid overlay */}
                        <div
                            className="absolute inset-0 opacity-30"
                            style={{
                                backgroundImage: 'linear-gradient(rgba(0,245,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.05) 1px, transparent 1px)',
                                backgroundSize: '40px 40px',
                            }}
                        />
                        {/* Center content */}
                        <div className="relative z-10 text-center px-4">
                            <div className="text-7xl mb-4">🎮</div>
                            <h3 className="font-orbitron font-bold text-white text-xl sm:text-2xl mb-2">{featured.title}</h3>
                            <p className="text-gray-400 text-sm mb-4">{featured.game} · {featured.streamer}</p>
                            <div className="flex items-center justify-center gap-4">
                                {featured.isLive && (
                                    <span className="flex items-center gap-2 text-sm">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 live-pulse" />
                                        <span className="text-red-400 font-semibold font-orbitron">LIVE</span>
                                    </span>
                                )}
                                <span className="flex items-center gap-1.5 text-sm text-gray-300">
                                    <FiEye className="w-4 h-4" /> {featured.viewers} viewers
                                </span>
                            </div>
                        </div>
                        {/* Glow at bottom */}
                        <div
                            className="absolute bottom-0 left-0 right-0 h-24"
                            style={{ background: 'linear-gradient(to top, rgba(5,5,16,0.9), transparent)' }}
                        />
                    </div>
                    {/* Player controls */}
                    <div className="px-6 py-4 flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-white text-sm">{featured.title}</p>
                            <p className="text-xs text-gray-400">{featured.streamer}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            {featured.isLive && (
                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-xs text-red-400 font-orbitron font-bold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 live-pulse" />
                                    LIVE
                                </span>
                            )}
                            <span className="text-xs text-gray-400">{featured.viewers} watching</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stream Grid */}
            <div>
                <h2 className="font-orbitron font-bold text-white text-lg mb-5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 live-pulse" />
                    All Streams
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {liveStreams.map((stream, i) => (
                        <motion.div
                            key={stream.id}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            whileHover={{ y: -6, boxShadow: `0 20px 50px ${accentColors[i]}30` }}
                            onClick={() => setFeatured(stream)}
                            className={`glass-card border cursor-pointer transition-all duration-300 overflow-hidden group ${featured.id === stream.id ? 'border-cyan-500/50 glow-cyan' : 'border-white/5 hover:border-white/20'
                                }`}
                        >
                            {/* Thumbnail */}
                            <div
                                className="relative flex items-center justify-center"
                                style={{
                                    background: `linear-gradient(135deg, #0D0D1A, rgba(${i === 0 ? '0,245,255' : i === 1 ? '191,0,255' : i === 2 ? '255,215,0' : '57,255,20'},0.1))`,
                                    aspectRatio: '16/9',
                                }}
                            >
                                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">🎮</span>
                                {stream.isLive && (
                                    <span className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded font-orbitron">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                        LIVE
                                    </span>
                                )}
                                <span className="absolute bottom-2 right-2 flex items-center gap-1 text-xs bg-black/60 text-gray-200 px-2 py-0.5 rounded">
                                    <FiEye className="w-3 h-3" /> {stream.viewers}
                                </span>
                            </div>
                            {/* Info */}
                            <div className="p-3">
                                <p className="font-semibold text-white text-sm leading-tight mb-0.5 line-clamp-1">{stream.title}</p>
                                <p className="text-xs text-gray-400">{stream.streamer} · {stream.game}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LiveStreamingPage;
