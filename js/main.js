//hero section video loading

// ===== Setting up the primary container =====
const videoBox = document.querySelector(".hero__video-box");
const originalVideo = document.querySelector(".hero__video");

// 1. Programmatically assign relative positioning to the container without modifying the SASS/CSS files
// This is sufficient to ensure that absolute videos adhere to the container boundaries defined by the Grid.
videoBox.style.position = "relative";
videoBox.style.overflow = "hidden";

// 2.Videos list
const videos = [
  "/img/hero-video-1.mp4",
  "/img/hero-video-2.mp4",
  "/img/hero-video-3.mp4",
  "/img/hero-video-4.mp4",
];

// ===== Double Buffering Thechnology =====

// 3. Create a second, identical video element to run in the background
const vid1 = originalVideo;
const vid2 = originalVideo.cloneNode(true);
videoBox.appendChild(vid2);

// 4. Apply common formats so that the two videos are placed on top of each other
const commonStyles = {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "opacity 0.4s ease-in-out", // Smooth transition between videos
};

Object.assign(vid1.style, commonStyles);
Object.assign(vid2.style, commonStyles);

// 5. Layer preparation
vid1.style.zIndex = "2";
vid1.style.opacity = "1";
vid2.style.zIndex = "1";
vid2.style.opacity = "0";

let currentIndex = 0;
let activeVideo = vid1;
let nextVideo = vid2;

// 6. Play the first video
activeVideo.src = videos[currentIndex];
activeVideo.muted = true;
activeVideo.playsInline = true;
activeVideo.play().catch(() => {});

// 7. Download the second video in advance
let nextIndex = (currentIndex + 1) % videos.length;
nextVideo.src = videos[nextIndex];
nextVideo.muted = true;
nextVideo.playsInline = true;
nextVideo.preload = "auto";

// 8. Switching function
function handleVideoEnd() {
  nextVideo.style.zIndex = "2";
  nextVideo.style.opacity = "1";
  nextVideo.play().catch(() => {});

  activeVideo.style.zIndex = "1";
  activeVideo.style.opacity = "0";

  currentIndex = nextIndex;
  nextIndex = (currentIndex + 1) % videos.length;

  const previousVideo = activeVideo;
  setTimeout(() => {
    previousVideo.src = videos[nextIndex];
    previousVideo.load();
  }, 400);

  const temp = activeVideo;
  activeVideo = nextVideo;
  nextVideo = temp;
}

// 9. Monitoring the end of videos
vid1.addEventListener("ended", handleVideoEnd);
vid2.addEventListener("ended", handleVideoEnd);

//meals section option hover
const mealsSection = document.querySelector(".meals");

if (mealsSection) {
  const optionButtons = [
    ...mealsSection.querySelectorAll(".options-list__btn"),
  ];
  const optionCards = [...mealsSection.querySelectorAll(".option-info-card")];

  const getOptionKey = (element, prefix) => {
    const optionClass = [...element.classList].find((className) =>
      className.startsWith(prefix),
    );

    return optionClass ? optionClass.slice(prefix.length).toLowerCase() : null;
  };

  const setActiveCard = (key) => {
    optionCards.forEach((card) => {
      card.classList.toggle(
        "is-active",
        getOptionKey(card, "option-info-card--") === key,
      );
    });
  };

  const defaultCard = optionCards.find((card) =>
    card.classList.contains("option-info-card--high-protein"),
  );

  if (defaultCard) {
    defaultCard.classList.add("is-active");
  }

  optionButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      const optionKey = getOptionKey(button, "options-list__btn-");

      if (!optionKey) {
        return;
      }

      setActiveCard(optionKey);
    });
  });
}

//footer current year
const footerYear = document.querySelector(".footer__year");

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

// Close mobile nav overlay after selecting a navigation item.
const navToggle = document.querySelector(".navigation__checkbox");
const navLinks = document.querySelectorAll(".navigation__nav a");

if (navToggle && navLinks.length) {
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.checked = false;
    });
  });
}
