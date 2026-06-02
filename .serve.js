const http=require('http'),fs=require('fs'),path=require('path');
const root=__dirname,types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml'};
http.createServer((req,res)=>{let p=decodeURIComponent(req.url.split('?')[0]);if(p==='/')p='/preview.html';
const f=path.join(root,p);fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);res.end('404');return;}
res.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream'});res.end(d);});
}).listen(8731,()=>console.log('serving on 8731'));
