let Container = (props) =>{
    return(
        <div className={props.class}>
            <div className="consulta">
                <Titulo/>
                <Busqueda class="busqueda"/>
                <SubTitulo/>
                <Resultado class="resultado"/>
                <BotonInsertar class="boton-insertar"/>
            </div>
            <div className="insertar">
                <Insertar tabla="3" class="datos-insertar"/>
                <BotonGuardar class="boton-guardar"/>
            </div>
        </div>
    );
};

let Titulo = () => <h2>Control de Pagos</h2>;

let Busqueda = (props) => {
    return (
        <div className={props.class}>
            <div>Elija tabla a consultar</div>
            <select>
                <option>opcion 1</option>
            </select>
            <input type="button" value ="Consultar"/>
        </div>
    );
};

let SubTitulo = () => <h4>Resultado de la Busqueda</h4>;

let Resultado = (props) =>{
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

let BotonInsertar = (props) =>{
    return (
        <div className={props.class}>
            <input type="button" value="Insertar"/>
        </div>
    );
};

let Insertar = (props) =>{
    let formulario;
    if (props.tabla === "1"){
        formulario = <InsertarGastosIngresos/>;
    }
    else if(props.tabla === "2"){
        formulario = <InsertarPeriodos/>;
    }
    else{
        formulario = <InsertarPagos/>; 
    }
    return(
        <div className={props.class}>
            {formulario}
        </div> 
    );
};

let InsertarGastosIngresos = () =>{
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
            <InsertarPeriodos/>
            <div>Elija Nombre</div>
            <select>
                <option>opcion 1</option>
            </select>
            <div>Digite Valor</div>
            <input type="text"/>
        </div>
    );
};

let BotonGuardar = (props) =>{
    return (
        <div className={props.class}>
            <input type="button" value="Guardar"/>
        </div>
    );
};

document.addEventListener("DOMContentLoaded",() => ReactDOM.render(<Container class="container"/>,document.getElementById("app")));