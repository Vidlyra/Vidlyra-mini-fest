/* ============================================================
   VIDLYRA MINI FEST
   DREAM TREE SYSTEM
   File: js/dream-tree.js
   ============================================================ */

"use strict";

/* ============================================================
   1. DREAM TREE CONFIGURATION
   ============================================================ */

const DREAM_TREE_CONFIG = {

    maxLevel: 10,

    xpPerLevel: 100,

    animationDelay: 1300,

    musicVolume: 0.22,

    leafVolume: 0.50,

    secretVolume: 0.45,

    finalVolume: 0.50,

    storagePrefix: "vidlyra_dream_tree_"

};


/* ============================================================
   2. MEMORY LEAVES
   ============================================================ */

const DREAM_LEAVES = [

    {
        id: 1,
        rarity: "common",
        type: "MEMORY LEAF",
        xp: 5,
        message:
            "Every story begins with one small idea."
    },

    {
        id: 2,
        rarity: "common",
        type: "DREAM LEAF",
        xp: 5,
        message:
            "A blank page can become an entire universe."
    },

    {
        id: 3,
        rarity: "common",
        type: "STORY LEAF",
        xp: 5,
        message:
            "Every chapter leaves something behind."
    },

    {
        id: 4,
        rarity: "uncommon",
        type: "MEMORY LEAF",
        xp: 10,
        message:
            "Every new creation adds another piece to the journey."
    },

    {
        id: 5,
        rarity: "uncommon",
        type: "DREAM LEAF",
        xp: 10,
        message:
            "Creating is another way of exploring the unknown."
    },

    {
        id: 6,
        rarity: "uncommon",
        type: "STORY LEAF",
        xp: 10,
        message:
            "A dream becomes real when you decide to begin."
    },

    {
        id: 7,
        rarity: "rare",
        type: "MEMORY LEAF",
        xp: 20,
        message:
            "The worlds you imagined became memories of the journey."
    },

    {
        id: 8,
        rarity: "rare",
        type: "STORY LEAF",
        xp: 20,
        message:
            "Some dreams grow quietly before the world can see them."
    },

    {
        id: 9,
        rarity: "rare",
        type: "DREAM LEAF",
        xp: 20,
        message:
            "The journey matters as much as the world created along the way."
    },

    {
        id: 10,
        rarity: "epic",
        type: "DREAM LEAF",
        xp: 50,
        message:
            "One idea can become the beginning of something much bigger."
    },

    {
        id: 11,
        rarity: "epic",
        type: "MEMORY LEAF",
        xp: 50,
        message:
            "What once existed only in imagination can become part of a universe."
    },

    {
        id: 12,
        rarity: "legendary",
        type: "LEGACY LEAF",
        xp: 100,
        message:
            "The dream was never only the destination. It was every step that led there."
    }

];


/* ============================================================
   3. STORAGE KEYS
   ============================================================ */

const STORAGE = {

    xp:
        DREAM_TREE_CONFIG.storagePrefix +
        "xp",

    leaves:
        DREAM_TREE_CONFIG.storagePrefix +
        "leaves",

    collected:
        DREAM_TREE_CONFIG.storagePrefix +
        "collected",

    sound:
        DREAM_TREE_CONFIG.storagePrefix +
        "sound",

    intro:
        DREAM_TREE_CONFIG.storagePrefix +
        "intro",

    secret:
        DREAM_TREE_CONFIG.storagePrefix +
        "secret",

    final:
        DREAM_TREE_CONFIG.storagePrefix +
        "final"

};


/* ============================================================
   4. PLAYER DATA
   ============================================================ */

let playerData = {

    xp: loadNumber(
        STORAGE.xp,
        0
    ),

    leaves: loadNumber(
        STORAGE.leaves,
        0
    ),

    collected:
        loadArray(
            STORAGE.collected
        ),

    sound:
        loadBoolean(
            STORAGE.sound,
            true
        ),

    introSeen:
        loadBoolean(
            STORAGE.intro,
            false
        ),

    secretUnlocked:
        loadBoolean(
            STORAGE.secret,
            false
        ),

    finalUnlocked:
        loadBoolean(
            STORAGE.final,
            false
        )

};


/* ============================================================
   5. DOM ELEMENTS
   ============================================================ */

const elements = {

    introScreen:
        document.getElementById(
            "introScreen"
        ),

    dreamWorld:
        document.getElementById(
            "dreamWorld"
        ),

    enterDreamBtn:
        document.getElementById(
            "enterDreamBtn"
        ),

    takeLeafBtn:
        document.getElementById(
            "takeLeafBtn"
        ),

    anotherLeafBtn:
        document.getElementById(
            "anotherLeafBtn"
        ),

    closeModalBtn:
        document.getElementById(
            "closeModalBtn"
        ),

    leafModal:
        document.getElementById(
            "leafModal"
        ),

    fallingLeaf:
        document.getElementById(
            "fallingLeaf"
        ),

    leafType:
        document.getElementById(
            "leafType"
        ),

    leafNumber:
        document.getElementById(
            "leafNumber"
        ),

    leafMessage:
        document.getElementById(
            "leafMessage"
        ),

    xpReward:
        document.getElementById(
            "xpReward"
        ),

    xpFill:
        document.getElementById(
            "xpFill"
        ),

    xpText:
        document.getElementById(
            "xpText"
        ),

    leafCount:
        document.getElementById(
            "leafCount"
        ),

    levelNumber:
        document.getElementById(
            "levelNumber"
        ),

    soundBtn:
        document.getElementById(
            "soundBtn"
        ),

    dreamMusic:
        document.getElementById(
            "dreamMusic"
        ),

    leafSound:
        document.getElementById(
            "leafSound"
        ),

    secretSound:
        document.getElementById(
            "secretSound"
        ),

    finalSound:
        document.getElementById(
            "finalSound"
        ),

    secretNotice:
        document.getElementById(
            "secretNotice"
        ),

    secretBtn:
        document.getElementById(
            "secretBtn"
        ),

    finalDream:
        document.getElementById(
            "finalDream"
        ),

    returnBtn:
        document.getElementById(
            "returnBtn"
        ),

    particles:
        document.getElementById(
            "particles"
        )

};


/* ============================================================
   6. INITIALIZATION
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    initializeDreamTree
);


function initializeDreamTree() {

    updateUI();

    createParticles();

    updateSoundButton();

    setupEvents();

    prepareAudio();

    console.log(
        "🌳 Vidlyra Dream Tree initialized."
    );

}


/* ============================================================
   7. EVENT LISTENERS
   ============================================================ */

function setupEvents() {

    if (
        elements.enterDreamBtn
    ) {

        elements.enterDreamBtn.addEventListener(
            "click",
            enterDreamWorld
        );

    }


    if (
        elements.takeLeafBtn
    ) {

        elements.takeLeafBtn.addEventListener(
            "click",
            takeLeaf
        );

    }


    if (
        elements.anotherLeafBtn
    ) {

        elements.anotherLeafBtn.addEventListener(
            "click",
            takeAnotherLeaf
        );

    }


    if (
        elements.closeModalBtn
    ) {

        elements.closeModalBtn.addEventListener(
            "click",
            closeLeafModal
        );

    }


    if (
        elements.soundBtn
    ) {

        elements.soundBtn.addEventListener(
            "click",
            toggleSound
        );

    }


    if (
        elements.secretBtn
    ) {

        elements.secretBtn.addEventListener(
            "click",
            closeSecretNotice
        );

    }


    if (
        elements.returnBtn
    ) {

        elements.returnBtn.addEventListener(
            "click",
            closeFinalDream
        );

    }


    document.addEventListener(
        "keydown",
        handleKeyboard
    );

}


/* ============================================================
   8. ENTER DREAM WORLD
   ============================================================ */

function enterDreamWorld() {

    if (
        elements.introScreen
    ) {

        elements.introScreen.classList.add(
            "hidden"
        );

    }


    if (
        elements.dreamWorld
    ) {

        elements.dreamWorld.classList.remove(
            "hidden"
        );

    }


    playerData.introSeen = true;

    savePlayerData();

    startDreamMusic();

}


/* ============================================================
   9. TAKE LEAF
   ============================================================ */

function takeLeaf() {

    if (
        !elements.takeLeafBtn
    ) {

        return;

    }


    if (
        elements.takeLeafBtn.disabled
    ) {

        return;

    }


    elements.takeLeafBtn.disabled =
        true;


    const leaf =
        getRandomLeaf();


    animateFallingLeaf();

    playLeafSound();


    window.setTimeout(
        function () {

            showLeaf(
                leaf
            );

            elements.takeLeafBtn.disabled =
                false;

        },
        DREAM_TREE_CONFIG.animationDelay
    );

}


/* ============================================================
   10. RANDOM LEAF
   ============================================================ */

function getRandomLeaf() {

    let availableLeaves =
        DREAM_LEAVES.filter(
            function (leaf) {

                return !playerData.collected.includes(
                    leaf.id
                );

            }
        );


    /*
       If every leaf has already been collected,
       start a new cycle.
    */

    if (
        availableLeaves.length === 0
    ) {

        playerData.collected = [];

        savePlayerData();

        availableLeaves =
            DREAM_LEAVES;

    }


    return weightedRandom(
        availableLeaves
    );

}


/* ============================================================
   11. WEIGHTED RANDOM
   ============================================================ */

function weightedRandom(
    leaves
) {

    const weightedList = [];


    leaves.forEach(
        function (leaf) {

            let weight = 1;


            switch (
                leaf.rarity
            ) {

                case "common":

                    weight = 60;

                    break;


                case "uncommon":

                    weight = 25;

                    break;


                case "rare":

                    weight = 10;

                    break;


                case "epic":

                    weight = 4;

                    break;


                case "legendary":

                    weight = 1;

                    break;

            }


            for (
                let i = 0;
                i < weight;
                i++
            ) {

                weightedList.push(
                    leaf
                );

            }

        }
    );


    const randomIndex =
        Math.floor(
            Math.random() *
            weightedList.length
        );


    return weightedList[
        randomIndex
    ];

}


/* ============================================================
   12. FALLING LEAF ANIMATION
   ============================================================ */

function animateFallingLeaf() {

    if (
        !elements.fallingLeaf
    ) {

        return;

    }


    elements.fallingLeaf.classList.remove(
        "animate"
    );


    /*
       Forces browser reflow so animation
       can restart every time.
    */

    void elements.fallingLeaf.offsetWidth;


    elements.fallingLeaf.classList.add(
        "animate"
    );


    window.setTimeout(
        function () {

            elements.fallingLeaf.classList.remove(
                "animate"
            );

        },
        1600
    );

}


/* ============================================================
   13. SHOW LEAF
   ============================================================ */

function showLeaf(
    leaf
) {

    if (
        !leaf
    ) {

        return;

    }


    if (
        !playerData.collected.includes(
            leaf.id
        )
    ) {

        playerData.collected.push(
            leaf.id
        );

    }


    playerData.leaves += 1;

    playerData.xp +=
        leaf.xp;


    savePlayerData();

    updateUI();


    /*
       Fill modal.
    */

    if (
        elements.leafType
    ) {

        elements.leafType.textContent =
            leaf.type;

    }


    if (
        elements.leafNumber
    ) {

        elements.leafNumber.textContent =
            "#" +
            String(
                leaf.id
            ).padStart(
                2,
                "0"
            );

    }


    if (
        elements.leafMessage
    ) {

        elements.leafMessage.textContent =
            leaf.message;

    }


    if (
        elements.xpReward
    ) {

        elements.xpReward.textContent =
            "+" +
            leaf.xp +
            " DREAM XP";

    }


    if (
        elements.leafModal
    ) {

        elements.leafModal.classList.remove(
            "hidden"
        );

    }


    /*
       Check if a new stage has been unlocked.
    */

    checkUnlocks();

}


/* ============================================================
   14. TAKE ANOTHER LEAF
   ============================================================ */

function takeAnotherLeaf() {

    closeLeafModal();


    window.setTimeout(
        function () {

            takeLeaf();

        },
        250
    );

}


/* ============================================================
   15. CLOSE LEAF MODAL
   ============================================================ */

function closeLeafModal() {

    if (
        elements.leafModal
    ) {

        elements.leafModal.classList.add(
            "hidden"
        );

    }

}


/* ============================================================
   16. PLAYER LEVEL
   ============================================================ */

function getPlayerLevel() {

    const calculatedLevel =
        Math.floor(
            playerData.xp /
            DREAM_TREE_CONFIG.xpPerLevel
        ) + 1;


    return Math.min(
        calculatedLevel,
        DREAM_TREE_CONFIG.maxLevel
    );

}


/* ============================================================
   17. LEVEL XP
   ============================================================ */

function getCurrentLevelXP() {

    if (
        getPlayerLevel() >=
        DREAM_TREE_CONFIG.maxLevel
    ) {

        return DREAM_TREE_CONFIG.xpPerLevel;

    }


    return (
        playerData.xp %
        DREAM_TREE_CONFIG.xpPerLevel
    );

}


/* ============================================================
   18. UPDATE UI
   ============================================================ */

function updateUI() {

    const level =
        getPlayerLevel();


    const currentXP =
        getCurrentLevelXP();


    const percentage =
        Math.min(
            (
                currentXP /
                DREAM_TREE_CONFIG.xpPerLevel
            ) * 100,
            100
        );


    if (
        elements.levelNumber
    ) {

        elements.levelNumber.textContent =
            String(
                level
            ).padStart(
                2,
                "0"
            );

    }


    if (
        elements.xpText
    ) {

        elements.xpText.textContent =
            currentXP +
            " / " +
            DREAM_TREE_CONFIG.xpPerLevel +
            " XP";

    }


    if (
        elements.xpFill
    ) {

        elements.xpFill.style.width =
            percentage +
            "%";

    }


    if (
        elements.leafCount
    ) {

        elements.leafCount.textContent =
            playerData.leaves;

    }

}


/* ============================================================
   19. UNLOCK SYSTEM
   ============================================================ */

function checkUnlocks() {

    const level =
        getPlayerLevel();


    /*
       SECRET BRANCH
       Unlock at Level 5.
    */

    if (
        level >= 5 &&
        !playerData.secretUnlocked
    ) {

        playerData.secretUnlocked =
            true;

        savePlayerData();

        window.setTimeout(
            showSecretNotice,
            700
        );

    }


    /*
       FINAL DREAM
       Unlock at Level 10.
    */

    if (
        level >= 10 &&
        !playerData.finalUnlocked
    ) {

        playerData.finalUnlocked =
            true;

        savePlayerData();

        window.setTimeout(
            showFinalDream,
            1200
        );

    }

}


/* ============================================================
   20. SECRET BRANCH
   ============================================================ */

function showSecretNotice() {

    playSecretSound();


    if (
        elements.secretNotice
    ) {

        elements.secretNotice.classList.remove(
            "hidden"
        );

    }

}


function closeSecretNotice() {

    if (
        elements.secretNotice
    ) {

        elements.secretNotice.classList.add(
            "hidden"
        );

    }

}


/* ============================================================
   21. FINAL DREAM
   ============================================================ */

function showFinalDream() {

    playFinalSound();


    if (
        elements.finalDream
    ) {

        elements.finalDream.classList.remove(
            "hidden"
        );

    }

}


function closeFinalDream() {

    if (
        elements.finalDream
    ) {

        elements.finalDream.classList.add(
            "hidden"
        );

    }

}


/* ============================================================
   22. AUDIO PREPARATION
   ============================================================ */

function prepareAudio() {

    if (
        elements.dreamMusic
    ) {

        elements.dreamMusic.loop =
            true;

        elements.dreamMusic.volume =
            DREAM_TREE_CONFIG.musicVolume;

    }


    if (
        elements.leafSound
    ) {

        elements.leafSound.volume =
            DREAM_TREE_CONFIG.leafVolume;

    }


    if (
        elements.secretSound
    ) {

        elements.secretSound.volume =
            DREAM_TREE_CONFIG.secretVolume;

    }


    if (
        elements.finalSound
    ) {

        elements.finalSound.volume =
            DREAM_TREE_CONFIG.finalVolume;

    }

}


/* ============================================================
   23. START MUSIC
   ============================================================ */

function startDreamMusic() {

    if (
        !playerData.sound
    ) {

        return;

    }


    if (
        !elements.dreamMusic
    ) {

        return;

    }


    elements.dreamMusic.volume =
        DREAM_TREE_CONFIG.musicVolume;


    const musicPromise =
        elements.dreamMusic.play();


    if (
        musicPromise &&
        typeof musicPromise.catch ===
        "function"
    ) {

        musicPromise.catch(
            function () {

                /*
                   Browser autoplay protection.
                   Music will begin after the next
                   user interaction.
                */

                console.log(
                    "Dream music waiting for user interaction."
                );

            }
        );

    }

}


/* ============================================================
   24. LEAF SOUND
   ============================================================ */

function playLeafSound() {

    if (
        !playerData.sound
    ) {

        return;

    }


    if (
        !elements.leafSound
    ) {

        return;

    }


    elements.leafSound.currentTime =
        0;


    elements.leafSound.volume =
        DREAM_TREE_CONFIG.leafVolume;


    elements.leafSound.play()
        .catch(
            function () {}
        );

}


/* ============================================================
   25. SECRET SOUND
   ============================================================ */

function playSecretSound() {

    if (
        !playerData.sound
    ) {

        return;

    }


    if (
        !elements.secretSound
    ) {

        return;

    }


    elements.secretSound.currentTime =
        0;


    elements.secretSound.volume =
        DREAM_TREE_CONFIG.secretVolume;


    elements.secretSound.play()
        .catch(
            function () {}
        );

}


/* ============================================================
   26. FINAL SOUND
   ============================================================ */

function playFinalSound() {

    if (
        !playerData.sound
    ) {

        return;

    }


    if (
        !elements.finalSound
    ) {

        return;

    }


    elements.finalSound.currentTime =
        0;


    elements.finalSound.volume =
        DREAM_TREE_CONFIG.finalVolume;


    elements.finalSound.play()
        .catch(
            function () {}
        );

}


/* ============================================================
   27. SOUND TOGGLE
   ============================================================ */

function toggleSound() {

    playerData.sound =
        !playerData.sound;


    savePlayerData();

    updateSoundButton();


    if (
        playerData.sound
    ) {

        startDreamMusic();

    } else {

        stopAllAudio();

    }

}


/* ============================================================
   28. SOUND BUTTON
   ============================================================ */

function updateSoundButton() {

    if (
        !elements.soundBtn
    ) {

        return;

    }


    elements.soundBtn.textContent =
        playerData.sound
            ? "🔊"
            : "🔇";


    elements.soundBtn.setAttribute(
        "aria-label",
        playerData.sound
            ? "Mute sound"
            : "Enable sound"
    );

}


/* ============================================================
   29. STOP AUDIO
   ============================================================ */

function stopAllAudio() {

    const audioElements = [

        elements.dreamMusic,

        elements.leafSound,

        elements.secretSound,

        elements.finalSound

    ];


    audioElements.forEach(
        function (audio) {

            if (
                !audio
            ) {

                return;

            }


            audio.pause();

        }
    );

}


/* ============================================================
   30. PARTICLE SYSTEM
   ============================================================ */

function createParticles() {

    if (
        !elements.particles
    ) {

        return;

    }


    /*
       Prevent duplicate particles.
    */

    elements.particles.innerHTML =
        "";


    const particleCount =
        window.innerWidth < 700
            ? 20
            : 35;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        createParticle();

    }

}


/* ============================================================
   31. CREATE SINGLE PARTICLE
   ============================================================ */

function createParticle() {

    const particle =
        document.createElement(
            "div"
        );


    particle.className =
        "dream-particle";


    particle.style.left =
        randomNumber(
            0,
            100
        ) +
        "%";


    particle.style.animationDuration =
        randomNumber(
            7,
            17
        ) +
        "s";


    particle.style.animationDelay =
        randomNumber(
            -17,
            0
        ) +
        "s";


    particle.style.opacity =
        randomNumber(
            0.15,
            0.75
        );


    const size =
        randomNumber(
            1,
            4
        );


    particle.style.width =
        size +
        "px";


    particle.style.height =
        size +
        "px";


    elements.particles.appendChild(
        particle
    );

}


/* ============================================================
   32. KEYBOARD CONTROLS
   ============================================================ */

function handleKeyboard(
    event
) {

    /*
       ESC closes modal screens.
    */

    if (
        event.key === "Escape"
    ) {

        closeLeafModal();

        closeSecretNotice();

        closeFinalDream();

    }


    /*
       SPACE takes a leaf when
       Dream World is active.
    */

    if (
        event.code === "Space"
    ) {

        if (
            elements.dreamWorld &&
            !elements.dreamWorld.classList.contains(
                "hidden"
            ) &&
            elements.leafModal &&
            elements.leafModal.classList.contains(
                "hidden"
            )
        ) {

            event.preventDefault();

            takeLeaf();

        }

    }

}


/* ============================================================
   33. LOCAL STORAGE HELPERS
   ============================================================ */

function savePlayerData() {

    safeStorageSet(
        STORAGE.xp,
        String(
            playerData.xp
        )
    );


    safeStorageSet(
        STORAGE.leaves,
        String(
            playerData.leaves
        )
    );


    safeStorageSet(
        STORAGE.collected,
        JSON.stringify(
            playerData.collected
        )
    );


    safeStorageSet(
        STORAGE.sound,
        String(
            playerData.sound
        )
    );


    safeStorageSet(
        STORAGE.intro,
        String(
            playerData.introSeen
        )
    );


    safeStorageSet(
        STORAGE.secret,
        String(
            playerData.secretUnlocked
        )
    );


    safeStorageSet(
        STORAGE.final,
        String(
            playerData.finalUnlocked
        )
    );

}


/* ============================================================
   34. LOAD NUMBER
   ============================================================ */

function loadNumber(
    key,
    fallback
) {

    try {

        const value =
            localStorage.getItem(
                key
            );


        if (
            value === null
        ) {

            return fallback;

        }


        const number =
            Number(value);


        return Number.isFinite(
            number
        )
            ? number
            : fallback;

    }

    catch (
        error
    ) {

        console.warn(
            "Storage read failed:",
            error
        );


        return fallback;

    }

}


/* ============================================================
   35. LOAD ARRAY
   ============================================================ */

function loadArray(
    key
) {

    try {

        const value =
            localStorage.getItem(
                key
            );


        if (
            !value
        ) {

            return [];

        }


        const parsed =
            JSON.parse(
                value
            );


        return Array.isArray(
            parsed
        )
            ? parsed
            : [];

    }

    catch (
        error
    ) {

        console.warn(
            "Array storage read failed:",
            error
        );


        return [];

    }

}


/* ============================================================
   36. LOAD BOOLEAN
   ============================================================ */

function loadBoolean(
    key,
    fallback
) {

    try {

        const value =
            localStorage.getItem(
                key
            );


        if (
            value === null
        ) {

            return fallback;

        }


        return value ===
            "true";

    }

    catch (
        error
    ) {

        return fallback;

    }

}


/* ============================================================
   37. SAFE STORAGE SET
   ============================================================ */

function safeStorageSet(
    key,
    value
) {

    try {

        localStorage.setItem(
            key,
            value
        );

    }

    catch (
        error
    ) {

        console.warn(
            "Unable to save Dream Tree data:",
            error
        );

    }

}


/* ============================================================
   38. RANDOM NUMBER
   ============================================================ */

function randomNumber(
    min,
    max
) {

    return (
        Math.random() *
        (max - min)
    ) +
    min;

}


/* ============================================================
   39. RESET DREAM TREE
   ============================================================ */

function resetDreamTree() {

    const confirmed =
        window.confirm(
            "Reset your Vidlyra Dream Tree progress?"
        );


    if (
        !confirmed
    ) {

        return;

    }


    try {

        Object.keys(
            STORAGE
        ).forEach(
            function (key) {

                localStorage.removeItem(
                    STORAGE[key]
                );

            }
        );

    }

    catch (
        error
    ) {

        console.warn(
            "Could not reset storage:",
            error
        );

    }


    window.location.reload();

}


/* ============================================================
   40. DEVELOPMENT CONSOLE
   ============================================================ */

window.VidlyraDreamTree = {

    getPlayerData:
        function () {

            return {
                ...playerData
            };

        },


    getLeaves:
        function () {

            return [
                ...DREAM_LEAVES
            ];

        },


    getLevel:
        function () {

            return getPlayerLevel();

        },


    reset:
        function () {

            resetDreamTree();

        },


    addXP:
        function (
            amount
        ) {

            const safeAmount =
                Number(amount);


            if (
                !Number.isFinite(
                    safeAmount
                )
            ) {

                return;

            }


            playerData.xp +=
                safeAmount;


            savePlayerData();

            updateUI();

            checkUnlocks();

        },


    takeLeaf:
        function () {

            takeLeaf();

        }

};


/* ============================================================
   END
   ============================================================ */

console.log(
    "🌳 Vidlyra Dream Tree JS loaded."
);
