import { create } from 'zustand';

interface ExhibitModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useExhibitModal = create<ExhibitModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useExhibitModal;
