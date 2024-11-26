function simulatePriority() {
    const input = document.getElementById("priority-processes").value;
    const processes = input.split(',').map(item => {
        const [burst, priority] = item.split(':').map(Number);
        return { burst, priority };
    });

    // Check for invalid input
    if (processes.some(p => isNaN(p.burst) || isNaN(p.priority))) {
        document.getElementById("priority-result").innerText = "Invalid input. Please enter burst times and priorities in the format 'burst:priority'.";
        return;
    }

    // Sort processes by priority (ascending order; higher priority = smaller number)
    processes.sort((a, b) => a.priority - b.priority);

    let waitingTime = 0;
    let turnaroundTime = 0;
    let result = "Process\tPriority\tBurst Time\tWaiting Time\tTurnaround Time\n";

    processes.forEach((process, index) => {
        const turnAround = waitingTime + process.burst;
        result += `P${index + 1}\t\t${process.priority}\t\t${process.burst}\t\t${waitingTime}\t\t${turnAround}\n`;
        waitingTime += process.burst;
        turnaroundTime += turnAround;
    });

    const avgTurnaroundTime = turnaroundTime / processes.length;
    result += `\nAverage Turnaround Time: ${avgTurnaroundTime.toFixed(2)} units`;
    document.getElementById("priority-result").innerText = result;
}