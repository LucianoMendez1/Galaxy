import { gsap } from 'gsap';
import * as THREE from 'three';

const sceneSpace = () => {
  const canvas = document.querySelector('.webGlScene');
  
  // Configuración de la escena
  const scene = new THREE.Scene();
  
  const size = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  
  window.addEventListener('resize', () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;
  
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // Cámara base
  const camera = new THREE.PerspectiveCamera(35, size.width / size.height, 0.1, 100);
  camera.position.z = 11;
  camera.position.y = 1;
  camera.position.x = 1;
  scene.add(camera);
      
  // Configuración del renderizador
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });
  
  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // Estrellas
  const starsGeometry = new THREE.BufferGeometry()
  const count = 2000

  const colors = new Float32Array(count * 3)
  const positions = new Float32Array(count * 3) 
  let geometry = null
  let material = null
  let points = null
  

  for (let i = 0; i < count * 3; i++) {
    if (points !== null) {
      geometry.dispose()
      material.dispose()
      scene.remove(points)
    }

    positions[i] = (Math.random() - 0.5) * 25
    colors[i] = Math.random()
  }

  starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 2))

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.01,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: new THREE.Color("#999999"),
  })

  const particles = new THREE.Points(starsGeometry, particlesMaterial)
  particlesMaterial.alphaTest = .9
  scene.add(particles)

  // Aureola
  const parameters = {
    count: 100000,
    size: 0.03,
    radius: 30,
    branches: 3,
    spin: 1,
    randomness: 1,
    randomnessPower: 5,
    insideColor: '#5660FF',
    outsideColor: '#071F49',
  };
  
  let geometryAureola = null;
  let materialAureola = null;
  let pointsAureola = null;
  
  function createAureola() {
    if (pointsAureola !== null) {
      geometryAureola.dispose();
      materialAureola.dispose();
      scene.remove(pointsAureola);
    }
  
    const geometryAureolaStars = new THREE.BufferGeometry();
    const positionsAureola = new Float32Array(parameters.count * 3);
    const colorsAureola = new Float32Array(parameters.count * 3);
  
    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * parameters.radius;
      const spinAngle = radius * parameters.spin;
      const branchAngle = ((i - parameters.branches) / parameters.branches) * Math.PI * 2;
      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;
      const randomY =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;
      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;
  
      const colorInside = new THREE.Color(parameters.insideColor);
      const colorOutside = new THREE.Color(parameters.outsideColor);
  
      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / parameters.radius);
  
      positionsAureola[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positionsAureola[i3 + 1] = randomY;
      positionsAureola[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
  
      colorsAureola[i3] = mixedColor.r;
      colorsAureola[i3 + 1] = mixedColor.g;
      colorsAureola[i3 + 2] = mixedColor.b;
    }
  
    geometryAureolaStars.setAttribute('position', new THREE.BufferAttribute(positionsAureola, 3));
    geometryAureolaStars.setAttribute('color', new THREE.BufferAttribute(colorsAureola, 3));
  
    materialAureola = new THREE.PointsMaterial({
      size: parameters.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });
  
    pointsAureola = new THREE.Points(geometryAureolaStars, materialAureola);
    pointsAureola.position.set(0, 2, -10);
    pointsAureola.rotation.z = -.5;
    scene.add(pointsAureola);
  }
  
  // Llamamos la función para crear la aureola
  createAureola();

  // Esfera
 


const sphereGroup = new THREE.Group();



const textureLoader = new THREE.TextureLoader();
const texture1 = textureLoader.load('https://res.cloudinary.com/dvnhn35l4/image/upload/v1690656764/digital_painting_planet_seen_from_space_jno2kn.jpg');
const texture2 = textureLoader.load('https://res.cloudinary.com/dvnhn35l4/image/upload/v1689646966/texture2_rnxlax.jpg');

// Esfera 1
const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);

// Crear el material inicial con texture1
const initialMaterial = new THREE.MeshStandardMaterial({
  map: texture1, // Textura exterior inicial
  side: THREE.DoubleSide,
});

// Crear el material para el interior con texture2
const interiorMaterial = new THREE.MeshStandardMaterial({
  emissiveMap: texture2, // Textura interior
  emissive: new THREE.Color(0xffffff), // Emisión para la parte interior
  emissiveIntensity: 1.0,
  side: THREE.DoubleSide,
});

const sphere1 = new THREE.Mesh(sphereGeometry, initialMaterial);
sphere1.position.set(4, 1, -15);
sphereGroup.add(sphere1);



let zoomedIn = false;

function onDocumentKeyDown(event) {
  switch (event.keyCode) {
    case 32: // Spacebar
      if (sphere1 === sphere1 && !zoomedIn) {
        // Cambiar el material a interiorMaterial para ver el interior
        sphere1.material = interiorMaterial;
        camera.position.copy(sphere1.position); // Colocar la cámara en la posición de la sphere1
        camera.position.z += 0.06; // Ajustar la posición de la cámara para el zoom
        zoomedIn = true;
      } else if (sphere1 === sphere1 && zoomedIn) {
        // Cambiar el material a initialMaterial para volver a la vista exterior
        sphere1.material = initialMaterial;
        camera.position.set(1, 1, 11); // Restaurar la posición original de la cámara
        zoomedIn = false;
      }
      break;
  }
}

document.addEventListener('keydown', onDocumentKeyDown, false);


// Esfera 2
const sphereGeometry2 = new THREE.SphereGeometry(0.1, 16, 16);
const textureLoader2 = new THREE.TextureLoader();
const texture3 = textureLoader2.load('https://res.cloudinary.com/dvnhn35l4/image/upload/v1689646966/texture2_rnxlax.jpg');
const sphereMaterial2 = new THREE.MeshBasicMaterial({ map: texture3 });
const sphere2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
sphere2.position.set(-3, 0, -4);
sphereGroup.add(sphere2);



const sphereGeometry3 = new THREE.SphereGeometry(0.1, 16, 16);
const textureLoader3 = new THREE.TextureLoader();
const texture4 = textureLoader3.load('https://res.cloudinary.com/dvnhn35l4/image/upload/v1690852041/sun-768x480_d5uhii.jpg');
const sphereMaterial3 = new THREE.MeshBasicMaterial({ map: texture4 });
const sphere3 = new THREE.Mesh(sphereGeometry3, sphereMaterial3);
sphere3.position.set(9, 2, -4);
sphereGroup.add(sphere3);
// Agregar el grupo a la escena
scene.add(sphereGroup);



  
  



  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const spheres = [sphere1, sphere2,sphere3];
  let cameraMoved = false;
 

  document.addEventListener('click', onClick, false);

  const cubeGeometry = new THREE.BoxGeometry(6, 6, 6);
  const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5 });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.visible = false;
  scene.add(cube);

  function onClick(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    
    const intersects = raycaster.intersectObjects(spheres);
    
    if (intersects.length > 0) {
      const targetSphere = intersects[0].object;
      const targetPosition = new THREE.Vector3();
      targetSphere.getWorldPosition(targetPosition);
      
      if (!cameraMoved) {
        gsap.to(camera.position, {
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z + 2,
          duration: 1.5
        });
        gsap.to(cube.position, {
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z,
          duration: 1.5
        });
        gsap.to(targetSphere.scale, { x: 0.5, y: 0.5, z: 0.5, duration: 1.5 });
        gsap.to(scene, { worldSize: 0.5, duration: 1.5, onUpdate: updateWorldSize });
        cameraMoved = true;
        cube.visible = true;
      } else {
        gsap.to(camera.position, {
          x: 1,
          y: 1,
          z: 11,
          duration: 1.5
        });
        gsap.to(cube.position, {
          x: 1,
          y: 1,
          z: 11,
          duration: 1.5
        });
        gsap.to(targetSphere.scale, { x: 1, y: 1, z: 1, duration: 1.5 });
        gsap.to(scene, { worldSize: 0.05, duration: 1.5, onUpdate: updateWorldSize });
        cameraMoved = false;
        cube.visible = false;
      }
    }
  }

  function updateWorldSize() {
    // Ajustamos el tamaño de todos los objetos del mundo según el valor de worldSize
    // Esto podría incluir las esferas, las estrellas, la aureola, el texto, etc.
    // Por ejemplo:
    sphere1.scale.set(1, 1, 1);
    sphere2.scale.set(5, 5, 5);
    sphere3.scale.set(5, 5, 5);
    // ... Ajustar otros objetos del mundo aquí ...
  }
  

  const pointLight = new THREE.PointLight(0xff0000, 0.05); // Color rojo y mayor intensidad (2)
pointLight.position.set(2, 2, 0.2);
scene.add(pointLight);
  
  // Renderizado y animación
  const clock = new THREE.Clock();
  
  const animate = () => {
    const time = clock.getElapsedTime();
    const ghost1Angle = time;
    sphere1.rotation.y += 0.002;
    sphere2.rotation.y += 0.002;
    sphere3.rotation.y += 0.002;
    particles.rotation.y -= 0.001;
   
    pointsAureola.rotation.y = -ghost1Angle / 10;

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
    renderer.autoClear = true;
  }

  animate();

  renderer.render(scene, camera);
};

export default sceneSpace;
