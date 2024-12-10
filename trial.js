let http = require('http');
const server = http.createServer((req, res) => {
    const url = req.url;
    if(url === "/")
    {  
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');        
        res.write('<head><title>Welcome to Node</title> </head>');
        res.write('<body><form action="/create-user"method="POST"><input type="text" name="username"><button type="submit"> Enter </button></form></body>')
        res.write('</html>');
        return res.end();
       
    }
    if(url === "/users")
    {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');        
        res.write('<head>Hello Users: </head>')
        res.write('<body><ul><li>user1</li><li>user2</li></ul></body>');
        res.write('</html>');
        return res.end();
        
    }
    if(url === "/create-user")
    {      
       const body = [];
       req.on('data',(chunk)=>{
        body.push(chunk);
        console.log("check chunk");
       });
       req.on('end', () => {
        const parsebody = Buffer.concat(body).toString();
        console.log(parsebody.split('=')[1]);
       });
       res.statusCode = 302;
       res.setHeader('Location','/');
       res.end();
      
    }

});

server.listen(3000);
