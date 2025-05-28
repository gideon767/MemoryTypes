// const { handle } = require("express/lib/application")

const questions = [
    {
        question: "What is the primary function of the computer memory?",
        answers: [
            {text: "To display graphics on the screen", correct: false},
            {text: "To store, retrieve and process data for the CPU", correct: true},
            {text: "To supply power to the motherboard", correct: false},
        ]
    },
    {
       question: "Which type of memory is volatile?",
        answers: [
            {text: "ROM", correct: false},
            {text: "SSD", correct: false},
            {text: "RAM", correct: true},
        ] 
    },
    {
       question: "What is the compositon of the RAM?",
        answers: [
            {text: "Magnetic platters and read/write heads", correct: false},
            {text: "Capacitors and transistors arranged in a grid", correct: true},
            {text: "Floating-gate transistors", correct: false},
        ] 
    },
    {
        question: "Which memory type is used for firmware storage?",
        answers: [
            {text: "DRAM", correct: false},
            {text: "ROM", correct: true},
            {text: "Cache", correct: false},
        ]
    },
    {
        question: "What is the main disadvantage of volatile memory?",
        answers: [
            {text: "High cost per GB", correct: false},
            {text: "Slow read/write speeds", correct: false},
            {text: "Date loss when power is off", correct: true},
        ]
    },
    {
        question: "Which memory type is fastest but most expensive?",
        answers: [
            {text: "SRAM (used in cache)", correct: true},
            {text: "HDD", correct: false},
            {text: "DDR4 RAM", correct: false},
        ]
    },
    {
        question: "What is the purpose of cache memory?",
        answers: [
            {text: "To permanently store system files", correct: false},
            {text: "To extend RAM capacity using secondary storage", correct: false},
            {text: "To act as a buffer between CPU and RAM for faster access", correct: true},
        ]
    },
    {
        question: "Which of these is a type of ROM?",
        answers: [
            {text: "EPROM", correct: true},
            {text: "DRAM", correct: false},
            {text: "PROM", correct: false},
        ]
    },
    {
        question: "What is virtual memomry?",
        answers: [
            {text: "A technique to use SSD/HDD space as RAM", correct: true},
            {text: "A type of cloud storage", correct: false},
            {text: "A hardware component inside the CPU", correct: false},
        ]
    },
    {
        question: "Which flash memory type stores 3 bits per cell?",
        answers: [
            {text: "SLC", correct: false},
            {text: "MLC", correct: false},
            {text: "TLC", correct: true},
        ]
    },
    {
        question: "What is the key disadvantage of flash memory?",
        answers: [
            {text: "Requires constant power to retain data", correct: false},
            {text: "Limited write/erase cycles", correct: true},
            {text: "Slow access speeds", correct: false},
        ]
    },
    {
        question: "Which memory type is non-volatile and used in SSDs?",
        answers: [
            {text: "DRAM", correct: false},
            {text: "NAND flash", correct: true},
            {text: "SRAM", correct: false},
        ]
    },
    {
        question: "What is the correct hierarchy of memory from fastest to slowest?",
        answers: [
            {text: "HDD > RAM > Cache > Registers", correct: false},
            {text: "Cache > Registers > RAM > SSD", correct: false},
            {text: "Registers > Cache > RAM > SSD", correct: true},
        ]
    },
    {
        question: "Which tool can diagnose RAM errors?",
        answers: [
            {text: "CrystalDiskInfo", correct: false},
            {text: "MemTest86", correct: true},
            {text: "BIOS Setup", correct: false},
        ]
    },
    {
        question: "What causes 'thrashing' in virtual memmory?",
        answers: [
            {text: "Frequent swapping of data between RAM and disk", correct: true},
            {text: "Corrupted ROM firmware", correct: false},
            {text: "Excessive CPU heat", correct: false},
        ]
    },
]

const questionElement = document.querySelector("#question")
const answerButton = document.querySelector("#answer-buttons")
const nextButton = document.querySelector("#next-btn")

let currentQuestionIndex = 0
let score = 0

const startQuiz = ()=> {
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
}

const showQuestion = ()=> {
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButton.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}

const resetState = ()=> {
    nextButton.style.display = "none"
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }
}

const selectAnswer = (e)=> {
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if (isCorrect) {
        selectedBtn.classList.add("correct")
        score++
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true
    })
    nextButton.style.display = "block"
}

const showScore = ()=> {
    resetState()
    questionElement.innerHTML = `You scored ${score} out of 
    ${questions.length}`
    if (score < 8) {
        questionElement.innerHTML = `<strong>Eeeii Koo, Wa hwe Ase!😂</strong> <br> You scored ${score} out of 
        ${questions.length}
        <br>
        <a href="pdf/MEMORY TYPES.docx" download="MEMORY TYPES">
        Download Presentation <small>NOTES</small></a>` 
    } else if (score < 11) {
        questionElement.innerHTML = `<strong> Oh nice!😎 <br></strong> You scored ${score} out of 
        ${questions.length}
        <br>
        <a href="pdf/MEMORY TYPES.docx" download="MEMORY TYPES">
        Download Presentation <small>NOTES</small></a>`
    } else {
        questionElement.innerHTML = `<strong> You do all!🎉🎊</strong> <br> You scored ${score} out of 
        ${questions.length}
        <br>
        <a href="pdf/MEMORY TYPES.docx" download="MEMORY TYPES">
        Download Presentation <small>NOTES</small></a>`
    }
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

const handleNextButton = ()=> {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
}

nextButton.addEventListener("click", ()=> {
    if (currentQuestionIndex < questions.length) {
        handleNextButton()
    } else {
        startQuiz()
    }
})


startQuiz()