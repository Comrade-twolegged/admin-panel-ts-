import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { User } from "../@types/User" 

interface CurrentUserState {
    current: boolean;
    user: User | null;
    error?: string | null;
}

interface userState {
    users: User[]
    currentUser: CurrentUserState
}

const localUsers = localStorage.getItem("users");
const parsedUsers: User[] = localUsers ? JSON.parse(localUsers) : [
    {
        firstName: "Олег",
        email: "oleg@example.com",
        password: "123",
        id: "1"
    },
    {
        firstName: "Марина",
        email: "marina@example.com",
        password: "qwerty456",
        id: "2"
    },
    {
        firstName: "Андрій",
        email: "andriy@example.com",
        password: "letmein789",
        id: "3"
    },
    {
        firstName: "Ірина",
        email: "iryna@example.com",
        password: "pass456pass",
        id: "4"
    }
];

const initialState: userState = {
    users: parsedUsers,

    currentUser: {
        current: false,
        user: null,
        error: null
    }
}

localStorage.setItem("users", JSON.stringify(initialState.users));
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createUser: (state, action: PayloadAction<Omit<User, 'id'>>) => {
            const userData = action.payload;

            const exists = state.users.some(user => user.email === userData.email);

            if (!exists) {
                const newUser: User = {
                    ...userData,
                    id: uuidv4()
                };

                state.users.push(newUser);
                localStorage.setItem("users", JSON.stringify(state.users));
            } else {
                console.warn("Такий юзер вже існує!");
            }
        },
        deleteUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(user => user.id !== action.payload);
            localStorage.setItem("users", JSON.stringify(state.users));
        },
        editUser: (state, action: PayloadAction<User>) => {
            const updateUser = action.payload;
            state.users = state.users.map(user =>
                user.id === updateUser.id ? updateUser : user)
            localStorage.setItem("users", JSON.stringify(state.users));
        },
        loginUser: (state, action: PayloadAction<{ firstName: string, email: string, password: string }>) => {
            const { firstName, email, password } = action.payload;

            const user = state.users.find(user =>
                user.firstName === firstName && user.email === email && user.password === password);

            if (user) {
                state.currentUser = {
                    current: true,
                    user: user
                }
            } else {
                state.currentUser.error = "Невірний пароль або пошта"
            }
        }

    }
})

export const { createUser, deleteUser, editUser, loginUser } = userSlice.actions;
export default userSlice.reducer;