
var Header = React.createClass({
    getInitialState: function(){
            return {
                    details: [], 
                    filter: '',
                    hero:'all',
                    sort:'mana'
                    };
    },
    handleClick: function(card) {
    	    this.setState({details: card});
            console.log(card);
    },
    handleFilterChange: function(e) {
    	    this.setState({filter: e.target.value});
    },
    handleSortChange: function(e) {
    	    this.setState({sort: e.target.value});
            var sortField = e.target.value;
            if(sortField==='alph'){
                console.log('alph')
                this.props.data.sort(function(a, b){
                            if(a.name < b.name) return -1;
                            if(a.name > b.name) return 1;
                            return 0;
                        });
            }else if(sortField==='mana'){
                console.log('mana')
                this.props.data.sort(function(a, b){
                            if(a.mana < b.mana) return -1;
                            if(a.mana > b.mana) return 1;
                            return 0;
                        });
            }else if(sortField==='attack'){
                console.log('attack')
                this.props.data.sort(function(a, b){
                            if(a.attack < b.attack) return 1;
                            if(a.attack > b.attack) return -1;
                            return 0;
                        });
            }else if(sortField==='health'){
                console.log('health')
                this.props.data.sort(function(a, b){
                            if(a.health < b.health) return 1;
                            if(a.health > b.health) return -1;
                            return 0;
                        });
            }
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
                        <select onChange={this.handleSortChange} value={this.state.sort}>
                            <option value="mana">Mana Cost</option>
                            <option value="alph">Alpha</option>
                            <option value="health">Health</option>
                            <option value="attack">Attack</option>
                        </select>
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
                        
                            <div className="col-md-9">
                                <div className="row">
                                    <CardList onUpdate={this.handleClick} data={this.props.data} filter={this.state.filter} hero={this.state.hero}/>
                                </div>
                            </div>
                            
                             <div className="col-md-3">
                                <CardDetails data={this.state.details}/>
                            </div>
                        </div>
                    </div>
                   
                </div>
            )
    }
});

var CardList = React.createClass({
    render: function(){
        var that = this;
        return(
            <div>
                {this.props.data.map(function(card,index){
                    var cardClass = 'default';
                    if(!(card.health=="30") && !(card.collectible==false) && card.category !=='ability'){
                        
                        var stringName = card.name;
                        var stringCat = card.category;
                        var stringQual = card.quality;
                        var stringRace = card.race;
                        var stringDes = card.description;
                        
                        var search = (that.props.filter).toLowerCase();
                        
                            if ((stringName.toLowerCase().indexOf(search) != -1)&&                 
                            ((that.props.hero==='all') || 
                            (that.props.hero===card.hero)
                            )){
                                return (
                                    <div className="col-md-3" key={index}>
                                        <div onClick={that.props.onUpdate.bind(null, card)} > 
                                            <img className="img_box" src={card.image_url}/>
                                        </div>
                                    </div>
                                )
                            } 
                    }
                })}
            </div>
        )
    }
});

var CardDetails = React.createClass({
    render: function(){
        var name = this.props.data.name;
        var description = this.props.data.description;
        var img = this.props.data.image_url;
        if(this.props.data.name){
            return(
                <div className="right col-md-4">
                    <h2>{name}</h2>
                    <p className="deets"> Category: {this.props.data.category}</p>
                    <p> Class: {this.props.data.hero}</p>
                    <p> Quality: {this.props.data.quality}</p>
                </div>
            )
        } else{
            return(
                <div></div>
            )
        }
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
                    data.sort(function(a, b){
                        if(a.mana < b.mana) return -1;
                        if(a.mana > b.mana) return 1;
                        return 0;
                    })
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
                <h2>Hearthstone Card Resource</h2>
                <Header data={this.state.data}/>
            </div>
        );
    }
});


 
    ReactDOM.render(
        // <MyTable url="/api/json"/>,
        <MyTable  url="/cards/cards"/>,
        document.getElementById('content')
);

