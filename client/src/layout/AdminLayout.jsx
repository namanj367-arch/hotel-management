import React from "react"
import { Outlet } from "react-router-dom"
import AdminNavbar from "../components/admin/AdminNavbar"
import AdminSidebar from "../components/admin/AdminSidebar"
import AdminFooter from "../components/admin/AdminFooter"

function AdminLayout() {
    return (
        <div className="min-h-screen flex flex-col">

            <AdminNavbar />

            <div className="flex flex-1">

                <AdminSidebar />

                <main className="flex-1 bg-gray-100 p-6">
                    <Outlet />
                </main>

            </div>

            <AdminFooter />

        </div>
    )
}

export default AdminLayout