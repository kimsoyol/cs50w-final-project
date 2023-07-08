

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#avatar-btn").addEventListener('click', handleDropdown)
    document.querySelector('#sidebar-toggle').addEventListener('click', handleSideBar)
})

function handleDropdown() {
    document.querySelector("#dropdown").classList.toggle('hidden')
}

function handleSideBar() {
    document.querySelector('#sidebar').classList.toggle('-translate-x-full')
}