function simulateRoundRobin() {
    const burstInput = document.getElementById("rr-processes").value;
    const timeQuantum = parseInt(document.getElementById("time-quantum").value);

    const burstTimes = burstInput.split(',').map(Number);

    if (burstTimes.some(isNaN) || isNaN(timeQuantum) || timeQuantum <= 0) {
        document.getElementById("rr-result").innerText = 
            "Invalid input. Please enter numeric burst times separated by commas and a valid positive time quantum.";
        return;
    }

    const n = burstTimes.length;
    let remainingBurst = [...burstTimes];
    let completionTimes = new Array(n).fill(0);
    let waitingTimes = new Array(n).fill(0);
    let turnAroundTimes = new Array(n).fill(0);
    let currentTime = 0;
    let queue = [];

    // Add all processes to the queue initially
    for (let i = 0; i < n; i++) queue.push(i);

    while (queue.length > 0) {
        const process = queue.shift();
        const timeSpent = Math.min(timeQuantum, remainingBurst[process]);

        currentTime += timeSpent;
        remainingBurst[process] -= timeSpent;

        // Update waiting time for others in the queue
        queue.forEach(p => waitingTimes[p] += timeSpent);

        if (remainingBurst[process] > 0) {
            // Requeue unfinished process
            queue.push(process);
        } else {
            // Process finishes, note completion time
            completionTimes[process] = currentTime;
        }
    }

    // Calculate Turnaround Time
    let result = "Process\tBurst Time\tWaiting Time\tTurnaround Time\n";
    let totalWaitingTime = 0, totalTurnaroundTime = 0;

    for (let i = 0; i < n; i++) {
        turnAroundTimes[i] = completionTimes[i]; // Since AT = 0
        const waiting = turnAroundTimes[i] - burstTimes[i];
        totalWaitingTime += waiting;
        totalTurnaroundTime += turnAroundTimes[i];

        result += `P${i + 1}\t\t${burstTimes[i]}\t\t${waiting}\t\t${turnAroundTimes[i]}\n`;
    }

    const avgWaitingTime = (totalWaitingTime / n).toFixed(2);
    const avgTurnaroundTime = (totalTurnaroundTime / n).toFixed(2);

    result += `\nAverage Waiting Time: ${avgWaitingTime} units`;
    result += `\nAverage Turnaround Time: ${avgTurnaroundTime} units`;

    document.getElementById("rr-result").innerText = result;
}
