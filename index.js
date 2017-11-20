class Container extends React.Component {

    constructor(){
        super();
        this.display=[{display:"none"},{display:"block"}];
        this.state = {
            tableName: null,
            show: false
        };
    }

    searchChanged(tableName){
        this.setState(state => {
            state.tableName = tableName;
            return state;
        });
    }

    showDisplay(show){
        this.setState(state => {
            state.show = show;
            return state;
        });
    }
    
    render(){
    return(
        <div className="container">
            <div>
                <h2>Control de Pagos</h2>
                <div className="line-title"></div>
                <Search/>
                <div className="line-title"></div>
            </div>
            <div className="query">
                <h4>Resultado de la Consulta</h4>
                <Result/>
            </div>
            <div className="insert">
                <h4>Insertar nuevo elemento</h4>
                <DataInsert table="1"/>
            </div>
        </div>
    );
};

let Search = () => {
    return (
        <div className="search">
            <div className="search-text">Elija tabla</div>
            <select className="search-selection">
                <option></option>
                <option>Ingresos</option>
                <option>Gastos</option>
                <option>Periodos</option>
                <option>Pagos Recibidos</option>
                <option>Pagos Realizados</option>
            </select>
            <input type="button" className="search-consultar" value ="Consultar"/>
            <input type="button" value="Insertar"/>
        </div>
    );
};

let Result = () =>{
    return (
        <div className="result">
            <ul>
                <li className="clearfix result-li">
                    <div className="result-text">Consulta 1</div>
                    <input type="button" className="result-eliminar" value="Eliminar"/>
                    <input type="button" className="result-modificar" value="Modificar"/>
                </li>
                <li className="clearfix result-li">
                    <div className="result-text">Consulta 2</div>
                    <input type="button" className="result-eliminar" value="Eliminar"/>
                    <input type="button" className="result-modificar" value="Modificar"/>
                </li>
            </ul>
        </div>
    );
};

let DataInsert = (props) =>{
    let form;
    if (props.table === "1"){
        form = <InsertExpensesIncom/>;
    }
    else if(props.table === "2"){
        form = <InsertPeriods/>;
    }
    else{
        form = <InsertPayments/>; 
    }
    return (
        <div className="form">
            {form}
            <Buttons/>
        </div>
    );
};

let InsertExpensesIncom = () =>{
    return(
        <div>
            <div className="form-text">Digite Nombre</div>
            <div className="form-text">
                <input type="text"/>
            </div>
        </div>
    );
};

let InsertPeriods = () =>{
    return(
        <div className="form-period">
            <div className="form-general">
                <div className="form-text">Elija Mes</div>
                <div className="form-text">
                    <select>
                        <option>Opcion 1</option>
                    </select>
                </div>
            </div>
            <div className="form-general">
                <div className="form-text">Elija Ano</div>
                <div className="form-text">
                    <select>
                        <option>Opcion 1</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

let InsertPayments = () =>{
    return(
        <div>
            <InsertPeriods/>
            <div className="form-general">
                <div className="form-text">Elija Nombre</div>
                <div className="form-text">
                    <select>
                        <option>Opcion 1</option>
                    </select>
                </div>
            </div>
            <div className="form-general">
                <div className="form-text">Digite Valor</div>
                <div className="form-text">
                    <input type="text"/>
                </div>
            </div>
        </div>
    );
};

let Buttons = () =>{
    return (
        <div className="buttons">
            <input type="button" className="button-guardar" value="Guardar"/>
            <input type="button" value="Cancelar"/>
        </div>
    );
};

document.addEventListener("DOMContentLoaded",() => ReactDOM.render(<Container/>,document.getElementById("app")));