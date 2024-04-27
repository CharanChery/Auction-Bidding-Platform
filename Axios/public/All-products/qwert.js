// Get the current date and time
const currentDate = new Date();
console.log(currentDate)
// // Add 2 days to the current date
console.log(currentDate.toLocaleString());


//      2024-04-27T06:30:00.000+00:00
const desiredDate = new Date("2024-04-26T20:34:00.000+00:00");
const localTime = desiredDate.toLocaleString();
console.log(localTime); // Output: 26/4/2024, 8:15:00 PM

// const futureDate = new Date(currentDate);
// futureDate.setDate(currentDate.getDate() + 2);

// // Set the time to 12:00 PM for the future date
// futureDate.setHours(12, 0, 0, 0);

// console.log(futureDate);
// console.log(futureDate.getHours());

// const deadlineDate = new Date("2024-10-02T06:30:00.000+00:00");
// console.log(deadlineDate.toLocaleString());
// // Current date and time (18th April 4:00 PM)


// // Calculate the difference between the current date/time and the deadline date/time
// const timeDifference = deadlineDate.getTime() - currentDate.getTime();

// // Convert the time difference to days, hours, and minutes
// const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
// //console.log(daysRemaining);
// const hoursRemaining = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// const minutesRemaining = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

// // Display the countdown
// console.log(`The bid ends in ${daysRemaining} days, ${hoursRemaining} hours ${minutesRemaining} minutes`);