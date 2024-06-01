console.log('Welcome to the fun factory!')
console.log('Let me tell you a programming joke!')


const jokes = [
    { joke: 0, question: "Why don't programmers like nature?", answer: "It has too many bugs." },
    { Joke: 1, question: "Why did the CSS developer go to therapy?", answer: "To get rid of his margins." },
    { Joke: 2, question: "How do you comfort a JavaScript developer?", answer: "You console them." },
    { Joke: 3, question: "Why did the CSS developer leave the restaurant?", answer: "Because it had no class." },
    { Joke: 4, question: "Why did the JavaScript developer go missing?", answer: "Because he didn't know when to return." },
    { Joke: 5, question: "Why did the HTML tag go to the party?", answer: "Because it wanted to break the line." },
    { Joke: 6, question: "Why do JavaScript developers wear glasses?", answer: "Because they don't C#." },
    { Joke: 7, question: "Why don't programmers like to use inline styles?", answer: "Because they want to be classy." },
    { Joke: 8, question: "Why did the CSS selector break up with the HTML element?", answer: "It found someone more specific." },
    { Joke: 9, question: "Why did the CSS developer apply for a job?", answer: "They wanted to get a position." },
];

function random(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}
/*
function random(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}
*/
let lastJokeIndex = -1;

function randomJoke() {
    let index;
    do {
        index = random(0, jokes.length - 1);
    } while (index === lastJokeIndex);

    const joke = jokes[index];
    console.log(`Joke #${index + 1}:\nQuestion: ${joke.question}\nAnswer: ${joke.answer}`);
    lastJokeIndex = index;
}

console.log()
randomJoke();
console.log()
randomJoke();
  

  
  
