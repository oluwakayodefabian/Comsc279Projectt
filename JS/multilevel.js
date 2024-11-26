function simulateMultilevelQueue() {
    // Get inputs
    const systemInput = document.getElementById("system-queue").value;
    const interactiveInput = document.getElementById("interactive-queue").value;
    const batchInput = document.getElementById("batch-queue").value;

    // Parse burst times
    const systemQueue = systemInput.split(',').map(Number).filter(n => !isNaN(n));
    const interactiveQueue = interactiveInput.split(',').map(Number).filter(n => !isNaN(n));
    const batchQueue = batchInput.split(',').map(Number).filter(n => !isNaN(n));

    // Validate inputs
    if (systemQueue.length === 0 && interactiveQueue.length === 0 && batchQueue.length === 0) {
        document.getElementById("mlq-result").innerText = "Please enter valid burst times for at least one queue.";
        return;
    }

    // Initialize result with headers
    let result = "Process    Queue          Burst Time   Waiting Time   Turnaround Time\n";
    result += "---------------------------------------------------------------\n";

    // Simulate scheduling for each queue
    const queues = [
        { name: "System", processes: systemQueue },
        { name: "Interactive", processes: interactiveQueue },
        { name: "Batch", processes: batchQueue }
    ];

    let currentTime = 0;
    queues.forEach(queue => {
        let waitingTime = 0;
        queue.processes.forEach((burst, index) => {
            const turnaroundTime = waitingTime + burst;
            result += `P${index + 1}        ${queue.name.padEnd(12)}  ${String(burst).padStart(10)}   ${String(waitingTime).padStart(13)}   ${String(turnaroundTime).padStart(16)}\n`;
            currentTime += burst;
            waitingTime += burst;
        });
    });

    // Display result
    document.getElementById("mlq-result").innerText = result;
}
