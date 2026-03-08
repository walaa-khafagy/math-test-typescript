# Math Test App

A simple browser-based math quiz built with **HTML, TypeScript, and JSON**.

## Features

- Login system using a local `data.json` file
- Maximum **3 failed login attempts**
- After login, user chooses **number of questions (1–10)**
- Random math problems generated using:
  - Addition (+)
  - Subtraction (-)
  - Multiplication (*)
  - Division (/)
- Input field for each answer
- Score displayed as **X / Total Questions**

## How It Works

1. User logs in using credentials stored in `data.json`.
2. After successful login, the user selects how many math questions to generate.
3. The app randomly creates math problems.
4. User submits answers.
5. The app calculates and displays the final score.

## Project Structure
project-folder
│
├── index.html
├── app.ts
├── app.js
├── style.css
├── data.json
└── README.md

## Example Login
email: walaa@example.com
password: 1234

## Live Page
A hosted version of the project is available here:

[https://walaa-khafagy.github.io/math-test-typescript/]