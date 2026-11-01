document.querySelectorAll(".nav-btn").forEach(function(btn){
  btn.addEventListener("click", function(){ showTab(btn.dataset.tab); });
});
document.querySelectorAll("[data-goto]").forEach(function(el){
  el.addEventListener("click", function(){ showTab(el.dataset.goto); });
});
function showTab(id){
  document.querySelectorAll(".tab").forEach(function(t){ t.classList.remove("active"); });
  document.querySelectorAll(".nav-btn").forEach(function(b){ b.classList.toggle("active", b.dataset.tab === id); });
  var el = document.getElementById(id);
  if(el) el.classList.add("active");
  if(id === "designer" && window.drawDesigner) window.drawDesigner();
}
if("serviceWorker" in navigator){
  // Draft only: service worker is registered only when served over https/localhost.
  // It is not claimed to work from a plain file open.
  window.addEventListener("load", function(){
    navigator.serviceWorker.register("sw.js").catch(function(){});
  });
}
