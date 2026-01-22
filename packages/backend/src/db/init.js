import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import sqlite3 from "sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "shophub.db");
const schemaPath = path.join(__dirname, "schema.sql");

function getDb() {
  sqlite3.verbose();
  return new sqlite3.Database(dbPath);
}

function runMigrations(db) {
  const schemaSql = fs.readFileSync(schemaPath, "utf-8");
  return new Promise((resolve, reject) => {
    db.exec(schemaSql, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

function seedProducts(db) {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      image:
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&auto=format",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop&auto=format",
    },
    {
      id: 3,
      name: "Laptop Stand",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&auto=format",
    },
    {
      id: 4,
      name: "Mechanical Keyboard",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop&auto=format",
    },
    {
      id: 5,
      name: "Wireless Mouse",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&auto=format",
    },
    {
      id: 6,
      name: "USB-C Hub",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop&auto=format",
    },
    {
      id: 7,
      name: "LED Monitor",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&auto=format",
    },
    {
      id: 8,
      name: "Webcam HD",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&auto=format",
    },
  ];

  const placeholders = products
    .map(() => "(?, ?, ?, ?, ?, ?, ?, ?)")
    .join(", ");

  const sql = `
    INSERT OR IGNORE INTO products
      (id, name, price, image, description, stock, created_at, updated_at)
    VALUES ${placeholders}
  `;

  const now = new Date().toISOString();
  const params = [];
  for (const p of products) {
    params.push(
      p.id,
      p.name,
      p.price,
      p.image,
      null,
      100,
      now,
      now
    );
  }

  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

// =============================================
// SALON SEED DATA
// =============================================

function seedSalonServices(db) {
  const services = [
    { id: 1, name: "Haircut & Styling", description: "Professional haircuts and styling for all hair types. Our expert stylists will help you achieve the perfect look.", price: 45, duration: 45, image: "https://plus.unsplash.com/premium_photo-1661963320607-aebac6fcb40d?w=600&h=400&fit=crop", category: "hair" },
    { id: 2, name: "Hair Coloring", description: "Expert color services including highlights, balayage, ombre, and full color transformations.", price: 120, duration: 120, image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=400&fit=crop", category: "hair" },
    { id: 3, name: "Hair Treatment", description: "Deep conditioning, keratin treatments, and repair services for healthy, lustrous hair.", price: 65, duration: 60, image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=400&fit=crop", category: "hair" },
    { id: 4, name: "Manicure & Pedicure", description: "Luxury nail care including gel polish, nail art, and spa treatments for hands and feet.", price: 40, duration: 60, image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=400&fit=crop", category: "nails" },
    { id: 5, name: "Facial Treatment", description: "Rejuvenating facial treatments customized for your skin type. Includes cleansing, exfoliation, and hydration.", price: 80, duration: 75, image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&h=400&fit=crop", category: "skin" },
    { id: 6, name: "Bridal Package", description: "Complete bridal beauty package including hair, makeup, and spa treatments for your special day.", price: 350, duration: 240, image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop", category: "special" },
    { id: 7, name: "Beard Trim & Styling", description: "Professional beard grooming, shaping, and styling for the modern gentleman.", price: 25, duration: 30, image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=400&fit=crop", category: "hair" },
    { id: 8, name: "Makeup Application", description: "Professional makeup for any occasion - from natural looks to glamorous evening styles.", price: 75, duration: 60, image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop", category: "makeup" },
  ];

  const sql = `INSERT OR IGNORE INTO salon_services (id, name, description, price, duration, image, category) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  return Promise.all(services.map(s =>
    new Promise((resolve, reject) => {
      db.run(sql, [s.id, s.name, s.description, s.price, s.duration, s.image, s.category], err => err ? reject(err) : resolve());
    })
  ));
}

function seedSalonTeam(db) {
  const team = [
    { id: 1, name: "Isabella Martinez", role: "Master Stylist & Founder", bio: "With over 15 years of experience, Isabella has transformed thousands of clients. Trained in Paris and Milan, she specializes in precision cuts and color artistry.", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop", specialties: "Color Correction, Balayage, Bridal", experience_years: 15 },
    { id: 2, name: "Marcus Chen", role: "Senior Colorist", bio: "Marcus is our color wizard, known for his stunning balayage and creative color transformations. His work has been featured in major fashion magazines.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", specialties: "Balayage, Ombre, Fashion Colors", experience_years: 10 },
    { id: 3, name: "Sophia Williams", role: "Hair Stylist", bio: "Sophia brings energy and creativity to every appointment. She excels at modern cuts and updos, making her a favorite for special events.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", specialties: "Updos, Modern Cuts, Extensions", experience_years: 7 },
    { id: 4, name: "Emma Thompson", role: "Nail Artist", bio: "Emma is a certified nail technician with an artistic flair. From classic manicures to intricate nail art, she creates miniature masterpieces.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop", specialties: "Nail Art, Gel Extensions, Spa Treatments", experience_years: 5 },
    { id: 5, name: "David Kim", role: "Esthetician", bio: "David specializes in advanced skincare treatments. His gentle approach and expertise in facial rejuvenation have earned him a loyal clientele.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop", specialties: "Facials, Chemical Peels, Microdermabrasion", experience_years: 8 },
    { id: 6, name: "Olivia Brown", role: "Makeup Artist", bio: "Olivia is a certified makeup artist with experience in bridal, editorial, and special effects makeup. She brings visions to life.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop", specialties: "Bridal Makeup, Editorial, Contouring", experience_years: 6 },
  ];

  const sql = `INSERT OR IGNORE INTO salon_team (id, name, role, bio, image, specialties, experience_years) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  return Promise.all(team.map(t =>
    new Promise((resolve, reject) => {
      db.run(sql, [t.id, t.name, t.role, t.bio, t.image, t.specialties, t.experience_years], err => err ? reject(err) : resolve());
    })
  ));
}

function seedSalonGallery(db) {
  const gallery = [
    { id: 1, title: "Elegant Updo", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=600&fit=crop", category: "updo" },
    { id: 2, title: "Balayage Magic", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=600&fit=crop", category: "color" },
    { id: 3, title: "Color Transformation", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop", category: "color" },
    { id: 4, title: "Bridal Style", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop", category: "bridal" },
    { id: 5, title: "Modern Cut", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&h=600&fit=crop", category: "cut" },
    { id: 6, title: "Glamour Look", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop", category: "styling" },
    { id: 7, title: "Natural Waves", image: "https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=600&h=600&fit=crop", category: "styling" },
    { id: 8, title: "Bold Color", image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=600&fit=crop", category: "color" },
  ];

  const sql = `INSERT OR IGNORE INTO salon_gallery (id, title, image, category) VALUES (?, ?, ?, ?)`;

  return Promise.all(gallery.map(g =>
    new Promise((resolve, reject) => {
      db.run(sql, [g.id, g.title, g.image, g.category], err => err ? reject(err) : resolve());
    })
  ));
}

function seedSalonReviews(db) {
  const reviews = [
    { id: 1, name: "Jennifer L.", rating: 5, comment: "Absolutely love my new hair color! Isabella is a true artist. The salon atmosphere is so relaxing.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
    { id: 2, name: "Michael R.", rating: 5, comment: "Best haircut I've ever had. Marcus really understood what I wanted and delivered perfectly.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    { id: 3, name: "Sarah M.", rating: 5, comment: "The bridal package was incredible! Sophia made me feel like a princess on my wedding day.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    { id: 4, name: "Amanda K.", rating: 4, comment: "Great experience overall. The facial treatment left my skin glowing for days!", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
  ];

  const sql = `INSERT OR IGNORE INTO salon_reviews (id, name, rating, comment, image) VALUES (?, ?, ?, ?, ?)`;

  return Promise.all(reviews.map(r =>
    new Promise((resolve, reject) => {
      db.run(sql, [r.id, r.name, r.rating, r.comment, r.image], err => err ? reject(err) : resolve());
    })
  ));
}

// =============================================
// HOMECARE SEED DATA
// =============================================

function seedHomecareServices(db) {
  const services = [
    { id: 1, name: "Personal Care Assistance", description: "Comprehensive help with daily activities including bathing, grooming, dressing, and medication reminders. Our caregivers ensure dignity and comfort.", features: "Bathing & Hygiene,Mobility Assistance,Medication Management,Toileting Support", image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&h=400&fit=crop", icon: "user" },
    { id: 2, name: "Medical Support", description: "Skilled nursing care and health monitoring for chronic conditions, post-surgery recovery, and ongoing medical needs.", features: "Health Monitoring,Vital Signs Check,Wound Care,IV Management", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop", icon: "heart-pulse" },
    { id: 3, name: "Companionship", description: "Meaningful social interaction and emotional support to combat loneliness. We provide friendship, conversation, and engaging activities.", features: "Conversation & Activities,Emotional Support,Safety Monitoring,Social Engagement", image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop", icon: "heart" },
    { id: 4, name: "Meal Preparation", description: "Nutritious meal planning and preparation based on dietary requirements, preferences, and medical restrictions.", features: "Meal Planning,Dietary Restrictions,Grocery Shopping,Kitchen Safety", image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&h=400&fit=crop", icon: "utensils" },
    { id: 5, name: "Housekeeping", description: "Light housekeeping services to maintain a clean, safe, and comfortable living environment for our clients.", features: "Light Cleaning,Laundry Services,Organization,Errands", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&h=400&fit=crop", icon: "home" },
    { id: 6, name: "Transportation", description: "Safe and reliable transportation to medical appointments, social activities, shopping, and family visits.", features: "Medical Appointments,Shopping Trips,Social Activities,Family Visits", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop", icon: "car" },
    { id: 7, name: "Respite Care", description: "Temporary relief for family caregivers. We step in so you can rest, knowing your loved one is in good hands.", features: "Short-term Care,Flexible Scheduling,Emergency Coverage,Weekend Care", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop", icon: "bed" },
    { id: 8, name: "Alzheimer's & Dementia Care", description: "Specialized care for clients with memory conditions. Our trained caregivers provide safe, patient, and compassionate support.", features: "Memory Care,Safety Supervision,Routine Maintenance,Family Support", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop", icon: "brain" },
  ];

  const sql = `INSERT OR IGNORE INTO homecare_services (id, name, description, features, image, icon) VALUES (?, ?, ?, ?, ?, ?)`;

  return Promise.all(services.map(s =>
    new Promise((resolve, reject) => {
      db.run(sql, [s.id, s.name, s.description, s.features, s.image, s.icon], err => err ? reject(err) : resolve());
    })
  ));
}

function seedHomecareCaregivers(db) {
  const caregivers = [
    { id: 1, name: "Sarah Johnson", role: "Registered Nurse", bio: "Sarah has over 12 years of experience in home healthcare. She specializes in chronic disease management, wound care, and post-surgical recovery. Her compassionate approach has earned her countless commendations from families.", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop", certifications: "RN License,CPR/BLS Certified,Wound Care Specialist,IV Therapy", experience_years: 12, rating: 4.9 },
    { id: 2, name: "Michael Chen", role: "Certified Nursing Assistant", bio: "Michael brings warmth and professionalism to every client interaction. With expertise in personal care and mobility assistance, he helps clients maintain their independence and dignity.", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop", certifications: "CNA Certified,First Aid,Dementia Care,Mobility Training", experience_years: 8, rating: 4.8 },
    { id: 3, name: "Emily Rodriguez", role: "Home Health Aide", bio: "Emily is dedicated to providing excellent care with a focus on dignity and respect. She excels at creating meaningful connections with clients and their families.", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop", certifications: "HHA Certified,CPR Certified,Alzheimer's Training,Hospice Care", experience_years: 6, rating: 4.9 },
    { id: 4, name: "James Wilson", role: "Physical Therapy Assistant", bio: "James helps clients regain mobility and strength through personalized exercise programs. His encouraging attitude motivates clients to achieve their rehabilitation goals.", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop", certifications: "PTA License,CPR/BLS,Gait Training,Fall Prevention", experience_years: 10, rating: 4.7 },
    { id: 5, name: "Maria Santos", role: "Companion Caregiver", bio: "Maria specializes in providing emotional support and companionship. She believes in the healing power of genuine human connection and engaging activities.", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop", certifications: "Companion Care,First Aid,Dementia Friendly,Bilingual", experience_years: 5, rating: 5.0 },
    { id: 6, name: "Robert Taylor", role: "Licensed Practical Nurse", bio: "Robert combines clinical expertise with a caring bedside manner. He specializes in medication management and vital signs monitoring for complex cases.", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop", certifications: "LPN License,IV Certified,Medication Management,Diabetes Care", experience_years: 15, rating: 4.8 },
  ];

  const sql = `INSERT OR IGNORE INTO homecare_caregivers (id, name, role, bio, image, certifications, experience_years, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  return Promise.all(caregivers.map(c =>
    new Promise((resolve, reject) => {
      db.run(sql, [c.id, c.name, c.role, c.bio, c.image, c.certifications, c.experience_years, c.rating], err => err ? reject(err) : resolve());
    })
  ));
}

function seedHomecareTestimonials(db) {
  const testimonials = [
    { id: 1, name: "Margaret Thompson", relation: "Client", rating: 5, comment: "CareComfort has been a blessing for our family. Sarah takes such wonderful care of my mother - she's become like family to us.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
    { id: 2, name: "David Miller", relation: "Son of Client", rating: 5, comment: "After my father's surgery, we didn't know how we'd manage. The team at CareComfort made his recovery smooth and stress-free.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    { id: 3, name: "Linda Garcia", relation: "Daughter of Client", rating: 5, comment: "The companionship care for my mom has been incredible. Maria brings so much joy to her days. I'm forever grateful.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    { id: 4, name: "Robert Chen", relation: "Spouse of Client", rating: 4, comment: "Professional, compassionate, and reliable. CareComfort helped us navigate a difficult time with grace and expertise.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
  ];

  const sql = `INSERT OR IGNORE INTO homecare_testimonials (id, name, relation, rating, comment, image) VALUES (?, ?, ?, ?, ?, ?)`;

  return Promise.all(testimonials.map(t =>
    new Promise((resolve, reject) => {
      db.run(sql, [t.id, t.name, t.relation, t.rating, t.comment, t.image], err => err ? reject(err) : resolve());
    })
  ));
}

export async function initDb() {
  const db = getDb();
  try {
    await runMigrations(db);

    // Seed e-commerce data
    await seedProducts(db);

    // Seed salon data
    await seedSalonServices(db);
    await seedSalonTeam(db);
    await seedSalonGallery(db);
    await seedSalonReviews(db);

    // Seed homecare data
    await seedHomecareServices(db);
    await seedHomecareCaregivers(db);
    await seedHomecareTestimonials(db);

    console.log("Database initialized and all data seeded (products, salon, homecare).");
  } catch (err) {
    console.error("Database initialization failed:", err);
    throw err;
  } finally {
    db.close();
  }
}

// Allow running as a script: `node src/db/init.js`
if (import.meta.url === `file://${process.argv[1]}`) {
  initDb().catch(() => process.exit(1));
}


