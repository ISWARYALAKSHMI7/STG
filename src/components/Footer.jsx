import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FaTwitter, FaInstagram, FaYoutube, FaDiscord, FaTwitch
} from 'react-icons/fa';

/**
 * Footer Component
 * Apple-inspired footer with social links, navigation, and branding
 */
const Footer = () => {
    const footerLinks = {
        Platform: [
            { label: 'Home', to: '/' },
            { label: 'Battles', to: '/battles' },
            { label: 'Create Battles', to: '/create-battles' },
            { label: 'Live Streaming', to: '/live' },
        ],
        Community: [
            { label: 'Achievements', to: '/achievements' },
            { label: 'Leaderboard', to: '#' },
            { label: 'Forum', to: '#' },
            { label: 'Blog', to: '#' },
        ],
        Support: [
            { label: 'Help Center', to: '#' },
            { label: 'Contact Us', to: '#' },
            { label: 'Terms of Service', to: '#' },
            { label: 'Privacy Policy', to: '#' },
        ],
    };

    const socials = [
        { icon: <FaTwitter />, href: '#', label: 'Twitter', color: '#1DA1F2' },
        { icon: <FaInstagram />, href: '#', label: 'Instagram', color: '#E1306C' },
        { icon: <FaYoutube />, href: '#', label: 'YouTube', color: '#FF0000' },
        { icon: <FaDiscord />, href: '#', label: 'Discord', color: '#5865F2' },
        { icon: <FaTwitch />, href: '#', label: 'Twitch', color: '#9146FF' },
    ];

    return (
        <footer className="relative mt-20 border-t border-white/5">
            {/* Gradient glow at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-3 mb-4 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-sm font-black text-black font-orbitron glow-cyan">
                                STG
                            </div>
                            <div>
                                <div className="font-orbitron font-bold text-xl gradient-text">STG ESPORTS</div>
                                <div className="text-xs text-gray-500">Battle. Compete. Dominate.</div>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            India's premier esports tournament platform.
                            Compete in PUBG, BGMI & Free Fire tournaments
                            with real prize pools every day.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 mt-6">
                            {socials.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    title={social.label}
                                    whileHover={{ scale: 1.2, y: -3 }}
                                    whileTap={{ scale: 0.9 }}
                                    style={{ '--hover-color': social.color }}
                                    className="w-9 h-9 rounded-lg glass-card border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:border-white/20"
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Nav columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="font-orbitron text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-4">
                                {category}
                            </h3>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.to}
                                            className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm text-center sm:text-left">
                        © 2026 STG Esports. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs text-gray-500">All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
