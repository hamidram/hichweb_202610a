/* ===== EDIT HERE ===== */
const CFG={email:"admin@hamdelan.org.au",fb:"https://www.facebook.com/profile.php?id=61584418282990",group:"https://www.facebook.com/groups/www.hamdelan.org.au",insta:"https://www.instagram.com/iranian_cultural_house_hich",yt:"https://www.youtube.com/@Hamdelan_ICH_WA",API_BASE:""};
/* Each event has English (en) and Persian (fa) text. status: "planned" (green) or "provisional" (grey) – set it when volunteers and funding are secured. Dates and chart numbers are samples. */
const EVENTS=[
{status:"planned",en:{t:"Persian Arts and Culture Night",w:"Once a month, 6:00–8:30pm (dates announced)",n:"Poetry, storytelling, bring a plate to share. Free."},fa:{t:"شب‌نشینی همدلانه",w:"ماهی یک بار، ۶:۰۰ تا ۸:۳۰ عصر (زمان‌ها اعلام می‌شود)",n:"شعر، قصه‌گویی و سفره مشترک. رایگان."}},
{date:"2026-12-21",status:"provisional",en:{t:"Yalda Night",w:"December 2026 (date TBC)",n:"Awaiting remaining funds."},fa:{t:"شب یلدا",w:"آذر / دی ۱۴۰۵ (زمان قطعی نشده)",n:"در انتظار تأمین بقیه بودجه."}},
{date:"2026-10-17",done:1,en:{t:"Mehregan 2026",w:"October 2026",n:"Dance, food, art workshop and a community stage."},fa:{t:"جشن مهرگان ۲۰۲۶",w:"مهر ۱۴۰۵",n:"رقص، غذا، کارگاه نقاشی و صحنه جامعه."}}];
const TREND=[["Q1",2,1,1],["Q2",3,2,2],["Q3",4,3,3],["Q4",5,3,4]];
const NAV=[["index","Home","خانه"],["events","Events","رویدادها"],["get-involved","Get involved","مشارکت"],["blog","Blog","وبلاگ"],["projects","Projects","پروژه‌ها"],["more","More","بیشتر"]];
const pg=document.body.dataset.page;
document.body.insertAdjacentHTML("afterbegin",`<header><div class="wrap"><a class="brand" href="index.html"><img src="assets/logo.png" alt="Hamdelan logo"><span>Hamdelan · <span lang="fa">همدلان</span><small>Iranian Cultural House</small></span></a>
<button id="mb" aria-label="Menu">☰</button><nav>${NAV.map(([h,e,f])=>`<a href="${h}.html" class="${h==pg?"on":""}">${e}<small lang="fa">${f}</small></a>`).join("")}</nav></div></header>`);
document.body.insertAdjacentHTML("beforeend",`<footer><div class="wrap grid"><div><h3 style="color:#fff">Hamdelan Iranian Cultural House</h3><p lang="fa">فرهنگسرای همدلان، خانه‌ای برای فرهنگ و هنر ایران، استرالیای غربی</p><p style="font-size:.85rem">Hamdelan Iranian Cultural House Inc<br>ABN 59 820 258 637</p></div>
<div><p><a href="mailto:${CFG.email}">${CFG.email}</a><br><a href="${CFG.fb}">Facebook · فیسبوک</a><br><a href="${CFG.group}">Community group · گروه همدلان</a><br><a href="https://hamdelan.taplink.site/" target="_blank" rel="noopener">All links · همه پیوندها</a><br><a href="${CFG.insta}">Instagram</a> · <a href="${CFG.yt}">YouTube</a></p></div>
<div><img class="q" src="assets/qr.png" alt="Hamdelan QR code"><p style="font-size:.85rem">Supported by City of Canning · با حمایت شهرداری کنینگ<br>Non-profit community association, WA.</p><p style="font-size:.8rem;opacity:.85">Hamdelan Iranian Cultural House Inc<br>ABN 59 820 258 637 · IARN A1045906U</p></div></div><div class="wrap" style="font-size:.8rem;opacity:.7;margin-top:16px">© ${new Date().getFullYear()} HICH · hamdelan.org.au</div></footer>`);
document.getElementById("mb").onclick=()=>document.querySelector("nav").classList.toggle("open");
const pct=(a,b)=>Math.min(100,Math.round(a/b*100)),jal=d=>new Intl.DateTimeFormat("fa-IR-u-ca-persian",{day:"numeric",month:"long",year:"numeric"}).format(new Date(d)),greg=d=>new Date(d).toLocaleDateString("en-AU",{day:"numeric",month:"short",year:"numeric"});
const ST={done:["Done","انجام شد"],planned:["Planned","برنامه‌ریزی قطعی"],provisional:["Provisional","پیشنهادی"]};
function card(e){const s=e.done?"done":(e.status||"provisional");
return `<article class="card ev ${s}"><span class="tag">${ST[s][0]} · <span lang="fa">${ST[s][1]}</span></span>${e.date?`<p class="jal">${greg(e.date)} · <span lang="fa">${jal(e.date)}</span></p>`:""}
<div class="pair"><div lang="en"><h3>${e.en.t}</h3><p>${e.en.w}<br>${e.en.n}</p></div><div lang="fa"><h3>${e.fa.t}</h3><p>${e.fa.w}<br>${e.fa.n}</p></div></div>
${s=="provisional"?'<a class="btn alt" href="get-involved.html">Help · کمک کنید</a>':""}</article>`}
const up=document.getElementById("upcoming");
if(up){up.innerHTML=EVENTS.filter(e=>!e.done).map(card).join("");document.getElementById("past").innerHTML=EVENTS.filter(e=>e.done).map(card).join("");
document.getElementById("chart").innerHTML=TREND.map(([q,p,l,d])=>`<div><b style="height:${p*25}px;background:var(--grey)"></b><b style="height:${l*25}px;background:var(--green)"></b><b style="height:${d*25}px"></b>${q}</div>`).join("")}
/* blog: language filter chips + per-post toggle */
document.querySelectorAll(".chips button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".chips button").forEach(x=>x.classList.toggle("on",x==b));const v=b.dataset.f;document.querySelectorAll(".post").forEach(p=>p.hidden=v!="all"&&p.dataset.l!=v&&p.dataset.l!="both")});
document.querySelectorAll(".tg button").forEach(b=>b.onclick=()=>{const a=b.closest(".post");a.classList.remove("only-en","only-fa");if(b.dataset.s)a.classList.add("only-"+b.dataset.s);b.parentNode.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x==b))});
/* ===== email chooser: Gmail / Outlook.com / default app / copy ===== */
const dlg=document.createElement("dialog");dlg.id="mailpick";document.body.appendChild(dlg);
function pickMail(to,su="",body=""){const q=encodeURIComponent,e=(u,t)=>`<a class="btn" href="${u}" target="_blank" rel="noopener">${t}</a>`;
dlg.innerHTML=`<h3>Send email · ارسال ایمیل</h3><p>Choose how to send to <b>${to}</b><br><span lang="fa">روش ارسال را انتخاب کنید</span></p>
${e(`https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${q(su)}&body=${q(body)}`,"Gmail")}
${e(`https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${q(su)}&body=${q(body)}`,"Outlook.com / Hotmail")}
${e(`mailto:${to}?subject=${q(su)}&body=${q(body)}`,"Email app on this device · برنامه ایمیل")}
<button class="btn alt" id="cp">Copy address · کپی آدرس</button> <button class="btn" id="cl" style="background:#667">Close · بستن</button>`;
dlg.querySelectorAll("a").forEach(a=>a.onclick=()=>setTimeout(()=>dlg.close(),200));
dlg.querySelector("#cl").onclick=()=>dlg.close();
dlg.querySelector("#cp").onclick=ev=>{(navigator.clipboard?navigator.clipboard.writeText(to):Promise.reject()).then(()=>ev.target.textContent="Copied · کپی شد",()=>ev.target.textContent=to)};
dlg.showModal()}
document.addEventListener("click",ev=>{const a=ev.target.closest('a[href^="mailto:"]');if(!a||!dlg.showModal)return;ev.preventDefault();
const u=new URL(a.href);pickMail(decodeURIComponent(u.pathname),u.searchParams.get("subject")||"",u.searchParams.get("body")||"")});
const f=document.getElementById("fb");if(f)f.onsubmit=ev=>{ev.preventDefault();const g=n=>f.elements[n].value;pickMail(CFG.email,"["+g("topic")+"] from "+g("name"),g("msg")+"\n\n"+g("name"))};
