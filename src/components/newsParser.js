function newsParser (){

    const fs = require ('fs');
    const buff = [];

    function firstUnwrapFunc ( html ){
        // эта функция анврапает table
        const REGEXP = /<table class="blog_fp" cellpadding="0" cellspacing="0">(.*?)<\/table>/gms;
        return [...html.matchAll( REGEXP)];
    }

    function secondUnwrapFunc ( html ){
        // эта функция удаляет комментарии
        const REGEXP = /<!--(.*?)-->/gms;
        return html.replaceAll( /<!--(.*?)-->/gms , '').trim();

    }

    function thirdUnwrapFunc ( html ){

        const REGEXP = /<h2 class="contentheading_fp">.*?<a href="(?<pageHref>.*?)" class="contentpagetitle_fp">(?<title>.*?)<\/a>.*?<\/h2>.*?<div class="content-desc">.*?<img.*?src="(?<imgHref>.*?)"/gms;

    }

    // function unwrapdiv (html) {
    //     const REGEX = /<div class="contentpaneopen_fp clearfix">(.*?)<div class="createdate">(.*?)<\/div><\/div>/gms;
    //     return [...html.matchAll( REGEX )];
    // }
    //
    // function unwrapPreview( html ){
    //     const REGEX = /<a href="(?<link>.*?)" class="contentpagetitle_fp">(?<title>.*?)<\/a>/gms;
    //     const arr = [];
    //
    //     for (let match of [...html.matchAll( REGEX )]) {
    //
    //         const link = match.groups.link;
    //         const title = match.groups.title;
    //
    //         arr.push({
    //             link: link.replaceAll( /class..*/gms, '').trim(),
    //             title: title.replaceAll( /\\\S/gms, '' ).trim()
    //         })
    //     }
    //     return arr;
    // }

    (async () => {
        const request = await fetch('https://ks.psuti.ru/');
        const page = await request.text();
        const firstUnwrap = firstUnwrapFunc( page )[0][0];
        const secondUnwrap = secondUnwrapFunc( firstUnwrap );
        // const secondUnwrap = unwrapPreview( firstUnwrap );
        // console.log(JSON.stringify(secondUnwrap));
        fs.writeFileSync('../jsonFiles/secondUnwrap.txt', secondUnwrap.toString());
    })();

    /*

        <div class="contentpaneopen_fp clearfix">

        <div class="article-content">

        <h2 class="contentheading_fp">

        <a href="/about/ks-news/2479-2022-08-01-06-07-40.html" class="contentpagetitle_fp">
  		ФСБ России по Республике Карелия   	</a>

    */

}

newsParser();

// export default newsParser();