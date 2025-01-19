import { create } from "zustand";
import { persist } from 'zustand/middleware';

function store(set) {

  return {
      user: null,
      setUser: (newUser) => set(() => ({user: newUser})),
      follower: null,
      setFollower: (newFollower) => set(() => ({follower: newFollower})),
      adminMode: false,
      toggleAdminMode: (value) => set(() => ({adminMode: value})),
      currentPage: null,
      setCurrentPage: (newPage) => set(() => ({currentPage: newPage})),
      urlHandle: '',
      setUrlHandle: (handle) => set(() => ({urlHandle: handle})),
      isSignedIn: false,
      setIsSignedIn: (value) => set(() => ({isSignedIn: value})),
      event: null,
      setEvent: (newEvent) => set(() => ({event: newEvent})),
      nextEvent: null,
      setNextEvent: (newEvent) => set(() => ({nextEvent: newEvent})),
      events: [],
      setEvents: (events) => set(() => ({events: events})),
      loading: true,
      setLoading: (status) => set(() => ({loading: status})),
  }

}

// export const useMyStore = create(persist(store, {name: 'store'}));
export const useMyStore = create(store, {name: 'store'});