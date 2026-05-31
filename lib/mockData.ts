import {
  Product,
  Community,
  Seller,
  CommunityCard,
  LocationView,
} from "../types/type-props";

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "Brand new Chevrolet",
    price: 20000000,
    images: [
      "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=500&fit=crop",
    ],
    description:
      "A sleek and modern Chevrolet with premium interiors and top performance. Perfect for city driving and long trips.",
    seller: {
      id: "seller-1",
      name: "Sarah Woods",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      connections: 1200,
      phone: "+234 123 456 7890",
    },
    rating: 4.5,
    reviews: 128,
  },
  {
    id: "2",
    title: "Apple iPhone 15 Pro",
    price: 1300000,
    images: [
      "https://images.unsplash.com/photo-1695048132981-ccf93f5b1fd7?w=500&h=500&fit=crop",
    ],
    description:
      "Latest iPhone with A17 Pro chip, titanium build, and exceptional camera quality.",
    seller: {
      id: "seller-2",
      name: "John Carter",
      avatar:
        "https://images.unsplash.com/photo-1603415526960-f7e0328b1d49?w=100&h=100&fit=crop",
      connections: 890,
      phone: "+234 801 222 4567",
    },
    rating: 4.9,
    reviews: 340,
  },
  {
    id: "3",
    title: "Nike Air Jordan Sneakers",
    price: 95000,
    images: [
      "https://images.unsplash.com/photo-1616627987423-6c57cf1a5f08?w=500&h=500&fit=crop",
    ],
    description:
      "Stylish and comfortable Air Jordan sneakers for sports and fashion lovers.",
    seller: {
      id: "seller-3",
      name: "Emily White",
      avatar:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop",
      connections: 560,
      phone: "+234 902 555 1188",
    },
    rating: 4.7,
    reviews: 210,
  },
  {
    id: "4",
    title: "Sony WH-1000XM5 Headphones",
    price: 240000,
    images: [
      "https://images.unsplash.com/photo-1596445836561-9918e04fdbb4?w=500&h=500&fit=crop",
    ],
    description:
      "Noise-cancelling wireless headphones with crystal clear sound and 30-hour battery life.",
    seller: {
      id: "seller-4",
      name: "David Lee",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      connections: 780,
      phone: "+234 811 345 2245",
    },
    rating: 4.8,
    reviews: 95,
  },
  {
    id: "5",
    title: "MacBook Air M3",
    price: 1800000,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
    ],
    description:
      "The latest MacBook Air M3 chip for ultra-fast performance and long battery life.",
    seller: {
      id: "seller-5",
      name: "Jane Doe",
      avatar:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=100&h=100&fit=crop",
      connections: 1045,
      phone: "+234 701 876 9981",
    },
    rating: 4.9,
    reviews: 410,
  },
  {
    id: "6",
    title: "Samsung QLED 65-inch Smart TV",
    price: 850000,
    images: [
      "https://images.unsplash.com/photo-1611095973518-946be1b8fdf5?w=500&h=500&fit=crop",
    ],
    description:
      "Ultra HD QLED Smart TV with vivid colors, sleek design, and smart connectivity.",
    seller: {
      id: "seller-6",
      name: "Michael Brown",
      avatar:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop",
      connections: 912,
      phone: "+234 803 445 9921",
    },
    rating: 4.6,
    reviews: 162,
  },
  {
    id: "7",
    title: "Rolex Submariner Watch",
    price: 5000000,
    images: [
      "https://images.unsplash.com/photo-1593642532400-2682810df593?w=500&h=500&fit=crop",
    ],
    description:
      "Luxury Rolex watch designed for elegance and durability. A true statement piece.",
    seller: {
      id: "seller-7",
      name: "Alexander Scott",
      avatar:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop",
      connections: 1340,
      phone: "+234 802 678 3345",
    },
    rating: 4.8,
    reviews: 70,
  },
  {
    id: "8",
    title: "Canon EOS R5 Camera",
    price: 2100000,
    images: [
      "https://images.unsplash.com/photo-1519183071298-a2962be90b8e?w=500&h=500&fit=crop",
    ],
    description:
      "Professional-grade camera with 8K video recording and 45MP full-frame sensor.",
    seller: {
      id: "seller-8",
      name: "Olivia Green",
      avatar:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&h=100&fit=crop",
      connections: 635,
      phone: "+234 909 112 3399",
    },
    rating: 4.9,
    reviews: 228,
  },
  {
    id: "9",
    title: "Tesla Model 3",
    price: 35000000,
    images: [
      "https://images.unsplash.com/photo-1549924231-f129b911e442?w=500&h=500&fit=crop",
    ],
    description:
      "Electric car with autopilot, premium interiors, and long-range battery performance.",
    seller: {
      id: "seller-9",
      name: "Chris Evans",
      avatar:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop",
      connections: 1580,
      phone: "+234 808 111 7878",
    },
    rating: 4.9,
    reviews: 500,
  },
  {
    id: "10",
    title: "Gucci Leather Handbag",
    price: 600000,
    images: [
      "https://images.unsplash.com/photo-1593032465171-8a34917a319e?w=500&h=500&fit=crop",
    ],
    description:
      "Premium Italian-made Gucci leather handbag perfect for formal and casual outings.",
    seller: {
      id: "seller-10",
      name: "Sophia Turner",
      avatar:
        "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=100&h=100&fit=crop",
      connections: 1020,
      phone: "+234 706 999 2210",
    },
    rating: 4.7,
    reviews: 85,
  },
];

export const mockCommunities: Community[] = [
  {
    id: "1",
    name: "Lekki",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    description: "Connect with people in Lekki",
    members: 565300,
    comments: 565300,
    lastMessage: "3:03pm",
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: "2",
    name: "Festac",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    description: "Connect with people in Festac",
    members: 234100,
    comments: 234100,
    lastMessage: "3:03pm",
    isOnline: true,
  },
  {
    id: "3",
    name: "Ikorodu",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    description: "Connect with people in Ikorodu",
    members: 127900,
    comments: 127900,
    lastMessage: "3:03pm",
    isOnline: true,
  },
  {
    id: "4",
    name: "Ikeja",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    description: "Connect with people in Ikeja",
    members: 954200,
    comments: 954200,
    lastMessage: "3:03pm",
    isOnline: true,
  },
  {
    id: "5",
    name: "Badagry",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    description: "Connect with people in Badagry",
    members: 9300,
    comments: 9300,
    lastMessage: "3:03pm",
    isOnline: true,
  },
  {
    id: "6",
    name: "Victoria Island",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    description: "Connect with people in Victoria Island",
    members: 20004,
    comments: 20004,
    lastMessage: "3:03pm",
    isOnline: true,
  },
  {
    id: "7",
    name: "Lagos Island",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    description: "Connect with people in Lagos Island",
    members: 2300500,
    comments: 2300500,
    lastMessage: "3:03pm",
    isOnline: true,
  },
  {
    id: "8",
    name: "Amuwo Odofin",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    description: "Connect with people in Amuwo Odofin",
    members: 150000,
    comments: 150000,
    lastMessage: "3:03pm",
    isOnline: true,
  },
];

export const mockCommunityCards: {
  id: string;
  name: string;
  description: string;
  members: string[];
  conversationCount: number;
}[] = [
  {
    id: "1",
    name: "Festac",
    description: "Connect with people in lekki",
    members: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    ],
    conversationCount: 10,
  },
  {
    id: "2",
    name: "Lekki",
    description: "Connect with people in lekki",
    members: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    ],
    conversationCount: 10,
  },
  {
    id: "3",
    name: "Ajah",
    description: "Connect with people in lekki",
    members: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    ],
    conversationCount: 10,
  },
  {
    id: "4",
    name: "Ikorodu",
    description: "Connect with people in lekki",
    members: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    ],
    conversationCount: 10,
  },
  {
    id: "5",
    name: "Ikeja",
    description: "Connect with people in lekki",
    members: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    ],
    conversationCount: 10,
  },
  {
    id: "6",
    name: "Abule-Egba",
    description: "Connect with people in lekki",
    members: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    ],
    conversationCount: 10,
  },
  {
    id: "7",
    name: "Badagry",
    description: "Connect with people in lekki",
    members: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    ],
    conversationCount: 10,
  },
  {
    id: "8",
    name: "V.I",
    description: "Connect with people in lekki",
    members: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    ],
    conversationCount: 10,
  },
];

export const mockLocationView: LocationView = {
  id: "1",
  name: "Lekki",
  image:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
  stats: {
    community: "150k",
    connection: "325k",
    trends: "325k",
  },
  communities: [
    { name: "Lekki", count: "150k" },
    { name: "Yaba", count: "250k" },
    { name: "Lagos Island", count: "300k" },
    { name: "Ikorodu", count: "110k" },
    { name: "Ikoyi-Victoria Island", count: "612k" },
  ],
};

export const mockSellerProfile = {
  id: "seller-1",
  name: "David Adeleke",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  connections: 500,
  bio: "Hi! I am David, I really like traveling to really different countries, most often I am looking for flats that have very friendly landlords in a good location.",
  location: "Lagos, Nigeria",
  phone: "+234 123 456 7890",
  posts: [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=200&h=200&fit=crop",
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=200&h=200&fit=crop",
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=200&h=200&fit=crop",
    },
    {
      id: "7",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
    },
    {
      id: "8",
      image:
        "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=200&h=200&fit=crop",
    },
    {
      id: "9",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
    },
  ],
};



export const countries = [
  { "name": "Afghanistan", "slug": "afghanistan", "code": "AF", "currencyCode": "AFN", "currencySign": "؋" },
  { "name": "Albania", "slug": "albania", "code": "AL", "currencyCode": "ALL", "currencySign": "L" },
  { "name": "Algeria", "slug": "algeria", "code": "DZ", "currencyCode": "DZD", "currencySign": "د.ج" },
  { "name": "Andorra", "slug": "andorra", "code": "AD", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Angola", "slug": "angola", "code": "AO", "currencyCode": "AOA", "currencySign": "Kz" },
  { "name": "Antigua and Barbuda", "slug": "antigua-and-barbuda", "code": "AG", "currencyCode": "XCD", "currencySign": "$" },
  { "name": "Argentina", "slug": "argentina", "code": "AR", "currencyCode": "ARS", "currencySign": "$" },
  { "name": "Armenia", "slug": "armenia", "code": "AM", "currencyCode": "AMD", "currencySign": "֏" },
  { "name": "Australia", "slug": "australia", "code": "AU", "currencyCode": "AUD", "currencySign": "$" },
  { "name": "Austria", "slug": "austria", "code": "AT", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Azerbaijan", "slug": "azerbaijan", "code": "AZ", "currencyCode": "AZN", "currencySign": "₼" },
  { "name": "Bahamas", "slug": "bahamas", "code": "BS", "currencyCode": "BSD", "currencySign": "$" },
  { "name": "Bahrain", "slug": "bahrain", "code": "BH", "currencyCode": "BHD", "currencySign": "ب.د" },
  { "name": "Bangladesh", "slug": "bangladesh", "code": "BD", "currencyCode": "BDT", "currencySign": "৳" },
  { "name": "Barbados", "slug": "barbados", "code": "BB", "currencyCode": "BBD", "currencySign": "$" },
  { "name": "Belarus", "slug": "belarus", "code": "BY", "currencyCode": "BYN", "currencySign": "Br" },
  { "name": "Belgium", "slug": "belgium", "code": "BE", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Belize", "slug": "belize", "code": "BZ", "currencyCode": "BZD", "currencySign": "$" },
  { "name": "Benin", "slug": "benin", "code": "BJ", "currencyCode": "XOF", "currencySign": "Fr" },
  { "name": "Bhutan", "slug": "bhutan", "code": "BT", "currencyCode": "BTN", "currencySign": "Nu." },
  { "name": "Bolivia", "slug": "bolivia", "code": "BO", "currencyCode": "BOB", "currencySign": "Bs." },
  { "name": "Bosnia and Herzegovina", "slug": "bosnia-and-herzegovina", "code": "BA", "currencyCode": "BAM", "currencySign": "KM" },
  { "name": "Botswana", "slug": "botswana", "code": "BW", "currencyCode": "BWP", "currencySign": "P" },
  { "name": "Brazil", "slug": "brazil", "code": "BR", "currencyCode": "BRL", "currencySign": "R$" },
  { "name": "Brunei", "slug": "brunei", "code": "BN", "currencyCode": "BND", "currencySign": "$" },
  { "name": "Bulgaria", "slug": "bulgaria", "code": "BG", "currencyCode": "BGN", "currencySign": "лв" },
  { "name": "Burkina Faso", "slug": "burkina-faso", "code": "BF", "currencyCode": "XOF", "currencySign": "Fr" },
  { "name": "Burundi", "slug": "burundi", "code": "BI", "currencyCode": "BIF", "currencySign": "Fr" },
  { "name": "Cambodia", "slug": "cambodia", "code": "KH", "currencyCode": "KHR", "currencySign": "៛" },
  { "name": "Cameroon", "slug": "cameroon", "code": "CM", "currencyCode": "XAF", "currencySign": "Fr" },
  { "name": "Canada", "slug": "canada", "code": "CA", "currencyCode": "CAD", "currencySign": "$" },
  { "name": "Cape Verde", "slug": "cape-verde", "code": "CV", "currencyCode": "CVE", "currencySign": "$" },
  { "name": "Central African Republic", "slug": "central-african-republic", "code": "CF", "currencyCode": "XAF", "currencySign": "Fr" },
  { "name": "Chad", "slug": "chad", "code": "TD", "currencyCode": "XAF", "currencySign": "Fr" },
  { "name": "Chile", "slug": "chile", "code": "CL", "currencyCode": "CLP", "currencySign": "$" },
  { "name": "China", "slug": "china", "code": "CN", "currencyCode": "CNY", "currencySign": "¥" },
  { "name": "Colombia", "slug": "colombia", "code": "CO", "currencyCode": "COP", "currencySign": "$" },
  { "name": "Comoros", "slug": "comoros", "code": "KM", "currencyCode": "KMF", "currencySign": "Fr" },
  { "name": "Congo", "slug": "congo", "code": "CG", "currencyCode": "XAF", "currencySign": "Fr" },
  { "name": "Costa Rica", "slug": "costa-rica", "code": "CR", "currencyCode": "CRC", "currencySign": "₡" },
  { "name": "Croatia", "slug": "croatia", "code": "HR", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Cuba", "slug": "cuba", "code": "CU", "currencyCode": "CUP", "currencySign": "$" },
  { "name": "Cyprus", "slug": "cyprus", "code": "CY", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Czech Republic", "slug": "czech-republic", "code": "CZ", "currencyCode": "CZK", "currencySign": "Kč" },
  { "name": "Democratic Republic of the Congo", "slug": "democratic-republic-of-the-congo", "code": "CD", "currencyCode": "CDF", "currencySign": "Fr" },
  { "name": "Denmark", "slug": "denmark", "code": "DK", "currencyCode": "DKK", "currencySign": "kr" },
  { "name": "Djibouti", "slug": "djibouti", "code": "DJ", "currencyCode": "DJF", "currencySign": "Fr" },
  { "name": "Dominica", "slug": "dominica", "code": "DM", "currencyCode": "XCD", "currencySign": "$" },
  { "name": "Dominican Republic", "slug": "dominican-republic", "code": "DO", "currencyCode": "DOP", "currencySign": "$" },
  { "name": "East Timor", "slug": "east-timor", "code": "TL", "currencyCode": "USD", "currencySign": "$" },
  { "name": "Ecuador", "slug": "ecuador", "code": "EC", "currencyCode": "USD", "currencySign": "$" },
  { "name": "Egypt", "slug": "egypt", "code": "EG", "currencyCode": "EGP", "currencySign": "£" },
  { "name": "El Salvador", "slug": "el-salvador", "code": "SV", "currencyCode": "USD", "currencySign": "$" },
  { "name": "Equatorial Guinea", "slug": "equatorial-guinea", "code": "GQ", "currencyCode": "XAF", "currencySign": "Fr" },
  { "name": "Eritrea", "slug": "eritrea", "code": "ER", "currencyCode": "ERN", "currencySign": "Nfk" },
  { "name": "Estonia", "slug": "estonia", "code": "EE", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Eswatini", "slug": "eswatini", "code": "SZ", "currencyCode": "SZL", "currencySign": "L" },
  { "name": "Ethiopia", "slug": "ethiopia", "code": "ET", "currencyCode": "ETB", "currencySign": "Br" },
  { "name": "Fiji", "slug": "fiji", "code": "FJ", "currencyCode": "FJD", "currencySign": "$" },
  { "name": "Finland", "slug": "finland", "code": "FI", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "France", "slug": "france", "code": "FR", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Gabon", "slug": "gabon", "code": "GA", "currencyCode": "XAF", "currencySign": "Fr" },
  { "name": "Gambia", "slug": "gambia", "code": "GM", "currencyCode": "GMD", "currencySign": "D" },
  { "name": "Georgia", "slug": "georgia", "code": "GE", "currencyCode": "GEL", "currencySign": "₾" },
  { "name": "Germany", "slug": "germany", "code": "DE", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Ghana", "slug": "ghana", "code": "GH", "currencyCode": "GHS", "currencySign": "₵" },
  { "name": "Greece", "slug": "greece", "code": "GR", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Grenada", "slug": "grenada", "code": "GD", "currencyCode": "XCD", "currencySign": "$" },
  { "name": "Guatemala", "slug": "guatemala", "code": "GT", "currencyCode": "GTQ", "currencySign": "Q" },
  { "name": "Guinea", "slug": "guinea", "code": "GN", "currencyCode": "GNF", "currencySign": "Fr" },
  { "name": "Guinea-Bissau", "slug": "guinea-bissau", "code": "GW", "currencyCode": "XOF", "currencySign": "Fr" },
  { "name": "Guyana", "slug": "guyana", "code": "GY", "currencyCode": "GYD", "currencySign": "$" },
  { "name": "Haiti", "slug": "haiti", "code": "HT", "currencyCode": "HTG", "currencySign": "G" },
  { "name": "Honduras", "slug": "honduras", "code": "HN", "currencyCode": "HNL", "currencySign": "L" },
  { "name": "Hungary", "slug": "hungary", "code": "HU", "currencyCode": "HUF", "currencySign": "Ft" },
  { "name": "Iceland", "slug": "iceland", "code": "IS", "currencyCode": "ISK", "currencySign": "kr" },
  { "name": "India", "slug": "india", "code": "IN", "currencyCode": "INR", "currencySign": "₹" },
  { "name": "Indonesia", "slug": "indonesia", "code": "ID", "currencyCode": "IDR", "currencySign": "Rp" },
  { "name": "Iran", "slug": "iran", "code": "IR", "currencyCode": "IRR", "currencySign": "﷼" },
  { "name": "Iraq", "slug": "iraq", "code": "IQ", "currencyCode": "IQD", "currencySign": "ع.د" },
  { "name": "Ireland", "slug": "ireland", "code": "IE", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Israel", "slug": "israel", "code": "IL", "currencyCode": "ILS", "currencySign": "₪" },
  { "name": "Italy", "slug": "italy", "code": "IT", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Ivory Coast", "slug": "ivory-coast", "code": "CI", "currencyCode": "XOF", "currencySign": "Fr" },
  { "name": "Jamaica", "slug": "jamaica", "code": "JM", "currencyCode": "JMD", "currencySign": "$" },
  { "name": "Japan", "slug": "japan", "code": "JP", "currencyCode": "JPY", "currencySign": "¥" },
  { "name": "Jordan", "slug": "jordan", "code": "JO", "currencyCode": "JOD", "currencySign": "د.ا" },
  { "name": "Kazakhstan", "slug": "kazakhstan", "code": "KZ", "currencyCode": "KZT", "currencySign": "₸" },
  { "name": "Kenya", "slug": "kenya", "code": "KE", "currencyCode": "KES", "currencySign": "KSh" },
  { "name": "Kiribati", "slug": "kiribati", "code": "KI", "currencyCode": "AUD", "currencySign": "$" },
  { "name": "Kosovo", "slug": "kosovo", "code": "XK", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Kuwait", "slug": "kuwait", "code": "KW", "currencyCode": "KWD", "currencySign": "د.ك" },
  { "name": "Kyrgyzstan", "slug": "kyrgyzstan", "code": "KG", "currencyCode": "KGS", "currencySign": "с" },
  { "name": "Laos", "slug": "laos", "code": "LA", "currencyCode": "LAK", "currencySign": "₭" },
  { "name": "Latvia", "slug": "latvia", "code": "LV", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Lebanon", "slug": "lebanon", "code": "LB", "currencyCode": "LBP", "currencySign": "ل.ل" },
  { "name": "Lesotho", "slug": "lesotho", "code": "LS", "currencyCode": "LSL", "currencySign": "L" },
  { "name": "Liberia", "slug": "liberia", "code": "LR", "currencyCode": "LRD", "currencySign": "$" },
  { "name": "Libya", "slug": "libya", "code": "LY", "currencyCode": "LYD", "currencySign": "ل.د" },
  { "name": "Liechtenstein", "slug": "liechtenstein", "code": "LI", "currencyCode": "CHF", "currencySign": "Fr" },
  { "name": "Lithuania", "slug": "lithuania", "code": "LT", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Luxembourg", "slug": "luxembourg", "code": "LU", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Madagascar", "slug": "madagascar", "code": "MG", "currencyCode": "MGA", "currencySign": "Ar" },
  { "name": "Malawi", "slug": "malawi", "code": "MW", "currencyCode": "MWK", "currencySign": "MK" },
  { "name": "Malaysia", "slug": "malaysia", "code": "MY", "currencyCode": "MYR", "currencySign": "RM" },
  { "name": "Maldives", "slug": "maldives", "code": "MV", "currencyCode": "MVR", "currencySign": "Rf" },
  { "name": "Mali", "slug": "mali", "code": "ML", "currencyCode": "XOF", "currencySign": "Fr" },
  { "name": "Malta", "slug": "malta", "code": "MT", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Marshall Islands", "slug": "marshall-islands", "code": "MH", "currencyCode": "USD", "currencySign": "$" },
  { "name": "Mauritania", "slug": "mauritania", "code": "MR", "currencyCode": "MRU", "currencySign": "UM" },
  { "name": "Mauritius", "slug": "mauritius", "code": "MU", "currencyCode": "MUR", "currencySign": "₨" },
  { "name": "Mexico", "slug": "mexico", "code": "MX", "currencyCode": "MXN", "currencySign": "$" },
  { "name": "Micronesia", "slug": "micronesia", "code": "FM", "currencyCode": "USD", "currencySign": "$" },
  { "name": "Moldova", "slug": "moldova", "code": "MD", "currencyCode": "MDL", "currencySign": "L" },
  { "name": "Monaco", "slug": "monaco", "code": "MC", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Mongolia", "slug": "mongolia", "code": "MN", "currencyCode": "MNT", "currencySign": "₮" },
  { "name": "Montenegro", "slug": "montenegro", "code": "ME", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Morocco", "slug": "morocco", "code": "MA", "currencyCode": "MAD", "currencySign": "د.م." },
  { "name": "Mozambique", "slug": "mozambique", "code": "MZ", "currencyCode": "MZN", "currencySign": "MT" },
  { "name": "Myanmar", "slug": "myanmar", "code": "MM", "currencyCode": "MMK", "currencySign": "K" },
  { "name": "Namibia", "slug": "namibia", "code": "NA", "currencyCode": "NAD", "currencySign": "$" },
  { "name": "Nauru", "slug": "nauru", "code": "NR", "currencyCode": "AUD", "currencySign": "$" },
  { "name": "Nepal", "slug": "nepal", "code": "NP", "currencyCode": "NPR", "currencySign": "₨" },
  { "name": "Netherlands", "slug": "netherlands", "code": "NL", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "New Zealand", "slug": "new-zealand", "code": "NZ", "currencyCode": "NZD", "currencySign": "$" },
  { "name": "Nicaragua", "slug": "nicaragua", "code": "NI", "currencyCode": "NIO", "currencySign": "C$" },
  { "name": "Niger", "slug": "niger", "code": "NE", "currencyCode": "XOF", "currencySign": "Fr" },
  { "name": "Nigeria", "slug": "nigeria", "code": "NG", "currencyCode": "NGN", "currencySign": "₦" },
  { "name": "North Korea", "slug": "north-korea", "code": "KP", "currencyCode": "KPW", "currencySign": "₩" },
  { "name": "North Macedonia", "slug": "north-macedonia", "code": "MK", "currencyCode": "MKD", "currencySign": "ден" },
  { "name": "Norway", "slug": "norway", "code": "NO", "currencyCode": "NOK", "currencySign": "kr" },
  { "name": "Oman", "slug": "oman", "code": "OM", "currencyCode": "OMR", "currencySign": "ر.ع." },
  { "name": "Pakistan", "slug": "pakistan", "code": "PK", "currencyCode": "PKR", "currencySign": "₨" },
  { "name": "Palau", "slug": "palau", "code": "PW", "currencyCode": "USD", "currencySign": "$" },
  { "name": "Palestine", "slug": "palestine", "code": "PS", "currencyCode": "ILS", "currencySign": "₪" },
  { "name": "Panama", "slug": "panama", "code": "PA", "currencyCode": "PAB", "currencySign": "B/." },
  { "name": "Papua New Guinea", "slug": "papua-new-guinea", "code": "PG", "currencyCode": "PGK", "currencySign": "K" },
  { "name": "Paraguay", "slug": "paraguay", "code": "PY", "currencyCode": "PYG", "currencySign": "₲" },
  { "name": "Peru", "slug": "peru", "code": "PE", "currencyCode": "PEN", "currencySign": "S/" },
  { "name": "Philippines", "slug": "philippines", "code": "PH", "currencyCode": "PHP", "currencySign": "₱" },
  { "name": "Poland", "slug": "poland", "code": "PL", "currencyCode": "PLN", "currencySign": "zł" },
  { "name": "Portugal", "slug": "portugal", "code": "PT", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Qatar", "slug": "qatar", "code": "QA", "currencyCode": "QAR", "currencySign": "ر.ق" },
  { "name": "Romania", "slug": "romania", "code": "RO", "currencyCode": "RON", "currencySign": "lei" },
  { "name": "Russia", "slug": "russia", "code": "RU", "currencyCode": "RUB", "currencySign": "₽" },
  { "name": "Rwanda", "slug": "rwanda", "code": "RW", "currencyCode": "RWF", "currencySign": "Fr" },
  { "name": "Saint Kitts and Nevis", "slug": "saint-kitts-and-nevis", "code": "KN", "currencyCode": "XCD", "currencySign": "$" },
  { "name": "Saint Lucia", "slug": "saint-lucia", "code": "LC", "currencyCode": "XCD", "currencySign": "$" },
  { "name": "Saint Vincent and the Grenadines", "slug": "saint-vincent-and-the-grenadines", "code": "VC", "currencyCode": "XCD", "currencySign": "$" },
  { "name": "Samoa", "slug": "samoa", "code": "WS", "currencyCode": "WST", "currencySign": "T" },
  { "name": "San Marino", "slug": "san-marino", "code": "SM", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Sao Tome and Principe", "slug": "sao-tome-and-principe", "code": "ST", "currencyCode": "STN", "currencySign": "Db" },
  { "name": "Saudi Arabia", "slug": "saudi-arabia", "code": "SA", "currencyCode": "SAR", "currencySign": "ر.س" },
  { "name": "Senegal", "slug": "senegal", "code": "SN", "currencyCode": "XOF", "currencySign": "Fr" },
  { "name": "Serbia", "slug": "serbia", "code": "RS", "currencyCode": "RSD", "currencySign": "дин" },
  { "name": "Seychelles", "slug": "seychelles", "code": "SC", "currencyCode": "SCR", "currencySign": "₨" },
  { "name": "Sierra Leone", "slug": "sierra-leone", "code": "SL", "currencyCode": "SLL", "currencySign": "Le" },
  { "name": "Singapore", "slug": "singapore", "code": "SG", "currencyCode": "SGD", "currencySign": "$" },
  { "name": "Slovakia", "slug": "slovakia", "code": "SK", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Slovenia", "slug": "slovenia", "code": "SI", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Solomon Islands", "slug": "solomon-islands", "code": "SB", "currencyCode": "SBD", "currencySign": "$" },
  { "name": "Somalia", "slug": "somalia", "code": "SO", "currencyCode": "SOS", "currencySign": "Sh" },
  { "name": "South Africa", "slug": "south-africa", "code": "ZA", "currencyCode": "ZAR", "currencySign": "R" },
  { "name": "South Korea", "slug": "south-korea", "code": "KR", "currencyCode": "KRW", "currencySign": "₩" },
  { "name": "South Sudan", "slug": "south-sudan", "code": "SS", "currencyCode": "SSP", "currencySign": "£" },
  { "name": "Spain", "slug": "spain", "code": "ES", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Sri Lanka", "slug": "sri-lanka", "code": "LK", "currencyCode": "LKR", "currencySign": "Rs" },
  { "name": "Sudan", "slug": "sudan", "code": "SD", "currencyCode": "SDG", "currencySign": "ج.س." },
  { "name": "Suriname", "slug": "suriname", "code": "SR", "currencyCode": "SRD", "currencySign": "$" },
  { "name": "Sweden", "slug": "sweden", "code": "SE", "currencyCode": "SEK", "currencySign": "kr" },
  { "name": "Switzerland", "slug": "switzerland", "code": "CH", "currencyCode": "CHF", "currencySign": "Fr" },
  { "name": "Syria", "slug": "syria", "code": "SY", "currencyCode": "SYP", "currencySign": "£" },
  { "name": "Taiwan", "slug": "taiwan", "code": "TW", "currencyCode": "TWD", "currencySign": "NT$" },
  { "name": "Tajikistan", "slug": "tajikistan", "code": "TJ", "currencyCode": "TJS", "currencySign": "ЅМ" },
  { "name": "Tanzania", "slug": "tanzania", "code": "TZ", "currencyCode": "TZS", "currencySign": "Sh" },
  { "name": "Thailand", "slug": "thailand", "code": "TH", "currencyCode": "THB", "currencySign": "฿" },
  { "name": "Togo", "slug": "togo", "code": "TG", "currencyCode": "XOF", "currencySign": "Fr" },
  { "name": "Tonga", "slug": "tonga", "code": "TO", "currencyCode": "TOP", "currencySign": "T$" },
  { "name": "Trinidad and Tobago", "slug": "trinidad-and-tobago", "code": "TT", "currencyCode": "TTD", "currencySign": "$" },
  { "name": "Tunisia", "slug": "tunisia", "code": "TN", "currencyCode": "TND", "currencySign": "د.ت" },
  { "name": "Turkey", "slug": "turkey", "code": "TR", "currencyCode": "TRY", "currencySign": "₺" },
  { "name": "Turkmenistan", "slug": "turkmenistan", "code": "TM", "currencyCode": "TMT", "currencySign": "m" },
  { "name": "Tuvalu", "slug": "tuvalu", "code": "TV", "currencyCode": "AUD", "currencySign": "$" },
  { "name": "Uganda", "slug": "uganda", "code": "UG", "currencyCode": "UGX", "currencySign": "Sh" },
  { "name": "Ukraine", "slug": "ukraine", "code": "UA", "currencyCode": "UAH", "currencySign": "₴" },
  { "name": "United Arab Emirates", "slug": "united-arab-emirates", "code": "AE", "currencyCode": "AED", "currencySign": "د.إ" },
  { "name": "United Kingdom", "slug": "united-kingdom", "code": "GB", "currencyCode": "GBP", "currencySign": "£" },
  { "name": "United States", "slug": "united-states", "code": "US", "currencyCode": "USD", "currencySign": "$" },
  { "name": "Uruguay", "slug": "uruguay", "code": "UY", "currencyCode": "UYU", "currencySign": "$" },
  { "name": "Uzbekistan", "slug": "uzbekistan", "code": "UZ", "currencyCode": "UZS", "currencySign": "so'm" },
  { "name": "Vanuatu", "slug": "vanuatu", "code": "VU", "currencyCode": "VUV", "currencySign": "Vt" },
  { "name": "Vatican City", "slug": "vatican-city", "code": "VA", "currencyCode": "EUR", "currencySign": "€" },
  { "name": "Venezuela", "slug": "venezuela", "code": "VE", "currencyCode": "VES", "currencySign": "Bs." },
  { "name": "Vietnam", "slug": "vietnam", "code": "VN", "currencyCode": "VND", "currencySign": "₫" },
  { "name": "Yemen", "slug": "yemen", "code": "YE", "currencyCode": "YER", "currencySign": "﷼" },
  { "name": "Zambia", "slug": "zambia", "code": "ZM", "currencyCode": "ZMW", "currencySign": "ZK" },
  { "name": "Zimbabwe", "slug": "zimbabwe", "code": "ZW", "currencyCode": "ZWL", "currencySign": "$" }
]
