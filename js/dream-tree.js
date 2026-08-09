/* ============================================================
   VIDLYRA MINI FEST 2026
   DREAM TREE
   File: js/dream-tree.js
   ============================================================ */

"use strict";


/* ============================================================
   1. CONFIG
   ============================================================ */

const DREAM_TREE_CONFIG = {

    totalLeaves: 12,

    treeImage:
        "assets/dream-tree/images/tree.png",

    leafImage:
        "assets/dream-tree/images/leaf.png",

    backgroundImage:
        "assets/dream-tree/images/forest-bg.png",

    ambientAudio:
        "assets/dream-tree/audio/ambient.mp3",

    leafAudio:
        "assets/dream-tree/audio/leaf.mp3",

    memoryAudio:
        "assets/dream-tree/audio/memory.mp3",

    storageKey:
        "vidlyra_dream_tree_2026"

};


/* ============================================================
   2. DREAM TREE MEMORIES
   ============================================================ */

const DREAM_MEMORIES = [

    {
        title: "The First Spark",

        category: "THE BEGINNING",

        date: "CHAPTER 01",

        text:
        "Every journey begins with a small idea. Before there was a universe, there was only a dream waiting to become real."
    },


    {
        title: "The First Creation",

        category: "CREATION",

        date: "CHAPTER 02",

        text:
        "A blank screen slowly became a world. Characters, stories and ideas began finding their place."
    },


    {
        title: "A New Chapter",

        category: "STORY",

        date: "CHAPTER 03",

        text:
        "One story ended and another began. Every chapter became another step forward."
    },


    {
        title: "The Night of Ideas",

        category: "MEMORY",

        date: "CHAPTER 04",

        text:
        "Some of the best ideas appeared during quiet nights, when everything else became silent."
    },


    {
        title: "The Festival Dream",

        category: "VIDLYRA FEST",

        date: "CHAPTER 05",

        text:
        "The idea of a festival transformed the journey into something everyone could experience together."
    },


    {
        title: "The Impossible Project",

        category: "THE JOURNEY",

        date: "CHAPTER 06",

        text:
        "Some ideas looked difficult at first. But every difficult project became another lesson."
    },


    {
        title: "The Universe Expanded",

        category: "UNIVERSE",

        date: "CHAPTER 07",

        text:
        "New characters, new worlds and new stories slowly connected into a larger universe."
    },


    {
        title: "The Quiet Moment",

        category: "REFLECTION",

        date: "CHAPTER 08",

        text:
        "Not every important moment was loud. Some memories were simply moments of stopping and realizing how far the journey had gone."
    },


    {
        title: "The People Behind It",

        category: "THE TEAM",

        date: "CHAPTER 09",

        text:
        "Every creation carries the effort of the people and ideas that helped bring it to life."
    },


    {
        title: "The Unexpected Turn",

        category: "UNEXPECTED",

        date: "CHAPTER 10",

        text:
        "The journey never followed a perfectly straight path. Unexpected turns became part of the story."
    },


    {
        title: "The Dream Remains",

        category: "THE DREAM",

        date: "CHAPTER 11",

        text:
        "Projects can change and chapters can close, but a meaningful dream can remain part of the journey."
    },


    {
        title: "One More Leaf",

        category: "TODAY",

        date: "FINAL MEMORY",

        text:
        "Take this leaf with you. It is a small reminder that every journey is made from many little moments."
    }

];


/* ============================================================
   3. STATE
   ============================================================ */

const dreamTreeState = {

    collectedLeaves: [],

    selectedLeaf: null,

    audioEnabled: true,

    initialized: false

};


/* ============================================================
   4. AUDIO
   ============================================================ */

let ambientAudio = null;

let leafAudio = null;

let memoryAudio = null;


/* ============================================================
   5. DOM ELEMENTS
   ============================================================ */

let stage;

let treeImage;

let backgroundImage;

let leavesContainer;

let particlesContainer;

let memoryPanel;

let memoryTitle;

let memoryText;

let memoryDate;

let memoryLabel;

let memoryClose;

let randomButton;

let collectionButton;

let collectionPanel;

let collectionCount;

let collectionProgress;

let memoryCounter;

let audioButton;


/* ============================================================
   6. START
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    initDreamTree
);


function initDreamTree() {

    stage =
        document.querySelector(
            ".dream-tree-stage"
        );

    if (!stage) {

        return;

    }


    cacheElements();

    loadProgress();

    setupImages();

    setupAudio();

    createLeaves();

    createParticles();

    setupEvents();

    updateCollection();

    updateAudioButton();

    hideLoading();


    dreamTreeState.initialized =
        true;

}


/* ============================================================
   7. CACHE ELEMENTS
   ============================================================ */

function cacheElements() {

    treeImage =
        document.querySelector(
            ".dream-tree-image"
        );


    backgroundImage =
        document.querySelector(
            ".dream-tree-bg-image"
        );


    leavesContainer =
        document.querySelector(
            ".dream-tree-leaves"
        );


    particlesContainer =
        document.querySelector(
            ".dream-particles"
        );


    memoryPanel =
        document.querySelector(
            ".dream-memory-panel"
        );


    memoryTitle =
        document.querySelector(
            ".dream-memory-title"
        );


    memoryText =
        document.querySelector(
            ".dream-memory-text"
        );


    memoryDate =
        document.querySelector(
            ".dream-memory-date"
        );


    memoryLabel =
        document.querySelector(
            ".dream-memory-label"
        );


    memoryClose =
        document.querySelector(
            ".dream-memory-close"
        );


    randomButton =
        document.querySelector(
            "#randomLeafButton"
        );


    collectionButton =
        document.querySelector(
            "#collectionButton"
        );


    collectionPanel =
        document.querySelector(
            ".dream-collection"
        );


    collectionCount =
        document.querySelector(
            ".dream-collection-count"
        );


    collectionProgress =
        document.querySelector(
            ".dream-collection-progress"
        );


    memoryCounter =
        document.querySelector(
            ".dream-memory-counter"
        );


    audioButton =
        document.querySelector(
            ".dream-audio-control"
        );

}


/* ============================================================
   8. IMAGES
   ============================================================ */

function setupImages() {

    if (treeImage) {

        treeImage.src =
            DREAM_TREE_CONFIG.treeImage;

    }


    if (backgroundImage) {

        backgroundImage.src =
            DREAM_TREE_CONFIG.backgroundImage;

    }

}


/* ============================================================
   9. AUDIO SETUP
   ============================================================ */

function setupAudio() {

    ambientAudio =
        new Audio(
            DREAM_TREE_CONFIG.ambientAudio
        );


    leafAudio =
        new Audio(
            DREAM_TREE_CONFIG.leafAudio
        );


    memoryAudio =
        new Audio(
            DREAM_TREE_CONFIG.memoryAudio
        );


    ambientAudio.loop =
        true;


    ambientAudio.volume =
        0.22;


    leafAudio.volume =
        0.55;


    memoryAudio.volume =
        0.55;

}


/* ============================================================
   10. CREATE LEAVES
   ============================================================ */

function createLeaves() {

    if (!leavesContainer) {

        return;

    }


    leavesContainer.innerHTML =
        "";


    const positions = [

        [31, 24],

        [42, 18],

        [54, 22],

        [66, 29],

        [25, 36],

        [38, 32],

        [58, 34],

        [72, 39],

        [34, 46],

        [48, 42],

        [62, 47],

        [50, 27]

    ];


    positions.forEach(
        (position, index) => {

            const leaf =
                document.createElement(
                    "button"
                );


            leaf.type =
                "button";


            leaf.className =
                "dream-leaf";


            leaf.dataset.leafId =
                index + 1;


            leaf.setAttribute(
                "aria-label",
                "Memory leaf " +
                (index + 1)
            );


            leaf.style.left =
                position[0] + "%";


            leaf.style.top =
                position[1] + "%";


            leaf.style.setProperty(
                "--leaf-duration",
                (
                    4 +
                    Math.random() * 3
                ) + "s"
            );


            leaf.style.setProperty(
                "--leaf-rotation",
                (
                    Math.random() * 30 -
                    15
                ) + "deg"
            );


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                DREAM_TREE_CONFIG.leafImage;


            image.alt =
                "";


            image.draggable =
                false;


            leaf.appendChild(
                image
            );


            leaf.addEventListener(
                "click",
                () => {

                    selectLeaf(
                        index + 1
                    );

                }
            );


            if (
                dreamTreeState.collectedLeaves.includes(
                    index + 1
                )
            ) {

                leaf.classList.add(
                    "collected"
                );

            }


            leavesContainer.appendChild(
                leaf
            );

        }
    );

}


/* ============================================================
   11. SELECT LEAF
   ============================================================ */

function selectLeaf(leafId) {

    const leaf =
        document.querySelector(
            `.dream-leaf[data-leaf-id="${leafId}"]`
        );


    if (!leaf) {

        return;

    }


    clearSelectedLeaves();


    leaf.classList.add(
        "selected"
    );


    dreamTreeState.selectedLeaf =
        leafId;


    playLeafAudio();


    stage.classList.add(
        "leaf-selected"
    );


    setTimeout(
        () => {

            stage.classList.remove(
                "leaf-selected"
            );

        },
        800
    );


    setTimeout(
        () => {

            openMemory(
                leafId
            );

        },
        300
    );

}


/* ============================================================
   12. RANDOM LEAF
   ============================================================ */

function selectRandomLeaf() {

    const availableLeaves = [];


    for (
        let i = 1;
        i <= DREAM_TREE_CONFIG.totalLeaves;
        i++
    ) {

        if (
            !dreamTreeState.collectedLeaves.includes(
                i
            )
        ) {

            availableLeaves.push(
                i
            );

        }

    }


    if (
        availableLeaves.length === 0
    ) {

        showCompletion();

        return;

    }


    const randomIndex =
        Math.floor(
            Math.random() *
            availableLeaves.length
        );


    selectLeaf(
        availableLeaves[randomIndex]
    );

}


/* ============================================================
   13. CLEAR SELECTED
   ============================================================ */

function clearSelectedLeaves() {

    document
        .querySelectorAll(
            ".dream-leaf.selected"
        )
        .forEach(
            leaf => {

                leaf.classList.remove(
                    "selected"
                );

            }
        );

}


/* ============================================================
   14. OPEN MEMORY
   ============================================================ */

function openMemory(leafId) {

    const memory =
        DREAM_MEMORIES[
            (leafId - 1) %
            DREAM_MEMORIES.length
        ];


    if (!memory) {

        return;

    }


    if (memoryLabel) {

        memoryLabel.textContent =
            memory.category;

    }


    if (memoryTitle) {

        memoryTitle.textContent =
            memory.title;

    }


    if (memoryText) {

        memoryText.textContent =
            memory.text;

    }


    if (memoryDate) {

        memoryDate.textContent =
            memory.date;

    }


    if (memoryPanel) {

        memoryPanel.classList.add(
            "open"
        );

    }


    collectLeaf(
        leafId
    );


    playMemoryAudio();

}


/* ============================================================
   15. CLOSE MEMORY
   ============================================================ */

function closeMemory() {

    if (!memoryPanel) {

        return;

    }


    memoryPanel.classList.remove(
        "open"
    );


    clearSelectedLeaves();


    dreamTreeState.selectedLeaf =
        null;

}


/* ============================================================
   16. COLLECT LEAF
   ============================================================ */

function collectLeaf(leafId) {

    if (
        !dreamTreeState.collectedLeaves.includes(
            leafId
        )
    ) {

        dreamTreeState.collectedLeaves.push(
            leafId
        );


        saveProgress();

    }


    const leaf =
        document.querySelector(
            `.dream-leaf[data-leaf-id="${leafId}"]`
        );


    if (leaf) {

        leaf.classList.add(
            "collected"
        );

    }


    updateCollection();

}


/* ============================================================
   17. UPDATE COLLECTION
   ============================================================ */

function updateCollection() {

    const collected =
        dreamTreeState.collectedLeaves.length;


    const total =
        DREAM_TREE_CONFIG.totalLeaves;


    const percentage =
        Math.round(
            (collected / total) *
            100
        );


    if (collectionCount) {

        collectionCount.textContent =
            `${collected} / ${total}`;

    }


    if (collectionProgress) {

        collectionProgress.style.width =
            percentage + "%";

    }


    if (memoryCounter) {

        memoryCounter.textContent =
            `MEMORIES ${collected} / ${total}`;

    }


    if (
        collected === total
    ) {

        stage.classList.add(
            "completed"
        );

    }

}


/* ============================================================
   18. COLLECTION PANEL
   ============================================================ */

function toggleCollection() {

    if (!collectionPanel) {

        return;

    }


    collectionPanel.classList.toggle(
        "open"
    );

}


/* ============================================================
   19. AUDIO - LEAF
   ============================================================ */

function playLeafAudio() {

    if (
        !dreamTreeState.audioEnabled ||
        !leafAudio
    ) {

        return;

    }


    leafAudio.currentTime =
        0;


    leafAudio.play()
        .catch(
            () => {}
        );

}


/* ============================================================
   20. AUDIO - MEMORY
   ============================================================ */

function playMemoryAudio() {

    if (
        !dreamTreeState.audioEnabled ||
        !memoryAudio
    ) {

        return;

    }


    memoryAudio.currentTime =
        0;


    memoryAudio.play()
        .catch(
            () => {}
        );

}


/* ============================================================
   21. AMBIENT AUDIO
   ============================================================ */

function startAmbientAudio() {

    if (
        !dreamTreeState.audioEnabled ||
        !ambientAudio
    ) {

        return;

    }


    ambientAudio.play()
        .catch(
            () => {}
        );

}


/* ============================================================
   22. AUDIO TOGGLE
   ============================================================ */

function toggleAudio() {

    dreamTreeState.audioEnabled =
        !dreamTreeState.audioEnabled;


    if (
        dreamTreeState.audioEnabled
    ) {

        startAmbientAudio();

    } else {

        if (ambientAudio) {

            ambientAudio.pause();

        }


        if (leafAudio) {

            leafAudio.pause();

        }


        if (memoryAudio) {

            memoryAudio.pause();

        }

    }


    updateAudioButton();

    saveProgress();

}


/* ============================================================
   23. AUDIO BUTTON
   ============================================================ */

function updateAudioButton() {

    if (!audioButton) {

        return;

    }


    if (
        dreamTreeState.audioEnabled
    ) {

        audioButton.textContent =
            "🔊";

        audioButton.classList.add(
            "playing"
        );

    } else {

        audioButton.textContent =
            "🔇";

        audioButton.classList.remove(
            "playing"
        );

    }

}


/* ============================================================
   24. START AUDIO AFTER USER ACTION
   ============================================================ */

document.addEventListener(
    "click",
    function firstUserInteraction() {

        startAmbientAudio();

    },
    {
        once: true
    }
);


/* ============================================================
   25. PARTICLES
   ============================================================ */

function createParticles() {

    if (!particlesContainer) {

        return;

    }


    particlesContainer.innerHTML =
        "";


    const amount =
        window.innerWidth < 650
            ? 18
            : 35;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "dream-particle";


        particle.style.left =
            Math.random() * 100 +
            "%";


        particle.style.top =
            (
                45 +
                Math.random() * 55
            ) + "%";


        particle.style.setProperty(
            "--particle-duration",
            (
                5 +
                Math.random() * 6
            ) + "s"
        );


        particle.style.setProperty(
            "--particle-x",
            (
                Math.random() * 100 -
                50
            ) + "px"
        );


        particle.style.animationDelay =
            Math.random() * 7 +
            "s";


        particlesContainer.appendChild(
            particle
        );

    }

}


/* ============================================================
   26. EVENT LISTENERS
   ============================================================ */

function setupEvents() {

    if (randomButton) {

        randomButton.addEventListener(
            "click",
            selectRandomLeaf
        );

    }


    if (collectionButton) {

        collectionButton.addEventListener(
            "click",
            toggleCollection
        );

    }


    if (memoryClose) {

        memoryClose.addEventListener(
            "click",
            closeMemory
        );

    }


    if (memoryPanel) {

        memoryPanel.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    memoryPanel
                ) {

                    closeMemory();

                }

            }
        );

    }


    if (audioButton) {

        audioButton.addEventListener(
            "click",
            toggleAudio
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeMemory();

                if (collectionPanel) {

                    collectionPanel.classList.remove(
                        "open"
                    );

                }

            }


            if (
                event.key ===
                "r"
            ) {

                selectRandomLeaf();

            }

        }
    );

}


/* ============================================================
   27. COMPLETION
   ============================================================ */

function showCompletion() {

    const message =
        document.querySelector(
            ".dream-message"
        );


    if (!message) {

        return;

    }


    message.classList.add(
        "visible"
    );


    const close =
        message.querySelector(
            "[data-close-message]"
        );


    if (close) {

        close.onclick =
            () => {

                message.classList.remove(
                    "visible"
                );

            };

    }

}


/* ============================================================
   28. LOCAL STORAGE
   ============================================================ */

function saveProgress() {

    const data = {

        collectedLeaves:
            dreamTreeState.collectedLeaves,

        audioEnabled:
            dreamTreeState.audioEnabled

    };


    try {

        localStorage.setItem(
            DREAM_TREE_CONFIG.storageKey,
            JSON.stringify(data)
        );

    } catch (error) {

        console.warn(
            "Dream Tree progress could not be saved.",
            error
        );

    }

}


/* ============================================================
   29. LOAD LOCAL STORAGE
   ============================================================ */

function loadProgress() {

    try {

        const saved =
            localStorage.getItem(
                DREAM_TREE_CONFIG.storageKey
            );


        if (!saved) {

            return;

        }


        const data =
            JSON.parse(
                saved
            );


        if (
            Array.isArray(
                data.collectedLeaves
            )
        ) {

            dreamTreeState.collectedLeaves =
                data.collectedLeaves.filter(
                    leafId =>
                        Number.isInteger(
                            leafId
                        ) &&
                        leafId >= 1 &&
                        leafId <=
                        DREAM_TREE_CONFIG.totalLeaves
                );

        }


        if (
            typeof data.audioEnabled ===
            "boolean"
        ) {

            dreamTreeState.audioEnabled =
                data.audioEnabled;

        }

    } catch (error) {

        console.warn(
            "Dream Tree progress could not be loaded.",
            error
        );

    }

}


/* ============================================================
   30. RESET SYSTEM
   ============================================================ */

function resetDreamTree() {

    dreamTreeState.collectedLeaves =
        [];

    dreamTreeState.selectedLeaf =
        null;


    try {

        localStorage.removeItem(
            DREAM_TREE_CONFIG.storageKey
        );

    } catch (error) {

        console.warn(
            "Could not reset Dream Tree.",
            error
        );

    }


    createLeaves();

    updateCollection();

    closeMemory();

    stage.classList.remove(
        "completed"
    );

}


/* ============================================================
   31. LOADING SCREEN
   ============================================================ */

function hideLoading() {

    const loading =
        document.querySelector(
            ".dream-tree-loading"
        );


    if (!loading) {

        return;

    }


    setTimeout(
        () => {

            loading.classList.add(
                "hidden"
            );

        },
        500
    );

}


/* ============================================================
   32. PUBLIC API
   ============================================================ */

window.VidlyraDreamTree = {

    randomLeaf:
        selectRandomLeaf,

    selectLeaf:
        selectLeaf,

    closeMemory:
        closeMemory,

    toggleAudio:
        toggleAudio,

    reset:
        resetDreamTree,

    getProgress:
        function () {

            return {
                collected:
                    [
                        ...dreamTreeState.collectedLeaves
                    ],

                total:
                    DREAM_TREE_CONFIG.totalLeaves
            };

        }

};


/* ============================================================
   END
   ============================================================ */
