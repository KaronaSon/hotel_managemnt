export default defineEventHandler(async (event) => {
    const id = Number(event.context.params.id);
  
    // Fetch all rooms (in a real app, query a database directly)
    const rooms = await $fetch('/api/rooms');
    const room = rooms.find((r) => r.id === id);
  
    if (!room) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Room not found',
      });
    }
  
    return room;
  });