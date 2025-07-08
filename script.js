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



  // --- Variabilă globală pentru control ---
  let skillsAlreadyAnimated = false;

  function resetSkillsSection() {
    const h1 = document.getElementById('animated-skills-text');
    if (!h1) return;

    // Resetăm textul pentru fiecare span
    const lines = h1.querySelectorAll('span');
    lines.forEach(span => {
      span.classList.remove('colored');
      span.textContent = span.getAttribute('data-original') || '';
    });

    h1.classList.remove('animated');

    // Golește complet listele de skilluri
    document.getElementById("skills-tools").innerHTML = "";
    document.getElementById("skills-frameworks").innerHTML = "";
    document.getElementById("skills-core").innerHTML = "";
  }



  // --- Animația textului pornită imediat ---

  function animateSkillsText() {
    const h1 = document.getElementById('animated-skills-text');
    if (!h1 || h1.classList.contains('animated')) return;

    const lines = h1.querySelectorAll('span');
    let index = 0;

    function animateNextLetter(span) {
      const text = span.textContent;
      span.textContent = '';
      let i = 0;

      function typeLetter() {
        if (i < text.length) {
          span.textContent += text.charAt(i);
          span.classList.add('colored'); // adaugă portocaliu
          i++;
          setTimeout(typeLetter, 100);
        }
      }

      typeLetter();
    }

    function startAnimation() {
      if (index < lines.length) {
        animateNextLetter(lines[index]);
        index++;
        setTimeout(startAnimation, 500); // între linii
      }
    }

    startAnimation();
    h1.classList.add('animated');
  }






  const skillsData = {
    "skills-tools": [
      "Python", "SQL", "C++", "Java", "C#", "JavaScript", "HTML", "CSS"
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


  // Observator pentru secțiunea skills
  const skillsSection = document.querySelector('#skills');

  if (skillsSection) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          resetSkillsSection();         // 🧹 curăță tot ce era
          animateSkillsText();          // 🟠 animă titlul
          startSkillsTypingAnimation(); // 🟢 animă lista
        }
      });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);
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

// Touch pentru telefon/tabletă
document.addEventListener('touchmove', e => {
  if (e.touches.length > 0) {
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
  }
}, { passive: true });

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

// Toggle pentru meniu pe mobil
const menuToggle = document.getElementById("menu-toggle");
const navbarMenu = document.getElementById("navbar-menu");

menuToggle.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// Închide meniul automat când se face click pe un link
const menuLinks = document.querySelectorAll("#navbar-menu a");

menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navbarMenu.classList.contains("open")) {
      navbarMenu.classList.remove("open");
    }
  });
});


function toggleMenu() {
  const navList = document.querySelector('.navbar nav ul');
  navList.classList.toggle('active');
}
