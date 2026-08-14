const Hotel = require("../models/Hotel")
const Cloudinary = require("../config/cloudinary")
const fs = require("fs")


class Hotelcontroller {
    static addHotel = async (req, res) => {
        try {
            const { name, city, address, description, price,
                totalRooms, availableRooms, amenities, } = req.body

            if (!name || !city || !address || !description || !price || !totalRooms || !availableRooms) {
                return res.status(400).json({
                    success: false,
                    message: "all fields are required"
                })
            }

            if (!req.files || !req.files.hotelImage) {
                return res.status(400).json({
                    success: false,
                    message: "Hotel image is required"
                });
            }

            let images = [];

            const uploadedImages = Array.isArray(req.files.hotelImage)
                ? req.files.hotelImage
                : [req.files.hotelImage];

            for (const file of uploadedImages) {

                const result = await Cloudinary.uploader.upload(
                    file.tempFilePath,
                    {
                        folder: "Hotel_Booking/Hotels"
                    }
                );

                images.push({
                    image: result.secure_url,
                    public_id: result.public_id
                });

                fs.unlinkSync(file.tempFilePath);
            }

            const hotel = await Hotel.create({
                name,
                city,
                address,
                description,
                price,
                hotelImage: images,
                totalRooms,
                availableRooms,
                amenities,
            });

            res.status(201).json({
                success: true,
                message: "Hotel added successfully",
                hotel
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: error.message
            })

        }
    }

    static getAllHotel = async (req, res) => {
        try {
            const hotel = await Hotel.find()
            res.status(200).json({
                success: true,
                message: "hotels data are fetched successfully", hotel
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })

        }
    }

    static getSingleHotel = async (req, res) => {
        try {
            const { id } = req.params
            const hotel = await Hotel.findById(id)
            if (!hotel) {
                return res.status(404).json({
                    success: false,
                    message: "Hotel not found"
                })
            }
            res.status(200).json({
                success: true,
                message: "hotel data found", hotel
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    static updateHotel = async (req, res) => {
        try {
            const { id } = req.params
            const { name, city, address, description, price, totalRooms, availableRooms, amenities } = req.body

            const hotel = await Hotel.findById(id)
            if (!hotel) {
                return res.status(404).json({
                    success: false,
                    message: "hotel not found"
                })
            }

            if (req.files && req.files.hotelImage) {
                for (const image of hotel.hotelImage) {
                    await Cloudinary.uploader.destroy(image.public_id);
                }

                let images = [];

                const uploadedImages = Array.isArray(req.files.hotelImage)
                    ? req.files.hotelImage
                    : [req.files.hotelImage];

                for (const file of uploadedImages) {
                    const result = await Cloudinary.uploader.upload(
                        file.tempFilePath,
                        {
                            folder: "Hotel_Booking/Hotels"
                        }
                    );
                    images.push({
                        image: result.secure_url,
                        public_id: result.public_id
                    });
                    fs.unlinkSync(file.tempFilePath);
                }

                hotel.hotelImage = images;
            }

            hotel.name = name || hotel.name;
            hotel.city = city || hotel.city;
            hotel.address = address || hotel.address;
            hotel.description = description || hotel.description;
            hotel.price = price || hotel.price;
            hotel.totalRooms = totalRooms || hotel.totalRooms;
            hotel.availableRooms = availableRooms || hotel.availableRooms;
            hotel.amenities = amenities || hotel.amenities;

            await hotel.save();
            res.status(200).json({
                success: true,
                message: "Hotel updated successfully",
                hotel
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    static deleteHotel = async (req, res) => {
        try {
            const { id } = req.params
            const hotel = await Hotel.findById(id)

            if (!hotel) {
                return res.status(404).json({
                    success: false,
                    message: "hotel not found"
                })
            }
            for (const image of hotel.hotelImage) {
                await Cloudinary.uploader.destroy(image.public_id);
            }

            await Hotel.findByIdAndDelete(id)
            res.status(200).json({
                success: true,
                message: "hotel deleted"
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}


module.exports = Hotelcontroller