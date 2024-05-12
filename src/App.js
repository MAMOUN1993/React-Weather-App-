import { useEffect } from "react";
import Home from "./page/home";

const App = () => {
    
    useEffect(()=>{
        document.title="Weather App";
    });
    return ( 
        <div className="main-class">
            
            <Home/>
        </div>
     );
}
export default App;