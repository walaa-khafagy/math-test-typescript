type User = {
    email: string;
    password: string;
};

let users: User[] = [];
let failedAttempts = 0;

async function loadData() {
    const response = await fetch("./data.json");

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    users = await response.json();
}

loadData();

document.getElementById("loginForm")?.addEventListener("submit", function (event) {
    event.preventDefault();



    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (user) {
        alert("Login successful");
        const name = user.email.split("@")[0];
        const box = document.getElementById("loginFormBox");
        if (box) {
            box.innerHTML = `<h2>Welcome ${name}</h2>`;
        }
        startTest();
    } else {
        failedAttempts++;
        alert(`Invalid credentials. Attempts left: ${3 - failedAttempts}`);
    }

    if (failedAttempts >= 3) {
        alert("You are locked out. Refresh the page and try again.");
        (document.getElementById("submit") as HTMLButtonElement).disabled = true;
        return;
    }
});

function startTest() {


    const numberOfQs = document.querySelector(".numberOfQs") as HTMLElement;


    const label = document.createElement("label");
    label.textContent = "Enter a number from 1 to 10:";

    const input = document.createElement("input");
    input.type = "number";
    input.min = "1";
    input.max = "10";
    input.id = "numQs";

    const button = document.createElement("button");
    button.textContent = "Submit";

    numberOfQs.append(label, input, button);

    button.addEventListener("click", () => {
        const value: number = Number(input.value);

        if (!input.value || value < 1 || value > 10) {
            alert("Enter a number between 1 and 10");
            return;
        }
        button.disabled = true;
        generateProblems(value);

    });

}


function generateProblems(count: number) {

    const test = document.querySelector(".test") as HTMLElement;

    const ops = ["+", "-", "*", "/"];
    const answers: number[] = [];

    const form = document.createElement("div");

    for (let i = 0; i < count; i++) {
        const a = Math.floor(Math.random() * 1000) + 1;
        let b = Math.floor(Math.random() * 1000) + 1;
        const op = ops[Math.floor(Math.random() * ops.length)];

        let correct = 0;

        if ( op === "/" && b === 0 ) b = 1;

        switch (op) {
            case "+": correct = a + b; break;
            case "-": correct = a - b; break;
            case "*": correct = a * b; break;
            case "/": correct = +(a / b).toFixed(2); break;
        }

        answers.push(correct);

        const row = document.createElement("div");

        const label = document.createElement("span");
        label.textContent = `${a} ${op} ${b} = `;

        const input = document.createElement("input");
        input.type = "number";

        row.append(label, input);
        form.appendChild(row);
    }

    const submit = document.createElement("button");
    submit.textContent = "Check Score";

    form.appendChild(submit);

    test.appendChild(form);

    submit.addEventListener("click", () => {
        const inputs = form.querySelectorAll("input");
        let score = 0;

        inputs.forEach((inp, i) => {
            const val = Number((inp as HTMLInputElement).value);
            if (val === answers[i]) score++;
        });

        const result = document.createElement("h3");
        result.textContent = `Score: ${score}/${count}`;

        test.appendChild(result);
        submit.disabled = true;
    });
}