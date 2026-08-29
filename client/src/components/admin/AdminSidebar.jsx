import React from "react"
import { Link } from "react-router-dom"

function AdminSidebar() {
    return (
        <aside className="w-64 h-auto bg-gray-900 text-white p-5">
            <h2 className="text-lg font-semibold mb-6">
                Admin Panel
            </h2>

            <div className="flex flex-col gap-3">
                <Link
                    to="/admin"
                    className="px-4 py-3 rounded-md hover:bg-gray-800"
                >
                    Dashboard
                </Link>

                <Link
                    to="/admin/hotels"
                    className="px-4 py-3 rounded-md hover:bg-gray-800"
                >
                    Manage Hotels
                </Link>

                <Link
                    to="/admin/hotels/add"
                    className="px-4 py-3 rounded-md hover:bg-gray-800"
                >
                    Add Hotel
                </Link>

                <Link
                    to="/admin/bookings"
                    className="px-4 py-3 rounded-md hover:bg-gray-800"
                >
                    Manage Bookings
                </Link>
            </div>
        </aside>
    )
}

export default AdminSidebar