var Cards = React.createClass({
    getInitialState: function(){
            return {details: []};
    },
    handleClick: function(card) {
    	    this.setState({details: card});
    },
    render: function(){
        var that = this;
        var cardNodes = this.props.data.map(function(card,index){
                    if(!(card.category=="hero") && !(card.collectible==false)){
                        return(
                            <li onClick={that.handleClick.bind(null, card)} key={index}> 
                                {card.name} 
                            </li>
                        )
                    }
            });
            return(
                <div>
                    <div className="left">
                        <ul>
                        {cardNodes}
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
                    <h4>{description}</h4>
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

