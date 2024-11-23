import { evaluate } from "mathjs";

export function randomNum(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min));
}

function factors(n: number) {
  var num_factors = [],
    i;
  for (i = 1; i <= Math.floor(Math.sqrt(n)); i += 1) {
    if (n % i === 0) {
      num_factors.push(i);
      if (n / i !== i) num_factors.push(n / i);
    }
  }

  num_factors.sort(function (x, y) {
    return x - y;
  });

  return num_factors;
}

export const levelToFunctions = [levelOne, levelTwo, levelThree, levelFour, levelFive];

type LevelData = {
  answer: string;
  answer2?: string;
  question: string;
};

export function levelOne(): LevelData {
  //Generates the problem and answer for a 2digit addition or subtraction question
  let symbols = ["+", "-"]; // array for symbols
  let a = randomNum(1, 100); // first random 1-2 digit number
  let symbol = symbols[randomNum(0, 1)]; // random symbol (addition or subtraction)
  let b = randomNum(1, 100); // second random 1-2 digit number
  let problemPrint = `${a} ${symbol} ${b}`; // A printable version of the question for the user
  let problemAnswer = 0;
  if ((symbol = "+")) {
    // problemAnswer is defined as the answer to the question in problemPrint
    problemAnswer = a + b;
  } else {
    problemAnswer = a - b;
  }

  return {
    // Returns the answer and printable question
    answer: problemAnswer.toString(),
    question: problemPrint,
  };
}

export function levelTwo(): LevelData {
  //Generates the problem and answer for a 2digit multiplication or division question
  let symbols = ["x", "/"]; // array for symbols
  let a = randomNum(1, 100); // first random 1-2 digit number
  let symbol = symbols[randomNum(0, 1)]; // random symbol (multiplication or division)
  let b2 = 0;
  let problemPrint2 = "p";
  let problemAnswer2 = 0;
  if ((symbol = "x")) {
    // if multiplication multiply 1-25 x 1-25
    b2 = randomNum(1, 25);
    problemPrint2 = `${a} ${symbol} ${b2}`; // A printable version of the question for the user
    problemAnswer2 = a * b2;
  } else {
    // if division divide 1-25 by a factor (answer will not be a decimal)
    b2 = factors(a)[randomNum(0, factors(a).length - 1)];
    problemPrint2 = `${a} ${symbol} ${b2}`; // A printable version of the question for the user
    problemAnswer2 = a / b2;
  }

  return {
    // Returns the answer and printable question
    answer: problemAnswer2.toString(),
    question: problemPrint2,
  };
}

enum Operation {
  Addition,
  Subtraction,
  Multiplication,
  Division,
}

function operator(operation: Operation, a: number, b: number) {
  switch (operation) {
    case Operation.Addition:
      return a + b;
    case Operation.Subtraction:
      return a - b;
    case Operation.Multiplication:
      return a * b;
    case Operation.Division:
      return a / b;
  }
}

export function levelThree(): LevelData {
  // generates and provides answer for a randomly generated bedmas problem
  let problem = [],
    i;
  let symbols = ["+", "-", "*", "-"];
  let setsymbols = [symbols[randomNum(0, 3)], symbols[randomNum(0, 3)], symbols[randomNum(0, 3)], symbols[randomNum(0, 3)]]; // 4 random symbols
  let numbers = [randomNum(1, 20), randomNum(1, 20), randomNum(1, 20), randomNum(1, 20), randomNum(1, 20)]; // 5 random numbers
  for (i = 0; i <= 3; i += 1) {
    // pushes all numbers and symbols onto one string
    problem.push(`${numbers[i]} ${setsymbols[i]}`);
  }
  problem.push(`${numbers[4]}`);
  let problemAnswer = evaluate(problem.join(" ")) as number; // solves the string

  return {
    // returns string for question and answer
    question: problem.join(" "),
    answer: problemAnswer.toString(),
  };
}

export function levelFour(): LevelData {
  let questionType = randomNum(1, 3);
  let Question = "";
  let ListAnswer: string[] = [];
  let Answer = "";
  let Answer2 = "";
  if (questionType == 1) {
    // difference of squares
    let num = randomNum(1, 10);
    Question = `x^2 - ${num ** 2}`;
    Answer = `(x+${num})(x-${num})`;
    Answer2 = `(x-${num})(x+${num})`;
  } else if (questionType == 2) {
    // perfect square trinomial
    let num = randomNum(1, 10);
    Question = `x^2 - ${2 * num} + ${num ** 2}`;
    Answer = `(x-${num})^2`;
  }

  return {
    answer: Answer,
    answer2: Answer2,
    question: Question,
  };
}

export function levelFive(): LevelData {
  let num = randomNum(1, 10);
  let question = `1x^2 - ${2 * num} + ${num ** 2}`;
  let answer = quadraticSolver(1, 2 * num, num ** 2);
  return {
    question: question,
    answer: answer.join(" "),
  };
}

export function quadraticSolver(a: number, b: number, c: number) {
  const discriminator = b ** 2 - 4 * a * c;

  if (Math.sign(discriminator) == -1) return []; // No solution

  const discriminate = Math.sqrt(discriminator);
  const denominator = 2 * a;

  const solution1 = (-b - discriminate) / denominator;
  const solution2 = (-b + discriminate) / denominator;

  return [solution1, solution2];
}

export function stepbystep(problem: string) {
  let numbers: number[] = [];
  let operators: string[] = [];
  let stepResults: string[] = [problem]; // To store each step's result
  let steps = problem.split(" ");

  for (const step of steps) {
    if (["+", "-", "*", "/"].includes(step)) {
      operators.push(step);
    } else {
      numbers.push(Number(step));
    }
  }

  function formatting() {
    let expression = "";
    for (let i = 0; i < operators.length; i++) {
      expression += numbers[i] + " " + operators[i] + " ";
    }
    expression += numbers[numbers.length - 1];
    return expression;
  }

  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === "*" || operators[i] === "/") {
      let result: number;
      if (operators[i] === "*") {
        result = numbers[i] * numbers[i + 1];
      } else {
        result = numbers[i] / numbers[i + 1];
      }

      numbers[i] = result;
      numbers.splice(i + 1, 1);
      operators.splice(i, 1);

      stepResults.push(formatting());
      i--;
    }
  }

  for (let i = 0; i < operators.length; i++) {
    let result: number;
    if (operators[i] === "+") {
      result = numbers[i] + numbers[i + 1];
    } else {
      result = numbers[i] - numbers[i + 1];
    }

    numbers[i] = result;
    numbers.splice(i + 1, 1);
    operators.splice(i, 1);

    stepResults.push(formatting());
    i--;
  }

  stepResults.push(`Final result: ${numbers[0]}`);

  return stepResults;
}
