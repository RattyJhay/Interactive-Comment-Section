export default class EditButton {
  constructor() {
    this.editButton = document.querySelectorAll("#edit-btn");

    this.editButton.forEach(btn => {
      btn.addEventListener("click", () => {
        this.edit(btn)
      })
    })
  }

  edit(e) {
    this.parent = e.parentElement.parentElement.parentElement.parentElement;

    this.commentBody = this.parent.querySelector(".reply--body .reply--content p")

    this.mainContainer = this.parent.querySelector(".reply--body  .reply--content")


    if (this.parent.parentElement.classList.contains('reply--wrapper')) {
      this.nameTag = this.commentBody.querySelector(".name--tag").innerText
      this.textContent = this.commentBody.querySelector(".text--content").innerText

      this.commentBody.style.display = 'none';
      this.commentBody.remove();
      this.mainContainer.insertAdjacentHTML("beforeend", `
       <div class="edit-tweet-container" id="comment-view">
            <textarea
              name="add-comment"
              class="input-update"
              id="text-input-update"
              placeholder="Add a comment"
            >${this.nameTag}, ${this.textContent}</textarea>
       
            <button class="update--button">UPDATE</button>
  
          </div>
        </div>
      `)

    } else {
      this.text = this.commentBody.innerText.trim()
      this.commentBody.style.display = 'none';
      this.commentBody.remove();
      this.mainContainer.insertAdjacentHTML("beforeend", `
      <div class="edit-tweet-container" id="comment-view">
            <textarea
              name="add-comment"
              class="input-update"
              id="text-input-update"
              placeholder="Add a comment"
            >${this.text}</textarea>
      
            <button class="update--button">UPDATE</button>

          </div>
        </div>
    `)
    }

    this.updateBtn = document.querySelector('.update--button').onclick = this.update

  }

  update = () => {
    this.commentBox = document.querySelector('#text-input-update');
    this.textValue = this.commentBox.value;

    if (this.textValue.startsWith('@')) {
      this.Uname = this.textValue.split(' ')[0];
      this.finalTextContent = this.textValue.replace(this.Uname, '');

      let parentUpdateBtn = this.commentBox.parentElement.parentElement.parentElement.parentElement.getAttribute("data-number");
      let getReplies;

      let idToInt = parseInt(parentUpdateBtn)

      if (localStorage.getItem("userReplies") === null) {
        getReplies = [];
      } else {
        getReplies = JSON.parse(localStorage.getItem("userReplies"));
      }

      getReplies[idToInt].content = this.finalTextContent

      localStorage.setItem("userReplies", JSON.stringify(getReplies));

      this.showUpdate(this.Uname, this.finalTextContent);
    } else {
      let parentUpdateBtn = this.commentBox.parentElement.parentElement.parentElement.parentElement.id;

      let idToInt = parseInt(parentUpdateBtn)
      let getComments;

      if (localStorage.getItem("comments") === null) {
        getComments = [];
      } else {
        getComments = JSON.parse(localStorage.getItem("comments"));
      }

      getComments[idToInt].content = this.textValue

      localStorage.setItem("comments", JSON.stringify(getComments));

      this.showUpdate(this.Uname = "", this.textValue);
    }

  }

  showUpdate(name, text) {
    this.textDiv = document.querySelector('#comment-view');


    if (name === '') {
      if (this.commentBody.style.display === "none") {
        this.textDiv.style.display = "none";
        this.commentBody.style.display = "block";
        this.mainContainer.insertAdjacentHTML("afterbegin", `
          <p>${text}</p>
        `)
        this.textDiv.remove();
      } else {
        alert("failed")
      }
    } else {
      let remove = name.split(",")[0];
      if (this.commentBody.style.display === "none") {
        this.textDiv.style.display = "none";
        this.commentBody.style.display = "block";
        this.mainContainer.insertAdjacentHTML("beforeend", `
        <p>
          <span class="name--tag">${remove}</span>
          <span class="text--content">${text}</span>
        </p>
        `)
        this.textDiv.remove();
      } else {
        alert("failed")
      }
    }

  }

}
