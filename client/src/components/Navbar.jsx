import React from "react"
import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav className="w-full bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <Link
                    to="/"
                    className="text-2xl font-bold text-blue-600"
                >
                    Hotel Booking
                </Link>

                <div className="flex items-center gap-8">
                    <Link
                        to="/"
                        className="text-gray-700 hover:text-blue-600 transition"
                    >
                        Home
                    </Link>

                    <Link
                        to="/hotels"
                        className="text-gray-700 hover:text-blue-600 transition"
                    >
                        Hotels
                    </Link>

                    <Link
                        to="/my-bookings"
                        className="text-gray-700 hover:text-blue-600 transition"
                    >
                        My Bookings
                    </Link>

                    <Link
                        to="/login"
                        className="text-gray-700 hover:text-blue-600 transition"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Register
                    </Link>
                </div>

            </div>
        </nav>
    )
}

export default Navbar