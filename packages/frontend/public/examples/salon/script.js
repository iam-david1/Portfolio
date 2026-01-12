// Set minimum date to today
const dateInput = document.querySelector('input[type="date"]');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Booking Form Handler
document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const service = e.target.querySelector('select').value;
    const date = e.target.querySelector('input[type="date"]').value;
    const time = e.target.querySelectorAll('select')[1].value;
    
    // Format date
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Show confirmation
    const serviceNames = {
        'haircut': 'Haircut & Styling',
        'coloring': 'Hair Coloring',
        'treatment': 'Hair Treatment',
        'manicure': 'Manicure & Pedicure',
        'facial': 'Facial Treatment',
        'bridal': 'Bridal Package'
    };
    
    alert(`✅ Appointment Booked Successfully!\n\n` +
          `Service: ${serviceNames[service]}\n` +
          `Date: ${formattedDate}\n` +
          `Time: ${time}\n\n` +
          `We'll send a confirmation email shortly!`);
    
    e.target.reset();
    dateInput.setAttribute('min', today);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Gallery hover effects
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});


