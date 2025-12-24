export interface MenuItem {
  id: string
  name: string
  price: number
  description?: string
  tag?: string
  category: string
  image?: string
}

export const menuCategories = [
  { id: "hot", name: "Hot Coffee" },
  { id: "shakes", name: "Thick Shakes" },
  { id: "iced", name: "Iced Brews" },
  { id: "snacks", name: "Snacks" },
  { id: "dessert", name: "Dessert" },
  { id: "tea", name: "Tea" },
]

export const menuItems: MenuItem[] = [
  // Hot Coffee
  { id: "hot-1", name: "Black Coffee", price: 50, category: "hot" },
  { id: "hot-2", name: "Hot Latte", price: 50, category: "hot" },
  { id: "hot-3", name: "Hot Cappuccino", price: 60, category: "hot" },
  { id: "hot-4", name: "Signature Hot Coffee", price: 60, description: "Sugar added", category: "hot" },
  { id: "hot-5", name: "Hot Chocolate", price: 70, category: "hot" },
  { id: "hot-6", name: "Hot Mocha", price: 70, category: "hot" },
  { id: "hot-7", name: "Hot Nutella", price: 80, category: "hot" },
  { id: "hot-8", name: "Hot Nutella Coffee", price: 100, category: "hot" },

  // Thick Shakes
  {
    id: "shake-1",
    name: "Brownland Cold Coffee",
    price: 110,
    tag: "Best Seller",
    category: "shakes",
    image: "/images/orange-americano.png",
  },
  { id: "shake-2", name: "Butterscotch Shake", price: 110, category: "shakes" },
  { id: "shake-3", name: "Oreo Shake", price: 130, category: "shakes" },
  { id: "shake-4", name: "Brownie Shake", price: 150, tag: "Best Seller", category: "shakes" },
  { id: "shake-5", name: "Kit-Kat Shake", price: 150, category: "shakes" },
  { id: "shake-6", name: "Lotus Biscoff Coffee Shake", price: 190, tag: "Best Seller", category: "shakes" },
  { id: "shake-7", name: "Nutella Biscoff Coffee Shake", price: 210, tag: "Best Seller", category: "shakes" },
  { id: "shake-8", name: "Try Your Own", price: 210, category: "shakes" },

  // Iced Brews
  { id: "iced-1", name: "Iced Lemon Tea", price: 80, category: "iced", image: "/images/iced-tea-sandwich.png" },
  {
    id: "iced-2",
    name: "Iced Americano",
    price: 80,
    description: "Only Coffee - No Sugar - No Milk",
    category: "iced",
  },
  { id: "iced-3", name: "Iced Peach Tea", price: 90, tag: "Best Seller", category: "iced" },
  {
    id: "iced-4",
    name: "Iced Mocha",
    price: 90,
    tag: "Best Seller",
    description: "Coffee + Chocolate",
    category: "iced",
  },
  {
    id: "iced-5",
    name: "Brownlano",
    price: 100,
    tag: "Best Seller",
    description: "Coffee + Sugar + Icecream",
    category: "iced",
  },
  {
    id: "iced-6",
    name: "Orange Americano",
    price: 120,
    description: "No sugar",
    category: "iced",
    image: "/images/orange-americano.png",
  },
  { id: "iced-7", name: "Iced Nutella Biscoff Coffee", price: 140, tag: "Best Seller", category: "iced" },

  // Snacks
  { id: "snack-1", name: "Butter Toast", price: 60, category: "snacks" },
  {
    id: "snack-2",
    name: "Cheese Corn Toast",
    price: 120,
    category: "snacks",
    image: "/images/cheese-corn-sandwich.png",
  },
  {
    id: "snack-3",
    name: "Korean Cream Cheese Bun",
    price: 120,
    category: "snacks",
    image: "/images/cream-cheese-bun.png",
  },

  // Dessert
  { id: "dessert-1", name: "Nutella Bomboloni", price: 120, tag: "Best Seller", category: "dessert" },
  { id: "dessert-2", name: "Oreo Nutella Cheese Cake", price: 200, category: "dessert" },
  { id: "dessert-3", name: "Lotus Biscoff Cheese Cake", price: 230, category: "dessert" },

  // Tea
  { id: "tea-1", name: "Honey Lemon Tea", price: 60, tag: "New", category: "tea" },
  { id: "tea-2", name: "Masala Tea", price: 60, category: "tea" },
  { id: "tea-3", name: "Hibiscus Tea", price: 90, category: "tea" },
  { id: "tea-4", name: "Turkish Tea", price: 90, category: "tea" },
]

export const outlets = [
  {
    id: "tatibandh",
    name: "Brownland Tatibandh",
    address:
      "Hirapur Rd, opposite Singhania Sarovar Portico, Sarvodaya Nagar, Brownland, Tatibandh, Raipur, Chhattisgarh 492099",
    mapLink: "https://share.google/FUGotfLwGlUxRYFxx",
  },
  {
    id: "pandri",
    name: "Brownland Pandri",
    address: "No 5, opp. gate, near police station, Sector 1, Pandri, Devendra Nagar, Raipur, Chhattisgarh 492004",
    mapLink: "https://share.google/I0bwvT76ogRLyXELX",
  },
  {
    id: "shankar-nagar",
    name: "Brownland Shankar Nagar",
    address: "L-5, Avanti Vihar, Shankar Nagar, Raipur, Chhattisgarh 492001",
    mapLink: "https://share.google/n3pH4BOrkKfQrIFFa",
  },
  {
    id: "shailendra-nagar",
    name: "Brownland Shailendra Nagar",
    address: "Behind Zudio, Old Rajendra Nagar, Shailendra Nagar, Raipur, Chhattisgarh 492001",
    mapLink: "https://share.google/xraqLmKsSSZRRzx92",
  },
]
