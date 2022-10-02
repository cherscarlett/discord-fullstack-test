import create from "zustand";
import socket from "../lib/socket";
import { clientEvents, serverEvents } from "../constants";

export const [useReactionStore, api] = create((set) => ({
  reactions: [],
}));

export const initializeReactionStore = () => {
  socket.on(serverEvents.UPDATE_ALL_REACTIONS, (reactions) =>
    api.setState({ reactions })
  );
  socket.emit(clientEvents.FETCH_ALL_REACTIONS);
};
