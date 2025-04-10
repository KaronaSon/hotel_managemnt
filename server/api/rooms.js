export default defineEventHandler(async (event) => {
    const rooms = [
      { id: '101', name: 'Single Room', status: 'Available', price: 80, description: 'A cozy room for solo travelers.', photo: 'https://i.pinimg.com/474x/d1/39/28/d13928b81d86c22fa1bdcbd6da92baf4.jpg' },
      { id: '102', name: 'Double Room', status: 'Booked', price: 120, description: 'Perfect for couples with a queen bed.', photo: 'https://i.pinimg.com/474x/26/a8/f5/26a8f5d43e2d515d87d2ff3a21957716.jpg' },
      { id: '103', name: 'Suite', status: 'Available', price: 200, description: 'Spacious suite with modern amenities.', photo: 'https://i.pinimg.com/474x/4b/ac/9b/4bac9b6565d96e8867ee0e2cf5c074a7.jpg' },
      { id: '104', name: 'Family Room', status: 'Available', price: 150, description: 'Roomy space for families with extra beds.', photo: 'https://i.pinimg.com/474x/38/80/98/3880987a263d258abf0c92147a707969.jpg' },
      { id: '105', name: 'Deluxe Suite', status: 'Booked', price: 300, description: 'Upscale suite with luxury features.', photo: 'https://i.pinimg.com/474x/98/78/cb/9878cb966173e83b5892c4152f354fff.jpg' },
      { id: '106', name: 'Presidential Suite', status: 'Available', price: 500, description: 'A luxurious suite with panoramic views.', photo: 'https://i.pinimg.com/474x/34/f4/1e/34f41e1e0c6c74b29c6e315779dc7ca8.jpg' },
      { id: '107', name: 'Economy Room', status: 'Available', price: 60, description: 'Affordable comfort with essentials.', photo: 'https://i.pinimg.com/474x/0c/31/1c/0c311c024a18ba0807893faa2367ed91.jpg' },
      { id: '108', name: 'Luxury Room', status: 'Booked', price: 250, description: 'Elegant room with high-end furnishings.', photo: 'https://i.pinimg.com/474x/7e/4d/61/7e4d6180d76735555cd4741e2df5f553.jpg' },
      { id: '109', name: 'Standard Room', status: 'Available', price: 90, description: 'Simple and cozy for short stays.', photo: 'https://i.pinimg.com/474x/28/fb/ec/28fbec3be422fd862e941bafc8ea3ac1.jpg' },
      { id: '110', name: 'Penthouse Suite', status: 'Available', price: 700, description: 'Top-floor luxury with a private terrace.', photo: 'https://i.pinimg.com/474x/99/a3/47/99a347236f145e322259dea1bd872242.jpg' },
      { id: '111', name: 'Ocean View Room', status: 'Available', price: 180, description: 'Relax with stunning ocean vistas.', photo: 'https://i.pinimg.com/474x/22/2f/71/222f71c49dd5a4692274ce6b7c1a9c8e.jpg' },
      { id: '112', name: 'Mountain View Room', status: 'Booked', price: 220, description: 'Scenic views of the mountains.', photo: 'https://i.pinimg.com/474x/bb/35/c7/bb35c7916894bf99e370bcfee41c7988.jpg' },
      { id: '113', name: 'Garden View Room', status: 'Available', price: 110, description: 'Peaceful room overlooking the garden.', photo: 'https://i.pinimg.com/474x/2e/73/6d/2e736d69f743d58b2f6ad89f2bc6bcda.jpg' },
      { id: '114', name: 'Business Suite', status: 'Available', price: 350, description: 'Spacious suite with a work desk.', photo: 'https://i.pinimg.com/736x/13/59/dc/1359dc86de0dc16054ee62a4bea7efc1.jpg' },
      { id: '115', name: 'Honeymoon Suite', status: 'Booked', price: 400, description: 'Romantic retreat with a jacuzzi.', photo: 'https://i.pinimg.com/474x/0a/03/77/0a0377f64bc1bbba4e0bf6762e5ef9fb.jpg' },
    ]
    return rooms
  })