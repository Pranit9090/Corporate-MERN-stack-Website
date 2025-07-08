// src/data/questions.js
export default {
  averages: [
    {
      text: "What is the average of 10, 20, and 30?",
      options: ["15", "20", "25", "30"],
      correct: "20",
      solution: "Sum = 60, Count = 3 → 60 / 3 = 20"
    },
    {
      text: "Find the average of first 5 odd numbers.",
      options: ["5", "7", "9", "3"],
      correct: "5",
      solution: "Numbers: 1, 3, 5, 7, 9 → Sum = 25 → Avg = 25/5 = 5"
    }
    // more questions...
  ],

  "profit-and-loss": [
    {
      text: "A man buys a toy for ₹100 and sells it for ₹120. Profit %?",
      options: ["10%", "20%", "25%", "30%"],
      correct: "20%",
      solution: "Profit = 20, Profit% = (20/100)*100 = 20%"
    }
    // more questions...
  ]
};
