import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";
import { VRMLoaderPlugin, VRMUtils } from "https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@2.0.0/lib/three-vrm.module.js";

/* ===============================
   SCENE
================================ */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf2f2f2);

const camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.1,
    20
);
camera.position.set(0, 1.45, 2.2);

/* ===============================
   RENDERER
================================ */
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

/* ===============================
   LIGHTS
================================ */
scene.add(new THREE.AmbientLight(0xffffff, 0.7));

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 2, 2);
scene.add(light);

/* ===============================
   CLOCK
================================ */
const clock = new THREE.Clock();

/* ===============================
   VRM
================================ */
let vrm;
const loader = new GLTFLoader();
loader.register(p => new VRMLoaderPlugin(p));

loader.load("./models/avatar.vrm", (gltf) => {
    VRMUtils.removeUnnecessaryVertices(gltf.scene);
    VRMUtils.removeUnnecessaryJoints(gltf.scene);

    vrm = gltf.userData.vrm;
    vrm.scene.rotation.y = Math.PI;
    scene.add(vrm.scene);

    vrm.lookAt.target = camera;
});

/* ===============================
   HELPERS
================================ */
function bone(name) {
    return vrm?.humanoid.getNormalizedBoneNode(name);
}

function setRot(name, x = 0, y = 0, z = 0) {
    const b = bone(name);
    if (b) b.rotation.set(x, y, z);
}

/* ===============================
   ANTI T-POSE (FORCED)
================================ */
function relaxedArms(t) {
    const sway = Math.sin(t) * 0.05;

    setRot("leftUpperArm", 0, 0, 0.4);
    setRot("rightUpperArm", 0, 0, -0.4);

    setRot("leftLowerArm", -1 + sway, 0, 0);
    setRot("rightLowerArm", -1 - sway, 0, 0);

    setRot("leftHand", 0, 0, 0.1);
    setRot("rightHand", 0, 0, -0.1);
}

/* ===============================
   TALK GESTURE
================================ */
function talkGesture(t) {
    setRot("rightUpperArm", 0, 0, -0.8);
    setRot("rightLowerArm", -1.2 + Math.sin(t * 2) * 0.2, 0, 0);
}

/* ===============================
   WAVE
================================ */
function waveGesture(t) {
    setRot("rightUpperArm", 0, 0, -1.2);
    setRot("rightLowerArm", -1.4, 0, 0);
    setRot("rightHand", 0, 0, Math.sin(t * 5) * 0.6);
}

/* ===============================
   STATE
================================ */
let state = "idle";
window.startTalking = () => state = "talk";
window.stopTalking = () => state = "idle";
window.startWave = () => {
    state = "wave";
    setTimeout(() => state = "idle", 2500);
};

/* ===============================
   BLINK
================================ */
let blinkTimer = 0;

/* ===============================
   LOOP
================================ */
function animate() {
    requestAnimationFrame(animate);

    if (vrm) {
        const dt = clock.getDelta();
        const t = clock.elapsedTime;

        // BREATHING
        const chest = bone("chest");
        if (chest) chest.position.y = Math.sin(t * 2) * 0.004;

        // SPINE
        setRot("spine", 0.08, Math.sin(t * 0.5) * 0.04, 0);

        // HEAD
        setRot(
            "neck",
            Math.sin(t * 0.6) * 0.05,
            Math.sin(t * 0.5) * 0.05,
            0
        );

        // EYES
        vrm.lookAt?.lookAt(camera.position);

        // BLINK
        blinkTimer += dt;
        if (blinkTimer > 2 + Math.random() * 2) {
            vrm.expressionManager.setValue("blink", 1);
            setTimeout(() => {
                vrm.expressionManager.setValue("blink", 0);
            }, 120);
            blinkTimer = 0;
        }

        // ARM CONTROL (NO T-POSE)
        if (state === "idle") relaxedArms(t);
        if (state === "talk") talkGesture(t);
        if (state === "wave") waveGesture(t);

        vrm.update(dt);
    }

    renderer.render(scene, camera);
}

animate();

/* ===============================
   RESIZE
================================ */
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
