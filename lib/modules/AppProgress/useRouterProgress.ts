import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppProgress } from './useAppProgress';

export const useRouterProgress = () => {
  const router = useRouter();
  const setIsAnimating = useAppProgress(state => state.setIsAnimating);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleStart = () => {
      timeout = setTimeout(() => setIsAnimating(true), 500);
    };
    const handleStop = () => {
      clearTimeout(timeout);
      setIsAnimating(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router, setIsAnimating]);
};
