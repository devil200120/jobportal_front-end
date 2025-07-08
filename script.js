// Enhanced Neumorphic JavaScript with Advanced Interactions
'use strict';

// Neumorphic DOM Elements
const NeumorphicDOM = {
  // Navigation
  navbar: document.getElementById('navbar'),
  mobileToggle: document.getElementById('mobileToggle'),
  navMenu: document.getElementById('navMenu'),
  navLinks: document.querySelectorAll('.nav-link-neumorphic'),
  
  // Buttons
  loginBtn: document.getElementById('loginBtn'),
  hireNowBtn: document.getElementById('hireNowBtn'),
  startHiringBtn: document.getElementById('startHiringBtn'),
  jobSearchBtn: document.getElementById('jobSearchBtn'),
  
  // Modals
  authModal: document.getElementById('authModal'),
  recruiterModal: document.getElementById('recruiterModal'),
  closeModal: document.getElementById('closeModal'),
  closeRecruiterModal: document.getElementById('closeRecruiterModal'),
  
  // Forms
  loginForm: document.getElementById('loginForm'),
  signupForm: document.getElementById('signupForm'),
  showSignup: document.getElementById('showSignup'),
  showLogin: document.getElementById('showLogin'),
  contactForm: document.getElementById('contactForm'),
  
  // Footer links
  jobSeekerSignup: document.getElementById('jobSeekerSignup'),
  recruiterSignup: document.getElementById('recruiterSignup'),
  
  // Other elements
  statCards: document.querySelectorAll('.stat-card-neumorphic'),
  serviceCards: document.querySelectorAll('.service-card-neumorphic'),
  achievementCards: document.querySelectorAll('.achievement-card-neumorphic')
};

// Neumorphic Navigation System
class NeumorphicNavigation {
  constructor() {
    this.isMenuOpen = false;
    this.init();
  }

  init() {
    this.setupMobileToggle();
    this.setupNavLinks();
    this.setupScrollEffects();
    this.setupActiveLinks();
  }

  setupMobileToggle() {
    if (NeumorphicDOM.mobileToggle) {
      NeumorphicDOM.mobileToggle.addEventListener('click', () => {
        this.toggleMenu();
      });
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    if (NeumorphicDOM.navMenu) {
      NeumorphicDOM.navMenu.classList.toggle('active');
    }
    
    if (NeumorphicDOM.mobileToggle) {
      NeumorphicDOM.mobileToggle.classList.toggle('active');
    }
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  setupNavLinks() {
    NeumorphicDOM.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Handle internal navigation
        if (href.startsWith('#')) {
          e.preventDefault();
          this.scrollToSection(href);
          this.setActiveLink(link);
          
          // Close mobile menu if open
          if (this.isMenuOpen) {
            this.toggleMenu();
          }
        }
      });
    });
  }

  scrollToSection(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
      const navHeight = NeumorphicDOM.navbar.offsetHeight;
      const targetPosition = target.offsetTop - navHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  setActiveLink(activeLink) {
    NeumorphicDOM.navLinks.forEach(link => {
      link.classList.remove('active');
    });
    activeLink.classList.add('active');
  }

  setupScrollEffects() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      // Add/remove scrolled class
      if (currentScrollY > 50) {
        NeumorphicDOM.navbar.classList.add('scrolled');
      } else {
        NeumorphicDOM.navbar.classList.remove('scrolled');
      }
      
      // Hide/show navbar on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        NeumorphicDOM.navbar.style.transform = 'translateY(-100%)';
      } else {
        NeumorphicDOM.navbar.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
      
      // Update active link based on scroll position
      this.updateActiveLinksOnScroll();
    });
  }

  setupActiveLinks() {
    // Set initial active link
    const currentHash = window.location.hash || '#home';
    const activeLink = document.querySelector(`a[href="${currentHash}"]`);
    if (activeLink) {
      this.setActiveLink(activeLink);
    }
  }

  updateActiveLinksOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navHeight = NeumorphicDOM.navbar.offsetHeight;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const scrollPosition = window.scrollY;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        const correspondingLink = document.querySelector(`a[href="#${section.id}"]`);
        if (correspondingLink) {
          this.setActiveLink(correspondingLink);
        }
      }
    });
  }
}

// Modal System
class NeumorphicModal {
  constructor() {
    this.activeModal = null;
    this.init();
  }

  init() {
    this.setupModalTriggers();
    this.setupModalClosers();
    this.setupAuthFormSwitching();
    this.setupUserTypeSelector();
    this.setupPasswordToggles();
    this.setupOutsideClick();
  }

  setupModalTriggers() {
    // Login button
    if (NeumorphicDOM.loginBtn) {
      NeumorphicDOM.loginBtn.addEventListener('click', () => {
        this.openModal('authModal');
        this.showLoginForm();
      });
    }

    // Hire now button
    if (NeumorphicDOM.hireNowBtn) {
      NeumorphicDOM.hireNowBtn.addEventListener('click', () => {
        this.openModal('recruiterModal');
      });
    }

    // Start hiring button
    if (NeumorphicDOM.startHiringBtn) {
      NeumorphicDOM.startHiringBtn.addEventListener('click', () => {
        this.openModal('recruiterModal');
      });
    }

    // Footer signup links
    if (NeumorphicDOM.jobSeekerSignup) {
      NeumorphicDOM.jobSeekerSignup.addEventListener('click', (e) => {
        e.preventDefault();
        this.openModal('authModal');
        this.showSignupForm('candidate');
      });
    }

    if (NeumorphicDOM.recruiterSignup) {
      NeumorphicDOM.recruiterSignup.addEventListener('click', (e) => {
        e.preventDefault();
        this.openModal('authModal');
        this.showSignupForm('recruiter');
      });
    }
  }

  setupModalClosers() {
    // Close auth modal
    if (NeumorphicDOM.closeModal) {
      NeumorphicDOM.closeModal.addEventListener('click', () => {
        this.closeModal('authModal');
      });
    }

    // Close recruiter modal
    if (NeumorphicDOM.closeRecruiterModal) {
      NeumorphicDOM.closeRecruiterModal.addEventListener('click', () => {
        this.closeModal('recruiterModal');
      });
    }

    // ESC key handler
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.closeModal(this.activeModal);
      }
    });
  }

  setupOutsideClick() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay-neumorphic') && this.activeModal) {
        this.closeModal(this.activeModal);
      }
    });
  }

  setupAuthFormSwitching() {
    if (NeumorphicDOM.showSignup) {
      NeumorphicDOM.showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        this.showSignupForm();
      });
    }

    if (NeumorphicDOM.showLogin) {
      NeumorphicDOM.showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        this.showLoginForm();
      });
    }
  }

  setupUserTypeSelector() {
    const userTypeOptions = document.querySelectorAll('.user-type-option-neumorphic');
    userTypeOptions.forEach(option => {
      option.addEventListener('click', () => {
        userTypeOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
      });
    });
  }

  setupPasswordToggles() {
    const passwordToggles = document.querySelectorAll('.password-toggle-neumorphic');
    passwordToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const input = toggle.previousElementSibling;
        const icon = toggle.querySelector('i');
        
        if (input.type === 'password') {
          input.type = 'text';
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
        } else {
          input.type = 'password';
          icon.classList.remove('fa-eye-slash');
          icon.classList.add('fa-eye');
        }
      });
    });
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      this.activeModal = modalId;
      document.body.style.overflow = 'hidden';
      
      // Add entrance animation
      setTimeout(() => {
        const container = modal.querySelector('.modal-container-neumorphic');
        if (container) {
          container.style.transform = 'scale(1) translateY(0)';
        }
      }, 10);
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      this.activeModal = null;
      document.body.style.overflow = '';
    }
  }

  showLoginForm() {
    if (NeumorphicDOM.loginForm && NeumorphicDOM.signupForm) {
      NeumorphicDOM.loginForm.style.display = 'block';
      NeumorphicDOM.signupForm.style.display = 'none';
    }
  }

  showSignupForm(userType = 'candidate') {
    if (NeumorphicDOM.loginForm && NeumorphicDOM.signupForm) {
      NeumorphicDOM.loginForm.style.display = 'none';
      NeumorphicDOM.signupForm.style.display = 'block';
      
      // Set user type
      const userTypeOptions = document.querySelectorAll('.user-type-option-neumorphic');
      userTypeOptions.forEach(option => {
        option.classList.remove('active');
        if (option.dataset.type === userType) {
          option.classList.add('active');
        }
      });
    }
  }
}

// Form Validation System
class NeumorphicFormValidator {
  constructor() {
    this.init();
  }

  init() {
    this.setupFormValidation();
    this.setupRealTimeValidation();
  }

  setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.validateForm(form);
      });
    });
  }

  setupRealTimeValidation() {
    const inputs = document.querySelectorAll('.form-input-neumorphic');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });
      
      input.addEventListener('input', () => {
        this.clearFieldError(input);
      });
    });
  }

  validateForm(form) {
    const inputs = form.querySelectorAll('.form-input-neumorphic[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    if (isValid) {
      this.handleFormSubmission(form);
    }
  }

  validateField(input) {
    const value = input.value.trim();
    const type = input.type;
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (input.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }
    
    // Email validation
    else if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }
    
    // Password validation
    else if (type === 'password' && value) {
      if (value.length < 8) {
        isValid = false;
        errorMessage = 'Password must be at least 8 characters long';
      }
    }
    
    // Phone validation
    else if (type === 'tel' && value) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(value.replace(/\s/g, ''))) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }
    
    this.displayFieldValidation(input, isValid, errorMessage);
    return isValid;
  }

  displayFieldValidation(input, isValid, errorMessage) {
    const wrapper = input.closest('.form-group-neumorphic');
    let errorElement = wrapper.querySelector('.field-error-neumorphic');
    
    // Remove existing error message
    if (errorElement) {
      errorElement.remove();
    }
    
    // Remove validation classes
    input.classList.remove('error', 'success');
    
    if (!isValid) {
      input.classList.add('error');
      
      // Add error message
      errorElement = document.createElement('div');
      errorElement.className = 'field-error-neumorphic error-neumorphic';
      errorElement.textContent = errorMessage;
      wrapper.appendChild(errorElement);
    } else if (input.value.trim()) {
      input.classList.add('success');
    }
  }

  clearFieldError(input) {
    const wrapper = input.closest('.form-group-neumorphic');
    const errorElement = wrapper.querySelector('.field-error-neumorphic');
    
    if (errorElement) {
      errorElement.remove();
    }
    
    input.classList.remove('error');
  }

  handleFormSubmission(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    this.showLoadingState(submitButton);
    
    // Simulate API call
    setTimeout(() => {
      this.hideLoadingState(submitButton);
      this.showNotification('Success!', 'Form submitted successfully', 'success');
      
      // Close modal if form is in modal
      const modal = form.closest('.modal-overlay-neumorphic');
      if (modal) {
        const modalId = modal.id;
        setTimeout(() => {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }, 1000);
      }
    }, 2000);
  }

  showLoadingState(button) {
    button.disabled = true;
    button.classList.add('loading-neumorphic');
    const originalText = button.innerHTML;
    button.dataset.originalText = originalText;
    button.innerHTML = '<i class="fas fa-spinner animate-rotate-neumorphic"></i> Processing...';
  }

  hideLoadingState(button) {
    button.disabled = false;
    button.classList.remove('loading-neumorphic');
    button.innerHTML = button.dataset.originalText;
  }

  showNotification(title, message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification-neumorphic ${type}`;
    
    notification.innerHTML = `
      <div class="notification-header-neumorphic">
        <div class="notification-title-neumorphic">${title}</div>
        <button class="notification-close-neumorphic">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="notification-message-neumorphic">${message}</div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      this.hideNotification(notification);
    }, 5000);
    
    // Close button handler
    const closeBtn = notification.querySelector('.notification-close-neumorphic');
    closeBtn.addEventListener('click', () => {
      this.hideNotification(notification);
    });
  }

  hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }
}

// Neumorphic Effects System
class NeumorphicEffects {
  constructor() {
    this.init();
  }

  init() {
    this.setupStatCounters();
    this.setupParallaxEffects();
    this.setupHoverEffects();
    this.setupScrollAnimations();
  }

  setupStatCounters() {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    NeumorphicDOM.statCards.forEach(card => {
      observer.observe(card);
    });
  }

  animateCounter(card) {
    const numberElement = card.querySelector('.stat-number-neumorphic');
    const targetValue = parseInt(card.dataset.value);
    const duration = 2000;
    const startTime = Date.now();
    const startValue = 0;

    const updateCounter = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutCubic);
      
      if (numberElement.textContent.includes('%')) {
        numberElement.textContent = currentValue + '%';
      } else if (numberElement.textContent.includes('H')) {
        numberElement.textContent = currentValue + 'H';
      } else if (numberElement.textContent.includes('K')) {
        numberElement.textContent = currentValue + 'K+';
      } else {
        numberElement.textContent = currentValue;
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }

  setupParallaxEffects() {
    const shapes = document.querySelectorAll('.neumorphic-shapes > div');
    
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      
      shapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrollY * speed);
        shape.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  setupHoverEffects() {
    // Service cards hover effect
    NeumorphicDOM.serviceCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Achievement cards hover effect
    NeumorphicDOM.achievementCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateX(10px)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateX(0)';
      });
    });
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-in-neumorphic');
        }
      });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.service-card-neumorphic, .achievement-card-neumorphic, .contact-method-neumorphic');
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }
}

// Initialize all systems
document.addEventListener('DOMContentLoaded', () => {
  new NeumorphicNavigation();
  new NeumorphicModal();
  new NeumorphicFormValidator();
  new NeumorphicEffects();
  
  console.log('🎨 Neumorphic Job Portal initialized successfully!');
});

// Handle page load performance
window.addEventListener('load', () => {
  // Remove any loading states
  document.body.classList.add('loaded');
  
  // Initialize additional features after page load
  setTimeout(() => {
    // Add any post-load animations here
  }, 100);
});
// Add this to your existing JavaScript code
// Replace the existing code at the bottom with this:
const navLoginBtn = document.getElementById('navLoginBtn');
if (navLoginBtn) {
    navLoginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('authModal').style.display = 'flex';
    });
}
// Add this to your existing JavaScript
if (document.getElementById('viewAllIndustries')) {
    document.getElementById('viewAllIndustries').addEventListener('click', function() {
        // You can customize this action
        alert('View All Industries - Feature coming soon!');
        
        // Or redirect to a dedicated page:
        // window.location.href = 'industries.html';
    });
}

// Add industries cards to the existing effects system
document.addEventListener('DOMContentLoaded', function() {
    const industryCards = document.querySelectorAll('.industry-card-neumorphic');
    
    // Add click animation
    industryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});