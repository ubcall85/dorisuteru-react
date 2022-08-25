import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ClearPage from "./pages/clearPage";
import DarkPage from "./pages/darkPage";

function App() {
  return (
      <BrowserRouter>
        <div className="container">
          <Routes>
              <Route path = {'/'} element={<ClearPage/>} />
              <Route path = {'/darkpage'} element={<DarkPage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
