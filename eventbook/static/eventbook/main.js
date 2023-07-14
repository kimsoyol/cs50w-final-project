document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#sidebar-toggle")
    .addEventListener("click", handleSideBar);
});

const handleSideBar = () => {
  const x = document.querySelector(".sidebar")
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
};
