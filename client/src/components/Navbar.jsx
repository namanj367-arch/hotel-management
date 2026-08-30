import React from "react"
import { Link, useNavigate } from "react-router-dom"
import API from "../services/api"
import { useAuth } from "../authcontext/AuthContext"

function Navbar() {

    const navigate = useNavigate()
    const { user, setUser } = useAuth()

    const handleLogout = async () => {
        try {
            await API.get("/logout")
            setUser(null)
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">

                    {/* Logo */}

                    <Link
                        to="/"
                        className="text-2xl font-bold text-blue-600"
                    >
                        MyBook
                    </Link>

                    {/* Navigation */}

                    <div className="flex items-center gap-6">
                        <Link
                            to="/"
                            className="text-gray-600 hover:text-blue-600 transition"
                        >
                            Home
                        </Link>

                        <Link
                            to="/hotels"
                            className="text-gray-600 hover:text-blue-600 transition"
                        >
                            Hotels
                        </Link>

                        {user ? (
                            <>

                                <Link
                                    to="/my-bookings"
                                    className="text-gray-600 hover:text-blue-600 transition"
                                >
                                    My Bookings
                                </Link>

                                <span className="text-gray-700 font-medium">
                                    Hi, {user.name}
                                </span>

                                <button
                                    onClick={handleLogout}
                                    className="text-red-500 hover:text-red-600 font-medium"
                                >
                                    Logout
                                </button>

                            </>

                        ) : (

                            <>

                                <Link
                                    to="/login"
                                    className="text-blue-600 font-semibold hover:text-blue-700"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
