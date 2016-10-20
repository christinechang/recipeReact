var Tags = React.createClass({
  getInitialState: function(){
    return {
      selected:''
    }
  },
  setFilter: function(filter) {
    this.setState({selected  : filter})
    this.props.onChangeFilter(filter);
  },
  isActive:function(value){
    return 'filterBtn '+((value===this.state.selected) ?'active':'default');
  },
  render: function() {
    return <div className="filterArea">
      <button className= "col-xs-2" >All</button>
      <button className= "col-xs-2">Course</button>
      <button className= "col-xs-2" >Key Ingredient</button>
      <button className="col-xs-2" >Season</button>
      <button className="col-xs-2" >Event</button>
     </div>
  }
});
/*       
//      <button className={this.isActive('') +  "col-xs-2"} onClick={this.setFilter.bind(this, '')}>All</button>
//      <button className={this.isActive('male') +  "col-xs-2"} onClick={this.setFilter.bind(this, 'male')}>Course</button>
//      <button className={this.isActive('female') +  "col-xs-2"} onClick={this.setFilter.bind(this, 'female')}>Key Ingredient</button>
//      <button className={this.isActive('child') +  "col-xs-2"} onClick={this.setFilter.bind(this, 'child')}>Season</button>
//      <button className={this.isActive('blonde') +  "col-xs-2"} onClick={this.setFilter.bind(this, 'blonde')}>Event</button>*/
/***************************************************************/
var Recipe = React.createClass({
	getInitialState: function(){
		return ({editing: false});
	},
	//componentWillMount: function(){    /* called right before render */
        /* random position and rotation for sticky note*/
        /*** sets style here instead of css **/
//		this.style={
//			right: this.randomBetween(0,window.innerWidth-150) + 'px',
//			top:this.randomBetween(0,window.innerHeight-150) + 'px',
//			transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
//		};
//	},
//    componentDidMount: function() {
//        $(this.getDOMNode()).draggable();
//    },
//	randomBetween: function(min,max) {
//		return(min + Math.ceil(Math.random() * max)); // this works because min is 0
//	},
	edit:function(){
		this.setState({editing: true});
	},
	remove:function(){
		this.props.onRemove(this.props.index);
	},
	save:function() {
		this.props.onChange( this.refs.newText.getDOMNode().value,
						this.props.index);
		this.setState({editing:false});
	},
	renderDisplay: function() {
		return (
			<div className="recipe col-xs-12" style={this.style}>
			<p>{this.props.children} </p>
				<span>
					<button onClick={this.edit} className="btn btn-primary glyphicon glyphicon-pencil"/>
					<button onClick={this.remove}  className="btn btn-danger glyphicon glyphicon-trash"/>
				</span>

			</div>
		);
	},
	renderForm:function() {
		return(
			<div className="recipe  col-xs-12"  style={this.style}>
				<textarea ref="newText" defaultValue={this.props.children}
						className="form-control"></textarea>
				<button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
			</div>
			)
	},
	render:function() {
		if (this.state.editing) {
			return this.renderForm();
		}
		else {
			return this.renderDisplay();
		}
	}
});

var Board = React.createClass({
	propTypes: {
		count:function(props,propName) {
			if (typeof props[propName] !== "number") {
				return new Error('The count property must be a number');
			}
//			if (props[propName] > 100) {
//				return new Error("Creating " + props[propName] + " notes is ridiculous");
//			}
		}
	},
	getInitialState: function() {
		return {
			allRecipes: []
		};
	},
    componentWillMount: function(){ 
        var self = this;
        if(this.props.count) {
//            $.getJSON("http://baconipsum.com/api/?type=all-meat&sentences=" +
//                this.props.count + "&start-with-lorem=1&callback=?", function(results){
//                    results[0].split('. ').forEach(function(sentence){
//                        self.add(sentence.substring(0,40));
//                    });
//                });
             $.getJSON("allRecipesJSON5.txt", function(results){
                 for (var i = 0 ; i < results.length ; i++) {
                    //self.add(results[i].title); //add recipe to recipe array
                    self.add(results[i]); //add recipe to recipe array
                 }
                });
        }
    },
	nextId: function() {
		this.uniqueId = this.uniqueId || 0;
		return this.uniqueId++;

	},
//	add: function(texty){
//		var arr = this.state.allRecipes;
//		arr.push({
//			id:this.nextId(),    //creates .id part of aRecipe
//			theRecipe:texty
//            //recipeObj:oneRecipe  //text,        //creates .aRecipe part of aRecipe
//		});
//		this.setState({allRecipes:arr});
//	},
    add: function(oneRecipe){
        var arr = this.state.allRecipes;
        arr.push({
            id:this.nextId(),    //creates .id part of aRecipe
            recipeObj:oneRecipe  //text,        //creates .aRecipe part of aRecipe
        });
        this.setState({allRecipes:arr});
	},
//	update: function(newText,i){
//		var arr= this.state.allRecipes;
//		arr[i].theRecipe = newText;
//		this.setState({allRecipes:arr});
//	},
    update: function(newText,i){
		var arr= this.state.allRecipes;
		arr[i].theRecipe.title = newText;
		this.setState({allRecipes:arr});
	},
	remove: function(i) {
		var arr = this.state.allRecipes;
		arr.splice(i,1);
		this.setState({allRecipes:arr});
	},

    eachRecipe: function(aRecipe,i) {
		return(

			<Recipe key={aRecipe.id}
				index={i}
                
				onChange={this.update} 
				onRemove={this.remove}
			>
                <a className="recipeTitle" href={aRecipe.recipeObj.url} target="_blank">{aRecipe.recipeObj.title} </a>
                <p className="categoryStyle">{aRecipe.recipeObj.category}</p>
                <p className="ingrStyle">{aRecipe.recipeObj.keyIng}</p>
                <p className="seasonStyle">{aRecipe.recipeObj.season} </p>
                <p className="eventStyle">{aRecipe.recipeObj.event} </p>
            </Recipe>

			);
	},
	render:function() {    /** bind default text to this.add **/
		return (<div className="board">
                <div className="content">
                    <div className="container-fluid">  
                <div className="row">
                            <Tags />
                </div>
                        <div className="row">
					{this.state.allRecipes.map(this.eachRecipe)}
					<button id= "addBtn" className="btn btn-sm btn-success glyphicon glyphicon-plus"
					onClick={this.add.bind(null,"New Recipe")}/>
                              </div> </div> </div>
				</div>);
	}
});

React.render(<Board count={10}/> , 
	document.getElementById('react-container'));