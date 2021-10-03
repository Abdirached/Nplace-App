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
      <div className="h-full border-t">
        <AddComment
          comments={comments}
          setComments={setComments}
          postOwner={postOwner}
        />
      </div>
      <div className="mb-2">
        {comments.map((comment) => (
          <div key={comment.commentId} className="outline-black mb-4 w-full">
            {userId == comment.User?.userId ? (
              <div className="flex items-center justify-between w-full">
                <div>
                  <p>{comment.User?.firstName}</p>
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
                <button
                  onClick={() => {
                    setToggleOpen(!toggleOpen);
                    setSelected(comment.commentId);
                  }}
                  key={comment.commentId}
                >
                  {!toggleOpen ? (
                    <HiOutlineDotsVertical className="text-2xl font-bold" />
                  ) : (
                    <HiOutlineDotsVertical className="text-2xl font-bold" />
                  )}
                </button>
                {selected == comment.commentId && toggleOpen ? (
                  <div>
                    <DeleteComment
                      comments={comments}
                      setComments={setComments}
                      commentId={comment.commentId}
                    />
                    <button
                      onClick={() => setshowEditComponent(!showEditComponent)}
                    >
                      {!showEditComponent ? <p>Edit</p> : null}
                    </button>
                  </div>
                ) : null}
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
