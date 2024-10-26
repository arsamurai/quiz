import { loadAnswersFromLocalStorage, saveAnswerToLocalStorage } from "./answers-storage"
import { updateAnswersCount } from "./answers-progress"
import { getQuizKey } from "./quiz-config"

const QUIZ_KEY = getQuizKey() ?? ""

const resultButton = document.getElementById("result-button") as HTMLButtonElement
const answers = document.querySelectorAll("[data-answer-id]") as NodeListOf<HTMLElement>
const totalQuestions = document.querySelectorAll("[data-question-id]")?.length || 0
const answersBlockCount = document.querySelectorAll(
  "[data-answers-count]",
) as NodeListOf<HTMLElement>
const answersBlockProgressBar = document.querySelector("[data-answers-progress-bar]") as HTMLElement
const answersBlockProgressBlock = document.querySelector(
  "[data-answers-progress-block]",
) as HTMLElement

if (totalQuestions) {
  localStorage.setItem(`${QUIZ_KEY}-total`, String(totalQuestions))
}

function handleDisableButton(disable: boolean) {
  if (resultButton) resultButton.disabled = disable
}

function loadAnswers() {
  const parsedAnswers = loadAnswersFromLocalStorage()

  updateAnswersCount(
    parsedAnswers.length,
    totalQuestions,
    answersBlockCount,
    answersBlockProgressBar,
    answersBlockProgressBlock,
  )

  parsedAnswers.forEach(({ questionId, answerId }) => {
    const questionElement = document.querySelector(
      `[data-question-id='${questionId}']`,
    ) as HTMLElement
    const answerElement = questionElement?.querySelector(
      `[data-answer-id='${answerId}']`,
    ) as HTMLElement
    answerElement?.classList.add("active")
  })

  handleDisableButton(parsedAnswers.length !== totalQuestions)
}

function handleAnswerSelection(
  questionId: string,
  answerId: string,
  question: HTMLElement,
  answer: HTMLElement,
) {
  question
    .querySelectorAll("[data-answer-id]")
    .forEach(activeElement => activeElement.classList.remove("active"))
  answer.classList.add("active")

  const totalAnswers = saveAnswerToLocalStorage(questionId, answerId)

  updateAnswersCount(
    totalAnswers,
    totalQuestions,
    answersBlockCount,
    answersBlockProgressBar,
    answersBlockProgressBlock,
  )
  handleDisableButton(totalAnswers !== totalQuestions)
}

loadAnswers()

answers.forEach(answer => {
  answer.addEventListener("click", () => {
    const question = answer.closest("[data-question-id]") as HTMLElement
    const questionId = question?.getAttribute("data-question-id") || ""
    const answerId = answer.getAttribute("data-answer-id") || ""

    handleAnswerSelection(questionId, answerId, question, answer)
  })
})

resultButton?.addEventListener("click", () => {
  window.location.href = `/${getQuizKey()}/contacts`
})
