let choices = document.querySelectorAll(".choice");
let msg = document.querySelector(".msg");
let userscorepara = document.querySelector("#Yourscore");
let compscorepara = document.querySelector("#Computerscore");

async function playgame(userchoice) {
    const response = await fetch("http://localhost:3000/play", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ move: userchoice })
    });

    const data = await response.json();

    if (data.result === "draw") {
        msg.innerText = "Game Draw! Try again!";
    } else if (data.result === "win") {
        msg.innerText = `You win! ${data.userchoice} beats ${data.compchoice}`;
    } else {
        msg.innerText = `You lose! ${data.compchoice} beats ${data.userchoice}`;
    }

    userscorepara.innerText = data.userscore;
    compscorepara.innerText = data.compscore;
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userchoice = choice.id;
        playgame(userchoice);
    });
});