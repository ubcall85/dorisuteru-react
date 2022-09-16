import React from 'react';
import '../styles/newsStyle.css'
import news from '../jsonFiles/news.json';

function News(props) {

    return (
        <div
            className={'news'}
        >

            {news.map( ({id, title, date, link}) => (
                <element a={id}>
                    <p> {title} </p>
                    <p> {date} </p>
                    <a href={link}> {link} </a>
                </element>
            ) )}

        </div>
    );
}

export default News;