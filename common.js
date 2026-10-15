/* 資安闖關 — 共用邏輯：進度解鎖、頁首進度、主題切換
   進度存在瀏覽器 localStorage，index 與各關頁共用。 */
(function(){
  "use strict";
  // 10 關基本資料（index 地圖與各頁導覽共用）
  window.LEVELS = [
    {code:"A01",nm:"存取控制失效",en:"Broken Access Control",file:"a01.html"},
    {code:"A02",nm:"安全設定錯誤",en:"Security Misconfiguration",file:"a02.html"},
    {code:"A03",nm:"軟體供應鏈失效",en:"Software Supply Chain Failures",file:"a03.html"},
    {code:"A04",nm:"加密機制失效",en:"Cryptographic Failures",file:"a04.html"},
    {code:"A05",nm:"注入攻擊",en:"Injection",file:"a05.html"},
    {code:"A06",nm:"不安全設計",en:"Insecure Design",file:"a06.html"},
    {code:"A07",nm:"認證失效",en:"Authentication Failures",file:"a07.html"},
    {code:"A08",nm:"軟體或資料完整性失效",en:"Software or Data Integrity Failures",file:"a08.html"},
    {code:"A09",nm:"安全記錄與警示失效",en:"Security Logging and Alerting Failures",file:"a09.html"},
    {code:"A10",nm:"例外狀況處理不當",en:"Mishandling of Exceptional Conditions",file:"a10.html"}
  ];

  // ---- 進度讀寫 ----
  function getDone(){
    try{ var c=localStorage.getItem('owasp_done'); return new Set(c?JSON.parse(c):[]); }
    catch(e){ return new Set(); }
  }
  function saveDone(set){
    try{ localStorage.setItem('owasp_done', JSON.stringify([...set])); }catch(e){}
  }
  window.OWASP = {
    done:getDone,
    isUnlocked:function(i){ // 第 0 關恆開；其餘需前一關完成
      if(i<=0) return true;
      return getDone().has(i-1);
    },
    complete:function(i){ var s=getDone(); s.add(i); saveDone(s); return s; },
    reset:function(){ try{localStorage.removeItem('owasp_done');}catch(e){} }
  };

  // ---- 頁首進度條 ----
  window.renderProgress = function(){
    var n=getDone().size;
    var num=document.getElementById('pnum'); if(num) num.textContent=n;
    var fill=document.getElementById('pfill'); if(fill) fill.style.width=(n*10)+'%';
  };

  // ---- 主題切換 ----
  window.initTheme = function(){
    var btn=document.getElementById('themeBtn'); if(!btn) return;
    btn.addEventListener('click',function(){
      var r=document.documentElement, cur=r.getAttribute('data-theme');
      var dark = cur ? cur==='dark' : matchMedia('(prefers-color-scheme:dark)').matches;
      r.setAttribute('data-theme', dark?'light':'dark');
    });
  };

  // ---- 關卡頁：發現問題後揭曉並解鎖 ----
  // 用法：在各關頁呼叫 markFound(levelIndex, 訊息HTML)
  window.markFound = function(idx, msgHTML){
    var found=document.getElementById('found');
    if(found){ found.querySelector('#foundTxt').innerHTML=msgHTML; found.classList.add('show'); }
    var first = !getDone().has(idx);
    window.OWASP.complete(idx);
    renderProgress();
    // 顯示揭曉區
    var rev=document.getElementById('reveal'); if(rev) rev.hidden=false;
    // 解鎖提示
    var um=document.getElementById('umsg');
    if(um){
      if(idx<9){ var nx=window.LEVELS[idx+1];
        um.innerHTML='★ 已解鎖下一關 <b>'+nx.code+' '+nx.nm+'</b>　往下看原因與解法，再前往下一關'; }
      else{ um.innerHTML='★ 這是最後一關！看完原因與解法就全破了'; }
    }
    if(found) found.scrollIntoView({behavior:'smooth',block:'center'});
  };
})();
