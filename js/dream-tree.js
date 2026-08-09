/* =========================================
   VIDLYRA MINI FEST
   DREAM TREE ENGINE
========================================= */


/* =========================================
   LEAF DATABASE
========================================= */

const dreamLeaves = [

    {
        id: 1,
        rarity: "common",
        type: "MEMORY LEAF",
        xp: 5,
        message: "Every story begins with one small idea."
    },

    {
        id: 2,
        rarity: "common",
        type: "DREAM LEAF",
        xp: 5,
        message: "A blank page can become an entire universe."
    },

    {
        id: 3,
        rarity: "uncommon",
        type: "MEMORY LEAF",
        xp: 10,
        message: "Every new creation adds another piece to the journey."
    },

    {
        id: 4,
        rarity: "rare",
        type: "STORY LEAF",
        xp: 20,
        message: "Some dreams grow quietly before the world can see them."
    },

    {
        id: 5,
        rarity: "rare",
        type: "MEMORY LEAF",
        xp: 20,
        message: "The worlds you imagined became memories of the journey."
    },

    {
        id: 6,
        rarity: "epic",
        type: "DREAM LEAF",
        xp: 50,
        message: "One idea can become the beginning of something much bigger."
    },

    {
        id: 7,
        rarity: "common",
        type: "STORY LEAF",
        xp: 5,
        message: "Every chapter leaves something behind."
    },

    {
        id: 8,
        rarity: "uncommon",
        type: "DREAM LEAF",
        xp: 10,
        message: "Creating is another way of exploring the unknown."
    },

    {
        id: 9,
        rarity: "rare",
        type: "MEMORY LEAF",
        xp: 20,
        message: "The journey matters as much as the world created along the way."
    },

    {
        id: 10,
        rarity: "legendary",
        type: "LEGACY LEAF",
        xp: 100,
        message: "The dream was never only the destination. It was every step that led there."
    }

];


/* =========================================
   STORAGE
========================================= */

let playerData = {

    xp: Number(
        localStorage.getItem("vidlyraDreamXP")
    ) || 0,

    leaves: Number(
        localStorage.getItem("vidlyraDreamLeaves")
    ) || 0,

    collected: JSON.parse(
        localStorage.getItem("vidlyraCollectedLeaves") || "[]"
    ),

    sound: localStorage.getItem(
        "vidlyraDreamSound"
    ) !== "false"

};


/* =========================================
   ELEMENTS
========================================= */

const introScreen =
    document.getElementById("introScreen");

const dreamWorld =
    document.getElementById("dreamWorld");

const enterDreamBtn =
    document.getElementById("enterDreamBtn");

const takeLeafBtn =
    document.getElementById("takeLeafBtn");

const anotherLeafBtn =
    document.getElementById("anotherLeafBtn");

const closeModalBtn =
    document.getElementById("closeModalBtn");

const leafModal =
    document.getElementById("leafModal");

const fallingLeaf =
    document.getElementById("fallingLeaf");

const leafType =
    document.getElementById("leafType");

const leafNumber =
    document.getElementById("leafNumber");

const leafMessage =
    document.getElementById("leafMessage");

const xpReward =
    document.getElementById("xpReward");

const xpFill =
    document.getElementById("xpFill");

const xpText =
    document.getElementById("xpText");

const leafCount =
    document.getElementById("leafCount");

const levelNumber =
    document.getElementById("levelNumber");

const soundBtn =
    document.getElementById("soundBtn");

const dreamMusic =
    document.getElementById("dreamMusic");

const leafSound =
    document.getElementById("leafSound");

const secretNotice =
    document.getElementById("secretNotice");

const secretBtn =
    document.getElementById("secretBtn");

const finalDream =
    document.getElementById("finalDream");

const returnBtn =
    document.getElementById("returnBtn");

const particles =
    document.getElementById("particles");


/* =========================================
   INITIALIZE
========================================= */

updateUI();

createParticles();

updateSoundButton();


/* =========================================
   ENTER DREAM
========================================= */

enterDreamBtn.addEventListener(
    "click",
    () => {

        introScreen.classList.add("hidden");

        dreamWorld.classList.remove("hidden");

        startMusic();

    }
);


/* =========================================
   TAKE LEAF
========================================= */

takeLeafBtn.addEventListener(
    "click",
    takeLeaf
);


anotherLeafBtn.addEventListener(
    "click",
    () => {

        leafModal.classList.add("hidden");

        setTimeout(
            takeLeaf,
            250
        );

    }
);


/* =========================================
   TAKE LEAF FUNCTION
========================================= */

function takeLeaf() {

    takeLeafBtn.disabled = true;

    const leaf =
        getRandomLeaf();

    fallingLeaf.classList.remove(
        "animate"
    );

    void fallingLeaf.offsetWidth;

    fallingLeaf.classList.add(
        "animate"
    );

    playLeafSound();

    setTimeout(
        () => {

            showLeaf(leaf);

            takeLeafBtn.disabled = false;

        },
        1300
    );
}


/* =========================================
   RANDOM LEAF
========================================= */

function getRandomLeaf() {

    /*
        Small chance to avoid repeating
        the same leaf immediately.
    */

    let available =
        dreamLeaves.filter(
            leaf =>
                !playerData.collected.includes(
                    leaf.id
                )
        );

    /*
        If every leaf has been collected,
        allow the collection again.
    */

    if (available.length === 0) {

        playerData.collected = [];

        saveData();

        available = dreamLeaves;

    }

    /*
        Weighted rarity system
    */

    const weighted = [];

    available.forEach(
        leaf => {

            let weight = 1;

            if (leaf.rarity === "common") {
                weight = 60;
            }

            if (leaf.rarity === "uncommon") {
                weight = 25;
            }

            if (leaf.rarity === "rare") {
                weight = 10;
            }

            if (leaf.rarity === "epic") {
                weight = 4;
            }

            if (leaf.rarity === "legendary") {
                weight = 1;
            }

            for (
                let i = 0;
                i < weight;
                i++
            ) {
                weighted.push(leaf);
            }

        }
    );

    return weighted[
        Math.floor(
            Math.random() *
            weighted.length
        )
    ];
}


/* =========================================
   SHOW LEAF
========================================= */

function showLeaf(leaf) {

    /*
        Save collected leaf
    */

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

    playerData.xp += leaf.xp;

    saveData();

    /*
        Fill UI
    */

    leafType.textContent =
        leaf.type;

    leafNumber.textContent =
        "#" +
        String(leaf.id).padStart(
            2,
            "0"
        );

    leafMessage.textContent =
        leaf.message;

    xpReward.textContent =
        "+" +
        leaf.xp +
        " DREAM XP";


    updateUI();


    /*
        Show modal
    */

    leafModal.classList.remove(
        "hidden"
    );


    /*
        Check unlock
    */

    checkUnlocks();

}


/* =========================================
   CLOSE MODAL
========================================= */

closeModalBtn.addEventListener(
    "click",
    () => {

        leafModal.classList.add(
            "hidden"
        );

    }
);


/* =========================================
   XP / LEVEL
========================================= */

function getLevel() {

    return Math.floor(
        playerData.xp / 100
    ) + 1;

}


function getLevelXP() {

    return playerData.xp % 100;

}


function updateUI() {

    const level =
        getLevel();

    const currentXP =
        getLevelXP();

    levelNumber.textContent =
        String(level).padStart(
            2,
            "0"
        );

    xpText.textContent =
        currentXP +
        " / 100 XP";

    xpFill.style.width =
        currentXP +
        "%";

    leafCount.textContent =
        playerData.leaves;

}


/* =========================================
   SAVE
========================================= */

function saveData() {

    localStorage.setItem(
        "vidlyraDreamXP",
        playerData.xp
    );

    localStorage.setItem(
        "vidlyraDreamLeaves",
        playerData.leaves
    );

    localStorage.setItem(
        "vidlyraCollectedLeaves",
        JSON.stringify(
            playerData.collected
        )
    );

    localStorage.setItem(
        "vidlyraDreamSound",
        playerData.sound
    );

}


/* =========================================
   UNLOCK SYSTEM
========================================= */

function checkUnlocks() {

    /*
        Level 5
    */

    if (
        getLevel() >= 5 &&
        !localStorage.getItem(
            "vidlyraSecretUnlocked"
        )
    ) {

        localStorage.setItem(
            "vidlyraSecretUnlocked",
            "true"
        );

        showSecretNotice();

    }


    /*
        Level 10
    */

    if (
        getLevel() >= 10
    ) {

        setTimeout(
            showFinalDream,
            800
        );

    }

}


/* =========================================
   SECRET NOTICE
========================================= */

function showSecretNotice() {

    setTimeout(
        () => {

            secretNotice.classList.remove(
                "hidden"
            );

        },
        500
    );

}


/* =========================================
   SECRET BUTTON
========================================= */

secretBtn.addEventListener(
    "click",
    () => {

        secretNotice.classList.add(
            "hidden"
        );

        alert(
            "SECRET VIDLYRA MEMORY\n\n" +
            "A forgotten dream has been discovered.\n\n" +
            "More content will be revealed here."
        );

    }
);


/* =========================================
   FINAL DREAM
========================================= */

function showFinalDream() {

    finalDream.classList.remove(
        "hidden"
    );

}


/* =========================================
   RETURN
========================================= */

returnBtn.addEventListener(
    "click",
    () => {

        finalDream.classList.add(
            "hidden"
        );

    }
);


/* =========================================
   SOUND
========================================= */

function startMusic() {

    if (!playerData.sound) {
        return;
    }

    dreamMusic.volume = 0.25;

    dreamMusic.play()
        .catch(
            () => {
                /*
                    Browser may block autoplay.
                    User can enable it using
                    the sound button.
                */
            }
        );

}


function playLeafSound() {

    if (!playerData.sound) {
        return;
    }

    leafSound.currentTime = 0;

    leafSound.volume = 0.5;

    leafSound.play()
        .catch(
            () => {}
        );

}


soundBtn.addEventListener(
    "click",
    () => {

        playerData.sound =
            !playerData.sound;

        saveData();

        updateSoundButton();

        if (
            playerData.sound
        ) {

            dreamMusic.play()
                .catch(
                    () => {}
                );

        } else {

            dreamMusic.pause();

        }

    }
);


function updateSoundButton() {

    soundBtn.textContent =
        playerData.sound
            ? "🔊"
            : "🔇";

}


/* =========================================
   PARTICLES
========================================= */

function createParticles() {

    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );

        particle.className =
            "particle";

        particle.style.left =
            Math.random() * 100 +
            "%";

        particle.style.animationDuration =
            (7 + Math.random() * 10) +
            "s";

        particle.style.animationDelay =
            (-Math.random() * 10) +
            "s";

        particle.style.opacity =
            Math.random();

        particles.appendChild(
            particle
        );

    }

}
