import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../services/api'

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()

    setError("")
    setMessage("")

    if (!name || !email || !password || !phone) {
      setError("all fields are required")
      return
    }
    try {

      setLoading(true)

      const response = await API.post("/registration", {
        name, email, password, phone
      })
      if (response.data.success) {
        setMessage("registered succesfully")
      }
      setTimeout(() => {
        navigate("/login")
      }, 1000)
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Unable to register")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2"> Create Account </h1>
            <p className="text-gray-500"> Register to get started </p>
          </div>
          <form onSubmit={handleRegister}>

            {/* Name */}

            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2"> Name </label>
              <input type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Email */}

            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2"> Email </label>
              <input type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Password */}

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2"> Password </label>
              <input type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Phone */}

            <div className='mb-6'>
              <label className="block text-gray-700 font-medium mb-2"> Phone </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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

              {/* Register Button */}

              <button type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-300" >
                {loading ? "Creating Account..." : "Register"}
              </button>
          </form>
          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login"
              className="text-blue-600 font-semibold hover:text-blue-700" >
              Login </Link>
          </p>
        </div>
      </div>
    </div>)
}

export default Register