const db = require("../config/database");
const Train = require("../models/train");
const Booking = require("../models/booking");

exports.bookSeat = async (req, res, next) => {
  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    const { trainId, seatCount } = req.body;
    const userId = req.user.userId;

    // Check if train exists
    const [train] = await connection.query(
      "SELECT * FROM trains WHERE id = ? FOR UPDATE",
      [trainId]
    );
    if (!train[0]) {
      return res.status(404).json({ error: "Train not found" });
    }

    // Check if enough seats are available
    if (train[0].available_seats < seatCount) {
      await connection.rollback();
      return res.status(400).json({ error: "Not enough seats available" });
    }

    // Create a new booking
    const newBooking = new Booking({ trainId, userId, seatCount });
    const bookingId = await Booking.create(newBooking, connection);

    // Update available seats for the train
    const newAvailableSeats = train[0].available_seats - seatCount;
    await connection.query(
      "UPDATE trains SET available_seats = ? WHERE id = ?",
      [newAvailableSeats, trainId]
    );

    await connection.commit();
    res.status(201).json({ bookingId });
  } catch (err) {
    await connection.rollback();
    next(err);
  } finally {
    connection.release();
  }
};

exports.getBookingDetails = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { trainId } = req.query;

    // Find booking by user ID and train ID
    const booking = await Booking.findByUserIdAndTrainId(userId, trainId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};

