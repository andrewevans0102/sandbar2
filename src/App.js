import React from "react";
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                {Routes()}
            </BrowserRouter>
        </div>
    );
}

export default App;
