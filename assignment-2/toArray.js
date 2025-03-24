
const numbers = process.argv.slice(2);
const evenNumbers = [];

// Add even numbers to the array
numbers.forEach(num => {
    const number = parseInt(num);
    if (!isNaN(number) && number % 2 === 0) {
        evenNumbers.push(number);
    }
});

console.log(`Array size: ${evenNumbers.length}`);
console.log('Array:', evenNumbers);
