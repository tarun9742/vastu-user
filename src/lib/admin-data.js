
export const adminStats = [
  {
    label: "Total Revenue",
    value: 284650,
    prefix: "₹",
    change: "+12.8%",
    trend: "up",
    icon: "IndianRupee",
  },
  {
    label: "Total Orders",
    value: 486,
    change: "+8.2%",
    trend: "up",
    icon: "ShoppingBag",
  },
  {
    label: "Total Customers",
    value: 1248,
    change: "+15.4%",
    trend: "up",
    icon: "Users",
  },
  {
    label: "Pending Enquiries",
    value: 24,
    change: "Needs attention",
    trend: "neutral",
    icon: "CalendarDays",
  },
];

export const salesData = [
  { month: "May", revenue: 32500, orders: 48 },
  { month: "Jun", revenue: 41200, orders: 62 },
  { month: "Jul", revenue: 38700, orders: 55 },
  { month: "Aug", revenue: 52800, orders: 79 },
  { month: "Sep", revenue: 46900, orders: 71 },
  { month: "Oct", revenue: 72550, orders: 96 },
];

export const recentOrders = [
  {
    id: "BSV-1024",
    customer: "Aarav Sharma",
    email: "aarav@example.com",
    product: "Vastu Pyramid Set",
    amount: 2499,
    status: "Delivered",
    date: "2026-10-11",
  },
  {
    id: "BSV-1023",
    customer: "Priya Verma",
    email: "priya@example.com",
    product: "Copper Swastik",
    amount: 899,
    status: "Processing",
    date: "2026-10-11",
  },
  {
    id: "BSV-1022",
    customer: "Rohan Mehta",
    email: "rohan@example.com",
    product: "Residential Vastu Consultation",
    amount: 5100,
    status: "Pending",
    date: "2026-10-10",
  },
  {
    id: "BSV-1021",
    customer: "Ananya Gupta",
    email: "ananya@example.com",
    product: "Brass Vastu Yantra",
    amount: 1499,
    status: "Shipped",
    date: "2026-10-10",
  },
  {
    id: "BSV-1020",
    customer: "Vikram Singh",
    email: "vikram@example.com",
    product: "Commercial Vastu Consultation",
    amount: 7500,
    status: "Processing",
    date: "2026-10-09",
  },
];

export const topProducts = [
  { name: "Vastu Pyramid Set", sold: 128, revenue: 319872 },
  { name: "Copper Swastik", sold: 96, revenue: 86304 },
  { name: "Brass Vastu Yantra", sold: 74, revenue: 110926 },
  { name: "Crystal Vastu Ball", sold: 52, revenue: 41548 },
];

export const recentEnquiries = [
  {
    id: "ENQ-301",
    name: "Neha Agarwal",
    service: "Residential Vastu",
    date: "2026-10-12",
    status: "New",
  },
  {
    id: "ENQ-300",
    name: "Rahul Jain",
    service: "Commercial Vastu",
    date: "2026-10-11",
    status: "Contacted",
  },
  {
    id: "ENQ-299",
    name: "Meera Joshi",
    service: "Site Visit",
    date: "2026-10-10",
    status: "New",
  },
];

export function formatINR(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
