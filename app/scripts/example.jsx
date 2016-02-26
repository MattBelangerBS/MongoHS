
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
                    <div className='filters'>
                        <label> Search Cards By Name
                            <input 
                                type="text" 
                                placeholder="Filter"
                                value={this.state.filter}
                                onChange={this.handleFilterChange}
                            />
                        </label>
                        <ul>
                            {heroes.map(function(hero,index){
                                return(
                                    <li onClick={that.handleFilterClick.bind(null, hero)} key={index}>
                                        {hero}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="left">
                        <ul>
                            {this.props.data.map(function(card,index){
                                var cardClass = 'default';
                                if(!(card.health=="30") && !(card.collectible==false) && card.category !=='ability'){
                                    
                                    if (card.category === 'minion'){
                                        cardClass = 'minion'
                                    }else if(card.category==='spell'){
                                        cardClass = 'spell'
                                    }
                                    var string = card.name;
                                    var search = (that.state.filter).toLowerCase();
                                    
                                        if ((string.toLowerCase().indexOf(search) != -1)&&((that.state.hero==='all') || (that.state.hero===card.hero))){
                                            return (
                                                <li className={cardClass} onClick={that.handleClick.bind(null, card)} key={index}> 
                                                    {card.name} 
                                                </li>
                                            )
                                        } 
                                    
                                }
                            })}
                        </ul>
                    </div>
                    <CardDetails data={this.state.details}/>
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
            <div className="right">
                <h2>{name}</h2>
                <h4>{this.props.data.category}</h4>
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
            <div>
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

