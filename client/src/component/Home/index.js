import './styles.css';

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

const Home=()=> {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get(`/api/article/list?&size=6`)
        .then((response) => setArticles(response.data.articles));
    }, []);

    const ArticleList=()=> {
        return(
            articles.map((article, index) => 
            <div className='home-article-container' key={index}>
                <Link to={`/artykul/${article.articleId}`}>
                    <div className='home-article-img-container'>
                        {article.image ?
                        <img className='home-article-img' src={`/img/${article.image}`} alt='' /> :
                        <img className='home-article-img' src={`/no-image.jpg`} alt='' />}
                    </div>
                    <h2 className='home-article-title'>
                        {article.title}
                    </h2>
                </Link>
            </div>
            )
        )
    };

    return(
        <main className="container">
            <div className='home-list-container'>
                <ArticleList/>
            </div>
        </main>
    );
}

export default Home;