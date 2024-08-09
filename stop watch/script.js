let startTime;
let updatedTime;
let difference;
let tInterval; 
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1000);
        running = true;
        startStopBtn.innerHTML = "Stop";
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.innerHTML = "Start";
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    display.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00";
    startStopBtn.innerHTML = "Start";
    laps = [];
    lapsList.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = display.innerHTML;
        laps.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.innerHTML = lapTime;
        lapsList.appendChild(lapItem);
    }
}
