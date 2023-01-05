export const deleteCommentBtn = document.querySelectorAll('.delete--comment')
export const cancelBtn = document.querySelector('.cancel-btn')
export const confrimDeleteBtn = document.querySelector('.delete-btn')
const popUpBox = document.querySelector('.popup-box')
const popUp = document.querySelector('.popup')
let getDataAttribute;

export function requestDelete(e) {
  getDataAttribute = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement

  console.log(getDataAttribute)

  if (!(popUpBox.classList.contains("active"))) {
    popUpBox.classList.add('active');
    popUp.classList.add('active');
  } else {
    popUpBox.classList.remove('active');
    popUp.classList.remove('active');
  }
}

export function cancelDelete() {
  if (popUpBox.classList.contains("active")) {
    popUpBox.classList.remove('active');
    popUp.classList.remove('active');
  }
}

export function confirmDelete() {
  if (popUpBox.classList.contains("active")) {
    popUpBox.classList.remove('active');
    popUp.classList.remove('active');
    deleteFunc()
  }
}

function deleteFunc() {
  let getUserComment = JSON.parse(localStorage.getItem("userReplies"))
  let getComment = JSON.parse(localStorage.getItem("comments"))

  if (getDataAttribute.classList.contains("reply--wrapper")) {
    let replyNumber = parseInt(getDataAttribute.getAttribute("data-number"));

    getUserComment.splice(replyNumber, 1)
    getDataAttribute.style.display = "none";

    let parent = getDataAttribute.parentElement

    localStorage.setItem("userReplies", JSON.stringify(getUserComment))

    parent.remove()
  } else {
    let commentNumber = parseInt(getDataAttribute.id);

    getComment.splice(commentNumber, 1)
    getDataAttribute.style.display = "none";

    localStorage.setItem("comments", JSON.stringify(getComment))

    getDataAttribute.remove()
  }


}

deleteCommentBtn.forEach(comment => {
  comment.addEventListener('click', requestDelete)
})