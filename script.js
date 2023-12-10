let scene, camera, renderer, pyramid, textureLoader;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffba);
    document.body.appendChild(renderer.domElement);

    textureLoader = new THREE.TextureLoader();

    // Create a pyramid with proper material
    const geometry = new THREE.ConeGeometry(1, 2, 4);
    const material = new THREE.MeshStandardMaterial({ color: 0x11ff10, roughness: 0.5 }); // Set initial color to green
    pyramid = new THREE.Mesh(geometry, material);
    scene.add(pyramid);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    camera.position.z = 5;

        function onWindowResize() {
            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
        }

    window.addEventListener('resize', onWindowResize);
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    pyramid.rotation.y += 0.003;
    renderer.render(scene, camera);
}

function applyTexture() {
    const textureSelect = document.getElementById('textureSelect');
    const selectedTexture = textureSelect.value;
    const texturePath = `colors/${selectedTexture}`;

    const texture = textureLoader.load(texturePath);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    pyramid.material = material;
}

function loadTextureOptions() {
    const textureSelect = document.getElementById('textureSelect');
    if (!textureSelect) {
        console.error("Texture select element not found.");
        return;
    }

    // Assuming 'colors' folder is in the root directory
    const textureFolderPath = 'colors/';

    // Fetch the texture files dynamically
    fetch(textureFolderPath)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(data, 'text/html');
            const files = Array.from(htmlDocument.querySelectorAll('a')).map(a => a.href);

            files.forEach(file => {
                if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
                    const option = document.createElement('option');
                    option.value = file.split('/').pop();
                    option.text = option.value;
                    textureSelect.appendChild(option);
                }
            });
        })
        .catch(error => {
            console.error("Error fetching texture options:", error);
        });
}


loadTextureOptions();
document.getElementById('applyTexture').addEventListener('click', applyTexture);

init();