(function(){
  const WEBHOOK = "https://hwoard1081.app.n8n.cloud/webhook/agent-intake";
  const KEY = "wallace-agent-intake-v1";
  const SECTIONS = window.INTAKE_SECTIONS;
  const $ = id => document.getElementById(id);

  let state = load();
  function load(){ try{ return JSON.parse(localStorage.getItem(KEY)) || {answers:{}, step:-1}; }catch(e){ return {answers:{}, step:-1}; } }
  function save(){ localStorage.setItem(KEY, JSON.stringify(state)); flashSaved(); }
  let saveTimer;
  function flashSaved(){ const el=$("save-state"); el.textContent="Saved"; clearTimeout(saveTimer); saveTimer=setTimeout(()=>el.textContent="Answers save automatically",1500); }

  // ---------- visibility & completion ----------
  function visible(f){
    if(!f.showIf) return true;
    const v = state.answers[f.showIf.id];
    const arr = Array.isArray(v)?v:(v==null||v===""?[]:[v]);
    if("is" in f.showIf) return v === f.showIf.is;
    if("not" in f.showIf) return !!v && v !== f.showIf.not;
    if("in" in f.showIf) return f.showIf.in.includes(v);
    if("has" in f.showIf) return arr.includes(f.showIf.has);
    if("notHas" in f.showIf) return arr.length>0 && !arr.includes(f.showIf.notHas);
    return true;
  }
  function answered(f){ const v=state.answers[f.id]; return Array.isArray(v)?v.length>0:(v!=null && String(v).trim()!==""); }
  function formatProblem(f){
    if(!answered(f)) return "";
    const v=String(state.answers[f.id]).trim();
    if(f.type==="email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "doesn't look like an email address";
    if(f.type==="url" && !/^(https?:\/\/)?[^\s]+\.[^\s]{2,}$/i.test(v)) return "doesn't look like a web address";
    if(f.type==="number" && (isNaN(Number(v)) || Number(v)<0)) return "needs to be a number, 0 or higher";
    if(f.type==="tel" && (v.replace(/\D/g,"").length<7)) return "doesn't look like a phone number";
    return "";
  }
  function ok(f){ return answered(f) && !formatProblem(f); }
  function sectionStats(sec){
    const vis=sec.fields.filter(visible);
    return { total:vis.length, done:vis.filter(ok).length, missing:vis.filter(f=>(f.required&&!answered(f))||formatProblem(f)) };
  }
  function completion(){
    let t=0,d=0; SECTIONS.forEach(s=>{const st=sectionStats(s); t+=st.total; d+=st.done;});
    return t?Math.round(d/t*100):0;
  }
  function refreshProgress(){
    const p=completion(); $("pct").textContent=p; $("progress-bar").style.width=p+"%";
    renderSteps();
  }

  // ---------- sidebar ----------
  function renderSteps(){
    const ol=$("steps");
    if(!ol.children.length){
      SECTIONS.forEach((s,i)=>{
        const li=document.createElement("li");
        li.innerHTML=`<span class="num">${s.icon}</span><span>${s.title}</span><span class="count"></span>`;
        li.onclick=()=>go(i);
        ol.appendChild(li);
      });
      const li=document.createElement("li");
      li.innerHTML=`<span class="num">✓</span><span>Review and submit</span>`;
      li.onclick=()=>go(SECTIONS.length);
      ol.appendChild(li);
    }
    SECTIONS.forEach((s,i)=>{
      const st=sectionStats(s), li=ol.children[i];
      li.className=(i===state.step?"active ":"")+(st.done===st.total&&st.total>0?"done":"");
      li.querySelector(".count").textContent=`${st.done}/${st.total}`;
    });
    ol.children[SECTIONS.length].className=state.step===SECTIONS.length?"active":"";
  }

  // ---------- field rendering ----------
  function fieldEl(f){
    const wrap=document.createElement("div"); wrap.className="field"; wrap.dataset.id=f.id;
    const req=f.required?'<span class="req" title="Required">*</span>':"";
    let inner=`<label class="q" for="f_${f.id}">${f.label}${req}</label>`;
    if(f.help) inner+=`<p class="help">${f.help}</p>`;
    const v=state.answers[f.id];
    switch(f.type){
      case "textarea": inner+=`<textarea id="f_${f.id}" rows="4">${esc(v||"")}</textarea>`; break;
      case "select": inner+=`<select id="f_${f.id}"><option value="">Choose one</option>${f.options.map(o=>`<option ${v===o?"selected":""}>${o}</option>`).join("")}</select>`; break;
      case "radio": case "yesno": {
        const opts=f.type==="yesno"?["Yes","No"]:f.options;
        inner+=`<div class="opts ${opts.length>3?"cols":""}">${opts.map(o=>`<label class="opt ${v===o?"on":""}"><input type="radio" name="f_${f.id}" value="${esc(o)}" ${v===o?"checked":""}><span>${o}</span></label>`).join("")}</div>`; break; }
      case "checkbox": {
        const arr=Array.isArray(v)?v:[];
        inner+=`<div class="opts ${f.options.length>3?"cols":""}">${f.options.map(o=>`<label class="opt ${arr.includes(o)?"on":""}"><input type="checkbox" name="f_${f.id}" value="${esc(o)}" ${arr.includes(o)?"checked":""}><span>${o}</span></label>`).join("")}</div>`;
        if(f.max) inner+=`<div class="counter">Pick up to ${f.max}</div>`;
        break; }
      default: inner+=`<input id="f_${f.id}" type="${f.type}" value="${esc(v||"")}" ${f.type==="number"?'min="0" inputmode="numeric"':""} ${f.type==="tel"?'inputmode="tel"':""}>`;
    }
    wrap.innerHTML=inner;
    wrap.addEventListener("input",e=>onInput(f,wrap,e));
    wrap.addEventListener("change",e=>onInput(f,wrap,e));
    return wrap;
  }
  function onInput(f,wrap,e){
    let val;
    if(f.type==="checkbox"){
      const boxes=[...wrap.querySelectorAll("input[type=checkbox]")];
      let on=boxes.filter(b=>b.checked);
      if(f.max && on.length>f.max){ const clicked=e&&e.target&&e.target.type==="checkbox"?e.target:on[on.length-1]; clicked.checked=false; on=boxes.filter(b=>b.checked); toast(`Pick up to ${f.max}. Untick one first to change your picks.`,true); }
      boxes.forEach(b=>b.closest(".opt").classList.toggle("on",b.checked));
      val=on.map(b=>b.value);
    } else if(f.type==="radio"||f.type==="yesno"){
      const r=wrap.querySelector("input:checked"); val=r?r.value:"";
      wrap.querySelectorAll(".opt").forEach(o=>o.classList.toggle("on",o.querySelector("input").checked));
    } else { val=wrap.querySelector("input,select,textarea").value; }
    state.answers[f.id]=val; wrap.classList.remove("invalid");
    save(); refreshProgress(); refreshVisibility();
  }
  function refreshVisibility(){
    const sec=SECTIONS[state.step]; if(!sec) return;
    const form=$("fields");
    sec.fields.forEach(f=>{
      let el=form.querySelector(`.field[data-id="${f.id}"]`);
      const show=visible(f);
      if(show && !el){ // insert in order
        el=fieldEl(f);
        const idx=sec.fields.indexOf(f);
        let after=null;
        for(let i=idx+1;i<sec.fields.length;i++){ after=form.querySelector(`.field[data-id="${sec.fields[i].id}"]`); if(after) break; }
        form.insertBefore(el, after);
      } else if(!show && el){ el.remove(); }
    });
  }

  // ---------- navigation ----------
  function go(i){
    state.step=i; save();
    $("welcome").classList.add("hidden"); $("done-view").classList.add("hidden");
    window.scrollTo({top:0,behavior:"smooth"});
    if(i>=SECTIONS.length){ renderReview(); $("section-view").classList.add("hidden"); $("review-view").classList.remove("hidden"); refreshProgress(); return; }
    $("review-view").classList.add("hidden"); $("section-view").classList.remove("hidden");
    const sec=SECTIONS[i];
    $("sec-num").textContent="Section "+(i+1); $("sec-total").textContent=SECTIONS.length;
    $("sec-title").textContent=sec.title; $("sec-intro").textContent=sec.intro;
    const form=$("fields"); form.innerHTML="";
    sec.fields.filter(visible).forEach(f=>form.appendChild(fieldEl(f)));
    $("sec-missing").classList.add("hidden"); delete $("sec-missing").dataset.warned;
    $("btn-prev").textContent=i===0?"Back to start":"Back";
    $("btn-next").textContent=i===SECTIONS.length-1?"Review my answers":"Save and continue";
    refreshProgress();
  }
  function next(){
    const sec=SECTIONS[state.step]; const st=sectionStats(sec);
    if(st.missing.length){
      st.missing.forEach(f=>{ const el=$("fields").querySelector(`.field[data-id="${f.id}"]`); if(el) el.classList.add("invalid"); });
      const box=$("sec-missing"); box.classList.remove("hidden");
      box.innerHTML=`<strong>${st.missing.length} ${st.missing.length===1?"question needs":"questions need"} attention in this section.</strong> You can continue and come back, but we need these fixed before you submit.<br>`+st.missing.map(f=>`<a href="#" data-j="${f.id}">${f.label}${formatProblem(f)?" ("+formatProblem(f)+")":""}</a>`).join(" · ");
      box.querySelectorAll("a").forEach(a=>a.onclick=e=>{e.preventDefault(); const el=$("fields").querySelector(`.field[data-id="${a.dataset.j}"]`); el.scrollIntoView({behavior:"smooth",block:"center"});});
      if(!box.dataset.warned){ box.dataset.warned="1"; box.scrollIntoView({behavior:"smooth",block:"center"}); return; }
    }
    go(state.step+1);
  }

  // ---------- review ----------
  function allAnswers(){
    const out=[];
    SECTIONS.forEach(s=>s.fields.filter(visible).forEach(f=>out.push({section:s.title,id:f.id,label:f.label,value:state.answers[f.id] ?? ""})));
    return out;
  }
  function renderReview(){
    const list=$("review-list"); list.innerHTML="";
    const missing=[];
    SECTIONS.forEach((s,i)=>{
      const st=sectionStats(s); st.missing.forEach(f=>missing.push({sec:i,f}));
      const div=document.createElement("div");
      div.innerHTML=`<h2 title="Edit this section">${s.icon}. ${s.title}</h2><table>${s.fields.filter(visible).map(f=>{const v=state.answers[f.id]; const txt=Array.isArray(v)?v.join(", "):(v||""); return `<tr><td>${f.label}${f.required?' <span class="req">*</span>':""}</td><td class="${txt?"":"empty"}">${txt?esc(txt).replace(/\n/g,"<br>"):"not answered"}</td></tr>`;}).join("")}</table>`;
      div.querySelector("h2").onclick=()=>go(i);
      list.appendChild(div);
    });
    const box=$("review-missing");
    if(missing.length){
      box.classList.remove("hidden");
      box.innerHTML=`<strong>${missing.length} ${missing.length===1?"question needs":"questions need"} attention.</strong> Please fix these before submitting:<br>`+missing.map(m=>`<a href="#" data-s="${m.sec}">${SECTIONS[m.sec].title}: ${m.f.label}${formatProblem(m.f)?" ("+formatProblem(m.f)+")":""}</a>`).join("<br>");
      box.querySelectorAll("a").forEach(a=>a.onclick=e=>{e.preventDefault(); go(+a.dataset.s);});
      $("btn-submit").disabled=true; $("btn-submit").textContent="Finish required questions first";
    } else { box.classList.add("hidden"); $("btn-submit").disabled=false; $("btn-submit").textContent="Submit my answers"; }
  }

  // ---------- submit ----------
  function payload(status){
    const a=state.answers;
    return { meta:{ agentName:[a.first_name,a.last_name].filter(Boolean).join(" ")||a.display_name||"", email:a.email||"", phone:a.phone||"", status, completion:completion(), version:window.INTAKE_VERSION, submittedAt:new Date().toISOString(), page:location.href, ua:navigator.userAgent }, answers:allAnswers(), _gotcha:"" };
  }
  async function send(status,btn){
    const orig=btn.textContent; btn.disabled=true; btn.textContent="Sending…";
    try{
      const r=await fetch(WEBHOOK,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload(status))});
      if(!r.ok) throw new Error("HTTP "+r.status);
      if(status==="final"){ state.submitted=new Date().toISOString(); save(); $("section-view").classList.add("hidden"); $("review-view").classList.add("hidden"); $("done-view").classList.remove("hidden"); window.scrollTo({top:0}); }
      else toast("Sent. Howard has your progress so far. Keep going whenever you like.");
    }catch(e){
      toast("Couldn't send right now. Your answers are still saved here. Try again in a minute, or use \"Download my answers\" and email the file to Howard.",true);
    }
    btn.disabled=false; btn.textContent=orig;
  }
  function download(){
    const blob=new Blob([JSON.stringify(payload("download"),null,2)],{type:"application/json"});
    const a=document.createElement("a"); a.href=URL.createObjectURL(blob);
    a.download=`agent-intake-${(state.answers.first_name||"answers").toLowerCase()}.json`; a.click();
  }
  let toastTimer;
  function toast(msg,err){ const t=$("toast"); t.textContent=msg; t.className="toast"+(err?" err":""); clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.add("hidden"),err?9000:4000); }
  function esc(s){ return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }

  // ---------- wire up ----------
  $("btn-start").onclick=()=>go(state.step>=0?state.step:0);
  $("btn-prev").onclick=()=>{ if(state.step===0){ state.step=-1; save(); $("section-view").classList.add("hidden"); $("welcome").classList.remove("hidden"); refreshProgress(); } else go(state.step-1); };
  $("btn-next").onclick=next;
  $("btn-review-back").onclick=()=>go(SECTIONS.length-1);
  $("btn-submit").onclick=e=>send("final",e.currentTarget);
  $("btn-draft").onclick=e=>{ if(!Object.keys(state.answers).length){ toast("Nothing to send yet.",true); return;} send("draft",e.currentTarget); };
  $("btn-download").onclick=download; $("btn-download-2").onclick=download;
  $("btn-edit-again").onclick=()=>go(0);
  $("btn-reset").onclick=()=>{ if(confirm("Erase all your answers on this device and start over?")){ localStorage.removeItem(KEY); state={answers:{},step:-1}; location.reload(); } };

  const hasData=Object.keys(state.answers).length>0;
  if(hasData){ $("resume-note").classList.remove("hidden"); $("btn-start").textContent="Continue where I left off"; }
  if(state.submitted && hasData){ $("welcome").classList.add("hidden"); $("done-view").classList.remove("hidden"); }
  refreshProgress();
})();
