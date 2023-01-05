import loadData from "./load-to-storage.js";
import getComment from "./getdata.js";
import Voting from "./voting.js";
import { deleteCommentBtn as deleteCommentBtn, cancelBtn as cancelBtn, confrimDeleteBtn as confrimDeleteBtn, requestDelete as requestDelete, cancelDelete as cancelDelete, confirmDelete as confirmDelete } from "./delete.js";
import TypeReply from "./type-reply.js";
import EditButton from "./edit.js";
import CreateComment from "./createComment.js";

const yourReply = new TypeReply();
const vote = new Voting();
const edit = new EditButton();
const newComment = new CreateComment();


vote.plusBtn.forEach(btn => {
  btn.addEventListener('click', () => {

    Voting.addVote(btn)
  })
})

vote.minusBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    Voting.subtractVote(btn)
  })
})

deleteCommentBtn.forEach(comment => {
  comment.addEventListener('click', requestDelete)
})

cancelBtn.addEventListener('click', cancelDelete)
confrimDeleteBtn.addEventListener('click', confirmDelete)
