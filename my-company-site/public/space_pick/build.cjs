const fs=require('node:fs'),crypto=require('node:crypto'),path=require('node:path');
const root=__dirname;
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const bundle='/* SPACEPICK: simulation and renderer shipped together. */\n'+read('obstacles.js')+'\n;\n'+read('race.js')+'\n;\n'+read('audio.js')+'\n;\n'+read('launch.js')+'\n;\n'+read('app.js');
new Function(bundle);
fs.writeFileSync(path.join(root,'spacepick.js'),bundle);
const version=file=>crypto.createHash('sha256').update(read(file)).digest('hex').slice(0,12);
let html=read('index.html');
for(const file of ['spacepick.js','style.css','vendor/three.js']){
 const escaped=file.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 html=html.replace(new RegExp('(["\'])'+escaped+'(?:\\?[^"\']*)?(["\'])','g'),(_match,open,close)=>open+file+'?v='+version(file)+close);
}
fs.writeFileSync(path.join(root,'index.html'),html);
console.log('SPACEPICK built. Asset versions updated.');
