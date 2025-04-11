import { create } from 'zustand';

interface ILandModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCounterBidModal = create<ILandModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCounterBidModal;
