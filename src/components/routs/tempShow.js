import Show from "../reused/Show";
const TempShow = (props) => {
    let Data = props.data;
    let direction = Data.wind_direction_10m;
    let uvValue = Data.uv_index_max;
    function setUvValue (){
        switch(true){
            case (uvValue<3):
                return "Low";
            case (uvValue<6):
                return "Moderate";
            case (uvValue<8):
                return "High";
            case (uvValue<11):
                return "Very High";
            default : return "Upper limit" ;
        }
    }
    let aphightTemp = <h4><i className="fa-solid fa-arrow-up"></i> {Data.apparent_temperature_max}{Data.current_units_temperature_2m}</h4>;
    let aplowTemp = <h4><i className="fa-solid fa-arrow-down"></i> {Data.apparent_temperature_min}{Data.current_units_temperature_2m}</h4>;
    let hightTemp = <h4><i className="fa-solid fa-arrow-up"></i> {Data.temperature_2m_max}{Data.current_units_temperature_2m}</h4>
    let lowTemp = <h4><i className="fa-solid fa-arrow-up"></i> {Data.temperature_2m_min}{Data.current_units_temperature_2m}</h4>
    let sunRise = <h4>Rise {Data.daily_sunrise}</h4>;
    let sunSet = <h4>Set {Data.daily_sunset}</h4>;
    function winddirection (){
        switch(true){
            case (direction < 33.75 && direction > 11.25):
                return "NNE";
            case (direction < 56.25 && direction > 33.75):
                return "NE";
            case (direction < 78.75 && direction > 56.25):
                return "ENE";
            case (direction < 101.25 && direction > 78.75):
                return "E";
            case (direction < 123.75 && direction > 101.25):
                return "ESE";
            case (direction < 146.25 && direction > 123.75):
                return "SE";
            case (direction < 168.75 && direction > 146.25 ):
                return "SSE";
            case (direction < 191.25 && direction > 168.75):
                return "S";
            case (direction < 213.75 && direction > 191.25):
                return "SSW";
            case (direction < 236.25 && direction > 213.75 ):
                return "SW";
            case (direction < 258.75 && direction > 236.25):
                return "WSW";
            case (direction < 281.25 && direction > 258.75):
                return "W";
            case (direction < 303.75 && direction > 281.25):
                return "WNW";
            case (direction < 326.25 && direction > 303.75):
                return "NW";
            case (direction < 348.75 && direction > 326.25):
                return "NNW";
            default :return "N";
        }
    }
    return ( 
        <div className="all-data-show-container">
            <Show first={"Wind"} sec={`${Data.wind_speed_10m}KM/H`} thr={winddirection()}/>
            <Show first={"Humidity"} sec={`${Data.relative_humidity_2m} %`}/>
            <Show first={"Real Feel"} sec={`${Data.temperature_2m}${Data.current_units_temperature_2m}`}/>
            <Show first={"UV Index"} sec={`${Data.uv_index_max}`} thr={setUvValue ()}/>
            <Show first={"Pressure"} sec={Data.surface_pressure} thr={Data.current_units_surface_pressure}/>
            <Show first={"Rain"} sec={Data.current_rain} thr={Data.current_units_rain}/>
            <Show first={"Apparent Temperature"} sec={aphightTemp} thr={aplowTemp}/>
            <Show first={"Temperature"} sec={hightTemp} thr={lowTemp} />
            <Show first={"Sun"} sec={sunRise} thr={sunSet}/>
        </div>
     );
}
 
export default TempShow;