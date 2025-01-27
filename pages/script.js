// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
    // Close mobile menu if open
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
  skillBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    if (isElementInViewport(bar) && !bar.style.width) {
      bar.style.width = `${progress}%`;
    }
  });
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Initial check for visible skill bars
animateSkillBars();

// Animate skill bars on scroll
window.addEventListener('scroll', animateSkillBars);

// Form submission with EmailJS
const contactForm = document.getElementById('contact-form');
const buttonText = contactForm.querySelector('.button-text');
const buttonLoader = contactForm.querySelector('.button-loader');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Show loading state
  buttonText.style.opacity = '0.5';
  buttonLoader.style.display = 'inline-block';

  // Prepare template parameters
  const templateParams = {
    to_email: 'logeshmt200@gmail.com',
    from_name: document.getElementById('name').value,
    from_email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  // Send email using EmailJS
  emailjs.send(
    'YOUR_SERVICE_ID', // ⚠️ Replace with your EmailJS service ID
    'YOUR_TEMPLATE_ID', // ⚠️ Replace with your EmailJS template ID
    templateParams
  )
  .then(function() {
    // Remove any existing message
    const existingMessage = contactForm.querySelector('.success-message, .error-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Message sent successfully! I will get back to you soon.';
    contactForm.appendChild(successMessage);

    // Trigger animation
    setTimeout(() => successMessage.classList.add('show'), 10);

    // Reset form
    contactForm.reset();
  })
  .catch(function(error) {
    // Remove any existing message
    const existingMessage = contactForm.querySelector('.success-message, .error-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Show error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = 'Oops! Something went wrong. Please try again later.';
    contactForm.appendChild(errorMessage);

    // Trigger animation
    setTimeout(() => errorMessage.classList.add('show'), 10);

    console.error('EmailJS error:', error);
  })
  .finally(function() {
    // Reset button state
    buttonText.style.opacity = '1';
    buttonLoader.style.display = 'none';
  });
});