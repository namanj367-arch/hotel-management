import { createContext, useContext, useEffect, useState } from "react"
import API from "../services/api"

const AuthContext = createContext()

function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const getProfile = async () => {
        try {
            const response = await API.get("/getprofile")

            setUser(response.data.user)

        } catch (error) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            loading,
            getProfile
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}

export default AuthProvider