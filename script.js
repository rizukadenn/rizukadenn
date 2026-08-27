/* =========================================
   CONFIGURATION
========================================= */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxS1suysupUJSWoaGPXjSlrJw0h0FGq4XwxNjyrTsF1g4xvZZAajZTqklbpgS2dVJCtBg/exec";


/* =========================================
   DOM READY
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    initGuestName();

    initLoading();

    initInvitation();

    initMusic();

    initCountdown();

    initRSVP();

    initGuestbook();

    loadComments();

});


/* =========================================
   GUEST NAME
========================================= */

function initGuestName() {

    const params =
        new URLSearchParams(window.location.search);

    const guest =
        params.get("to");

    const guestName =
        document.getElementById("guestName");

    const rsvpName =
        document.getElementById("rsvpName");

    const commentName =
        document.getElementById("commentName");


    if (guest) {

        const decodedGuest =
            decodeURIComponent(guest)
                .replace(/\+/g, " ");

        const cleanName =
            decodedGuest.trim();

        if (cleanName) {

            guestName.textContent =
                cleanName;

            if (rsvpName) {

                rsvpName.value =
                    cleanName;

            }

            if (commentName) {

                commentName.value =
                    cleanName;

            }

        }

    }

}


/* =========================================
   LOADING
========================================= */

function initLoading() {

    const loadingScreen =
        document.getElementById("loadingScreen");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loadingScreen.classList.add("hide");

        }, 800);

    });

}


/* =========================================
   OPEN INVITATION
========================================= */

function initInvitation() {

    const openButton =
        document.getElementById("openInvitation");

    const cover =
        document.getElementById("cover");

    const mainContent =
        document.getElementById("mainContent");

    const music =
        document.getElementById("weddingMusic");

    const musicButton =
        document.getElementById("musicButton");


    openButton.addEventListener("click", () => {

        cover.classList.add("opened");

        mainContent.classList.remove("hidden");

        setTimeout(() => {

            mainContent.classList.add("visible");

        }, 100);


        /*
         * Browser biasanya mengizinkan audio
         * setelah user melakukan klik.
         */

        music.play()
            .then(() => {

                musicButton.classList.add(
                    "playing"
                );

            })
            .catch(() => {

                console.log(
                    "Autoplay musik diblokir browser."
                );

            });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================
   MUSIC
========================================= */

function initMusic() {

    const music =
        document.getElementById("weddingMusic");

    const musicButton =
        document.getElementById("musicButton");


    musicButton.addEventListener("click", () => {

        if (music.paused) {

            music.play()
                .then(() => {

                    musicButton.classList.add(
                        "playing"
                    );

                })
                .catch(() => {});

        } else {

            music.pause();

            musicButton.classList.remove(
                "playing"
            );

        }

    });

}


/* =========================================
   COUNTDOWN
========================================= */

function initCountdown() {

    /*
     * Format:
     * YYYY-MM-DDTHH:MM:SS
     */

    const weddingDate =
        new Date(
            "2026-12-12T09:00:00+07:00"
        ).getTime();


    function updateCountdown() {

        const now =
            new Date().getTime();

        const distance =
            weddingDate - now;


        if (distance <= 0) {

            document.getElementById("days")
                .textContent = "00";

            document.getElementById("hours")
                .textContent = "00";

            document.getElementById("minutes")
                .textContent = "00";

            document.getElementById("seconds")
                .textContent = "00";

            return;

        }


        const days =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );

        const hours =
            Math.floor(
                (distance %
                    (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );

        const minutes =
            Math.floor(
                (distance %
                    (1000 * 60 * 60)) /
                (1000 * 60)
            );

        const seconds =
            Math.floor(
                (distance %
                    (1000 * 60)) /
                1000
            );


        document.getElementById("days")
            .textContent =
            String(days).padStart(2, "0");

        document.getElementById("hours")
            .textContent =
            String(hours).padStart(2, "0");

        document.getElementById("minutes")
            .textContent =
            String(minutes).padStart(2, "0");

        document.getElementById("seconds")
            .textContent =
            String(seconds).padStart(2, "0");

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );

}


/* =========================================
   RSVP
========================================= */

function initRSVP() {

    const form =
        document.getElementById("rsvpForm");

    const status =
        document.getElementById("rsvpStatus");


    form.addEventListener("submit", async (event) => {

        event.preventDefault();


        const name =
            document.getElementById(
                "rsvpName"
            ).value.trim();

        const attendance =
            document.getElementById(
                "attendance"
            ).value;

        const guestCount =
            document.getElementById(
                "guestCount"
            ).value;

        const message =
            document.getElementById(
                "rsvpMessage"
            ).value.trim();


        if (!name || !attendance) {

            showStatus(
                status,
                "Mohon lengkapi data RSVP.",
                "error"
            );

            return;

        }


        showStatus(
            status,
            "Mengirim RSVP...",
            ""
        );


        try {

            const data = {

                type: "rsvp",

                nama: name,

                kehadiran:
                    attendance,

                jumlah:
                    guestCount,

                pesan:
                    message,

                timestamp:
                    new Date()
                        .toLocaleString(
                            "id-ID"
                        )

            };


            await sendToGoogleSheet(data);


            showStatus(
                status,
                "♡ RSVP berhasil dikirim. Terima kasih!",
                "success"
            );


            form.reset();


            /*
             * Pertahankan nama personal
             */

            const params =
                new URLSearchParams(
                    window.location.search
                );

            const guest =
                params.get("to");

            if (guest) {

                document.getElementById(
                    "rsvpName"
                ).value =
                    decodeURIComponent(
                        guest
                    ).replace(
                        /\+/g,
                        " "
                    );

            }


        } catch (error) {

            console.error(error);

            showStatus(
                status,
                "RSVP gagal dikirim. Silakan coba lagi.",
                "error"
            );

        }

    });

}


/* =========================================
   GUESTBOOK
========================================= */

function initGuestbook() {

    const form =
        document.getElementById(
            "guestbookForm"
        );

    const status =
        document.getElementById(
            "commentStatus"
        );


    form.addEventListener("submit", async (event) => {

        event.preventDefault();


        const name =
            document.getElementById(
                "commentName"
            ).value.trim();

        const message =
            document.getElementById(
                "commentMessage"
            ).value.trim();


        if (!name || !message) {

            showStatus(
                status,
                "Nama dan ucapan wajib diisi.",
                "error"
            );

            return;

        }


        showStatus(
            status,
            "Mengirim ucapan...",
            ""
        );


        try {

            const data = {

                type: "comment",

                nama:
                    name,

                pesan:
                    message,

                timestamp:
                    new Date()
                        .toLocaleString(
                            "id-ID"
                        )

            };


            await sendToGoogleSheet(data);


            showStatus(
                status,
                "♡ Ucapan berhasil dikirim!",
                "success"
            );


            /*
             * Tambahkan langsung ke tampilan
             * supaya tidak perlu refresh.
             */

            addCommentToPage({
                nama: name,
                pesan: message,
                timestamp:
                    new Date()
                        .toLocaleString(
                            "id-ID"
                        )
            });


            document.getElementById(
                "commentMessage"
            ).value = "";


        } catch (error) {

            console.error(error);

            showStatus(
                status,
                "Ucapan gagal dikirim. Coba lagi.",
                "error"
            );

        }

    });

}


/* =========================================
   SEND DATA TO GOOGLE APPS SCRIPT
========================================= */

async function sendToGoogleSheet(data) {

    /*
     * no-cors diperlukan karena Google Apps Script
     * dapat memberikan response yang berbeda
     * tergantung deployment.
     */

    await fetch(
        GOOGLE_SCRIPT_URL,
        {
            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type":
                    "text/plain;charset=utf-8"
            },

            body:
                JSON.stringify(data)
        }
    );

}


/* =========================================
   LOAD COMMENTS
========================================= */

async function loadComments() {

    const commentsList =
        document.getElementById(
            "commentsList"
        );


    try {

        const response =
            await fetch(
                GOOGLE_SCRIPT_URL +
                "?action=getComments"
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load comments"
            );

        }


        const data =
            await response.json();


        commentsList.innerHTML = "";


        if (
            !data.comments ||
            data.comments.length === 0
        ) {

            commentsList.innerHTML = `
                <div class="loading-comments">
                    Belum ada ucapan. Jadilah yang pertama ♡
                </div>
            `;

            return;

        }


        /*
         * Terbaru ditampilkan paling atas
         */

        const comments =
            [...data.comments]
                .reverse();


        comments.forEach(comment => {

            addCommentToPage(
                comment,
                false
            );

        });


    } catch (error) {

        console.error(
            "Comment loading error:",
            error
        );


        commentsList.innerHTML = `
            <div class="loading-comments">
                Belum ada ucapan untuk ditampilkan ♡
            </div>
        `;

    }

}


/* =========================================
   ADD COMMENT TO PAGE
========================================= */

function addCommentToPage(
    comment,
    prepend = true
) {

    const commentsList =
        document.getElementById(
            "commentsList"
        );


    /*
     * Hapus placeholder
     */

    const loading =
        commentsList.querySelector(
            ".loading-comments"
        );

    if (loading) {

        loading.remove();

    }


    const item =
        document.createElement(
            "div"
        );

    item.className =
        "comment-item";


    const name =
        document.createElement(
            "div"
        );

    name.className =
        "comment-name";

    name.textContent =
        comment.nama ||
        "Tamu";


    const message =
        document.createElement(
            "div"
        );

    message.className =
        "comment-message";

    message.textContent =
        comment.pesan ||
        "";


    const date =
        document.createElement(
            "div"
        );

    date.className =
        "comment-date";

    date.textContent =
        comment.timestamp ||
        "";


    item.appendChild(name);

    item.appendChild(message);

    if (comment.timestamp) {

        item.appendChild(date);

    }


    if (prepend) {

        commentsList.prepend(item);

    } else {

        commentsList.appendChild(item);

    }

}


/* =========================================
   STATUS MESSAGE
========================================= */

function showStatus(
    element,
    message,
    type
) {

    element.textContent =
        message;

    element.className =
        "form-status";

    if (type) {

        element.classList.add(type);

    }

}


/* =========================================
   SIMPLE SCROLL ANIMATION
========================================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: .12
        }
    );


document
    .querySelectorAll(
        ".section"
    )
    .forEach(section => {

        section.style.opacity = "0";

        section.style.transform =
            "translateY(25px)";

        section.style.transition =
            "opacity .8s ease, transform .8s ease";

        observer.observe(section);

    });
