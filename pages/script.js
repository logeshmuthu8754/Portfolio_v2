// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  cursorFollower.style.left = e.clientX + 'px';
  cursorFollower.style.top = e.clientY + 'px';
});

// Typing animation
const typedTextElement = document.getElementById('typed-text');
const phrases = ['Full Stack Developer'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuBtn.classList.toggle('active');
});

// Form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };
  
  // Add your form submission logic here
  // For example, sending to an API endpoint
  
  // Show success message
  alert('Message sent successfully!');
  contactForm.reset();
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.about-card, .project-card').forEach(element => {
  observer.observe(element);
});
async function loadSkills() {
  try {


    const data = {
      "technical": [
        {
          "name": "JavaScript",
          "progress": 60,
          "icon": "💻"
        },
        {
          "name": "HTML/CSS",
          "progress": 60,
          "icon": "🎨"
        },
        {
          "name": "Node.js",
          "progress": 75,
          "icon": "⚡"
        },
        {
          "name": "SQL",
          "progress": 20,
          "icon": "📊"
        },
        {
          "name": "Git",
          "progress": 60,
          "icon": "🔄"
        }
      ],
      "soft": [
        {
          "name": "Problem Solving",
          "progress": 80,
          "icon": "🧩"
        },
        {
          "name": "Listening",
          "progress": 60,
          "icon": "🧏"
        },
        {
          "name": "Speaking",
          "progress": 60,
          "icon": "🤝"
        },
        {
          "name": "Teamwork",
          "progress": 80,
          "icon": "👥"
        }
      ]
    }
    

    const skillsContainer = document.querySelector('.skills-grid');

    // Create Technical Skills Section
    const technicalSection = createSkillSection('Technical Skills', data.technical);
    skillsContainer.appendChild(technicalSection);

    // Create Soft Skills Section
    const softSection = createSkillSection('Soft Skills', data.soft);
    skillsContainer.appendChild(softSection);

    // Observe skill items for animation
    observeSkills();
  } catch (error) {
    console.error('Error loading skills:', error);
  }
}


function createSkillSection(title, skills) {
  const section = document.createElement('div');
  section.className = 'skill-category';
  
  const heading = document.createElement('h3');
  heading.textContent = title;
  section.appendChild(heading);
  
  skills.forEach(skill => {
    const skillItem = createSkillItem(skill);
    section.appendChild(skillItem);
  });
  
  return section;
}

function createSkillItem(skill) {
  const item = document.createElement('div');
  item.className = 'skill-item';
  
  const header = document.createElement('div');
  header.className = 'skill-header';
  
  const nameContainer = document.createElement('div');
  nameContainer.className = 'skill-name';
  nameContainer.innerHTML = `
    <span class="skill-icon">${skill.icon}</span>
    <span>${skill.name}</span>
  `;
  
  const percentage = document.createElement('span');
  percentage.className = 'skill-percentage';
  percentage.textContent = `${skill.progress}%`;
  
  header.appendChild(nameContainer);
  header.appendChild(percentage);
  
  const progressContainer = document.createElement('div');
  progressContainer.className = 'skill-progress-container';
  
  const progressBar = document.createElement('div');
  progressBar.className = 'skill-progress-bar';
  progressBar.style.width = `${skill.progress}%`;
  
  progressContainer.appendChild(progressBar);
  
  item.appendChild(header);
  item.appendChild(progressContainer);
  
  return item;
}

function observeSkills() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.skill-progress-bar').forEach(bar => {
    observer.observe(bar);
  });
}

// Initialize skills when DOM is loaded
document.addEventListener('DOMContentLoaded', loadSkills);