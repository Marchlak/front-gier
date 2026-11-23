"use strict";
const games=[
  {id:"loldle",name:"LoLdle",url:"https://loldle.net/"},
  {id:"jakitohit",name:"Jaki to hit?",url:"https://jakitohit.pl/"},
  {id:"songless",name:"Songless",url:"https://lessgames.com/songless"},
  {id:"bandle",name:"Bandle",url:"https://bandle.app/menu"},
  {id:"krill",name:"Krillion",url:"https://krillion.io/"},
  {id:"nisza",name:"Celuj w niszę!",url:"https://wnisze.pl/"},
  {id:"moviespot",name:"MovieSpot",url:"https://allspot.net/moviespot"},
  {id:"metromania",name:"Metromania",url:"https://metromania.pl/"}
];
const cards=document.getElementById("cards");
const segments=document.getElementById("segments");
const dateLabel=document.getElementById("date");
const count=document.getElementById("count");
const warning=document.getElementById("storage-warning");
const memory=new Set();
const dates=new Intl.DateTimeFormat("pl-PL",{weekday:"long",day:"numeric",month:"long"});
function dayKey(date){
  return [date.getFullYear(),String(date.getMonth()+1).padStart(2,"0"),String(date.getDate()).padStart(2,"0")].join("-");
}
function key(day,id){return "front-gier:"+day+":"+id}
function isDone(key){
  try{return memory.has(key)||localStorage.getItem(key)==="1"}
  catch{warning.hidden=false;return memory.has(key)}
}
const entries=games.map(game=>{
  const link=document.createElement("a");
  link.className="card";link.href=game.url;link.target="_blank";link.rel="noopener noreferrer";
  const badge=document.createElement("canvas");
  badge.className="badge";
  badge.setAttribute("aria-hidden","true");
  paintBadge(badge,game.id);
  const info=document.createElement("div");info.className="info";
  const domain=document.createElement("span");domain.className="domain";domain.textContent=new URL(game.url).hostname;
  const title=document.createElement("h3");title.textContent=game.name;
  const status=document.createElement("span");status.className="status";
  const segment=document.createElement("i");segments.append(segment);
  info.append(domain,title,status);link.append(badge,info);cards.append(link);
  function mark(){
    const storageKey=key(dayKey(new Date()),game.id);
    memory.add(storageKey);
    try{localStorage.setItem(storageKey,"1")}catch{warning.hidden=false}
    refresh();
  }
  link.addEventListener("click",mark);
  link.addEventListener("auxclick",event=>{if(event.button===1)mark()});
  return {game,link,status,segment};
});
function refresh(){
  const now=new Date(), day=dayKey(now);
  dateLabel.dateTime=day;dateLabel.textContent=dates.format(now);
  let total=0;
  for(const {game,link,status,segment} of entries){
    const done=isDone(key(day,game.id));
    if(done)total++;
    link.classList.toggle("done",done);
    segment.classList.toggle("filled",done);
    status.textContent=done?"Zrobiona dziś":"Do zagrania";
    link.setAttribute("aria-label",game.name+" — "+status.textContent+". Otwórz w nowej karcie.");
  }
  count.textContent=total+" / "+games.length+" zrobione";
}
function startDay(){
  refresh();
  const now=new Date(),midnight=new Date(now);
  midnight.setHours(24,0,0,0);
  setTimeout(startDay,midnight-now+50);
}
window.addEventListener("storage",refresh);
window.addEventListener("focus",refresh);
document.addEventListener("visibilitychange",()=>{if(!document.hidden)refresh()});
startDay();
