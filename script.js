
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    window.scrollTo({
      top: targetElement.offsetTop - 100,
      behavior: 'smooth'
    });
  });
});

// Mobile navigation toggle (to be implemented if needed)
// const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
// const navMenu = document.querySelector('nav ul');
// if (mobileNavToggle) {
//   mobileNavToggle.addEventListener('click', () => {
//     navMenu.classList.toggle('show');
//   });
// }

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Here you would normally send the data to a backend
    // For now, we'll just log it and show a success message
    console.log('Form submitted with:', { name, email, message });

    // Show success message (in a real app, this would happen after successful backend submission)
    alert('Thank you for your message! I will get back to you soon.');

    // Reset the form
    contactForm.reset();
  });
}

// Resume download handler
const resumeDownload = document.getElementById('resume-download');
if (resumeDownload) {
  resumeDownload.addEventListener('click', function(e) {
    // Link is already set in the HTML - this will now work automatically
    // But we can add tracking or additional functionality here if needed
    console.log('Resume download initiated');
  });
}

// Project filter functionality (can be implemented if needed)
// const filterButtons = document.querySelectorAll('.filter-btn');
// const projectCards = document.querySelectorAll('.project-card');
// if (filterButtons.length > 0) {
//   filterButtons.forEach(button => {
//     button.addEventListener('click', () => {
//       const filterValue = button.getAttribute('data-filter');
//       
//       filterButtons.forEach(btn => btn.classList.remove('active'));
//       button.classList.add('active');
//       
//       projectCards.forEach(card => {
//         if (filterValue === 'all' || card.classList.contains(filterValue)) {
//           card.style.display = 'block';
//         } else {
//           card.style.display = 'none';
//         }
//       });
//     });
//   });
// }

// Enhanced animation on scroll with staggered effect
window.addEventListener('scroll', function() {
  const elements = document.querySelectorAll('.project-card, .skill-category, .resume-section');

  elements.forEach((element, index) => {
    const position = element.getBoundingClientRect();

    // If element is in viewport
    if (position.top < window.innerHeight * 0.9 && position.bottom >= 0) {
      // Add staggered delay based on element index
      setTimeout(() => {
        element.classList.add('visible');
      }, index * 100);
    }
  });
});

// Video handling
document.addEventListener('DOMContentLoaded', function() {
  // Background video handling
  const heroVideo = document.getElementById('hero-video');
  if (heroVideo) {
    // Remove any background image that might be overriding the video
    document.getElementById('hero').style.background = 'none';
    
    // Make sure video background is visible
    const videoBackground = document.querySelector('.video-background');
    if (videoBackground) {
      videoBackground.style.display = 'block';
    }
    
    // Force video to play
    setTimeout(() => {
      heroVideo.play().catch(function(error) {
        console.log('Auto-play prevented by browser. User interaction needed:', error);
      });
    }, 100);
    
    // Add reload function in case the video doesn't load properly
    heroVideo.addEventListener('error', function(e) {
      console.error('Video error:', e);
      
      // Try to load the video again
      const videoSource = heroVideo.querySelector('source');
      videoSource.src = 'video/background.mp4';
      heroVideo.load();
      heroVideo.play();
    });
    
    // Ensure video is always visible and playing
    document.addEventListener('click', function() {
      if (heroVideo.paused) {
        heroVideo.play().catch(function(error) {
          console.log('Failed to play video after user interaction:', error);
        });
      }
    }, { once: true });
  }
  
  // Showcase video handling
  const showcaseVideo = document.getElementById('showcase-video');
  if (showcaseVideo) {
    // Ensure video plays when clicked (helps with autoplay restrictions)
    showcaseVideo.addEventListener('click', function() {
      if (showcaseVideo.paused) {
        showcaseVideo.play();
      } else {
        showcaseVideo.pause();
      }
    });
    
    // Try to play the video after user interaction
    document.addEventListener('click', function() {
      showcaseVideo.play().catch(error => {
        console.log('Auto-play prevented by browser:', error);
      });
    }, { once: true });
    
    // Handle video errors for showcase video
    showcaseVideo.addEventListener('error', function(e) {
      console.error('Showcase video error:', e);
      const videoContainer = document.querySelector('.video-container');
      if (videoContainer) {
        videoContainer.innerHTML = `
          <div class="video-error">
            <p>Video could not be loaded. Please try again later.</p>
            <button id="retry-video" class="btn primary">Retry</button>
          </div>
        `;
        
        // Add retry functionality
        document.getElementById('retry-video').addEventListener('click', function() {
          window.location.reload();
        });
      }
    });
  }

  // Smooth scroll offset adjustment for fixed header
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  const headerHeight = document.querySelector('header').offsetHeight;

  scrollLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Set up animations
  const elements = document.querySelectorAll('.project-card, .skill-category, .resume-section');

  // Trigger initial animation for elements already in viewport
  setTimeout(() => {
    elements.forEach((element, index) => {
      const position = element.getBoundingClientRect();

      if (position.top < window.innerHeight && position.bottom >= 0) {
        setTimeout(() => {
          element.classList.add('visible');
        }, index * 100);
      }
    });
  }, 300);
});
