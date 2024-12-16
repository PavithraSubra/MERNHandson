
const fs = require('fs');

const httpserver =(req, res) => {
    let url = req.url;
    let method = req.method;
    if(url === "/")
    {
      
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title> Enter message </title></head>');
        res.write('<body><form action="/create-user" method="POST"><input type ="text" name="username"><button type="submit">Enter </button></form> </body>');
        res.write('</html>');        
        return res.end();
    }
    if(url === '/users' )
    {   
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title> Hello From Node JS  </title></head>');
        res.write('<body><ul><li>user1</li><li>user2</li><li>user3</li></ul></body>')
        res.write('</html>');        
        return res.end();
    }
    // Send response
    if(url === '/create-user' && method === 'POST')
    {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
            console.log(chunk);
        } );
        
         return req.on('end',() => {
            const parsedbody = Buffer.concat(body).toString();
            console.log(parsedbody);
            const message = parsedbody.split('=')[1];
            fs.writeFile('filedump.txt',message, (err) =>{
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            });
        });
      
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<body><h1> Hello From Node JS  </h1></body>');
    res.write('</html>');        
    res.end();
}

exports.handler = httpserver;
