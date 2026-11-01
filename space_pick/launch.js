/* Curved glass hopper with two hinged floor doors, suspended over the starting grid. */
(function(root){
class LaunchCapsule{
 constructor(T,scene,point){this.T=T;this.scene=scene;this.point=point;this.group=null;this.doors=[];this.materials=[];this.lights=[];this.center=0;this.depth=6}
 hide(){if(this.group)this.group.visible=false}
 prepare(balls){const T=this.T;this.hide();if(this.group){this.group.traverse(o=>{o.geometry?.dispose();if(o.material)o.material.dispose()});this.scene.remove(this.group)}this.group=new T.Group();this.scene.add(this.group);this.doors=[];this.materials=[];this.lights=[];const min=Math.min(...balls.map(b=>b.s))-1.15,max=Math.max(...balls.map(b=>b.s))+1.15;this.center=(min+max)/2;this.depth=max-min;const W=7.65;
 const material=(color,opacity=1,glow=0)=>{const m=new T.MeshStandardMaterial({color,metalness:.65,roughness:.28,transparent:opacity<1,opacity,side:T.DoubleSide,emissive:glow,emissiveIntensity:.6,depthWrite:opacity>=1});this.materials.push({material:m,opacity});return m};
 const metal=material(0x364665),trim=material(0x8beaff,1,0x53cfff),glass=material(0x67c4e5,.17),lid=material(0x4c658a),top=material(0x6fb5da,.10);
 const mesh=(g,m,p,parent=this.group)=>{const o=new T.Mesh(g,m);o.position.copy(p);parent.add(o);return o};
 const beam=(a,b,r=.06,m=trim)=>{const d=b.clone().sub(a),o=mesh(new T.CylinderGeometry(r,r,d.length(),7),m,a.clone().add(b).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());return o};
 const surface=(coordinates,m)=>{const vertices=coordinates.flatMap(p=>[p.x,p.y,p.z]),g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(vertices,3));g.setIndex([0,1,2,0,2,3]);g.computeVertexNormals();mesh(g,m,new T.Vector3())};
 const segments=Math.max(3,Math.ceil(this.depth/2.2)),step=this.depth/segments;
 for(let i=0;i<segments;i++){const a=min+i*step,b=a+step,s=(a+b)/2;for(const side of [-1,1]){surface([this.point(a,side*W,8),this.point(b,side*W,8),this.point(b,side*W,10.6),this.point(a,side*W,10.6)],glass);beam(this.point(a,side*W,8),this.point(b,side*W,8),.09,metal);beam(this.point(a,side*W,10.6),this.point(b,side*W,10.6));const hinge=new T.Group();hinge.position.copy(this.point(s,side*W,8));this.group.add(hinge);mesh(new T.BoxGeometry(W,.16,step+.06),lid,new T.Vector3(-side*W/2,0,0),hinge);mesh(new T.BoxGeometry(W-.2,.025,.07),trim,new T.Vector3(-side*W/2,.095,0),hinge);this.doors.push({hinge,side})}surface([this.point(a,-W,10.6),this.point(b,-W,10.6),this.point(b,W,10.6),this.point(a,W,10.6)],top);}
 for(const s of [min,max]){surface([this.point(s,-W,8),this.point(s,W,8),this.point(s,W,10.6),this.point(s,-W,10.6)],glass);for(const side of [-1,1])beam(this.point(s,side*W,8),this.point(s,side*W,10.6),.1,metal);beam(this.point(s,-W,10.6),this.point(s,W,10.6))}
 for(let i=0;i<3;i++){const m=material(0x62573c,1,0x302311);this.lights.push(mesh(new T.SphereGeometry(.16,12,8),m,this.point(max,-.65+i*.65,10.75)))}
 root.MarbleRace.armLaunch(balls);this.update(0,3);
 }
 lift(ball,time){return ball.verticalEnabled?Math.max(0,ball.lift):0}
 update(time,countdown){if(!this.group)return;const fade=Math.max(0,Math.min(1,4-time));this.group.visible=fade>0;if(!this.group.visible)return;const p=Math.max(0,Math.min(1,time/.42)),angle=(1-(1-p)**3)*1.88;for(const door of this.doors)door.hinge.rotation.z=door.side*angle;for(const entry of this.materials)entry.material.opacity=entry.opacity*fade;const lit=countdown>0?4-Math.ceil(countdown):3;this.lights.forEach((o,i)=>{const color=countdown<=0?0x91ffb7:i<lit?0xffd581:0x403c32;o.material.color.setHex(color);o.material.emissive.setHex(color)})}
}
root.LaunchCapsule=LaunchCapsule;
})(window);
