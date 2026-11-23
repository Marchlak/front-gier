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
  const ctx=canvas.getContext("2d");
  const {box,poly}=brush(ctx);
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
  } else if(kind==="loldle") {
    // Ziggs: swept ears, aviator goggles and a jagged grin on the same pixel grid as the other cards.
    box(0,0,100,84,"#413b50");
    for(let i=0;i<55;i++) box(rand()*100,rand()*84,1+rand()*3,1,"#554758");
    poly([[13,84],[19,71],[34,62],[57,61],[77,73],[81,84]],"#49363e");
    poly([[18,84],[22,74],[35,67],[44,73],[55,66],[72,73],[76,84]],"#935744");
    poly([[26,84],[50,67],[57,69],[36,84]],"#cea270");
    box(38,76,8,4,"#493f42");box(40,76,5,2,"#f6c882");
    // Long, fanned-out ears and soft cheek tufts frame the leather cap.
    poly([[32,31],[8,16],[12,31],[9,30],[16,39],[25,46],[36,45]],"#c38660");
    poly([[30,35],[13,22],[18,34],[25,40]],"#98555c");
    poly([[59,30],[87,11],[83,24],[87,20],[83,32],[74,41],[62,43]],"#d89b70");
    poly([[65,33],[82,17],[78,28],[70,36]],"#ae6667");
    poly([[25,30],[34,18],[54,15],[67,22],[72,37],[70,44],[75,46],[70,49],
          [73,52],[65,54],[61,62],[47,70],[35,67],[23,57],[18,56],[22,52],[17,51],[23,46]],"#bf8059");
    poly([[23,46],[34,39],[56,36],[66,40],[63,47],[69,46],[62,53],[55,61],[46,66],
          [34,63],[26,55],[29,54],[22,51],[29,49]],"#f2c794");
    poly([[24,34],[24,24],[30,17],[39,14],[53,13],[61,16],[67,23],[66,30],[55,26],[31,39]],"#71493e");
    poly([[29,25],[32,18],[39,17],[34,22]],"#aa714c");
    poly([[39,17],[33,10],[42,12],[40,6],[48,12],[52,7],[52,14],[61,11],[56,19]],"#ecbd8d");
    poly([[42,48],[48,44],[53,45],[54,48],[49,52],[44,51]],"#513c40");
    poly([[29,51],[38,54],[47,55],[55,51],[64,45],[62,54],[55,61],[47,65],[39,63],[32,58]],"#492e38");
    poly([[32,52],[38,54],[37,58]],"#fff0cf");
    poly([[39,54],[46,55],[44,60]],"#fce0b8");
    poly([[47,55],[54,52],[51,59]],"#ffeac7");
    poly([[55,51],[62,47],[59,54]],"#fff0cf");
    poly([[43,63],[49,59],[54,58],[51,62]],"#cf796d");
    // Brass lens rims, ember-coloured glass and a reflected glint.
    poly([[22,35],[63,22],[72,23],[70,29],[23,42]],"#604245");
    for(const [x,y] of [[25,31],[46,25]]){
      poly([[x,y+4],[x+4,y],[x+14,y-2],[x+19,y+1],[x+20,y+9],
            [x+16,y+15],[x+6,y+17],[x+1,y+14]],"#4f3d43");
      poly([[x+1,y+5],[x+5,y+1],[x+14,y-1],[x+18,y+2],[x+18,y+9],
            [x+15,y+13],[x+6,y+15],[x+2,y+12]],"#d9a660");
      poly([[x+4,y+6],[x+7,y+3],[x+14,y+2],[x+16,y+4],[x+15,y+9],
            [x+12,y+12],[x+7,y+12],[x+4,y+10]],"#b95535");
      poly([[x+7,y+9],[x+15,y+5],[x+14,y+9],[x+10,y+11],[x+7,y+11]],"#f29b45");
      box(x+6,y+5,5,2,"#ffe5a0");
    }
    // Round bomb tucked against his shoulder.
    poly([[60,67],[64,60],[71,56],[79,56],[87,61],[91,69],[90,78],[85,84],
          [63,84],[59,77]],"#292d3b");
    poly([[63,68],[67,62],[73,59],[80,60],[85,64],[82,63],[73,64],[67,70]],"#606071");
    poly([[61,74],[68,78],[78,79],[89,75],[88,79],[79,83],[69,82],[62,79]],"#c5834e");
    box(71,55,8,4,"#9e7857");
    poly([[73,55],[73,50],[80,46],[82,42],[84,42],[82,48],[76,52],[76,55]],"#e2ae71");
    poly([[83,35],[85,40],[90,39],[87,43],[91,45],[85,45],[82,49],[82,44],[77,42],[82,41]],"#ed9462");
    box(82,41,3,3,"#ffe7a4");
  } else if(kind==="nisza") {
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
  } else {
    const palettes={
      jakitohit:["#604255","#f4d8bb"],
      songless:["#385668","#94e2d5"], bandle:["#5f5374","#cba6f7"],
      moviespot:["#554955","#f3bc91"], metromania:["#344a55","#edbb75"]
    };
    const [field,ink]=palettes[kind];
    box(0,0,100,84,field);
    for(let i=0;i<65;i++) box(rand()*100,rand()*84,1+rand()*4,1,"#ffffff14");
    if(kind==="jakitohit"){
      // Cast-metal broadcast microphone with split grille and a suspended yoke.
      box(32,72,36,3,"#433647");box(46,55,8,14,"#625264");box(48,56,3,13,ink);
      poly([[33,72],[36,68],[44,67],[55,67],[64,69],[67,72]],"#c6b1ab");
      box(37,69,25,1,"#f1d9c6");
      poly([[30,34],[34,34],[34,47],[39,54],[44,56],[56,56],[62,53],[66,47],
            [66,34],[70,34],[70,48],[65,56],[57,60],[43,60],[35,56],[30,48]],"#d8c2ad");
      box(31,36,2,12,"#fff0d9");box(67,39,2,11,"#988392");
      poly([[42,10],[56,10],[61,13],[64,19],[64,45],[60,51],[55,54],[43,54],
            [38,51],[35,46],[35,19],[38,13]],"#4a414c");
      poly([[43,9],[55,9],[60,12],[62,17],[62,43],[59,49],[54,51],[44,51],
            [40,48],[38,44],[38,17],[40,12]],"#dcc7af");
      box(41,15,2,28,"#fff0db");box(59,16,2,28,"#b6a098");
      for(let row=0;row<6;row++){
        const y=17+row*5;
        box(42,y,6,2,"#57515a");box(51,y,7,2,"#57515a");
      }
      box(49,14,1,31,"#fff1dc");box(45,47,10,1,"#a18e8e");
      for(const x of [30,64]){box(x,34,6,6,"#514552");box(x+1,35,3,3,ink)}
    } else if(kind==="songless"){
      box(18,23,64,40,"#233744");box(21,25,58,34,ink);box(26,30,48,20,"#557b84");
      for(const x of [35,62]){box(x-5,35,10,9,"#ced9cc");box(x-2,38,4,4,"#354954")}
      box(40,37,17,5,"#344957");
      poly([[29,58],[34,51],[66,51],[71,58]],"#708b90");box(36,55,28,2,"#334652");
    } else if(kind==="bandle"){
      ctx.save();ctx.translate(46,50);ctx.rotate(.40);
      // Offset solid body, cream pickguard and maple headstock.
      poly([[-13,-17],[-9,-18],[-8,-11],[-4,-7],[3,-7],[7,-12],[9,-14],
            [12,-13],[12,-8],[9,-2],[10,4],[15,10],[17,17],[16,23],[12,28],
            [5,30],[-8,30],[-16,26],[-19,21],[-19,15],[-17,10],[-12,4],
            [-12,-1],[-15,-6],[-15,-12]],"#503748");
      poly([[-13,-16],[-11,-16],[-10,-10],[-5,-5],[3,-5],[8,-10],[10,-13],
            [11,-10],[8,-2],[9,4],[14,11],[15,18],[13,24],[7,27],[-6,28],
            [-14,25],[-17,21],[-17,15],[-14,9],[-10,4],[-10,-2],[-13,-7]],"#df826c");
      poly([[-12,-12],[-9,-7],[-8,-2],[-9,4],[-15,13],[-15,18],[-13,20],
            [-13,15],[-7,7],[-6,2],[-7,-5]],"#ffb996");
      poly([[-5,-6],[2,-6],[8,-10],[6,-3],[7,3],[11,10],[11,15],[8,19],
            [1,19],[-5,14],[-5,8],[-2,3]],"#eee0bf");
      box(-3,-34,6,42,"#563942");box(-2,-34,4,42,"#a67655");
      for(const y of [-30,-24,-19,-14,-10,-6,-2,1,4]) box(-2,y,4,1,"#e0bfa1");
      poly([[-3,-32],[-5,-36],[-4,-45],[0,-48],[5,-47],[6,-44],[3,-34],[2,-32]],"#e5b783");
      for(const y of [-43,-39,-35]){box(-7,y,4,2,"#c4c5c7");box(3,y-2,4,2,"#c4c5c7")}
      box(-4,7,8,3,"#54444c");box(-4,12,8,2,"#60535a");box(-4,17,8,3,"#867b7d");
      box(-1,-33,1,52,"#e9d9bb");box(1,6,1,13,"#c5beb2");
      box(8,16,2,2,"#eee1ca");box(8,21,2,2,"#eee1ca");
      ctx.restore();
    } else if(kind==="metromania"){
      // Airborne jumper in a red suit, viewed from the side at a slight angle.
      poly([[0,75],[14,62],[26,68],[48,56],[68,66],[86,52],[100,59],[100,84],[0,84]],"#405963");
      poly([[0,81],[15,73],[29,78],[49,69],[64,74],[86,63],[100,68],[100,84],[0,84]],"#546a72");
      // The ski tips spread apart in front, beyond the jumper's helmet.
      poly([[10,57],[83,40],[89,36],[88,40],[84,43],[12,60]],"#85c7c7");
      poly([[11,54],[83,60],[92,56],[91,60],[84,63],[10,57]],ink);
      poly([[27,49],[39,43],[48,35],[53,37],[43,47],[31,52]],"#a64c55");
      poly([[26,52],[30,49],[34,49],[33,52],[28,55],[24,55]],"#303c49");
      poly([[24,52],[37,43],[47,35],[52,39],[40,49],[29,56]],"#e47670");
      poly([[22,54],[27,51],[31,51],[29,55],[33,56],[32,58],[22,57]],"#283641");
      poly([[42,39],[48,31],[60,24],[66,25],[68,30],[60,37],[49,43]],"#cf5f61");
      poly([[49,32],[60,25],[63,26],[59,31],[51,35]],"#f5e5d3");
      poly([[62,30],[58,34],[47,36],[36,38],[34,36],[46,32],[56,29]],"#8d464e");
      poly([[61,28],[57,32],[46,34],[43,33],[55,29]],"#f29786");
      box(32,35,5,3,"#34414b");
      poly([[64,27],[64,22],[69,18],[76,19],[78,23],[76,28],[72,31],[68,30]],"#ecc3a0");
      poly([[63,23],[64,18],[69,15],[74,15],[78,19],[78,22],[70,23],[65,26]],"#e8eeeb");
      poly([[66,18],[69,16],[74,16],[76,18],[69,18]],"#d36b6c");
      poly([[68,23],[77,20],[79,21],[77,25],[72,26],[70,25]],"#324955");
      box(74,22,3,1,"#9ce5df");
    } else {
      box(21,33,58,33,"#343641");box(21,32,58,4,ink);
      poly([[20,29],[76,16],[78,23],[22,36]],"#d3c6ad");
      for(let i=0;i<5;i++){const x=24+10*i,y=28-i*2.3;poly([[x,y],[x+4,y-1],[x+1,y+6],[x-3,y+7]],"#3b3942")}
      poly([[45,42],[45,57],[59,49]],ink);
    }
  }
}

(() => {
  const canvas=document.getElementById("landscape");
  const ctx=canvas.getContext("2d");
  const {box,poly}=brush(ctx);
  const preference=matchMedia("(prefers-reduced-motion: reduce)");
  let elapsed=0, last=0, frame=0;
  let background, ruins, foreground, w, h, ground, spriteScale;
  function layer(draw) {
    const layer=document.createElement("canvas");
    layer.width=w;layer.height=h;draw(brush(layer.getContext("2d")));return layer;
  }
  const burnSites=[
    {x:.14,y:.55,size:.54,phase:.19},
    {x:.49,y:.595,size:.78,phase:.64},
    {x:.79,y:.63,size:1.08,phase:.02}
  ];
  function siteScale(site) {
    return site.size*Math.min(1,h/196,w/315);
  }
  function snag({box,poly},x,y,size,tone,lean) {
    const top=x+lean*size*.22;
    poly([[x-2,y],[x+1,y],[top+1,y-size*.74],[top-1,y-size],[top-2,y-size*.75]],tone);
    for(let k=0;k<3;k++){
      const sign=k%2 ? 1 : -1;
      const bx=x+(top-x)*(.30+k*.20), by=y-size*(.32+k*.20);
      poly([[bx-1,by+1],[bx+1,by],[bx+sign*size*.21,by-size*.13],
            [bx+sign*size*.25,by-size*.28],[bx+sign*size*.18,by-size*.15]],tone);
    }
    box(x-2,y-1,5,2,tone);
  }
  function terrain(paint) {
    const {box,poly}=paint, r=noise(971);
    const sky=ctx.createLinearGradient(0,0,0,h*.65);
    sky.addColorStop(0,"#42414e");
    sky.addColorStop(.48,"#797077");
    sky.addColorStop(.78,"#a5887e");
    sky.addColorStop(1,"#bda08a");
    box(0,0,w,h,sky);
    const sunX=Math.round(w*.78), sunY=Math.round(h*.29), radius=Math.round(h*.072);
    for(let dy=-radius;dy<=radius;dy++){
      const dx=Math.floor(Math.sqrt(radius*radius-dy*dy));
      box(sunX-dx,sunY+dy,dx*2+1,1,"#e9c39c");
    }
    // Broad overlapping banks of ash dim the sun and soften the distant skyline.
    for(let i=0;i<74;i++) {
      const x=r()*w,y=r()*h*.50,spread=16+r()*w*.17;
      const haze=ctx.createRadialGradient(x,y,0,x,y,spread);
      haze.addColorStop(0,i%3 ? "#544e5b24":"#b19a8d2a");
      haze.addColorStop(1,"#62586300");
      box(x-spread,y-spread,spread*2,spread*2,haze);
    }
    function ridge(base,height,color) {
      for(let x=0;x<w;x+=2) {
        const y=base+height*(.60*Math.sin(x*.015)+.32*Math.sin(x*.048)+r()*.12);
        box(x,y,2,h-y,color);
      }
    }
    ridge(h*.45,h*.085,"#8b7b7e");
    const skyline=h*.52;
    for(let x=-10;x<w;x+=8+Math.round(r()*10)){
      const width=7+r()*13,roof=skyline-2-r()*h*.045;
      box(x,roof,width,h*.09,"#796e72");
      box(x+2,roof-2,width*.40,2,"#796e72");
      if(r()>.77)box(x+width-3,roof-6-r()*6,2,15,"#796e72");
    }
    ridge(h*.55,h*.046,"#70676b");
    for(let x=3;x<w;x+=5+r()*8)snag(paint,x,h*.61,4+r()*9,"#655e61",r()-.5);
    ridge(h*.63,h*.035,"#615b5c");
    ridge(h*.71,h*.037,"#514e50");
    // Rubble fans and shallow craters pick out the ashen ground.
    for(let i=0;i<w*.45;i++) {
      const x=r()*w,y=h*(.66+r()*.145),length=1+r()*7;
      box(x,y,length,1,i%4 ? "#615b5b":"#82766c");
    }
    for(let x=6;x<w;x+=28+r()*41) {
      const y=h*(.71+r()*.055),length=7+r()*10;
      poly([[x-length,y],[x-4,y-2],[x+length,y-1],[x+3,y+2],[x-5,y+2]],"#403e42");
      box(x-length+3,y+2,length,1,"#766b62");
    }
    box(0,ground-4,w,5,"#585454");
    for(let i=0;i<w*.6;i++) box(r()*w,ground-4+r()*5,1+r()*4,1,i%3?"#6d6460":"#48464a");
    for(const site of burnSites) {
      const x=w*site.x,y=h*site.y,spread=37*siteScale(site);
      const glow=ctx.createRadialGradient(x,y-4,1,x,y-4,spread);
      glow.addColorStop(0,"#e58c4a84");glow.addColorStop(.45,"#dd804632");glow.addColorStop(1,"#cf704000");
      box(x-spread,y-4-spread,spread*2,spread*2,glow);
    }
  }
  function burntVillage(paint) {
    const {box,poly}=paint, r=noise(638);
    burnSites.forEach((site,index)=>{
      const x=w*site.x,y=h*site.y,scale=siteScale(site);
      // Ruined masonry is opaque except where windows, a door or missing courses let the fire show through.
      const heights=[[5,5,4,2,3,4,4,2,2,1],[2,2,4,3,3,2,1,2,5,7],[6,5,4,4,3,2,2,3,4,5]][index];
      const brickW=4.8*scale, course=3*scale;
      for(let col=0;col<heights.length;col++) {
        for(let row=0;row<heights[col];row++) {
          if((col===2 || col===7) && row===2 || col===5 && row<2) continue;
          const bx=x+(col-5)*brickW,by=y-(row+1)*course;
          box(bx,by,brickW,course,["#48454a","#4e484a","#554d4d"][Math.floor(r()*3)]);
          if(row===heights[col]-1) box(bx,by,brickW,1,index===2?"#926f5d":"#806b60");
        }
      }
      const left=x-24*scale,top=y-course*heights[0];
      if(index===2) {
        box(x+14*scale,y-27*scale,4*scale,22*scale,"#514a4b");
        box(x+14*scale,y-27*scale,scale,15*scale,"#866657");
        poly([[left,top-2],[left+17*scale,top+5*scale],[left+27*scale,y-3*scale],
              [left+17*scale,top+8*scale],[left,top]],"#494348");
      } else {
        poly([[left,top],[left+9*scale,top-9*scale],[left+20*scale,top-3*scale],
              [left+19*scale,top-1*scale],[left+9*scale,top-6*scale],[left+2*scale,top+2*scale]],"#4b4446");
      }
      for(let i=0;i<15;i++){
        const bx=x+(r()-.5)*57*scale,by=y+r()*2*scale;
        box(bx,by,(2+r()*4)*scale,1+scale,i%2?"#5e5552":"#484549");
      }
    });
    for(let x=5;x<w;x+=15+r()*22){
      const y=h*(.65+r()*.08);
      snag(paint,x,y,9+r()*15,"#4b484c",r()*2-1);
    }
    // An abandoned telegraph line sags between two snapped poles.
    const left=w*.56,right=w*.88,base=h*.74;
    for(const [x,height,lean] of [[left,15,-3],[right,20,3]]){
      poly([[x-1,base],[x+1,base],[x+lean+1,base-height],[x+lean-1,base-height+1]],"#474449");
      box(x+lean-3,base-height+3,7,1,"#514b4e");
    }
    for(let x=left-3;x<right+3;x+=2){
      const t=(x-left+3)/(right-left+6);
      box(x,base-12-5*t+21*t*(1-t),2,1,"#534c50");
    }
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

  const roster = [
    {name:"Czołg", draw:tank, duration:9, margin:76, exhaust:[-57,-19], muzzle:[71,-34]},
    {name:"Samolot wojskowy", draw:jet, duration:5, margin:46, altitude:.15},
    {name:"Rakieta", draw:rocket, duration:4, margin:42, altitude:.19},
    {name:"BTR", draw:carrier, duration:8, margin:56, exhaust:[-52,-17], muzzle:[25,-34], burst:4},
    {name:"Shahed", draw:shahed, duration:7, margin:30, altitude:.15},
    {name:"Patrol pieszy", draw:footPatrol, duration:10, margin:45},
    ...additionalVehicles({box,poly},wheel)
  ];
  const between = (min,max) => min + Math.random()*(max-min);
  let remaining = [], current, passStart = 0, shotTime = Infinity;
  function nextUnit() {
    if (!remaining.length) remaining = roster.slice();
    // On refill the previous unit remains available after this first draw.
    const choices = remaining.filter(unit => unit !== current);
    current = choices[Math.floor(Math.random()*choices.length)];
    remaining.splice(remaining.indexOf(current),1);
    shotTime = current.muzzle
      ? current.duration*between(.32,.55)
      : Infinity;
  }
  nextUnit();
  if (preference.matches) elapsed = current.duration*.64;

  let salvoStart = between(9,16);
  function newImpacts() {
    // Jitter one hit inside each strip, then shuffle their firing order.
    const count=12;
    const hits=Array.from({length:count},(_,i)=>({
      x:.04+.92*(i+between(.18,.82))/count,
      y:between(.59,.72)
    }));
    for(let i=hits.length-1;i>0;i--) {
      const j=Math.floor(Math.random()*(i+1));
      [hits[i],hits[j]]=[hits[j],hits[i]];
    }
    return hits;
  }
  let hits=newImpacts();
  function fireball(x,y,r,color) {
    const shoulder=Math.round(r*.58);
    poly([[x-shoulder,y-r],[x+shoulder,y-r],[x+r,y-shoulder],[x+r,y+shoulder],
          [x+shoulder,y+r],[x-shoulder,y+r],[x-r,y+shoulder],[x-r,y-shoulder]],color);
  }
  function impact(x,y,age) {
    // Layer short-lived pixel fireballs over a slower column of smoke.
    ctx.save();
    const smoke=age/2.1;
    ctx.globalAlpha=(1-smoke)*.88;
    for(let i=0;i<5;i++) {
      const puffX=x+Math.sin(i*2.4)*(4+smoke*6)+smoke*8;
      const puffY=y-4-i*2-smoke*(12+i*4);
      fireball(puffX,puffY,3+smoke*5+i%2,i%2?"#625968":"#716572");
    }
    ctx.restore();
    if(age>.68) return;
    const phase=age/.68;
    const bloom=Math.sin(Math.sqrt(phase)*Math.PI);
    const radius=2+10*bloom;
    for(const [dx,dy,size,color] of [
      [-.7,-.55,.76,"#c45f46"],[.72,-.53,.78,"#d77048"],
      [0,-1.24,.88,"#e9884e"],[-.33,-.8,.69,"#ffa95b"],[.29,-.6,.7,"#ffbe68"]
    ]) fireball(x+dx*radius,y+dy*radius,radius*size,color);
    fireball(x,y-radius*.9,Math.max(1,radius*(1-phase)*.68),"#ffdf95");
    for(let i=0;i<6;i++) {
      const angle=-2.85+i*.49;
      const spread=5+phase*(18+i%3*4);
      box(x+Math.cos(angle)*spread,y+Math.sin(angle)*spread+6*phase*phase,2,2,"#f4b373");
    }
  }
  function artillery() {
    const age=elapsed-salvoStart;
    if(age<0) return;
    if(age>4.4) {
      salvoStart=elapsed+between(15,30);
      hits=newImpacts();
      return;
    }
    const fall=.19;
    // Four quick waves of three; stagger both time and position within the salvo.
    for(let i=0;i<hits.length;i++) {
      const wave=Math.floor(i/3), slot=i%3;
      const time=age-wave*.55-slot*.14;
      if(time<0 || time>fall+2.1) continue;
      const x=Math.round(w*hits[i].x);
      const y=Math.round(h*hits[i].y);
      if(time>=fall) {
        impact(x,y,time-fall);
        continue;
      }
      const progress=time/fall;
      const sx=x-18*(1-progress), sy=-5+(y+5)*progress;
      poly([[sx-4,sy-22],[sx-2,sy-22],[sx+1,sy],[sx-1,sy]],"#e7b185");
      poly([[sx-2,sy-8],[sx,sy-8],[sx+1,sy],[sx-1,sy]],"#fff0b9");
    }
  }
  // Perspective is expressed in screen pixels, travel time and the scene layer that hides each streak.
  const tracerPlanes={
    far: {size:.55, duration:1.48, altitude:[.43,.58], tail:"#af9584", core:"#ddc7ad"},
    middle: {size:1, duration:1.00, altitude:[.23,.50], tail:"#d39c77", core:"#ffe1ae"},
    near: {size:1.55, duration:.67, altitude:[.14,.70], tail:"#e89e64", core:"#fff2c7"}
  };
  function newSkyPass(start,direction) {
    const order=["far","middle","near","middle"];
    for(let i=order.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [order[i],order[j]]=[order[j],order[i]];
    }
    const shots=order.map((depth,i)=>{
      const plane=tracerPlanes[depth];
      return {depth,plane,delay:i*.16,height:between(...plane.altitude),slope:between(-.06,.06)};
    });
    const end=start+Math.max(...shots.map(shot=>shot.delay+shot.plane.duration));
    return {start,end,direction,shots};
  }
  let skyPass=newSkyPass(between(3,7),Math.random()<.5 ? -1 : 1);
  function skyTracers(depth) {
    const age=elapsed-skyPass.start;
    if(age<0 || elapsed>skyPass.end) return;
    for(const shot of skyPass.shots) {
      if(shot.depth!==depth) continue;
      const {size,duration,tail,core}=shot.plane;
      const phase=(age-shot.delay)/duration;
      if(phase<0 || phase>1) continue;
      const margin=Math.ceil(25*size), span=w+2*margin;
      const travel=phase*span-margin;
      const x=skyPass.direction===1 ? travel : w-travel;
      const y=h*(shot.height+phase*shot.slope);
      ctx.save();
      ctx.translate(Math.round(x),Math.round(y));
      ctx.scale(skyPass.direction*size,size);
      const lift=-shot.slope*h*21/span;
      poly([[-21,lift],[-11,lift*.5-1],[0,-1],[1,1],[-10,lift*.5+2]],tail);
      box(-5,-1,8,2,core);
      ctx.restore();
    }
  }

  // A looping heat field produces ragged, curling flames rather than a row of triangles.
  function fireFrame(frame,count) {
    const tile=document.createElement("canvas");
    tile.width=48;tile.height=34;
    const g=tile.getContext("2d"), pixels=g.createImageData(tile.width,tile.height);
    const phase=2*Math.PI*frame/count;
    const colors=[[151,72,48,140],[202,90,43,220],[239,132,55,248],[255,186,86,255],[255,219,145,255]];
    for(let y=0;y<tile.height;y++){
      const rise=(tile.height-1-y)/tile.height;
      for(let x=0;x<tile.width;x++){
        const curl=x+rise*(4*Math.sin(phase+rise*7)+2.5*Math.sin(2*phase+rise*11));
        const envelope=Math.max(0,1-Math.pow((x-23.5)/24,2));
        const heat=envelope*(.45+.16*Math.sin(curl*.56+phase+rise*8)
                    +.15*Math.sin(curl*.29-2*phase+rise*5)+.13*Math.sin(curl*.91+2*phase+rise*9))-rise;
        if(heat<=0)continue;
        const color=colors[Math.min(colors.length-1,Math.floor(heat*8))];
        pixels.data.set(color,4*(y*tile.width+x));
      }
    }
    g.putImageData(pixels,0,0);return tile;
  }
  const fireFrames=Array.from({length:32},(_,i)=>fireFrame(i,32));
  function smokeBillow() {
    const tile=document.createElement("canvas");
    tile.width=36;tile.height=28;
    const g=tile.getContext("2d"),r=noise(42);
    for(let i=0;i<10;i++){
      const x=9+r()*17,y=8+r()*10,radius=5+r()*6;
      const ash=g.createRadialGradient(x,y,1,x,y,radius);
      ash.addColorStop(0,"#413e49b5");ash.addColorStop(.64,"#504a5380");ash.addColorStop(1,"#59535a00");
      g.fillStyle=ash;g.fillRect(0,0,tile.width,tile.height);
    }
    return tile;
  }
  const smokeTile=smokeBillow();
  function distantFire() {
    ctx.save();
    ctx.imageSmoothingEnabled=false;
    for(const site of burnSites) {
      const x=w*site.x, y=h*site.y, scale=siteScale(site);
      const time=elapsed+site.phase*9;
      // Smoke broadens and drifts with the wind as it separates from the roofline.
      for(let i=0;i<12;i++){
        const lift=(time*.14+i/12)%1;
        const px=x+scale*(lift*lift*28+Math.sin(i*4+lift*5)*(2+4*lift));
        const py=y-scale*(12+46*lift);
        const radius=scale*(5+13*lift);
        ctx.globalAlpha=.45*Math.sin(Math.PI*lift);
        ctx.drawImage(smokeTile,Math.round(px-radius),Math.round(py-radius*.77),
                      Math.ceil(radius*2),Math.ceil(radius*1.54));
      }
      ctx.globalAlpha=1;
      const frame=fireFrames[Math.floor(time*14)%fireFrames.length];
      ctx.drawImage(frame,Math.round(x-19*scale),Math.round(y-31*scale),
                    Math.round(38*scale),Math.round(31*scale));
      for(let i=0;i<4;i++){
        const lift=(time*.29+i*.25)%1;
        ctx.globalAlpha=.75*(1-lift);
        box(x+scale*((i-2)*6+8*lift),y-scale*(9+lift*21),1,1,"#ffc385");
      }
    }
    ctx.restore();
  }

  function trenchCrew() {
    const roles=["pipe","cloth","map"];
    roles.forEach((role,i)=>{
      const x=Math.round(w*[.24,.51,w<250 ? .73 : .80][i]), y=h-3;
      const scale=Math.min(spriteScale,h*.14/26);
      ctx.save();
      ctx.translate(x,y);
      ctx.scale(scale,scale);
      if(i===1) ctx.scale(-1,1);
      const coat=["#79816c","#727e70","#868570"][i];
      // Low seat, bent legs and boots; each small silhouette faces into the trench.
      box(-6,-8,10,2,"#75675b");box(-5,-6,2,6,"#423d40");
      poly([[-5,-11],[3,-11],[10,-8],[8,-2],[5,-2],[5,-6],[-4,-6]],"#505854");
      poly([[-4,-10],[1,-10],[6,-7],[4,-1],[1,-1],[2,-6],[-5,-7]],"#676e61");
      box(1,-2,5,2,"#34383b");box(6,-3,6,2,"#35383b");
      poly([[-5,-20],[1,-21],[4,-18],[4,-12],[2,-9],[-6,-9],[-7,-12]],coat);
      box(-3,-25,7,6,"#c3a186");box(3,-23,2,2,"#e3c1a1");
      box(-4,-27,6,2,coat);box(-5,-26,9,3,coat);box(-6,-24,11,1,"#444f49");
      if(role==="pipe") {
        const lift=(1+Math.sin(elapsed*1.4))*.5;
        const hand=-16-lift*4;
        poly([[-3,-18],[0,-17],[2,-15],[5,hand],[7,hand+1],[3,-12],[0,-12]],"#929784");
        box(5,hand,3,2,"#d2ac89");box(6,hand-1,5,1,"#3d3836");box(10,hand-3,3,3,"#895e49");
        for(let j=0;j<3;j++){
          const rise=(elapsed*.46+j/3)%1;
          ctx.globalAlpha=.65*(1-rise);
          fireball(11+rise*4+Math.sin(rise*6),hand-4-rise*10,1+rise,"#d7cbbc");
        }
        ctx.globalAlpha=1;
      } else if(role==="cloth") {
        box(-6,-14,8,3,"#846c56");box(1,-14,11,2,"#424948");box(10,-14,8,1,"#aaa899");
        const hand=4+Math.sin(elapsed*3)*3;
        poly([[-3,-18],[0,-18],[hand,-15],[hand,-13],[0,-14]],"#9b9c87");
        box(hand,-15,4,3,"#ded1ac");box(-1,-14,3,2,"#c5a689");
      } else {
        const tilt=Math.round(Math.sin(elapsed*1.7));
        poly([[1,-17],[7,-19],[12,-17+tilt],[17,-19+tilt],[16,-11],[11,-9],[6,-11],[2,-10]],"#dcc99a");
        box(6,-17,1,6,"#a59a7d");box(11,-16+tilt,1,6,"#a59a7d");
        box(2,-14,3,2,"#be9a78");box(14,-14+tilt,3,2,"#be9a78");
      }
      ctx.restore();
    });
  }
  function exhaustTrail([pipeX,pipeY],age,speed) {
    const interval=.17, lifetime=1.25;
    const newest=Math.floor(age/interval);
    const oldest=Math.max(0,Math.ceil((age-lifetime)/interval));
    ctx.save();
    for(let i=oldest;i<=newest;i++) {
      const seconds=age-i*interval, fade=seconds/lifetime;
      const sway=Math.sin(i*2.4);
      const x=pipeX-seconds*(speed*.78+5+sway*2);
      const y=pipeY-seconds*(8+sway*3)-4*fade*fade;
      const radius=1.5+fade*4;
      ctx.globalAlpha=.7*(1-fade);
      fireball(x,y,radius,"#565559");
      fireball(x-radius*.4,y-radius*.5,radius*.8,"#b3a79b");
    }
    ctx.restore();
    box(pipeX,pipeY-1,5,3,"#454747");
  }
  function gunshot([tipX,tipY],age,speed) {
    if(age<0 || age>.85) return;
    ctx.save();
    ctx.translate(tipX,tipY);
    if(age<.13) {
      const size=1-age/.13;
      ctx.scale(size,size);
      poly([[0,0],[6,-4],[9,-2],[20,-3],[15,0],[22,2],
            [9,2],[7,4],[3,1]],"#ffad62");
      poly([[0,0],[7,-2],[15,0],[6,2]],"#fff1bb");
    } else {
      const fade=(age-.13)/.72;
      ctx.globalAlpha=.6*(1-fade);
      for(let i=0;i<4;i++) {
        const x=4+i*2+age*(i*4-speed*.8);
        const y=-age*(6+i*2)+Math.sin(i*2)*2;
        fireball(x,y,1.6+fade*3,"#c2b8a9");
      }
    }
    ctx.restore();
  }
  function draw() {
    if(elapsed-passStart>=current.duration+.35) {
      passStart=elapsed;
      nextUnit();
    }
    if(elapsed>skyPass.end) skyPass=newSkyPass(elapsed+between(10,19),-skyPass.direction);
    ctx.drawImage(background,0,0);
    skyTracers("far");
    distantFire();
    ctx.drawImage(ruins,0,0);
    artillery();
    skyTracers("middle");
    const age=elapsed-passStart;
    const progress=age/current.duration;
    const margin=Math.ceil(current.margin*spriteScale);
    const x=-margin+(w+2*margin)*progress;
    const y=current.altitude ? h*current.altitude : ground;
    ctx.save();
    ctx.translate(Math.round(x),Math.round(y));
    ctx.scale(spriteScale,spriteScale);
    const speed=(w+2*margin)/(spriteScale*current.duration);
    if(current.exhaust) exhaustTrail(current.exhaust,age,speed);
    current.draw(elapsed);
    if(current.muzzle) {
      for(let i=0;i<(current.burst ?? 1);i++) {
        gunshot(current.muzzle,age-shotTime-i*.26,speed);
      }
    }
    ctx.restore();
    ctx.drawImage(foreground,0,0);
    trenchCrew();
    skyTracers("near");
  }
  function resize(){
    const bounds=canvas.getBoundingClientRect();
    w=canvas.width=Math.max(180,Math.round(bounds.width/2));
    h=canvas.height=Math.round(bounds.height/2);
    ground=Math.round(h*.79);
    spriteScale=w<250 ? .75 : 1;
    background=layer(terrain);ruins=layer(burntVillage);foreground=layer(trench);draw();
  }
  function tick(time) {
    if(last)elapsed+=Math.min(.1,(time-last)/1000);
    last=time;draw();frame=requestAnimationFrame(tick);
  }
  function updateMotion(){
    cancelAnimationFrame(frame); last=0;
    if(!preference.matches&&!document.hidden)frame=requestAnimationFrame(tick);
  }
  preference.addEventListener("change",updateMotion);
  document.addEventListener("visibilitychange",updateMotion);
  resize();new ResizeObserver(resize).observe(canvas);updateMotion();
})();
