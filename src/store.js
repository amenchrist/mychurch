import { create } from "zustand";
import { persist } from 'zustand/middleware';

function store(set) {


    return {
        user: {},
        setUser: (newUser) => set(() => ({user: newUser})),
        adminMode: false,
        toggleAdminMode: (value) => set(() => ({adminMode: value})),
        currentPage: {},
        setCurrentPage: (newPage) => set(() => ({currentPage: newPage})),
    }
}

export const useMyStore = create(persist(store, {name: 'store'}));