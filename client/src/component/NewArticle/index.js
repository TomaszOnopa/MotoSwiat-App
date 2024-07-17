import "./styles.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocalState } from "../../util/useLocalStorage";
import axios from "axios";

const NewArticle=()=> {
    // eslint-disable-next-line no-unused-vars
    const [jwt, setJwt] = useLocalState("", "jwt");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);

    const [error, setError] = useState("");

    const isBtnDisabled = !(title && content && files.length > 0);

    function validate () {
        setError("");

        if (title.length > 255) {
            setError("Tytuł może zawierać maskymalnie 255 znaków");
            return false;
        }
        return true;
    }

    function createArticle () {
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append("file", files[i]);
        }

        axios.post(`/api/article/add-img`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${jwt}`,
            },
        }).then((response) => {
            const filenames = response.data.filenames;

            const reqBody = {
                "title": title,
                "content": content,
                "filenames": filenames,
            }

            axios.post(`/api/article/add-article`, reqBody, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            }).then(() => {
                alert(`Artykuł został dodany`);
                window.location.href = "/";
            }).catch(() => {
                alert("Wystąpił nieoczekiwany błąd");
            });
            
        }).catch(() => {
            alert("Wystąpił nieoczekiwany błąd");
        });
    }

    function onSubmit (event) {
        event.preventDefault();
        if(!validate())
            return;
        createArticle();
    };

    return(
        <main className="container">
            <div className='breadcrumbs'>
                <Link to='/'>MotoŚwiat</Link>
                <span> &gt; Dodaj artykuł</span>
            </div>
            <div className="content-wrapper">
                <form className="form article-form" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="title"><h3>Tytuł:</h3></label>
                    </div>
                    <div>
                        <input type='text' id="title" value={title} onChange={(event) => setTitle(event.target.value)}/>
                    </div>
                    {error ? <div className="error">{error}</div> : null}
                    <div>
                        <label htmlFor="body"><h3>Treść:</h3></label>
                    </div>
                    <div>
                        <textarea id="body" value={content} onChange={(event) => setContent(event.target.value)}/>
                    </div>
                    <div>
                        <input type='file' accept="image/png, image/jpeg" multiple  onChange={(event) => setFiles(event.target.files)}/>
                    </div>
                    <div>
                        <button disabled={isBtnDisabled}>Zatwierdź</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default NewArticle;