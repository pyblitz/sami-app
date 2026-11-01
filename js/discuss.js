// Sami & Sara Discuss — local text only. No LLM, no API, no auto-post, no voice call.
// Sami and Sara are fictional assistant characters (a male-female co-host/expert pair),
// not real people, and no romantic roleplay or real-relationship claim is made here.
// How it works: Sami gives plan/logic, Sara gives QC/risk/user view, then a joint
// conclusion. Both check an idea against 7 lenses, and neither just agrees.
function samiSaraDiscuss(idea) {
  var text = (idea || "").trim();
  if (!text) {
    return { sami: "Idea likho, phir main plan dunga.", sara: "Idea khaali hai — pehle idea likho, phir main QC/risk check karungi.", joint: "Koi idea nahi diya gaya, is liye koi conclusion nahi." };
  }
  var lenses = [
    "Science/logic: kya ye logically possible hai, kya evidence hai, kya assumption chhupi hai?",
    "Nature/environment: kya ye time, energy aur resources waste kiye baghair sustainable hai?",
    "Resources: kitna waqt, paisa, CPU aur internet chahiye? Free hai ya paid? Kya ye available hai?",
    "Human/user: user ko kaisa lagega? Kya ye samajh me aayega, safe aur honest hai?",
    "Risk/failure: kya ghalat ho sakta hai — account ban, copyright, fake claim, session expire, QC fail?",
    "Alternative: is ka sasta, fast ya safe doosra tareeqa kya hai?",
    "History: kya ye pehle try hua hai, kya ruka hai, kya seekha gaya hai? History dobara guess mat karo."
  ];
  return {
    sami: "Sami (plan/logic): Idea — \"" + text + "\". Pehla step: is ko 3 chhote steps me todo, har step ka waqt aur cost likho, phir feasibility check karo. Bina steps ke shuru mat karo.",
    sara: "Sara (QC/risk/user view): Is idea ko 7 lenses se check karo — " + lenses.join(" ") + " Agar spelling, overlap, safe area, ya koi fake claim is me hai, to wo pehle fix hoga, phir aage badhenge. Sirf tareef nahi, ghalti pehle bataungi.",
    joint: "Joint conclusion: Idea ko steps + 7-lens check ke baad hi aage badhao. Jo hissa sahi hai use rakho, jo hissa ghalat ya risky hai use corrected version se badlo. Final decision hamesha owner ki hai. Koi publish, post ya spend is discussion se automatically nahi hoga."
  };
}
document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("discuss-go");
  if (!btn) return;
  btn.addEventListener("click", function () {
    var idea = document.getElementById("discuss-idea").value;
    var out = samiSaraDiscuss(idea);
    document.getElementById("discuss-sami").textContent = out.sami;
    document.getElementById("discuss-sara").textContent = out.sara;
    document.getElementById("discuss-joint").textContent = out.joint;
  });
});
