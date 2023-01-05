export default async function getComment() {
  const response = await fetch("./data.json")
  const data = await response.json()

  return data;
}

getComment().then((data) => {
  const comment = data.comments;
  const userData = data.currentUser;
  let iD = 0;


  let defaultCommentStructure = {
    content: "",
    createdAt: "",
    id: 0,
    score: 0,
    userImage: '',
    username: "",
    currentUser: false,
  }

  let defaultUserData = {
    image: '',
    username: '',
    currentUser: true
  }

  let defaultCommentStructureRelpy = {}

  function getDataToLocalStorage(users) {
    let saveComment, currentUserData, commentReplies;
    if (localStorage.getItem("comments") === null) {
      saveComment = [];
      users.forEach(user => {
        defaultCommentStructure = {
          content: user.content,
          createdAt: user.createdAt,
          id: user.id,
          score: user.score,
          userImage: user.user.image.png,
          username: user.user.username,
          currentUser: checkUser(user)
        }

        saveComment.push(defaultCommentStructure);
        localStorage.setItem("comments", JSON.stringify(saveComment))
      })

    } else {
      saveComment = JSON.parse(localStorage.getItem("comments"));
    }

    if (localStorage.getItem('currentUser') === null) {
      currentUserData = [];
      defaultUserData = {
        image: userData.image.webp,
        username: userData.username,
        currentUser: true
      }

      currentUserData.push(defaultUserData)
      localStorage.setItem("currentUser", JSON.stringify(currentUserData));

    } else {
      currentUserData = JSON.parse(localStorage.getItem("currentUser"));
    }

    if (localStorage.getItem('userReplies') === null) {
      let pushReplies = [];
      comment.forEach(reply => {
        reply.replies.forEach(key => {
          pushReplies.push(defaultCommentStructureRelpy = {
            content: key.content,
            createdAt: key.createdAt,
            currentUser: checkUser(key),
            id: iD++,
            score: key.score,
            replies: key.replies,
            userImage: key.user.image.png,
            username: key.user.username,
            replyingTo: key.replyingTo
          })
        })
      })
      localStorage.setItem("userReplies", JSON.stringify(pushReplies));

    } else {
      commentReplies = JSON.parse(localStorage.getItem("userReplies"));
    }

    function checkUser(input) {
      if (!(input.user.username === 'juliusomo')) {
        return false;
      } else {
        return true;
      }
    }


  }
  getDataToLocalStorage(comment)

})