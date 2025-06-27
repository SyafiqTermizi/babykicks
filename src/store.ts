import { create } from "zustand";

import { AUTH_TOKEN_KEY_NAME, USERNAME_KEY_NAME } from "./constants";

interface State {
    authToken: string,
    username: string,
    setAuthToken: (token: string) => void;
    setUsername: (username: string) => void;
    clear: () => void;
}

console.log("store init");

export const useStore = create<State>((set) => ({
    authToken: localStorage.getItem(AUTH_TOKEN_KEY_NAME) || "",
    username: localStorage.getItem(USERNAME_KEY_NAME) || "",
    setAuthToken: (token: string) => {
        set(() => ({ authToken: token }));
        localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
    },
    setUsername: (username: string) => {
        set({ username: username });
        localStorage.setItem(USERNAME_KEY_NAME, username);
    },
    clear: () => {
        set({ username: "", authToken: "" });
        localStorage.clear();
    },
}));

console.log("store init completed");