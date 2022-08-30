function teachersParser (){
    const fs = require('fs');
    const buff = [];

    async function tableUnwrapFunc( html ){
        const REGEXP = /<td  bgcolor='eeeeee' align=center><a href='\?mn=3&obj=(?<obj>.*?)'><b>(?<name>.*?)<\/b><\/a>/gms;

        for (let match of [...html.matchAll( REGEXP )]) {
            const obj = match.groups.obj;
            const name = match.groups.name;

            buff.push({
                name: name,
                obj: obj,
                href: `https://lk.ks.psuti.ru/?mn=3&obj=${obj}`,
                lessons: '',
                cabinet: ''
            })
        }
        await scheduleUnwrap();
    }

    async function scheduleUnwrap() {
        for (let el of buff) {
            const requests = await fetch(el.href);
            const page = await requests.text();

            // fs.writeFileSync(`../jsonFiles/${el.obj}.txt`, page)

            el.cabinets = [];
            el.lessons = [];

            function lessonUnwrap (page){
                const REGEXP = /<td  width='62%' bgcolor='ffffff' align='center'><b>(?<lessons>.*?)<\/b>(.*?)<td  width='11%' bgcolor='ffffff' align='center'>(?<cabinet>.*?)<\/td>/gms;

                for (let match of [...page.matchAll( REGEXP )]){

                    const lessons = match.groups.lessons;
                    const cabinet = match.groups.cabinet;

                    el.cabinets.push(cabinet);
                    el.lessons.push(lessons);
                    // console.log(cabinet);
                }

                el.cabinets = remove_duplicates( el.cabinets );
                el.lessons = remove_duplicates( el.lessons );
            }

            lessonUnwrap( page );
        }
    }

    function remove_duplicates( a ) {
        let obj = {};
        a.forEach( e => obj[e] = true );
        return Object.keys(obj);
    }

    (async () => {
        const request = await fetch('https://lk.ks.psuti.ru/?mn=3');
        const page = await request.text();

        const firstUnwrap = await tableUnwrapFunc( page );
        console.log(buff);
        // fs.writeFileSync('../jsonFiles/fut.txt', page)
    })();
}

teachersParser();