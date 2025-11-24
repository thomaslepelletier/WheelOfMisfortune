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
            question: "Qu'est-ce qu'une attaque par 'Man-in-the-Middle' ?",
            answers: [
                { text: "Interception des communications", correct: true },
                { text: "Une attaque physique sur le serveur", correct: false }
            ]
        },
        {
            question: "Que signifie l'acronyme VPN ?",
            answers: [
                { text: "Virtual Private Network", correct: true },
                { text: "Very Personal Network", correct: false }
            ]
        },
        {
            question: "Quel protocole sécurise les échanges sur le web ?",
            answers: [
                { text: "HTTP", correct: false },
                { text: "HTTPS", correct: true }
            ]
        }
    ]
};

// --- GOODIES (ROUE) ---
// Structure :
// { label: "Nom du lot", color: "Code couleur", probability: Pourcentage (0-100) }
// IMPORTANT : La somme des probabilités n'a pas besoin de faire 100, le calcul se fera proportionnellement.
const PRIZES = [
    { label: "Clé USB 💾", color: "#FF0055", probability: 5 },
    { label: "Stylo 🖊️", color: "#00CCFF", probability: 30 },
    { label: "Bloc-notes 📓", color: "#AA00FF", probability: 30 },
    { label: "Stickers 🏷️", color: "#FFCC00", probability: 35 }
];
