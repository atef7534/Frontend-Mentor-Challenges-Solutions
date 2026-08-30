# Frontend Mentor - Typing Speed Test Solution

This is my solution to the [Typing Speed Test challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test).

The project is a responsive typing speed test built with semantic HTML, CSS, and vanilla JavaScript. Users can choose a difficulty level and test mode, type a randomly selected passage, and see their WPM, accuracy, and elapsed time in real time.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

The goal of this challenge was to build a typing speed test application that closely follows the provided Frontend Mentor design while implementing the required interactions and responsive behavior.

Users should be able to:

- Start a typing test by clicking the start button or the passage.
- Select a difficulty level: Easy, Medium, or Hard.
- Switch between `Timed (60s)` and `Passage` modes.
- Restart the test and receive a new random passage.
- See WPM, accuracy, and time update while typing.
- Receive visual feedback for correct and incorrect characters.
- Use backspace to correct mistakes.
- View their personal best score.
- Keep their personal best score between sessions using `localStorage`.
- Use the interface comfortably across different screen sizes.

The passage data is stored in a local `data.json` file and is loaded dynamically based on the selected difficulty.

### Screenshot

![Typing Speed Test preview](./preview.jpg)

### Links

- **Solution / Repository:** [GitHub Repository](https://github.com/atef7534/Frontend-Mentor-Challenges-Solutions/tree/main/typing-speed-test-main)
- **Live Site:** [GitHub Pages](https://atef7534.github.io/Frontend-Mentor-Challenges-Solutions/typing-speed-test-main/)
- **Frontend Mentor Challenge:** [Typing Speed Test](https://www.frontendmentor.io/challenges/typing-speed-test)
- **Main Repository:** [Frontend Mentor Challenges Solutions](https://github.com/atef7534/Frontend-Mentor-Challenges-Solutions)

## My process

### Built with

- Semantic HTML5
- CSS3
- CSS custom properties
- Flexbox
- Responsive design with CSS media queries
- Vanilla JavaScript (ES6+)
- DOM manipulation
- Event listeners
- Fetch API
- Local JSON data
- Browser `localStorage`
- JavaScript timers with `setInterval()`

### What I learned

This project gave me practical experience with DOM manipulation and handling a more interactive JavaScript application.

#### Working with the DOM

I created and updated elements dynamically instead of keeping every character of the typing passage directly in the HTML.

For example, each character is represented by a `<span>` element so its state can be updated while the user is typing:

```js
const span = document.createElement("span");

span.className = "letter";
span.textContent = letter;
```

This made it possible to apply different states such as `correct`, `wrong`, and `active`.

#### Handling keyboard input

I learned how to use the `input` event and `InputEvent` properties to determine what the user typed and when they pressed backspace.

```js
hiddenInput.addEventListener("input", function (event) {
    handleInput(event, passage, letterSpans);
});
```

#### Calculating WPM and accuracy

The application calculates WPM from the number of correct characters and the elapsed time:

```js
const wpm =
    (correctCharacters / 5) /
    (elapsedTime / 60);
```

Accuracy is calculated from the number of correct characters compared with the number of attempted characters.

#### Working with timers

The application supports both a 60-second countdown and a passage mode with a count-up timer. I practiced using `setInterval()` and stopping timers with `clearInterval()` when the test finishes.

#### Using localStorage

The personal best score is stored in the browser so it remains available after refreshing or reopening the page:

```js
localStorage.setItem(
    "typing-details",
    JSON.stringify(details)
);
```

#### Organizing JavaScript into functions

As the project became more complex, I focused on separating responsibilities into small functions such as:

- `startGame()`
- `getRandomPassage()`
- `renderPassage()`
- `handleInput()`
- `handleBackspace()`
- `updateStats()`
- `startTimer()`
- `finishGame()`
- `restartGame()`

This made the code easier to read, debug, and modify.

### Continued development

There are several areas I would like to improve in future versions:

- Add more typing modes and customizable test durations.
- Improve keyboard accessibility and focus management.
- Add more detailed performance statistics.
- Track typing history instead of only the personal best.
- Improve the result screen with additional performance insights.
- Add more passage categories.
- Further optimize the JavaScript structure as the application grows.
- Add automated tests for the typing logic and score calculations.

### Useful resources

- [Frontend Mentor - Typing Speed Test](https://www.frontendmentor.io/challenges/typing-speed-test) - The original challenge, design, requirements, and provided assets.
- [MDN - Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) - Useful reference for DOM manipulation.
- [MDN - EventTarget.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) - Helped with handling user interactions.
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - Reference for loading the local passage data.
- [MDN - Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - Reference for storing the personal best score.
- [MDN - setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval) - Reference for implementing the typing timers.

### AI Collaboration

I used ChatGPT as a development assistant during this project.

I mainly used AI to:

- Debug JavaScript issues.
- Review and improve the organization of the code.
- Refactor large sections into smaller functions.
- Clarify JavaScript DOM APIs such as `replaceChild()` and `removeChild()`.
- Discuss possible approaches for implementing interactive UI components.
- Improve code readability and maintainability.

AI was used as a support and learning tool rather than as a replacement for understanding the implementation. I reviewed the suggestions, adapted them to the project, and tested the resulting code.

## Author

- GitHub - [@atef7534](https://github.com/atef7534)
- Frontend Mentor - [@atef7534](https://www.frontendmentor.io/profile/atef7534)

## Acknowledgments

- [Frontend Mentor](https://www.frontendmentor.io/) for providing the challenge, design, and starter assets.
- The Frontend Mentor community for providing a great environment for practicing real-world frontend development.
