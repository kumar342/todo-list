import React from "react";
import ReactDOM from "react-dom";
import  'bootstrap/dist/css/bootstrap.css';
import uuid from "uuid";


class TodoInput extends React.Component{
    render(){
        const {item, handleChange, handleSubmit, editItem } = this.props
        return(
         <div className="card card-body my-3">
           <form onSubmit={handleSubmit}>
              <div className="input-group">
              <div className="input-group-prepend">
              <div className="input-group-text bg-primary text-white">
              <i className="fas fa-book"></i>
              </div>
              </div>
              <input  type="text"
               className="form-control text-capitalize" 
               placeholder="todo item......" 
               value={item} 
            onChange ={handleChange} />
              </div>
              <button  type="submit" 
              className={
                  editItem ? "btn btn-block btn-success mt-3" :
                  "btn btn-block btn-primary mt-3"
              }
               > {editItem ? 'Edit Item' : 'Add Item'}</button>
           </form>          
         </div>
        )
    }
}


class TodoList extends React.Component{
    render(){
        const {items, clearList, handleDelete, handleEdit} = this.props
        return(
            <ul className="list-group my-5">
            <h3 className="text-capitalize text-center"> todo list </h3>
            {
                items.map(item=> {
                    return(
                        <TodoItem 
                        key={item.id} 
                        title={item.title}
                        handleDelete={() =>handleDelete(item.id) }
                        handleEdit={() =>handleEdit(item.id) }
                        />
                    )
                })
            } 
            <button type="button"  className="btn btn-danger text-capitalize mt-5" onClick={clearList} >clear</button>
            
            </ul>
        )
    }
}


class TodoItem extends React.Component{
    render(){
        const {title, handleDelete, handleEdit} = this.props;
        return(
            <li className="list-group-item text-capitalize d-flex justify-content-between my-2">
            <h6>{title}</h6>
              <div className="todo-icon">
                  <span className="mx-2 text-success" onClick={handleEdit}>
                      <i className="fas fa-pen" />             
                  </span>
                  <span className="mx-2 text-danger" onClick={handleDelete}>
                       <i className="fas fa-trash" />
                  </span>
              </div>
            </li>
            
        );
    }
}



class App extends React.Component{
    state = {
        items:[],
        id:uuid(),
        item:"",
        editItem:false
    };

    handleChange = (e) => {
        this.setState({
           item : e.target.value 
        })
    };

    handleSubmit =(e) => {
       e.preventDefault();
    
       const newItem = {
        id:this.state.id,
        title: this.state.item
        
    }
     const updateItems = [...this.state.items,newItem];
     this.setState({
         items:updateItems,
         id:uuid(),
         item:'',
         editItem:false
     })
    };
  clearList = () => {
    this.setState({
        items:[]
    })

  }
    
  handleDelete = (id) => {
      const filteredItems = this.state.items.filter(item => item.id !==id)
      this.setState({
          items:filteredItems
      });
  }

  handleEdit = (id) => {
    const filteredItems = this.state.items.filter(item => item.id !==id)
   
 const selectedItem = this.state.items.find(item => item.id===id)
 console.log(selectedItem);
   
    this.setState({
        items:filteredItems,
        item: selectedItem.title,
        editItem:true,
        id:id
    });
  }
    render(){
        return(
             <div>
               <div className="container"> </div>
               <div className="row"></div>
               <div className="col-15 col-md-10 mt-4"></div>
               <div className="text-capitalize text-center"><h3>todo input</h3> </div>
               <TodoInput 
                item={this.state.item}  
                handleChange={this.handleChange} 
                handleSubmit={this.handleSubmit}
                editItem={this.state.editItem}
               />
               <TodoList  items={this.state.items}  clearList={this.clearList} handleDelete={this.handleDelete} handleEdit={this.handleEdit} />
             </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("root"))