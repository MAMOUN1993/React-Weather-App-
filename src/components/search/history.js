const History = (props) => {
    const data = props.data[0];
    const stoped= props.control;
    return ( 
        <div className="hostory-container" 
        onMouseEnter={()=>{
            stoped("i")
        }}
        onMouseLeave={()=>{
            stoped("l")
        }}>
            {data !== null & props.hofouc === true ? data.map((s,i)=>{
                return <div key={i}>
                            <h2
                            onClick={()=>{
                                props.getinfhistory(s)
                            }}
                            >{s.name.common}/{s.continents[0]}</h2>
                            <i 
                            onClick={()=>{
                                props.delete(s.name.common)
                            }} className="fa-solid fa-xmark"></i>   
                        </div>
            }) :
            <></>}
        </div>
     );
}
export default History;