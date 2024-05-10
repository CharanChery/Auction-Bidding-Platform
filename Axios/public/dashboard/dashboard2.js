let currentDate = new Date();
console.log(currentDate);

console.log(currentDate.toTimeString());

currentDate.setMinutes(currentDate.getMinutes() + 3);
console.log(currentDate)
console.log(currentDate.toTimeString()); // Outputs the date in ISO format


