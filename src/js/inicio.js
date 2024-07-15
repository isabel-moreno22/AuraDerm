document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const logos = Array.from(track.children);
  const cloneFirst = logos[0].cloneNode(true);
  const cloneLast = logos[logos.length - 1].cloneNode(true);

  // Añade clones al principio y al final
  track.appendChild(cloneFirst);
  track.insertBefore(cloneLast, track.firstChild);

  let currentIndex = 1;
  const logoWidth = logos[0].offsetWidth;
  const gap = 30;

  // Posición inicial
  track.style.transform = `translateX(-${(logoWidth + gap) * currentIndex}px)`;

  function moveCarousel(newIndex) {
    if (newIndex > logos.length) {
      currentIndex = 2;
      track.style.transition = "none";
      track.style.transform = `translateX(-${
        (logoWidth + gap) * currentIndex
      }px)`;
      setTimeout(() => {
        track.style.transition = "transform 0.5s ease";
      }, 0);
    } else if (newIndex < 1) {
      currentIndex = logos.length;
      track.style.transition = "none";
      track.style.transform = `translateX(-${
        (logoWidth + gap) * currentIndex
      }px)`;
      setTimeout(() => {
        track.style.transition = "transform 0.5s ease";
      }, 0);
    } else {
      currentIndex = newIndex;
      track.style.transform = `translateX(-${
        (logoWidth + gap) * currentIndex
      }px)`;
    }
  }

  document
    .querySelector(".left-arrow")
    .addEventListener("click", () => moveCarousel(currentIndex - 1));
  document
    .querySelector(".right-arrow")
    .addEventListener("click", () => moveCarousel(currentIndex + 1));
});
