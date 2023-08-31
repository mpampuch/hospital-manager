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
      "-2 beds \n-personal belongings storage \n-1 bathroom \n-2 IV poles \n -Privacy curtains",
  },
  {
    name: "002",
    maxCapacity: 4,
    dailyCost: 350,
    specialEquipmentCost: 25,
    image: imageUrl + "ward-002.jpg",
    description:
      "-4 beds \n-Individual reading lights \n-2 bathrooms \n-Television with cable \n-Comfortable seating area",
  },
  {
    name: "003",
    maxCapacity: 4,
    dailyCost: 300,
    specialEquipmentCost: 0,
    image: imageUrl + "ward-003.jpg",
    description:
      "-4 beds \n-Personal wardrobe \n-En-suite bathroom \n-Workspace with desk and chair \n-2 IV poles",
  },
  {
    name: "004",
    maxCapacity: 6,
    dailyCost: 500,
    specialEquipmentCost: 50,
    image: imageUrl + "ward-004.jpg",
    description:
      "-6 beds\n-Individual reading lights\n-En-suite bathroom facilities\n-Television with cable\n-Comfortable seating area",
  },
  {
    name: "005",
    maxCapacity: 6,
    dailyCost: 350,
    specialEquipmentCost: 0,
    image: imageUrl + "ward-005.jpg",
    description:
      "-6 beds\n-Individual bedside tables\n-Shared bathroom facilities\n-Workspace with desk and chair\n-Window with natural light",
  },
  {
    name: "006",
    maxCapacity: 8,
    dailyCost: 800,
    specialEquipmentCost: 100,
    image: imageUrl + "ward-006.jpg",
    description:
      "-8 beds\n-Personal lockers for belongings\n-En-suite bathroom\n-Entertainment system with streaming services\n-Comfortable lounge area",
  },
  {
    name: "007",
    maxCapacity: 8,
    dailyCost: 600,
    specialEquipmentCost: 100,
    image: imageUrl + "ward-007.jpg",
    description:
      "-8 beds\n-Personal storage space\n-Shared bathroom facilities\n-Entertainment options\n-Lounge seating for relaxation",
  },
  {
    name: "008",
    maxCapacity: 10,
    dailyCost: 1400,
    specialEquipmentCost: 1000,
    image: imageUrl + "ward-008.jpg",
    description:
      "-10 beds\n-Personal nightstands\n-10 IV poles\n-Large windows \n-Spacious and well-lit environment \nRespiratory equipment",
  },
];
