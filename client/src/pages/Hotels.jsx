import React, { useEffect, useState } from "react"
import API from "../services/api"
import HotelCard from "../components/HotelCard"

function Hotels() {

    const [hotels, setHotels] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const getHotels = async () => {
        try {

            const response = await API.get("/gethotels")

            if (response.data.success) {
                setHotels(response.data.hotel)
            }

        } catch (error) {

            console.log(error)

            setError("Unable to fetch hotels")

        } finally {

            setLoading(false)

        }
    }

    useEffect(() => {
        getHotels()
    }, [])


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-gray-600">
                    Loading hotels...
                </p>
            </div>
        )
    }


    if (error) {
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

            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* Heading */}

                <div className="text-center mb-10">

                    <h1 className="text-4xl font-bold text-gray-800 mb-3">
                        Explore Hotels
                    </h1>

                    <p className="text-gray-600">
                        Find the perfect hotel for your next stay.
                    </p>

                </div>


                {/* Hotels */}

                {hotels.length === 0 ? (

                    <div className="text-center py-16">

                        <p className="text-gray-500 text-lg">
                            No hotels available at the moment.
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                        {hotels.map((hotel) => (

                            <HotelCard
                                key={hotel._id}
                                hotel={hotel}
                            />

                        ))}

                    </div>

                )}

            </div>

        </div>
    )
}

export default Hotels