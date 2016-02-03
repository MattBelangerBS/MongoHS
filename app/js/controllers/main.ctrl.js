app.controller('MainCtrl',MainCtrl);

function MainCtrl($state,contentService,apiSrv){
	this.state = $state;
	this.apiSrv = apiSrv;
	this.contentService = contentService;


}

MainCtrl.prototype.click = function(search) {

};





MainCtrl.prototype.clearStorage = function() {
	localStorage.clear();
};


