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
      <div className="w-full mt-2">
        {!open ? (
          <div className="ml-16">
            <div>
              <AddCommentReply
                commentReplies={commentReplies}
                setCommentReplies={setCommentReplies}
                commentId={commentId}
                commentOwner={commentOwner}
              />
            </div>
            <button
              onClick={() => setOpen(!open)}
              className="text-blue-800 font-semibold"
            >
              View Replies
            </button>
          </div>
        ) : (
          <div className="ml-16">
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
                className="text-blue-800 font-semibold"
              >
                Hide Replies
              </button>
            </div>
            <div className="mb-2">
              {commentReplies
                ? commentReplies.map((reply) => (
                    <div className="mb-2 w-full" key={reply.commentReplyId}>
                      {userId == reply.User?.userId ? (
                        <div className="flex items-center justify-between w-full">
                          <div className="flex mt-2 ml-2">
                            <img
                              className="rounded-full h-10 w-10 flex mr-3 ml-1"
                              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                              alt="profile picture"
                            />
                            <div>
                              <p className="font-bold text-base">
                                {reply.User?.firstName}
                                <span className="ml-1 font-bold text-base">
                                  {reply.User?.lastName}
                                </span>
                              </p>
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
                          </div>
                          <div className="flex flex-col mr-2 h-full relative outline-none">
                            <button
                              onClick={() => {
                                setToggleOpen(!toggleOpen);
                                setSelected(reply.commentReplyId);
                              }}
                              key={reply.commentReplyId}
                              className="outline-none"
                            >
                              {!toggleOpen ? (
                                <HiOutlineDotsVertical className="text-2xl font-bold" />
                              ) : (
                                <HiOutlineDotsVertical className="text-2xl font-bold" />
                              )}
                            </button>
                            {selected == reply.commentReplyId && toggleOpen ? (
                              <div className="bg-gray-50 mt-2 border z-50 w-24 pl-2 absolute right-1 top-6 rounded">
                                <DeleteCommentReply
                                  commentReplies={commentReplies}
                                  setCommentReplies={setCommentReplies}
                                  commentId={commentId}
                                  commentReplyId={reply.commentReplyId}
                                />
                                <button
                                  onClick={() => {
                                    setshowEditComponent(!showEditComponent);
                                    setToggleOpen(!toggleOpen);
                                  }}
                                >
                                  {!showEditComponent ? <p>Edit</p> : null}
                                </button>
                              </div>
                            ) : null}
                          </div>
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
