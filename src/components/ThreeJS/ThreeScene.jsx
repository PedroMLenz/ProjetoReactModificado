import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeScene = () => {
  const mountRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    // Cena
    const scene = new THREE.Scene();

    // SkyBox
    const loader = new THREE.CubeTextureLoader();
    const skybox = loader
      .setPath("/skybox/")
      .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
    scene.background = skybox;

    // Câmera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(2, 2, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // OrbitControls (para mover a câmera com mouse)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;

    // Luzes
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Carregar modelo bola
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("/models/modelo.glb", (gltf) => {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(gltf.scene);
      modelRef.current = gltf.scene;
    });

    // Controle teclado para mover a bola
    const keys = {};
    window.addEventListener("keydown", (e) => {
      keys[e.key.toLowerCase()] = true;
    });
    window.addEventListener("keyup", (e) => {
      keys[e.key.toLowerCase()] = false;
    });

    // Redimensionamento
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Função para mover a bola via teclado
    const moveBall = () => {
      if (!modelRef.current) return;
      const speed = 0.05;

      if (keys["w"]) modelRef.current.position.z -= speed;
      if (keys["s"]) modelRef.current.position.z += speed;
      if (keys["a"]) modelRef.current.position.x -= speed;
      if (keys["d"]) modelRef.current.position.x += speed;
      if (keys["q"]) modelRef.current.position.y -= speed;
      if (keys["e"]) modelRef.current.position.y += speed;
    };

    // Loop de animação
    const animate = () => {
      requestAnimationFrame(animate);

      if (modelRef.current) {
        modelRef.current.rotation.y += 0.01; // gira a bola lentamente
        moveBall();
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", () => {});
      window.removeEventListener("keyup", () => {});
      if (mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", backgroundColor: "black" }}
    />
  );
};

export default ThreeScene;
