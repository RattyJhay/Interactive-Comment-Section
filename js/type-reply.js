import { id as id, count as count, commentNumber as commentNumber } from "./getdata.js";

export default class TypeReply {
  constructor() {
    this.buttonFooter = document.querySelectorAll('#delete-btn');
    this.buttonHeader = document.querySelectorAll('#reply--desktop');

    this.getcommentBox = JSON.parse(localStorage.getItem("currentUser"));

    this.buttonFooter.forEach(btn => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains('active')) {
          btn.classList.remove('active')
          this.showCommentBox(btn)
        } else {
          btn.classList.add('active')
          this.showReplyContainer(btn)

          this.showCommentBox(btn)
        }

      })
    })

    this.buttonHeader.forEach(btn => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains('active')) {
          btn.classList.remove('active')
          this.showCommentBox(btn)
        } else {
          btn.classList.add('active')
          this.add(btn)

          this.showCommentBox(btn)
        }

      })
    })
  }




  add(e) {
    let parentNode = e.parentElement.parentElement.parentElement;

    let profileName = parentNode.querySelector('.profile-name');

    this.pName = profileName.innerText;

    parentNode.insertAdjacentHTML('afterend', `
      <div class="add-comment-container type-reply">
        <div class="add-comment">
          <div class="profile-pic switch">
            <img
              src="${this.getcommentBox[0].image}"
              alt="profile-pic"
            />
          </div>
          <textarea
            name="add-comment"
            class="input"
            id="text-input"
          >@${this.pName}, </textarea>
          <div class="send-btn switch">
            <button class="main-reply-button">REPLY</button>
          </div>
  
          <div class="input--footer">
            <div class="profile-pic">
              <img
                src="${this.getcommentBox[0].image}"
                alt="profile-pic"
              />
            </div>
  
            <div class="send-btn reply ">
              <button class="mobile-reply-button">REPLY</button>
            </div>
          </div>
        </div>
      </div> 
    `)
    this.replyButton = document.querySelector('.main-reply-button');

    this.replyButton.onclick = this.sendReply;
  }

  showReplyContainer(e) {
    let parentNode = e.parentElement.parentElement;
    let profileName = parentNode.querySelector('.profile-name').innerText;

    this.pName = profileName;

    parentNode.insertAdjacentHTML('afterend', `
      <div class="add-comment-container type-reply active">
        <div class="add-comment">
          <div class="profile-pic switch">
            <img
              src="${this.getcommentBox[0].image}"
              alt="profile-pic"
            />
          </div>
          <textarea
            name="add-comment"
            class="input"
            id="text-input"
          >@${profileName}, </textarea>
          <div class="send-btn switch">
            <button class="main-reply-button">REPLY</button>
          </div>
  
          <div class="input--footer">
            <div class="profile-pic">
              <img
                src="${this.getcommentBox[0].image}"
                alt="profile-pic"
              />
            </div>
  
            <div class="send-btn reply">
              <button class="mobile-reply-button" >REPLY</button>
            </div>
          </div>
        </div>
      </div> 
    `)

    this.replyButton = document.querySelector('.mobile-reply-button');

    this.replyButton.onclick = this.sendReply;
  }

  sendReply = () => {
    this.commentBox = document.querySelector('.type-reply ');
    this.textBox = document.querySelector('#text-input ').value;
    this.Uname = this.textBox.split(' ')[0];
    this.finalTextContent = this.textBox.replace(this.Uname, '');

    let getReplies = JSON.parse(localStorage.getItem('userReplies'));
    let getImage = JSON.parse(localStorage.getItem('currentUser'));
    this.image = getImage[0].image;

    this.defaultCommentStructureRelpy = {
      content: this.finalTextContent.trim(),
      createdAt: 'just now',
      currentUser: true,
      id: getReplies.length + 1,
      score: 0,
      replies: [],
      userImage: this.image,
      username: "juliusomo",
      replyingTo: this.pName
    }

    getReplies.push(this.defaultCommentStructureRelpy)
    localStorage.setItem("userReplies", JSON.stringify(getReplies));

    this.commentBox.classList.remove('active');
    this.commentBox.remove();
    this.appendComment(this.pName);
  }


  appendComment(e) {
    let profileName = document.querySelectorAll('.profile-name')
    let getReplies = JSON.parse(localStorage.getItem('userReplies'));



    profileName.forEach(name => {
      if (name.textContent === e) {
        let parent = name.parentElement.parentElement.parentElement.parentNode
        this.defaultCommentStructureRelpy


        this.replyContent = `
          <div class="reply-container">
            <div class="reply--wrapper comment-block-container">
              <div class="reply--reaction">
                <div class="likes-button desktop--reaction inline-block">
                  <svg
                    id="plusSvg"
                    width="11"
                    height="11"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                    />
                  </svg>
                  <span id="vote-value">${this.defaultCommentStructureRelpy.score}</span>
                  <svg
                    id="minusSvg"
                    width="11"
                    height="3"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                    />
                  </svg>
                </div>
              </div>

              <div class="reply--body">
                <div class="reply--header">
                  <div class="profile-pic">
                    <img
                      src=".${this.defaultCommentStructureRelpy.userImage}"
                      alt="profile-pic"
                    />
                  </div>
                  <div class="username">${this.defaultCommentStructureRelpy.username}</div>
                  <div class="you--attribute">you</div>
                  <div class="date">${this.defaultCommentStructureRelpy.createdAt}</div>

                  <div class="reply-button-div delete">
                    <button
                      class="reply-button display-flex inline-block"
                      id="delete-btn"
                    >
                      <svg
                        width="12"
                        height="14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                        />
                      </svg>
                      <span class="delete--comment">Delete</span>
                    </button>
                  </div>

                  <div class="reply-button-div edit">
                    <button
                      class="reply-button display-flex inline-block"
                      id="edit-btn"
                    >
                      <svg
                        width="14"
                        height="14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                        />
                      </svg>
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
                <div class="reply--content">
                  <p>
                    <span class="name--tag">@${this.defaultCommentStructureRelpy.replyingTo}</span>
                    ${this.defaultCommentStructureRelpy.content}
                  </p>
                </div>
              </div>
              <div class="reply--footer">
                <button class="likes-button display-flex inline-block">
                  <svg
                    id="plusSvg"
                    width="11"
                    height="11"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                    />
                  </svg>
                  <span id="vote-value">${this.defaultCommentStructureRelpy.score}</span>
                  <svg
                    id="minusSvg"
                    width="11"
                    height="3"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                    />
                  </svg>
                </button>

                <div class="edit--footer">
                  <button
                    class="reply-button display-flex inline-block delete"
                    id="delete-btn"
                  >
                    <svg
                      width="12"
                      height="14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                      />
                    </svg>
                    <span class="delete--comment">Delete</span>
                  </button>

                  <button
                    class="reply-button display-flex inline-block"
                    id="edit-btn"
                  >
                    <svg
                      width="14"
                      height="14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                      />
                    </svg>
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;

        parent.insertAdjacentHTML('afterend', this.replyContent);
      }
    })
  }

  showCommentBox(e) {
    this.commentBox = document.querySelector('.type-reply ');

    if (e.classList.contains('active')) {
      this.commentBox.classList.add('active');
    } else {
      this.commentBox.classList.remove('active');
      this.commentBox.remove();
    }
  }

}

