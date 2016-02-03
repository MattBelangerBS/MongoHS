app.service('apiSrv',apiSrv);

function apiSrv($http){
	this.http = $http;

	this.BASEURL= "http://127.0.0.1:8082";
	
}

apiSrv.prototype.getRequest = function(ENDPOINT) {

		return this.http.get(this.BASEURL + ENDPOINT);
	
}
apiSrv.prototype.postRequest = function(ENDPOINT,data) {

		 data = JSON.stringify(data);
		return this.http.post(this.BASEURL + ENDPOINT,DATA);
	
}
apiSrv.prototype.putRequest = function(ENDPOINT,data) {

		 data = JSON.stringify(data);
		return this.http.put(this.BASEURL + ENDPOINT,DATA);
	
}
apiSrv.prototype.delRequest = function(ENDPOINT,data) {

		 data = JSON.stringify(data);
		return this.http.delete(this.BASEURL + ENDPOINT,DATA);
	
}
