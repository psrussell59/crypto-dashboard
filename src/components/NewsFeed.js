import {useState, useEffect} from 'react'
import axios from 'axios'

const NewsFeed = () =>{
    const [articles, setArticles] = useState(null)

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/news',
          };
          
          axios.request(options).then((response) => {
              setArticles(response.data)
          }).catch((error) => {
            setArticles('Error retrieving articles')
          })
    }, [])

    console.log(articles)
    const first7Articles = articles?.slice(1,25)

    return (
        <div className="news-feed">
            <div className="scroll-view">
                <h2>News Feed</h2>
                {first7Articles?.map((article, _index) => {
                    return (
                    <div key={_index}>
                        <a href={article.url} target="_blank" rel="noreferrer"><p>{article.title}</p></a>
                    </div>)
                })}
            </div>
        </div>
    )
}
export default NewsFeed