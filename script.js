/* =====================================================
   INTRO
===================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .getElementById("intro")
            .classList
            .add("hide");

    }, 3000);

});


/* =====================================================
   PARTICLE SYSTEM
===================================================== */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


class Particle {

    constructor() {

        this.x =
            Math.random() *
            canvas.width;

        this.y =
            Math.random() *
            canvas.height;

        this.size =
            Math.random() * 2;

        this.speed =
            Math.random() * .5 + .1;

        this.opacity =
            Math.random();

    }

    update() {

        this.y -= this.speed;

        if (this.y < 0) {

            this.y =
                canvas.height;

        }

    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,170,195,${this.opacity})`;

        ctx.fill();

    }

}


for (
    let i = 0;
    i < 150;
    i++
) {

    particles.push(
        new Particle()
    );

}


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(
        particle => {

            particle.update();

            particle.draw();

        }
    );

    requestAnimationFrame(
        animateParticles
    );

}

animateParticles();


/* =====================================================
   REVEAL ON SCROLL
===================================================== */

const reveals =
    document.querySelectorAll(".reveal");

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("visible");

                    }

                }
            );

        },
        {
            threshold: .15
        }
    );


reveals.forEach(
    element => {

        observer.observe(element);

    }
);


/* =====================================================
   BEGIN BUTTON
===================================================== */

document
    .getElementById("beginButton")
    .addEventListener(
        "click",
        () => {

            document
                .querySelector(".story-scene")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* =====================================================
   MUSIC
===================================================== */

const music =
    document.getElementById("music");

const musicButton =
    document.getElementById(
        "musicButton"
    );

let musicPlaying = false;


musicButton.addEventListener(
    "click",
    async () => {

        if (!music.src) {

            alert(
                "Add music.mp3 to the folder to enable music."
            );

            return;

        }

        if (!musicPlaying) {

            await music.play();

            musicPlaying = true;

            musicButton.textContent =
                "🔊";

        } else {

            music.pause();

            musicPlaying = false;

            musicButton.textContent =
                "♫";

        }

    }
);


/* =====================================================
   CANDLE
===================================================== */

const wishButton =
    document.getElementById(
        "wishButton"
    );

wishButton.addEventListener(
    "click",
    () => {

        const flame =
            document.querySelector(
                ".flame"
            );

        flame.style.opacity = "0";

        flame.style.transform =
            "scale(0)";

        wishButton.innerHTML =
            "✨ WISH MADE ✨";

        createHeartExplosion(
            window.innerWidth / 2,
            window.innerHeight / 2
        );

        fireworks();

    }
);


/* =====================================================
   HEART PARTICLES
===================================================== */

function createHeart(
    x,
    y
) {

    const heart =
        document.createElement(
            "div"
        );

    heart.innerHTML =
        ["❤️","💕","💖","💗","✨"]
        [
            Math.floor(
                Math.random() * 5
            )
        ];

    heart.style.position =
        "fixed";

    heart.style.left =
        x + "px";

    heart.style.top =
        y + "px";

    heart.style.zIndex =
        "9000";

    heart.style.pointerEvents =
        "none";

    heart.style.fontSize =
        15 +
        Math.random() * 25 +
        "px";

    document.body.appendChild(
        heart
    );


    const animation =
        heart.animate(
            [

                {
                    opacity: 1,

                    transform:
                        "translateY(0) scale(.5)"
                },

                {
                    opacity: 0,

                    transform:
                        `translateY(-250px)
                         translateX(${Math.random()*100-50}px)
                         scale(1.4)`
                }

            ],
            {
                duration:
                    2500,

                easing:
                    "ease-out"
            }
        );


    animation.onfinish =
        () => {

            heart.remove();

        };

}


/* =====================================================
   HEART EXPLOSION
===================================================== */

function createHeartExplosion(
    x,
    y
) {

    for (
        let i = 0;
        i < 25;
        i++
    ) {

        setTimeout(
            () => {

                createHeart(
                    x +
                    Math.random() *
                    300 - 150,

                    y +
                    Math.random() *
                    200 - 100
                );

            },
            i * 50
        );

    }

}


/* =====================================================
   RANDOM FLOATING HEARTS
===================================================== */

setInterval(
    () => {

        if (
            Math.random() > .45
        ) {

            createHeart(
                Math.random() *
                window.innerWidth,

                window.innerHeight
            );

        }

    },
    900
);


/* =====================================================
   FIREWORKS
===================================================== */

let fireworksParticles = [];


function createFirework(
    x,
    y
) {

    const colors = [
        "#ff4d80",
        "#ffabc0",
        "#ffffff",
        "#d89cff",
        "#ffd0dc"
    ];

    const color =
        colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ];


    for (
        let i = 0;
        i < 80;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;

        const speed =
            Math.random() * 7 + 2;

        fireworksParticles.push({

            x: x,
            y: y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life: 100,

            color: color

        });

    }

}


function fireworks() {

    let count = 0;

    const interval =
        setInterval(
            () => {

                createFirework(

                    Math.random() *
                    canvas.width,

                    Math.random() *
                    canvas.height *
                    .6

                );

                count++;

                if (
                    count > 12
                ) {

                    clearInterval(
                        interval
                    );

                }

            },
            400
        );

}


function animateFireworks() {

    fireworksParticles.forEach(
        (p, index) => {

            p.x += p.vx;

            p.y += p.vy;

            p.vy += .05;

            p.life--;

            ctx.globalAlpha =
                p.life / 100;

            ctx.fillStyle =
                p.color;

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                2,
                0,
                Math.PI * 2
            );

            ctx.fill();


            if (
                p.life <= 0
            ) {

                fireworksParticles
                    .splice(index,1);

            }

        }
    );

    ctx.globalAlpha = 1;

    requestAnimationFrame(
        animateFireworks
    );

}

animateFireworks();


/* =====================================================
   SECRET SCREEN
===================================================== */

const surpriseButton =
    document.getElementById(
        "surpriseButton"
    );

const secretScreen =
    document.getElementById(
        "secretScreen"
    );

const closeSecret =
    document.getElementById(
        "closeSecret"
    );


surpriseButton.addEventListener(
    "click",
    () => {

        secretScreen
            .classList
            .add("show");

        fireworks();

        createHeartExplosion(
            window.innerWidth / 2,
            window.innerHeight / 2
        );

    }
);


closeSecret.addEventListener(
    "click",
    () => {

        secretScreen
            .classList
            .remove("show");

    }
);


/* =====================================================
   MOUSE PARALLAX
===================================================== */

document.addEventListener(
    "mousemove",
    event => {

        const x =
            (event.clientX /
                window.innerWidth -
                .5) * 2;

        const y =
            (event.clientY /
                window.innerHeight -
                .5) * 2;


        const orb =
            document.querySelector(
                ".orb"
            );


        if (orb) {

            orb.style.transform =
                `rotateY(${x * 12}deg)
                 rotateX(${y * -12}deg)`;

        }

    }
);


/* =====================================================
   TOUCH PARALLAX
===================================================== */

document.addEventListener(
    "touchmove",
    event => {

        if (
            !event.touches.length
        )
            return;


        const touch =
            event.touches[0];


        const x =
            (touch.clientX /
                window.innerWidth -
                .5) * 2;


        const y =
            (touch.clientY /
                window.innerHeight -
                .5) * 2;


        const orb =
            document.querySelector(
                ".orb"
            );


        if (orb) {

            orb.style.transform =
                `rotateY(${x * 10}deg)
                 rotateX(${y * -10}deg)`;

        }

    },
    {
        passive:true
    }
);


/* =====================================================
   FINAL SCENE FIREWORKS
===================================================== */

const finalScene =
    document.querySelector(
        ".final-scene"
    );


const finalObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        fireworks();

                        finalObserver
                            .disconnect();

                    }

                }
            );

        },
        {
            threshold:.4
        }
    );


finalObserver.observe(
    finalScene
);


/* =====================================================
   ESCAPE SECRET
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            secretScreen
                .classList
                .remove("show");

        }

    }
);
