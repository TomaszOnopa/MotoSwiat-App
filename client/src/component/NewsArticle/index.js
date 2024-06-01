import './styles.css';

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ImageSlider from "../ImageSlider"
import Comments from '../Comments';
import axios from 'axios';

const NewsArticle=()=> {
    const path = useLocation().pathname;
    const id = path.split("/").at(2);
    const [article, setArticle] = useState({}); 
    const [articleList, setArticleList] = useState([]);

    const [comments, setComments] = useState(false)

    useEffect(() => {
        axios.get(`/api/article/get?id=${id}`)
        .then((response) => setArticle(response.data.article))
        .catch(() => window.location.href = "/404");

        axios.get(`/api/article/list?size=5`)
        .then((response) => setArticleList(response.data.articles));
    }, [id]);

    const SidebarArticles=() => {
        if (articleList) {
            return (
                articleList.map((article, index) =>
                    <div key={index}>
                        <Link to={`/artykul/${article.articleId}`}>{article.title}</Link>
                    </div>
                )
            )
        }
    }
    const ArticleContent=() => {
        if (article.content) {
            return (
                article.content.map((p, index) => <p key={index}>{p}</p>)
            )
        }
    }

    if (article && article.date) {
        const date = article.date.split("T").at(0);
        const time = article.date.split("T").at(1).split(".").at(0);

        return(
            <main className="container">
                <div className='breadcrumbs'>
                    <Link to='/'>MotoŚwiat</Link>
                    <span> &gt; </span>
                    <Link to='/wiadomosci'>Wiadomości</Link>
                    <span> &gt; {article.title}</span>
                </div>
                <div className="content-wrapper">
                    <div className='sidebar' style={{marginTop: 20+"px"}}>
                        <div className='sidebar-element'>
                            <h4>
                                Zobacz również
                            </h4>
                            <SidebarArticles/>
                        </div>
                    </div>
                    <div className='main-container'>
                        <div className='article-headline'>
                            <h1 className='title'>{article.title}</h1>
                            <div className='details'>
                                {article.authorImg ?
                                <img className='img' src={`/user/${article.authorId}`} alt=''  width='30' height='30' /> :
                                <img className='img' src={`/default-avatar.jpg`} alt='' width='30' height='30' />}
                                <span className='author-name'>{article.authorName} {article.authorSurname} </span>
                                <span className='date'>{date} {time}</span>
                            </div>
                        </div>
                        {article.attachments.length > 0 ? 
                            <div className='slider-container'>
                                <ImageSlider slides={article.attachments}/>
                            </div> : <></>}
                        <ArticleContent/>
                        <button className='button' onClick={() => setComments(!comments)}>Pokaż/Ukryj komentarze</button>
                        {comments ? <Comments articleId={id}/> : ""}
                    </div>
                </div>
            </main>
        );
    }
}

export default NewsArticle;