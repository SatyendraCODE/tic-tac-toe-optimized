import { create } from "zustand";

interface ChatModalType {
  open: boolean;
  toggleModal: () => void;
  closeModal: () => void;
  openModal: () => void;
}

export const useChatModalStore = create<ChatModalType>((set) => ({
  open: false,
  toggleModal: () =>
    set((state) => ({
      open: !state.open,
    })),
  closeModal: () =>
    set(() => ({
      open: false,
    })),
  openModal: () => set(() => ({ open: true })),
}));
