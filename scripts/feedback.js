const stars = document.querySelectorAll(".stars");

let ratingUser = null;
stars.forEach((singleStar, index) => {
  singleStar.addEventListener("click", () => {
    if (ratingUser) {
      for (let i = index + 1; i < ratingUser; i++) {
        stars[i].classList.add("filter");
      }
    }
    for (let i = 0; i <= index; i++) {
      stars[i].classList.remove("filter");
    }
    ratingUser = index + 1;
  });
});

// "MORE INFO" per catturare il rating e il commento
const moreInfoButton = document.querySelector(".inputButton");

moreInfoButton.addEventListener("click", e => {
  e.preventDefault();
  const commentInput = document.querySelector(".inputText");
  const link = document.querySelector("a");
  const comment = commentInput.value;
  if (!ratingUser) {
    link.setAttribute("href", "");
    alert("please rate");
    link.setAttribute("href", "https://epicode.com/it/");
    return;
  }
  if (!comment) {
    link.setAttribute("href", "");
    alert("please write a comment");
    link.setAttribute("href", "https://epicode.com/it/");
    return;
  }
  console.log(`Rating: ${ratingUser}`);
  console.log(`Comment: ${comment}`);
  window.open("https://epicode.com/it/", "_self");
});
