/* Fifty obstacle designs. A race draws from a double deck: at most two modules per design. */
(function(root){
const catalog=[
 ['moon','문 크레이터','fixed',1],['twins','쌍둥이 위성','fixed',2],['triangle','삼각 방벽','fixed',3],['vee','V자 성단','fixed',4],['zigzag','지그재그 잔해','fixed',5],['diamond','다이아 요새','fixed',6],['ring','운석 고리','fixed',7],['slalom','슬라럼 항로','fixed',8],['fence','엇갈린 방벽','fixed',9],['cluster','소행성 군집','fixed',10],
 ['rotor','단일 프로펠러','rotor',1],['tworotors','쌍 회전문','rotor',2],['cross','십자 풍차','rotor',3],['triplerotor','삼중 터빈','rotor',4],['orbit','궤도 회전팔','rotor',5],['windmill','별 풍차','rotor',6],['pendulum','진자 스윙','rotor',7],['counter','역회전 관문','rotor',8],
 ['slider','횡단 셔틀','moving',1],['pairslider','쌍 셔틀','moving',2],['piston','압축 피스톤','moving',3],['wave','웨이브 기둥','moving',4],['sweeper','회전 청소기','moving',5],['satellite','공전 위성','moving',6],['shuttle','대각선 셔틀','moving',7],['pulse','교차 펄스','moving',8],
 ['booststrip','가속 스트립','boost',1],['arrows','로켓 화살표','boost',2],['warpcoil','워프 코일','boost',3],['launchring','점프 스타게이트','boost',4],['slowfield','감속 성운','slow',1],['icering','빙결 고리','slow',2],['brakegrid','브레이크 격자','slow',3],['stickycells','중력 벌집','slow',4],
 ['splitter','삼각 분산기','hybrid',1],['forkgate','양날 관문','hybrid',2],['squeeze','협착 통로','hybrid',3],['checkergate','체커 방어선','hybrid',4],['orbitguard','위성 수비대','hybrid',5],['reactor','원자로 코어','hybrid',6],
 ['leftfang','왼쪽 레일 송곳','edge',1],['rightfang','오른쪽 레일 방벽','edge',2],['gatejaws','양측 게이트 턱','edge',3],['wallpistons','레일 피스톤','edge',4],['railsweeper','레일 회전팔','edge',5],['staggerteeth','교차 측면 이빨','edge',6],['edgeorbiter','측면 공전 위성','edge',7],['sidehammer','벽면 진자 해머','edge',8],['cornerrocks','모서리 운석 무더기','edge',9],['sidechicane','측면 시케인','edge',10]
].map(([id,name,family,variant])=>({id,name,family,variant}));
function layout(random,course={}){const length=course.length||1050,forks=course.forks||[];
 const deck=catalog.flatMap(d=>[d,d]);for(let i=deck.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]]}
 const take=test=>{const at=deck.findIndex(test);if(at<0)throw Error('Obstacle deck exhausted');return deck.splice(at,1)[0]};
 const totalLanes=forks.reduce((n,f)=>n+f.lanes,0),slots=Math.min(6,Math.floor(64/Math.max(1,totalLanes))),branchCount=slots*totalLanes,commonCount=Math.max(32,64-branchCount)+4;
 const early=[];for(let i=0;i<2;i++)early.push(take(d=>d.family==='boost'));const gentle=new Set(['vee','fence','cluster','piston','pairslider']);for(let i=0;i<4;i++)early.push(take(d=>gentle.has(d.id)));
 const finish=[take(d=>d.family==='fixed'),take(d=>['rotor','tworotors','pendulum'].includes(d.id)),take(d=>d.family==='edge'),take(d=>['slider','pairslider','shuttle'].includes(d.id)),take(d=>d.family==='fixed'),take(d=>d.family==='boost')],chosen=[];for(let i=0;i<10;i++)chosen.push(take(d=>d.family==='edge'));chosen.push(take(d=>d.family==='slow'));chosen.push(...deck.splice(0,commonCount-early.length-finish.length-chosen.length));
 for(const list of [early,chosen])for(let i=list.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[list[i],list[j]]=[list[j],list[i]]}
 const branch=[];for(const f of forks)for(let i=1;i<=slots;i++)for(let lane=1;lane<=f.lanes;lane++)branch.push({...deck.shift(),s:f.start+(f.end-f.start)*i/(slots+1),lane,forkId:f.id,lanes:f.lanes});
 const sites=[];for(let s=255;s<length-150;s++)if(!forks.some(f=>s>f.start-9&&s<f.end+9))sites.push(s);
 return [...early.map((d,i)=>({...d,s:75+i*30,lane:0,edgeSide:0,intro:true})),...chosen.map((d,i)=>({...d,s:sites[Math.floor((i+.5)*sites.length/chosen.length)],lane:0,edgeSide:[-1,1,0,random()<.5?-1:1][i%4]})),...finish.map((d,i)=>({...d,s:length-140+i*23,lane:0,finish:true})),...branch].sort((a,b)=>a.s-b.s||a.lane-b.lane).map((m,instance)=>({...m,instance}));
}
function expand(modules,random,width=s=>8.2-s*.002+Math.sin(s*.0155)*.35){const out=[];
 for(const m of modules){const start=out.length,v=m.variant,s=m.s,difficulty=1+s/1050*.65;
 const pin=(u,ds=0,r=.7,shape='round')=>out.push({type:'bumper',u,s:s+ds,r,shape});
 const rotor=(u,ds,r=2.9,speed=.65,phase=0)=>out.push({type:'spinner',u,s:s+ds,r,speed:speed*difficulty,dir:v%2?1:-1,phase,arms:1});
 const move=(u,ds,travel=2,speed=.7,phase=0,axis='u')=>out.push({type:'slider',u,s:s+ds,r:.68,travel,speed:speed*difficulty,phase,axis});
 if(m.family==='fixed'){
  if(v===1)pin(0,0,1.5,'crater');
  if(v===2){pin(-2.3,0,1.1,'moon');pin(2.3,1,1.1,'moon')}
  if(v===3){pin(0,-2,.8,'pyramid');pin(-2,1,.8,'pyramid');pin(2,1,.8,'pyramid')}
  if(v===4)for(let i=-2;i<=2;i++)pin(i*1.8,Math.abs(i)*1.5-1,.55,'hex');
  if(v===5)for(let i=0;i<4;i++)pin(i%2?2.8:-2.8,(i-1.5)*2.2,.85,'box');
  if(v===6)for(const [u,z] of [[0,-3],[-2,0],[2,0],[0,3]])pin(u,z,.72,'diamond');
  if(v===7)for(let i=0;i<8;i++){const a=i*Math.PI/4;pin(Math.cos(a)*3.4,Math.sin(a)*3.4,.52,'rock')}
  if(v===8)for(let i=0;i<3;i++)pin(i%2?-3:3,(i-1)*3,1,'cone');
  if(v===9)for(const side of [-1,1])for(let i=0;i<2;i++)pin(side*(1.1+i*2.6),side*2,.65,'box');
  if(v===10)for(const [u,z,r] of [[-3,-2,.9],[.2,-1,1.1],[3,2,.65],[-1.8,3,.6]])pin(u,z,r,'rock');
 }else if(m.family==='rotor'){
  if(v===1)rotor(0,0,3.6);
  if(v===2){rotor(-2.8,-1,1.8,.8);rotor(2.8,1,1.8,-.8)}
  if(v===3){rotor(0,0,3,.75);rotor(0,0,3,.75,Math.PI/2)}
  if(v===4)for(let i=0;i<3;i++)rotor((i-1)*3,0,1.2,(i%2?-.9:.9));
  if(v===5){rotor(0,0,3.5,.8);pin(-4,3,.6,'moon');pin(4,-3,.6,'moon')}
  if(v===6)for(let i=0;i<3;i++)rotor(0,0,2.8,.65,i*Math.PI/3);
  if(v===7){rotor(-2,0,3.2,.8);out[out.length-1].swing=true;out[out.length-1].phase=Math.PI/2}
  if(v===8){rotor(-2.8,-2,2,.9);rotor(2.8,2,2,-1.1)}
 }else if(m.family==='moving'){
  if(v===1)move(0,0,3.8);
  if(v===2){move(-2.5,-2,1.3,.85);move(2.5,2,1.3,.85,Math.PI)}
  if(v===3){move(-3.8,0,1,.9);move(3.8,0,1,.9,Math.PI)}
  if(v===4)for(let i=0;i<3;i++)move((i-1)*2.8,(i-1)*2,1,.9,i*2);
  if(v===5){rotor(0,0,3,.9);move(0,3,3,1.1)}
  if(v===6){move(0,0,3,.9,0,'orbit');pin(0,0,.8,'moon')}
  if(v===7)move(0,0,3.6,.9,0,'diagonal');
  if(v===8){move(-2.8,-2,1.2,1.1,0,'s');move(2.8,2,1.2,1.1,Math.PI,'s')}
 }else if(m.family==='boost'||m.family==='slow'){
  out.push({type:'effect',u:0,s,r:5.6,halfLength:3,kind:m.family,duration:m.family==='boost'?3:2.5,variant:v});
 }else if(m.family==='edge'){
  const w=width(s),edge=w-.25;
  if(v===1)for(let i=-1;i<=1;i++)pin(-edge,i*3.2,.95,'pyramid');
  if(v===2)for(let i=-1;i<=1;i++)pin(edge,i*3.2,1,'hex');
  if(v===3){pin(-edge,-1,1.45,'diamond');pin(edge,1,1.45,'diamond')}
  if(v===4){move(-(w-1),-1,.95,1.1);move(w-1,1,.95,1.1,Math.PI)}
  if(v===5){const side=m.edgeSide||1;rotor(side*(w-.8),0,2.6,1);pin(-side*edge,3,.9,'hex')}
  if(v===6)for(let i=0;i<4;i++)pin((i%2?1:-1)*edge,(i-1.5)*3,1,'cone');
  if(v===7){move(-(w-1.1),-1,1,1,0,'orbit');move(w-1.1,1,1,1,Math.PI,'orbit')}
  if(v===8){rotor(-(w-.3),0,3.1,.9,Math.PI/2);out[out.length-1].swing=true;pin(edge,3,1,'rock')}
  if(v===9)for(const side of [-1,1]){pin(side*edge,-2,1.1,'rock');pin(side*(w-2.5),2,.8,'rock')}
  if(v===10){pin(-edge,-4,1.25,'box');pin(edge,0,1.25,'box');pin(-edge,4,1.25,'box')}
 }else{
  if(v===1){pin(0,-2,1,'pyramid');pin(-2.8,2,.7,'pyramid');pin(2.8,2,.7,'pyramid')}
  if(v===2){rotor(-2.6,0,2,.9);rotor(2.6,0,2,-.9);pin(0,3,.65,'diamond')}
  if(v===3){move(-3,0,1.3,1.2);move(3,0,1.3,1.2,Math.PI);pin(0,3,.65,'hex')}
  if(v===4){for(let i=-1;i<=1;i++)pin(i*3,-2,.65,'box');move(0,2,3.5,1.2)}
  if(v===5){pin(0,0,1.1,'moon');move(0,0,3.6,1.1,0,'orbit');move(0,0,3.6,1.1,Math.PI,'orbit')}
  if(v===6){pin(0,0,1,'hex');rotor(0,0,3.2,1);out.push({type:'effect',u:0,s:s+5,r:5.5,halfLength:1.2,kind:'boost',duration:2,variant:2})}
 }
 // Alternate full-width modules between the center and either rail. Rail paths must not be safe lanes.
 let shift=0;if(!m.lane&&m.edgeSide&& !['edge','boost','slow'].includes(m.family)){let min=Infinity,max=-Infinity;for(let i=start;i<out.length;i++){const o=out[i];if(o.type==='effect')continue;const reach=o.r+(o.travel||0);min=Math.min(min,o.u-reach);max=Math.max(max,o.u+reach)}if(Number.isFinite(min))shift=m.edgeSide>0?width(s)+.2-max:-width(s)-.2-min;}
 // Narrow roads use open, staggered shapes rather than enclosing clusters.
 if(m.lane){const pieces=out.splice(start),physical=pieces.filter(o=>o.type!=='effect').slice(0,3),effects=pieces.filter(o=>o.type==='effect');physical.forEach((o,i)=>{o.s=m.s+(i-(physical.length-1)/2)*3.6;if(o.type==='bumper'){o.u=(i%2?1:-1)*(v%2?2.2:1.4);o.r=Math.min(o.r,.72)}else if(o.type==='slider'){o.u=0;o.r=.55;o.axis='u';o.travel=Math.min(o.travel,1.8)}});out.push(...physical,...effects);}
 // Fit every design into its own lane; leave a marble-wide passage at either side.
 let laneScale=1,laneCenter=0,laneHalf=0;if(m.lane){const w=width(m.s);laneHalf=w/m.lanes;laneCenter=-w+(m.lane-.5)*2*laneHalf;let reach=.1;for(let i=start;i<out.length;i++){const o=out[i];if(o.type!=='effect')reach=Math.max(reach,Math.abs(o.u)+o.r+(o.travel||0))}laneScale=Math.min(1,(laneHalf-1.5)/reach);}
 for(let i=start;i<out.length;i++){const o=out[i];o.s=m.s+(o.s-m.s)*.8;if(m.intro||m.finish){if(o.type==='effect'){o.r=width(m.s)+.5;o.duration=1.5;o.strength=1.12}else{o.r*=.8;if(o.speed)o.speed*=m.finish?.8:.55;if(o.travel)o.travel*=m.finish?.8:.65}}
 if(m.lane){o.u=laneCenter+o.u*laneScale;if(o.type==='effect'){o.r=laneHalf-.15;o.visualScale=Math.min(1,o.r/5.6)}else{o.r*=laneScale;if(o.travel)o.travel*=laneScale}o.lane=m.lane;o.forkId=m.forkId;}else if(o.type!=='effect')o.u+=shift;
 if(!m.lane&&o.type==='bumper'){const w=width(o.s),gap=w-Math.abs(o.u)-o.r;if(gap<.98&&Math.abs(o.u)>w/2)o.u=Math.sign(o.u)*(w-.2)}o.module=m.instance;o.design=m.id;o.phase??=random()*Math.PI*2;}

 }
 return out;
}
const api={catalog,layout,expand};if(typeof module!=='undefined')module.exports=api;else root.SpaceObstacles=api;
})(typeof window!=='undefined'?window:globalThis);
