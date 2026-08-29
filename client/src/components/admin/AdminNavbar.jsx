import React from "react"

function AdminNavbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
            <div>
                <h2 className="text-xl font-bold text-gray-800">
                    Hotel Booking Admin
                </h2>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-gray-600">
                    Admin
                </span>

                <button className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600">
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default AdminNavbar