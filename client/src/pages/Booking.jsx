import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../services/api'


function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(1)
  const [rooms, setRooms] = useState(1)

  const [loading, setLoading] = useState(true)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const getHotel = async () => {
    try {
      const response = await API.get(`/gethotel/${id}`)
      if (response.data.success) {
        setHotel(response.data.hotel)
      }
    } catch (error) {
      console.log(error);
      setError("unable to fetch data from api")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getHotel()
  }, [id])

  const handleBooking = async (e) => {
    e.preventDefault()

    setError("")
    setMessage("")

    if (!checkIn || !checkOut) {
      setError("checkin and checkout are require")
      return
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setError("checkout date cannot be smaller then checkin")
      return
    }
    if (rooms > hotel.availableRooms) {
      setError("not enough rooms are available")
      return
    }

    try {

      setBookingLoading(true)

      const response = await API.post("/createbooking", {
        hotelId: id,
        checkIn,
        checkOut,
        guests: Number(guests),
        rooms: Number(rooms)
      })
      if (response.data.success) {
        setMessage("booking created successfully")

        setTimeout(() => {
          navigate("/my-bookings")
        }, 1500)
      }
    } catch (error) {
      console.log(error)
      setError(
        error.response?.data?.message || "Unable to create booking"
      )
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">
          Loading...
        </p>
      </div>
    )
  }


  if (error && !hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">
          {error}
        </p>
      </div>
    )
  }


  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="max-w-5xl mx-auto px-6 py-12">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Book Your Stay
        </h1>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


          {/* Hotel Information */}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

            <img
              src={hotel?.hotelImage?.[0]?.image}
              alt={hotel?.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-6">

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {hotel?.name}
              </h2>

              <p className="text-gray-500 mb-4">
                📍 {hotel?.city}
              </p>

              <p className="text-gray-600 mb-5">
                {hotel?.description}
              </p>


              <div className="border-t pt-4">

                <div className="flex justify-between mb-3">

                  <span className="text-gray-500">
                    Price per night
                  </span>

                  <span className="font-semibold text-blue-600">
                    ₹{hotel?.price}
                  </span>

                </div>


                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Available rooms
                  </span>

                  <span className="font-semibold">
                    {hotel?.availableRooms}
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* Booking Form */}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Booking Details
            </h2>


            <form onSubmit={handleBooking}>

              {/* Check In */}

              <div className="mb-5">

                <label className="block text-gray-700 font-medium mb-2">
                  Check-in
                </label>

                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* Check Out */}

              <div className="mb-5">

                <label className="block text-gray-700 font-medium mb-2">
                  Check-out
                </label>

                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split("T")[0]}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* Guests */}

              <div className="mb-5">

                <label className="block text-gray-700 font-medium mb-2">
                  Guests
                </label>

                <input
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* Rooms */}

              <div className="mb-6">

                <label className="block text-gray-700 font-medium mb-2">
                  Rooms
                </label>

                <input
                  type="number"
                  min="1"
                  max={hotel?.availableRooms}
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <p className="text-sm text-gray-500 mt-2">
                  Maximum {hotel?.availableRooms} rooms available
                </p>

              </div>


              {/* Error */}

              {error && (

                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>

              )}


              {/* Success */}
              {message && (
                <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg mb-4">
                  {message}
                </div>
              )}
              
              {/* Submit */}
              <button
                type="submit"
                disabled={bookingLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-300"
              >
                {bookingLoading
                  ? "Creating Booking..."
                  : "Confirm Booking"
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking