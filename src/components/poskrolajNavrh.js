import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Premakne se na vrh ob vsaki spremembi poti
    }, [location]);

    return null; // Ta komponenta ne potrebuje renderiranja ničesar
};

export default ScrollToTop;
