import { useState } from "react";
import AddComment from "./AddComment";
import CommentReplies from "./CommentReplies";
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdClose } from "react-icons/md";
export default function Comments({ commentData, postOwner }) {
  const [comments, setComments] = useState(commentData);
  const [toggleOpen, setToggleOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showEditComponent, setshowEditComponent] = useState(false);
  console.log("hett" + selected);
  const userId = JSON.parse(localStorage.getItem("userId"));
  return (
    <>
      <div className="h-full border-t w-full">
        <AddComment
          comments={comments}
          setComments={setComments}
          postOwner={postOwner}
        />
      </div>
      <div className="mb-2">
        {comments.map((comment) => (
          <div key={comment.commentId} className="mb-4 w-full">
            {userId == comment.User?.userId ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex mt-2 ml-2">
                  <img
                    className="rounded-full h-10 w-10 flex mr-3 ml-1"
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    alt="profile picture"
                  />
                  <div>
                    <p className="font-bold text-base">
                      {comment.User?.firstName}
                      <span className="ml-1 font-bold text-base">
                        {comment.User?.lastName}
                      </span>
                    </p>
                    {selected == comment.commentId && showEditComponent ? (
                      <div className="outline-black">
                        <EditComment
                          comments={comments}
                          setComments={setComments}
                          commentId={comment.commentId}
                          commentText={comment.text}
                          setshowEditComponent={setshowEditComponent}
                        />
                        <button onClick={() => setshowEditComponent(false)}>
                          cancel
                        </button>
                      </div>
                    ) : (
                      <p>{comment.text}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col mr-2 h-full relative outline-none">
                  <button
                    onClick={() => {
                      setToggleOpen(!toggleOpen);
                      setSelected(comment.commentId);
                    }}
                    key={comment.commentId}
                    className="outline-none"
                  >
                    {!toggleOpen ? (
                      <HiOutlineDotsVertical className="text-2xl font-semibold" />
                    ) : (
                      <HiOutlineDotsVertical className="text-2xl font-semibold" />
                    )}
                  </button>
                  {selected == comment.commentId && toggleOpen ? (
                    <div className="bg-gray-50 mt-2 border z-50 w-24 pl-2 absolute right-1 top-6 rounded">
                      <DeleteComment
                        comments={comments}
                        setComments={setComments}
                        commentId={comment.commentId}
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
                <p>{comment.text}</p>
                <p>{comment.User?.firstName}</p>
              </div>
            )}
            <CommentReplies
              repliesData={comment.CommentReplies}
              commentId={comment.commentId}
              commentOwner={comment.User?.userId}
            />
          </div>
        ))}
      </div>
    </>
  );
}
