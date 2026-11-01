# Honest limitations — SAMI & SARA AI 2.0

Read this before judging the app as "AI":

1. LOCAL ENGINE, NOT AN LLM. Sami and Sara here are rule-based local
   characters. They do not understand language like a real model, do not
   learn, and do not call any AI API. Their "debate" is a structured
   checklist exchange, and it is labelled as such in the app.
2. NO FAKE INTEGRATIONS. Providers, web search, image generation and
   databases are listed as NOT CONFIGURED. Nothing pretends to search the
   web, generate an image, or query a database.
3. NO INVENTED CITATIONS. Research Mode produces a research plan and a
   source checklist. With no sources attached, it claims no citations.
4. NO AUTO ACTIONS. The task planner plans only. Publish, pay, send and
   delete actions are flagged NEEDS APPROVAL and never run by themselves.
5. NO SECRETS. No key, password, OTP or token exists in this repo. The
   security module only scans text you paste for common risk patterns; it
   is not a full security audit.
6. NO BACKEND. There is no server, database or account system in this
   build. Memory lives in the visitor's own browser (localStorage) and can
   be deleted there at any time.
7. UPGRADE PATH (needs a separate decision + the user's own setup):
   a real backend + the user's own LLM provider key, entered by the user
   on their own device, could replace the local engine behind the same
   7-phase interface. That step is NOT included here and must never be
   faked with a placeholder "AI" label.
