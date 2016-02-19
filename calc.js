var http = require('http');

var server = http.createServer(handleRequest);

function handleRequest(request, response){
    
    var params = request.url.split('/');
    var result = null;
    
    if(params.length == 4){
        
        var a = parseInt(params[2]);
        var b = parseInt(params[3]);
       
        if(a && b){
            switch(params[1]){
                case "add" : result = a + b; break;
                case "sub" : result = a - b; break;
                case "mul" : result = a * b; break;
                case "div" : result = a / b; break;
                default: break;
            }
        }
    }
    
    //Write result
    if(result){
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write("" + result + " kippetje tok");
    }
    else{
        response.writeHead(404, { "Content-Type": "text/plain" });
    }

    response.end();
}

server.listen(process.env.PORT || 8000);