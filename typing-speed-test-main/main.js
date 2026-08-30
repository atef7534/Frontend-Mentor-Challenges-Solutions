// DOM Elements
const startTypingBtn = document.querySelector(".start-typing-btn");
const restartTestBtn = document.querySelector(".restart-test-btn");
const beatScoreBtn = document.getElementById('beat-score-btn');
const testCompleteEl = document.getElementById('test-complete');
const screenOneEl = document.getElementById('screen-1')
const textEl = document.getElementById("text");
const leaveTestEl = document.getElementById("leave-test");
const typingEl = document.getElementById("typing");
const highestWpmEl = document.querySelector(".highest-wpm");
const currentWpmEl = document.querySelector(".current-wpm");
const accuracyEl = document.querySelector(".accuracy");
const timeEl = document.querySelector(".time");
const wpmStatsValue = document.querySelector('.wpm-stats-value')
const accuracyStatsValue = document.querySelector('.accuracy-stats-value')
const characterStatsValueC = document.querySelector('.characters-stats-value-c')
const characterStatsValueW = document.querySelector('.characters-stats-value-w')
const celebrainIcon = document.querySelector('.celebration-icon')

const levelsBtns = [
    ...document.querySelectorAll(".difficulty .levels > button")
];

const modeBtns = [
    ...document.querySelectorAll(".mode .levels > button")
];


// Game State
let startGameTime;
let gameTimer;
let currentPosition = 0;

let mode = getActiveButton(modeBtns);
let difficulty = getActiveButton(levelsBtns);

const typingDetails = loadTypingDetails();


// Initialize Game
initializeGame();


// Initialization
function initializeGame() {
    displayBestScore();
    setupEventListeners();
}


// Event Listeners
function setupEventListeners() {
    startTypingBtn.addEventListener("click", startGame);

    beatScoreBtn.addEventListener("click", () => {
        testCompleteEl.classList.add('hide');
        screenOneEl.classList.remove('hide');
        restartGame();
    });

    restartTestBtn.addEventListener("click", restartGame);

    typingEl.addEventListener("click", focusHiddenInput);

    setupSelectionButtons(levelsBtns, "difficulty");
    setupSelectionButtons(modeBtns, "mode");
}


// Local Storage
function loadTypingDetails() {
    const savedDetails = JSON.parse(
        localStorage.getItem("typing-details")
    );

    if (savedDetails) {
        return savedDetails;
    }

    const defaultDetails = {
        best_score: 0,
        average_accuracy: 100
    };

    saveTypingDetails(defaultDetails);

    return defaultDetails;
}


function saveTypingDetails(details) {
    localStorage.setItem(
        "typing-details",
        JSON.stringify(details)
    );
}


function displayBestScore() {
    highestWpmEl.textContent = typingDetails.best_score;
}


// Start Game
async function startGame() {
    resetGameState();
    updateStartUI();

    const passage = await getRandomPassage();

    renderPassage(passage);

    startGameTime = Date.now();

    startTimer(passage);
}


// Get Passage
async function getRandomPassage() {
    const response = await fetch("./data.json");
    const data = await response.json();

    const level = data[difficulty.toLowerCase()];

    const randomIndex = Math.floor(
        Math.random() * level.length
    );

    return level[randomIndex].text;
}


// Render Passage
function renderPassage(passage) {
    const hiddenInput = createHiddenInput();

    const letterSpans = createSpanEls(
        passage,
        hiddenInput
    );

    textEl.innerHTML = "";

    textEl.append(hiddenInput);
    textEl.append(...letterSpans);

    hiddenInput.focus();

    letterSpans[0].classList.add("active");

    hiddenInput.addEventListener("input", function (event) {
        handleInput(
            event,
            passage,
            letterSpans
        );
    });
}


// Create Hidden Input
function createHiddenInput() {
    const input = document.createElement("input");

    input.className = "hidden-input";
    input.value = "";

    return input;
}


// Create Letter Elements
function createSpanEls(passage, hiddenInput) {
    return [...passage].map(letter => {
        const span = document.createElement("span");

        span.className = "letter";
        span.textContent = letter;

        span.addEventListener("click", function () {
            hiddenInput.focus();
        });

        return span;
    });
}


// Handle User Input
function handleInput(
    event,
    passage,
    letterSpans
) {
    if (isGameFinished(passage)) {
        return;
    }

    if (isBackspace(event)) {
        handleBackspace(letterSpans);
        updateStats();

        return;
    }

    handleTypedCharacter(
        event.data,
        passage,
        letterSpans
    );

    updateStats();

    if (isGameFinished(passage)) {
        finishGame();
    }
}


// Handle Typed Character
function handleTypedCharacter(
    typedLetter,
    passage,
    letterSpans
) {
    const currentLetter = passage[currentPosition];

    const result =
        typedLetter === currentLetter
            ? "correct"
            : "wrong";

    letterSpans[currentPosition]
        .classList
        .remove("active");

    letterSpans[currentPosition]
        .classList
        .add(result);

    currentPosition++;

    activateNextLetter(
        letterSpans,
        passage
    );
}


// Activate Next Letter
function activateNextLetter(
    letterSpans,
    passage
) {
    if (currentPosition < passage.length) {
        letterSpans[currentPosition]
            .classList
            .add("active");
    }
}


// Handle Backspace
function handleBackspace(letterSpans) {
    if (currentPosition === 0) {
        return;
    }

    letterSpans[currentPosition]
        .classList
        .remove("active");

    currentPosition--;

    letterSpans[currentPosition]
        .classList
        .remove(
            "correct",
            "wrong"
        );

    letterSpans[currentPosition]
        .classList
        .add("active");
}


// Game Statistics
function updateStats() {
    const elapsedTime = getElapsedTime();

    const correctCharacters =
        document.querySelectorAll(".correct").length;

    const attemptedCharacters = currentPosition;

    updateWpm(
        correctCharacters,
        elapsedTime
    );

    updateAccuracy(
        correctCharacters,
        attemptedCharacters
    );
}


function getElapsedTime() {
    return Math.floor(
        (Date.now() - startGameTime) / 1000
    );
}


function updateWpm(
    correctCharacters,
    elapsedTime
) {
    if (elapsedTime === 0) {
        return;
    }

    const wpm =
        (correctCharacters / 5) /
        (elapsedTime / 60);

    currentWpmEl.textContent = wpm.toFixed(2);
}


function updateAccuracy(
    correctCharacters,
    attemptedCharacters
) {
    if (attemptedCharacters === 0) {
        accuracyEl.textContent = "100%";
        return;
    }

    const accuracy =
        (correctCharacters / attemptedCharacters) * 100;

    accuracyEl.textContent =
        `${accuracy.toFixed(2)}%`;
}


// Timer
function startTimer(passage) {
    clearInterval(gameTimer);

    if (mode === "Timed (60s)") {
        startCountdownTimer(passage);
    } else {
        startCountUpTimer(passage);
    }
}


function startCountdownTimer(passage) {
    let remainingSeconds = 60;

    updateTimerDisplay(remainingSeconds);

    gameTimer = setInterval(() => {
        remainingSeconds--;

        updateTimerDisplay(
            remainingSeconds
        );

        if (
            remainingSeconds <= 0 ||
            isGameFinished(passage)
        ) {
            finishGame();
        }
    }, 1000);
}


function startCountUpTimer(passage) {
    let elapsedSeconds = 0;

    updateTimerDisplay(elapsedSeconds);

    gameTimer = setInterval(() => {
        elapsedSeconds++;

        updateTimerDisplay(
            elapsedSeconds
        );

        if (isGameFinished(passage)) {
            finishGame();
        }
    }, 1000);
}


function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    timeEl.textContent =
        `${String(minutes).padStart(2, "0")}:` +
        `${String(remainingSeconds).padStart(2, "0")}`;
}


function showNewResults() {
    setTimeout(() => {
        screenOneEl.classList.add('hide')
        testCompleteEl.classList.remove('hide')

        wpmStatsValue.textContent = currentWpmEl.textContent
        accuracyStatsValue.textContent = accuracyEl.textContent

        characterStatsValueC.textContent = document.querySelectorAll('.correct').length
        characterStatsValueW.textContent = document.querySelectorAll('.wrong').length

    }, 500)
}


// Finish Game
function finishGame() {
    clearInterval(gameTimer);

    const previousBestScore = typingDetails.best_score

    updateBestScore();

    const currentBestScore = typingDetails.best_score

    saveTypingDetails(typingDetails);

    displayBestScore();

    if (currentBestScore > previousBestScore) {
        const completedIcon = document.createElement('img')

        completedIcon.src = './assets/images/icon-new-pb.svg'
        completedIcon.alt = 'A new icon.'
        celebrainIcon.replaceChild(completedIcon, celebrainIcon.children[0])

        document.querySelector('.high-score-title').textContent = 'High Score Smashed!'
        document.querySelector('.congrats-sentence').textContent = "You're getting faster. That was incredible typing."

        document.querySelector('.confetti-img').classList.remove('hide')

        showNewResults();
    } else {
        const completedIcon = document.createElement('img')

        completedIcon.src = './assets/images/icon-completed.svg'
        completedIcon.alt = 'A completed SVG Icon.'
        celebrainIcon.replaceChild(completedIcon, celebrainIcon.children[0])

        document.querySelector('.high-score-title').textContent = 'Baseline Established!'
        document.querySelector('.congrats-sentence').textContent = "You've set the bar. Now the real challenge begins—time to beat it."

        document.querySelector('.confetti-img').classList.add('hide')

        const starImage = document.createElement('img')
        starImage.src = './assets/images/pattern-star-1.svg'
        starImage.className = 'star-position-1'

        const starImage2 = document.createElement('img')
        starImage2.src = './assets/images/pattern-star-2.svg'
        starImage2.className = 'star-position-2'

        testCompleteEl.append(starImage, starImage2)
        showNewResults();
    }
}


function updateBestScore() {
    const currentWpm =
        Number(currentWpmEl.textContent) || 0;

    typingDetails.best_score =
        Math.max(
            currentWpm,
            Number(typingDetails.best_score) || 0
        );
}


// Game State
function resetGameState() {
    clearInterval(gameTimer);

    currentPosition = 0;

    currentWpmEl.textContent = "0";
    accuracyEl.textContent = "100%";
    timeEl.textContent = "00:00";
}


function isGameFinished(passage) {
    return currentPosition >= passage.length;
}


// UI
function updateStartUI() {
    leaveTestEl.classList.add("hide");
    restartTestBtn.classList.remove("hide");
}


function restartGame() {
    clearInterval(gameTimer);

    leaveTestEl.classList.remove("hide");
    restartTestBtn.classList.add("hide");

    resetGameState();
}


// Difficulty & Mode Buttons
function setupSelectionButtons(
    buttons,
    type
) {
    buttons.forEach(button => {
        button.addEventListener(
            "click",
            function () {
                activateButton(
                    button,
                    buttons
                );

                updateGameSetting(
                    type,
                    button.textContent
                );
            }
        );
    });
}


function activateButton(
    button,
    buttons
) {
    clearActiveState(buttons);

    button.classList.add("active");
}


function clearActiveState(buttons) {
    buttons.forEach(button => {
        button.classList.remove("active");
    });
}


function updateGameSetting(
    type,
    value
) {
    if (type === "difficulty") {
        difficulty = value;
    }

    if (type === "mode") {
        mode = value;
    }
}


function getActiveButton(buttons) {
    const activeButton = buttons.find(
        button => button.classList.contains("active")
    );

    return activeButton
        ? activeButton.textContent
        : "";
}


// Helpers
function isBackspace(event) {
    return event.inputType === "deleteContentBackward";
}


function focusHiddenInput() {
    const hiddenInput =
        document.querySelector(".hidden-input");

    if (hiddenInput) {
        hiddenInput.focus();
    }
}