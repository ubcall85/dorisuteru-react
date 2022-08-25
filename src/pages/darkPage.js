import React from 'react';
import Sidebar from "../components/Sidebar";
import '../styles/darkpage.css';
import News from "../components/News";

function DarkPage(props) {
    return (
        <div>
            <Sidebar></Sidebar>
            <News></News>
        </div>
    );
}

export default DarkPage;