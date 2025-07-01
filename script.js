document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('contact-form');
  const overlay = document.getElementById('overlay');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = new FormData(this);

    fetch(this.action, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          overlay.classList.remove('hidden');
          this.reset();
          setTimeout(() => overlay.classList.add('hidden'), 3000);
        } else {
          alert("A apărut o eroare la trimiterea formularului.");
        }
      })
      .catch(error => alert("Eroare rețea: " + error));
  });




  
  // --- Animația textului pornită imediat ---
  function animateSkillsText() {
  const h1 = document.getElementById('animated-skills-text');
  if (!h1) return;

  const text = h1.getAttribute('data-original-text') || h1.textContent.replace(/\s+/g, ' ').trim();
  h1.innerHTML = '';
  h1.setAttribute('data-original-text', text);

  for (let char of text) {
    const span = document.createElement('span');
    span.textContent = char;
    h1.appendChild(span);
  }

  const spans = h1.querySelectorAll('span');
  let index = 0;

  function colorizeLetters() {
    if (index < spans.length) {
      spans[index].classList.add('colored');
      index++;
      setTimeout(colorizeLetters, 150);
    }
  }

  colorizeLetters();
}

// Observator pentru secțiunea skills
const skillsSection = document.querySelector('#skills');

if (skillsSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillsText(); // animă textul h1
        startSkillsTypingAnimation(); // animă lista cu skilluri
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(skillsSection);
}





  const skillsData = {
    "skills-tools": [
      "Python", "SQL", "C++", "Java", "Typescript", "JavaScript", "Git", "Postman", "Docker", "Firebase"
    ],
    "skills-frameworks": [
      "React", "Node.js", "Express.js", "Flask", "Bootstrap", "jQuery", "TailwindCSS", "Framer Motion", "GSAP"
    ],
    "skills-core": [
      "DSA", "DBMS", "OOP", "Operating Systems", "System Design"
    ]
  };

  const typeSkill = (ulId, items, delay = 300) => {
    const ul = document.getElementById(ulId);
    let skillIndex = 0;

    const typeNextSkill = () => {
      if (skillIndex >= items.length) return;
      const text = items[skillIndex];
      const li = document.createElement("li");
      ul.appendChild(li);

      let charIndex = 0;
      const typeChar = () => {
        if (charIndex <= text.length) {
          li.textContent = text.slice(0, charIndex);
          li.classList.add("typewriter-cursor");
          charIndex++;
          setTimeout(typeChar, 50);
        } else {
          li.classList.remove("typewriter-cursor");
          skillIndex++;
          setTimeout(typeNextSkill, delay);
        }
      };

      typeChar();
    };

    typeNextSkill();
  };


  function startSkillsTypingAnimation() {
  document.getElementById("skills-tools").innerHTML = "";
  document.getElementById("skills-frameworks").innerHTML = "";
  document.getElementById("skills-core").innerHTML = "";

  typeSkill("skills-tools", skillsData["skills-tools"]);
  typeSkill("skills-frameworks", skillsData["skills-frameworks"], 400);
  typeSkill("skills-core", skillsData["skills-core"], 500);
}

  


});

window.addEventListener("load", function () {
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    const content = document.querySelector(".content");

    preloader.style.opacity = "0";

    setTimeout(() => {
      preloader.style.display = "none";
      content.classList.add("show");
      document.body.style.overflow = "auto";
    }, 1000); // timp pentru tranziția fade-out
  }, 2000); // timpul total al preloaderului (3 secunde)
});

const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

const bubble = document.querySelector('.cursor-bubble');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursorBubble() {
  currentX += (mouseX - currentX) * 0.1;  // interpolare lină
  currentY += (mouseY - currentY) * 0.1;

  if (bubble) {
    bubble.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
  }

  requestAnimationFrame(animateCursorBubble);
}

animateCursorBubble();

if (document.getElementById('typed')) {
  var typed = new Typed('#typed', {
    strings: [
      "I'm a Front-End Developer.",
      "I design modern and responsive websites.",
      "Passionate about clean code and UX.",
      "Let's build something amazing together!"
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|'
  });
}

const aboutImages = document.querySelectorAll('.about-images img');
let currentImgIndex = 0;

function changeAboutImage() {
  aboutImages[currentImgIndex].classList.remove('active');
  currentImgIndex = (currentImgIndex + 1) % aboutImages.length;
  aboutImages[currentImgIndex].classList.add('active');
}

setInterval(changeAboutImage, 4000); // schimbă imaginea la fiecare 4 secunde

const pyramidImages = document.querySelectorAll('#pyramid-container .pyramid-image');

let currentCenter = 0;

function rotatePyramid() {
  pyramidImages.forEach((img, i) => {
    let pos = (i - currentCenter + 3) % 3;

    img.classList.remove('center', 'left', 'right');

    if (pos === 0) {
      img.classList.add('center');
    } else if (pos === 1) {
      img.classList.add('left');
    } else if (pos === 2) {
      img.classList.add('right');
    }
  });

  currentCenter = (currentCenter + 1) % 3;
}

// Prima rotire după 4 secunde și apoi la fiecare 4 secunde
setTimeout(() => {
  rotatePyramid();
  setInterval(rotatePyramid, 4000);
}, 4000);

