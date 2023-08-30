import { supabaseUrl } from "../services/supabase";

const imageUrl = `${supabaseUrl}/storage/v1/object/public/ward-images/`;

export const wards = [
  {
    name: "001",
    maxCapacity: 2,
    dailyCost: 250,
    specialEquipmentCost: 0,
    image: imageUrl + "ward-001.jpg",
    description:
      "Discover a comfortable and serene hospital room in Ward 001. Designed for patients seeking a peaceful and healing environment. Inside, you will find modern amenities to make your stay comfortable, including a cozy bed, a seating area for visitors, and a private bathroom. Rest assured, our top priority is your well-being and recovery.",
  },
  {
    name: "002",
    maxCapacity: 2,
    dailyCost: 350,
    specialEquipmentCost: 25,
    image: imageUrl + "ward-002.jpg",
    description:
      "Experience the healing power of nature in Ward 002. Perfect for patients looking for a tranquil and supportive atmosphere during their recovery. Inside, you will find a comfortable bed, a soothing ambiance, and a private bathroom. We prioritize your comfort and well-being to ensure a smooth recovery journey.",
  },
  {
    name: "003",
    maxCapacity: 4,
    dailyCost: 300,
    specialEquipmentCost: 0,
    image: imageUrl + "ward-003.jpg",
    description:
      "Discover family-friendly accommodations in Ward 003. Designed for patients and their families, this spacious room can comfortably accommodate up to 4 people. Inside, you will find modern amenities, including comfortable beds, a seating area, and a private bathroom. We are committed to providing a supportive environment for your recovery.",
  },
  {
    name: "004",
    maxCapacity: 4,
    dailyCost: 500,
    specialEquipmentCost: 50,
    image: imageUrl + "ward-004.jpg",
    description:
      "Indulge in comfort during your recovery in Ward 004. This spacious room is designed for families and patients seeking a luxurious and supportive environment. Inside, you will find opulent interiors, comfortable beds, a seating area, and a private bathroom with spa-inspired features. Your well-being is our top priority, and we aim to make your recovery as comfortable as possible.",
  },
  {
    name: "005",
    maxCapacity: 6,
    dailyCost: 350,
    specialEquipmentCost: 0,
    image: imageUrl + "ward-005.jpg",
    description:
      "Experience a peaceful and rejuvenating recovery in Ward 005. Designed for patients and their extended families, this spacious room can accommodate up to 6 people. Inside, you will find comfortable beds, a cozy seating area, and a private bathroom. We are dedicated to creating a healing environment for you and your loved ones.",
  },
  {
    name: "006",
    maxCapacity: 6,
    dailyCost: 800,
    specialEquipmentCost: 100,
    image: imageUrl + "ward-006.jpg",
    description:
      "Embrace luxury and comfort during your recovery in Ward 006. This spacious room offers opulent interiors, comfortable beds, a grand seating area, and a private bathroom with spa-like features. Whether you're recovering alone or with your family, we are committed to providing you with the best possible care and support.",
  },
  {
    name: "007",
    maxCapacity: 8,
    dailyCost: 600,
    specialEquipmentCost: 100,
    image: imageUrl + "ward-007.jpg",
    description:
      "Accommodate your large group or extended family in the spacious and comfortable Ward 007. Designed to comfortably fit up to 8 people, this room offers a supportive environment for all. Inside, you will find comfortable beds, multiple seating areas, and a private bathroom. Your well-being and comfort are our top priorities during your recovery.",
  },
  {
    name: "008",
    maxCapacity: 10,
    dailyCost: 1400,
    specialEquipmentCost: 0,
    image: imageUrl + "ward-008.jpg",
    description:
      "Experience the height of comfort and luxury in Ward 008. This grand room is designed to cater to your every need and desire during your recovery. Inside, you will find spacious living areas, a formal dining area, a gourmet kitchen, plush beds, and en-suite spa-inspired bathrooms. Step outside to your private deck and immerse yourself in the beauty of nature, featuring a luxurious hot tub and ample seating areas for ultimate relaxation and enjoyment.",
  },
];
