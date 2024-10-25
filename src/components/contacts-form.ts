import emailjs from "@emailjs/browser"
import { Modal } from "tw-elements"
import { COMMENT_KEY } from "./comment"
import { getQuizKey, getQuizName } from "./quiz-config"
import emailSettings from "./email"
import { Answer } from "./answers"

interface FormValues {
  quizName: string
  phone: string
  email: string
  comment: string | null
  answers: string
}

const QUIZ_KEY = getQuizKey()

const form = document.getElementById("contacts-form") as HTMLFormElement
const submitBtn = document.getElementById("contacts-form-btn") as HTMLButtonElement
const successAlert = new Modal(document.getElementById("alert-success"))
const errorAlert = new Modal(document.getElementById("alert-error"))

const totalQuestions = localStorage.getItem(`${QUIZ_KEY}-total`)
const comment = localStorage.getItem(COMMENT_KEY)
const answers = localStorage.getItem(QUIZ_KEY) ?? ""
const parsedAnswers: Answer[] = answers ? JSON.parse(answers) : []

if ((!parsedAnswers.length || parsedAnswers.length !== Number(totalQuestions)) && submitBtn) {
  submitBtn.disabled = true
}

function formatAnswers(answers: Answer[]): string {
  return answers.map(answer => `Вопрос ${answer.questionId}: ${answer.answerId}`).join("\n\n")
}

form?.addEventListener("submit", function (event: Event) {
  event.preventDefault()

  const { serviceId, templateId, publicKey } = emailSettings

  const phoneInput = document.getElementById("phone") as HTMLInputElement
  const emailInput = document.getElementById("email") as HTMLInputElement

  phoneInput.addEventListener("focus", () => {
    phoneInput.style.borderColor = "rgba(217, 217, 217, 1)"
  })

  const formValues: FormValues = {
    quizName: getQuizName(QUIZ_KEY),
    phone: phoneInput.value.replace(/\D/g, ""),
    email: emailInput.value,
    comment: comment,
    answers: formatAnswers(parsedAnswers),
  }

  const clearForm = () => {
    emailInput.value = ""
    phoneInput.value = ""
    phoneInput.style.borderColor = "rgba(217, 217, 217, 1)"

    if (comment) {
      localStorage.removeItem(COMMENT_KEY)
    }
    if (parsedAnswers.length) {
      localStorage.removeItem(QUIZ_KEY)
      localStorage.removeItem(`${QUIZ_KEY}-total`)
    }
  }

  const handleSuccess = () => {
    successAlert.show()
    clearForm()
  }

  const handleError = () => {
    errorAlert.show()
    clearForm()
  }

  const submitForm = async (formValues: FormValues) => {
    try {
      const response = await emailjs.send(serviceId, templateId, { ...formValues }, { publicKey })

      if (response.status !== 200) {
        handleError()
        return
      }

      handleSuccess()
    } catch (error) {
      handleError()
    }
  }

  if (formValues.phone.length !== 12) {
    phoneInput.style.borderColor = "#dc2626"
  } else {
    submitBtn.disabled = true
    submitForm(formValues)
  }
})
