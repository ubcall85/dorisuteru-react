function newsParser (){

    const fs = require ('fs');
    const buff = [];

    function unwrapdiv (html) {
        const REGEX = /<div class="contentpaneopen_fp clearfix">(.*?)<div class="createdate">(.*?)<\/div><\/div>/gms;
        return [...html.matchAll( REGEX )];
    }

    function unwrapPreview( html ){
        const REGEX = /<a href="(?<link>.*?)" class="contentpagetitle_fp">(?<title>.*?)<\/a>/gms;
        const arr = [];

        for (let match of [...html.matchAll( REGEX )]) {

            const link = match.groups.link;
            const title = match.groups.title;

            arr.push({
                link: link.replaceAll( /class..*/gms, '').trim(),
                title: title.replaceAll( /\\\S/gms, '' ).trim()
            })
        }
        return arr;
    }

    (async () => {
        const request = await fetch('https://ks.psuti.ru/');
        const page = await request.text();
        const firstUnwrap = unwrapdiv( page ) [0][0];
        const secondUnwrap = unwrapPreview( firstUnwrap );
        console.log(JSON.stringify(secondUnwrap));
        fs.writeFileSync('../jsonFiles/secondUnwrap.txt', JSON.stringify(secondUnwrap, null, '\t'));
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