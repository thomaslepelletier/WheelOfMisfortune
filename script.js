// --- VARIABLES GLOBALES ---
let currentDifficulty = 'easy';
let currentQuestion = null;
let wheelCanvas = document.getElementById('wheel-canvas');
let ctx = wheelCanvas.getContext('2d');
let isSpinning = false;
let currentRotation = 0; // Rotation actuelle en radians

// --- GESTION DES VUES ---
function showView(viewId) {
    // Cacher toutes les vues
    document.querySelectorAll('.view').forEach(el => el.classList.add('hidden'));
    // Afficher la vue demandée
    document.getElementById(viewId).classList.remove('hidden');
}

function resetGame() {
    // Cacher les popups
    document.querySelectorAll('.popup').forEach(el => el.classList.add('hidden'));
    // Retour à l'accueil
    showView('view-home');
    isSpinning = false;
}

// --- LOGIQUE DU QUIZ ---
function startGame(difficulty) {
    currentDifficulty = difficulty;

    // Sélectionner une question aléatoire
    const questionsList = QUESTIONS[difficulty];
    const randomIndex = Math.floor(Math.random() * questionsList.length);
    currentQuestion = questionsList[randomIndex];

    // Mettre à jour l'interface
    document.getElementById('difficulty-label').textContent = difficulty === 'easy' ? '(Facile)' : '(Difficile)';
    document.getElementById('question-text').textContent = currentQuestion.question;

    // Générer les boutons de réponse
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = ''; // Vider les anciennes réponses

    // Mélanger les réponses pour ne pas que la bonne soit toujours au même endroit (optionnel, ici on garde l'ordre du fichier ou on mélange)
    // Pour l'instant on garde l'ordre du fichier data.js pour simplicité, ou on peut mélanger :
    const shuffledAnswers = [...currentQuestion.answers].sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach(answer => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-large';
        btn.textContent = answer.text;
        // Style neutre par défaut, on pourrait ajouter des classes spécifiques si demandé
        btn.style.borderColor = '#ffffff';

        btn.onclick = () => checkAnswer(answer.correct);
        answersContainer.appendChild(btn);
    });

    showView('view-quiz');
}

function checkAnswer(isCorrect) {
    if (isCorrect) {
        // Bonne réponse -> Roue
        showView('view-wheel');
        drawWheel(); // Dessiner la roue
    } else {
        // Mauvaise réponse -> Popup échec
        document.getElementById('fail-popup').classList.remove('hidden');
    }
}

// --- LOGIQUE DE LA ROUE ---
function drawWheel() {
    if (!wheelCanvas.getContext) return;

    const width = wheelCanvas.width;
    const height = wheelCanvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 - 10; // Marge

    ctx.clearRect(0, 0, width, height);

    // Calculer le total des probabilités pour normaliser
    const totalProb = PRIZES.reduce((sum, p) => sum + p.probability, 0);

    let startAngle = currentRotation;

    PRIZES.forEach(prize => {
        // La part du gâteau en radians
        const sliceAngle = (prize.probability / totalProb) * 2 * Math.PI;

        // Dessiner le segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = prize.color;
        ctx.fill();
        ctx.stroke(); // Bordure

        // Ajouter du texte (optionnel, peut être compliqué à aligner parfaitement sans trigo)
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = "bold 20px Arial";
        ctx.fillText(prize.label, radius - 20, 10);
        ctx.restore();

        startAngle += sliceAngle;
    });
}

function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;

    // Désactiver le bouton
    const spinBtn = document.getElementById('spin-btn');
    spinBtn.disabled = true;
    spinBtn.style.opacity = 0.5;

    // Déterminer le gagnant à l'avance (basé sur les probabilités)
    const winner = pickWinner();

    // Calculer l'angle final pour atterrir sur le gagnant
    // Le pointeur est en haut (270 degrés ou -90 degrés ou 3*PI/2)
    // Mais notre dessin commence à 0 (à droite).
    // Donc si on veut que le segment soit en haut, il faut tourner la roue pour que le segment arrive à -PI/2.

    const totalProb = PRIZES.reduce((sum, p) => sum + p.probability, 0);
    let angleSoFar = 0;
    let winnerAngleStart = 0;
    let winnerAngleEnd = 0;

    for (let p of PRIZES) {
        const sliceAngle = (p.probability / totalProb) * 2 * Math.PI;
        if (p === winner) {
            winnerAngleStart = angleSoFar;
            winnerAngleEnd = angleSoFar + sliceAngle;
            break;
        }
        angleSoFar += sliceAngle;
    }

    // L'angle cible (milieu du segment)
    const targetSliceMiddle = winnerAngleStart + (winnerAngleEnd - winnerAngleStart) / 2;

    // On veut que ce targetSliceMiddle se retrouve à -PI/2 (en haut)
    // Donc RotationFinale + targetSliceMiddle = -PI/2 (modulo 2PI)
    // RotationFinale = -PI/2 - targetSliceMiddle

    // On ajoute plusieurs tours complets (entre 5 et 10 tours)
    const spins = 5 + Math.random() * 5;
    const spinAngle = spins * 2 * Math.PI;

    // L'angle final absolu qu'on veut atteindre
    // Note: Le système de coordonnées canvas : 0 est à 3h. -PI/2 est à 12h.
    // Le pointeur est fixe à 12h.
    const offsetToPointer = -Math.PI / 2;
    const targetRotation = offsetToPointer - targetSliceMiddle + spinAngle;

    // Animation
    const duration = 5000; // 5 secondes
    const startTime = performance.now();
    const startRotation = currentRotation;

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out cubic)
        const ease = 1 - Math.pow(1 - progress, 3);

        currentRotation = startRotation + (targetRotation - startRotation) * ease;

        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
            spinBtn.disabled = false;
            spinBtn.style.opacity = 1;
            showResult(winner);
        }
    }

    requestAnimationFrame(animate);
}

function pickWinner() {
    const totalProb = PRIZES.reduce((sum, p) => sum + p.probability, 0);
    let random = Math.random() * totalProb;

    for (let p of PRIZES) {
        if (random < p.probability) {
            return p;
        }
        random -= p.probability;
    }
    return PRIZES[PRIZES.length - 1];
}

function showResult(winner) {
    const popup = document.getElementById('result-popup');
    const prizeDisplay = document.getElementById('prize-display');

    prizeDisplay.textContent = winner.label;
    prizeDisplay.style.color = winner.color;

    // Petit délai pour l'effet dramatique
    setTimeout(() => {
        popup.classList.remove('hidden');
        // Confettis basiques (optionnel, si on veut ajouter une lib externe plus tard)
    }, 500);
}

// Initial draw
window.onload = () => {
    drawWheel();
};
