import { useDispatch, useSelector } from "react-redux";
import { setStatusNotefi } from "../../redux/slices/notefo";

const Notefi = () => {
    const dataPara = useSelector(state => state.shoowStatusNotefi[1])
    const dispatch = useDispatch()
    return ( 
        <div className="notifi_container">
            <div className="notifi_para">
                <h3>{dataPara}</h3>
            </div>
            <div className="x">
                <i className="fa-solid fa-xmark" 
                onClick={()=>{
                    dispatch(setStatusNotefi([false,""]))
                }}></i>
            </div>
        </div>
     );
}
 
export default Notefi;