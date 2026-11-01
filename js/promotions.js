document.addEventListener("DOMContentLoaded", function(){
  var gen = document.getElementById("p-generate");
  var copy = document.getElementById("p-copy");
  if(gen) gen.addEventListener("click", function(){
    var name = document.getElementById("p-name").value.trim();
    var price = document.getElementById("p-price").value.trim();
    var cta = document.getElementById("p-cta").value.trim();
    document.getElementById("p-output").value =
      (name ? name : "Service") + "\n" +
      (price ? "Price: " + price + "\n" : "") +
      cta + "\nConcept sample — no fake client or result claimed.";
  });
  if(copy) copy.addEventListener("click", function(){
    var out = document.getElementById("p-output");
    out.select();
    document.execCommand("copy");
    try { localStorage.setItem("sami-promo", out.value); } catch(e) {}
  });
  try {
    var saved = localStorage.getItem("sami-promo");
    if(saved) document.getElementById("p-output").value = saved;
  } catch(e) {}
});
