export default defineEventHandler(async (event) => {
    const rooms = [];
    const generatorRooms = (type, count, idOffset) => {
      const baseRoom = {
        'Single Room': { id: '101', name: 'Single Room', status: 'Available', price: 80, description: 'A cozy room for solo travelers.', photo: 'https://i.pinimg.com/474x/d1/39/28/d13928b81d86c22fa1bdcbd6da92baf4.jpg', rating: 4.5 },
        'Double Room': { id: '106', name: 'Double Room', status: 'Booked', price: 120, description: 'Perfect for couples with a queen bed.', photo: 'https://i.pinimg.com/474x/26/a8/f5/26a8f5d43e2d515d87d2ff3a21957716.jpg', rating: 4.7 },
        'Suite': { id: '111', name: 'Suite', status: 'Available', price: 200, description: 'Spacious suite with modern amenities.', photo: 'https://i.pinimg.com/474x/4b/ac/9b/4bac9b6565d96e8867ee0e2cf5c074a7.jpg', rating: 4.0 },
        'Family Room': { id: '116', name: 'Family Room', status: 'Available', price: 150, description: 'Roomy space for families with extra beds.', photo: 'https://i.pinimg.com/474x/38/80/98/3880987a263d258abf0c92147a707969.jpg', rating: 4.6 },
        'Deluxe Suite': { id: '121', name: 'Deluxe Suite', status: 'Booked', price: 300, description: 'Upscale suite with luxury features.', photo: 'https://i.pinimg.com/474x/98/78/cb/9878cb966173e83b5892c4152f354fff.jpg', rating: 3.0 },
        'Presidential Suite': { id: '126', name: 'Presidential Suite', status: 'Available', price: 500, description: 'A luxurious suite with panoramic views.', photo: 'https://i.pinimg.com/474x/34/f4/1e/34f41e1e0c6c74b29c6e315779dc7ca8.jpg', rating: 5.0 },
        'Economy Room': { id: '131', name: 'Economy Room', status: 'Available', price: 60, description: 'Affordable comfort with essentials.', photo: 'https://i.pinimg.com/474x/0c/31/1c/0c311c024a18ba0807893faa2367ed91.jpg', rating: 4.2 },
        'Luxury Room': { id: '136', name: 'Luxury Room', status: 'Booked', price: 250, description: 'Elegant room with high-end furnishings.', photo: 'https://i.pinimg.com/474x/7e/4d/61/7e4d6180d76735555cd4741e2df5f553.jpg', rating: 3.9 },
        'Standard Room': { id: '141', name: 'Standard Room', status: 'Available', price: 90, description: 'Simple and cozy for short stays.', photo: 'https://i.pinimg.com/474x/28/fb/ec/28fbec3be422fd862e941bafc8ea3ac1.jpg', rating: 4.1 },
        'Penthouse Suite': { id: '146', name: 'Penthouse Suite', status: 'Available', price: 700, description: 'Top-floor luxury with a private terrace.', photo: 'https://i.pinimg.com/474x/99/a3/47/99a347236f145e322259dea1bd872242.jpg', rating: 3.0 },
      }[type];
      for(let i=0; i < count; i++){
        const newRoom = { ...baseRoom};
        newRoom.id = '${parseInt(baseRoom.id) + i + idOffset}';
        newRoom.status = Math.random() < 0.5 ? 'Available' : 'Booked';
        rooms.push(newRoom);
      }
    };
    generatorRooms('Single Room', 5, 0);
    generatorRooms('Double Room', 5, 5);   
    generatorRooms('Suite', 5, 10);
    generatorRooms('Family Room', 5, 15);
    generatorRooms('Deluxe Suite', 5, 20);
    generatorRooms('Presidential Suite', 5, 25);
    generatorRooms('Economy Room', 5, 30);
    generatorRooms('Luxury Room', 5, 35);
    generatorRooms('Standard Room', 5, 40);
    generatorRooms('Penthouse Suite', 5, 45);
    return rooms
  });