const mostRecentScore = localStorage.getItem("mostRecentScore")
const yourScore = document.getElementById("yourScore");
yourScore.innerText = mostRecentScore + '/' + '60';
