// HTMLCollection for "I am a..." buttons.
let customerTypes = document.getElementsByClassName("customer-select");

// HTMLCollection for appointment buttons.
let appointmentTypes = document.getElementsByClassName("appointment-select");

// Booking main content area.
let contentArea = document.getElementById("main-content");

// Selection menus.
let bookingMenus = [document.getElementById("booking-menu-1"), document.getElementById("booking-menu-2"), document.getElementById("booking-menu-3")];

// HTML elements that show choices the user makes
let choiceDisplays = [document.getElementById("customer-select-display"), document.getElementById("appointment-select-display")];

let backButton = document.getElementById("back-button");

// Store user choices
let chosenOptions = ["",""];

// Controls current menu
let currentPage = 0;

// Prevent jerky animation on load.
setTimeout(()=>{
    for(let i = 0; i < bookingMenus.length; i++){
        if(!bookingMenus[i].className.includes("animate")){
            bookingMenus[i].className += " animate";
        }
    }
}, 100);

// Iterate over customer buttons and listen for clicks.
Array.from(customerTypes).forEach(typeButton => {
    typeButton.addEventListener("click", ()=>{

        if(!bookingMenus[0].className.includes("hidden")){
            currentPage = 1;

            chosenOptions[0] = typeButton.innerText;
            choiceDisplays[0].innerText = chosenOptions[0];
            contentArea.style.left = "-100%";

            setTimeout(()=>{
                bookingMenus[0].className += " hidden";
                contentArea.style.transition = "none";

                if(bookingMenus[1].className.includes("hidden")){
                    bookingMenus[1].className = bookingMenus[1].className.replace(" hidden", "");
                    bookingMenus[1].focus();
                }

                if(backButton.className.includes("hidden")){
                    backButton.className = backButton.className.replace("hidden", "");
                }

                contentArea.style.left = "100%";

                setTimeout(()=>{
                    contentArea.style.transition = "all 0.5s ease-in-out";
                    contentArea.style.left = "0";
                }, 100);
            }, 500);
        }
    });
});

// Iterate over appointment buttons and listen for clicks.
Array.from(appointmentTypes).forEach(typeButton => {
    typeButton.addEventListener("click", ()=>{

        if(!bookingMenus[1].className.includes("hidden")){
            currentPage = 2;
            
            choiceDisplays[1].innerText = `${chosenOptions[0]} - ${typeButton.innerText}`;
            contentArea.style.left = "-100%";

            setTimeout(()=>{
                bookingMenus[1].className += " hidden";
                contentArea.style.transition = "none";

                if(bookingMenus[currentPage].className.includes("hidden")){
                    bookingMenus[currentPage].className = bookingMenus[currentPage].className.replace(" hidden", "");
                    bookingMenus[currentPage].focus();
                }

                contentArea.style.left = "100%";

                setTimeout(()=>{
                    contentArea.style.transition = "all 0.5s ease-in-out";
                    contentArea.style.left = "0";
                }, 100);
            }, 500);
        }
    });
});

// Back Button change menu depending on current menu state.
backButton.addEventListener("click", ()=>{
    if(bookingMenus[0].className.includes("hidden")){
        currentPage -= 1;
        contentArea.style.left = "100%";

        setTimeout(()=>{
            contentArea.style.transition = "none";

            if(!bookingMenus[currentPage+1].className.includes("hidden")){
                bookingMenus[currentPage+1].className += " hidden";
            }

            if(bookingMenus[currentPage].className.includes("hidden")){
                bookingMenus[currentPage].className = bookingMenus[currentPage].className.replace(" hidden", "");
                bookingMenus[currentPage].focus();
            }

            if(backButton.className !== "hidden" && currentPage < 1){
                backButton.className = "hidden";
            }

            contentArea.style.left = "-100%";

            setTimeout(()=>{
                contentArea.style.transition = "all 0.5s ease-in-out";
                contentArea.style.left = "0";
            }, 100);
        }, 500);
    }
});


let scrollButton = document.getElementById("scrolltop");

// Controls scroll button appearance.
document.addEventListener("scroll", ()=>{

    if(document.getElementsByTagName("html")[0].scrollTop >= 100){
        if(scrollButton.className.includes("hidden")){
            scrollButton.className = "";
        }
    } else {
        if(!scrollButton.className.includes("hidden")){
            scrollButton.className = "hidden";
        }
    }
});

// Scroll button functionality.
scrollButton.addEventListener("click", ()=>{
    document.getElementsByTagName("html")[0].scrollTop = 0;
});