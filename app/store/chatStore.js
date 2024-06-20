'use client'
import { create } from 'zustand'


//const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

export const useChatStore = create((set) => (
    {     
        chat: {message_set:[]},
        setChat: (state => set({chat: state})),

        datetime: null,
        setDatetime: (state => set({datetime: state})),

        dashboardItems: {loading:false, error: false, items:   JSON.parse(localStorage.getItem('dashboardItems')) || null},
        setDashboardItems: (state => set({dashboardItems: state})),

        // request: '',
        // setRequest: (state => set({request: state})),

        


    }
))
