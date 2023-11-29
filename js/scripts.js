// Varaibles
let imgquebec = document.getElementById("ImageQuebec");
let btnreset = document.getElementById("reset");
let btnrejouer = document.getElementById("rejouer");
let valeurdiv = document.getElementById("valeur");

// Génération de nombre aléatoire

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Class Question
class Question {
  constructor(text, choices, answer, points) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.points = points;
  }
  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}
// Questions
let questions = [
  // Question Générer par Chat GPT
  new Question(
    "Qu'est-ce que HTML ?",
    [
      "Hypertext Markup Language",
      "High-level Text Management Language",
      "Hyperlink and Text Markup Language",
      "Hypertext and Links Markup",
    ],
    "Hypertext Markup Language",
    getRandomInt(1, 3)
  ),
  new Question(
    "Quel langage de programmation est souvent utilisé pour créer des pages web dynamiques ?",
    ["Java", "JavaScript", "Joomla", "Jambon"],
    "JavaScript",
    getRandomInt(1, 3)
  ),
  new Question(
    "Quelle est la fonction principale d'un pare-feu ?",
    [
      "Cuire des steaks",
      "Protéger le réseau contre les attaques",
      "Faciliter la communication entre les périphériques",
      "Réchauffer le café",
    ],
    "Protéger le réseau contre les attaques",
    getRandomInt(1, 3)
  ),
  new Question(
    "Qu'est-ce qu'un algorithme ?",
    [
      "Un logiciel antivirus",
      "Une série de pas pour effectuer une tâche",
      "Un langage de programmation",
      "Un type de café",
    ],
    "Une série de pas pour effectuer une tâche",
    getRandomInt(1, 3)
  ),
  new Question(
    "Quel est le rôle d'un serveur dans un réseau informatique ?",
    [
      "Filtrer les spams",
      "Fournir des ressources et des services aux clients",
      "Jouer à des jeux en ligne",
      "Être le chef de l'équipe informatique",
    ],
    "Fournir des ressources et des services aux clients",
    getRandomInt(1, 3)
  ),
  new Question(
    "Qu'est-ce que signifie l'acronyme VPN ?",
    [
      "Very Private Network",
      "Virtual Personal Network",
      "Virus Protection Network",
      "Virtual Program Network",
    ],
    "Virtual Personal Network",
    getRandomInt(1, 3)
  ),
  new Question(
    "Quelle est la différence entre RAM et ROM ?",
    [
      "RAM est volatile, ROM est non volatile",
      "RAM est utilisée pour le stockage à long terme, ROM pour le stockage à court terme",
      "RAM est plus rapide que ROM",
      "RAM et ROM sont la même chose",
    ],
    "RAM est volatile, ROM est non volatile",
    getRandomInt(1, 3)
  ),
  new Question(
    "Qu'est-ce que signifie le terme 'Open Source' ?",
    [
      "Un logiciel avec une boîte qui s'ouvre facilement",
      "Un logiciel qui est gratuit",
      "Un logiciel dont le code source est disponible publiquement",
      "Un logiciel avec une licence limitée",
    ],
    "Un logiciel dont le code source est disponible publiquement",
    getRandomInt(1, 3)
  ),
  new Question(
    "Quel langage de programmation est souvent utilisé pour le développement d'applications mobiles ?",
    ["Python", "C++", "Swift", "Ruby"],
    "Swift",
    getRandomInt(1, 3)
  ),
  new Question(
    "Quel est le rôle d'un système d'exploitation ?",
    [
      "Faire du café",
      "Gérer les ressources matérielles et logicielles d'un ordinateur",
      "Jouer à des jeux vidéo",
      "Créer des présentations PowerPoint",
    ],
    "Gérer les ressources matérielles et logicielles d'un ordinateur",
    getRandomInt(1, 3)
  ),
];

// Class Quiz
class Quiz {
  constructor(questions) {
    this.score = 0;
    // Mélanger les questions
    questions.sort(() => Math.random() - 0.5);
    // Prendre les 5 premières questions
    this.questions = questions.slice(0, 5);
    this.currentQuestionIndex = 0;
    // Calculer le pointage total pour les 5 questions sélectionnées
    this.totalPoints = this.questions.reduce(
      (sum, question) => sum + question.points,
      0
    );
    console.log(this.questions);
  }
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  guess(answer) {
    // Calcul du score
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score += this.getCurrentQuestion().points;
    }
    this.currentQuestionIndex++;
    // Calcul du nombre total
    this.pointfinal = this.totalPoints;
  }
  hasEnded() {
    // Fin du quiz
    return this.currentQuestionIndex >= this.questions.length;
  }
}

const display = {
  elementShown: function (id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  endQuiz: function () {
    // Affichage du score final et du bouton rejouer
    endQuizHTML = `
        <h1>Quiz terminé !</h1>
        <h3> Votre score est de : ${quiz.score} / ${quiz.pointfinal}</h3>
        <button id="rejouer" class="btn btn-primary" onclick="Rejouer()">Rejouer</button>`;
    this.elementShown("quiz", endQuizHTML);
  },
  question: function () {
    this.elementShown("question", quiz.getCurrentQuestion().text);
    valeurdiv.innerHTML =
      "Valeur de la Question : " +
      quiz.getCurrentQuestion().points +
      " point(s)";
  },
  choices: function () {
    let choices = quiz.getCurrentQuestion().choices;
    // Affichage des choix
    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function () {
        quiz.guess(guess);
        quizApp();
      };
    };
    // affichage choix + prise en compte du choix
    for (let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },
  progress: function () {
    let currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.elementShown(
      "progress",
      "Question " + currentQuestionNumber + " sur " + quiz.questions.length
    );
  },
};

// Game logic
quizApp = () => {
  if (quiz.hasEnded()) {
    display.endQuiz();
  } else {
    display.question();
    display.choices();
    display.progress();
  }
};
// Create Quiz
let quiz = new Quiz(questions);
quizApp();

// Reset Quiz

btnreset.addEventListener("click", () => {
  quiz.currentQuestionIndex = 0;
  quiz.score = 0;
  quizApp();
});

// Rejouer le quiz

function Rejouer() {
  location.reload();
}

