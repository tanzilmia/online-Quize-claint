let myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Shuffle the array using a random comparator function
myArray.sort(() => Math.random() - 0.5);

// Select the first 5 elements of the shuffled array
let randomFive = myArray.slice(0, 5);
console.log(randomFive)