document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#sidebar-toggle")
    .addEventListener("click", handleSideBar);
});

const handleSideBar = () => {
  const x = document.querySelector(".sidebar")
  const content = document.querySelector(".content-main")
  if (x.style.display === "none") {
    x.style.display = "block";
    content.style.paddingLeft = '8rem';
  } else {
    x.style.display = "none";
    content.style.paddingLeft = '0';
  }
};
