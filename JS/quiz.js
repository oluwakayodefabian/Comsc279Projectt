function checkAnswers() {
    const answers = {
        q1: "B",
        q2: "B",
        q3: "A",
        q4: "C",
        q5: "C"
    };

    let score = 0;
    let resultText = "";
    const form = document.getElementById("quiz-form");
    const userAnswers = new FormData(form);

    for (let question in answers) {
        const userAnswer = userAnswers.get(question);
        if (userAnswer === answers[question]) {
            score++;
            resultText += `<p>Question ${question[1]}: Correct ✅</p>`;
        } else {
            resultText += `<p>Question ${question[1]}: Incorrect ❌ (Correct Answer: ${answers[question]})</p>`;
        }
    }

    resultText = `<h2>Your Score: ${score}/5</h2>` + resultText;
    document.getElementById("result").innerHTML = resultText;
}
