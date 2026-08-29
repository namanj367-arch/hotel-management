import React from "react"
import { Link } from "react-router-dom"

function HotelCard({ hotel }) {

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">

            {/* Hotel Image */}

            <div className="h-56 overflow-hidden">

                <img
                    src={hotel.hotelImage?.[0]?.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />

            </div>


            {/* Hotel Details */}

            <div className="p-6">

                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {hotel.name}
                </h2>

                <p className="text-gray-500 mb-3">
                    📍 {hotel.city}
                </p>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {hotel.description}
                </p>


                {/* Price & Rating */}

                <div className="flex items-center justify-between mb-5">

                    <div>

                        <span className="text-2xl font-bold text-blue-600">
                            ₹{hotel.price}
                        </span>

                        <span className="text-gray-500 text-sm">
                            {" "} / night
                        </span>

                    </div>

                    <div className="text-yellow-500">
                        ⭐ {hotel.rating || 0}
                    </div>

                </div>


                {/* View Details */}

                <Link
                    to={`/hotels/${hotel._id}`}
                    className="block text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    View Details
                </Link>

            </div>

        </div>
    )
}

export default HotelCard