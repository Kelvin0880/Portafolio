// Inicializar efectos Parallax cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Efecto Parallax en la imagen de fondo del hero
    const heroBg = document.querySelector('.hero-bg');
    new simpleParallax(heroBg, {
        scale: 1.5,
        delay: 0.8,
        orientation: 'down',
        overflow: true,
        transition: 'cubic-bezier(0,0,0.2,1)'
    });

    // Efecto Parallax en la imagen del sobre mí
    const aboutImg = document.querySelector('.about-img');
    new simpleParallax(aboutImg, {
        scale: 1.3,
        delay: 0.6,
        orientation: 'right'
    });

    // Efecto Parallax en las imágenes de proyectos
    const projectImgs = document.querySelectorAll('.project-img');
    new simpleParallax(projectImgs, {
        scale: 1.2,
        delay: 0.5,
        orientation: 'up'
    });

    // Efecto Parallax en el fondo de habilidades
    const skillsBg = document.querySelector('.skills-bg');
    new simpleParallax(skillsBg, {
        scale: 1.4,
        delay: 0.7,
        orientation: 'left',
        overflow: true
    });

    // Configuración de partículas para el fondo
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Inicializar Typed.js para el efecto de escritura
    if (document.querySelector('.typing')) {
        const options = {
            strings: [
                "Creando soluciones digitales innovadoras",
                "Estudiante de Ingeniería en Sistemas",
                "Desarrollador de Software",
                "Apasionado por la tecnología"
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        };

        new Typed('.typing', options);
    }

    // Control del menú móvil
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Alternar navegación
            nav.classList.toggle('active');
            
            // Animación de enlaces
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Animación del burger
            burger.classList.toggle('toggle');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });

    // Cambiar estilo del navbar al hacer scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mostrar/ocultar botón volver arriba
    window.addEventListener('scroll', () => {
        const backToTopBtn = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    // Funcionalidad de botón volver arriba
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener el botón de envío
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Cambiar estado del botón
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            // Ocultar cualquier mensaje anterior
            formStatus.className = 'form-status';
            formStatus.style.display = 'none';
            
            // Preparar los parámetros para la plantilla - Más simple para reducir errores
            const templateParams = {
                from_name: document.getElementById('name').value,
                reply_to: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Verificar en consola los datos que se envían 
            console.log("Enviando datos:", templateParams);
            
            // Enviar el formulario usando EmailJS con configuración corregida
            emailjs.sendForm('service_zmjrfay', 'template_contact', contactForm)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                // Éxito al enviar
                formStatus.innerHTML = '¡Mensaje enviado con éxito! Te responderé lo antes posible.';
                formStatus.className = 'form-status success';
                formStatus.style.display = 'block';
                contactForm.reset();
                
                // Restaurar el botón después de un tiempo
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, 2000);
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                // Error al enviar - Mostrar mensaje más específico si es posible
                formStatus.innerHTML = 'Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo o contáctame directamente por email a: pinagomezkelvinjose@gmail.com';
                formStatus.className = 'form-status error';
                formStatus.style.display = 'block';
                
                // Restaurar el botón
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
        });
    }

    // Filtro de proyectos
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Modal de proyectos
    const modalLinks = document.querySelectorAll('.project-preview');
    const modals = document.querySelectorAll('.project-modal');
    const closeBtns = document.querySelectorAll('.modal-close');
    
    modalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = link.getAttribute('href');
            document.querySelector(modalId).style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.project-modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Cambiar tema claro/oscuro
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Verificar si hay una preferencia guardada
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
        } else if (currentTheme === 'light') {
            document.body.classList.remove('dark-mode');
        } else if (prefersDarkScheme.matches) {
            // Si el usuario prefiere tema oscuro y no hay preferencia guardada
            document.body.classList.add('dark-mode');
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Guardar preferencia
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Animación de barras de habilidades
    const skillLevels = document.querySelectorAll('.skill-level');
    
    // Función para animar las barras cuando son visibles
    const animateSkill = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target;
                const width = level.style.width;
                level.style.width = '0%';
                setTimeout(() => {
                    level.style.width = width;
                }, 100);
            }
        });
    };
    
    // Configurar el IntersectionObserver
    const skillObserver = new IntersectionObserver(animateSkill, {
        threshold: 0.5
    });
    
    // Observar cada barra de habilidad
    skillLevels.forEach(level => {
        skillObserver.observe(level);
    });

    // Cursor personalizado
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline) {
        // Mostrar cursor personalizado al mover el mouse
        document.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
            
            cursorDot.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
            
            // Efecto de retraso para el outline
            setTimeout(() => {
                cursorOutline.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
            }, 100);
        });
        
        // Efecto hover en enlaces y botones
        const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-item, .social-links a');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseover', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.border = '2px solid var(--primary-color)';
                cursorDot.style.width = '12px';
                cursorDot.style.height = '12px';
            });
            
            element.addEventListener('mouseout', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.border = '2px solid var(--primary-color)';
                cursorDot.style.width = '8px';
                cursorDot.style.height = '8px';
            });
        });
        
        // Ocultar cursor personalizado cuando sale de la ventana
        document.addEventListener('mouseout', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });
    }

    // Descarga de CV simulada
    const downloadCV = document.querySelector('.download-cv');
    if (downloadCV) {
        downloadCV.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Crear un PDF dinámico con la información del CV usando jsPDF
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Agregar cabecera
            doc.setFontSize(22);
            doc.setTextColor(75, 112, 226);
            doc.text('Kelvin Piña Gomez', 105, 20, { align: 'center' });
            
            doc.setFontSize(12);
            doc.setTextColor(100, 100, 100);
            doc.text('Desarrollador & Ingeniero en Sistemas', 105, 28, { align: 'center' });
            
            doc.setFontSize(10);
            doc.text('Email: pinagomezkelvinjose@gmail.com | Tel: 849-271-8177', 105, 34, { align: 'center' });
            doc.text('Santo Domingo, República Dominicana | CI: 402-2986796-1', 105, 39, { align: 'center' });
            
            // Línea separadora
            doc.setDrawColor(75, 112, 226);
            doc.setLineWidth(0.5);
            doc.line(20, 42, 190, 42);
            
            // Perfil profesional
            doc.setFontSize(14);
            doc.setTextColor(75, 112, 226);
            doc.text('Perfil Profesional', 20, 50);
            
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text('Estudiante de Ingeniería en Sistema con vocación servicial, dispuesto a colaborar con cualquier', 20, 58);
            doc.text('entidad que lo necesite. Responsable y con facilidad para las relaciones personales.', 20, 63);
            
            // Experiencia
            doc.setFontSize(14);
            doc.setTextColor(75, 112, 226);
            doc.text('Experiencia Profesional', 20, 73);
            
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text('Desarrollador .NET MAUI', 20, 81);
            
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text('Acierta Consulting | Marzo 2025 - Presente', 20, 86);
            
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text('Desarrollo de aplicaciones multiplataforma utilizando .NET MAUI para clientes empresariales,', 20, 91);
            doc.text('implementación de interfaces de usuario modernas y gestión de bases de datos.', 20, 96);
            
            // Formación académica
            doc.setFontSize(14);
            doc.setTextColor(75, 112, 226);
            doc.text('Formación Académica', 20, 106);
            
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text('Universidad UNPHU', 20, 114);
            
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text('Ingeniería en Sistemas Computacionales | 2022 - Presente', 20, 119);
            
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text('Colegio Nuevo Mundo', 20, 127);
            
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text('Bachiller | 2016 - 2020', 20, 132);
            
            // Habilidades técnicas
            doc.setFontSize(14);
            doc.setTextColor(75, 112, 226);
            doc.text('Habilidades Técnicas', 20, 142);
            
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text('• Lenguajes: JavaScript, Python, C#, Java', 20, 150);
            doc.text('• Frameworks: .NET MAUI, React, Flask, Next.js, Tailwind', 20, 155);
            doc.text('• Bases de datos: MySQL, SQL Server, MongoDB', 20, 160);
            doc.text('• Herramientas: Git, Scrum, Terminal, Office', 20, 165);
            doc.text('• Idiomas: Español (nativo), Inglés (intermedio)', 20, 170);
            
            // Certificaciones
            doc.setFontSize(14);
            doc.setTextColor(75, 112, 226);
            doc.text('Certificaciones', 20, 180);
            
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text('Certificación en Scrum (2022)', 20, 188);
            
            doc.setFontSize(10);
            doc.text('Metodologías ágiles para la gestión de proyectos de desarrollo de software.', 20, 193);
            
            // Footer
            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100);
            doc.text('CV generado desde el portafolio personal - ' + new Date().toLocaleDateString(), 105, 280, {align: 'center'});
            
            // Guardar el PDF
            doc.save('CV_Kelvin_Piña_Gomez.pdf');
        });
    }
});