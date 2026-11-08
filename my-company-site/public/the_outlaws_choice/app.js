'use strict';
(() => {
 const $=id=>document.getElementById(id),canvas=$('game'),ctx=canvas.getContext('2d');
 const W=1672,H=941,FRAME={x:150,y:180,w:1372,h:690},images={},errors=[];
 const FAN={x:170,y:476,w:1340,h:192};
 const RESULT={x:664,y:515,w:292,h:270};
 const HANDS={shuffle:{scale:1.12,sleeveY:55},deal:{scale:1.02,sleeveY:100}};
 const paths={intro:'assets/v2/action_plate.png',background:'assets/backgrounds/saloon_clean.png',tabletop:'assets/backgrounds/framed_tabletop_v4.png',fan:'assets/v2/fan_table.png',back:'assets/cards/back_table.png',front:'assets/cards/front_table_blank.png'};
 for(const group of Object.keys(HANDS)){
  for(let i=0;i<4;i++)paths[group+i]=`assets/hands/${group}_0${i}.png`;
 }
 const state={ready:false,view:'setup',phase:'idle',elapsed:0,result:null,minimum:1,maximum:50,allowDuplicates:false,remaining:[],history:[],busy:false,quick:matchMedia('(prefers-reduced-motion: reduce)').matches,musicEnabled:true};
 const durations={shuffle:1500,spread:1200,push:1000,flip:650},sequence=['shuffle','spread','push','flip','result'];
 let last=0,audio=null,announced='',soundFrame=-1;
 const music=$('music');
 let startingMusic=false;
 const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x)},lerp=(a,b,t)=>a+(b-a)*t;
 function image(key,x,y,w,h){ctx.drawImage(images[key],x,y,w,h)}
 function announce(text){if(text!==announced){announced=text;$('status').textContent=text}}
 function load(key,path){return new Promise((resolve,reject)=>{const img=new Image;img.onload=()=>{images[key]=img;resolve()};img.onerror=()=>reject(Error(path));img.src=path})}
 function randomIndex(size){const limit=Math.floor(4294967296/size)*size,word=new Uint32Array(1);do{crypto.getRandomValues(word)}while(word[0]>=limit);return word[0]%size}
 function exhausted(){return !state.allowDuplicates&&state.remaining.length===0}
 function updateControls(){
  const ended=exhausted();
  $('draw').disabled=state.busy||ended;
  $('home').disabled=state.busy;
  $('draw').textContent=state.busy?'카드를 고르고 있습니다…':ended?'모든 번호를 뽑았습니다':state.history.length?'한 장 더 뽑기':'뽑기';
  $('remaining').textContent=state.allowDuplicates?`중복 허용 · ${state.history.length}회 추첨`:`남은 번호 ${state.remaining.length}개 / ${state.maximum-state.minimum+1}개`;
 }
 function updateMusicButton(){
  const toggle=$('music-toggle');
  toggle.setAttribute('aria-pressed',String(state.musicEnabled));
  toggle.title=state.musicEnabled?'배경음악 끄기':'배경음악 켜기';
 }
 function resumeMusic(){
  if(!state.musicEnabled||!music.paused||startingMusic||music.error)return;
  startingMusic=true;
  // A blocked autoplay attempt leaves music enabled for the next interaction.
  music.play().catch(()=>{}).finally(()=>{startingMusic=false});
 }
 function toggleMusic(){
  state.musicEnabled=!state.musicEnabled;
  updateMusicButton();
  if(state.musicEnabled)resumeMusic();
  else music.pause();
 }
 function unlockCardAudio(){
  try{
   audio??=new AudioContext();
   if(audio.state!=='running')void audio.resume().catch(()=>{});
  }catch{audio=null}
 }
 function playSound(phase){
  if(!audio)return;
  const seconds=phase==='spread'?.27:phase==='push'?.18:.085;
  const length=Math.floor(audio.sampleRate*seconds);
  const buffer=audio.createBuffer(1,length,audio.sampleRate);
  const data=buffer.getChannelData(0);
  let previous=0;
  for(let i=0;i<length;i++){
   const time=i/length,noise=Math.random()*2-1;
   const attack=Math.min(1,time*38);
   const ruffle=phase==='spread'?.45+.55*Math.abs(Math.sin(time*Math.PI*8)):1;
   data[i]=(noise-previous*.68)*attack*ruffle*Math.pow(1-time,2.4)*.27;
   previous=noise;
  }
  const source=audio.createBufferSource();
  source.buffer=buffer;
  source.connect(audio.destination);
  source.start();
 }
 function setPhase(phase){
  state.phase=phase;
  state.elapsed=0;
  soundFrame=-1;
  const words={idle:'뽑기 버튼을 누르면 추첨을 시작합니다.',shuffle:'손이 카드를 섞고 있습니다.',spread:'카드를 테이블에 펼칩니다.',push:'카드 한 장을 앞으로 밀어냅니다.',flip:'운명의 번호를 공개합니다.'};
  if(phase==='result'){
   state.busy=false;
   state.history.push(state.result);
   $('result-label').textContent=`선택된 번호 · ${state.result}`;
   const item=document.createElement('li');
   item.textContent=String(state.result);
   $('history').appendChild(item);
   while($('history').children.length>20)$('history').removeChild($('history').firstElementChild);
   announce(`선택된 번호는 ${state.result}입니다.${exhausted()?' 모든 번호를 뽑았습니다.':''}`);
   if(state.quick)playSound('flip');
  }else{
   announce(words[phase]);
   if(phase==='spread'||phase==='push'||phase==='flip')playSound(phase);
  }
  updateControls();
 }
 function pick(){
  if(!state.ready||state.view!=='play'||state.busy||exhausted())return;
  unlockCardAudio();
  if(state.allowDuplicates)state.result=state.minimum+randomIndex(state.maximum-state.minimum+1);
  else{
   const index=randomIndex(state.remaining.length);
   state.result=state.remaining[index];
   state.remaining[index]=state.remaining[state.remaining.length-1];
   state.remaining.pop();
  }
  state.busy=true;
  $('result-label').textContent='운명의 카드를 고르고 있습니다.';
  setPhase(state.quick?'result':'shuffle');
 }
 function switchView(view){state.view=view;$('scene').dataset.view=view;$('setup-form').hidden=view!=='setup';for(const id of ['action-frame','play-toolbar','play-footer'])$(id).hidden=view!=='play';canvas.setAttribute('aria-label',view==='setup'?'서부 술집의 남자와 추첨 설정 테이블':'나무 프레임 안의 손과 카드 추첨 장면')}
 function start(event){
  event.preventDefault();
  if(!state.ready||state.view!=='setup')return;
  const minimum=Number($('minimum').value),maximum=Number($('maximum').value);
  if(!Number.isInteger(minimum)||!Number.isInteger(maximum)||minimum<1||maximum>9999||minimum>maximum){
   $('error').textContent='1~9999 사이에서 시작 번호가 끝 번호보다 작거나 같게 정해 주세요.';
   return;
  }
  $('error').textContent='';
  state.minimum=minimum;
  state.maximum=maximum;
  state.allowDuplicates=$('repeat').checked;
  state.quick=$('quick').checked;
  state.remaining=Array.from({length:maximum-minimum+1},(_,i)=>minimum+i);
  state.history=[];
  state.result=null;
  $('history').replaceChildren();
  $('session-label').textContent=`${minimum} — ${maximum} · ${state.allowDuplicates?'중복 허용':'중복 없음'}`;
  $('result-label').textContent='카드가 준비되었습니다.';
  switchView('play');
  setPhase('idle');
  $('draw').focus();
 }
 function home(){
  if(state.busy)return;
  switchView('setup');
  state.phase='idle';
  state.result=null;
  announce('새 테이블의 번호 범위를 정하세요.');
  $('start').focus();
 }
 function card(key,x,y,w,h){
  ctx.save();
  ctx.shadowColor='#170a06b8';
  ctx.shadowBlur=9;
  ctx.shadowOffsetY=7;
  image(key,x,y,w,h);
  ctx.restore();
 }
 function number(value,x,y,w,h,alpha=1){ctx.save();ctx.globalAlpha=alpha;ctx.fillStyle='#65180e';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`bold ${Math.min(h*.43,String(value).length>3?47:76)}px Georgia`;ctx.fillText(String(value),x+w/2,y+h*.47,w*.73);ctx.restore()}
 function hands(group,pose){
  const key=group+pose;
  const sprite=images[key];
  const {scale,sleeveY}=HANDS[group];
  const width=sprite.width*scale;
  // Draw the complete pose at a uniform scale. The frame only conceals the sleeve roots.
  image(key,(W-width)/2,FRAME.y-sleeveY*scale,width,sprite.height*scale);
 }
 function fan(progress=1){
  const width=FAN.w*clamp(progress);
  ctx.save();
  ctx.beginPath();
  ctx.rect(FAN.x+FAN.w-width,FAN.y,width,FAN.h+14);
  ctx.clip();
  ctx.shadowColor='#160a06aa';
  ctx.shadowBlur=7;
  ctx.shadowOffsetY=6;
  image('fan',FAN.x,FAN.y,FAN.w,FAN.h);
  ctx.restore();
 }
 function stageArt(){
  const p=clamp(state.elapsed/(durations[state.phase]||1));
  switch(state.phase){
   case 'shuffle':{
    const poses=[0,1,2,3,2,0];
    const i=Math.floor(state.elapsed/180)%poses.length;
    hands('shuffle',poses[i]);
    if(soundFrame!==i){playSound('shuffle');soundFrame=i}
    break;
   }
   case 'spread':fan(ease(p));hands('deal',Math.min(2,Math.floor(p*3)));break;
   case 'push':{
    fan();
    const t=ease(p);
    card('back',lerp(760,RESULT.x,t),lerp(486,RESULT.y,t),lerp(116,RESULT.w,t),lerp(128,RESULT.h,t));
    hands('deal',p<.3?2:3);
    break;
   }
   case 'flip':{
    fan();
    const t=ease(p),scale=Math.max(.025,Math.abs(Math.cos(Math.PI*t))),front=t>.5;
    const width=RESULT.w*scale,x=RESULT.x+(RESULT.w-width)/2;
    card(front?'front':'back',x,RESULT.y,width,RESULT.h);
    if(front)number(state.result,x,RESULT.y,width,RESULT.h,Math.min(1,(t-.5)*5));
    hands('deal',3);
    break;
   }
   case 'result':
    fan();
    card('front',RESULT.x,RESULT.y,RESULT.w,RESULT.h);
    number(state.result,RESULT.x,RESULT.y,RESULT.w,RESULT.h);
    hands('deal',3);
    break;
   default:hands('shuffle',0);
  }
 }
 function render(){
  ctx.imageSmoothingEnabled=false;
  ctx.clearRect(0,0,W,H);
  if(!state.ready)return;
  if(state.view==='setup'){
   image('intro',0,0,W,H);
   ctx.drawImage(images.background,0,550,W,H-550,0,550,W,H-550);
   return;
  }
  image('background',0,0,W,H);
  ctx.fillStyle='rgba(8,5,3,.72)';
  ctx.fillRect(0,0,W,H);
  ctx.save();
  ctx.beginPath();
  ctx.rect(FRAME.x,FRAME.y,FRAME.w,FRAME.h);
  ctx.clip();
  const table=images.tabletop;
  const scale=Math.max(FRAME.w/table.width,FRAME.h/table.height);
  const width=table.width*scale,height=table.height*scale;
  image('tabletop',FRAME.x+(FRAME.w-width)/2,FRAME.y+(FRAME.h-height)/2,width,height);
  stageArt();
  ctx.restore();
 }
 function tick(time){const delta=last?Math.min(80,time-last):0;last=time;if(state.view==='play'&&state.busy){state.elapsed+=delta;if(state.elapsed>durations[state.phase])setPhase(sequence[sequence.indexOf(state.phase)+1])}render();requestAnimationFrame(tick)}
 $('setup-form').addEventListener('submit',start);
 $('draw').addEventListener('click',pick);
 $('home').addEventListener('click',home);
 const volume=$('music-volume');
 const setVolume=()=>{music.volume=Number(volume.value)/100};
 volume.addEventListener('input',setVolume);
 $('music-toggle').addEventListener('click',toggleMusic);
 document.addEventListener('click',resumeMusic);
 document.addEventListener('keydown',resumeMusic);
 setVolume();
 resumeMusic();
 $('quick').checked=state.quick;
 Promise.all(Object.entries(paths).map(([key,path])=>load(key,path).catch(error=>errors.push(error.message)))).then(()=>{if(errors.length){announce('불러오지 못한 이미지: '+errors.join(', '));return}state.ready=true;$('start').disabled=false;$('start').textContent='시작';announce('번호 범위와 중복 허용 여부를 정한 뒤 시작하세요.');requestAnimationFrame(tick)});
 window.outlawDiagnostics=()=>({...state,remaining:[...state.remaining],history:[...state.history],loadedImages:Object.keys(images).length,errors:[...errors]});
})();
