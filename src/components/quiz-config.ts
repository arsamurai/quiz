export function getQuizKey() {
  const pathname = window.location.pathname

  if (pathname.includes("/personality-quiz")) {
    return "personality-quiz"
  } else if (pathname.includes("/parenting-quiz")) {
    return "parenting-quiz"
  } else {
    return ""
  }
}

export function getQuizName(key: string) {
  switch (key) {
    case "personality-quiz":
      return "Тест на выявление психологического типа личности ребенка"
    case "parenting-quiz":
      return "Тест-опрос О методах воспитания в семье"
    default:
      return ""
  }
}
