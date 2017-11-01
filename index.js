let Container = (props) =>{
    return(
        <div className={props.class}>
            <div>
                <Titulo/>
                <div className="linea-titulo"></div>
                <Busqueda class="busqueda"/>
            </div>
            <div className="consulta">
                <SubTitulo/>
                <Resultado class="resultado clearfix"/>
                <BotonInsertar class="boton-insertar"/>
            </div>
            <div className="insertar">
                <DatosInsertar tabla="1"/>
                <Botones class="botones"/>
            </div>
        </div>
    );
};

let Titulo = () => <h2>Control de Pagos</h2>;

let Busqueda = (props) => {
    return (
        <div className={props.class}>
            <div className="busqueda-texto">Elija tabla</div>
            <select className="busqueda-seleccion">
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
                    <div className="resultado-texto">consulta 1</div>
                    <input type="button" className="boton-eliminar" value="Eliminar"/>
                    <input type="button" className="boton-modificar" value="Modificar"/>
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

let DatosInsertar = (props) =>{
    if (props.tabla === "1"){
        return <InsertarGastosIngresos/>;
    }
    else if(props.tabla === "2"){
        return <InsertarPeriodos/>;
    }
    else{
        return <InsertarPagos/>; 
    }
};

let InsertarGastosIngresos = () =>{
    return(
        <div>
            <div className="insertar-texto">Digite Nombre</div>
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

let Botones = (props) =>{
    return (
        <div className={props.class}>
            <input type="button" className="boton-guardar" value="Guardar"/>
            <input type="button" value="Cancelar"/>
        </div>
    );
};

document.addEventListener("DOMContentLoaded",() => ReactDOM.render(<Container class="container"/>,document.getElementById("app")));