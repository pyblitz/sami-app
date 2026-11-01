var SAMI_AUTOMATIONS = [
  "Daily content checklist — draft first, publish only after your OK",
  "File organizer reminder — dry-run first, never auto-delete",
  "Post-draft checklist — spelling, safe area, no placeholder contact",
  "Repo checklist — README, LICENSE, tests, demo image links"
];
document.addEventListener("DOMContentLoaded", function(){
  var list = document.getElementById("auto-list");
  if(!list) return;
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem("sami-automations") || "{}"); } catch(e) {}
  SAMI_AUTOMATIONS.forEach(function(text, idx){
    var li = document.createElement("li");
    var box = document.createElement("input");
    box.type = "checkbox";
    box.checked = !!saved[idx];
    box.addEventListener("change", function(){
      saved[idx] = box.checked;
      try { localStorage.setItem("sami-automations", JSON.stringify(saved)); } catch(e) {}
    });
    li.appendChild(box);
    li.appendChild(document.createTextNode(" " + text));
    list.appendChild(li);
  });
  document.getElementById("auto-note").textContent =
    "These are local checklists only. They do not post, message, or log in anywhere.";
});
