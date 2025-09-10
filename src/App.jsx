import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AppRoutes from './routes/AppRoutes';

import Home from './pages/Common/Home';

const App = () => {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
};

export default App;
