export default class Voting {
  constructor() {
    this.plusBtn = document.querySelectorAll("#plusSvg")
    this.minusBtn = document.querySelectorAll("#minusSvg")
    this.totalVote = document.querySelectorAll(".likes-button span")
  }

  static rateReplyAdd(reply, score, footerbutton, desktopbutton) {
    const getDataAttribute = reply.parentNode.parentNode.parentNode.getAttribute('data-number');

    reply.nextElementSibling.innerText++

    score[getDataAttribute].score = reply.nextElementSibling.innerText

    localStorage.setItem('userReplies', JSON.stringify(score))

    let scoreStorage = JSON.parse(localStorage.getItem('userReplies'))

    desktopbutton = scoreStorage[getDataAttribute].score;
    footerbutton = scoreStorage[getDataAttribute].score;
  }

  static rateReplySubtract(reply, score, footerbutton, desktopbutton) {
    const getDataAttribute = reply.parentNode.parentNode.parentNode.getAttribute('data-number');

    reply.previousElementSibling.innerText--

    score[getDataAttribute].score = reply.previousElementSibling.innerText

    localStorage.setItem('userReplies', JSON.stringify(score))

    let scoreStorage = JSON.parse(localStorage.getItem('userReplies'))

    desktopbutton = scoreStorage[getDataAttribute].score;
    footerbutton = scoreStorage[getDataAttribute].score;
  }


  static addVote(e) {
    let score, parentId = e.parentNode.parentNode.parentNode.id,
      convertParentId = parseInt(parentId), parentDiv;

    parentDiv = e.parentNode.parentNode.parentNode;

    let desktopbtn = parentDiv.querySelector('.desktop--reaction span')

    let footerbtn = parentDiv.querySelector('.footer .likes-button span')

    if (parentDiv.classList.contains('reply--wrapper')) {
      if (localStorage.getItem("userReplies") === null) {
        score = [];
      } else {
        score = JSON.parse(localStorage.getItem("userReplies"));
      }

      Voting.rateReplyAdd(e, score, footerbtn, desktopbtn)

    } else {
      if (localStorage.getItem("comments") === null) {
        score = [];
      } else {
        score = JSON.parse(localStorage.getItem("comments"));
      }

      e.nextElementSibling.innerText++
      score[convertParentId].score = e.nextElementSibling.innerText
      localStorage.setItem('comments', JSON.stringify(score))

      score = JSON.parse(localStorage.getItem("comments"));

      footerbtn.innerText = score[convertParentId].score
      desktopbtn.innerText = score[convertParentId].score;
    }

  }

  static subtractVote(e) {
    if (e.previousElementSibling.innerText <= 0) {
      e.previousElementSibling.innerText = 0
    } else {
      let score, parent = e.parentNode.parentNode.parentNode.id,
        p = parseInt(parent), parentDiv;

      parentDiv = e.parentNode.parentNode.parentNode;

      let desktopbtn = parentDiv.querySelector('.desktop--reaction span')

      let footerbtn = parentDiv.querySelector('.footer .likes-button span')

      if (parentDiv.classList.contains('reply--wrapper')) {
        if (localStorage.getItem("userReplies") === null) {
          score = [];
        } else {
          score = JSON.parse(localStorage.getItem("userReplies"));
        }

        Voting.rateReplySubtract(e, score, footerbtn, desktopbtn)

      } else {
        if (localStorage.getItem("comments") === null) {
          score = [];
        } else {
          score = JSON.parse(localStorage.getItem("comments"));
        }
        e.previousElementSibling.innerText--
        score[p].score = e.previousElementSibling.innerText
        localStorage.setItem('comments', JSON.stringify(score))

        footerbtn.innerText = score[p].score
        desktopbtn.innerText = score[p].score;
      }

    }
  }

}