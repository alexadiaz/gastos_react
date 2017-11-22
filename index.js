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
                <h2>Control de Pagos</h2>
                <div className="line-title"></div>
                <Search onSearchChange={(table) => this.searchChanged(table)}/>
                <div className="line-title"></div>
                <Query display={this.state.show ? this.display[1]: this.display[0]} onShowDisplay={(show)=> this.showDisplay(show)} table={this.state.tableName}/>
                <Insert/>
            </div>
        );
    }
}

class Search extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            tableName: null
        };
    }
   
    handleClick(){
        this.props.onSearchChange(this.state.tableName);
    }

    optionChanged(event){
        let value = event.target.value;
        this.setState(state => {
            state.tableName = value;
            return state;
        });
    }

    render(){
        return (
            <div className="search">
                <div className="search-text">Elija tabla</div>
                <select className="search-selection" onChange={(event) => this.optionChanged(event)}>
                    <option></option>
                    <option>Ingresos</option>
                    <option>Gastos</option>
                    <option>Periodos</option>
                    <option>Pagos Recibidos</option>
                    <option>Pagos Realizados</option>
                </select>
                <button className="search-consultar" onClick={()=>this.handleClick()}>Consultar</button>
                <button>Insertar</button>
            </div>
        );
    }
}

class Query extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            content:null
        };
    }
   
    componentWillReceiveProps(nextProps){
        if(nextProps.table === this.props.table){
            return;
        }
        if (nextProps.table !== ""){
            fetch("http://localhost:3000/consultar"+nextProps.table.replace(" ",""))
                .then(obj =>obj.json())
                .then(quer => {
                    this.props.onShowDisplay(true);
                    this.setState(state => {
                        state.content = quer.contenido;
                        return state;
                    });
                });
        }
        else{
            this.props.onShowDisplay(false);
            this.setState(state => {
                state.content = null;
                return state;
            });
        }
    }

    render(){
        return (
            <div className="query" style={this.props.display}>
                <h4>Resultado de la Consulta</h4>
                <Result content={this.state.content} table={this.props.table}/>
            </div>
        );
    }
}

let Result = (props) =>{
    if(props.content === null){
        return null;
    }
    else{
        let listItems = props.content.map(i => {
            if(props.table==="Ingresos" || props.table==="Gastos"){
                return <ShowQuery i={i} key={i.id}/>; 
            }
            else if(props.table==="Periodos"){
                return <ShowQueryPeriodos i={i} key={i.id}/>;
            }
            else if(props.table==="Pagos Realizados" || props.table==="Pagos Recibidos"){
                return <ShowQueryPagos i={i} key={i.id}/>;
            }
        });
        return <ul className="result">{listItems}</ul>;
    }
};

let ShowQuery = (props) =>{
    return (
        <li className="clearfix result-li" >
            <div className="result-text">{props.i.nombre}</div>
            <input type="button" className="result-eliminar" value="Eliminar"/>
            <input type="button" className="result-modificar" value="Modificar"/>
        </li>
    );
};

let ShowQueryPeriodos = (props) =>{
    return (
        <li className="clearfix result-li" >
            <div className="result-text">{props.i.mes}</div>
            <div className="result-text">{props.i.ano}</div>
            <input type="button" className="result-eliminar" value="Eliminar"/>
            <input type="button" className="result-modificar" value="Modificar"/>
        </li>
    );
};

let ShowQueryPagos = (props) =>{
    return (
        <li className="clearfix result-li" >
            <div className="result-text" >{props.i.mes}</div>
            <div className="result-text">{props.i.ano}</div> 
            <div className="result-text" >{props.i.nombre}</div>
            <div className="result-text" >{props.i.valor}</div>
            <input type="button" className="result-eliminar" value="Eliminar"/>
            <input type="button" className="result-modificar" value="Modificar"/>
        </li>
    );
};

let Insert = () =>{
    return(
        <div className="insert">
            <h4>Insertar nuevo elemento</h4>
            <DataInsert table="1"/>
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