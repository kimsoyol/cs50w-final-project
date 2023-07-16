document.addEventListener("DOMContentLoaded", () => {
  const sideBar = document.querySelector("#sidebar-toggle")
  if (sideBar){
    sideBar.addEventListener("click", handleSideBar);
  }

  const deleteBtn = document.querySelector(".deleteBtn")
  if (deleteBtn) {
    const eventId = deleteBtn.getAttribute("data-event-id")
    deleteBtn.addEventListener('click', () => handleDelete(eventId))
  }
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

const handleDelete = (id) => {
  fetch('/delete', {
    method: 'POST',
    body: JSON.stringify({
      eventId: id
    })
  })
  .then(response => response.json())
  .then( () => window.location.href = '/')
}