import './styles.css';

import { useLocalState } from '../../util/useLocalStorage';
import { useEffect, useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import axios from 'axios';
import { parseJwt } from '../../util/parseJwt';

const Comments=({articleId}) => {
    // eslint-disable-next-line no-unused-vars
    const [jwt, setJwt] = useLocalState("", "jwt");

    const [comments, setComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const rootComments = comments.filter((comment) => comment.parentId === null);
    
    function getReplies (commentId) {
        return comments
        .filter(comment => comment.parentId === commentId)
        .sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime());
    };

    function addComment (text, parentId) {
        const reqBody = {
            "articleId": articleId,
            "parentId": parentId,
            "content": text,
        }

        axios.post(`/api/comment/add`, reqBody, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        }).then((response) => {
            setComments([response.data, ...comments]);
            setActiveComment(null);
        }).catch(() => {
            alert("Wystąpił nieoczekiwany błąd");
        });
    };

    function deleteComment (commentId) {
        axios.delete(`/api/comment/delete?id=${commentId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        }).then((response) => {
            const updatedComments = comments.filter((comment) => comment.commentId !== commentId);
            setComments(updatedComments);
        }).catch(() => {
            alert("Wystąpił nieoczekiwany błąd");
        });
    };

    function updateComment (text, commentId) {
        const reqBody = {
            "commentId": commentId,
            "content": text,
        }

        axios.post(`/api/comment/update`, reqBody, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        }).then((response) => {
            const updatedComments = comments.map(comment => {
                if (comment.commentId === commentId) {
                    return {...comment, content: text};
                }
                return comment;
            })
            setComments(updatedComments);
            setActiveComment(null);
        }).catch(() => {
            alert("Wystąpił nieoczekiwany błąd");
        });
    }
    
    useEffect(() => {
        axios.get(`/api/comment?articleId=${articleId}`)
        .then((response) => setComments(response.data.comments));
    },[articleId])

    return(
        <div className='comments'>
            <h2>Lista komentarzy</h2>
            {jwt && parseJwt(jwt).scope !== "ROLE_BANNED" && (
                <>
                <div className='comment-form-title'>Napisz komentarz:</div>
                <CommentForm handleSubmit={addComment}/>
                </>
            )}
            <div className='comments-container'>
                {rootComments.map(rootComment => (
                    <Comment
                        key={rootComment.commentId}
                        comment={rootComment}
                        replies={getReplies(rootComment.commentId)}
                        deleteComment={deleteComment}
                        addComment={addComment}
                        updateComment={updateComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                    />
                ))}
            </div>
        </div>
    )
}

export default Comments;