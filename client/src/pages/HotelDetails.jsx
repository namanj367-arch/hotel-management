import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import API from "../services/api"

function HotelDetails() {

  const { id } = useParams()

  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const getHotel = async () => {
    try {

      const response = await API.get(`/gethotel/${id}`)

      if (response.data.success) {
        setHotel(response.data.hotel)
      }

    } catch (error) {

      console.log(error)
      setError("Unable to fetch hotel details")

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {
    getHotel()
  }, [id])


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <p className="text-lg text-gray-600">
          Loading hotel details...
        </p>

      </div>
    )
  }


  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <p className="text-red-500 text-lg">
          {error}
        </p>

      </div>
    )
  }


  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <p className="text-gray-500 text-lg">
          Hotel not found
        </p>

      </div>
    )
  }


  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Hotel Images */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">

          {hotel.hotelImage?.map((image, index) => (

            <img
              key={index}
              src={image.image}
              alt={`${hotel.name} ${index + 1}`}
              className="w-full h-80 object-cover rounded-xl"
            />

          ))}

        </div>


        {/* Hotel Information */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            <div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {hotel.name}
              </h1>

              <p className="text-gray-500">
                📍 {hotel.city}
              </p>

            </div>


            <div className="text-yellow-500 text-lg">
              ⭐ {hotel.rating || 0}
            </div>

          </div>


          {/* Address */}

          <div className="mb-6">

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Address
            </h2>

            <p className="text-gray-600">
              {hotel.address}
            </p>

          </div>


          {/* Description */}

          <div className="mb-6">

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              About This Hotel
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {hotel.description}
            </p>

          </div>


          {/* Amenities */}

          <div className="mb-8">

            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Amenities
            </h2>

            <div className="flex flex-wrap gap-3">

              {hotel.amenities?.map((amenity, index) => (

                <span
                  key={index}
                  className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  {amenity}
                </span>

              ))}

            </div>

          </div>


          {/* Price & Rooms */}
          {/* Price & Rooms */}

          <div className="border-t border-gray-200 pt-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Price */}

              <div className="bg-gray-50 rounded-lg p-5">

                <p className="text-gray-500 text-sm mb-1">
                  Price per night
                </p>

                <p className="text-3xl font-bold text-blue-600">
                  ₹{hotel.price}
                </p>

              </div>


              {/* Total Rooms */}

              <div className="bg-gray-50 rounded-lg p-5">

                <p className="text-gray-500 text-sm mb-1">
                  Total Rooms
                </p>

                <p className="text-2xl font-bold text-gray-800">
                  {hotel.totalRooms}
                </p>

              </div>


              {/* Available Rooms */}

              <div className="bg-gray-50 rounded-lg p-5">

                <p className="text-gray-500 text-sm mb-1">
                  Available Rooms
                </p>

                <p className="text-2xl font-bold text-green-600">
                  {hotel.availableRooms}
                </p>

              </div>

            </div>


            {/* Book Button */}

            <div className="mt-6">

              <Link
                to={`/booking/${hotel._id}`}
                className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-center hover:bg-blue-700 transition"
              >
                Book Now
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default HotelDetails