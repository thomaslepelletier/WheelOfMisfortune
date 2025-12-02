/**
 * CONFIGURATION DES DONNÉES
 * Vous pouvez éditer ce fichier pour changer les questions et les goodies.
 */

// --- QUESTIONS ---
// Structure :
// {
//     question: "Le texte de la question",
//     answers: [
//         { text: "Réponse A", correct: false },
//         { text: "Réponse B (La bonne)", correct: true }
//     ]
// }
const QUESTIONS = {
    easy: [
        {
            question: "Quel est le danger principal du phishing ?",
            answers: [
                { text: "Vol d'informations personnelles", correct: true },
                { text: "Ralentissement de l'ordinateur", correct: false }
            ]
        },
        {
            question: "Quelle doit être la longueur minimale d'un bon mot de passe ?",
            answers: [
                { text: "12 caractères", correct: true },
                { text: "4 caractères", correct: false }
            ]
        },
        {
            question: "Que devez-vous faire si vous trouvez une clé USB inconnue ?",
            answers: [
                { text: "La brancher pour voir ce qu'il y a dessus", correct: false },
                { text: "La donner au service informatique", correct: true }
            ]
        }
    ],
    hard: [
        {
            question: "Dans le chiffrement RSA, si n = p * q, que représente φ(n) (l'indicatrice d'Euler) ?",
            answers: [
                { text: "(p-1)(q-1)", correct: true },
                { text: "p + q", correct: false }
            ]
        },
        {
            question: "Quelle entête HTTP permet d'atténuer les failles XSS en restreignant les sources de scripts ?",
            answers: [
                { text: "Content-Security-Policy", correct: true },
                { text: "Access-Control-Allow-Origin", correct: false }
            ]
        },
        {
            question: "Quel bit de permission permet à un exécutable de tourner avec les droits de son propriétaire ?",
            answers: [
                { text: "Sticky Bit", correct: false },
                { text: "SUID", correct: true }
            ]
        }
    ]
};

// --- GOODIES (ROUE) ---
// Structure :
// { label: "Nom du lot", color: "Code couleur", probability: Pourcentage (0-100) }
// IMPORTANT : La somme des probabilités n'a pas besoin de faire 100, le calcul se fera proportionnellement.
const PRIZES = [
    { label: "Microfibre", color: "#FF0055", probability: 20, icon: "icon_microfibre.png" },
    { label: "Autocollant", color: "#00CCFF", probability: 20, icon: "icon_sticker.png" },
    { label: "Marque-page", color: "#AA00FF", probability: 15, icon: "icon_bookmark.png" },
    { label: "Carte RFID", color: "#FFCC00", probability: 15, icon: "icon_rfid.png" },
    { label: "Trou de cou", color: "#00FF66", probability: 15, icon: "icon_lanyard.png" },
    { label: "Enrouleur", color: "#FF00FF", probability: 15, icon: "icon_reel.svg" }
];
