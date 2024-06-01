import { useState } from "react";

const CommentForm=({
    handleSubmit,
    hasCancelButton = false,
    handleCancel,
    initialText = ""
}) => {
    const [text, setText] = useState(initialText);
    const isBtnDisabled = text.length === 0;

    function onSubmit (event) {
        event.preventDefault();
        handleSubmit(text);
        setText("");
    };

    return(
        <form className="comment-form" onSubmit={onSubmit}>
            <textarea className="textarea" value={text} onChange={(event) => setText(event.target.value)}/>
            <button className="button" disabled={isBtnDisabled}>Zapisz</button>
            {hasCancelButton && (
                <button type="button" className="button cancel-button" onClick={handleCancel}>Anuluj</button>
            )}
        </form>
    )
}

export default CommentForm;