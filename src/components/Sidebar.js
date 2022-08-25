import React from 'react';
import camel from '../assets/camel.png';
import { FaLinux } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";


function Sidebar(props) {

    function addActive (){
        document.querySelector('.sidebar').classList.toggle('active');
        // document.querySelector('.content').classList.toggle('active');
        document.querySelector('.camel').classList.toggle('active');
    }

    return (
        <div className={'sidebar'}>
            <ul>
                <li>
                    <a href={"#"}>
                        <span className={"logo"}><FaLinux/></span>
                        <span className={"name"}>DORISUTERU</span>
                    </a>
                </li>
                <li>
                    <a href={"#"}>
                        <span className={"logo"}><FaEnvelope/></span>
                        <span className={"name"}>Почта</span>
                    </a>
                </li>
                <li>
                    <a href={"#"}>
                        <span className={"logo"}><FaDatabase/></span>
                        <span className={"name"}>База</span>
                    </a>
                </li>
                <li>
                    <a href={"#"}>
                        <span className={"logo"}><FaCalendarAlt/></span>
                        <span className={"name"}>Расписание</span>
                    </a>
                </li>
            </ul>
            <img src={camel} alt={'camel'} className={'camel'} onClick={addActive} />
        </div>
    );
}

export default Sidebar;