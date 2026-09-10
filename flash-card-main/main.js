// Activate class 'active' to each mode button
const modeBtns = document.querySelectorAll('#header .container .mode button')

modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        resetBtns()
        btn.classList.add('active')
    })
})

function resetBtns() {
    for (let btn of modeBtns) {
        btn.classList.remove('active')
    }
}

// Create a custom dropdown menu 
const dropdownTrigger = document.querySelector(".dropdown-trigger");
const dropdownMenu = document.querySelector(".dropdown-menu");
const dropdownItems = document.querySelectorAll(".dropdown-item");

dropdownTrigger.addEventListener("click", () => {
    dropdownMenu.classList.toggle("open");
});

dropdownItems.forEach(item => {
    item.addEventListener("click", () => {
        dropdownTrigger.querySelector("span").textContent = item.textContent;

        dropdownMenu.classList.remove("open");
    });
});


// Enable hide mastered
const hideMasteredBtn = document.querySelector('.hide-mastered button')

hideMasteredBtn.addEventListener('click', () => {
    hideMasteredBtn.querySelector('span').classList.toggle('active')
})