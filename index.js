let Container = (props) =>{
    return(
        <div className={props.class}>
            <Busqueda class="busqueda"/>
            <Consulta class="consulta"/>
            <BotonInsertar/>
            <Insertar/>
            <InsertarPeriodos/>
            <InsertarPagos/>
            <BotonGuardar/>
        </div>
    );
};

let Busqueda = (props) => {
    return (
        <div className={props.class}>
            <select>
                <option>opcion 1</option>
            </select>
            <input type="button" value ="Consultar"/>
        </div>
    );
};

let Consulta = (props) =>{
    return (
        <div className={props.class}>
            <ul>
                <li>
                    <div>consulta 1</div>
                    <input type="button" value="Modificar"/>
                    <input type="button" value="Eliminar"/>
                </li>
            </ul>
        </div>
    );
};

let BotonInsertar = () =>{
    return (
        <div>
            <input type="button" value="Insertar"/>
        </div>
    );
};

let Insertar = () =>{
    return(
        <div>
            <div>Digite Nombre</div>
            <input type="text"/>
        </div>
    );
};

let InsertarPeriodos = () =>{
    return(
        <div>
            <div>Elija Mes</div>
            <select>
                <option>opcion 1</option>
            </select>
            <div>Elija Ano</div>
            <select>
                <option>opcion 1</option>
            </select>
        </div>
    );
};

let InsertarPagos = () =>{
    return(
        <div>
            <div>Elija Nombre</div>
            <select>
                <option>opcion 1</option>
            </select>
            <div>Digite Valor</div>
            <input type="text"/>
        </div>
    );
};

let BotonGuardar = () =>{
    return (
        <div>
            <input type="button" value="Guardar"/>
        </div>
    );
};

document.addEventListener("DOMContentLoaded",() => ReactDOM.render(<Container class="container"/>,document.getElementById("app")));