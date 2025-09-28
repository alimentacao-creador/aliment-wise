import { useState, useEffect } from 'react';

export const useDemo = () => {
  const [isDemo, setIsDemo] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const demoMode = localStorage.getItem('demo') === 'true';
    setIsDemo(demoMode);
    setLoading(false);
  }, []);

  const enableDemo = () => {
    localStorage.setItem('demo', 'true');
    setIsDemo(true);
  };

  const disableDemo = () => {
    localStorage.removeItem('demo');
    setIsDemo(false);
  };

  return {
    isDemo,
    loading,
    enableDemo,
    disableDemo,
  };
};