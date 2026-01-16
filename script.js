//Object made for the first part of the project before using DOM
let user = {
    name: "",
    age: 0,
    role: "",
    status: false,
    hours: 0,
    score: 0
}

//Function made for the first part of the project before using DOM
function requestData() {
    user["name"] = prompt("What's your name?: ")
    user["age"] = verifyNumber("age")
    user["role"] = prompt("What's your rolen\nCoder, Tutor, Visitor?: ").toLowerCase()
    user["status"] = confirm("Do you accept the lab rules?: ")
    user["hours"] = verifyNumber("hours")
}

function verifyNumber(option) {
    let number
    if (option === "age") {
        number = prompt("What's your age?: ")
        if (isNaN(number)) {
            alert("Use only numbers")
            verifyNumber("age")
        }
        return Number(number)
    } else if (option === "hours") {
        number = prompt("How many hours will you be available today?: ")
        if (isNaN(number)) {
            alert("Use only numbers")
            verifyNumber("age")
        }
        return Number(number)
    }
}

function riskCalculation(user) {
    if (!user["score"]) {
        user["score"] = 0
    }
    if (user["labHours"] < 2) {
        user["score"]++
    }
    if (user.userRole === "visitor")  {
        user["score"]++
    }
    if (user["userAge"] >= 18 && user["userAge"] <= 20) {
        user["score"]++
    }
    if (user.userRole === "coder" && user["labHours"] >= 4) {
        user["score"]--
    }
    if (user["score"] < 0) {
        user["score"] = 0
    }
    return user
}

function finalDecision(user) {
    !user.confirmLab ? user["confirmLab"] = false : ""
    if (user["userAge"] < 18 || user["confirmLab"] === false || user.userRole === "visitor") {
        let text = "!Access Denied¡<br>"
        user["userAge"] < 18 ? text += "You're under 18<br>" : ""
        user["confirmLab"] === false ? text += "You didn't accept the lab rules<br>" : ""
        user.userRole === "visitor" ? text += "The role you selected is not valid" : ""
        return text
    } else if (user["score"] >= 2) {
        return "¡Under review!"
    } else {
        return "¡Access Granted!"
    }
}

document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    let data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    data = riskCalculation(data)

    if (document.body.childElementCount === 3) {
        const newDiv = document.createElement("div")
        newDiv.classList.add("messageContainer")
        const newH1 = document.createElement("h1")
        newH1.innerHTML = finalDecision(data)
        if (finalDecision(data) === "¡Under review!") {
            newH1.style.color = "orange"
            newDiv.style.borderColor = "orange"
        } else if (finalDecision(data) === "¡Access Granted!") {
            newH1.style.color = "green"
            newDiv.style.borderColor = "green"
            let myArray = JSON.parse(localStorage.getItem('previousCheckIns')) || [];
            myArray.push(data);
            localStorage.setItem('previousCheckIns', JSON.stringify(myArray));
        } else {
            newH1.style.color = "red"
            newDiv.style.borderColor = "red"
        }
        newDiv.append(newH1)
        newH1.id = "decision"
        document.body.appendChild(newDiv)
    } else {
        let message = document.getElementById("decision")
        message.textContent = finalDecision(data)
        if (finalDecision(data) === "¡Under review!") {
            message.style.color = "orange"
            message.parentElement.style.borderColor = "orange"
        } else if (finalDecision(data) === "¡Access Granted!") {
            message.style.color = "green"
            message.parentElement.style.borderColor = "green"
        } else {
            message.style.color = "red"
            message.parentElement.style.borderColor = "red"
        }
    }
});

