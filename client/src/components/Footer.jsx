import React from "react"
import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer className="bg-gray-900 text-white">

            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

                <div>
                    <h3 className="text-2xl font-bold text-blue-400 mb-4">
                        Hotel Booking
                    </h3>

                    <p className="text-gray-400 leading-6">
                        Find and book comfortable hotels easily
                        and enjoy a hassle-free stay.
                    </p>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-4">
                        Quick Links
                    </h4>

                    <div className="flex flex-col gap-3">
                        <Link
                            to="/"
                            className="text-gray-400 hover:text-white transition"
                        >
                            Home
                        </Link>

                        <Link
                            to="/hotels"
                            className="text-gray-400 hover:text-white transition"
                        >
                            Hotels
                        </Link>

                        <Link
                            to="/my-bookings"
                            className="text-gray-400 hover:text-white transition"
                        >
                            My Bookings
                        </Link>
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-4">
                        Contact Us
                    </h4>

                    <div className="flex flex-col gap-3 text-gray-400">
                        <p>support@hotelbooking.com</p>
                        <p>+91 9876543210</p>
                        <p>Gwalior, Madhya Pradesh, India</p>
                    </div>
                </div>

            </div>

            <div className="border-t border-gray-800">
                <p className="text-center text-gray-500 py-5 text-sm">
                    © 2026 Hotel Booking. All rights reserved.
                </p>
            </div>

        </footer>
    )
}

export default Footer