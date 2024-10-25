export const COMMENT_KEY = "comment"

const comment = document.getElementById("comment") as HTMLTextAreaElement

function loadCommentFromLocalStorage() {
  const savedComment = localStorage.getItem(COMMENT_KEY)

  if (comment && savedComment) {
    comment.value = savedComment
  }
}

loadCommentFromLocalStorage()

if (comment) {
  comment.addEventListener("input", () => {
    localStorage.setItem(COMMENT_KEY, comment.value)
  })
}
