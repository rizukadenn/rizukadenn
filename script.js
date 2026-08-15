/* =====================================================
   MAGICAL PASTEL BLUE BIRTHDAY
===================================================== */


/* =====================================================
   PERSONALIZATION
===================================================== */

// GANTI nama di sini
const birthdayName = "Someone Special";

// GANTI pesan di sini
const birthdayMessage =
    "Happy birthday! I hope this little corner of the internet can remind you that you are loved, appreciated, and deserving of beautiful things. May this new chapter bring you gentle days, unexpected happiness, wonderful memories, and dreams that slowly turn into reality. Keep smiling, keep dreaming, and keep being wonderfully you. 💙✨";


/* =====================================================
   ELEMENTS
===================================================== */

const loadingScreen =
    document.getElementById("loadingScreen");

const envelopeScreen =
    document.getElementById("envelopeScreen");

const envelope =
    document.getElementById("envelope");

const nameScreen =
    document.getElementById("nameScreen");

const mainContent =
    document.getElementById("mainContent");

const enterButton =
    document.getElementById("enterButton");

const heroName =
    document.getElementById("heroName");

const finalName =
    document.getElementById("finalName");

const receiverName =
    document.querySelector(".receiver-name");

const typingText =
    document.getElementById("typingText");

const wishMessage =
    document.getElementById("wishMessage");

const gift =
    document.getElementById("gift");

const giftButton =
    document.getElementById("giftButton");

const giftMessage =
    document.getElementById("giftMessage");

const scrollButton =
    document.getElementById("scrollButton");

const magicButton =
    document.getElementById("magicButton");

const musicButton =
    document.getElementById("musicButton");


/* =====================================================
   SET NAME
===================================================== */

receiverName.textContent = birthdayName;
heroName.textContent = birthdayName;
finalName.textContent = birthdayName;


/* =====================================================
   LOADING SCREEN
===================================================== */

let progress = 0;

const loadingProgress =
    document.querySelector(".loading-progress");

const loadingPercent =
    document.querySelector(".loading-percent");


const loadingInterval =
    setInterval(() => {

        progress++;

        loadingProgress.style.width =
            progress + "%";

        loadingPercent.textContent =
            progress + "%";


        if (progress >= 100) {

            clearInterval(loadingInterval);

            setTimeout(() => {

                loadingScreen.classList.add("hidden");

                envelopeScreen.classList.remove("hidden");

            }, 700);
        }

    }, 28);


/* =====================================================
   CREATE STARS
===================================================== */

const starsContainer =
    document.getElementById("stars");


for (let i = 0; i < 80; i++) {

    const star =
        document.createElement("span");

    star.className = "star";

    star.textContent =
        Math.random() > .5
            ? "✦"
            : "·";

    star.style.left =
        Math.random() * 100 + "%";

    star.style.top =
        Math.random() * 100 + "%";

    star.style.fontSize =
        (Math.random() * 8 + 5) + "px";

    star.style.animationDelay =
        Math.random() * 4 + "s";

    starsContainer.appendChild(star);
}


/* =====================================================
   FLOATING PARTICLES
===================================================== */

const particles =
    document.getElementById("particles");

const particleSymbols = [
    "♡",
    "♥",
    "✦",
    "✧",
    "⋆",
    "🦋",
    "✨"
];


function createParticle() {

    const particle =
        document.createElement("span");

    particle.className = "particle";

    particle.textContent =
        particleSymbols[
            Math.floor(
                Math.random() *
                particleSymbols.length
            )
        ];

    particle.style.left =
        Math.random() * 100 + "vw";

    particle.style.bottom =
        "-30px";

    particle.style.fontSize =
        (Math.random() * 15 + 10) + "px";

    particle.style.color =
        Math.random() > .5
            ? "#ffffff"
            : "#efc6d9";

    particle.style.setProperty(
        "--x",
        (Math.random() * 180 - 90) + "px"
    );

    particle.style.setProperty(
        "--duration",
        (Math.random() * 8 + 7) + "s"
    );

    particles.appendChild(particle);


    setTimeout(() => {

        particle.remove();

    }, 16000);
}


setInterval(createParticle, 650);


/* =====================================================
   ENVELOPE OPEN
===================================================== */

let envelopeOpened = false;


envelope.addEventListener("click", () => {

    if (envelopeOpened) return;

    envelopeOpened = true;

    envelope.classList.add("open");

    createBurst(
        window.innerWidth / 2,
        window.innerHeight / 2,
        20
    );


    setTimeout(() => {

        envelopeScreen.classList.add("hidden");

        nameScreen.classList.remove("hidden");

        createBurst(
            window.innerWidth / 2,
            window.innerHeight / 2,
            35
        );

    }, 1600);

});


/* =====================================================
   ENTER MAIN PAGE
===================================================== */

enterButton.addEventListener("click", () => {

    nameScreen.style.opacity = "0";

    nameScreen.style.transition =
        "opacity 1s ease";


    setTimeout(() => {

        nameScreen.classList.add("hidden");

        mainContent.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        startTyping();

    }, 900);

});


/* =====================================================
   SCROLL BUTTON
===================================================== */

scrollButton.addEventListener("click", () => {

    document
        .querySelector(".message-section")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* =====================================================
   TYPEWRITER
===================================================== */

let typingStarted = false;


function startTyping() {

    if (typingStarted) return;

    typingStarted = true;

    let index = 0;

    function type() {

        if (index < birthdayMessage.length) {

            typingText.textContent +=
                birthdayMessage.charAt(index);

            index++;

            setTimeout(
                type,
                28
            );

        }

    }

    type();
}


/* =====================================================
   CANDLE
===================================================== */

const candles =
    document.querySelectorAll(".candle");

let blownCandles = 0;


candles.forEach(candle => {

    candle.addEventListener("click", () => {

        if (
            candle.classList.contains("blown")
        ) {
            return;
        }

        candle.classList.add("blown");

        blownCandles++;

        createBurst(
            candle.getBoundingClientRect().left,
            candle.getBoundingClientRect().top,
            8
        );


        if (blownCandles === candles.length) {

            wishMessage.textContent =
                "✨ Wish made! May it come true. 💙";

            wishMessage.style.color =
                "#d797b5";

            wishMessage.style.transform =
                "scale(1.15)";

            setTimeout(() => {

                wishMessage.style.transform =
                    "scale(1)";

            }, 500);

            createBigBurst();

        }

    });

});


/* =====================================================
   GIFT
===================================================== */

let giftOpened = false;


giftButton.addEventListener("click", () => {

    if (giftOpened) return;

    giftOpened = true;

    gift.classList.add("open");

    giftButton.textContent =
        "✨ Gift opened! ✨";

    createBigBurst();


    setTimeout(() => {

        giftMessage.classList.add("show");

        giftMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 900);

});


gift.addEventListener("click", () => {

    if (!giftOpened) {

        giftButton.click();

    }

});


/* =====================================================
   MAGIC BUTTON
===================================================== */

magicButton.addEventListener("click", () => {

    createBigBurst();

    createBigBurst();

    document.body.animate(
        [
            {
                filter: "brightness(1)"
            },
            {
                filter: "brightness(1.15)"
            },
            {
                filter: "brightness(1)"
            }
        ],
        {
            duration: 1000
        }
    );


    magicButton.textContent =
        "✨ Magic activated ✨";


    setTimeout(() => {

        magicButton.textContent =
            "Make it magical ✨";

    }, 2500);

});


/* =====================================================
   BURST EFFECT
===================================================== */

function createBurst(x, y, amount = 15) {

    const symbols = [
        "✦",
        "✧",
        "♡",
        "♥",
        "✨"
    ];


    for (let i = 0; i < amount; i++) {

        const sparkle =
            document.createElement("span");

        sparkle.className =
            "click-sparkle";

        sparkle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        sparkle.style.left =
            x + "px";

        sparkle.style.top =
            y + "px";


        sparkle.style.setProperty(
            "--spark-x",
            (Math.random() * 160 - 80) + "px"
        );

        sparkle.style.setProperty(
            "--spark-y",
            (Math.random() * 160 - 80) + "px"
        );


        document.body.appendChild(
            sparkle
        );


        setTimeout(() => {

            sparkle.remove();

        }, 900);

    }

}


/* =====================================================
   BIG BURST
===================================================== */

function createBigBurst() {

    createBurst(
        window.innerWidth / 2,
        window.innerHeight / 2,
        50
    );

}


/* =====================================================
   CURSOR SPARKLES
===================================================== */

let lastSparkle = 0;


document.addEventListener("mousemove", e => {

    const now =
        Date.now();

    if (
        now - lastSparkle < 80
    ) {
        return;
    }

    lastSparkle = now;


    const sparkle =
        document.createElement("span");

    sparkle.className =
        "click-sparkle";

    sparkle.textContent =
        Math.random() > .5
            ? "✦"
            : "·";


    sparkle.style.left =
        e.clientX + "px";

    sparkle.style.top =
        e.clientY + "px";


    sparkle.style.fontSize =
        "9px";


    sparkle.style.setProperty(
        "--spark-x",
        (Math.random() * 25 - 12) + "px"
    );

    sparkle.style.setProperty(
        "--spark-y",
        (Math.random() * 25 - 12) + "px"
    );


    document.body.appendChild(
        sparkle
    );


    setTimeout(() => {

        sparkle.remove();

    }, 700);

});


/* =====================================================
   CLICK HEART
===================================================== */

document.addEventListener("click", e => {

    if (
        e.target.closest("button") ||
        e.target.closest(".envelope") ||
        e.target.closest(".gift") ||
        e.target.closest(".candle")
    ) {
        return;
    }

    createBurst(
        e.clientX,
        e.clientY,
        6
    );

});


/* =====================================================
   OPTIONAL MUSIC
===================================================== */

/*
    Tidak ada file musik eksternal agar website
    tetap aman dan langsung bekerja di GitHub Pages.

    Tombol ini menggunakan Web Audio API untuk
    membuat nada-nada sederhana.
*/

let audioContext = null;
let musicPlaying = false;
let musicTimer = null;


function playNote(
    frequency,
    duration = .25,
    delay = 0
) {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }


    setTimeout(() => {

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();


        oscillator.type =
            "sine";

        oscillator.frequency.value =
            frequency;


        gain.gain.setValueAtTime(
            0.0001,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            .06,
            audioContext.currentTime + .03
        );

        gain.gain.exponentialRampToValueAtTime(
            .0001,
            audioContext.currentTime + duration
        );


        oscillator.connect(gain);

        gain.connect(
            audioContext.destination
        );


        oscillator.start();

        oscillator.stop(
            audioContext.currentTime +
            duration
        );

    }, delay);

}


function startMusic() {

    const notes = [
        523.25,
        659.25,
        783.99,
        659.25,
        587.33,
        698.46,
        880,
        783.99
    ];


    let position = 0;


    musicTimer =
        setInterval(() => {

            if (!musicPlaying) return;

            playNote(
                notes[position],
                .45
            );

            position =
                (position + 1) %
                notes.length;

        }, 550);

}


musicButton.addEventListener(
    "click",
    async () => {

        if (!audioContext) {

            audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

        }


        if (
            audioContext.state === "suspended"
        ) {

            await audioContext.resume();

        }


        musicPlaying =
            !musicPlaying;


        if (musicPlaying) {

            musicButton.classList.add(
                "playing"
            );

            musicButton.textContent =
                "♫";

            startMusic();

        } else {

            musicButton.classList.remove(
                "playing"
            );

            musicButton.textContent =
                "♩";

            clearInterval(
                musicTimer
            );

        }

    }
);


/* =====================================================
   RANDOM FLOATING PARTICLES
===================================================== */

for (let i = 0; i < 10; i++) {

    setTimeout(
        createParticle,
        i * 400
    );

}


/* =====================================================
   CONSOLE MESSAGE
===================================================== */

console.log(
    "%c💙 Magical Pastel Blue Birthday 💙",
    "font-size:20px;color:#6caed0;font-weight:bold;"
);

console.log(
    "Made with love, sparkles and a little magic ✨"
);
