import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Navbar from './components/Navbar';

// Pages
import HomePage from './pages/HomePage';
import BattlesPage from './pages/BattlesPage';
import CreateBattlesPage from './pages/CreateBattlesPage';
import LiveStreamingPage from './pages/LiveStreamingPage';
import AchievementsPage from './pages/AchievementsPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

/* =============================================
   PAGE TRANSITION WRAPPER
   Smooth fade + slight upward motion on route change
   ============================================= */
const PageTransition = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
        {children}
    </motion.div>
);

/* =============================================
   ANIMATED ROUTES
   Wrapped in AnimatePresence for exit animations
   ============================================= */
const AnimatedRoutes = ({ isLoggedIn, setIsLoggedIn, user, setUser }) => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
                <Route path="/battles" element={<PageTransition><BattlesPage /></PageTransition>} />
                <Route
                    path="/create-battles"
                    element={
                        <PageTransition>
                            <CreateBattlesPage isLoggedIn={isLoggedIn} user={user} />
                        </PageTransition>
                    }
                />
                <Route path="/live" element={<PageTransition><LiveStreamingPage /></PageTransition>} />
                <Route
                    path="/achievements"
                    element={<PageTransition><AchievementsPage /></PageTransition>}
                />
                <Route
                    path="/login"
                    element={
                        <PageTransition>
                            <LoginPage setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
                        </PageTransition>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PageTransition>
                            <ProfilePage isLoggedIn={isLoggedIn} user={user} />
                        </PageTransition>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

/* =============================================
   ROOT APP
   ============================================= */
const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    return (
        <BrowserRouter>
            {/* Navbar is always visible */}
            <Navbar
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                setUser={setUser}
            />
            {/* Animated page routes */}
            <AnimatedRoutes
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                setUser={setUser}
            />
        </BrowserRouter>
    );
};

export default App;
