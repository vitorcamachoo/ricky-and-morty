import React, { createContext, FC, useContext, useState } from 'react'
import firebase, { auth, providers } from 'services/firebase'

type User = firebase.User | null

interface AuthContextProps {
    user: User
    signInWithGoogle(): Promise<User>
    logout(): Promise<void>
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const useAuth = () => {
    return useContext(AuthContext)
}


const useProvideAuth = () => {
    const [user, setUser] = useState<User>(null)

    const signInWithGoogle = async (): Promise<User> => {
        const response = await auth.signInWithPopup(providers.google)
        setUser(response.user)
        return response.user
    }

    const logout = async (): Promise<void> => {
        await auth.signOut()
        setUser(null)
    }


    return {
        user,
        signInWithGoogle,
        logout
    }
}

export const ProvideAuth: FC = (props) => {
    return <AuthContext.Provider value={useProvideAuth()}>{props.children}</AuthContext.Provider>
}