import { create } from "zustand";

export type GameMessageType = {
  message: string;
  createdTime: string;
  createdTimeStamp: number;
  playerUid: string;
  seen?: boolean;
  seenTime?: string;
};

interface ChatStoreType {
  gameMessage: GameMessageType[];
  setGameMessage: (gameMessageDetails: GameMessageType) => void;
  replaceGameMessage: (gameMessageDetails: GameMessageType[]) => void;
  removeGameMessage: () => void;
}

export const useGameChatStore = create<ChatStoreType>((set) => ({
  gameMessage: [],
  setGameMessage: (gameMessageDetails) =>
    set((state) => ({
      gameMessage: [...state.gameMessage, gameMessageDetails],
    })),
  replaceGameMessage: (gameMessageDetails) =>
    set(() => ({
      gameMessage: gameMessageDetails,
    })),
  removeGameMessage: () => set(() => ({ gameMessage: [] })),
}));
