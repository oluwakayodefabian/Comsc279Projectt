function simulateSJF() {
    const input = document.getElementById("sjf-processes").value;
    const burstTimes = input.split(',').map(Number);

    if (burstTimes.some(isNaN)) {
        document.getElementById("sjf-result").innerText = "Invalid input. Please enter numeric burst times separated by commas.";
        return;
    }

    // Sort burst times in ascending order
    burstTimes.sort((a, b) => a - b);

    let waitingTime = 0;
    let turnaroundTime = 0;
    let result = "Process\tBurst Time\tWaiting Time\tTurnaround Time\n";

    burstTimes.forEach((burst, index) => {
        const turnAround = waitingTime + burst;
        result += `P${index + 1}\t\t${burst}\t\t${waitingTime}\t\t${turnAround}\n`;
        waitingTime += burst;
        turnaroundTime += turnAround;
    });

    const avgTurnaroundTime = turnaroundTime / burstTimes.length;
    result += `\nAverage Turnaround Time: ${avgTurnaroundTime.toFixed(2)} units`;
    document.getElementById("sjf-result").innerText = result;
}



