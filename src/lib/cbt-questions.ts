
export interface Question {
  id: number;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const allQuestions: Question[] = [
  // English
  {
    id: 1,
    subject: "English",
    question: "Which of the following is a synonym for 'ephemeral'?",
    options: ["Eternal", "Transient", "Strong", "Beautiful"],
    correctAnswer: "Transient",
  },
  {
    id: 2,
    subject: "English",
    question: "Choose the correctly spelt word.",
    options: ["Embarassment", "Embarrassment", "Embarrasment", "Embarasment"],
    correctAnswer: "Embarrassment",
  },
  {
    id: 3,
    subject: "English",
    question: "In the sentence 'She quickly ran to the store,' what part of speech is 'quickly'?",
    options: ["Adjective", "Verb", "Noun", "Adverb"],
    correctAnswer: "Adverb",
  },
  {
    id: 4,
    subject: "English",
    question: "Which of these sentences is grammatically correct?",
    options: [
      "The dog wagged it's tail.",
      "They're going to the park.",
      "Your shoes are over their.",
      "Its a beautiful day.",
    ],
    correctAnswer: "They're going to the park.",
  },
   {
    id: 5,
    subject: "English",
    question: "Identify the figure of speech in the sentence: 'The wind whispered through the trees.'",
    options: ["Metaphor", "Simile", "Personification", "Hyperbole"],
    correctAnswer: "Personification",
  },

  // Mathematics
  {
    id: 6,
    subject: "Mathematics",
    question: "What is the value of x if 2x + 5 = 15?",
    options: ["5", "10", "7.5", "2.5"],
    correctAnswer: "5",
  },
  {
    id: 7,
    subject: "Mathematics",
    question: "What is the area of a circle with a radius of 7cm? (Use π ≈ 22/7)",
    options: ["44 cm²", "154 cm²", "49 cm²", "144 cm²"],
    correctAnswer: "154 cm²",
  },
  {
    id: 8,
    subject: "Mathematics",
    question: "Find the next number in the sequence: 2, 5, 10, 17, ...",
    options: ["24", "25", "26", "27"],
    correctAnswer: "26",
  },
  {
    id: 9,
    subject: "Mathematics",
    question: "The sum of angles in a triangle is always:",
    options: ["90 degrees", "180 degrees", "270 degrees", "360 degrees"],
    correctAnswer: "180 degrees",
  },
  {
    id: 10,
    subject: "Mathematics",
    question: "What is 15% of 300?",
    options: ["15", "30", "45", "60"],
    correctAnswer: "45",
  },
  
  // Biology
  {
    id: 11,
    subject: "Biology",
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Ribosome", "Mitochondrion", "Cell Membrane"],
    correctAnswer: "Mitochondrion",
  },
  {
    id: 12,
    subject: "Biology",
    question: "Photosynthesis primarily occurs in which part of a plant?",
    options: ["Roots", "Stem", "Flowers", "Leaves"],
    correctAnswer: "Leaves",
  },
  {
    id: 13,
    subject: "Biology",
    question: "Which of these is NOT a component of blood?",
    options: ["Plasma", "Red Blood Cells", "White Blood Cells", "Synapse"],
    correctAnswer: "Synapse",
  },

  // Chemistry
  {
    id: 14,
    subject: "Chemistry",
    question: "What is the chemical symbol for Gold?",
    options: ["Ag", "Au", "Go", "Gd"],
    correctAnswer: "Au",
  },
  {
    id: 15,
    subject: "Chemistry",
    question: "The pH of a neutral solution is:",
    options: ["0", "7", "14", "1"],
    correctAnswer: "7",
  },
   {
    id: 16,
    subject: "Chemistry",
    question: "Which gas is most abundant in the Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
    correctAnswer: "Nitrogen",
  },

  // Physics
  {
    id: 17,
    subject: "Physics",
    question: "What is the unit of electric current?",
    options: ["Volt", "Watt", "Ohm", "Ampere"],
    correctAnswer: "Ampere",
  },
  {
    id: 18,
    subject: "Physics",
    question: "Which law of motion states that for every action, there is an equal and opposite reaction?",
    options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Gravitation"],
    correctAnswer: "Newton's Third Law",
  },

  // Current Affairs
  {
    id: 19,
    subject: "Current Affairs",
    question: "Who is the current President of Nigeria (as of 2024)?",
    options: ["Goodluck Jonathan", "Muhammadu Buhari", "Bola Ahmed Tinubu", "Olusegun Obasanjo"],
    correctAnswer: "Bola Ahmed Tinubu",
  },
  {
    id: 20,
    subject: "Current Affairs",
    question: "Which of these cities is the capital of Nigeria?",
    options: ["Lagos", "Kano", "Port Harcourt", "Abuja"],
    correctAnswer: "Abuja",
  }
];
