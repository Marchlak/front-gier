"use strict";

// All artwork is drawn on a small pixel grid, then enlarged by the browser.
function noise(seed) {
  return () => {
    seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}
function brush(ctx) {
  return {
    box(x,y,w,h,color) {
      ctx.fillStyle=color;
      ctx.fillRect(Math.round(x),Math.round(y),Math.ceil(w),Math.ceil(h));
    },
    poly(points,color) {
      ctx.fillStyle=color;
      ctx.beginPath();
      points.forEach(([x,y],i) => i ? ctx.lineTo(Math.round(x),Math.round(y)) : ctx.moveTo(Math.round(x),Math.round(y)));
      ctx.closePath(); ctx.fill();
    }
  };
}
function paintBadge(canvas, kind) {
  canvas.width=100; canvas.height=84;
  const {box,poly}=brush(canvas.getContext("2d"));
  const rand=noise(39);
  if(kind==="krill") {
    box(0,0,100,84,"#18485b");
    for(let i=0;i<90;i++) box(rand()*100,rand()*84,2+rand()*10,1,rand()>.5?"#25586a":"#1d5061");
    for(let i=0;i<12;i++) {const x=rand()*100,y=rand()*80;box(x,y,2,2,"#75a3a8")}
    poly([[17,42],[22,44],[21,51],[32,47],[40,37],[53,31],[64,31],[69,34],[77,32],[72,39],[62,40],[51,47],[38,53],[26,54],[17,50]],"#faac92");
    poly([[25,50],[41,42],[54,35],[63,34],[49,42],[33,51]],"#ffdcc1");
    box(63,32,3,3,"#29384a");
    for(let i=0;i<5;i++) {const x=37+i*5,y=50-i*2;poly([[x,y],[x+2,y],[x+6,y+8],[x+3,y+7]],"#e39587")}
    poly([[68,33],[80,24],[92,23],[81,26]],"#fac4a4");
    poly([[69,35],[86,30],[97,31],[86,32]],"#fac4a4");
  } else {
    box(0,0,100,84,"#8a778c");box(0,36,100,48,"#66667a");
    box(73,12,10,10,"#f5c59f");
    for(let i=0;i<8;i++) {const x=i*15,y=34+rand()*22;box(x,y,13,84-y,"#55566c")}
    box(18,23,46,61,"#383d50");box(21,22,36,62,"#686372");box(18,20,47,4,"#37394b");
    box(28,16,8,5,"#444456");box(45,13,1,7,"#38394c");box(42,14,7,1,"#38394c");
    for(let row=0;row<5;row++) for(let col=0;col<4;col++) {
      const x=24+col*8,y=27+row*11;
      box(x,y,5,7,"#34384a"); if((col+row*3)%4!==1) box(x+1,y+1,3,5,(col+row)%2?"#e2a87f":"#f7cc92");
    }
    box(63,49,21,35,"#4b495c");box(62,47,23,3,"#39394b");
    for(let i=0;i<6;i++) box(66+(i%3)*6,54+Math.floor(i/3)*10,3,5,"#e7ad88");
    box(0,80,100,4,"#303244");
  }
}

(() => {
  const canvas=document.getElementById("landscape");
  const ctx=canvas.getContext("2d");
  const {box,poly}=brush(ctx);
  const motion=document.getElementById("motion");
  const preference=matchMedia("(prefers-reduced-motion: reduce)");
  let moving=!preference.matches, elapsed=preference.matches ? 4 : 0, last=0, frame=0;
  let background, foreground, w, h, ground, spriteScale;
  function layer(draw) {
    const layer=document.createElement("canvas");
    layer.width=w;layer.height=h;draw(brush(layer.getContext("2d")));return layer;
  }
  function terrain({box,poly}) {
    const r=noise(971);
    const sky=ctx.createLinearGradient(0,0,0,h*.65);
    sky.addColorStop(0,"#625d79");
    sky.addColorStop(.46,"#bb8991");
    sky.addColorStop(1,"#f4c89e");
    box(0,0,w,h,sky);
    const sunX=Math.round(w*.79),sunY=Math.round(h*.31),radius=19;
    for(let dy=-radius;dy<=radius;dy++){
      const dx=Math.floor(Math.sqrt(radius*radius-dy*dy));
      box(sunX-dx,sunY+dy,dx*2+1,1,"#ffe4ab");
    }
    function ridge(base,amplitude,step,color) {
      let previous=base;
      for(let x=0;x<w;x+=2){
        if(x%step===0) previous=base+amplitude*(.59*Math.sin(x*.023)+.37*Math.sin(x*.061+1)+r()*.15);
        box(x,previous,2,h-previous,color);
      }
    }
    ridge(h*.48,h*.12,2,"#998291");ridge(h*.54,h*.10,2,"#7f7585");ridge(h*.61,h*.07,2,"#626574");
    function fir(x,y,height,color) {
      box(x,y-height,2,height,color);
      for(let j=1;j<=5;j++){const half=Math.floor(height*j*.043);poly([[x+1,y-height+height*(j-1)*.16],[x+half+1,y-height+height*j*.18],[x-half,y-height+height*j*.18]],color)}
    }
    for(let i=0;i<w;i+=3) fir(i,h*.64+Math.sin(i*.04)*3,5+r()*12,"#666776");
    for(let i=0;i<w;i+=4) fir(i,h*.70+Math.sin(i*.021)*5,7+r()*17,"#535b63");
    ridge(h*.68,h*.035,2,"#5b6263");ridge(h*.72,h*.04,2,"#444e55");
    box(0,ground-5,w,h-ground+5,"#56594f");
    for(let i=0;i<w*.8;i++)box(r()*w,ground-5+r()*12,1+r()*5,1,r()>.4?"#76705a":"#41474a");
    // Silhouetted field poles and slack wire behind the road.
    const poles=[.04,.24,.47,.94].map((p,i)=>({x:Math.round(w*p),y:ground-25-(i%2)*9}));
    poles.forEach(({x,y},i)=>{
      box(x,y,2,ground-y,"#44434b");box(x-4,y+3,10,2,"#48464c");
      if(!i)return;
      const a=poles[i-1];
      for(let xx=a.x;xx<x;xx+=2){const t=(xx-a.x)/(x-a.x);box(xx,a.y+(y-a.y)*t+10*t*(1-t)*4+3,2,1,"#59535b")}
    });
  }
  function trench({box,poly}) {
    const r=noise(24);
    // Each bay has a stepped lip, timber lining and a staggered sandbag parapet.
    const lip=x=>Math.round(h*.845+Math.sin(x*.018)*4+(Math.floor(x/84)%2)*5);
    for(let x=0;x<w;x+=2)box(x,lip(x),2,h-lip(x),"#383b40");
    for(let x=0;x<w;x+=19) {
      const y=lip(x);
      box(x,y+7,18,h-y-7,"#4c4848");
      for(let j=y+10;j<h;j+=5){box(x,j,18,1,"#393940");box(x+3,j-1,10,1,"#56504d")}
      if(Math.floor(x/19)%3===0){box(x,y+4,4,h-y,"#302f37");box(x+1,y+4,1,h-y,"#65605a")}
    }
    for(let row=0;row<2;row++) for(let x=-20+row*9;x<w;x+=18) {
      const y=lip(x)-row*4, tone=r()>.5?"#716c5a":"#666454";
      box(x+1,y,15,5,"#393b39");box(x+2,y-1,13,5,tone);box(x+4,y-1,9,1,"#938770");box(x+14,y+1,1,2,"#514f48");
    }
    for(let x=0;x<w;x+=2){
      const y=h-4+Math.sin(x*.026)*3-r()*3;box(x,y,2,h-y,"#272b33");
      if(r()<.12)poly([[x,y+1],[x-2,y-5-r()*3],[x+2,y]],"#31333a");
    }
  }
  function wheel(cx,cy,radius,angle,rim,hub) {
    ctx.save();
    ctx.translate(cx,cy);
    const r=radius, edge=Math.round(r*.56);
    poly([[-edge,-r],[edge,-r],[r,-edge],[r,edge],[edge,r],[-edge,r],[-r,edge],[-r,-edge]],"#30343a");
    const inner=r-2;
    poly([[-edge,-inner],[edge,-inner],[inner,-edge],[inner,edge],[edge,inner],[-edge,inner],[-inner,edge],[-inner,-edge]],rim);
    for(let spoke=0;spoke<3;spoke++) {
      const a=angle+spoke*Math.PI*2/3;
      box(Math.cos(a)*(r-3),Math.sin(a)*(r-3),2,2,"#424945");
    }
    box(-1,-1,3,3,hub);
    ctx.restore();
  }
  function tank(t) {
    box(-54,0,103,2,"#41454a");
    poly([[-53,-14],[-47,-20],[43,-20],[50,-14],[44,-5],[36,0],[-39,0],[-49,-5]],"#292e34");
    poly([[-49,-13],[-44,-17],[40,-17],[46,-13],[39,-5],[34,-3],[-37,-3],[-46,-7]],"#61655c");
    for(let i=0;i<6;i++) wheel(-37+i*14,-10,7,t*4,"#818474","#b3ab8c");
    ctx.save();
    ctx.translate(0,Math.floor(t*3)%5===0?-1:0);
    poly([[-56,-18],[-46,-25],[-35,-27],[31,-28],[47,-22],[52,-16],[49,-13],[-53,-13]],"#454d48");
    poly([[-51,-21],[-40,-26],[31,-27],[44,-22],[35,-20],[-52,-17]],"#83907a");
    box(-51,-16,99,2,"#aca58a");
    for(let i=0;i<4;i++){box(-43+i*12,-23,10,5,i%2?"#536456":"#66745f");box(-41+i*12,-23,6,1,"#9b9e81")}
    poly([[-20,-28],[-17,-37],[-8,-42],[17,-42],[28,-35],[29,-28],[16,-25],[-19,-25]],"#586857");
    poly([[-16,-36],[-8,-41],[17,-41],[22,-37]],"#a0a38a");
    box(-13,-35,8,6,"#667963");box(6,-35,9,2,"#d6bd92");box(9,-37,3,6,"#d6bd92");
    box(24,-35,9,6,"#566354");box(31,-35,34,3,"#78816e");box(31,-32,38,2,"#424e47");
    box(62,-36,9,5,"#626f5d");box(64,-36,6,1,"#b2ad91");
    box(-8,-44,15,3,"#626f5f");box(-6,-45,11,1,"#a9a88d");
    poly([[-15,-37],[-20,-58],[-19,-58],[-14,-37]],"#484d52");
    ctx.restore();
  }
  function carrier(t) {
    // Four exposed wheels and a low, sloping hull distinguish the BTR from the tank.
    poly([[-50,-22],[-40,-30],[22,-30],[41,-24],[53,-16],[47,-9],[-41,-9],[-51,-14]],"#47534d");
    poly([[-49,-22],[-38,-28],[22,-28],[42,-22],[31,-19],[-45,-19]],"#879179");
    poly([[-42,-18],[32,-18],[48,-21],[43,-13],[-39,-13]],"#6b7963");
    poly([[19,-28],[26,-26],[31,-23],[21,-24]],"#323f43");
    box(-33,-24,14,2,"#48544f");
    box(-15,-23,8,3,"#39474a");
    box(-3,-23,8,3,"#39474a");
    box(10,-22,2,8,"#b4a98a");
    poly([[-8,-30],[-4,-36],[6,-37],[13,-32],[11,-29]],"#596956");
    box(6,-35,19,2,"#555e53");
    box(46,-19,4,2,"#f7d69b");
    for(const x of [-36,-14,12,35]) wheel(x,-8,9,t*4,"#727968","#c6b799");
  }
  function jet() {
    // Banked wings, twin exhausts and a glass canopy.
    poly([[-18,-3],[-33,-22],[-26,-22],[-7,-10],[9,-4]],"#727b89");
    poly([[-28,-4],[-38,-18],[-32,-18],[-19,-7]],"#454c5b");
    poly([[-35,-5],[-8,-6],[7,-8],[17,-6],[30,-1],[43,1],[25,5],[-23,5],[-35,2]],"#58616d");
    poly([[-29,-4],[-9,-5],[8,-7],[29,0],[7,0]],"#a4a5a1");
    poly([[6,-7],[13,-10],[18,-9],[24,-4],[17,-4]],"#4d6575");
    box(13,-9,5,1,"#c2d8d9");
    poly([[9,1],[-15,18],[-28,18],[-16,4],[-9,1]],"#677485");
    poly([[6,2],[-16,16],[-23,16],[-12,6]],"#858e99");
    poly([[-24,2],[-37,10],[-42,10],[-35,2]],"#4c5665");
    box(-37,-3,5,3,"#343d49");box(-37,1,5,2,"#343d49");
  }
  function rocket(t) {
    const flame=Math.floor(t*9)%3;
    poly([[-23,-4],[-33-flame*2,0],[-25,1],[-30,4],[-21,3]],"#efa276");
    poly([[-22,-2],[-29-flame,0],[-22,2]],"#ffe3a2");
    poly([[-18,-4],[-24,-11],[-18,-11],[-6,-4]],"#666f6d");
    poly([[-22,-4],[13,-4],[25,0],[13,4],[-22,4]],"#d2c6b2");
    poly([[-21,1],[21,1],[13,4],[-21,4]],"#91918a");
    poly([[13,-4],[25,0],[17,2],[12,1]],"#625f66");
    poly([[-18,3],[-24,12],[-18,12],[-7,4]],"#656d70");
    box(-21,-4,3,8,"#4a5056");box(6,-4,3,7,"#9b726a");
  }
  function shahed(t) {
    // The delta planform is seen from above; the propeller sits at the back.
    poly([[25,0],[-23,-16],[-20,-5],[-13,0],[-20,6],[-23,16]],"#61645e");
    poly([[22,0],[-21,-14],[-18,-5],[-10,-1]],"#c4b69b");
    poly([[22,0],[-21,14],[-18,5],[-10,1]],"#9e9988");
    poly([[-17,-3],[13,-3],[27,0],[13,3],[-17,3]],"#dbceb5");
    box(-21,-2,5,4,"#515452");
    const blade=Math.floor(t*14)%2 ? 5 : 2;
    box(-23,-blade,2,2*blade+1,"#474a4d");
    box(-22,-15,3,3,"#555759");box(-22,12,3,3,"#555759");
  }

  const uniforms = [
    {coat:"#667563", pack:"#50594c", helmet:"#89927a"},
    {coat:"#777661", pack:"#57594d", helmet:"#96917a"},
    {coat:"#64716b", pack:"#4e5753", helmet:"#818e80"}
  ];

  function leg(phase, color) {
    const step = Math.sin(phase);
    const lift = Math.max(0, Math.cos(phase));
    const knee = Math.round(step * 2 + lift * 3);
    const boot = Math.round(step * 6);
    const sole = -Math.round(lift * 3);
    poly([[-2,-12],[2,-12],[knee+2,-7],[boot+1,sole-2],
          [boot-2,sole-2],[knee-2,-7]],color);
    box(boot-2,sole-3,4,3,"#383b39");
    box(boot-2,sole-1,6,1,"#303437");
  }

  function footPatrol(t) {
    uniforms.forEach((uniform, i) => {
      const phase = t * 7.5 + i * 2.3;
      ctx.save();
      ctx.translate([-33,0,28][i], i === 1 ? -1 : 0);
      leg(phase + Math.PI, "#414b45");
      leg(phase, uniform.coat);
      ctx.translate(0,-Math.round(Math.abs(Math.sin(phase))));
      // Pack, coat, face in profile and a helmet with a short brim.
      box(-7,-21,5,9,uniform.pack);
      box(-7,-20,2,6,"#899079");
      poly([[-3,-22],[2,-22],[5,-18],[3,-11],[-4,-11],[-3,-16]],uniform.coat);
      box(-4,-13,8,2,"#4b5047");
      box(-1,-27,5,6,"#c4a385");
      box(3,-25,2,2,"#d5b494");
      box(-3,-29,6,2,uniform.helmet);
      box(-4,-28,9,3,uniform.helmet);
      box(-4,-26,10,1,"#4d554e");
      const swing = Math.round(Math.sin(phase) * 3);
      poly([[-2,-21],[1,-21],[2+swing,-17],[4+swing,-16],[3+swing,-14],
            [swing-1,-16]],uniform.pack);
      box(3+swing,-16,2,2,"#c4a385");
      ctx.restore();
    });
  }

  // Times are seconds in a repeating patrol. The margin includes the whole sprite.
  const passes=[
    {draw:tank,    start:0,    duration:10,  margin:76, altitude:0},
    {draw:jet,     start:1,    duration:5,   margin:46, altitude:.15},
    {draw:rocket,  start:7,    duration:3.8, margin:42, altitude:.19},
    {draw:carrier, start:10.7, duration:10,  margin:56, altitude:0},
    {draw:shahed,  start:13.2, duration:8,   margin:30, altitude:.15},
    {draw:footPatrol, start:21.4, duration:12, margin:45, altitude:0}
  ];
  function draw() {
    ctx.drawImage(background,0,0);
    const time=elapsed%34;
    for(const pass of passes) {
      const progress=(time-pass.start)/pass.duration;
      if(progress<0 || progress>1) continue;
      const margin=Math.ceil(pass.margin*spriteScale);
      const x=-margin+(w+2*margin)*progress;
      const y=pass.altitude ? h*pass.altitude : ground;
      ctx.save();
      ctx.translate(Math.round(x),Math.round(y));
      ctx.scale(spriteScale,spriteScale);
      pass.draw(elapsed);
      ctx.restore();
    }
    ctx.drawImage(foreground,0,0);
  }
  function resize(){
    const bounds=canvas.getBoundingClientRect();
    w=canvas.width=Math.max(180,Math.round(bounds.width/2));
    h=canvas.height=Math.round(bounds.height/2);
    ground=Math.round(h*.79);
    spriteScale=w<250 ? .75 : 1;
    background=layer(terrain);foreground=layer(trench);draw();
  }
  function tick(time) {
    if(last)elapsed+=Math.min(.1,(time-last)/1000);
    last=time;draw();frame=requestAnimationFrame(tick);
  }
  function updateMotion(){
    cancelAnimationFrame(frame); last=0;
    const label=moving?"Wstrzymaj animację":"Wznów animację";
    motion.textContent=moving?"Ⅱ":"▶";motion.title=label;motion.setAttribute("aria-label",label);
    if(moving&&!document.hidden)frame=requestAnimationFrame(tick);
  }
  motion.onclick=()=>{moving=!moving;updateMotion()};
  preference.addEventListener("change",()=>{moving=!preference.matches;updateMotion()});
  document.addEventListener("visibilitychange",updateMotion);
  resize();new ResizeObserver(resize).observe(canvas);updateMotion();
})();
