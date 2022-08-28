function newsParser (){

    const fs = require ('fs');
    const buff = [];

    function UnwrapFunc ( html ){

        const REGEXP = /<h2 class="contentheading_fp">.*?<a href="(?<pageHref>.*?)" class="contentpagetitle_fp">(?<title>.*?)<\/a>.*?<\/h2>.*?<div class="content-desc">.*?<img.*?src="(?<imgHref>.*?)".*?<div class="createdate"(?<createDate>.*?)<\/div>/gms

        for (match of [...html.matchAll( REGEXP )]){
            const pageHref = match.groups.pageHref;
            const title = match.groups.title;
            const imgHref = match.groups.imgHref;
            const createDate = match.groups.createDate;

            buff.push({
                pageHref: pageHref,
                title: title.replaceAll( /\\\S/gms, '' ).trim(),
                imgHref: imgHref,
                createDate: createDate.replaceAll('>', '').trim()
            })
        }

        return buff;
    }


    function check ( unwrap ){
        const news = fs.readFileSync('../jsonFiles/news.json');
        const dataIn = fs.readFileSync('../jsonFiles/data-in.json');

        if (news === dataIn){
            return true;
        } else {

        }

    }


    (async () => {
        const request = await fetch('https://ks.psuti.ru/');
        const page = await request.text();
        const unwrap = UnwrapFunc( page );
        check( unwrap );
        // fs.writeFileSync('../jsonFiles/news.json', JSON.stringify(unwrap, null, '\t'));
    })();

}

newsParser();

// export default newsParser();