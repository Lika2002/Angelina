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
          setTimeout(() => overlay.classList.add('hidden'), 5000);
        } else {
          alert("A apărut o eroare la trimiterea formularului.");
        }
      })
      .catch(error => alert("Eroare rețea: " + error));
  });
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

