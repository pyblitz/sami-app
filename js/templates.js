var SAMI_TEMPLATES = [
  {name: "Logo Post", headline: "Logo Design", sub: "Sample First • Rs 1,500"},
  {name: "Banner Post", headline: "Banner Design", sub: "Sample First • Rs 1,200"},
  {name: "Brand Kit Cover", headline: "Full Brand Kit", sub: "Sample First • Rs 4,500"},
  {name: "Social Post", headline: "Social Media Pack", sub: "Sample First • Rs 2,500"},
  {name: "Product Post", headline: "Product Showcase", sub: "Concept Brand • Sample First"},
  {name: "Food Delivery Post", headline: "Food Delivery", sub: "Concept Brand • Sample First"},
  {name: "Burger Post", headline: "Burger Special", sub: "Concept Brand • Sample First"},
  {name: "Masala Post", headline: "Masala Brand", sub: "Concept Brand • Sample First"},
  {name: "Shoes Post", headline: "Shoes Collection", sub: "Concept Brand • Sample First"},
  {name: "Shirts Post", headline: "Shirts Collection", sub: "Concept Brand • Sample First"}
];
document.addEventListener("DOMContentLoaded", function(){
  var grid = document.getElementById("template-grid");
  if(!grid) return;
  SAMI_TEMPLATES.forEach(function(t){
    var b = document.createElement("button");
    b.className = "card";
    b.innerHTML = "<strong>" + t.name + "</strong><br>" + t.headline + "<br><small>" + t.sub + "</small>";
    b.addEventListener("click", function(){
      document.getElementById("d-headline").value = t.headline;
      document.getElementById("d-subtext").value = t.sub;
      try { localStorage.setItem("sami-design", JSON.stringify({headline: t.headline, sub: t.sub})); } catch(e) {}
      showTab("designer");
    });
    grid.appendChild(b);
  });
});
