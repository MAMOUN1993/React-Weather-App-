const Nav = (props) => {
    return ( 
        <div className="nav-items">
            <h2 
            onClick={()=>{
                props.fun(props.i)
            }}
            attr={props.attr}>{props.para}
            </h2>
        </div>
     );
}
 
export default Nav;