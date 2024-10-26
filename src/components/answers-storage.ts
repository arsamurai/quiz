import { getQuizKey } from "./quiz-config"

export interface Answer {
  questionId: string
  answerId: string
}

const QUIZ_KEY = getQuizKey() ?? ""

export function saveAnswerToLocalStorage(questionId: string, answerId: string) {
  const existingAnswers = localStorage.getItem(QUIZ_KEY)
  let answers: Answer[] = existingAnswers ? JSON.parse(existingAnswers) : []

  const existingAnswerIndex = answers.findIndex(item => item.questionId === questionId)

  if (existingAnswerIndex !== -1) {
    answers[existingAnswerIndex].answerId = answerId
  } else {
    answers.push({ questionId, answerId })
  }

  localStorage.setItem(QUIZ_KEY, JSON.stringify(answers))
  return answers.length
}

export function loadAnswersFromLocalStorage(): Answer[] {
  const savedAnswers = localStorage.getItem(QUIZ_KEY)
  return savedAnswers ? JSON.parse(savedAnswers) : []
}
