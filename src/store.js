import { create } from "zustand";
import { persist } from 'zustand/middleware';

function store(set) {
    return {
        user: {},
        setUser: (newUser) => set(() => ({user: newUser}))
    }
}

export const useMyStore = create(persist(store, {name: 'store'}));