"use strict";

/* ============================================================
   VIDLYRA MINI FEST
   GLOBAL SCRIPT
   File: js/script.js
   ============================================================ */


/* ============================================================
   1. GLOBAL CONFIG
   ============================================================ */

const VIDLYRA_FEST = {

    name: "Vidlyra Mini Fest",

    year: 2026,

    storagePrefix:
        "vidlyra_mini_fest_",

    transitionSpeed: 500

};


/* ============================================================
   2. DOM READY
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeFest();

    }
);


/* ============================================================
   3. INITIALIZE FEST
   ============================================================ */

function initializeFest() {

    console.log(
        "🎬 Vidlyra Mini Fest started."
    );


    initializePageReveal();

    initializeNavigation();

    initializeScrollEffects();

    initializeBackToTop();

    initializeGlobalButtons();

    initializeKeyboardControls();

    initializeMobileMenu();

    initializeFestStorage();

}


/* ============================================================
   4. PAGE REVEAL
   ============================================================ */

function initializePageReveal() {

    document.body.classList.add(
        "vidlyra-ready"
    );


    const revealElements =
        document.querySelectorAll(
            "[data-reveal]"
        );


    if (
        revealElements.length === 0
    ) {

        return;

    }


    const observer =
        new IntersectionObserver(
            function (
                entries
            ) {

                entries.forEach(
                    function (
                        entry
                    ) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(
        function (
            element
        ) {

            observer.observe(
                element
            );

        }
    );

}


/* ============================================================
   5. NAVIGATION
   ============================================================ */

function initializeNavigation() {

    const navigationLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    navigationLinks.forEach(
        function (
            link
        ) {

            link.addEventListener(
                "click",
                function (
                    event
                ) {

                    const targetID =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetID ||
                        targetID === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (
                        !target
                    ) {

                        return;

                    }


                    event.preventDefault();


                    target.scrollIntoView(
                        {
                            behavior:
                                "smooth",

                            block:
                                "start"
                        }
                    );


                    closeMobileMenu();

                }
            );

        }
    );

}


/* ============================================================
   6. SCROLL EFFECTS
   ============================================================ */

function initializeScrollEffects() {

    const header =
        document.querySelector(
            ".fest-header, header"
        );


    if (
        !header
    ) {

        return;

    }


    function updateHeader() {

        if (
            window.scrollY > 40
        ) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();

}


/* ============================================================
   7. BACK TO TOP
   ============================================================ */

function initializeBackToTop() {

    const backToTop =
        document.getElementById(
            "backToTop"
        );


    if (
        !backToTop
    ) {

        return;

    }


    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY > 500
            ) {

                backToTop.classList.add(
                    "visible"
                );

            } else {

                backToTop.classList.remove(
                    "visible"
                );

            }

        },
        {
            passive: true
        }
    );


    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo(
                {
                    top: 0,

                    behavior:
                        "smooth"
                }
            );

        }
    );

}


/* ============================================================
   8. GLOBAL BUTTONS
   ============================================================ */

function initializeGlobalButtons() {

    /*
       Buttons can use:

       data-action="start"

       data-action="watch"

       data-action="fest"

       data-action="home"
    */

    const buttons =
        document.querySelectorAll(
            "[data-action]"
        );


    buttons.forEach(
        function (
            button
        ) {

            button.addEventListener(
                "click",
                function () {

                    const action =
                        button.dataset.action;


                    handleGlobalAction(
                        action
                    );

                }
            );

        }
    );

}


/* ============================================================
   9. GLOBAL ACTION HANDLER
   ============================================================ */

function handleGlobalAction(
    action
) {

    switch (
        action
    ) {

        case "start":

            scrollToSection(
                "dream-tree"
            );

            break;


        case "watch":

            scrollToSection(
                "watch"
            );

            break;


        case "fest":

            scrollToSection(
                "festival"
            );

            break;


        case "library":

            scrollToSection(
                "library"
            );

            break;


        case "news":

            scrollToSection(
                "news"
            );

            break;


        case "faq":

            scrollToSection(
                "faq"
            );

            break;


        case "home":

            window.scrollTo(
                {
                    top: 0,

                    behavior:
                        "smooth"
                }
            );

            break;


        default:

            console.log(
                "Unknown Vidlyra action:",
                action
            );

    }

}


/* ============================================================
   10. SCROLL TO SECTION
   ============================================================ */

function scrollToSection(
    sectionID
) {

    const section =
        document.getElementById(
            sectionID
        );


    if (
        !section
    ) {

        return;

    }


    section.scrollIntoView(
        {
            behavior:
                "smooth",

            block:
                "start"
        }
    );

}


/* ============================================================
   11. MOBILE MENU
   ============================================================ */

function initializeMobileMenu() {

    const menuButton =
        document.getElementById(
            "menuButton"
        );


    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    if (
        !menuButton ||
        !mobileMenu
    ) {

        return;

    }


    menuButton.addEventListener(
        "click",
        function () {

            const opened =
                mobileMenu.classList.toggle(
                    "open"
                );


            menuButton.setAttribute(
                "aria-expanded",
                String(
                    opened
                )
            );

        }
    );


    const menuLinks =
        mobileMenu.querySelectorAll(
            "a"
        );


    menuLinks.forEach(
        function (
            link
        ) {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        }
    );

}


/* ============================================================
   12. CLOSE MOBILE MENU
   ============================================================ */

function closeMobileMenu() {

    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    const menuButton =
        document.getElementById(
            "menuButton"
        );


    if (
        mobileMenu
    ) {

        mobileMenu.classList.remove(
            "open"
        );

    }


    if (
        menuButton
    ) {

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


/* ============================================================
   13. KEYBOARD CONTROLS
   ============================================================ */

function initializeKeyboardControls() {

    document.addEventListener(
        "keydown",
        function (
            event
        ) {

            /*
               ESC = close menus/modals
            */

            if (
                event.key === "Escape"
            ) {

                closeMobileMenu();

                closeAnyGlobalModal();

            }


            /*
               Home = go top
            */

            if (
                event.key === "Home" &&
                !isTyping()
            ) {

                window.scrollTo(
                    {
                        top: 0,

                        behavior:
                            "smooth"
                    }
                );

            }

        }
    );

}


/* ============================================================
   14. CHECK TYPING
   ============================================================ */

function isTyping() {

    const active =
        document.activeElement;


    if (
        !active
    ) {

        return false;

    }


    const tag =
        active.tagName.toLowerCase();


    return (
        tag === "input" ||
        tag === "textarea" ||
        tag === "select"
    );

}


/* ============================================================
   15. GLOBAL MODAL CLOSE
   ============================================================ */

function closeAnyGlobalModal() {

    const modals =
        document.querySelectorAll(
            ".modal.open, .modal.visible, .popup.open"
        );


    modals.forEach(
        function (
            modal
        ) {

            modal.classList.remove(
                "open"
            );

            modal.classList.remove(
                "visible"
            );

        }
    );

}


/* ============================================================
   16. FEST PROGRESS
   ============================================================ */

function initializeFestStorage() {

    let firstVisit =
        localStorage.getItem(
            VIDLYRA_FEST.storagePrefix +
            "visited"
        );


    if (
        !firstVisit
    ) {

        localStorage.setItem(
            VIDLYRA_FEST.storagePrefix +
            "visited",
            "true"
        );


        console.log(
            "🌟 Welcome to Vidlyra Mini Fest."
        );

    }

}


/* ============================================================
   17. FEST VISIT COUNTER
   ============================================================ */

function getFestVisitCount() {

    const key =
        VIDLYRA_FEST.storagePrefix +
        "visits";


    let visits =
        Number(
            localStorage.getItem(
                key
            )
        ) || 0;


    visits += 1;


    localStorage.setItem(
        key,
        String(
            visits
        )
    );


    return visits;

}


/* ============================================================
   18. FEST THEME
   ============================================================ */

function initializeTheme() {

    const savedTheme =
        localStorage.getItem(
            VIDLYRA_FEST.storagePrefix +
            "theme"
        );


    if (
        savedTheme === "light"
    ) {

        document.body.classList.add(
            "light-theme"
        );

    }

}


/* ============================================================
   19. SET THEME
   ============================================================ */

function setFestTheme(
    theme
) {

    if (
        theme !== "light" &&
        theme !== "dark"
    ) {

        return;

    }


    document.body.classList.toggle(
        "light-theme",
        theme === "light"
    );


    localStorage.setItem(
        VIDLYRA_FEST.storagePrefix +
        "theme",
        theme
    );

}


/* ============================================================
   20. COUNTDOWN
   ============================================================ */

function initializeCountdown(
    targetDate
) {

    const countdown =
        document.getElementById(
            "countdown"
        );


    if (
        !countdown
    ) {

        return;

    }


    const target =
        new Date(
            targetDate
        ).getTime();


    if (
        Number.isNaN(
            target
        )
    ) {

        console.warn(
            "Invalid countdown date."
        );

        return;

    }


    function updateCountdown() {

        const now =
            Date.now();


        const difference =
            target -
            now;


        if (
            difference <= 0
        ) {

            countdown.innerHTML =
                "<span>FEST IS LIVE</span>";

            return;

        }


        const days =
            Math.floor(
                difference /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );


        const hours =
            Math.floor(
                (
                    difference /
                    (
                        1000 *
                        60 *
                        60
                    )
                ) % 24
            );


        const minutes =
            Math.floor(
                (
                    difference /
                    (
                        1000 *
                        60
                    )
                ) % 60
            );


        const seconds =
            Math.floor(
                (
                    difference /
                    1000
                ) % 60
            );


        countdown.innerHTML = `

            <div class="countdown-item">

                <strong>
                    ${days}
                </strong>

                <span>
                    DAYS
                </span>

            </div>

            <div class="countdown-item">

                <strong>
                    ${hours}
                </strong>

                <span>
                    HOURS
                </span>

            </div>

            <div class="countdown-item">

                <strong>
                    ${minutes}
                </strong>

                <span>
                    MIN
                </span>

            </div>

            <div class="countdown-item">

                <strong>
                    ${seconds}
                </strong>

                <span>
                    SEC
                </span>

            </div>

        `;

    }


    updateCountdown();


    const timer =
        setInterval(
            updateCountdown,
            1000
        );


    window.addEventListener(
        "beforeunload",
        function () {

            clearInterval(
                timer
            );

        }
    );

}


/* ============================================================
   21. COPY TEXT
   ============================================================ */

async function copyText(
    text
) {

    if (
        !text
    ) {

        return false;

    }


    try {

        await navigator.clipboard.writeText(
            text
        );


        showNotification(
            "Copied successfully."
        );


        return true;

    }

    catch (
        error
    ) {

        console.warn(
            "Clipboard failed:",
            error
        );


        return false;

    }

}


/* ============================================================
   22. NOTIFICATION
   ============================================================ */

function showNotification(
    message
) {

    let notification =
        document.getElementById(
            "vidlyraNotification"
        );


    if (
        !notification
    ) {

        notification =
            document.createElement(
                "div"
            );


        notification.id =
            "vidlyraNotification";


        notification.style.position =
            "fixed";


        notification.style.left =
            "50%";


        notification.style.bottom =
            "30px";


        notification.style.transform =
            "translateX(-50%)";


        notification.style.zIndex =
            "99999";


        notification.style.padding =
            "12px 20px";


        notification.style.border =
            "1px solid rgba(216,107,36,.5)";


        notification.style.background =
            "rgba(0,0,0,.9)";


        notification.style.color =
            "#fff";


        notification.style.fontSize =
            "13px";


        notification.style.borderRadius =
            "4px";


        notification.style.pointerEvents =
            "none";


        document.body.appendChild(
            notification
        );

    }


    notification.textContent =
        message;


    notification.style.opacity =
        "1";


    clearTimeout(
        notification._timer
    );


    notification._timer =
        setTimeout(
            function () {

                notification.style.opacity =
                    "0";

            },
            2500
        );

}


/* ============================================================
   23. IMAGE ERROR HANDLING
   ============================================================ */

function initializeImageFallbacks() {

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(
        function (
            image
        ) {

            image.addEventListener(
                "error",
                function () {

                    console.warn(
                        "Image not found:",
                        image.src
                    );


                    image.classList.add(
                        "image-error"
                    );

                }
            );

        }
    );

}


/* ============================================================
   24. VIDEO CONTROL
   ============================================================ */

function initializeVideos() {

    const videos =
        document.querySelectorAll(
            "video[data-autopause]"
        );


    if (
        videos.length === 0
    ) {

        return;

    }


    const observer =
        new IntersectionObserver(
            function (
                entries
            ) {

                entries.forEach(
                    function (
                        entry
                    ) {

                        const video =
                            entry.target;


                        if (
                            !entry.isIntersecting
                        ) {

                            video.pause();

                        }

                    }
                );

            },
            {
                threshold: 0.2
            }
        );


    videos.forEach(
        function (
            video
        ) {

            observer.observe(
                video
            );

        }
    );

}


/* ============================================================
   25. LINK PROTECTION
   ============================================================ */

function initializeExternalLinks() {

    const links =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    links.forEach(
        function (
            link
        ) {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }
    );

}


/* ============================================================
   26. PREVENT DOUBLE CLICK
   ============================================================ */

function initializeButtonProtection() {

    const buttons =
        document.querySelectorAll(
            "button[data-once]"
        );


    buttons.forEach(
        function (
            button
        ) {

            button.addEventListener(
                "click",
                function () {

                    if (
                        button.dataset.clicked ===
                        "true"
                    ) {

                        return;

                    }


                    button.dataset.clicked =
                        "true";


                    window.setTimeout(
                        function () {

                            button.dataset.clicked =
                                "false";

                        },
                        1500
                    );

                }
            );

        }
    );

}


/* ============================================================
   27. WINDOW RESIZE
============================================================ */

window.addEventListener(
    "resize",
    function () {

        /*
           Close mobile menu if
           screen becomes desktop.
        */

        if (
            window.innerWidth > 900
        ) {

            closeMobileMenu();

        }

    }
);


/* ============================================================
   28. PAGE VISIBILITY
============================================================ */

document.addEventListener(
    "visibilitychange",
    function () {

        /*
           This is intentionally light.
           Dream Tree controls its own audio.
        */

        if (
            document.hidden
        ) {

            console.log(
                "Vidlyra page hidden."
            );

        } else {

            console.log(
                "Vidlyra page active."
            );

        }

    }
);


/* ============================================================
   29. INITIALIZE OPTIONAL SYSTEMS
============================================================ */

initializeTheme();

initializeImageFallbacks();

initializeVideos();

initializeExternalLinks();

initializeButtonProtection();


/* ============================================================
   30. PUBLIC VIDLYRA API
============================================================ */

window.VidlyraFest = {

    version:
        "Mini Fest 2026",

    scrollTo:
        scrollToSection,

    notify:
        showNotification,

    copy:
        copyText,

    setTheme:
        setFestTheme,

    countdown:
        initializeCountdown,

    visits:
        getFestVisitCount,

    closeMenu:
        closeMobileMenu

};


/* ============================================================
   31. STARTUP MESSAGE
============================================================ */

console.log(
    "===================================="
);

console.log(
    "       VIDLYRA MINI FEST 2026"
);

console.log(
    "       Global JS Loaded"
);

console.log(
    "===================================="
);
