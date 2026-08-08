"use strict";

/* Lightweight Three.js opening sequence for the Cart Rescue product shell. */
(function initialize3DOpening() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (sessionStorage.getItem("cartRescueAuthenticated") === "true") {
        return;
    }

    const intro = document.createElement("div");
    intro.className = "intro-3d";
    intro.setAttribute("role", "dialog");
    intro.setAttribute("aria-label", "Cart Rescue AI loading");
    intro.innerHTML = `
        <canvas class="intro-3d-canvas" aria-hidden="true"></canvas>
        <div class="intro-3d-topline">
            <span class="intro-3d-brand"><b>CR</b> CART RESCUE <em>AI</em></span>
            <span class="intro-3d-build">INTELLIGENCE SYSTEM / 2026</span>
        </div>
        <div class="intro-3d-copy">
            <span class="intro-3d-kicker"><i></i> CART RESCUE AI</span>
            <strong>Recover<br><em>the moment.</em></strong>
            <span>Intelligence is coming online.</span>
        </div>
        <div class="intro-3d-meta">
            <span><i></i> PREDICTION ENGINE ONLINE</span>
            <span>SESSION  /  001</span>
        </div>
        <div class="intro-3d-progress"><span></span></div>
        <button class="intro-3d-skip" type="button">Skip intro</button>
    `;
    document.body.appendChild(intro);

    const finish = () => {
        intro.classList.add("is-complete");
        window.setTimeout(() => intro.remove(), 700);
    };

    intro.querySelector(".intro-3d-skip").addEventListener("click", finish);

    if (reduceMotion || typeof THREE === "undefined") {
        window.setTimeout(finish, reduceMotion ? 350 : 2200);
        return;
    }

    const canvas = intro.querySelector(".intro-3d-canvas");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.set(0, 0.15, 6.2);

    scene.add(new THREE.AmbientLight(0x9defff, 1.6));
    const keyLight = new THREE.PointLight(0x00e5ff, 14, 12);
    keyLight.position.set(2.5, 2.8, 4);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight(0x806dff, 11, 12);
    fillLight.position.set(-3, -1.5, 2);
    scene.add(fillLight);

    const product = new THREE.Group();
    product.rotation.set(-0.12, -0.35, 0.05);
    scene.add(product);

    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x18ddf6, metalness: 0.75, roughness: 0.2, emissive: 0x003d54, emissiveIntensity: 1.2 });
    const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x101b39, metalness: 0.5, roughness: 0.26, emissive: 0x071027, emissiveIntensity: 0.8 });
    const accentMaterial = new THREE.MeshStandardMaterial({ color: 0x8b77ff, metalness: 0.45, roughness: 0.24, emissive: 0x29186f, emissiveIntensity: 1.1 });

    const basket = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.95, 1.35), darkMaterial);
    basket.position.set(0, 0.25, 0);
    product.add(basket);

    const rim = new THREE.Mesh(new THREE.BoxGeometry(2.25, 0.12, 1.48), frameMaterial);
    rim.position.set(0, 0.78, 0);
    product.add(rim);

    const base = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.12, 1.5), frameMaterial);
    base.position.set(-0.1, -0.28, 0);
    product.add(base);

    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.13, 1.8), frameMaterial);
    handle.position.set(-1.15, 0.55, 0.47);
    handle.rotation.x = Math.PI / 2;
    product.add(handle);

    const handlePost = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.05, 0.12), frameMaterial);
    handlePost.position.set(-1.05, 0.25, 0.55);
    handlePost.rotation.z = -0.35;
    product.add(handlePost);

    const wheelGeometry = new THREE.TorusGeometry(0.22, 0.07, 12, 24);
    [[-0.8, -0.58, 0.55], [0.8, -0.58, 0.55], [-0.8, -0.58, -0.55], [0.8, -0.58, -0.55]].forEach(([x, y, z]) => {
        const wheel = new THREE.Mesh(wheelGeometry, accentMaterial);
        wheel.position.set(x, y, z);
        wheel.rotation.y = Math.PI / 2;
        product.add(wheel);
    });

    const ringGroup = new THREE.Group();
    scene.add(ringGroup);
    [1.7, 2.2, 2.75].forEach((radius, index) => {
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(radius, 0.012, 8, 96),
            new THREE.MeshBasicMaterial({ color: index === 1 ? 0x8b77ff : 0x00e5ff, transparent: true, opacity: 0.42 - index * 0.08 })
        );
        ring.rotation.set(index * 0.55, index * 0.7, index * 0.25);
        ringGroup.add(ring);
    });

    const dataPoints = new THREE.Group();
    const pointGeometry = new THREE.SphereGeometry(0.035, 8, 8);
    for (let index = 0; index < 34; index += 1) {
        const point = new THREE.Mesh(pointGeometry, index % 3 === 0 ? accentMaterial : frameMaterial);
        const angle = (index / 34) * Math.PI * 2;
        const radius = 2.5 + Math.sin(index * 2.1) * 0.35;
        point.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.7) * 1.35, Math.sin(angle) * radius * 0.55);
        dataPoints.add(point);
    }
    scene.add(dataPoints);

    const clock = new THREE.Clock();
    let animationFrame;
    const animate = () => {
        const elapsed = clock.getElapsedTime();
        product.rotation.y = -0.35 + Math.sin(elapsed * 0.8) * 0.24;
        product.rotation.x = -0.12 + Math.cos(elapsed * 0.65) * 0.08;
        product.position.y = Math.sin(elapsed * 1.35) * 0.08;
        ringGroup.rotation.y = elapsed * 0.25;
        ringGroup.rotation.x = Math.sin(elapsed * 0.42) * 0.2;
        dataPoints.rotation.y = -elapsed * 0.18;
        dataPoints.rotation.z = Math.sin(elapsed * 0.25) * 0.08;
        renderer.render(scene, camera);
        animationFrame = window.requestAnimationFrame(animate);
    };
    animate();

    const resize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", resize, { passive: true });

    window.setTimeout(() => {
        window.cancelAnimationFrame(animationFrame);
        window.removeEventListener("resize", resize);
        finish();
    }, 2200);
})();
