/**js babel - https://codepen.io/anon/pen/mepogj     - "kids finder" **/
var Tags = React.createClass({
  getInitialState: function(){
    return {
      filtSeason:''
    }
  },
  setSeason: function(filter) {
    this.setState({filtSeason  : filter})
    this.props.onChangeFilter(filter);
  },
  isActive:function(value){
    return 'btn '+((value===this.state.filtSeason) ?'active':'default');
  },
  render: function() {
    return <div className="tagStyle">    
        
      <div className="dropdown">
          <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Season
                <span className="caret"></span></button>
           <ul className="dropdown-menu">
                <li> <label><input type="radio" onClick = {this.setSeason.bind(this,'spring')}/>Spring</label></li>
                <li> <label><input type="radio" onClick = {this.setSeason.bind(this,'summer')}/>Summer</label></li>
                <li> <label><input type="radio" onClick = {this.setSeason.bind(this,'autumn')}/>Autumn</label></li>
                <li> <label><input type="radio" onClick = {this.setSeason.bind(this,'winter')}/>Winter</label></li>
                <li> <label><input type="radio"  onClick = {this.setSeason.bind(this,'')}/>All</label></li>
            </ul>
        </div>
     </div>
  }
});
/************************************** KID element *************************/
var Kid = React.createClass({
  render: function() {
    return <ul>
      <li>{this.props.name}</li>
      </ul>
  }
});
/****************************************LIST element **********************/
var List = React.createClass({
  getInitialState: function() {
    return {
      filter: ''
    };
  },
  changeFilter: function(filter) {
    this.setState({
      filter: filter
    });
  },
  render: function() {
    var list = this.props.Data;

    if (this.state.filter !== '') {
      list = list.filter((i)=> i.tags.indexOf(this.state.filter) !== -1);
      console.log(list);
    } 

    list = list.map(function(Props){
      return <Kid {...Props} />
    });

    return <div>
      <h2>RECIPE Finder</h2>
      <Tags onChangeSeason={this.changeFilter}/>
      {list}
    </div>
  }
});

var options = {
  Data:  [{
    name: 'Carrot Soup',
    tags: ['winter', 'autumn']
  },{
    name: 'Corn Salad',
    tags: ['spring', 'summer']
  },{
    name: 'Cassoulet',
    tags: ['winter']
  },{
    name: 'Chili',
    tags: ['winter', 'autumn', 'summer']
  },{
    name: 'Kale Salad',
    tags: ['spring', 'autumn', 'summer']
  }]
};

var element = React.createElement(List, options);
React.render(element, document.body);