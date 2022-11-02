function teachersParser (){
    const fs = require('fs');
    const buff = [];

    async function tableUnwrapFunc( html ){
        const REGEXP = /<td  bgcolor='eeeeee' align=center><a href='\?mn=3&obj=(?<obj>.*?)'><b>(?<name>.*?)<\/b><\/a>/gms;

        for (let match of [...html.matchAll( REGEXP )]) {
            const obj = match.groups.obj;
            const name = match.groups.name;

            // console.log(obj);

            buff.push({
                name: name,
                obj: obj,
                hrefZero: `https://lk.ks.psuti.ru/?mn=3&obj=${obj}&wk=149`,
                hrefOne: `https://lk.ks.psuti.ru/?mn=3&obj=${obj}&wk=150`,
                lessons: '',
                cabinet: ''
            })
        }
        await scheduleUnwrap();
    }

    async function scheduleUnwrap() {
        for (let el of buff) {
            const requestsZero = await fetch(el.hrefZero);
            const requestsOne = await fetch(el.hrefOne);

            const pageZero = await requestsZero.text();
            const pageOne = await requestsOne.text();

            // fs.writeFileSync(`../jsonFiles/${el.obj}.txt`, page)

            el.cabinet = [];
            el.lessons = [];

            function lessonUnwrap ( page ){
                const REGEXP = /<td  width='62%' bgcolor='ffffff' align='center'><b>(?<lessons>.*?)<\/b>(.*?)<td  width='11%' bgcolor='ffffff' align='center'>(?<cabinet>.*?)<\/td>/gms;

                for (let match of [...page.matchAll( REGEXP )]){

                    const lessons = match.groups.lessons;
                    const cabinet = match.groups.cabinet;

                    el.cabinet.push(cabinet);
                    el.lessons.push(lessons);
                    // console.log(cabinet);
                }

                el.cabinet = remove_duplicates( el.cabinet );
                el.lessons = remove_duplicates( el.lessons );
            }

            lessonUnwrap( pageZero );
            lessonUnwrap( pageOne );
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
        fs.writeFileSync('../jsonFiles/newTeachers.json', JSON.stringify(buff, null, '\t'))
    })();
}

teachersParser();