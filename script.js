
function openForm() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("contactUsForm").style.display = "block";
}

function closeForm() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("contactUsForm").style.display = "none";
}

// Function to load components dynamically
// function loadComponent(id, file) {
//     fetch(file)
//         .then(response => response.text())
//         .then(data => document.getElementById(id).innerHTML = data)
//         .catch(error => console.error(`Error loading ${file}:`, error));
// }
function loadComponent(id, file, callback) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (typeof callback === "function") {
                callback();
            }
        })
        .catch(error => console.error(`Error loading ${file}:`, error));
}

// Load the contact form component
function loadContactForm() {
    fetch("components/contact-form.html")
        .then(response => response.text())
        .then(data => {
            const placeholder = document.getElementById("contact-form-placeholder");
            placeholder.innerHTML = data;

            // Now that the contact form is in the DOM, attach event listeners
            const closeBtn = document.getElementById('close-contactForm');
            const overlay = document.getElementById('overlay');
            
            if (closeBtn) {
                closeBtn.addEventListener('click', function () {
                    closeForm()
                });
            } else {
                console.error('close-contactForm button not found.');
            }

            if (overlay) {
                overlay.addEventListener('click', function () {
                    closeForm()
                });
            } else {
                console.error('Overlay element not found.');
            }

            
            // Get all button elements
            var buttons = document.querySelectorAll('button');

            // Iterate over each button and add a click event listener
            buttons.forEach(function(button) {
                button.addEventListener('click', function() {
                    // alert('Button ' + button.id + ' clicked!');
                    if (mobileCheck()) {
                        const url = 'https://api.whatsapp.com/send/?phone=9920934198&text&type=phone_number&app_absent=0'
                        window.open(url, '_blank').focus();
                    } else {
                        console.log('Contact form');
                        openForm()
                    }
                });
            });
        })
        .catch(error => console.error("Error loading contact form:", error));
}


function updateNavHeight() {
    // Get the navbar element (make sure it is loaded)
    const navbar = document.getElementById("navbar");
    if (navbar) {
        const navHeight = navbar.offsetHeight;
        // Set the CSS variable for nav height
        document.documentElement.style.setProperty("--nav-height", navHeight + "px");
    } else {
        console.error("Navbar element not found.");
    }

    // Get the current HTML file name
    const currentFile = window.location.pathname.split('/').pop();

    // Check if the current file is privacy-policy.html
    if (currentFile === 'privacy-policy.html' || currentFile === 'request-account-delete.html') {
        const activeNavItems = document.querySelectorAll('.menu .active');
        console.log(activeNavItems)
        activeNavItems.forEach(item => {
            item.classList.remove('active');
        });
    }
}

// Load Navbar, Sections, and Footer
// loadComponent("navbar-placeholder", "components/navbar.html");
loadComponent("section1-placeholder", "components/section1.html");
loadComponent("section2-placeholder", "components/section2.html");
loadComponent("section3-placeholder", "components/section3.html");
loadComponent("section5-placeholder", "components/section5.html");
// loadComponent("footer-placeholder", "components/footer.html");


// Code to add click event listeners to ekyamm logos
document.addEventListener('DOMContentLoaded', function() {

    // Load navbar and update nav height after it's inserted
    loadComponent("navbar-placeholder", "components/navbar.html", updateNavHeight);
    //     function(){
    //     // Get the navbar element (make sure it is loaded)
    //     const navbar = document.getElementById("navbar");
    //     if (navbar) {
    //         console.log(navbar)
    //         // const navHeight = navbar.offsetHeight;
    //         const navHeight = navbar.getBoundingClientRect().height;
    //         console.log(navHeight)
    //         // Set the CSS variable for nav height
    //         document.documentElement.style.setProperty("--nav-height", navHeight + "px");
            
    //     } else {
    //         console.error("Navbar element not found.");
    //     }
    // });

    // Load footer and then update the current year
    loadComponent("footer-placeholder", "components/footer.html", function(){
        // JavaScript code to fetch and update the current year
        const currentYearElement = document.getElementById('currentYear');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        } else {
            console.error("Footer element with id 'currentYear' not found.");
        }
    });
    
    loadContactForm();

    const ekyammLogos = document.querySelectorAll('.ekyamm-logo');
    ekyammLogos.forEach(function(logo) {
        logo.addEventListener('click', function() {
            window.location.href = '/';
        });
    });
  
    // Optionally update on window resize
    window.addEventListener("resize", updateNavHeight);
    setTimeout(updateNavHeight, 200); // 100ms delay to allow rendering

});

window.mobileCheck = function() {
    let check = false;
    // (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);

    // Check if the screen width is 767 pixels or below
    if (window.innerWidth <= 767) {
        check = true;
    }
    return check;
};
// console.log(mobileCheck());





// Check if the browser is Safari
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// Check if the device is iOS
var isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Disable zoom on iOS in Safari
if (isiOS && isSafari) {
    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
    });
}
