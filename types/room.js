// Define the allowed categories as a constant array (can be used for validation if needed)
const Categories = [
  'Single Room',
  'Double Room',
  'Suite Room',
  'Family Room',
  'Deluxe Suite',
  'Presidential Suite',
  'Economy Room',
  'Luxury Room',
  'Standard Room',
  'Penthouse Suite'
];

// Example Room object structure
const exampleRoom = {
  id: '1',
  name: 'Deluxe Ocean View',
  status: 'Available', // or 'Booked'
  price: 250,
  description: 'A luxurious room with an ocean view.',
  photo: 'ocean-view.jpg',
  rating: 4.8,
  category: 'Deluxe Suite'
};
