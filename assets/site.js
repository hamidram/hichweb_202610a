/* ===== EDIT HERE: site settings & data ===== */
const CFG={email:"admin@hamdelan.org.au",fb:"https://www.facebook.com/profile.php?id=61584418282990",
group:"https://www.facebook.com/groups/www.hamdelan.org.au",insta:"https://www.instagram.com/iranian_cultural_house_hich",
yt:"https://www.youtube.com/@Hamdelan_ICH_WA",API_BASE:"" /* Google Cloud API URL later, e.g. https://api.hamdelan.org.au */};
/* status: provisional | planned | done. An event turns green (planned) only when BOTH hours and fund are fully secured. */
const EVENTS=[
{t:"Persian Arts and Culture Night",fa:"شب‌نشینی همدلانه",when:"Every Friday, 6:00–8:30pm",date:"2026-11-06",place:"1-3 Hill View Pl, Bentley",hrN:20,hrS:20,fN:300,fS:300,note:"Poetry, storytelling, bring a plate to share. Free."},
{t:"Nowruz Community Celebration",fa:"جشن نوروز",when:"March 2027 (date TBC)",date:"2027-03-20",place:"Bentley (TBC)",hrN:80,hrS:35,fN:4000,fS:1500,note:"Needs volunteers and grant support."},
{t:"Yalda Night",fa:"شب یلدا",when:"December 2026 (date TBC)",date:"2026-12-21",place:"Bentley (TBC)",hrN:50,hrS:50,fN:1800,fS:900,note:"Awaiting remaining funds."},
{t:"Mehregan 2026",fa:"جشن مهرگان",when:"October 2026",date:"2026-10-17",place:"Hillview Hub, Bentley",hrN:60,hrS:60,fN:2500,fS:2500,done:1,note:"Dance, food, art workshop and community stage."}];
const TREND=[["Q1",{p:2,l:1,d:1}],["Q2",{p:3,l:2,d:2}],["Q3",{p:4,l:3,d:3}],["Q4",{p:5,l:3,d:4}]]; /* provisioned / planned / done (sample numbers) */
/* ===== layout ===== */
const NAV=[["index","Home"],["events","Events"],["get-involved","Get involved"],["blog","Blog"],["projects","Projects"],["more","More"]];
const pg=document.body.dataset.page;
document.body.insertAdjacentHTML("afterbegin",`<a href="#main" style="position:absolute;left:-999px">Skip to content</a><header><div class="wrap">
<a class="brand" href="index.html"><img src="assets/logo.png" alt="Hamdelan logo"><span>Hamdelan<small>Iranian Cultural House</small></span></a>
<button id="mb" aria-label="Menu">☰</button><nav>${NAV.map(([h,n])=>`<a href="${h}.html" class="${h==pg?"on":""}">${n}</a>`).join("")}</nav></div></header>`);
document.body.insertAdjacentHTML("beforeend",`<footer><div class="wrap grid"><div><h3 style="color:#fff">Hamdelan Iranian Cultural House</h3><p class="fa">فرهنگسرای همدلان – خانه‌ای برای فرهنگ و هنر ایران، استرالیای غربی</p><p>1-3 Hill View Pl, Bentley WA 6102</p></div>
<div><p><a href="mailto:${CFG.email}">${CFG.email}</a><br><a href="${CFG.fb}">Facebook page</a><br><a href="${CFG.group}">Community group</a><br><a href="${CFG.insta}">Instagram</a> · <a href="${CFG.yt}">YouTube</a></p></div>
<div><img class="q" src="assets/qr.png" alt="Hamdelan QR code"><p style="font-size:.85rem">Supported by City of Canning. Hamdelan is a non-profit community association in Western Australia.</p></div></div>
<div class="wrap" style="font-size:.8rem;opacity:.7;margin-top:16px">© ${new Date().getFullYear()} HICH · hamdelan.org.au</div></footer>`);
document.getElementById("mb").onclick=()=>document.querySelector("nav").classList.toggle("open");
/* ===== events ===== */
const pct=(a,b)=>Math.min(100,Math.round(a/b*100));
function card(e){const full=e.hrS>=e.hrN&&e.fS>=e.fN;const s=e.done?"done":full?"planned":"provisional";
return `<article class="card ev ${s}"><span class="tag">${{done:"Done",planned:"Planned – resourced",provisional:"Provisional"}[s]}</span><h3>${e.t} <span class="fa">· ${e.fa}</span></h3><p>${e.when}<br>${e.place}<br>${e.note}</p>
<div class="lbl">Volunteer hours ${e.hrS}/${e.hrN}</div><div class="bar"><i style="width:${pct(e.hrS,e.hrN)}%"></i></div><div class="lbl">Funds secured $${e.fS}/$${e.fN}</div><div class="bar"><i style="width:${pct(e.fS,e.fN)}%"></i></div>
${s=="provisional"?'<a class="btn alt" href="get-involved.html">Help make it happen</a>':""}</article>`}
const up=document.getElementById("upcoming"),ps=document.getElementById("past");
if(up){up.innerHTML=EVENTS.filter(e=>!e.done).map(card).join("");ps.innerHTML=EVENTS.filter(e=>e.done).map(card).join("");
const sum=k=>EVENTS.reduce((a,e)=>a+e[k],0),st=document.getElementById("stats");
st.innerHTML=[[sum("hrS"),"volunteer hrs secured"],[sum("hrN"),"volunteer hrs needed"],["$"+sum("fS"),"funds secured"],["$"+sum("fN"),"funds needed"]].map(([n,l])=>`<div class="card"><b>${n}</b>${l}</div>`).join("");
document.getElementById("chart").innerHTML=TREND.map(([q,v])=>`<div title="provisioned ${v.p}, planned ${v.l}, done ${v.d}"><b style="height:${v.p*25}px;background:var(--grey)"></b><b style="height:${v.l*25}px;background:var(--green)"></b><b style="height:${v.d*25}px"></b>${q}</div>`).join("")}
/* ===== contact → opens Gmail ===== */
const f=document.getElementById("fb");if(f)f.onsubmit=ev=>{ev.preventDefault();const g=n=>f.elements[n].value;
window.open("https://mail.google.com/mail/?view=cm&fs=1&to="+CFG.email+"&su="+encodeURIComponent("["+g("topic")+"] from "+g("name"))+"&body="+encodeURIComponent(g("msg")+"\n\n"+g("name")),"_blank")};
