/* =========================================================
   ELEGANT PINK WEDDING
   FULL JAVASCRIPT
========================================================= */


/* =========================================================
   CONFIG
========================================================= */

const CONFIG = {

    GOOGLE_SCRIPT_URL:
        "https://script.google.com/macros/s/AKfycbxS1suysupUJSWoaGPXjSlrJw0h0FGq4XwxNjyrTsF1g4xvZZAajZTqklbpgS2dVJCtBg/exec",

    WHATSAPP_NUMBER:
        "6289526612634",

    WEDDING_DATE:
        "2026-12-12T08:00:00+07:00",

    ACCOUNT_NUMBER:
        "1234567890"

};


/* =========================================================
   DOM
========================================================= */

const loader =
    document.getElementById("loader");

const opening =
    document.getElementById("opening");

const mainContent =
    document.getElementById("mainContent");

const openInvitation =
    document.getElementById("openInvitation");

const weddingMusic =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicButton");

const guestNameOpening =
    document.getElementById("guestNameOpening");

const guestName =
    document.getElementById("guestName");

const rsvpForm =
    document.getElementById("rsvpForm");

const rsvpStatus =
    document.getElementById("rsvpStatus");

const submitText =
    document.getElementById("submitText");

const submitLoading =
    document.getElementById("submitLoading");

const nameInput =
    document.getElementById("name");


/* =========================================================
   PERSONAL GUEST
========================================================= */

function getGuestName() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const guest =
        params.get("to");

    if (!guest) {

        return "Tamu Undangan";

    }

    try {

        return decodeURIComponent(
            guest.replace(/\+/g, " ")
        ).trim()
        || "Tamu Undangan";

    }

    catch {

        return "Tamu Undangan";

    }

}


const currentGuest =
    getGuestName();


if (guestNameOpening) {

    guestNameOpening.textContent =
        currentGuest;

}


if (guestName) {

    guestName.textContent =
        currentGuest;

}


if (
    nameInput &&
    currentGuest !== "Tamu Undangan"
) {

    nameInput.value =
        currentGuest;

}


/* =========================================================
   LOADER
========================================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                if (loader) {

                    loader.classList.add(
                        "hide"
                    );

                }

            },
            900
        );

    }
);


/* =========================================================
   OPEN INVITATION
========================================================= */

if (openInvitation) {

    openInvitation.addEventListener(
        "click",
        async () => {

            opening.classList.add(
                "closed"
            );

            mainContent.classList.remove(
                "hidden"
            );

            document.body.classList.remove(
                "locked"
            );


            /* MUSIC */

            try {

                await weddingMusic.play();

                musicButton.classList.add(
                    "playing"
                );

            }

            catch (error) {

                console.log(
                    "Autoplay music membutuhkan interaksi pengguna."
                );

            }

        }
    );

}


/* =========================================================
   MUSIC BUTTON
========================================================= */

if (musicButton) {

    musicButton.addEventListener(
        "click",
        async () => {

            if (
                weddingMusic.paused
            ) {

                try {

                    await weddingMusic.play();

                    musicButton.classList.add(
                        "playing"
                    );

                }

                catch (error) {

                    console.log(error);

                }

            }

            else {

                weddingMusic.pause();

                musicButton.classList.remove(
                    "playing"
                );

            }

        }
    );

}


/* =========================================================
   FLOATING PETALS
========================================================= */

const petalsContainer =
    document.getElementById(
        "petals"
    );


function createPetal() {

    if (!petalsContainer) {
        return;
    }


    const petal =
        document.createElement(
            "div"
        );


    petal.className =
        "petal";


    const size =
        Math.random() * 7 + 6;


    petal.style.width =
        `${size}px`;


    petal.style.height =
        `${size * 1.5}px`;


    petal.style.left =
        `${Math.random() * 100}%`;


    petal.style.animationDuration =
        `${Math.random() * 8 + 8}s`;


    petal.style.setProperty(
        "--drift",
        `${Math.random() * 220 - 110}px`
    );


    petalsContainer.appendChild(
        petal
    );


    setTimeout(
        () => {

            petal.remove();

        },
        18000
    );

}


for (
    let i = 0;
    i < 12;
    i++
) {

    createPetal();

}


setInterval(
    createPetal,
    1800
);


/* =========================================================
   COUNTDOWN
========================================================= */

const weddingDate =
    new Date(
        CONFIG.WEDDING_DATE
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();


    const difference =
        weddingDate - now;


    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {

        return;

    }


    if (
        difference <= 0
    ) {

        daysElement.textContent =
            "00";

        hoursElement.textContent =
            "00";

        minutesElement.textContent =
            "00";

        secondsElement.textContent =
            "00";

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                difference %
                (1000 * 60)
            ) /
            1000
        );


    daysElement.textContent =
        String(days).padStart(2, "0");


    hoursElement.textContent =
        String(hours).padStart(2, "0");


    minutesElement.textContent =
        String(minutes).padStart(2, "0");


    secondsElement.textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   RSVP
========================================================= */

if (rsvpForm) {

    rsvpForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                ).value.trim();


            const attendance =
                document.getElementById(
                    "attendance"
                ).value;


            const guests =
                document.getElementById(
                    "guests"
                ).value;


            const message =
                document.getElementById(
                    "message"
                ).value.trim();


            if (!name) {

                showStatus(
                    "Silakan masukkan nama.",
                    "error"
                );

                return;

            }


            if (!attendance) {

                showStatus(
                    "Silakan pilih kehadiran.",
                    "error"
                );

                return;

            }


            if (!guests) {

                showStatus(
                    "Silakan pilih jumlah tamu.",
                    "error"
                );

                return;

            }


            setSubmitLoading(true);


            const formData =
                new URLSearchParams();


            formData.append(
                "nama",
                name
            );


            formData.append(
                "kehadiran",
                attendance
            );


            formData.append(
                "jumlah_tamu",
                guests
            );


            formData.append(
                "ucapan",
                message
            );


            formData.append(
                "tamu_undangan",
                currentGuest
            );


            formData.append(
                "timestamp",
                new Date().toLocaleString(
                    "id-ID"
                )
            );


            try {

                /* GOOGLE SHEETS */

                await fetch(
                    CONFIG.GOOGLE_SCRIPT_URL,
                    {

                        method:
                            "POST",

                        mode:
                            "no-cors",

                        headers:
                            {
                                "Content-Type":
                                    "application/x-www-form-urlencoded;charset=UTF-8"
                            },

                        body:
                            formData.toString()

                    }
                );


                showStatus(
                    "RSVP berhasil dikirim. Terima kasih! 💗",
                    "success"
                );


                /* WHATSAPP */

                setTimeout(
                    () => {

                        sendWhatsApp(
                            name,
                            attendance,
                            guests,
                            message
                        );

                    },
                    700
                );


                rsvpForm.reset();


                if (
                    currentGuest !==
                    "Tamu Undangan"
                ) {

                    nameInput.value =
                        currentGuest;

                }

            }

            catch (error) {

                console.error(
                    error
                );


                showStatus(
                    "Gagal mengirim RSVP. Silakan coba lagi.",
                    "error"
                );

            }

            finally {

                setSubmitLoading(false);

            }

        }
    );

}


/* =========================================================
   WHATSAPP
========================================================= */

function sendWhatsApp(
    name,
    attendance,
    guests,
    message
) {

    const text =

`Halo, saya ingin memberikan konfirmasi untuk undangan pernikahan.

Nama: ${name}

Nama pada undangan: ${currentGuest}

Kehadiran: ${attendance}

Jumlah tamu: ${guests}

Ucapan:
${message || "-"}

Terima kasih. 💗`;


    const whatsappURL =

        "https://wa.me/" +
        CONFIG.WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(text);


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =========================================================
   STATUS
========================================================= */

function showStatus(
    message,
    type
) {

    if (!rsvpStatus) {
        return;
    }


    rsvpStatus.textContent =
        message;


    if (
        type === "success"
    ) {

        rsvpStatus.style.color =
            "#789478";

    }

    else {

        rsvpStatus.style.color =
            "#b55f6f";

    }

}


/* =========================================================
   SUBMIT LOADING
========================================================= */

function setSubmitLoading(
    loading
) {

    if (
        !rsvpForm ||
        !submitText ||
        !submitLoading
    ) {

        return;

    }


    const button =
        rsvpForm.querySelector(
            ".submit-button"
        );


    if (loading) {

        button.disabled =
            true;

        submitText.classList.add(
            "hidden"
        );

        submitLoading.classList.remove(
            "hidden"
        );

    }

    else {

        button.disabled =
            false;

        submitText.classList.remove(
            "hidden"
        );

        submitLoading.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   COPY ACCOUNT
========================================================= */

function copyAccount() {

    const accountNumber =
        CONFIG.ACCOUNT_NUMBER;


    if (
        navigator.clipboard
    ) {

        navigator.clipboard
            .writeText(
                accountNumber
            )
            .then(
                () => {

                    alert(
                        "Nomor rekening berhasil disalin 💗"
                    );

                }
            )
            .catch(
                () => {

                    alert(
                        "Nomor rekening: " +
                        accountNumber
                    );

                }
            );

    }

    else {

        alert(
            "Nomor rekening: " +
            accountNumber
        );

    }

}


/* =========================================================
   GALLERY
========================================================= */

const galleryItems =
    document.querySelectorAll(
        ".gallery-item"
    );


const lightbox =
    document.getElementById(
        "lightbox"
    );


const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );


const lightboxCaption =
    document.getElementById(
        "lightboxCaption"
    );


const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );


const lightboxPrev =
    document.getElementById(
        "lightboxPrev"
    );


const lightboxNext =
    document.getElementById(
        "lightboxNext"
    );


let currentGalleryIndex =
    0;


/* =========================================================
   OPEN GALLERY
========================================================= */

function openGallery(index) {

    if (
        !galleryItems.length
    ) {

        return;

    }


    currentGalleryIndex =
        index;


    const image =
        galleryItems[
            index
        ].querySelector(
            "img"
        );


    if (!image) {
        return;
    }


    lightboxImage.src =
        image.src;


    lightboxImage.alt =
        image.alt;


    lightboxCaption.textContent =
        "Our Beautiful Moment ♡";


    lightbox.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CLOSE GALLERY
========================================================= */

function closeGallery() {

    if (!lightbox) {
        return;
    }


    lightbox.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   NEXT
========================================================= */

function nextGallery() {

    currentGalleryIndex++;


    if (
        currentGalleryIndex >=
        galleryItems.length
    ) {

        currentGalleryIndex =
            0;

    }


    openGallery(
        currentGalleryIndex
    );

}


/* =========================================================
   PREVIOUS
========================================================= */

function previousGallery() {

    currentGalleryIndex--;


    if (
        currentGalleryIndex < 0
    ) {

        currentGalleryIndex =
            galleryItems.length - 1;

    }


    openGallery(
        currentGalleryIndex
    );

}


/* =========================================================
   GALLERY CLICK
========================================================= */

galleryItems.forEach(
    (item, index) => {

        item.addEventListener(
            "click",
            () => {

                openGallery(
                    index
                );

            }
        );

    }
);


/* =========================================================
   LIGHTBOX CONTROLS
========================================================= */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeGallery
    );

}


if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        nextGallery
    );

}


if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        previousGallery
    );

}


/* =========================================================
   CLICK OUTSIDE
========================================================= */

if (lightbox) {

    lightbox.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                lightbox
            ) {

                closeGallery();

            }

        }
    );

}


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            !lightbox ||
            !lightbox.classList.contains(
                "active"
            )
        ) {

            return;

        }


        if (
            event.key ===
            "Escape"
        ) {

            closeGallery();

        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            nextGallery();

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            previousGallery();

        }

    }
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".event-card, .person-card, .count-box, .gallery-item, .gift-card"
    );


if (
    "IntersectionObserver"
    in window
) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold:
                    0.12
            }
        );


    revealElements.forEach(
        element => {

            element.style.opacity =
                "0";

            element.style.transform =
                "translateY(25px)";

            element.style.transition =
                "opacity .8s ease, transform .8s ease";

            revealObserver.observe(
                element
            );

        }
    );

}
