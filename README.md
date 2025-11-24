# Cyber Goodies Wheel - Guide d'utilisation

Votre application de quiz et de roue des goodies est prête !

## 🚀 Comment lancer l'application

1. Ouvrez le dossier contenant les fichiers.
2. Double-cliquez sur le fichier **`index.html`**.
3. L'application s'ouvrira dans votre navigateur web par défaut.
   - *Aucune installation ni connexion internet n'est requise.*

## ⚙️ Comment modifier les questions et les goodies

Toutes les données sont stockées dans le fichier **`data.js`**. Vous pouvez l'ouvrir avec n'importe quel éditeur de texte (Bloc-notes, Notepad++, VS Code, etc.).

### Modifier les Questions
Cherchez la section `QUESTIONS`. Il y a deux catégories : `easy` (Facile) et `hard` (Difficile).
Pour ajouter ou modifier une question, suivez ce modèle :

```javascript
{
    question: "Votre question ici ?",
    answers: [
        { text: "Mauvaise réponse", correct: false },
        { text: "Bonne réponse", correct: true }
    ]
}
```

### Modifier la Roue (Goodies)
Cherchez la section `PRIZES`.
Pour modifier les lots, les couleurs ou les probabilités :

```javascript
{ 
    label: "Nom du lot", 
    color: "#CodeCouleur", 
    probability: 30 // Pourcentage de chance
}
```
*Note : Le total des probabilités n'a pas besoin de faire exactement 100, le logiciel adapte les parts automatiquement.*

## 🎨 Personnalisation Avancée

Si vous souhaitez modifier les couleurs ou le style, tout se trouve dans le fichier **`style.css`**.
Les variables principales sont en haut du fichier :
```css
:root {
    --neon-blue: #00f3ff;
    --neon-pink: #ff00ff;
    --neon-green: #00ff66;
    /* ... */
}
```
Changez ces codes couleurs pour adapter l'application à votre charte graphique.
