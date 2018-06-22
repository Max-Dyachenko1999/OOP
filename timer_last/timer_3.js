let timeouts = [];
let timeoutsIndex = 0;

function deleteTimeout(id) {
    if (!id.which) {
        let alarm = document.querySelector("div[timeout-id=" + id + "]");
        alarm.parentNode.removeChild(alarm);
        clearTimeout(timeouts[id]);
    } else {
        let alarm = this.parentNode;
        alarm.parentNode.removeChild(alarm);
        clearTimeout(timeouts[alarm.getAttribute("timeout-id")]);
    }
}

function enableOrDisableTimeout(id) {
    let button;
    let date;
    if (!id.which) {
        button = document.querySelector("div[timeout-id=" + id + "] button");
        date = document.querySelector("div[timeout-id=" + id + "] div").innerHTML;
    } else {
        button = this;
        date = this.parentNode.childNodes[0].innerHTML;
    }
    let type = button.innerHTML;
    if (type === "Вимкнути") {
        clearTimeout(timeouts[id]);
        button.innerHTML = "Увімкнути";
    } else {
        timeouts[id] = setTimeout(releaseTimeout.bind(timeoutsIndex++), new Date(date) - new Date());
        button.innerHTML = "Вимкнути";
    }
}

function releaseTimeout() {
    var start1 = Date.now(); // сохранить время начала

    var timer1 = setInterval(function () {
        // вычислить сколько времени прошло из opts.duration
        var timePassed1 = Date.now() - start1;
        if (timePassed1 % 2)
            document.getElementById('test').style.backgroundColor = 'white';
        else
            document.getElementById('test').style.backgroundColor = 'lightgrey';

        if (timePassed1 > 6005) clearInterval(timer1);

    }, 2);
    alert("Час вийшов!");
}

function addAlarm() {
    let date = document.getElementById("date").value + " " + document.getElementById("time").value;
    let newAlarm = document.createElement("DIV");
    newAlarm.innerHTML = "<div>" + date + "</div>";
    newAlarm.setAttribute("timeout-id", timeoutsIndex);
    let buttonDelete = document.createElement("BUTTON");
    buttonDelete.innerText = "Видалити";
    buttonDelete.addEventListener("click", deleteTimeout);
    let buttonDisable = document.createElement("BUTTON");
    buttonDisable.innerText = "Зупинити";
    buttonDisable.addEventListener("click", enableOrDisableTimeout);
    newAlarm.appendChild(buttonDisable);
    newAlarm.appendChild(buttonDelete);
    document.getElementById("alarms").appendChild(newAlarm);
    timeouts.push(setTimeout(releaseTimeout.bind(timeoutsIndex++), new Date(date) - new Date()));
}