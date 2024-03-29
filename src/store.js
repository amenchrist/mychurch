import { create } from "zustand";
import { persist } from 'zustand/middleware';

function store(set) {


    return {
        user: {},
        setUser: (newUser) => set(() => ({user: newUser})),
        adminMode: false,
        toggleAdminMode: (value) => set(() => ({adminMode: value})),
        currentPage: null,
        setCurrentPage: (newPage) => set(() => ({currentPage: newPage})),
        urlHandle: '',
        setUrlHandle: (handle) => set(() => ({urlHandle: handle})),

    }
}

export const useMyStore = create(persist(store, {name: 'store'}));