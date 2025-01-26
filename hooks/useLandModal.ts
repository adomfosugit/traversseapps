import { create } from 'zustand';

interface ILandModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLandModal = create<ILandModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLandModal;
