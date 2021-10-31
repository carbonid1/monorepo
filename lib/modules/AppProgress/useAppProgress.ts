import create from 'zustand';

export const useAppProgress = create(set => ({
  isAnimating: false,
  setIsAnimating: (isAnimating: boolean) => set(() => ({ isAnimating })),
}));
