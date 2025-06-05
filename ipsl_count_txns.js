const fs = require('fs');
// Function to count transactions based on sender and receiver
function countTransactions(logFilePath, sender, receiver, ignoreUniqueness = 0) {
    // Read the log file
    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the log file:', err);
            return;
        }

        const lines = data.split('\n');
        let transactionCount = 0;
        const uniqueIDs = new Set(); // To ensure unique identifiers

        lines.forEach(line => {
            if (line.trim()) {
                const parts = line.split(',');
                const uniqueID = parts[0];

                // Check if the unique ID is already processed
                if (ignoreUniqueness === 1 || !uniqueIDs.has(uniqueID)) {
                    if (ignoreUniqueness === 0) {
                        uniqueIDs.add(uniqueID);
                    }

                    // Extract sender and receiver from the unique ID
                    const txnSender = uniqueID.substring(0, 4);
                    const txnReceiver = uniqueID.substring(4, 8);

                    // Count if it matches the given sender and receiver
                    if (txnSender === sender && txnReceiver === receiver) {
                        transactionCount++;
                    }
                }
            }
        });

        console.log(`Number of transactions from sender ${sender} to receiver ${receiver}: ${transactionCount}`);
    });
}

// Command line arguments: log file path, sender, receiver, disable uniqueness
const logFilePath = process.argv[2];
// console.log("LogFile"+logFilePath);
const sender = process.argv[3];
// console.log("Sender section "+sender);
const receiver = process.argv[4];
// console.log("Receiver section "+receiver);
const ignoreUniqueness = process.argv[5] ? parseInt(process.argv[5]) : 0; // Default to 0
// console.log("uniqueness section "+ignoreUniqueness);


// Validate input
if (!logFilePath || !sender || !receiver) {
    console.error('Usage: node script.js <logFilePath> <sender> <receiver> [ignoreUniqueness]');
    process.exit(1);
}

// Call the function with provided arguments
countTransactions(logFilePath, sender, receiver, ignoreUniqueness);
