import { useEffect, useState } from "react";
import { parseJwt } from "../../util/parseJwt";
import { useLocalState } from "../../util/useLocalStorage";
import CommentForm from "./CommentForm";

const Comment=({
    comment,
    replies,
    deleteComment,
    addComment,
    updateComment,
    activeComment,
    setActiveComment,
    parentId = null
}) => {
    // eslint-disable-next-line no-unused-vars
    const [jwt, setJwt] = useLocalState("", "jwt");

    const [username, setUsername] = useState("");
    const creationDate = new Date(comment.creationDate).toLocaleDateString();
    const replyId = parentId ? parentId : comment.commentId;
    
    const fifteenMinutes = 900000;
    const timePassed = new Date() - new Date(comment.creationDate) > fifteenMinutes;
    const canReply = jwt && parseJwt(jwt).scope !== "ROLE_BANNED";
    const canEdit = username === comment.authorUsername && !timePassed;
    const canDelete = username === comment.authorUsername && !timePassed;

    const isReplying = activeComment && activeComment.type === "reply" && activeComment.id === comment.commentId;
    const isEditing = activeComment && activeComment.type === "edit" && activeComment.id === comment.commentId;

    useEffect(() => {
        if (jwt) {
            setUsername(parseJwt(jwt).sub);
        }
    }, [jwt]);

    return(
        <div className="comment">
            <div className="image-container">
                <img src="/default-avatar.jpg" alt=""/>
            </div>
            <div className="right-part">
                <div className="content">
                    <div>{comment.authorUsername}</div>
                    <div>{creationDate}</div>
                </div>
                {!isEditing && <div className="text">{comment.content}</div>}
                {isEditing && (
                    <CommentForm
                        handleSubmit={(text) => updateComment(text, comment.commentId)}
                        handleCancel={() => setActiveComment(null)}
                        hasCancelButton
                        initialText={comment.content}
                    />
                )}
                <div className="actions">
                    {canReply && <div className="action" onClick={() => setActiveComment({id: comment.commentId, type: "reply"})}>Odpowiedz</div>}
                    {canEdit && <div className="action" onClick={() => setActiveComment({id: comment.commentId, type: "edit"})}>Edytuj</div>}
                    {canDelete && <div className="action" onClick={() => deleteComment(comment.commentId)}>Usuń</div>}
                </div>
                {isReplying && (
                    <CommentForm handleSubmit={(text) => addComment(text, replyId)}/>
                )}
                {replies.length > 0 && (
                    <div className="replies">
                        {replies.map(reply => (
                            <Comment
                                key={reply.commentId}
                                comment={reply}
                                replies={[]}
                                deleteComment={deleteComment}
                                addComment={addComment}
                                updateComment={updateComment}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                parentId={comment.commentId}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Comment;