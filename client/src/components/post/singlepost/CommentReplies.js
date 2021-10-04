import { useState } from "react";
import AddCommentReply from "./AddCommentReply";
import DeleteCommentReply from "./DeleteCommentReply";
import EditCommentReply from "./EditCommentReply";
import { HiOutlineDotsVertical } from "react-icons/hi";
const userId = JSON.parse(localStorage.getItem("userId"));

export default function CommentRepliesMain({
  repliesData,
  commentId,
  commentOwner,
}) {
  const [commentReplies, setCommentReplies] = useState(repliesData);
  const [open, setOpen] = useState(false);
  const [toggleOpen, setToggleOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showEditComponent, setshowEditComponent] = useState(false);
  return (
    <>
      <div>
        {!open ? (
          <div>
            <div>
              <AddCommentReply
                commentReplies={commentReplies}
                setCommentReplies={setCommentReplies}
                commentId={commentId}
                commentOwner={commentOwner}
              />
            </div>
            <button onClick={() => setOpen(!open)} className="text-blue-800">
              ViewReplies
            </button>
          </div>
        ) : (
          <div>
            <div>
              <AddCommentReply
                commentReplies={commentReplies}
                setCommentReplies={setCommentReplies}
                commentId={commentId}
                commentOwner={commentOwner}
              />
            </div>
            <div>
              <button
                onClick={() => {
                  setOpen(!open);
                }}
                className="text-blue-800"
              >
                Hide Replies
              </button>
            </div>
            <div className="mb-2">
              {commentReplies
                ? commentReplies.map((reply) => (
                    <div
                      className="outline-green mb-2 w-4/5 ml-8"
                      key={reply.commentReplyId}
                    >
                      {userId == reply.User?.userId ? (
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <p>{reply.User?.firstName}</p>
                            {selected == reply.commentReplyId &&
                            showEditComponent ? (
                              <div>
                                <EditCommentReply
                                  commentReplies={commentReplies}
                                  setCommentReplies={setCommentReplies}
                                  commentId={commentId}
                                  commentReplyId={reply.commentReplyId}
                                  commentReplyText={reply.text}
                                  setshowEditComponent={setshowEditComponent}
                                />
                                <button
                                  onClick={() => setshowEditComponent(false)}
                                >
                                  cancel
                                </button>
                              </div>
                            ) : (
                              <p>{reply.text}</p>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              setToggleOpen(!toggleOpen);
                              setSelected(reply.commentReplyId);
                            }}
                            key={reply.commentReplyId}
                          >
                            {!toggleOpen ? (
                              <HiOutlineDotsVertical className="text-2xl font-bold" />
                            ) : (
                              <HiOutlineDotsVertical className="text-2xl font-bold" />
                            )}
                          </button>
                          {selected == reply.commentReplyId && toggleOpen ? (
                            <div>
                              <DeleteCommentReply
                                commentReplies={commentReplies}
                                setCommentReplies={setCommentReplies}
                                commentId={commentId}
                                commentReplyId={reply.commentReplyId}
                              />
                              <button
                                onClick={() =>
                                  setshowEditComponent(!showEditComponent)
                                }
                              >
                                {!showEditComponent ? <p>Edit</p> : null}
                              </button>
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        <div>
                          <p>{reply.text}</p>
                          <p>{reply.User?.firstName}</p>
                        </div>
                      )}
                    </div>
                  ))
                : null}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
