// NAVBAR

const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.nav-list');
const navs = document.querySelectorAll('.nav-list a');

hamburger.onclick = function() {
  navbar.classList.toggle('active');
}

navs.forEach(function(nav) {
  nav.addEventListener('click', function() {
    navbar.classList.remove('active');
  });
});


// TESTIMONIAL
const slider = document.querySelector('.slider');
let currentIndex = 0;

  function slideNext() {
    let slideWidth;
    for (let i = 0; i < slider.children.length; i++) {
      slideWidth = slider.children[i].clientWidth;
    }
    currentIndex = (currentIndex + 1) % slider.children.length;
    let translateX;
    if(slideWidth === 600 ) {
      translateX = -currentIndex * 600; // Assuming each slide is 600px wide
    } else {
      translateX = -currentIndex * 350; // Assuming each slide is 350px wide
    }
    slider.style.transform = `translateX(${translateX}px)`;
  }
  
  setInterval(slideNext, 5000); // Automatically slide every 2 seconds


  // PORTFOLIO
  const images = document.querySelectorAll('.image');
  const overlay = document.querySelector('.overlay');
  const overlayImg = overlay.querySelector('img');

  images.forEach(image => {
    image.addEventListener('click', () => {
      overlayImg.src = image.querySelector('img').src;
      overlay.classList.add('active');
    });
  });

  overlay.addEventListener('click', () => {
    overlay.classList.remove('active');
  });


  // SERVICE BOXES ANIMATION
  const serviceBoxElements = document.querySelectorAll('.service-box');
  const eachContactElements = document.querySelectorAll('.each-contact');
  const imagesElements = document.querySelectorAll('.image');
  const animatedElements = [...serviceBoxElements, ...eachContactElements, ...imagesElements];

  function checkAnimation() {
      animatedElements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          const elementBottom = element.getBoundingClientRect().bottom;
          const windowHeight = window.innerHeight;
  
          if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
              element.classList.add('service-anime');
          } else {
              element.classList.remove('service-anime');
          }
      });
  }
  
  window.addEventListener('scroll', checkAnimation);
  window.addEventListener('resize', checkAnimation);
  checkAnimation(); // Run once on page load
  

// TYPING ANIMATION

// function([string1, string2],target id,[color1,color2])    
consoleText(['Graphics Designer', 'Photographer', 'Videographer'], 'text',['#F26C4F','rebeccapurple','lightblue']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  let visible = true;
  let con = document.getElementById('console');
  let letterCount = 1;
  let x = 1;
  let waiting = false;
  let target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        let usedColor = colors.shift();
        colors.push(usedColor);
        let usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}


// COUNTER
function animate(obj, initVal, lastVal, duration) {
  let startTime = null;
  let currentTime = Date.now();
  
  const step = (timestamp) => {
    if (!startTime) {
      startTime = timestamp;
    }
    
    const progress = Math.min((timestamp - startTime) / duration, 1);
    obj.innerHTML = Math.floor(progress * (lastVal - initVal) + initVal);
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      window.cancelAnimationFrame(window.requestAnimationFrame(step));
    }
  };
  
  window.requestAnimationFrame(step);
}

let text1 = document.getElementById('1');
let text2 = document.getElementById('2');
let text3 = document.getElementById('3');
let text4 = document.getElementById('4');

const load = () => {
  animate(text1, 400, 511, 4000);
  animate(text2, 20, 120, 4000);
  animate(text3, 0, 5, 1000);
  animate(text4, 0, 12, 2000);
};

const options = {
  threshold: 0.5 // Adjust this value as needed
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      load(); // Call the load function when the element is in the viewport
      observer.unobserve(entry.target); // Stop observing after triggering
    }
  });
}, options);

const targetElement = document.getElementById('count1'); // Replace with your target element's ID
observer.observe(targetElement);


load();

