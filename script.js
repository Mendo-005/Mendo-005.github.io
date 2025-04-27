// Añadir scroll suave al hacer clic en los enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Detectar la sección visible y actualizar los links activos
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});

// Efecto de luz que sigue al ratón
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    document.body.style.setProperty('--mouse-x', `${x}px`);
    document.body.style.setProperty('--mouse-y', `${y}px`);
});

// Canvas para las estrellas
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

// Ajustar el tamaño del canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 100;

// Crear estrellas
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.01
    });
}

// Dibujar y animar estrellas
function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) star.speed *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
    });

    requestAnimationFrame(animateStars);
}

// Ajustar el tamaño del canvas al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animateStars();

// Menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');

        // Toggle the visibility of the CV download button
        const cvDownload = document.querySelector('.cv-download');
        if (nav.classList.contains('active')) {
            menuToggle.textContent = '✕';
            cvDownload.style.display = 'block';
        } else {
            menuToggle.textContent = '☰';
            cvDownload.style.display = 'none';
        }
    });
    
    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });
    });
    
    // Ajustar márgenes dinámicamente
    function adjustLayout() {
        const main = document.querySelector('main');
        const footer = document.querySelector('footer');
        
        if (window.innerWidth <= 768) {
            main.style.marginLeft = '0';
            footer.style.marginLeft = '0';
        } else if (window.innerWidth <= 1024) {
            main.style.marginLeft = '200px';
            footer.style.marginLeft = '200px';
        } else {
            main.style.marginLeft = '250px';
            footer.style.marginLeft = '250px';
        }
    }
    
    // Ejecutar al cargar y al redimensionar
    window.addEventListener('resize', adjustLayout);
    adjustLayout();
    
    // Asegurar que el botón de descarga no se oculte en pantallas grandes
    if (window.innerWidth > 768) {
        const cvDownload = document.querySelector('.cv-download');
        cvDownload.style.display = 'block';
    }
});
