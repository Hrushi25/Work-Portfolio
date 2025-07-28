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

// Resume download handler with improved functionality
function setupResumeDownload() {
  // Get all resume download buttons on the site (in case you have more than one)
  const resumeDownloadLinks = document.querySelectorAll('a[href$="Resume.pdf"][download]');
  
  if (resumeDownloadLinks.length > 0) {
    resumeDownloadLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Check if file exists before download attempt
        const xhr = new XMLHttpRequest();
        const url = this.getAttribute('href');
        
        xhr.open('HEAD', url, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('Resume download initiated successfully');
              // You could add analytics tracking here
            } else {
              console.error('Resume file not found!');
              e.preventDefault(); // Prevent the default download
              alert('Sorry, the resume file could not be found. Please try again later or contact me directly.');
            }
          }
        };
        xhr.send();
      });
    });
    
    console.log('Resume download functionality initialized');
  }
}

// Project Modal Functionality
function setupProjectModals() {
  const modalOverlay = document.getElementById('modal-overlay');
  const viewDetailsButtons = document.querySelectorAll('.view-details');
  const closeModalButtons = document.querySelectorAll('.close-modal');
  const projectModals = document.querySelectorAll('.project-modal');
  
  // Open modal when View Details is clicked
  viewDetailsButtons.forEach(button => {
    button.addEventListener('click', function() {
      const projectId = this.getAttribute('data-project');
      const modal = document.getElementById(projectId);
      
      // Show overlay and modal
      modalOverlay.style.display = 'block';
      modal.style.display = 'block'; 
      
      // Wait a tiny bit before showing modal (for animation)
      setTimeout(() => {
        modal.classList.add('active');
      }, 50);
      
      // Prevent scrolling while modal is open
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close modal functions
  function closeAllModals() {
    projectModals.forEach(modal => {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.style.display = 'none';  // <-- ADD THIS inside setTimeout
      }, 300);
    });
  
    setTimeout(() => {
      modalOverlay.style.display = 'none';
    }, 300);
  
    document.body.style.overflow = 'auto';
  }
  
  // Close when X is clicked
  closeModalButtons.forEach(button => {
    button.addEventListener('click', closeAllModals);
  });
  
  // Close when clicking outside the modal
  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
      closeAllModals();
    }
  });
  
  // Close when ESC key is pressed
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

function setupGallery() {
  const images = document.querySelectorAll('.gallery-image');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentIndex = 0;

  function showImage(index) {
    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });
}

// Add this to your script.js file

// Video Error Handling Function
function handleVideoError(video) {
  console.log('Video error detected:', video.src);
  
  const container = video.closest('.modal-video-container');
  const fallback = container.querySelector('.video-fallback');
  
  // Hide the video element
  video.style.display = 'none';
  
  // Show the fallback content
  if (fallback) {
      fallback.style.display = 'block';
  } else {
      // Create fallback if it doesn't exist
      const fallbackDiv = document.createElement('div');
      fallbackDiv.className = 'video-error';
      fallbackDiv.innerHTML = `
          <div class="error-content">
              <i class="fas fa-exclamation-triangle"></i>
              <h4>Video Unavailable</h4>
              <p>The demo video for this project is currently unavailable.</p>
              <p>This may be due to:</p>
              <ul>
                  <li>Video file not found in the project directory</li>
                  <li>Network connectivity issues</li>
                  <li>Browser compatibility issues</li>
              </ul>
              <div class="error-actions">
                  <button onclick="retryVideo(this)" class="btn secondary">Retry</button>
                  <a href="mailto:hrishikeshgawde2507@gmail.com?subject=Portfolio Video Request" class="btn primary">Request Video</a>
              </div>
          </div>
      `;
      container.appendChild(fallbackDiv);
  }
}

// Retry Video Function
function retryVideo(button) {
  const container = button.closest('.modal-video-container');
  const video = container.querySelector('video');
  const errorDiv = container.querySelector('.video-error');
  
  // Hide error message
  if (errorDiv) {
      errorDiv.remove();
  }
  
  // Show and reload video
  video.style.display = 'block';
  video.load(); // Reload the video
  
  // Add a one-time error listener
  video.addEventListener('error', function() {
      handleVideoError(video);
  }, { once: true });
}

// Enhanced video loading with better error handling
document.addEventListener('DOMContentLoaded', function() {
  const videos = document.querySelectorAll('.modal-video-container video');
  
  videos.forEach(video => {
      // Add loading indicator
      const loadingDiv = document.createElement('div');
      loadingDiv.className = 'video-loading';
      loadingDiv.innerHTML = `
          <div class="loading-content">
              <i class="fas fa-spinner fa-spin"></i>
              <p>Loading video...</p>
          </div>
      `;
      video.parentElement.appendChild(loadingDiv);
      
      // Handle video events
      video.addEventListener('loadstart', function() {
          loadingDiv.style.display = 'flex';
      });
      
      video.addEventListener('canplay', function() {
          loadingDiv.style.display = 'none';
      });
      
      video.addEventListener('error', function() {
          loadingDiv.style.display = 'none';
          handleVideoError(video);
      });
      
      // Add video interaction improvements
      video.addEventListener('click', function() {
          if (video.paused) {
              video.play().catch(error => {
                  console.log('Auto-play prevented:', error);
              });
          } else {
              video.pause();
          }
      });
  });
});

// Call setupGallery() when DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
  setupGallery();
});


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
  // Call resume download setup
  setupResumeDownload();
  
  // Call project modals setup
  setupProjectModals();
  
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
