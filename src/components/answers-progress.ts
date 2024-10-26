export function updateAnswersCount(
  answersCount: number,
  totalQuestions: number,
  answersBlockCount: NodeListOf<HTMLElement>,
  answersBlockProgressBar: HTMLElement,
  answersBlockProgressBlock: HTMLElement,
) {
  answersBlockCount.forEach(block => {
    block.innerHTML = answersCount < 10 ? "0" + answersCount : String(answersCount)
  })

  if (answersBlockProgressBar && answersBlockProgressBlock) {
    const progressPercentage = (answersCount / totalQuestions) * 100
    answersBlockProgressBar.style.height = `${progressPercentage}%`
    answersBlockProgressBlock.style.top = `${progressPercentage}%`
  }
}
