import {  useState  } from "react";
import Nav from "../reused/nav";
import TempShow from "../routs/tempShow";
import { useSelector } from "react-redux";
import Chart from "../chart/chart";
const Temp = () => {
    const data =useSelector (state=> state.Data);
    const [attrArry , setArry] = useState([true,false,false,false]);
    let daysArry = ["saturday", "sunday" , "monday" , "tuesday" , "wednesday" , "thursday" , "friday"];
    const dataToChartWeekly = data !== null ? ()=>{
        let localArry = [];
        let localVar =[];
        for(let i = 0 ; i < data[0].daily.apparent_temperature_max.length ; i++){
            localVar.push({"x" : daysArry[i],"y" : data[0].daily.apparent_temperature_max[i]})
        }
        localArry.push({"id":"ApTempMax","data" : localVar})
        localVar=[];
        for(let i = 0 ; i < data[0].daily.apparent_temperature_min.length ; i++){
          localVar.push({"x" : daysArry[i],"y" : data[0].daily.apparent_temperature_min[i]})
        }
        localArry.push({"id":"ApTempMin","data" : localVar})
       
        localVar=[];
        for(let i = 0 ; i < data[0].daily.temperature_2m_max.length ; i++){
          localVar.push({"x" : daysArry[i],"y" : data[0].daily.temperature_2m_max[i]})
        }
        localArry.push({"id":"TempMax","data" : localVar})
        localVar=[];
        for(let i = 0 ; i < data[0].daily.temperature_2m_min.length ; i++){
          localVar.push({"x" : daysArry[i],"y" : data[0].daily.temperature_2m_min[i]})
        }
        localArry.push({"id":"TempMin","data" : localVar})
        localVar=[];
        for(let i = 0 ; i < data[0].daily.uv_index_max.length ; i++){
          localVar.push({"x" : daysArry[i],"y" : data[0].daily.uv_index_max[i]})
        }
        localArry.push({"id":"Uv Max","data" : localVar})
        return localArry;
        } : null
    const dataToChartHourly = data !== null ? ()=>{
        let localArry = [];
        let localVar =[];
        for(let i = 0 ; i < 24 ; i+=2){
            localVar.push({"x" : i+1 ,"y" : data[0].hourly.apparent_temperature[i]})
        }
        localArry.push({"id":"ApTemp","data" : localVar})
        localVar=[];
        for(let i = 0 ; i < 24 ; i+=2){
          localVar.push({"x" : i+1 ,"y" : data[0].hourly.rain[i]})
        }
        localArry.push({"id":"rain","data" : localVar})
       
        localVar=[];
        for(let i = 0 ; i < 24 ; i+=2){
          localVar.push({"x" : i+1 ,"y" : data[0].hourly.relative_humidity_2m[i]})
        }
        localArry.push({"id":"relative_humidity","data" : localVar})
        localVar=[];
        for(let i = 0 ; i < 24 ; i+=2){
          localVar.push({"x" : i+1,"y" : data[0].hourly.temperature_2m[i]})
        }
        localArry.push({"id":"Temp","data" : localVar})
        localVar=[];
        for(let i = 0 ; i < 24 ; i+=2){
          localVar.push({"x" : i+1,"y" : data[0].hourly.wind_speed_10m[i]})
        }
        localArry.push({"id":"Wind Speed","data" : localVar})
        return localArry;
        } : null
    const dataToday = data !== null ?
        {
            wind_direction_10m : data[0].current.wind_direction_10m,
            uv_index_max : data[0].daily.uv_index_max[0],
            daily_sunrise : data[0].daily.sunrise[3].slice(11),
            daily_sunset : data[0].daily.sunset[0].slice(11),
            wind_speed_10m : data[0].current.wind_speed_10m,
            relative_humidity_2m : data[0].current.relative_humidity_2m,
            temperature_2m : data[0].current.temperature_2m,
            current_units_temperature_2m : data[0].current_units.temperature_2m,
            surface_pressure : data[0].current.surface_pressure,
            current_units_surface_pressure : data[0].current_units.surface_pressure,
            current_rain:data[0].current.rain,
            current_units_rain : data[0].current_units.rain,
            apparent_temperature_max : data[0].daily.apparent_temperature_max[0],
            apparent_temperature_min : data[0].daily.apparent_temperature_min[0],
            temperature_2m_max : data[0].daily.temperature_2m_max[0],
            temperature_2m_min : data[0].daily.temperature_2m_min[0],
        }: null ;
    const dataTomorow = data !== null ?
        {
            wind_direction_10m : data[0].hourly.wind_direction_10m[35],
            uv_index_max : data[0].daily.uv_index_max[2],
            daily_sunrise : data[0].daily.sunrise[2].slice(11),
            daily_sunset : data[0].daily.sunset[2].slice(11),
            wind_speed_10m : data[0].hourly.wind_speed_10m[35],
            relative_humidity_2m : data[0].hourly.relative_humidity_2m[35],
            temperature_2m : data[0].daily.temperature_2m_max[2],
            current_units_temperature_2m : data[0].current_units.temperature_2m,
            surface_pressure : data[0].hourly.surface_pressure[35],
            current_units_surface_pressure : data[0].current_units.surface_pressure,
            current_rain:data[0].hourly.rain[35],
            current_units_rain : data[0].current_units.rain,
            apparent_temperature_max : data[0].daily.apparent_temperature_max[1],
            apparent_temperature_min : data[0].daily.apparent_temperature_min[1],
            temperature_2m_max : data[0].daily.temperature_2m_max[1],
            temperature_2m_min : data[0].daily.temperature_2m_min[1],
        }: null ;
    function setAtrrArry(s){
        let localArry = [...attrArry];
        for(let i =0 ; i<attrArry.length ; i++){
            if(i===s){
                localArry[i]=true;
            }else{
                localArry[i]=false;
            }
        }
        setArry(()=> {return [...localArry]})
    }
    return ( 
        <div className="temp-container">
            <div className="nav-bar">
                <Nav para="today" attr={`${attrArry[0]}`} i={0} fun={setAtrrArry}></Nav>
                <Nav para="tomorrow" attr={`${attrArry[1]}`} i={1} fun={setAtrrArry}></Nav>
                <Nav para="weekly" attr={`${attrArry[2]}`} i={2} fun={setAtrrArry}></Nav>
                <Nav para="hourly" attr={`${attrArry[3]}`} i={3} fun={setAtrrArry}></Nav>
            </div>
            {data !== null ? 
            attrArry[0] ?<TempShow data={dataToday}/> :
            attrArry[1] ? <TempShow data={dataTomorow}/> :
            attrArry[2] ? <Chart comData={dataToChartWeekly}/> :
            <Chart comData={dataToChartHourly}/> : <></>}
            
        </div>
     );
}
export default Temp;