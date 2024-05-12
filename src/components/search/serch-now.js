import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Search from "./search";
import History from "./history";
import { useDispatch } from "react-redux";
import { saveDataWeather } from "../../redux/slices/weatherData";
import { setStatusLoading } from "../../redux/slices/boolainLoading";
import { setStatusNotefi } from "../../redux/slices/notefo";
import snowdrizl from "../../svg/cloud-snow-icon.svg";
import sunsNowDrizl from "../../svg/day-cloud-snow-icon.svg";
import thunderLight from "../../svg/cloud-snow-lightning-icon.svg";
const Sersh = () => {
    const currentDate = new Date();
    const currentDatetoarry = currentDate.toString().split(" ");
    const moon = <i className="fa-regular fa-moon"></i>;
    const sun = <i className="fa-regular fa-sun"></i>;
    const cloudsun = <i className="fa-solid fa-cloud-sun"></i>;
    const cloumoon = <i className="fa-solid fa-cloud-moon"></i>;
    const fog = <i className="fa-solid fa-smog"></i>;
    const cloudRainsun = <i className="fa-solid fa-cloud-sun-rain"></i>;
    const cloudRainMoon = <i className="fa-solid fa-cloud-moon-rain"></i>;
    const cloudRain = <i className="fa-solid fa-cloud-rain"></i>;
    const snowFoling = <i className="fa-solid fa-cloud-meatball"></i> ;
    const rianShower = <i className="fa-solid fa-cloud-showers-heavy"></i>;
    const snow = <i className="fa-regular fa-snowflake"></i>
    const thunder = <i className="fa-solid fa-cloud-bolt"></i>
    const [wheatherCode , setWeatherCode ] = useState("Sunny")
    const [weatherIcone ,setWeatherIcone] = useState(sun);
    const [dataHistory , setDataHistory] = useState(null);
    const dispatch = useDispatch()
    const [searchFoucs , setSearch] =useState(false);
    const [hIstoryFoucs ,setHestory] = useState(false)
    const [dataFromAxios , setDataAxios] = useState(null);
    const [contryName , setcontry] = useState(null);
    const [capitalName , setCapital] = useState(null);
    const [longitude , setLong] = useState(null);
    const [Latitude , setLait] = useState(null);
    const [TimeZone , setTimezone] = useState("auto")
    const [dataWeatherApi , setDataWeatherApi] = useState(null);
    const [stopblur , setStopBlur] = useState(true);
    const inputRef = useRef();
    const noResult = [[{name : {"common": "Sorry "} ,continents:[" no matching results"]}]];
    function getLongAndlait (x){
        dispatch(setStatusLoading(true))
        setLong(x.capitalInfo.latlng[1]);
        setLait(x.capitalInfo.latlng[0]);
        setCapital(x.capital[0]);
        setcontry(x.name.common.split(",",1));
        inputRef.current.value="";
        savetolocalstorge(x);
        getdatafromlocalstorg();
        GetWeatherFromApi(x.capitalInfo.latlng[1],x.capitalInfo.latlng[0],TimeZone);
        setSearch(false);
        ShowHideloadingAndnotefi("Data from the selected country has been added")
    };
    function ShowHideloadingAndnotefi (y){
        setTimeout(() => {
            dispatch(setStatusLoading(false))
            dispatch(setStatusNotefi([true,y]))
        }, 300);
        setTimeout(()=>{
            dispatch(setStatusNotefi([false,""]))
        },5300);
    }
    async function GetWeatherFromApi(x,y,T,z){
        await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${y}&longitude=${x}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,rain,weather_code,wind_speed_10m,surface_pressure,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max&timezone=${T}`)
            .then(response => {
                setDataWeatherApi([response.data])
                dispatch(saveDataWeather([response.data]));
                setWeatherIcone(setweatherconde(response.data.current.weather_code,response.data.current.is_day));
                if(z){
                    getCapitalCity(response.data.timezone.split("/")[1])
                }
            }, error => {
                ShowHideloadingAndnotefi("Sorry we cant get data please try agine later")
            });
    };
    function setweatherconde(x,y){
        switch(true){
            case (x===0 && y===0): 
            setWeatherCode("Clear Sky");
            return moon;
            case (x===0 && y===1): 
            setWeatherCode("Sunny");
            return sun;
            case ((x===3 || x===1 || x===2) && y===0): 
            setWeatherCode("Mainly Clear");
            return cloumoon;
            case ((x===3 || x===1 || x===2) && y===1): 
            setWeatherCode("Mainly Clear");
            return cloudsun;
            case (x===45 || x === 48) : 
            setWeatherCode("Fog");
            return fog;
            case ((x===51 || x === 53 || x === 55) && y === 0) : 
            setWeatherCode("Drizzle");
            return cloudRainMoon;
            case ((x===51 || x === 53 || x === 55) && y === 1) : 
            setWeatherCode("Drizzle");
            return cloudRainsun;
            case (x===56 || x === 57) : 
            setWeatherCode("Freezing Drizzle");
            return <img src={sunsNowDrizl} alt=""/>;
            case (x===61 || x === 63 || x ===65) : 
            setWeatherCode("Rain");
            return cloudRain ;
            case (x===67 || x === 66 ) : 
            setWeatherCode("Freezing Rai;n")
            return <img src={snowdrizl} alt=""/> ;
            case (x===73 || x === 71 ||x === 75) : 
            setWeatherCode("Snow Fali");
            return snowFoling ;
            case (x===86 || x === 85 ) : 
            setWeatherCode("Snow Showers");
            return snowFoling ;
            case (x===80 || x === 81 ||x === 82) : 
            setWeatherCode("Rain Showers");
            return rianShower ;
            case (x===95) : 
            setWeatherCode("ThunderStorm");
            return thunder ;
            case (x===96 || x === 99) : return thunderLight ;
            case (x===77) :
            setWeatherCode("ThunderStorm With heavy hail") ;
            return snow ;
            default: return sun;
        }
    }
    function getdatafromlocalstorg (){
        let localArry = [[]] ;
        if(localStorage.length !== 0){
            for (const [key, value] of Object.entries(localStorage)) {
                let localVar = value.split(",") ;
                localArry[0].push({name : {common : key},continents : [localVar[0]],capitalInfo : {latlng : [localVar[2],localVar[1]]},capital:[localVar[3]]}) 
            };
        };
        setDataHistory([...localArry])
    };
    function savetolocalstorge(x){
        let localVar = `${x.continents[0]},${x.capitalInfo.latlng[1]},${x.capitalInfo.latlng[0]},${x.capital[0]}`;
        localStorage.setItem(`${x.name.common.split(',',1)}`, localVar)
    };
    function getInfoFromHistry(x) {
        dispatch(setStatusLoading(true))
        GetWeatherFromApi(x.capitalInfo.latlng[1],x.capitalInfo.latlng[0],TimeZone);
        setLong(x.capitalInfo.latlng[1]);
        setLait(x.capitalInfo.latlng[0]);
        setCapital(x.capital[0]);
        setcontry(x.name.common);
        setHestory(false);
        ShowHideloadingAndnotefi("Data from the history countrys has been added")
    }
    function deleteaitmfromhistory (x){
        localStorage.removeItem(x)
        getdatafromlocalstorg()
        setTimeout(() => {
            if(localStorage.length!==0){
                setHestory(true)
            }else{
                setHestory(false)
            }
        }, 100);
        
    };
    function getCuurentLoucation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPostion,showError)
        }else{
            ShowHideloadingAndnotefi("Sorry your browser is not supported ")
        }
    }

    function showError(error) {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            ShowHideloadingAndnotefi("User denied the request for Geolocation.")
            break;
          case error.POSITION_UNAVAILABLE:
            ShowHideloadingAndnotefi("Location information is unavailable.")
            break;
          case error.TIMEOUT:
            ShowHideloadingAndnotefi("The request to get user location timed out.")
            break;
          case error.UNKNOWN_ERROR:
            ShowHideloadingAndnotefi("An unknown error occurred.")
            break;
            default : 
            ShowHideloadingAndnotefi("Sorry something wrong")
        }
      }
    async function getCapitalCity(x){
        await axios.get(`https://restcountries.com/v3.1/capital/${x}`)
        .then(response => {
            setCapital(response.data[0].capital[0]);
            setcontry(response.data[0].name.common);
        }).catch(()=>{
            
        })
    }
    function showPostion(position){
        setLong(position.coords.longitude);
        setLait(position.coords.latitude);
        GetWeatherFromApi(position.coords.longitude,position.coords.latitude,TimeZone,true);
        ShowHideloadingAndnotefi("The current location has been loaded");
    }
    async function getCountry (e){
        if(e!==""){
            setHestory(false)
            await axios.get(`https://restcountries.com/v3.1/name/${e}`)
            .then(response => {
                setDataAxios([response.data]);
                setSearch(true);
            }, error => {
                if(error.message !== "Network Error"){
                    setDataAxios([...noResult]);
                }else{
                    dispatch(setStatusNotefi([true,"There is no internet connection, please check and try again"]))
                    setTimeout(() => {
                        dispatch(setStatusNotefi([false,""]))
                    }, 5000);
                }              
            });
        }else{
            setSearch(false);
            setHestory(true);
        }; 
    };
    function sethistorytodefault(s){
        if(s==="i"){
            setStopBlur(false);
        }else{
            setStopBlur(true);
            inputRef.current.focus();
        } 
    }
    async function changeTimezone(e){
        if(e==="Auto"){
            setTimezone(e);
        }else{
            if(e==="GMT"){
                setTimezone(e);
            }else{
                setTimezone(e);
            };
        };
        GetWeatherFromApi(Latitude,longitude,TimeZone);
    };

    useEffect(()=>{
        getdatafromlocalstorg();
        getCuurentLoucation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    return ( 
    <div className="temp-and-search-container">
        <div className="search-container" attr={`${searchFoucs}`} secattr={`${hIstoryFoucs}`}
         onFocus={()=>{
            if(inputRef.current.value===""){
                if(localStorage.length!==0){
                    setHestory(true)
                }
            }else{
                setSearch(true);
            }
        }}
        onBlur={()=>{
            if(stopblur){
                setHestory(false);
                setSearch(false);
            }
        }}>
            <div>
                <input placeholder="egypt" ref={inputRef} onChange={
                    (e)=>{
                        getCountry(e.target.value)
                    }}></input>
            <i className="fa-solid fa-magnifying-glass" 
            onClick={()=>{
            dispatch(setStatusLoading(true))
            getCuurentLoucation()
            }}></i>
            </div>
            {dataHistory !==null && hIstoryFoucs ===true ? <History data={dataHistory} getinf={getLongAndlait} delete={deleteaitmfromhistory} hofouc={hIstoryFoucs} control={sethistorytodefault} getinfhistory={getInfoFromHistry}/>:<></>}
            {dataFromAxios !== null && searchFoucs === true ? <Search data={dataFromAxios} getinf={getLongAndlait} setsearchprop={setSearch} stop={setStopBlur}/>:<></>}
        </div>
        <div className="weather-icone-container">
            {weatherIcone}
        </div>
        <div className="temp-line-weather">
            <div className="temp">
                {dataWeatherApi !== null ?<h1>{dataWeatherApi[0].current.apparent_temperature}&deg;c</h1> : <h1>14&deg;c</h1>}
            </div>
            <div className="weather-result">
                <h2>{wheatherCode}</h2>
            </div>
            <div className="line"></div>
        </div>
        <div className="date">
            <h3>{`${currentDatetoarry[2]} ${currentDatetoarry[1]} ${currentDatetoarry[3]}`}</h3>
            <h2>{`${currentDatetoarry[0]} , ${currentDatetoarry[4].slice(0,5)}`}</h2>
            {dataWeatherApi !== null ? dataWeatherApi[0].current.is_day === 0 ?  <h3>Night</h3> :<h3>Day</h3> : <></>}
        </div>
        <div className="louction">
            {capitalName !==null && contryName!==null ? <h1>{contryName} , {capitalName}</h1> : <h1>Egypt , Cairo</h1>}
        </div>
        <div className="time_zone">
            <label htmlFor="timezone">Choose timezone</label>
            <select name="timezone" onChange={(e)=>{
                changeTimezone(e.target.value)
            }}>
                <option value="auto">Automatic detect time zone</option>
                <option value="America%2FAnchorage">America/Anchorage</option>
                <option value="America%2FLos_Angeles">America/Los_Angeles</option>
                <option value="America%2FDenver">America/Denver</option>
                <option value="America%2FChicago">America/Chicago</option>
                <option value="America%2FNew_York">America/New_York</option>
                <option value="America%2FSao_Paulo">America/Sao_Paulo</option>
                <option value="GMT">GMT</option>
                <option value="Europe%2FLondon">Europe/London</option>
                <option value="Europe%2FBerlin">Europe/Berlin</option>
                <option value="Europe%2FMoscow">Europe/Moscow</option>
                <option value="Africa%2FCairo">Africa/Cairo</option>
                <option value="Asia%2FBangkok">Asia/Bangkok</option>
                <option value="Asia%2FSingapore">Asia/Singapore</option>
                <option value="Asia%2FTokyo">Asia/Tokyo</option>
                <option value="Australia%2FSydney">Australia/Sydney</option>
                <option value="Pacific%2FAuckland">pacific/Auckland</option>
            </select>
        </div>
    </div>
     );
}
export default Sersh;