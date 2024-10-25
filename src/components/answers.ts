import { getQuizKey } from "./quiz-config"

export interface Answer {
  questionId: string
  answerId: string
}

const QUIZ_KEY = getQuizKey() ?? ""

const resultButton = document.getElementById("result-button") as HTMLButtonElement
const answers = document.querySelectorAll("[data-answer-id]") as NodeListOf<HTMLElement>
const totalQuestions = document.querySelectorAll("[data-question-id]")?.length
const answersBlockCount = document.querySelectorAll("[data-answers-count]")
const answersBlockProgressBar = document.querySelector("[data-answers-progress-bar]") as HTMLElement
const answersBlockProgressBlock = document.querySelector(
  "[data-answers-progress-block]",
) as HTMLElement

function handleDisableButton(disable: boolean) {
  if (resultButton) resultButton.disabled = disable
}

function updateAnswersCount(count: number) {
  if (answersBlockCount.length > 0) {
    answersBlockCount.forEach(block => {
      block.innerHTML = count < 10 ? "0" + count : String(count)
    })
  }

  if (answersBlockProgressBar && answersBlockProgressBlock) {
    if (totalQuestions > 0) {
      const progressPercentage = (count / totalQuestions) * 100
      answersBlockProgressBar.style.height = `${progressPercentage}%`
      answersBlockProgressBlock.style.top = `${progressPercentage}%`
    }
  }
}

function saveAnswerToLocalStorage(questionId: string, answerId: string) {
  const existingAnswers = localStorage.getItem(QUIZ_KEY)
  let answers: Answer[] = existingAnswers ? JSON.parse(existingAnswers) : []

  const existingAnswerIndex = answers.findIndex(item => item.questionId === questionId)

  if (existingAnswerIndex !== -1) {
    answers[existingAnswerIndex].answerId = answerId
  } else {
    answers.push({ questionId, answerId })
  }

  if (answers.length !== totalQuestions) {
    handleDisableButton(true)
  } else {
    handleDisableButton(false)
  }

  updateAnswersCount(answers.length)
  localStorage.setItem(QUIZ_KEY, JSON.stringify(answers))
}

function loadAnswersFromLocalStorage() {
  const savedAnswers = localStorage.getItem(QUIZ_KEY)
  if (savedAnswers) {
    const parsedAnswers: Answer[] = JSON.parse(savedAnswers)

    updateAnswersCount(parsedAnswers?.length || 0)

    parsedAnswers.forEach(({ questionId, answerId }) => {
      const questionElement = document.querySelector(
        `[data-question-id='${questionId}']`,
      ) as HTMLElement
      const answerElement = questionElement?.querySelector(
        `[data-answer-id='${answerId}']`,
      ) as HTMLElement

      if (questionElement && answerElement) {
        answerElement.classList.add("active")
      }
    })

    if (parsedAnswers.length !== totalQuestions) {
      handleDisableButton(true)
    }
  } else handleDisableButton(true)
}

function handleAnswerSelection(
  questionId: string,
  answerId: string,
  question: HTMLElement,
  answer: HTMLElement,
) {
  const answers = question.querySelectorAll("[data-answer-id]")
  answers.forEach(activeElement => {
    activeElement.classList.remove("active")
  })
  answer.classList.add("active")

  saveAnswerToLocalStorage(questionId, answerId)
}

loadAnswersFromLocalStorage()

answers.forEach(answer => {
  answer?.addEventListener("click", () => {
    const question = answer.closest("[data-question-id]") as HTMLElement
    const questionId = question?.getAttribute("data-question-id") || ""
    const answerId = answer.getAttribute("data-answer-id") || ""

    handleAnswerSelection(questionId, answerId, question, answer)
  })
})

resultButton?.addEventListener("click", () => {
  window.location.href = `/${QUIZ_KEY}/contacts`
})

if (totalQuestions) localStorage.setItem(`${QUIZ_KEY}-total`, String(totalQuestions))
