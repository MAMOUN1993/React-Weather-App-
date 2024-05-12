import Sersh from "../components/search/serch-now";
import Temp from "../components/view/temp";
import Loading from "../components/loading/loading";
import { useSelector } from "react-redux";
import Notefi from "../components/nitef/notif";
const Home = () => {
    const boolan =useSelector (state=> state.showStatusLoading);
    const boolainNote = useSelector (state => state.shoowStatusNotefi[0])
    return ( 
        <div className="home-container">
            {boolainNote ? <Notefi/> : <></>}
            {boolan ? <Loading/> : <></>}
            <div className="home">
                <Sersh/>
                <Temp/>
            </div>
        </div>
     );
}
 
export default Home;