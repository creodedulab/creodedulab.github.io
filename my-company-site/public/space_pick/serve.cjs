/* SPACEPICK local server. Loopback only; serves this project folder. */
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=__dirname,port=8947;
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.wav':'audio/wav','.png':'image/png','.ico':'image/x-icon'};
http.createServer((req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
  if(pathname==='/_spacepick_health'){res.setHeader('Content-Type','application/json');res.end(JSON.stringify({app:'spacepick',root}));return}
  if(pathname==='/favicon.ico'){res.writeHead(204);res.end();return}
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname)),relative=path.relative(root,file),type=types[path.extname(file).toLowerCase()];
  if(relative.startsWith('..')||path.isAbsolute(relative)||!type){res.writeHead(403);res.end('Forbidden');return}
  const stat=fs.statSync(file);if(!stat.isFile())throw Error('Not a file');
  res.setHeader('Content-Type',type);res.setHeader('Accept-Ranges','bytes');res.setHeader('Cache-Control','no-store');
  const range=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);let start=0,end=stat.size-1;
  if(range){start=Number(range[1]);end=range[2]?Math.min(Number(range[2]),end):end;if(start>end||start>=stat.size){res.writeHead(416,{'Content-Range':'bytes */'+stat.size});res.end();return}res.statusCode=206;res.setHeader('Content-Range',`bytes ${start}-${end}/${stat.size}`)}
  res.setHeader('Content-Length',end-start+1);if(req.method==='HEAD'){res.end();return}fs.createReadStream(file,{start,end}).on('error',()=>res.destroy()).pipe(res);
 }catch{res.writeHead(404);res.end('Not found')}
}).listen(port,'127.0.0.1',()=>console.log('SPACEPICK http://127.0.0.1:'+port+'/'));
