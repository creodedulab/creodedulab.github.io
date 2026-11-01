const assert=require('node:assert/strict');
const M=require('./race.js');
for(const count of [2,20,100,500]){
 const entries=Array.from({length:count},(_,i)=>({label:'참가 '+(i%5),copy:i+1,copies:count,color:'#c3f477'}));
 const state=M.create(entries);M.armLaunch(state.balls);assert.equal(state.balls.length,count);
 assert.equal(new Set(state.balls.map(b=>b.id)).size,count);
 for(let i=0;i<120*240&&!state.complete;i++)M.step(state,1/120);
 if(!state.complete)console.error(state.balls.filter(b=>!b.done).map(b=>({s:b.s,u:b.u,near:state.modules.filter(m=>Math.abs(m.s-b.s)<12).map(m=>m.id)})));assert(state.complete,`${count} balls must finish in 240 simulated seconds`);
 assert.equal(state.finished.length,count);
 for(let i=0;i<count;i++){
  const b=state.finished[i];assert(Number.isFinite(b.s)&&Number.isFinite(b.u));assert.equal(b.s,M.LENGTH);
  if(i)assert(state.finished[i-1].finishTime<=b.finishTime);
 }
 assert.equal(new Set(state.finished.map(b=>b.id)).size,count);
 assert(state.events.every(e=>e.cycles>0),'All space event zones must activate');
 if(count===500)for(const type of ['asteroid','ship'])assert(state.events.filter(e=>e.type===type).some(e=>e.hits>0),type+' must actually affect marbles');
 console.log(`PASS: ${count} marbles finished in ${state.time.toFixed(2)}s; quantities, unique results, finite positions and finish order valid. Space event contacts: ${state.events.reduce((n,e)=>n+e.hits,0)}.`);
}
for(const type of ['asteroid','ship']){
 const state=M.create([{label:'probe'}]);const e=state.events.find(e=>e.type===type);state.events=[e];state.obstacles=[];e.started=0;e.next=9999;
 const b=state.balls[0];state.time=e.warning+e.duration*.5-1/120;b.s=e.s+e.arc;b.u=type==='asteroid'?e.dir*.8:0;b.vs=10;b.vu=0;
 M.step(state,1/120);assert.equal(e.hits,1,type+' contact recorded');
 if(type==='asteroid')assert(Math.abs(b.vu)>1,'Asteroid applies collision impulse');else assert(b.vs<10,'Tractor beam slows marble');
 assert(!M.eventPose(e,.5).active);assert(M.eventPose(e,.5).warning);assert(!M.eventPose(e,e.warning+e.duration+.1).active);
 console.log('PASS: '+type+' warning, active interval, physical effect and expiry.');
}
assert.equal(M.LENGTH,1050,'Track extended by 25 percent');const course=M.create([]);assert(M.baseWidth(380)<M.baseWidth(30));assert.equal(M.sectorAt(980).level,5);
assert.equal(M.catalog.length,50);assert.equal(new Set(M.catalog.map(d=>d.id)).size,50);
for(let run=0;run<12;run++){const race=M.create([]),counts=new Map();for(const module of race.modules)counts.set(module.id,(counts.get(module.id)||0)+1);assert(Math.max(...counts.values())<=2);assert(race.obstacles.some(o=>o.type==='effect'&&o.kind==='boost'));assert(race.obstacles.some(o=>o.type==='effect'&&o.kind==='slow'))}
const second=M.create([]);assert.notDeepEqual(course.modules.map(m=>m.id),second.modules.map(m=>m.id));
for(const kind of ['boost','slow']){const q=M.create([{label:'effect probe'}]);q.events=[];q.obstacles=[{type:'effect',u:0,s:20,r:5,halfLength:2,kind,duration:2,module:0}];const b=q.balls[0];b.s=20;b.u=0;b.vs=10;M.step(q,1/120);assert(kind==='boost'?b.vs>10:b.vs<10);assert(b[kind+'Until']>q.time);q.obstacles=[];for(let i=0;i<260;i++)M.step(q,1/120);assert(b[kind+'Until']<q.time);}
console.log('PASS: 50 unique designs, random layouts with two-copy limit, random multi-lane forks, temporary boost/slow effects and expiry.');

const original=M.create(Array.from({length:20},(_,i)=>({label:String(i+1)})));for(let i=0;i<600;i++)M.step(original,1/120);const fast=structuredClone(original),normal=structuredClone(original);while(!fast.complete)M.step(fast,1/120);while(!normal.complete)M.step(normal,1/120);assert.deepEqual(fast.finished.map(b=>b.id),normal.finished.map(b=>b.id));console.log('PASS: Fast-forward continues the same race without redrawing winners.');

const impact=M.create([{label:'collision probe'}]);impact.events=[];impact.obstacles=[{type:'bumper',u:0,s:30,r:1,module:0}];const probe=impact.balls[0];probe.u=.3;probe.s=28.55;probe.vs=12;probe.vu=0;M.step(impact,1/120);assert(probe.hit&&probe.hit.power>0);assert(probe.vs<0,'Marble rebounds away from obstacle');assert(Math.abs(probe.vu)>0,'Glancing contact gives lateral rebound');const serial=probe.hit.serial;probe.vs=0;probe.vu=0;M.step(impact,1/120);assert.equal(probe.hit.serial,serial,'Resting contact does not spam impact effects');console.log('PASS: Obstacles on both fork lanes, two-copy limit preserved, collision signal and moderate physical rebound.');

const D=require('./obstacles.js');const edgeModules=D.catalog.filter(d=>d.family==='edge').map((d,i)=>({...d,instance:i,s:30+i*78}));const edgeObjects=D.expand(edgeModules,()=>.5,M.width);assert.equal(edgeModules.length,10);for(const m of edgeModules)assert(edgeObjects.some(o=>o.module===m.instance));for(let run=0;run<12;run++){const q=M.create([]);assert(q.modules.filter(m=>m.family==='edge').length>=6);for(const side of [-1,1]){const count=q.obstacles.filter(o=>!o.lane&&o.type!=='effect'&&o.u*side>0&&Math.abs(o.u)+o.r+(o.travel||0)>M.width(o.s)-.5).length;assert(count>=3,'Both rail-side routes must be obstructed');}}console.log('PASS: Ten rail-specific designs, at least six edge modules per race and physical coverage of both outer rails.');

const launch=M.create(Array.from({length:500},(_,i)=>({label:String(i+1)})));assert(launch.balls.every(b=>Math.abs(b.u)+M.RADIUS<7.65&&b.s>=-40));launch.obstacles=[];launch.events=[];launch.balls.forEach(b=>{b.landAt=2});const before=launch.balls.map(b=>b.s);for(let i=0;i<120;i++)M.step(launch,1/120);assert.deepEqual(launch.balls.map(b=>b.s),before);for(let i=0;i<180;i++)M.step(launch,1/120);assert(launch.balls.every((b,i)=>b.s>before[i]));console.log("PASS: 500 marbles fit the capsule; airborne marbles wait for landing before racing.");

const fall=M.create([{label:'gravity probe'}]);fall.events=[];fall.obstacles=[];M.armLaunch(fall.balls);const b=fall.balls[0];const samples=[],contacts=[];let previous=0;for(let i=0;i<480;i++){M.step(fall,1/120);if(fall.time>b.dropAt+.1&&fall.time<b.dropAt+.8)samples.push({v:b.vy,t:fall.time});if(b.groundContacts>previous){contacts.push(b.vy);previous=b.groundContacts;}assert(b.lift>=0);}assert(Math.abs(samples[20].v-samples[0].v+M.GRAVITY*(samples[20].t-samples[0].t))<1e-7);assert(contacts[0]>contacts[1]&&contacts[1]>0);assert(b.verticalSettled&&b.lift===0&&b.vy===0);assert(b.s>0);console.log('PASS: True vertical gravity, decreasing ground rebounds, eventual settling, landing momentum.');

const speedProbe=M.create([{label:'speed probe'}]);speedProbe.obstacles=[];speedProbe.events=[];for(let i=0;i<480;i++)M.step(speedProbe,1/120);assert(Math.abs(speedProbe.balls[0].vs-24.7)<.001);assert.equal(M.ROLL_ACCEL,9);console.log('PASS: 24.7 speed limit and 9 acceleration.');

assert.equal(M.LENGTH,1050);assert(Math.abs(M.BASE_SPEED-19*1.3)<1e-9);assert(M.width(605)>M.width(520)*1.8);assert(M.width(1050)>M.width(940)*1.7);const courseNew=M.create([]);assert.equal(courseNew.modules.filter(m=>m.intro).length,6);assert(courseNew.modules.every(m=>m.s>=75));assert(courseNew.modules.filter(m=>m.intro).every(m=>!['edge','rotor','slow'].includes(m.family)));assert(courseNew.modules.every(m=>m.s<M.LENGTH));const noTow=M.create([{label:'late probe'}]);noTow.obstacles=[];noTow.events=[];noTow.balls[0].s=700;noTow.balls[0].vs=25;noTow.packLeader=800;noTow.packReference=900;M.step(noTow,1/120);assert(noTow.balls[0].vs<=M.BASE_SPEED);console.log('PASS: Width transitions, 25% longer track, original-speed 1.3x cap and early-only pack assistance.');

const forkCounts=new Set(),laneCounts=new Set();for(let run=0;run<160;run++){const q=M.create([]);forkCounts.add(q.forks.length);assert(q.forks.length>=1&&q.forks.length<=4);assert(q.modules.length>=64&&q.modules.length<=100);assert(q.modules.filter(m=>m.lane).length>=12);for(const f of q.forks){laneCounts.add(f.lanes);assert(f.lanes>=2&&f.lanes<=4);const mid=(f.start+f.end)/2;assert(M.forkGap(mid,q.forks)>4.4);assert.equal(M.forkGap(f.start,q.forks),0);for(let lane=1;lane<=f.lanes;lane++){const mods=q.modules.filter(m=>m.forkId===f.id&&m.lane===lane);assert(mods.length>=4&&mods.length<=6);assert(q.obstacles.some(o=>o.forkId===f.id&&o.lane===lane));const bounds=M.laneBounds(mid,lane,q.forks);assert(bounds.max-bounds.min>4.9);}}assert.equal(q.modules.filter(m=>m.s>900).length,6);assert(q.modules.every(m=>m.s<=1025));assert(q.events.every(e=>e.s+e.arc<900));const counts={};for(const m of q.modules)counts[m.id]=(counts[m.id]||0)+1;assert(Math.max(...Object.values(counts))<=2);}
assert.deepEqual([...forkCounts].sort(),[1,2,3,4]);assert.deepEqual([...laneCounts].sort(),[2,3,4]);
for(const lanes of [2,3,4]){const q=M.create(Array.from({length:lanes},(_,i)=>({label:'lane '+i})));q.forks=[{id:1,start:300,end:420,lanes,gap:5.5}];q.obstacles=[];q.events=[];q.balls.forEach((b,i)=>{b.expectedLane=i+1;b.s=299;b.u=-M.width(300,q.forks)+(i+.5)*2*M.width(300,q.forks)/lanes;b.vs=20});let separated=false;for(let i=0;i<1800&&q.balls.some(b=>b.s<425);i++){M.step(q,1/120);for(const b of q.balls){if(M.forkAt(b.s,q.forks)){const bounds=M.laneBounds(b.s,b.lane,q.forks);assert(b.u>=bounds.min-.001&&b.u<=bounds.max+.001);assert.equal(b.lane,b.expectedLane);if(b.s>350)separated=true;}}}assert(separated);assert(q.balls.every(b=>b.s>420&&b.lane===0));}
console.log('PASS: 1–4 random forks, 2–4 lanes, 4–6 obstacle modules per lane, two-copy catalog limit, six varied finish modules, physical lane bounds and merge.');
