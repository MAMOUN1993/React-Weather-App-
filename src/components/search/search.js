const Search = (props) => {
    const data = props.data[0];
    const stoped= props.stop;
    return (
        <div className="Search-compont" 
        onMouseEnter={()=>{
            stoped(false)
        }}
        onMouseLeave={()=>{
            stoped(true)
        }}
        >
            {data.map((s,i)=>{
                return <div key={i}>
                            <h2
                                onClick={()=>{ 
                                    if(s.name.common !== "Sorry "){
                                        props.getinf(s)
                                    }
                                }}
                            >{s.name.common}/{s.continents[0]}</h2>    
                        </div>
            })}
        </div>
     );
}
 
export default Search;