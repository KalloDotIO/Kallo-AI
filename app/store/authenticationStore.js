import { create } from 'zustand'

// export const useAuthenicationStore = create((set) => (
//     {
        
//         // token: null,
//         // setToken: (state => set({token: state})),

//         // id:null,
//         // setId: (state => set({id: state})),

//         error:false,
//         setError: (state => set({setError: state})),

//         errorMessage:null,
//         setErrorMessage: (state => set({setErrorMessage: state})),

//         form: 'signin',
//         setForm: (state => set({setForm: state})),

//         popup: false,
//         setPopup: (state => set({setPopup: state})),

//         loggedIn: false,
//         setLoggedIn: (state => set({setLoggedIn: state})),
        
       
//     }
// ))


export const useAuthenicationStore = create((set) => (
    {
        state: {
                id:null,
                token: null,
                email: '',
                error:false,
                errorMessage: 'An error occured',
                form: 'signin',
                
        },
        setState: (state => set({state: state}))
    }
))

export const authenticationState = {
    id:null,
    token: null,
    email: '',
    //loggedIn: localStorage.getItem('loggedInUser') ? true : false,
    error:false,
    errorMessage: 'An error occured',
    form: 'signin',
    //popup: false,
    
}