import React from "react"
import { Link } from "react-router-dom"

function Home() {
    return (
        <div>

            <section className="bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-6 py-24 text-center">

                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Find Your Perfect Stay
                    </h1>

                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                        Discover comfortable hotels, book your room easily,
                        and enjoy a hassle-free stay.
                    </p>

                    <Link
                        to="/hotels"
                        className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                        Explore Hotels
                    </Link>

                </div>
            </section>


            <section className="max-w-7xl mx-auto px-6 py-16">

                <div className="text-center mb-12">

                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Why Choose Us?
                    </h2>

                    <p className="text-gray-600">
                        Everything you need for a comfortable hotel booking
                        experience.
                    </p>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div className="text-4xl mb-4">
                            🏨
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            Quality Hotels
                        </h3>

                        <p className="text-gray-600">
                            Choose from a variety of comfortable and
                            convenient hotels.
                        </p>
                    </div>


                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div className="text-4xl mb-4">
                            📅
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            Easy Booking
                        </h3>

                        <p className="text-gray-600">
                            Book your hotel room quickly with our simple
                            booking process.
                        </p>
                    </div>


                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div className="text-4xl mb-4">
                            💳
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            Secure Payment
                        </h3>

                        <p className="text-gray-600">
                            Pay securely and conveniently using our
                            payment system.
                        </p>
                    </div>

                </div>

            </section>


            <section className="bg-gray-100">

                <div className="max-w-7xl mx-auto px-6 py-16 text-center">

                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Ready to Find Your Hotel?
                    </h2>

                    <p className="text-gray-600 mb-8">
                        Explore our available hotels and make your next
                        stay comfortable.
                    </p>

                    <Link
                        to="/hotels"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        View Hotels
                    </Link>

                </div>

            </section>

        </div>
    )
}

export default Home