import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  server: { host: false, port: 3000 },
  build: {
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        personalityQuiz: resolve(__dirname, "personality-quiz/index.html"),
        personalityQuizTest: resolve(__dirname, "personality-quiz/quiz.html"),
        personalityQuizContacts: resolve(__dirname, "personality-quiz/contacts.html"),
        parentingQuiz: resolve(__dirname, "parenting-quiz/index.html"),
        parentingQuizTest: resolve(__dirname, "parenting-quiz/quiz.html"),
        parentingQuizContacts: resolve(__dirname, "parenting-quiz/contacts.html"),
      },
    },
  },
})
