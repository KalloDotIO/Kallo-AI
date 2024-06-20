"use client"
import { create } from 'zustand'

const loggedInUser = null//JSON.parse(localStorage.getItem('loggedInUser'))

export const useAppStore = create((set) => (
    {     
        id: loggedInUser?.id,
        setId: (state => set({id: state})),

        token: loggedInUser?.token,
        setToken: (state => set({token: state})),

        loggedIn: loggedInUser, 
        setLoggedIn: (state => set({loggedIn: state})),

        merchant: null, 
        setMerchant: (state => set({merchant: state})),

        configs: null, 
        setConfigs: (state => set({configs: state})),

        configId: null, 
        setConfigId: (state => set({configId: state})),

    }
))
