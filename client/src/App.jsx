import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import UserLayout from "./layout/UserLayout"
import AdminLayout from "./layout/AdminLayout"

import Home from "./pages/Home"
import Hotels from "./pages/Hotels"
import HotelDetails from "./pages/HotelDetails"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Booking from "./pages/Booking"
import MyBookings from "./pages/MyBookings"

import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AddHotel from "./pages/admin/AddHotel"
import UpdateHotel from "./pages/admin/UpdateHotel"
import ManageHotels from "./pages/admin/ManageHotels"
import ManageBookings from "./pages/admin/ManageBookings"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<UserLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/hotels" element={<Hotels />} />

          <Route
            path="/hotels/:id"
            element={<HotelDetails />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/booking/:id"
            element={<Booking />}
          />

          <Route
            path="/my-bookings"
            element={<MyBookings />}
          />

        </Route>


        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route element={<AdminLayout />}>

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/hotels"
            element={<ManageHotels />}
          />

          <Route
            path="/admin/hotels/add"
            element={<AddHotel />}
          />

          <Route
            path="/admin/hotels/update/:id"
            element={<UpdateHotel />}
          />

          <Route
            path="/admin/bookings"
            element={<ManageBookings />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App