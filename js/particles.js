/* =========================================================
   CART RESCUE AI
   AI PARTICLE / NEURAL NETWORK BACKGROUND
   File: js/particles.js
   Version: 1.0
========================================================= */

"use strict";


/* =========================================================
   01. CONFIGURATION
========================================================= */

const ParticleConfig = {

    selector:
        "#particles-canvas, .particles-canvas",

    particleCountDesktop:
        75,

    particleCountTablet:
        50,

    particleCountMobile:
        28,

    maxDistance:
        145,

    mouseDistance:
        180,

    particleSpeed:
        0.35,

    mouseInfluence:
        0.025,

    particleSizeMin:
        1,

    particleSizeMax:
        2.5,

    lineOpacity:
        0.16,

    mouseLineOpacity:
        0.30,

    backgroundOpacity:
        0,

    colors: {

        primary:
            "0, 229, 255",

        secondary:
            "108, 99, 255",

        accent:
            "0, 255, 198"

    }

};


/* =========================================================
   02. PARTICLE SYSTEM
========================================================= */

class CartRescueParticles {

    constructor(canvas) {

        this.canvas =
            canvas;

        this.ctx =
            canvas.getContext(
                "2d"
            );

        this.width =
            0;

        this.height =
            0;

        this.devicePixelRatio =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );

        this.particles =
            [];

        this.animationFrame =
            null;

        this.mouse = {

            x:
                null,

            y:
                null,

            active:
                false

        };

        this.isVisible =
            true;

        this.isRunning =
            true;

        this.resizeTimer =
            null;

        this.initialize();

    }


    /* =====================================================
       03. INITIALIZE
    ===================================================== */

    initialize() {

        this.setupCanvas();

        this.createParticles();

        this.bindEvents();

        this.animate();

    }


    /* =====================================================
       04. SETUP CANVAS
    ===================================================== */

    setupCanvas() {

        this.width =
            this.canvas.clientWidth ||
            window.innerWidth;

        this.height =
            this.canvas.clientHeight ||
            window.innerHeight;


        this.canvas.width =
            Math.floor(
                this.width *
                this.devicePixelRatio
            );


        this.canvas.height =
            Math.floor(
                this.height *
                this.devicePixelRatio
            );


        this.ctx.setTransform(
            this.devicePixelRatio,
            0,
            0,
            this.devicePixelRatio,
            0,
            0
        );

    }


    /* =====================================================
       05. GET PARTICLE COUNT
    ===================================================== */

    getParticleCount() {

        const width =
            window.innerWidth;


        if (width <= 600) {

            return ParticleConfig
                .particleCountMobile;

        }


        if (width <= 1000) {

            return ParticleConfig
                .particleCountTablet;

        }


        return ParticleConfig
            .particleCountDesktop;

    }


    /* =====================================================
       06. CREATE PARTICLES
    ===================================================== */

    createParticles() {

        this.particles = [];


        const count =
            this.getParticleCount();


        for (
            let i = 0;
            i < count;
            i++
        ) {

            this.particles.push(
                this.createParticle()
            );

        }

    }


    /* =====================================================
       07. CREATE SINGLE PARTICLE
    ===================================================== */

    createParticle() {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            ParticleConfig.particleSpeed *
            (
                0.5 +
                Math.random()
            );


        const colors =
            Object.values(
                ParticleConfig.colors
            );


        return {

            x:
                Math.random() *
                this.width,

            y:
                Math.random() *
                this.height,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            radius:
                ParticleConfig.particleSizeMin +
                Math.random() *
                (
                    ParticleConfig.particleSizeMax -
                    ParticleConfig.particleSizeMin
                ),

            color:
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ],

            opacity:
                0.35 +
                Math.random() *
                0.55

        };

    }


    /* =====================================================
       08. BIND EVENTS
    ===================================================== */

    bindEvents() {

        this.onMouseMove =
            this.handleMouseMove.bind(
                this
            );


        this.onMouseLeave =
            this.handleMouseLeave.bind(
                this
            );


        this.onResize =
            this.handleResize.bind(
                this
            );


        this.onVisibilityChange =
            this.handleVisibilityChange.bind(
                this
            );


        window.addEventListener(
            "mousemove",
            this.onMouseMove,
            {
                passive: true
            }
        );


        window.addEventListener(
            "mouseleave",
            this.onMouseLeave,
            {
                passive: true
            }
        );


        window.addEventListener(
            "resize",
            this.onResize,
            {
                passive: true
            }
        );


        document.addEventListener(
            "visibilitychange",
            this.onVisibilityChange
        );

    }


    /* =====================================================
       09. MOUSE MOVE
    ===================================================== */

    handleMouseMove(event) {

        const rect =
            this.canvas.getBoundingClientRect();


        this.mouse.x =
            event.clientX -
            rect.left;


        this.mouse.y =
            event.clientY -
            rect.top;


        this.mouse.active =
            true;

    }


    /* =====================================================
       10. MOUSE LEAVE
    ===================================================== */

    handleMouseLeave() {

        this.mouse.x =
            null;

        this.mouse.y =
            null;

        this.mouse.active =
            false;

    }


    /* =====================================================
       11. RESIZE
    ===================================================== */

    handleResize() {

        clearTimeout(
            this.resizeTimer
        );


        this.resizeTimer =
            setTimeout(
                () => {

                    this.devicePixelRatio =
                        Math.min(
                            window.devicePixelRatio || 1,
                            2
                        );


                    this.setupCanvas();

                    this.createParticles();

                },
                150
            );

    }


    /* =====================================================
       12. VISIBILITY
    ===================================================== */

    handleVisibilityChange() {

        this.isVisible =
            !document.hidden;

    }


    /* =====================================================
       13. UPDATE PARTICLES
    ===================================================== */

    update() {

        if (!this.isVisible) {

            return;

        }


        this.particles.forEach(
            particle => {

                particle.x +=
                    particle.vx;

                particle.y +=
                    particle.vy;


                /* -----------------------------------------
                   EDGE WRAPPING
                ----------------------------------------- */

                if (
                    particle.x < -10
                ) {

                    particle.x =
                        this.width + 10;

                }


                if (
                    particle.x >
                    this.width + 10
                ) {

                    particle.x =
                        -10;

                }


                if (
                    particle.y < -10
                ) {

                    particle.y =
                        this.height + 10;

                }


                if (
                    particle.y >
                    this.height + 10
                ) {

                    particle.y =
                        -10;

                }


                /* -----------------------------------------
                   MOUSE INTERACTION
                ----------------------------------------- */

                if (
                    this.mouse.active &&
                    this.mouse.x !== null &&
                    this.mouse.y !== null
                ) {

                    const dx =
                        particle.x -
                        this.mouse.x;


                    const dy =
                        particle.y -
                        this.mouse.y;


                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );


                    if (
                        distance <
                        ParticleConfig.mouseDistance
                    ) {

                        const force =
                            (
                                ParticleConfig.mouseDistance -
                                distance
                            ) /
                            ParticleConfig.mouseDistance;


                        const safeDistance =
                            Math.max(
                                distance,
                                1
                            );


                        particle.x +=
                            (
                                dx /
                                safeDistance
                            ) *
                            force *
                            ParticleConfig.mouseInfluence *
                            10;


                        particle.y +=
                            (
                                dy /
                                safeDistance
                            ) *
                            force *
                            ParticleConfig.mouseInfluence *
                            10;

                    }

                }

            }
        );

    }


    /* =====================================================
       14. CLEAR CANVAS
    ===================================================== */

    clear() {

        this.ctx.clearRect(
            0,
            0,
            this.width,
            this.height
        );

    }


    /* =====================================================
       15. DRAW PARTICLE
    ===================================================== */

    drawParticle(
        particle
    ) {

        const ctx =
            this.ctx;


        ctx.beginPath();


        ctx.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(
                ${particle.color},
                ${particle.opacity}
            )`;


        ctx.fill();

    }


    /* =====================================================
       16. DRAW CONNECTION
    ===================================================== */

    drawConnection(
        particleA,
        particleB,
        distance
    ) {

        if (
            distance >
            ParticleConfig.maxDistance
        ) {

            return;

        }


        const opacity =
            (
                1 -
                distance /
                ParticleConfig.maxDistance
            ) *
            ParticleConfig.lineOpacity;


        const ctx =
            this.ctx;


        ctx.beginPath();


        ctx.moveTo(
            particleA.x,
            particleA.y
        );


        ctx.lineTo(
            particleB.x,
            particleB.y
        );


        ctx.strokeStyle =
            `rgba(
                ${ParticleConfig.colors.primary},
                ${opacity}
            )`;


        ctx.lineWidth =
            0.7;


        ctx.stroke();

    }


    /* =====================================================
       17. DRAW MOUSE CONNECTION
    ===================================================== */

    drawMouseConnection(
        particle
    ) {

        if (
            !this.mouse.active ||
            this.mouse.x === null ||
            this.mouse.y === null
        ) {

            return;

        }


        const dx =
            particle.x -
            this.mouse.x;


        const dy =
            particle.y -
            this.mouse.y;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if (
            distance >
            ParticleConfig.mouseDistance
        ) {

            return;

        }


        const opacity =
            (
                1 -
                distance /
                ParticleConfig.mouseDistance
            ) *
            ParticleConfig.mouseLineOpacity;


        const ctx =
            this.ctx;


        ctx.beginPath();


        ctx.moveTo(
            particle.x,
            particle.y
        );


        ctx.lineTo(
            this.mouse.x,
            this.mouse.y
        );


        ctx.strokeStyle =
            `rgba(
                ${ParticleConfig.colors.secondary},
                ${opacity}
            )`;


        ctx.lineWidth =
            0.8;


        ctx.stroke();

    }


    /* =====================================================
       18. DRAW NETWORK
    ===================================================== */

    drawNetwork() {

        const length =
            this.particles.length;


        for (
            let i = 0;
            i < length;
            i++
        ) {

            const particle =
                this.particles[i];


            this.drawParticle(
                particle
            );


            for (
                let j = i + 1;
                j < length;
                j++
            ) {

                const other =
                    this.particles[j];


                const dx =
                    particle.x -
                    other.x;


                const dy =
                    particle.y -
                    other.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                this.drawConnection(
                    particle,
                    other,
                    distance
                );

            }


            this.drawMouseConnection(
                particle
            );

        }

    }


    /* =====================================================
       19. ANIMATION LOOP
    ===================================================== */

    animate() {

        if (
            !this.isRunning
        ) {

            return;

        }


        this.clear();

        this.update();

        this.drawNetwork();


        this.animationFrame =
            requestAnimationFrame(
                () => this.animate()
            );

    }


    /* =====================================================
       20. PAUSE
    ===================================================== */

    pause() {

        this.isRunning =
            false;


        if (
            this.animationFrame
        ) {

            cancelAnimationFrame(
                this.animationFrame
            );

            this.animationFrame =
                null;

        }

    }


    /* =====================================================
       21. RESUME
    ===================================================== */

    resume() {

        if (
            this.isRunning
        ) {

            return;

        }


        this.isRunning =
            true;


        this.animate();

    }


    /* =====================================================
       22. DESTROY
    ===================================================== */

    destroy() {

        this.pause();


        window.removeEventListener(
            "mousemove",
            this.onMouseMove
        );


        window.removeEventListener(
            "mouseleave",
            this.onMouseLeave
        );


        window.removeEventListener(
            "resize",
            this.onResize
        );


        document.removeEventListener(
            "visibilitychange",
            this.onVisibilityChange
        );


        this.clear();

        this.particles = [];

    }

}


/* =========================================================
   23. FIND CANVAS
========================================================= */

function initializeCartRescueParticles() {

    const canvas =
        document.querySelector(
            ParticleConfig.selector
        );


    if (!canvas) {

        return null;

    }


    if (
        !canvas.getContext
    ) {

        console.warn(
            "Canvas is not supported by this browser."
        );

        return null;

    }


    const particleSystem =
        new CartRescueParticles(
            canvas
        );


    window.CartRescueParticles =
        particleSystem;


    return particleSystem;

}


/* =========================================================
   24. AUTO INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeCartRescueParticles();

    }
);


/* =========================================================
   25. PUBLIC PARTICLE API
========================================================= */

window.CartRescueParticleAPI = {

    initialize:
        initializeCartRescueParticles,

    getInstance:
        () =>
            window.CartRescueParticles || null,

    pause:
        () => {

            if (
                window.CartRescueParticles
            ) {

                window.CartRescueParticles.pause();

            }

        },

    resume:
        () => {

            if (
                window.CartRescueParticles
            ) {

                window.CartRescueParticles.resume();

            }

        },

    destroy:
        () => {

            if (
                window.CartRescueParticles
            ) {

                window.CartRescueParticles.destroy();

                window.CartRescueParticles =
                    null;

            }

        }

};


/* =========================================================
   26. REDUCED MOTION SUPPORT
========================================================= */

const reducedMotionQuery =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


function handleReducedMotion() {

    const particleSystem =
        window.CartRescueParticles;


    if (!particleSystem) {

        return;

    }


    if (
        reducedMotionQuery.matches
    ) {

        particleSystem.pause();

    } else {

        particleSystem.resume();

    }

}


if (
    reducedMotionQuery.addEventListener
) {

    reducedMotionQuery.addEventListener(
        "change",
        handleReducedMotion
    );

} else if (
    reducedMotionQuery.addListener
) {

    reducedMotionQuery.addListener(
        handleReducedMotion
    );

}


/* =========================================================
   END OF PARTICLES.JS
========================================================= */