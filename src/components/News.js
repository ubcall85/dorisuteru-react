import React from 'react';
import '../styles/newsStyle.css'
import news from '../jsonFiles/news.json';

function News(props) {

    return (
        <div
            className={'news'}
<<<<<<< HEAD
        >

            {news.map( ({id, title, date, link}) => (
                <element a={id}>
                    <p> {title} </p>
                    <p> {date} </p>
                    <a href={link}> {link} </a>
                </element>
            ) )}
=======
         >
>>>>>>> c42665924893bdce830b444fd2f906c58b812365

        </div>
    );
}

export default News;