export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { roomId, checkInDate, checkOutDate } = body;

  if (!roomId || !checkInDate || !checkOutDate) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Room ID, check-in date, and check-out date are required',
    });
  }

  // Validate dates
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // Pseudo-code for database
const existingBooking = await db.bookings.find({
  roomId,
  $or: [
    { checkInDate: { $lte: checkOutDate }, checkOutDate: { $gte: checkInDate } },
  ],
});
if (existingBooking) {
  throw createError({ statusCode: 400, statusMessage: 'Room is booked for these dates' });
}
await db.bookings.insert({ roomId, userId, checkInDate, checkOutDate });

  if (checkIn < today || checkOut <= checkIn) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid booking dates',
    });
  }

  // Fetch rooms (in a real app, use a database)
  const rooms = await $fetch('/api/rooms');
  const room = rooms.find((r) => r.id === Number(roomId));

  if (!room) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Room not found',
    });
  }

  if (room.status === 'Booked') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Room is already booked',
    });
  }

  // Simulate updating status (in-memory, not persisted)
  room.status = 'Booked';

  return {
    message: `Room booked successfully for ${checkInDate} to ${checkOutDate}!`,
  };
});