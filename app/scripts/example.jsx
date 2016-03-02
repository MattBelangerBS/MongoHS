
var Cards = React.createClass({
    getInitialState: function(){
            return {
                    details: [], 
                    filter: '',
                    hero:'all'
                    };
    },
    handleClick: function(card) {
    	    this.setState({details: card});
            console.log(card);
    },
    handleFilterChange: function(e) {
    	    this.setState({filter: e.target.value});
    },
    handleFilterClick: function(hero) {
    	    this.setState({hero: hero});
            console.log(hero);
    },
    render: function(){
            var that = this;
            var heroes = ['all','neutral','druid','mage','rogue','priest','warrior','hunter','paladin','shaman','warlock']               
            return(
                <div>
                    <div className='container filters'>
                        <label> Search Cards By Name
                            <input 
                                type="text" 
                                placeholder="Filter"
                                value={this.state.filter}
                                onChange={this.handleFilterChange}
                            />
                        </label>
                        <div>
                            {heroes.map(function(hero,index){
                                return(
                                    <span className="btn btn-primary" onClick={that.handleFilterClick.bind(null, hero)} key={index}>
                                        {hero}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                    <div className="left">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="row">
                            {this.props.data.map(function(card,index){
                                var cardClass = 'default';
                                if(!(card.health=="30") && !(card.collectible==false) && card.category !=='ability'){
                                    
                                    var stringName = card.name;
                                    var stringCat = card.category;
                                    var stringQual = card.quality;
                                    var stringRace = card.race;
                                    var stringDes = card.description;
                                    
                                    var search = (that.state.filter).toLowerCase();
                                    
                                        if ((stringName.toLowerCase().indexOf(search) != -1)&&                 
                                        ((that.state.hero==='all') || 
                                        (that.state.hero===card.hero)
                                        )){
                                            return (
                                                <div className="col-md-2 card" key={index}>
                                                    <div onClick={that.handleClick.bind(null, card)} > 
                                                        {card.name} 
                                                    </div>
                                                </div>
                                            )
                                        } 
                                    
                                }
                            })}
                                </div>
                            </div>
                            
                             <div className="col-md-4">
                                <CardDetails data={this.state.details}/>
                            </div>
                        </div>
                    </div>
                   
                </div>
            )
    }
});

var CardDetails = React.createClass({
    render: function(){
        var name = this.props.data.name;
        var description = this.props.data.description;
        var img = this.props.data.image_url;
        
        return(
            <div className="right col-md-4">
                <h2>{name}</h2>
                <span className="deets"> Category: {this.props.data.category}</span>
                <span> Class: {this.props.data.hero}</span>
                <span> Quality: {this.props.data.quality}</span>
                <img className="img_box" src={img}/>
            </div>
        )
    }
});

var MyTable = React.createClass({
     loadCardsFromServer: function() {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    console.log(data);
                    this.setState({data: data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
     },
      getInitialState: function(){
            return {data: []};
    },
    componentDidMount: function(){
        this.loadCardsFromServer();
    },
    render: function() {
        return (
            <div className="container">
                <h2>CardList</h2>
                <Cards data={this.state.data}/>
            </div>
        );
    }
});


 
    ReactDOM.render(
        // <MyTable url="/api/json"/>,
        <MyTable  url="/cards/cards"/>,
        document.getElementById('content')
);

