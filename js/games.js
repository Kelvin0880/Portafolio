// Minijuegos para portafolio

document.addEventListener('DOMContentLoaded', function() {
    // ===== Memory Game =====
    const memoryGame = {
        cards: document.querySelectorAll('.memory-card'),
        hasFlippedCard: false,
        lockBoard: true,
        firstCard: null,
        secondCard: null,
        moves: 0,
        matches: 0,
        timer: null,
        seconds: 0,
        
        init: function() {
            this.addEventListeners();
            document.getElementById('memory-start').addEventListener('click', () => this.startGame());
            document.getElementById('memory-reset').addEventListener('click', () => this.resetGame());
        },
        
        addEventListeners: function() {
            this.cards.forEach(card => {
                card.addEventListener('click', () => this.flipCard(card));
            });
        },
        
        startGame: function() {
            this.resetGame();
            this.lockBoard = false;
            this.startTimer();
            document.getElementById('memory-start').classList.add('disabled');
        },
        
        resetGame: function() {
            this.clearTimer();
            this.seconds = 0;
            this.moves = 0;
            this.matches = 0;
            this.updateStats();
            this.lockBoard = true;
            this.hasFlippedCard = false;
            this.firstCard = null;
            this.secondCard = null;
            
            this.cards.forEach(card => {
                card.classList.remove('flipped');
                card.classList.remove('matched');
                setTimeout(() => {
                    this.shuffle();
                }, 500);
            });
            
            document.getElementById('memory-start').classList.remove('disabled');
        },
        
        flipCard: function(card) {
            if (this.lockBoard) return;
            if (card === this.firstCard) return;
            if (card.classList.contains('matched')) return;
            
            card.classList.add('flipped');
            
            if (!this.hasFlippedCard) {
                // Primera carta
                this.hasFlippedCard = true;
                this.firstCard = card;
            } else {
                // Segunda carta
                this.secondCard = card;
                this.moves++;
                this.updateStats();
                this.checkForMatch();
            }
        },
        
        checkForMatch: function() {
            const isMatch = this.firstCard.dataset.value === this.secondCard.dataset.value;
            
            if (isMatch) {
                this.disableCards();
                this.matches++;
                
                if (this.matches === this.cards.length / 2) {
                    this.winGame();
                }
            } else {
                this.unflipCards();
            }
        },
        
        disableCards: function() {
            this.firstCard.classList.add('matched');
            this.secondCard.classList.add('matched');
            this.resetBoard();
        },
        
        unflipCards: function() {
            this.lockBoard = true;
            
            setTimeout(() => {
                this.firstCard.classList.remove('flipped');
                this.secondCard.classList.remove('flipped');
                this.resetBoard();
            }, 1000);
        },
        
        resetBoard: function() {
            [this.hasFlippedCard, this.lockBoard] = [false, false];
            [this.firstCard, this.secondCard] = [null, null];
        },
        
        shuffle: function() {
            this.cards.forEach(card => {
                const randomPosition = Math.floor(Math.random() * this.cards.length);
                card.style.order = randomPosition;
            });
        },
        
        startTimer: function() {
            this.clearTimer();
            this.timer = setInterval(() => {
                this.seconds++;
                this.updateStats();
            }, 1000);
        },
        
        clearTimer: function() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        
        updateStats: function() {
            document.getElementById('memory-moves').textContent = this.moves;
            document.getElementById('memory-time').textContent = this.seconds + 's';
        },
        
        winGame: function() {
            this.clearTimer();
            this.lockBoard = true;
            setTimeout(() => {
                alert(`¡Felicidades! Has completado el juego en ${this.moves} movimientos y ${this.seconds} segundos.`);
            }, 500);
        }
    };
    
    // ===== Snake Game =====
    const snakeGame = {
        canvas: document.getElementById('snake-game'),
        ctx: null,
        snake: [],
        food: { x: 0, y: 0 },
        gridSize: 20,
        tileCount: 15,
        xVelocity: 0,
        yVelocity: 0,
        score: 0,
        gameOver: true,
        gameLoop: null,
        
        init: function() {
            if (!this.canvas) return;
            
            this.ctx = this.canvas.getContext('2d');
            document.getElementById('snake-start').addEventListener('click', () => this.startGame());
            document.getElementById('snake-reset').addEventListener('click', () => this.resetGame());
            
            // Controles de teclado
            document.addEventListener('keydown', (e) => this.keyDown(e));
            
            // Controles táctiles
            document.getElementById('snake-up').addEventListener('click', () => this.setDirection(0, -1));
            document.getElementById('snake-down').addEventListener('click', () => this.setDirection(0, 1));
            document.getElementById('snake-left').addEventListener('click', () => this.setDirection(-1, 0));
            document.getElementById('snake-right').addEventListener('click', () => this.setDirection(1, 0));
            
            this.resetGame();
            this.drawGame(); // Dibuja el tablero inicial
        },
        
        startGame: function() {
            if (!this.gameOver) return;
            
            this.resetGame();
            this.gameOver = false;
            this.gameLoop = setInterval(() => this.drawGame(), 1000/10); // 10 FPS
        },
        
        resetGame: function() {
            if (this.gameLoop) {
                clearInterval(this.gameLoop);
                this.gameLoop = null;
            }
            
            this.snake = [
                { x: 7, y: 7 }
            ];
            this.score = 0;
            this.xVelocity = 0;
            this.yVelocity = 0;
            this.gameOver = true;
            this.placeFood();
            this.updateScore();
            
            // Dibuja el estado inicial
            this.drawGame();
        },
        
        drawGame: function() {
            // Mover la serpiente
            if (!this.gameOver) {
                let headX = this.snake[0].x + this.xVelocity;
                let headY = this.snake[0].y + this.yVelocity;
                
                // Verificar colisión con las paredes
                if (headX < 0 || headY < 0 || headX >= this.tileCount || headY >= this.tileCount) {
                    this.gameOver = true;
                }
                
                // Verificar colisión consigo misma
                for (let i = 1; i < this.snake.length; i++) {
                    if (headX === this.snake[i].x && headY === this.snake[i].y) {
                        this.gameOver = true;
                        break;
                    }
                }
                
                if (!this.gameOver) {
                    // Añadir nueva cabeza
                    this.snake.unshift({ x: headX, y: headY });
                    
                    // Verificar si comió la comida
                    if (headX === this.food.x && headY === this.food.y) {
                        this.score++;
                        this.updateScore();
                        this.placeFood();
                    } else {
                        // Quitar la cola si no comió
                        this.snake.pop();
                    }
                }
            }
            
            // Limpiar canvas
            this.ctx.fillStyle = this.gameOver ? '#f0f0f0' : 'white';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Dibujar la serpiente
            this.ctx.fillStyle = '#4b70e2';
            for (let i = 0; i < this.snake.length; i++) {
                this.ctx.fillRect(
                    this.snake[i].x * this.gridSize,
                    this.snake[i].y * this.gridSize,
                    this.gridSize - 2,
                    this.gridSize - 2
                );
                
                // Dibujar ojos en la cabeza
                if (i === 0) {
                    this.ctx.fillStyle = 'white';
                    const eyeSize = 3;
                    const eyeOffset = 5;
                    
                    if (this.xVelocity === 1) { // Derecha
                        this.ctx.fillRect(
                            this.snake[i].x * this.gridSize + this.gridSize - eyeOffset,
                            this.snake[i].y * this.gridSize + 4,
                            eyeSize, eyeSize
                        );
                        this.ctx.fillRect(
                            this.snake[i].x * this.gridSize + this.gridSize - eyeOffset,
                            this.snake[i].y * this.gridSize + this.gridSize - 7,
                            eyeSize, eyeSize
                        );
                    } else if (this.xVelocity === -1) { // Izquierda
                        this.ctx.fillRect(
                            this.snake[i].x * this.gridSize + 4,
                            this.snake[i].y * this.gridSize + 4,
                            eyeSize, eyeSize
                        );
                        this.ctx.fillRect(
                            this.snake[i].x * this.gridSize + 4,
                            this.snake[i].y * this.gridSize + this.gridSize - 7,
                            eyeSize, eyeSize
                        );
                    } else if (this.yVelocity === -1) { // Arriba
                        this.ctx.fillRect(
                            this.snake[i].x * this.gridSize + 4,
                            this.snake[i].y * this.gridSize + 4,
                            eyeSize, eyeSize
                        );
                        this.ctx.fillRect(
                            this.snake[i].x * this.gridSize + this.gridSize - 7,
                            this.snake[i].y * this.gridSize + 4,
                            eyeSize, eyeSize
                        );
                    } else if (this.yVelocity === 1) { // Abajo
                        this.ctx.fillRect(
                            this.snake[i].x * this.gridSize + 4,
                            this.snake[i].y * this.gridSize + this.gridSize - 7,
                            eyeSize, eyeSize
                        );
                        this.ctx.fillRect(
                            this.snake[i].x * this.gridSize + this.gridSize - 7,
                            this.snake[i].y * this.gridSize + this.gridSize - 7,
                            eyeSize, eyeSize
                        );
                    }
                    
                    this.ctx.fillStyle = '#4b70e2'; // Restaurar color
                }
            }
            
            // Dibujar la comida
            this.ctx.fillStyle = '#e74c3c';
            this.ctx.beginPath();
            this.ctx.arc(
                this.food.x * this.gridSize + this.gridSize/2,
                this.food.y * this.gridSize + this.gridSize/2,
                this.gridSize/2 - 1,
                0,
                Math.PI * 2
            );
            this.ctx.fill();
            
            // Mostrar mensaje de Game Over
            if (this.gameOver && this.score > 0) {
                this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                
                this.ctx.fillStyle = 'white';
                this.ctx.font = '20px Poppins';
                this.ctx.textAlign = 'center';
                this.ctx.fillText('Game Over', this.canvas.width/2, this.canvas.height/2 - 10);
                this.ctx.fillText(`Score: ${this.score}`, this.canvas.width/2, this.canvas.height/2 + 20);
                
                if (this.gameLoop) {
                    clearInterval(this.gameLoop);
                    this.gameLoop = null;
                }
            } else if (this.gameOver) {
                // Instrucciones iniciales
                this.ctx.fillStyle = '#666';
                this.ctx.font = '14px Poppins';
                this.ctx.textAlign = 'center';
                this.ctx.fillText('Presiona Comenzar', this.canvas.width/2, this.canvas.height/2 - 10);
                this.ctx.fillText('para jugar', this.canvas.width/2, this.canvas.height/2 + 10);
            }
        },
        
        placeFood: function() {
            // Colocar comida en una posición aleatoria donde no esté la serpiente
            let validPosition = false;
            let newFood;
            
            while (!validPosition) {
                newFood = {
                    x: Math.floor(Math.random() * this.tileCount),
                    y: Math.floor(Math.random() * this.tileCount)
                };
                
                validPosition = true;
                for (let i = 0; i < this.snake.length; i++) {
                    if (this.snake[i].x === newFood.x && this.snake[i].y === newFood.y) {
                        validPosition = false;
                        break;
                    }
                }
            }
            
            this.food = newFood;
        },
        
        keyDown: function(e) {
            // Arrow keys
            if (e.keyCode === 38) { // Up
                this.setDirection(0, -1);
            } else if (e.keyCode === 40) { // Down
                this.setDirection(0, 1);
            } else if (e.keyCode === 37) { // Left
                this.setDirection(-1, 0);
            } else if (e.keyCode === 39) { // Right
                this.setDirection(1, 0);
            }
            
            // WASD keys
            if (e.keyCode === 87) { // W - Up
                this.setDirection(0, -1);
            } else if (e.keyCode === 83) { // S - Down
                this.setDirection(0, 1);
            } else if (e.keyCode === 65) { // A - Left
                this.setDirection(-1, 0);
            } else if (e.keyCode === 68) { // D - Right
                this.setDirection(1, 0);
            }
        },
        
        setDirection: function(x, y) {
            if (this.gameOver && (x !== 0 || y !== 0)) {
                this.startGame();
                this.xVelocity = x;
                this.yVelocity = y;
                return;
            }
            
            // Evitar que la serpiente vaya en dirección opuesta
            if (this.xVelocity === -x && this.yVelocity === -y && this.snake.length > 1) {
                return;
            }
            
            // Evitar movimientos diagonales
            if (x !== 0 && y !== 0) {
                return;
            }
            
            this.xVelocity = x;
            this.yVelocity = y;
        },
        
        updateScore: function() {
            document.getElementById('snake-score').textContent = this.score;
        }
    };
    
    // ===== Quiz Game =====
    const quizGame = {
        questions: [
            {
                question: "¿Qué hace el método Array.prototype.map() en JavaScript?",
                options: [
                    "Modifica el array original",
                    "Crea un nuevo array con los resultados de aplicar una función a cada elemento",
                    "Filtra elementos del array",
                    "Ordena el array"
                ],
                correct: 1
            },
            {
                question: "¿Qué significa CSS?",
                options: [
                    "Computer Style Sheets",
                    "Creative Style Sheets",
                    "Cascading Style Sheets",
                    "Colorful Style Sheets"
                ],
                correct: 2
            },
            {
                question: "En React, ¿qué es un componente?",
                options: [
                    "Una función o clase que retorna elementos JSX",
                    "Una base de datos",
                    "Un elemento HTML",
                    "Un archivo .css"
                ],
                correct: 0
            },
            {
                question: "¿Qué significa API?",
                options: [
                    "Application Program Interface",
                    "Application Programming Internet",
                    "Application Protocol Interface",
                    "Application Programming Interface"
                ],
                correct: 3
            },
            {
                question: "¿Cuál de estos no es un lenguaje de programación?",
                options: [
                    "Java",
                    "Python",
                    "HTML",
                    "C++"
                ],
                correct: 2
            },
            {
                question: "¿Qué es Git?",
                options: [
                    "Un lenguaje de programación",
                    "Un sistema de control de versiones",
                    "Un framework de JavaScript",
                    "Una base de datos"
                ],
                correct: 1
            },
            {
                question: "¿Cuál es la forma correcta de declarar una variable en JavaScript moderno?",
                options: [
                    "var name = 'John';",
                    "const name = 'John';",
                    "string name = 'John';",
                    "variable name = 'John';"
                ],
                correct: 1
            },
            {
                question: "¿Qué tecnología se utiliza para estilizar componentes en React?",
                options: [
                    "XML",
                    "JSX",
                    "CSS/SCSS",
                    "EJS"
                ],
                correct: 2
            },
            {
                question: "¿Qué es REST en el contexto de APIs?",
                options: [
                    "Remote Exception System Transfer",
                    "Representational State Transfer",
                    "Reduced Endpoint System Technology",
                    "Regular Expression State Transfer"
                ],
                correct: 1
            },
            {
                question: "¿Qué hace el método 'addEventListener' en JavaScript?",
                options: [
                    "Añade estilos CSS a un elemento",
                    "Registra un manejador de eventos para un elemento",
                    "Añade un nuevo elemento al DOM",
                    "Añade una nueva página al sitio web"
                ],
                correct: 1
            }
        ],
        currentQuestion: 0,
        score: 0,
        isGameActive: false,
        
        init: function() {
            // Obtener referencias a los elementos del DOM
            this.quizQuestion = document.getElementById('quiz-question');
            this.quizOptions = document.getElementById('quiz-options');
            this.quizScore = document.getElementById('quiz-score');
            this.quizTotal = document.getElementById('quiz-total');
            this.startButton = document.getElementById('quiz-start');
            this.resetButton = document.getElementById('quiz-reset');
            
            // Si no se encuentran los elementos, salir sin inicializar
            if (!this.quizQuestion || !this.quizOptions) return;
            
            // Configurar listeners para los botones
            if (this.startButton) {
                this.startButton.addEventListener('click', () => this.startGame());
            }
            
            if (this.resetButton) {
                this.resetButton.addEventListener('click', () => this.resetGame());
            }
            
            // Mostrar el número total de preguntas
            if (this.quizTotal) {
                this.quizTotal.textContent = this.questions.length;
            }
            
            // Preparar la interfaz inicial
            this.resetGame();
        },
        
        startGame: function() {
            if (!this.isGameActive) {
                this.resetGame();
                this.isGameActive = true;
                this.loadQuestion();
                
                // Desactivar visualmente el botón de inicio
                if (this.startButton) {
                    this.startButton.classList.add('disabled');
                    this.startButton.setAttribute('disabled', 'disabled');
                }
            }
        },
        
        resetGame: function() {
            this.currentQuestion = 0;
            this.score = 0;
            this.isGameActive = false;
            
            // Actualizar la puntuación en la interfaz
            if (this.quizScore) {
                this.quizScore.textContent = this.score;
            }
            
            // Restablecer el botón de inicio
            if (this.startButton) {
                this.startButton.classList.remove('disabled');
                this.startButton.removeAttribute('disabled');
            }
            
            // Cargar la pantalla inicial
            this.showWelcomeScreen();
        },
        
        showWelcomeScreen: function() {
            if (this.quizQuestion) {
                this.quizQuestion.innerHTML = '<h4>¿Listo para poner a prueba tus conocimientos en programación?</h4>';
            }
            
            if (this.quizOptions) {
                this.quizOptions.innerHTML = '<p class="start-message">Haz clic en "Comenzar" para iniciar el quiz</p>';
            }
        },
        
        loadQuestion: function() {
            if (this.currentQuestion < this.questions.length) {
                const question = this.questions[this.currentQuestion];
                
                // Actualizar la pregunta
                if (this.quizQuestion) {
                    this.quizQuestion.innerHTML = `<h4>${question.question}</h4>`;
                }
                
                // Limpiar y crear las nuevas opciones
                if (this.quizOptions) {
                    this.quizOptions.innerHTML = '';
                    
                    question.options.forEach((option, index) => {
                        const optionElement = document.createElement('div');
                        optionElement.className = 'quiz-option';
                        optionElement.textContent = option;
                        
                        // Agregar evento para comprobar respuesta
                        optionElement.addEventListener('click', () => {
                            if (this.isGameActive) {
                                this.checkAnswer(index);
                            }
                        });
                        
                        this.quizOptions.appendChild(optionElement);
                    });
                }
            } else if (this.isGameActive) {
                // Quiz completado, mostrar resultados
                this.gameOver();
            }
        },
        
        checkAnswer: function(selectedIndex) {
            if (!this.isGameActive) return;
            
            const question = this.questions[this.currentQuestion];
            const options = this.quizOptions.querySelectorAll('.quiz-option');
            
            // Prevenir múltiples clics
            this.isGameActive = false;
            
            // Marcar la respuesta correcta e incorrecta
            if (selectedIndex === question.correct) {
                // Respuesta correcta
                options[selectedIndex].classList.add('correct');
                this.score++;
                
                // Actualizar la puntuación en la interfaz
                if (this.quizScore) {
                    this.quizScore.textContent = this.score;
                }
                
                // Mostrar un efecto de confeti o celebración
                this.showCelebration();
            } else {
                // Respuesta incorrecta
                options[selectedIndex].classList.add('wrong');
                
                // Mostrar también cuál era la respuesta correcta
                options[question.correct].classList.add('correct');
            }
            
            // Pasar a la siguiente pregunta después de un breve retraso
            setTimeout(() => {
                this.currentQuestion++;
                this.isGameActive = true;
                this.loadQuestion();
            }, 1500);
        },
        
        gameOver: function() {
            this.isGameActive = false;
            
            // Mostrar pantalla de resultados finales
            if (this.quizQuestion) {
                this.quizQuestion.innerHTML = `<h4>¡Quiz completado!</h4>`;
            }
            
            if (this.quizOptions) {
                let message = '';
                const percentage = (this.score / this.questions.length) * 100;
                
                if (percentage >= 90) {
                    message = '¡Excelente! Eres un experto en programación.';
                } else if (percentage >= 70) {
                    message = '¡Muy bien! Tienes un buen conocimiento de programación.';
                } else if (percentage >= 50) {
                    message = 'No está mal. Pero podrías mejorar tus conocimientos.';
                } else {
                    message = 'Sigue estudiando. La práctica hace al maestro.';
                }
                
                this.quizOptions.innerHTML = `
                    <div class="quiz-result-final">
                        <p class="score-display">Tu puntuación: <strong>${this.score}/${this.questions.length}</strong> (${percentage}%)</p>
                        <p class="feedback-message">${message}</p>
                        <button id="play-again" class="game-btn">Jugar de nuevo</button>
                    </div>
                `;
                
                // Agregar evento para volver a jugar
                const playAgainButton = document.getElementById('play-again');
                if (playAgainButton) {
                    playAgainButton.addEventListener('click', () => this.resetGame());
                }
            }
            
            // Habilitar el botón de inicio
            if (this.startButton) {
                this.startButton.classList.remove('disabled');
                this.startButton.removeAttribute('disabled');
            }
        },
        
        showCelebration: function() {
            // Crear efecto de confeti cuando la respuesta es correcta
            const colors = ['#4b70e2', '#7b54e8', '#f8c01a', '#e74c3c', '#2ecc71'];
            
            for (let i = 0; i < 30; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = (Math.random() * 10 + 5) + 'px';
                confetti.style.height = (Math.random() * 10 + 5) + 'px';
                
                document.body.appendChild(confetti);
                
                // Eliminar el confeti después de que termine la animación
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }
            
            // Feedback visual en el botón
            const correctSound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADwADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAAwDVxttG//sUZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==');
            correctSound.volume = 0.2;
            correctSound.play().catch(e => console.log('Audio play failed:', e));
        }
    };
    
    // Inicializar los juegos si existen en el DOM
    if (document.querySelector('.memory-card')) {
        memoryGame.init();
    }
    
    if (document.getElementById('snake-game')) {
        snakeGame.init();
    }
    
    if (document.getElementById('quiz-game')) {
        quizGame.init();
    }
});