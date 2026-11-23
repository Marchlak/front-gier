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
  let moving=!preference.matches, elapsed=0, last=0, frame=0;
  let background, foreground, w, h, ground, center;
  function layer(draw) {
    const layer=document.createElement("canvas");
    layer.width=w;layer.height=h;draw(brush(layer.getContext("2d")));return layer;
  }
  function terrain({box,poly}) {
    const r=noise(971), sky=["#625d79","#86748a","#ab8390","#cb9492","#dfa691","#efb994","#f4c89e"];
    sky.forEach((c,i)=>box(0,i*h*.64/sky.length,w,h*.64/sky.length+1,c));
    const sunX=Math.round(w*.79),sunY=Math.round(h*.31),radius=19;
    for(let dy=-radius;dy<=radius;dy++){
      const dx=Math.floor(Math.sqrt(radius*radius-dy*dy));
      box(sunX-dx,sunY+dy,dx*2+1,1,"#ffe4ab");
    }
    for(let i=0;i<65;i++) {
      const x=r()*w,y=r()*h*.43;
      box(x,y,6+r()*40,1,r()>.5?"#f5c4a270":"#a1849260");
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
  function tank(x,y,t) {
    ctx.save();ctx.translate(Math.round(x),Math.round(y));
    box(-54,0,103,2,"#41454a");
    poly([[-52,-12],[-47,-19],[42,-19],[50,-12],[43,-3],[36,0],[-39,0],[-48,-4]],"#2d333b");
    poly([[-48,-12],[-44,-16],[40,-16],[45,-12],[38,-4],[-38,-4]],"#535753");
    for(let i=0;i<6;i++){
      const cx=-37+i*14;box(cx-5,-14,10,9,"#343a3d");box(cx-3,-14,6,8,"#78776a");
      box(cx-4,-12,8,4,"#686b60");box(cx-1,-11,3,3,"#393f42");
    }
    for(let i=0;i<17;i++){const xx=-39+((i*5+Math.floor(t*12))%83);box(xx,-2,3,1,"#929084")}
    const bob=Math.floor(t*3)%5===0?-1:0;ctx.translate(0,bob);
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
  function draw() {
    ctx.drawImage(background,0,0);
    const x=center+Math.sin(elapsed*.20)*w*.052;
    for(let j=0;j<7;j++){
      const phase=(elapsed*.32+j/7)%1;
      ctx.globalAlpha=(1-phase)*.45;
      const size=3+phase*9;
      box(x-48-phase*44,ground-11-phase*13+Math.sin(j*5)*2,size,size*.55,"#b9a28b");
    }
    ctx.globalAlpha=1;tank(x,ground,elapsed);ctx.drawImage(foreground,0,0);
  }
  function resize(){
    const bounds=canvas.getBoundingClientRect();
    w=canvas.width=Math.max(180,Math.round(bounds.width/2));
    h=canvas.height=Math.round(bounds.height/2);
    ground=Math.round(h*.79);
    center=Math.min(w*(bounds.width<540?.62:.71),w-73);
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
