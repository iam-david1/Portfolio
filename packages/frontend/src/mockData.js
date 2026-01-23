// Mock data for demo mode - no backend required

export const mockProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format",
    description: "Premium wireless headphones with noise cancellation and 30-hour battery life.",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop&auto=format",
    description: "Advanced smartwatch with health tracking, GPS, and always-on display.",
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1596347909571-2f249cfdbb0a?w=900&auto=format&fit=crop&q=60",
    description: "Ergonomic aluminum laptop stand for better posture and cooling.",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop&auto=format",
    description: "RGB mechanical keyboard with Cherry MX switches and programmable keys.",
  },
  {
    id: 5,
    name: "Wireless Mouse",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&auto=format",
    description: "Ergonomic wireless mouse with precision tracking and long battery life.",
  },
  {
    id: 6,
    name: "USB-C Hub",
    price: 79.99,
    image: "https://plus.unsplash.com/premium_photo-1759495106759-c709f52a5f23?w=900&auto=format&fit=crop&q=60",
    description: "7-in-1 USB-C hub with HDMI, USB 3.0 ports, and SD card reader.",
  },
  {
    id: 7,
    name: "4K Monitor",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400&h=400&fit=crop&auto=format",
    description: "27-inch 4K UHD monitor with HDR support and ultra-thin bezels.",
  },
  {
    id: 8,
    name: "HD Webcam",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1623949556303-b0d17d198863?w=900&auto=format&fit=crop&q=60",
    description: "1080p HD webcam with auto-focus, built-in mic, and privacy cover.",
  },
];

export const mockSalonServices = [
  { id: 1, name: "Haircut & Styling", description: "Professional haircuts and styling for all hair types. Our expert stylists will help you achieve the perfect look.", price: 45, duration: 45, image: "https://plus.unsplash.com/premium_photo-1661963320607-aebac6fcb40d?w=600&h=400&fit=crop", category: "hair" },
  { id: 2, name: "Hair Coloring", description: "Expert color services including highlights, balayage, ombre, and full color transformations.", price: 120, duration: 120, image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=400&fit=crop", category: "hair" },
  { id: 3, name: "Hair Treatment", description: "Deep conditioning, keratin treatments, and repair services for healthy, lustrous hair.", price: 65, duration: 60, image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=400&fit=crop", category: "hair" },
  { id: 4, name: "Manicure & Pedicure", description: "Luxury nail care including gel polish, nail art, and spa treatments for hands and feet.", price: 40, duration: 60, image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=400&fit=crop", category: "nails" },
  { id: 5, name: "Facial Treatment", description: "Rejuvenating facial treatments customized for your skin type. Includes cleansing, exfoliation, and hydration.", price: 80, duration: 75, image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&h=400&fit=crop", category: "skin" },
  { id: 6, name: "Bridal Package", description: "Complete bridal beauty package including hair, makeup, and spa treatments for your special day.", price: 350, duration: 240, image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop", category: "special" },
];

export const mockSalonTeam = [
  { id: 1, name: "Isabella Martinez", role: "Master Stylist & Founder", bio: "With over 15 years of experience, Isabella has transformed thousands of clients.", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop", specialties: ["Color Correction", "Balayage", "Bridal"], experience_years: 15 },
  { id: 2, name: "Marcus Chen", role: "Senior Colorist", bio: "Marcus is our color wizard, known for his stunning balayage and creative color transformations.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", specialties: ["Balayage", "Ombre", "Fashion Colors"], experience_years: 10 },
  { id: 3, name: "Sophia Williams", role: "Hair Stylist", bio: "Sophia brings energy and creativity to every appointment. She excels at modern cuts and updos.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", specialties: ["Updos", "Modern Cuts", "Extensions"], experience_years: 7 },
  { id: 4, name: "Emma Thompson", role: "Nail Artist", bio: "Emma is a certified nail technician with an artistic flair for creating miniature masterpieces.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop", specialties: ["Nail Art", "Gel Extensions", "Spa Treatments"], experience_years: 5 },
];

export const mockSalonGallery = [
  { id: 1, title: "Elegant Updo", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=600&fit=crop", category: "updo" },
  { id: 2, title: "Balayage Magic", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=600&fit=crop", category: "color" },
  { id: 3, title: "Color Transformation", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop", category: "color" },
  { id: 4, title: "Bridal Style", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop", category: "bridal" },
  { id: 5, title: "Modern Cut", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&h=600&fit=crop", category: "cut" },
  { id: 6, title: "Glamour Look", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop", category: "styling" },
  { id: 7, title: "Natural Waves", image: "https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=600&h=600&fit=crop", category: "styling" },
  { id: 8, title: "Bold Color", image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=600&fit=crop", category: "color" },
];

export const mockSalonReviews = [
  { id: 1, name: "Jennifer L.", rating: 5, comment: "Absolutely love my new hair color! Isabella is a true artist. The salon atmosphere is so relaxing.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
  { id: 2, name: "Michael R.", rating: 5, comment: "Best haircut I've ever had. Marcus really understood what I wanted and delivered perfectly.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { id: 3, name: "Sarah M.", rating: 5, comment: "The bridal package was incredible! Sophia made me feel like a princess on my wedding day.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
  { id: 4, name: "Amanda K.", rating: 4, comment: "Great experience overall. The facial treatment left my skin glowing for days!", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
];

export const mockSalonStats = {
  happyClients: 5000,
  yearsExperience: 15,
  stylists: 12,
  services: 25,
};

export const mockHomecareServices = [
  { id: 1, name: "Personal Care Assistance", description: "Comprehensive help with daily activities including bathing, grooming, dressing, and medication reminders.", features: ["Bathing & Hygiene", "Mobility Assistance", "Medication Management", "Toileting Support"], image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&h=400&fit=crop", icon: "user" },
  { id: 2, name: "Medical Support", description: "Skilled nursing care and health monitoring for chronic conditions, post-surgery recovery, and ongoing medical needs.", features: ["Health Monitoring", "Vital Signs Check", "Wound Care", "IV Management"], image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop", icon: "heart-pulse" },
  { id: 3, name: "Companionship", description: "Meaningful social interaction and emotional support to combat loneliness.", features: ["Conversation & Activities", "Emotional Support", "Safety Monitoring", "Social Engagement"], image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop", icon: "heart" },
  { id: 4, name: "Meal Preparation", description: "Nutritious meal planning and preparation based on dietary requirements and preferences.", features: ["Meal Planning", "Dietary Restrictions", "Grocery Shopping", "Kitchen Safety"], image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&h=400&fit=crop", icon: "utensils" },
  { id: 5, name: "Housekeeping", description: "Light housekeeping services to maintain a clean, safe, and comfortable living environment.", features: ["Light Cleaning", "Laundry Services", "Organization", "Errands"], image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&h=400&fit=crop", icon: "home" },
  { id: 6, name: "Transportation", description: "Safe and reliable transportation to medical appointments, social activities, and shopping.", features: ["Medical Appointments", "Shopping Trips", "Social Activities", "Family Visits"], image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop", icon: "car" },
];

export const mockHomecareCaregivers = [
  { id: 1, name: "Sarah Johnson", role: "Registered Nurse", bio: "Sarah has over 12 years of experience in home healthcare. She specializes in chronic disease management and wound care.", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop", certifications: ["RN License", "CPR/BLS Certified", "Wound Care Specialist"], experience_years: 12, rating: 4.9 },
  { id: 2, name: "Michael Chen", role: "Certified Nursing Assistant", bio: "Michael brings warmth and professionalism to every client interaction with expertise in personal care.", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop", certifications: ["CNA Certified", "First Aid", "Dementia Care"], experience_years: 8, rating: 4.8 },
  { id: 3, name: "Emily Rodriguez", role: "Home Health Aide", bio: "Emily is dedicated to providing excellent care with a focus on dignity and respect.", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop", certifications: ["HHA Certified", "CPR Certified", "Alzheimer's Training"], experience_years: 6, rating: 4.9 },
];

export const mockHomecareTestimonials = [
  { id: 1, name: "Margaret Thompson", relation: "Client", rating: 5, comment: "CareComfort has been a blessing for our family. Sarah takes such wonderful care of my mother.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
  { id: 2, name: "David Miller", relation: "Son of Client", rating: 5, comment: "After my father's surgery, the team at CareComfort made his recovery smooth and stress-free.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { id: 3, name: "Linda Garcia", relation: "Daughter of Client", rating: 5, comment: "The companionship care for my mom has been incredible. Maria brings so much joy to her days.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
];

export const mockHomecareStats = {
  familiesServed: 2500,
  yearsExperience: 15,
  caregivers: 50,
  services: 12,
};

export const mockHomecareFeatures = [
  { id: 1, title: "Licensed & Insured", description: "Fully licensed agency with comprehensive insurance coverage for your peace of mind.", icon: "shield-check" },
  { id: 2, title: "24/7 Availability", description: "Round-the-clock support and care services whenever you need them.", icon: "clock" },
  { id: 3, title: "Background Checked", description: "All caregivers undergo thorough background checks and verification.", icon: "lock" },
  { id: 4, title: "Personalized Care Plans", description: "Customized care plans designed around your specific needs and preferences.", icon: "clipboard" },
  { id: 5, title: "Qualified Staff", description: "Certified and trained professionals with verified credentials.", icon: "user-check" },
  { id: 6, title: "Flexible Scheduling", description: "Adaptable scheduling options to fit your lifestyle and requirements.", icon: "calendar" },
];
