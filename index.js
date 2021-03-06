class Container extends React.Component {

    constructor(){
        super();
        this.display=[{display:"none"},{display:"block"}];
        this.state = {
            tableName: "",
            show:false,
            showInsert:false
        };
    }

    searchChanged(tableName,show,showInsert){
        if (tableName !== ""){
            this.setState(state => {
                state.tableName = tableName;
                state.show = show;
                state.showInsert = showInsert;
                return state;
            });
        }
        else{
            this.setState(state => {
                state.tableName = "";
                state.show = false;
                state.showInsert = false;
                return state;
            });
        }
    }

    render(){
        return(
            <div className="container">
                <h2>Control de Pagos</h2>
                <div className="line-title"></div>
                <Search onSearchChanged={(table,show,showInsert) => this.searchChanged(table,show,showInsert)}/>
                <div className="line-title"></div>
                <Query display={this.state.show ? this.display[1]:this.display[0]} table={this.state.tableName}/>
                <Insert display={this.state.showInsert ? this.display[1]:this.display[0]} table={this.state.tableName}/>
            </div>
        );
    }
}

class Search extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            tableName: ""
        };
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
                <button className="search-consultar" onClick={()=> this.props.onSearchChanged(this.state.tableName,true,false)}>Consultar</button>
                <button onClick={()=>this.props.onSearchChanged(this.state.tableName,false,true)}>Insertar</button>
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
                    this.setState(state => {
                        state.content = quer;
                        return state;
                    });
                });
        }
        else{
            this.setState(state => {
                state.content = null;
                return state;
            });
        }
    }

    render(){
        return (
            <div className="form" style={this.props.display}>
                <h4>Resultado de la Consulta</h4>
                <TitleResult content={this.state.content} table={this.props.table}/>
                <Result content={this.state.content} table={this.props.table}/>
            </div>
        );
    }
}

let TitleResult = (props) =>{
    if(props.content === null || props.content === "Sin datos"){
        return null;
    }
    else{
        if(props.table==="Ingresos" || props.table==="Gastos"){
            return <div className="title-result">Descripcion</div>; 
        }
        else if(props.table==="Periodos"){
            return (
                <div className="title-result">
                    <div className="result-text-mes">Mes</div>
                    <div className="result-text-ano">Ano</div>
                </div>
            );
        }
        else if(props.table==="Pagos Realizados" || props.table==="Pagos Recibidos"){
            return (
                <div className="title-result">
                    <div className="result-text-mes">Mes</div>
                    <div className="result-text-ano">Ano</div>
                    <div className="result-text">Descripcion</div>
                    <div className="result-text">Valor</div>
                </div>
            );
        }
    }
};

let Result = (props) =>{
    if(props.content === null){
        return null;
    }
    else if (props.content === "Sin datos"){
        return <div>Sin datos</div>;
    }
    else{
        let listItems = props.content.contenido.map(i => {
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
        return <ul>{listItems}</ul>;
    }
};

let ShowQuery = (props) =>{
    return (
        <li className="clearfix result-li">
            <div className="result-text">{props.i.nombre}</div>
            <input type="button" className="result-eliminar" value="Eliminar"/>
            <input type="button" className="result-modificar" value="Modificar"/>
        </li>
    );
};

let ShowQueryPeriodos = (props) =>{
    return (
        <li className="clearfix result-li" >
            <div className="result-text-mes">{props.i.mes}</div>
            <div className="result-text-ano">{props.i.ano}</div>
            <input type="button" className="result-eliminar" value="Eliminar"/>
            <input type="button" className="result-modificar" value="Modificar"/>
        </li>
    );
};

let ShowQueryPagos = (props) =>{
    return (
        <li className="clearfix result-li" >
            <div className="result-text-mes">{props.i.mes}</div>
            <div className="result-text-ano">{props.i.ano}</div> 
            <div className="result-text" >{props.i.nombre}</div>
            <div className="result-text" >{props.i.valor}</div>
            <input type="button" className="result-eliminar" value="Eliminar"/>
            <input type="button" className="result-modificar" value="Modificar"/>
        </li>
    );
};

class Insert extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value:""
        };
    }
    
    nameChanged(value){
        this.setState(state => {
            state.value = value;
            return state;
        });
    }

    render(){
    return(
            <div className="form" style={this.props.display}>
            <h4>Insertar nuevo elemento</h4>
                <DataInsert table={this.props.table} value={(value)=> this.nameChanged(value)} show={this.state.value}/>
                <Buttons table={this.props.table} save={this.state.value} value={(value)=>this.nameChanged(value)}/>
        </div>
    ); 
    }
}

let DataInsert = (props) =>{
    if(props.table==="Ingresos" || props.table==="Gastos"){
        return <InsertExpensesIncom value={((value)=>props.value(value))} show={props.show}/>;
    }
    else if(props.table==="Periodos"){
        return <InsertPeriods/>;
    }
    else if(props.table==="Pagos Realizados" || props.table==="Pagos Recibidos"){
        return <InsertPayments/>; 
    }
    else{
        return null;
    }
};

let InsertExpensesIncom = (props) =>{
    return(
        <div className="form-general">
            <div className="form-text">Digite Nombre</div>
            <input type="text" className="form-text" onChange={(event)=>props.value(event.target.value)} value={props.show}/>
        </div>
    );
};

let InsertPeriods = () =>{
    return(
        <div>
            <div className="form-general">
                <div className="form-text">Elija Mes</div>
                <select className="form-text">
                    <option>Opcion 1</option>
                </select>
            </div>
            <div className="form-general">
                <div className="form-text">Elija Ano</div>
                <select>
                    <option>Opcion 1</option>
                </select>
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
                <select className="form-text">
                    <option>Opcion 1</option>
                </select>
            </div>
            <div className="form-general">
                <div className="form-text">Digite Valor</div>
                <input type="text" className="form-text"/>
            </div>
        </div>
    );
};

let Buttons = () =>{
    return (
        <div className="buttons">
            <button className="button-guardar">Guardar</button>
            <button>Cancelar</button>
        </div>
    );
};

document.addEventListener("DOMContentLoaded",() => ReactDOM.render(<Container/>,document.getElementById("app")));