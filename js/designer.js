function drawDesigner(){
  var c = document.getElementById("d-canvas");
  if(!c) return;
  var ctx = c.getContext("2d");
  ctx.fillStyle = document.getElementById("d-bg").value;
  ctx.fillRect(0, 0, 800, 450);
  ctx.fillStyle = document.getElementById("d-color").value;
  ctx.textAlign = "center";
  var size = document.getElementById("d-size") ? document.getElementById("d-size").value : 56;
  ctx.font = "bold " + size + "px Arial";
  ctx.fillText(document.getElementById("d-headline").value, 400, 200, 740);
  ctx.font = "28px Arial";
  ctx.fillText(document.getElementById("d-subtext").value, 400, 260, 740);
}
["d-headline","d-subtext","d-bg","d-color","d-size"].forEach(function(id){
  document.addEventListener("DOMContentLoaded", function(){
    var el = document.getElementById(id);
    if(el) el.addEventListener("input", drawDesigner);
  });
});
document.addEventListener("DOMContentLoaded", function(){
  var btn = document.getElementById("d-download");
  if(btn) btn.addEventListener("click", function(){
    drawDesigner();
    var a = document.createElement("a");
    a.download = "sami-design.png";
    a.href = document.getElementById("d-canvas").toDataURL("image/png");
    a.click();
  });
  drawDesigner();
});
window.drawDesigner = drawDesigner;
