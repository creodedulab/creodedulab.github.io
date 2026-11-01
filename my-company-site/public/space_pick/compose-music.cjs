/* Original SPACEPICK scores, synthesized locally. No downloaded samples. */
const fs=require('node:fs'),path=require('node:path');
const SR=32000,TAU=Math.PI*2,folder=path.join(__dirname,'audio');fs.mkdirSync(folder,{recursive:true});
const hz=m=>440*2**((m-69)/12);
function score(seconds){const n=Math.round(seconds*SR);return {n,seconds:n/SR,l:new Float32Array(n),r:new Float32Array(n)}}
function note(q,start,duration,midi,volume,pan=.5,kind='pad',attack=.03){
 const f=hz(midi),offset=Math.round(start*SR),count=Math.round(duration*SR),left=Math.cos(pan*Math.PI/2)*volume,right=Math.sin(pan*Math.PI/2)*volume;
 for(let i=0;i<count;i++){const t=i/SR,end=duration-t;let env=Math.min(1,t/attack)*Math.min(1,end/(kind==='pad'?2.5:.12));let wave;
  if(kind==='pad'){env=Math.sin(Math.min(1,t/3)*Math.PI/2)*Math.sin(Math.min(1,end/3)*Math.PI/2);wave=(Math.sin(TAU*f*t)+.38*Math.sin(TAU*f*1.003*t+.4)+.16*Math.sin(TAU*f*2*t)+.06*Math.sin(TAU*f*3*t))*.6;wave*=.9+.1*Math.sin(TAU*.14*t)}
  else if(kind==='bell'){env=Math.exp(-t*1.8)*Math.min(1,t/.01)*Math.min(1,end/.1);wave=Math.sin(TAU*f*t)*.7+Math.sin(TAU*f*2.01*t)*.23+Math.sin(TAU*f*3.98*t)*.07}
  else if(kind==='bass'){env*=Math.exp(-t*5);wave=Math.sin(TAU*f*t)*.75+Math.sin(TAU*f*2*t)*.18+Math.sin(TAU*f*3*t)*.07}
  else{env*=Math.exp(-t*7);wave=Math.sin(TAU*f*t)*.58+Math.sin(TAU*f*2*t)*.2+Math.sin(TAU*f*3*t)*.12+Math.sin(TAU*f*4.003*t)*.06+Math.sin(TAU*f*6*t)*.04}
  const at=((offset+i)%q.n+q.n)%q.n,value=wave*env;q.l[at]+=value*left;q.r[at]+=value*right;
 }
}
let seed=13579;function noise(){seed=(Math.imul(seed,1664525)+1013904223)|0;return (seed>>>0)/2147483648-1}
function drum(q,start,type,volume=1){const duration=type==='kick'?.35:type==='snare'?.22:.09,n=Math.ceil(duration*SR),offset=Math.round(start*SR);let phase=0,previous=0;
 for(let i=0;i<n;i++){const t=i/SR,x=noise(),high=x-previous;previous=x;let v;
  if(type==='kick'){phase+=TAU*(43+115*Math.exp(-t*35))/SR;v=Math.sin(phase)*Math.exp(-t*15)*.44+high*Math.exp(-t*250)*.025}
  else if(type==='snare')v=high*Math.exp(-t*24)*.105+Math.sin(TAU*180*t)*Math.exp(-t*35)*.07;
  else v=high*Math.exp(-t*80)*.045;
  const at=(offset+i)%q.n;q.l[at]+=v*volume*.72;q.r[at]+=v*volume*.72;
 }
}
function save(q,name,space){
 const dryL=q.l.slice(),dryR=q.r.slice(),taps=space?[[.337,.24],[.577,.19],[.911,.15],[1.337,.1],[1.811,.07],[2.371,.04]]:[[.187,.12],[.375,.09],[.562,.06],[.75,.035]];
 for(const [delay,gain] of taps){const shift=Math.round(delay*SR);let lpL=0,lpR=0;for(let i=0;i<q.n;i++){const at=(i-shift+q.n)%q.n;lpL+=(dryL[at]-lpL)*.35;lpR+=(dryR[at]-lpR)*.35;q.l[i]+=lpR*gain;q.r[i]+=lpL*gain}}
 let peak=0,sum=0;for(let i=0;i<q.n;i++){q.l[i]=Math.tanh(q.l[i]*1.2);q.r[i]=Math.tanh(q.r[i]*1.2);peak=Math.max(peak,Math.abs(q.l[i]),Math.abs(q.r[i]));sum+=q.l[i]**2+q.r[i]**2}
 const gain=.86/peak,buffer=Buffer.alloc(44+q.n*4);buffer.write('RIFF');buffer.writeUInt32LE(buffer.length-8,4);buffer.write('WAVEfmt ',8);buffer.writeUInt32LE(16,16);buffer.writeUInt16LE(1,20);buffer.writeUInt16LE(2,22);buffer.writeUInt32LE(SR,24);buffer.writeUInt32LE(SR*4,28);buffer.writeUInt16LE(4,32);buffer.writeUInt16LE(16,34);buffer.write('data',36);buffer.writeUInt32LE(q.n*4,40);
 for(let i=0;i<q.n;i++){buffer.writeInt16LE(Math.round(q.l[i]*gain*32767),44+i*4);buffer.writeInt16LE(Math.round(q.r[i]*gain*32767),46+i*4)}fs.writeFileSync(path.join(folder,name),buffer);console.log(`${name}: ${q.seconds.toFixed(2)}s, stereo ${SR}Hz, peak -1.3 dBFS, RMS ${(20*Math.log10(Math.sqrt(sum/(q.n*2))*gain)).toFixed(1)} dBFS`);
}
// SILENT ORBIT: 60 BPM, D minor / suspended extended chords, 64-second loop.
const ambient=score(64),chords=[[50,57,60,64,69],[46,53,57,60,65],[53,60,64,67,72],[48,55,60,62,67],[50,57,60,65,69],[46,53,57,62,65],[43,50,57,60,65],[45,52,57,62,64]];
for(let bar=0;bar<8;bar++)for(let j=0;j<5;j++)note(ambient,bar*8-2,12,chords[bar][j],j===0?.09:.045,.12+j*.19,'pad');
note(ambient,0,64,26,.045,.5,'pad');for(let i=0;i<32;i++){const chord=chords[Math.floor(i/4)],m=chord[(i*3)%chord.length]+12;note(ambient,i*2+.8,3.4,m,.036,.2+(i%5)*.15,'bell')}
save(ambient,'silent-orbit.wav',true);
// ESCAPE VELOCITY: 136 BPM, 32 bars, driving minor-key sequencer and percussion.
const bpm=136,beat=60/bpm,bars=32,race=score(bars*4*beat),roots=[38,34,31,33],steps=[0,12,7,14,3,12,10,7,0,15,7,12,3,14,10,19];
for(let bar=0;bar<bars;bar++){const root=roots[Math.floor(bar/2)%4],base=bar*4*beat,breakdown=bar>=16&&bar<20;
 for(let k=0;k<4;k++){if(!breakdown||k===0)drum(race,base+k*beat,'kick',.9);if(k%2)drum(race,base+k*beat,'snare',.95)}
 for(let k=0;k<16;k++){drum(race,base+k*beat/4,'hat',k%2?.38:.65);note(race,base+k*beat/4,beat*.66,root+12+steps[(k+bar%2*4)%16],breakdown?.055:.09,.25+(k%4)*.16,'pulse',.006)}
 for(let k=0;k<8;k++)note(race,base+k*beat/2,beat*.65,root+(k%4===3?12:0),.19,.5,'bass',.008);
 if(bar%2===0)for(let j=0;j<3;j++)note(race,base,beat*8,root+24+[0,3,7][j],.032,.15+j*.35,'pad');
 if(bar>=8&&bar<16||bar>=24)for(let k=0;k<4;k++)note(race,base+k*beat+.06,beat*.85,root+36+[7,10,12,15][(k+bar)%4],.055,k%2?.7:.3,'bell');
 if(bar%8===7){const start=base+beat*2;for(let i=0;i<Math.round(beat*2*SR);i++){const t=i/SR,env=(t/(beat*2))**2,v=noise()*.025*env+Math.sin(TAU*(240*t+320*t*t))*.014*env,at=(Math.round(start*SR)+i)%race.n;race.l[at]+=v;race.r[at]+=v}}
}
save(race,'escape-velocity.wav',false);
fs.writeFileSync(path.join(folder,'README.md'),'# SPACEPICK original music\n\n- silent-orbit.wav: Silent Orbit, 60 BPM, 64-second stereo ambient loop.\n- escape-velocity.wav: Escape Velocity, 136 BPM, 32-bar stereo electronic race loop.\n\nOriginal synthesized compositions made for SPACEPICK, with no downloaded samples. Regenerate using `node compose-music.cjs`. Countdown beeps are synthesized live by Web Audio.\n');
