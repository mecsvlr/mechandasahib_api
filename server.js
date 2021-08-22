const http = require('http');
const app =  require('./backend/app');

const normalizePort = val => {
    var port = parseInt(val , 10);

    if(isNaN(port)){
        //named pipe
        return val;
    }

    if(port >=0){
        //port number
        return port;
    }
    return false;
};

const onError = error => {
    if(error.syscall !== "listen"){
        throw error;
    }
    const bind = typeof addr === "string" ? "pipe " + addr: "port " +port;
    switch(error.code){
        case "EACCESS":
            Console.error(bind + " requires elevated privilages");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.log(bind+" is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe" + addr: "port"+port;
    debug("Listening on "+bind);
};

const port = normalizePort(process.env.PORT || "3002");
// console.log(port);

app.set('port', port);
const server = http.createServer(app);
server.on("error", onError);
server.on("Listening", onListening);

server.listen(port, () => console.log(`Listening on port ${port}..`))
