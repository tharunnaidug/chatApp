// import { create } from 'zustand'

// const userConverstion=create((set)=>{{
//     selectedConverstion:null,
//     setSelectedConverstion:(selectedConverstion)=>set({selectedConverstion}),
//     messages:[],
//     setMessages:(messages)=>set({messages})
// }})

// export default userConverstion;
// import {create} from 'zustand';
import { create } from 'zustand';

const userConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages })
}));

export default userConversation;
