// Animación de partículas
const canvas = document.getElementById('particles-background');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const maxParticles = 150; // Número máximo de partículas

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; // Tamaño de las partículas
        this.speedX = Math.random() * 2 - 1; // Velocidad en X
        this.speedY = Math.random() * 2 - 1; // Velocidad en Y
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reducir el tamaño de la partícula con el tiempo
        if (this.size > 0.2) {
            this.size -= 0.1;
        }
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    // Generar partículas iniciales
    while (particlesArray.length < maxParticles) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    // Actualizar y dibujar cada partícula
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // Eliminar partículas pequeñas
        if (particlesArray[i].size <= 0.2) {
            particlesArray.splice(i, 1);
            i--;
        }
    }

    // Si hay menos partículas que el límite, agregar nuevas partículas
    if (particlesArray.length < maxParticles) {
        particlesArray.push(new Particle());
    }

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Smooth scroll (desplazamiento suave)
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Formulario de contacto
const form = document.getElementById('formulario-contacto');
const messageSent = document.getElementById('mensaje-enviado');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    messageSent.style.display = 'block';
    form.reset();
    // Opción: Podrías agregar aquí una llamada a un servidor para enviar el formulario
});

// Espera a que el DOM cargue completamente
document.addEventListener("DOMContentLoaded", function () {
    // Verifica si el script de Credly ya está cargado
    if (typeof window.Credly === "undefined") {
        const script = document.createElement("script");
        script.src = "https://cdn.credly.com/assets/utilities/embed.js";
        script.async = true;
        script.onerror = function () {
            console.error("Error al cargar el script de Credly.");
        };
        document.body.appendChild(script);
    } else {
        // Recargar insignias manualmente
        window.Credly.init();
    }
});

// Animación de proyectos al hacer scroll
const proyectos = document.querySelectorAll('.proyecto');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Dejar de observar el elemento una vez que es visible
        }
    });
}, {
    threshold: 0.5 // Actuar cuando el 50% del proyecto es visible
});

// Observar los proyectos
proyectos.forEach(proyecto => {
    observer.observe(proyecto);
});
