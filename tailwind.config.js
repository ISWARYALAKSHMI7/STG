/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'neon-cyan': '#00F5FF',
                'neon-purple': '#BF00FF',
                'neon-green': '#39FF14',
                'neon-gold': '#FFD700',
                'dark-bg': '#050510',
                'dark-card': '#0D0D1A',
                'dark-border': '#1A1A3A',
                'glass-bg': 'rgba(13, 13, 26, 0.7)',
            },
            fontFamily: {
                'inter': ['Inter', 'sans-serif'],
                'orbitron': ['Orbitron', 'sans-serif'],
            },
            animation: {
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 10px #00F5FF, 0 0 20px #00F5FF' },
                    '50%': { boxShadow: '0 0 25px #00F5FF, 0 0 50px #00F5FF, 0 0 80px #00F5FF' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'cyber-grid': "linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)",
            },
            backgroundSize: {
                'grid': '50px 50px',
            },
        },
    },
    plugins: [],
}
