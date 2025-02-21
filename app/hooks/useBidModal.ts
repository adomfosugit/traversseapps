import { create } from 'zustand';

interface ILoginModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useBidModal = create<ILoginModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useBidModal;
