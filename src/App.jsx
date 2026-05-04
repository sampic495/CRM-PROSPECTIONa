import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const NL = String.fromCharCode(10);
const SUPABASE_URL = "https://tayaxamknblvkzqqfkog.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_v2y8Dbghv3tR6i4Sy3f4nw_-1HvHBYK";
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const statuses = ["À contacter", "Contacté", "Intéressé", "Pas intéressé", "À recontacter", "Rendez-vous pris", "Proposition envoyée", "Closer", "Pas closer"];
const stages = ["Nouveau", "À contacter", "Contacté", "Intéressé", "Rendez-vous pris", "Proposition envoyée", "Négociation", "Closer", "Pas closer"];
const temperatures = ["Chaud", "Tiède", "Froid"];

const demoLeads = [
  {
    entreprise: "Montambault Esthétique",
    proprietaire: "Keven Montambault",
    contact: "Keven",
    telephone: "418-555-0198",
    email: "contact@exemple.ca",
    site: "montambaultesthetique.ca",
    ville: "Saint-Georges",
    region: "Beauce",
    niche: "Centre esthétique automobile",
    services: "Lavage, polissage, céramique, décontamination, esthétique complète",
    source: "Terrain",
    facebook: "Actif",
    instagram: "Moyen",
    tiktok: "Faible",
    besoinMarketing: "Très fort",
    temperature: "Chaud",
    statut: "Rendez-vous pris",
    priorite: "Haute",
    budget: "1500+",
    valeurMensuelle: 1500,
    dernierContact: "2026-05-01",
    prochainSuivi: "2026-05-03",
    notes: "Bon potentiel. Mettre de l’avant les grosses jobs payantes.",
    objection: "Veut voir des exemples concrets.",
    offre: "Acquisition client via réseaux sociaux",
    interesse: "Oui",
    assigne: "Samuel"
  },
  {
    entreprise: "Pneu Delta",
    proprietaire: "À valider",
    contact: "Réception",
    telephone: "418-555-0112",
    email: "info@pneudelta.ca",
    site: "pneudelta.ca",
    ville: "Saint-Georges",
    region: "Beauce",
    niche: "Vente de pneus",
    services: "Vente pneus, installation, urgence, pneus agricoles",
    source: "Google Maps",
    facebook: "Moyen",
    instagram: "Faible",
    tiktok: "Inconnu",
    besoinMarketing: "Fort",
    temperature: "Tiède",
    statut: "À contacter",
    priorite: "Moyenne",
    budget: "1000+",
    valeurMensuelle: 1000,
    dernierContact: "",
    prochainSuivi: "2026-05-04",
    notes: "Business locale. Bon volume saisonnier.",
    objection: "",
    offre: "Campagne saison pneus",
    interesse: "Peut-être",
    assigne: "Samuel"
  },
  {
    entreprise: "Pro Pare-Brise Lévis",
    proprietaire: "À valider",
    contact: "Directeur",
    telephone: "418-555-0161",
    email: "info@proparebrise.ca",
    site: "proparebrise.ca",
    ville: "Lévis",
    region: "Chaudière-Appalaches",
    niche: "Réparation de pare-brise",
    services: "Remplacement, réparation éclats, calibration, protection vitre",
    source: "Google",
    facebook: "Faible",
    instagram: "Faible",
    tiktok: "Inconnu",
    besoinMarketing: "Très fort",
    temperature: "Chaud",
    statut: "Contacté",
    priorite: "Haute",
    budget: "2000+",
    valeurMensuelle: 2000,
    dernierContact: "2026-04-30",
    prochainSuivi: "2026-05-02",
    notes: "Service urgent. Besoin de visibilité locale.",
    objection: "Demande combien ça coûte.",
    offre: "Campagnes appels entrants",
    interesse: "Oui",
    assigne: "Frère"
  }
];

function toDbLead(lead, userId) {
  return {
    owner_id: userId || lead.owner_id || null,
    entreprise: lead.entreprise || "",
    proprietaire: lead.proprietaire || "",
    contact: lead.contact || "",
    telephone: lead.telephone || "",
    email: lead.email || "",
    site: lead.site || "",
    ville: lead.ville || "",
    region: lead.region || "",
    niche: lead.niche || "",
    services: lead.services || "",
    source: lead.source || "",
    facebook: lead.facebook || "Inconnu",
    instagram: lead.instagram || "Inconnu",
    tiktok: lead.tiktok || "Inconnu",
    besoin_marketing: lead.besoinMarketing || lead.besoin_marketing || "Fort",
    temperature: lead.temperature || "Tiède",
    statut: lead.statut || "À contacter",
    priorite: lead.priorite || "Moyenne",
    budget: lead.budget || "1000+",
    valeur_mensuelle: Number(lead.valeurMensuelle || lead.valeur_mensuelle || 0),
    dernier_contact: lead.dernierContact || lead.dernier_contact || null,
    prochain_suivi: lead.prochainSuivi || lead.prochain_suivi || null,
    notes: lead.notes || "",
    objection: lead.objection || "",
    offre: lead.offre || "",
    interesse: lead.interesse || "Peut-être",
    assigne: lead.assigne || "Samuel",
    updated_at: new Date().toISOString()
  };
}

function fromDbLead(row) {
  return {
    id: row.id,
    owner_id: row.owner_id,
    entreprise: row.entreprise || "",
    proprietaire: row.proprietaire || "",
    contact: row.contact || "",
    telephone: row.telephone || "",
    email: row.email || "",
    site: row.site || "",
    ville: row.ville || "",
    region: row.region || "",
    niche: row.niche || "",
    services: row.services || "",
    source: row.source || "",
    facebook: row.facebook || "Inconnu",
    instagram: row.instagram || "Inconnu",
    tiktok: row.tiktok || "Inconnu",
    besoinMarketing: row.besoin_marketing || "Fort",
    temperature: row.temperature || "Tiède",
    statut: row.statut || "À contacter",
    priorite: row.priorite || "Moyenne",
    budget: row.budget || "1000+",
    valeurMensuelle: Number(row.valeur_mensuelle || 0),
    dernierContact: row.dernier_contact || "",
    prochainSuivi: row.prochain_suivi || "",
    notes: row.notes || "",
    objection: row.objection || "",
    offre: row.offre || "",
    interesse: row.interesse || "Peut-être",
    assigne: row.assigne || "Samuel"
  };
}

function toDbTask(task, userId) {
  return {
    owner_id: userId,
    lead_id: task.leadId || task.lead_id || null,
    title: task.title || "",
    type: task.type || "Relance",
    priority: task.priority || "Moyenne",
    due_date: task.due || task.due_date || null,
    status: task.status || "À faire",
    assigned: task.assigned || "Samuel"
  };
}

function fromDbTask(row) {
  return {
    id: row.id,
    leadId: row.lead_id || "",
    title: row.title || "",
    type: row.type || "Relance",
    priority: row.priority || "Moyenne",
    due: row.due_date || "",
    status: row.status || "À faire",
    assigned: row.assigned || "Samuel"
  };
}

function toDbAppointment(appointment, userId) {
  return {
    owner_id: userId,
    lead_id: appointment.leadId || appointment.lead_id || null,
    title: appointment.title || "Rencontre découverte",
    date: appointment.date || null,
    time: appointment.time || "",
    duration: Number(appointment.duration || 30),
    meet_link: appointment.meet || appointment.meet_link || "",
    status: appointment.status || "Prévu",
    notes: appointment.notes || ""
  };
}

function fromDbAppointment(row) {
  return {
    id: row.id,
    leadId: row.lead_id || "",
    title: row.title || "Rencontre découverte",
    date: row.date || "",
    time: row.time || "",
    duration: Number(row.duration || 30),
    meet: row.meet_link || "",
    status: row.status || "Prévu",
    notes: row.notes || ""
  };
}

function toDbCampaign(campaign, userId) {
  return {
    owner_id: userId,
    lead_id: campaign.leadId || campaign.lead_id || null,
    name: campaign.name || "Nouvelle campagne",
    objective: campaign.objective || "Leads",
    budget: Number(campaign.budget || 0),
    fee: Number(campaign.fee || 0),
    status: campaign.status || "Idée",
    leads_generated: Number(campaign.leads || campaign.leads_generated || 0),
    appointments: Number(campaign.appointments || 0),
    closes: Number(campaign.closes || 0),
    notes: campaign.notes || ""
  };
}

function fromDbCampaign(row) {
  return {
    id: row.id,
    leadId: row.lead_id || "",
    name: row.name || "Nouvelle campagne",
    objective: row.objective || "Leads",
    budget: Number(row.budget || 0),
    fee: Number(row.fee || 0),
    status: row.status || "Idée",
    leads: Number(row.leads_generated || 0),
    appointments: Number(row.appointments || 0),
    closes: Number(row.closes || 0),
    notes: row.notes || ""
  };
}

function getEmailTemplates() {
  const siteBody = [
    "Bonjour,",
    "",
    "Voici notre site web :",
    "🔗 https://isaacmedia.ca/",
    "",
    "Nous aidons les entreprises à améliorer leur présence en ligne et à attirer plus de clients 🚀",
    "",
    "Au plaisir,",
    "",
    "Samuel Ouellet",
    "Isaac Media",
    "📧 isaacpaidads@gmail.com",
    "📞 Isaac Media : 418-974-3035",
    "📱 Samuel : 581-744-3026",
    "🌐 https://isaacmedia.ca/"
  ].join(NL);

  const meetBody = [
    "Bonjour,",
    "",
    "Voici le lien pour se rejoindre à notre rencontre prévue le {{date_heure}} :",
    "🔗 {{lien_google_meet}}",
    "",
    "Voici aussi notre site web si vous souhaitez y jeter un coup d’œil avant la rencontre :",
    "🌐 https://isaacmedia.ca/",
    "",
    "Au plaisir d’échanger avec vous 😊",
    "",
    "Samuel Ouellet",
    "Isaac Media",
    "📧 isaacpaidads@gmail.com",
    "📞 Isaac Media : 418-974-3035",
    "📱 Samuel : 581-744-3026",
    "🌐 https://isaacmedia.ca/"
  ].join(NL);

  return [
    { id: 1, name: "Site web Isaac Media", subject: "Isaac Media", body: siteBody },
    { id: 2, name: "Lien de rencontre", subject: "Lien de la rencontre", body: meetBody }
  ];
}

function cx() {
  return Array.from(arguments).filter(Boolean).join(" ");
}

function money(value) {
  return new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(value || 0);
}

function statusTone(value) {
  const v = String(value || "").toLowerCase();
  if (v.includes("closer") && !v.includes("pas")) return "green";
  if (v.includes("pas")) return "red";
  if (v.includes("recontacter")) return "orange";
  if (v.includes("rendez")) return "purple";
  if (v.includes("proposition")) return "blue";
  return "neutral";
}

function tempTone(value) {
  if (value === "Chaud") return "orange";
  if (value === "Tiède") return "yellow";
  if (value === "Froid") return "blue";
  return "neutral";
}

function Badge({ children, tone }) {
  const t = tone || "neutral";
  const map = {
    green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    red: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
    orange: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
    yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    purple: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
    neutral: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
  };
  return <span className={cx("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", map[t])}>{children}</span>;
}

function Card({ children, className }) {
  return <div className={cx("rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900", className)}>{children}</div>;
}

function Button({ children, onClick, variant, className, type, disabled }) {
  const v = variant || "primary";
  const map = {
    primary: "bg-[#6C5CE7] text-white hover:bg-[#5a4bd3]",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700",
    ghost: "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
    danger: "bg-rose-600 text-white hover:bg-rose-700"
  };
  return <button disabled={disabled} type={type || "button"} onClick={onClick} className={cx("inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50", map[v], className)}>{children}</button>;
}

function Input(props) {
  return <input {...props} className={cx("w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-[#6C5CE7]/20 transition focus:ring-4 dark:border-slate-800 dark:bg-slate-950 dark:text-white", props.className)} />;
}

function Select(props) {
  return <select {...props} className={cx("w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-[#6C5CE7]/20 transition focus:ring-4 dark:border-slate-800 dark:bg-slate-950 dark:text-white", props.className)} />;
}

function Textarea(props) {
  return <textarea {...props} className={cx("w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-[#6C5CE7]/20 transition focus:ring-4 dark:border-slate-800 dark:bg-slate-950 dark:text-white", props.className)} />;
}

function StatCard({ icon, label, value, hint }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{value}</p>
          {hint ? <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{hint}</p> : null}
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-xl text-violet-700 dark:bg-violet-950 dark:text-violet-300">{icon}</div>
      </div>
    </Card>
  );
}

function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("samuel@isaacmedia.ca");
  const [password, setPassword] = useState("motdepasse123");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submit() {
    setLoading(true);
    setMessage("");
    const cleanEmail = email.trim();
    let result;
    if (mode === "signup") {
      result = await supabase.auth.signUp({ email: cleanEmail, password: password });
    } else {
      result = await supabase.auth.signInWithPassword({ email: cleanEmail, password: password });
    }
    setLoading(false);
    if (result.error) {
      setMessage(result.error.message);
      return;
    }
    if (result.data && result.data.session) {
      onAuth(result.data.session.user);
      return;
    }
    setMessage("Compte créé. Tu peux maintenant te connecter.");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4">
        <div className="grid w-full gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-200">✨ Isaac Media CRM</div>
            <h1 className="text-4xl font-black tracking-tight md:text-6xl">Vraie connexion. Vrais leads. Vraie sauvegarde.</h1>
            <p className="mt-5 max-w-xl text-lg text-slate-300">Ton CRM est maintenant branché à Supabase pour sauvegarder tes données.</p>
          </div>
          <Card className="bg-white text-slate-950 dark:bg-slate-900 dark:text-white">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{mode === "signup" ? "Créer ton compte" : "Connexion"}</h2>
              <p className="mt-1 text-sm text-slate-500">Email Auth Supabase activé.</p>
            </div>
            <div className="space-y-3">
              <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button className="w-full" onClick={submit} disabled={loading}>{loading ? "Chargement..." : mode === "signup" ? "Créer le compte" : "Se connecter"}</Button>
              <Button variant="secondary" className="w-full" onClick={() => setMode(mode === "signup" ? "login" : "signup")}>{mode === "signup" ? "J’ai déjà un compte" : "Créer un compte"}</Button>
              {message ? <div className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200">{message}</div> : null}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ active, setActive, dark, setDark, onLogout }) {
  const items = [
    ["dashboard", "📊", "Tableau de bord"],
    ["leads", "👥", "Leads"],
    ["pipeline", "🎯", "Pipeline"],
    ["tasks", "✅", "Suivis"],
    ["emails", "✉️", "Emails"],
    ["appointments", "📅", "Rendez-vous"],
    ["scripts", "✨", "Scripts IA"],
    ["campaigns", "💼", "Campagnes"],
    ["settings", "⚙️", "Paramètres"]
  ];
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 lg:block">
      <div className="mb-6 flex items-center gap-3 rounded-2xl bg-slate-950 p-4 text-white dark:bg-white dark:text-slate-950">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6C5CE7] font-black text-white">IM</div>
        <div><p className="font-black">Isaac Media</p><p className="text-xs opacity-70">CRM acquisition</p></div>
      </div>
      <nav className="space-y-1">
        {items.map((item) => (
          <button key={item[0]} onClick={() => setActive(item[0])} className={cx("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition", active === item[0] ? "bg-[#6C5CE7] text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900")}>
            <span>{item[1]}</span>{item[2]}
          </button>
        ))}
      </nav>
      <div className="absolute bottom-4 left-4 right-4 space-y-2">
        <Button variant="secondary" className="w-full" onClick={() => setDark(!dark)}>{dark ? "☀️ Mode clair" : "🌙 Mode sombre"}</Button>
        <Button variant="ghost" className="w-full" onClick={onLogout}>↩️ Déconnexion</Button>
      </div>
    </aside>
  );
}

function MobileNav({ active, setActive }) {
  const items = [["dashboard", "Tableau de bord"], ["leads", "Leads"], ["pipeline", "Pipeline"], ["tasks", "Suivis"], ["emails", "Emails"], ["appointments", "Rendez-vous"], ["scripts", "Scripts IA"], ["campaigns", "Campagnes"], ["settings", "Paramètres"]];
  return <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 p-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 lg:hidden"><Select value={active} onChange={(e) => setActive(e.target.value)}>{items.map((item) => <option key={item[0]} value={item[0]}>{item[1]}</option>)}</Select></div>;
}

function Dashboard({ leads, tasks, setActive }) {
  const hot = leads.filter((l) => l.temperature === "Chaud").length;
  const warm = leads.filter((l) => l.temperature === "Tiède").length;
  const cold = leads.filter((l) => l.temperature === "Froid").length;
  const forecast = leads.reduce((sum, l) => sum + Number(l.valeurMensuelle || 0), 0);
  const urgent = tasks.filter((t) => t.status !== "Complété").length;
  const niches = Object.entries(leads.reduce((acc, l) => {
    acc[l.niche || "Sans niche"] = (acc[l.niche || "Sans niche"] || 0) + 1;
    return acc;
  }, {}));

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div><h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">Tableau de bord</h1><p className="text-slate-500 dark:text-slate-400">Vue rapide sur l’acquisition, les suivis et le pipeline.</p></div>
        <div className="flex gap-2"><Button onClick={() => setActive("leads")}>＋ Ajouter un lead</Button><Button variant="secondary" onClick={() => setActive("tasks")}>Suivis du jour</Button></div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon="👥" label="Total leads" value={leads.length} hint="Sauvegardés dans Supabase" />
        <StatCard icon="🔥" label="Leads chauds" value={hot} hint={warm + " tièdes · " + cold + " froids"} />
        <StatCard icon="✅" label="Suivis actifs" value={urgent} hint="À faire" />
        <StatCard icon="💰" label="Valeur potentielle" value={money(forecast)} hint="Mensuel estimé" />
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold text-slate-950 dark:text-white">Pipeline rapide</h2><Button variant="ghost" onClick={() => setActive("pipeline")}>Voir pipeline →</Button></div>
          <div className="space-y-3">
            {stages.map((stage) => {
              const count = leads.filter((l) => l.statut === stage).length;
              const value = leads.filter((l) => l.statut === stage).reduce((s, l) => s + l.valeurMensuelle, 0);
              return <div key={stage} className="flex items-center gap-3"><div className="w-36 text-sm font-semibold text-slate-600 dark:text-slate-300">{stage}</div><div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-[#6C5CE7]" style={{ width: Math.min(100, count * 25) + "%" }} /></div><div className="w-28 text-right text-sm text-slate-500">{count} · {money(value)}</div></div>;
            })}
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Niches</h2>
          <div className="mt-4 space-y-3">{niches.map((item) => <div key={item[0]} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-950"><span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item[0]}</span><Badge tone="purple">{item[1]}</Badge></div>)}</div>
        </Card>
      </div>
    </div>
  );
}

function LeadForm({ onClose, onSave, editing }) {
  const [form, setForm] = useState(editing || { entreprise: "", proprietaire: "", contact: "", telephone: "", email: "", site: "", ville: "", region: "", niche: "", services: "", source: "Google", facebook: "Inconnu", instagram: "Inconnu", tiktok: "Inconnu", besoinMarketing: "Fort", temperature: "Tiède", statut: "À contacter", priorite: "Moyenne", budget: "1000+", valeurMensuelle: 1000, dernierContact: "", prochainSuivi: "", notes: "", objection: "", offre: "Acquisition client via réseaux sociaux", interesse: "Peut-être", assigne: "Samuel" });
  function update(key, value) { setForm((f) => ({ ...f, [key]: value })); }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-auto rounded-3xl bg-white p-5 shadow-2xl dark:bg-slate-900">
        <div className="mb-5 flex items-center justify-between"><div><h2 className="text-2xl font-black text-slate-950 dark:text-white">{editing ? "Modifier le lead" : "Ajouter un lead"}</h2><p className="text-sm text-slate-500">Tous les champs importants pour qualifier et closer.</p></div><Button variant="ghost" onClick={onClose}>✕</Button></div>
        <div className="grid gap-3 md:grid-cols-3">
          <Input placeholder="Nom entreprise" value={form.entreprise} onChange={(e) => update("entreprise", e.target.value)} />
          <Input placeholder="Propriétaire / décideur" value={form.proprietaire} onChange={(e) => update("proprietaire", e.target.value)} />
          <Input placeholder="Contact" value={form.contact} onChange={(e) => update("contact", e.target.value)} />
          <Input placeholder="Téléphone" value={form.telephone} onChange={(e) => update("telephone", e.target.value)} />
          <Input placeholder="Email" value={form.email} onChange={(e) => update("email", e.target.value)} />
          <Input placeholder="Site web" value={form.site} onChange={(e) => update("site", e.target.value)} />
          <Input placeholder="Ville" value={form.ville} onChange={(e) => update("ville", e.target.value)} />
          <Input placeholder="Région" value={form.region} onChange={(e) => update("region", e.target.value)} />
          <Input placeholder="Niche" value={form.niche} onChange={(e) => update("niche", e.target.value)} />
          <Select value={form.temperature} onChange={(e) => update("temperature", e.target.value)}>{temperatures.map((x) => <option key={x}>{x}</option>)}</Select>
          <Select value={form.statut} onChange={(e) => update("statut", e.target.value)}>{statuses.map((x) => <option key={x}>{x}</option>)}</Select>
          <Select value={form.priorite} onChange={(e) => update("priorite", e.target.value)}>{["Haute", "Moyenne", "Basse"].map((x) => <option key={x}>{x}</option>)}</Select>
          <Select value={form.besoinMarketing} onChange={(e) => update("besoinMarketing", e.target.value)}>{["Très fort", "Fort", "Moyen", "Faible"].map((x) => <option key={x}>{x}</option>)}</Select>
          <Select value={form.interesse} onChange={(e) => update("interesse", e.target.value)}>{["Oui", "Non", "Peut-être"].map((x) => <option key={x}>{x}</option>)}</Select>
          <Select value={form.assigne} onChange={(e) => update("assigne", e.target.value)}>{["Samuel", "Frère"].map((x) => <option key={x}>{x}</option>)}</Select>
          <Input placeholder="Budget estimé" value={form.budget} onChange={(e) => update("budget", e.target.value)} />
          <Input placeholder="Valeur mensuelle" type="number" value={form.valeurMensuelle} onChange={(e) => update("valeurMensuelle", Number(e.target.value))} />
          <Input type="date" value={form.prochainSuivi || ""} onChange={(e) => update("prochainSuivi", e.target.value)} />
          <Select value={form.facebook} onChange={(e) => update("facebook", e.target.value)}>{["Actif", "Moyen", "Faible", "Inconnu"].map((x) => <option key={x}>{x}</option>)}</Select>
          <Select value={form.instagram} onChange={(e) => update("instagram", e.target.value)}>{["Actif", "Moyen", "Faible", "Inconnu"].map((x) => <option key={x}>{x}</option>)}</Select>
          <Select value={form.tiktok} onChange={(e) => update("tiktok", e.target.value)}>{["Actif", "Moyen", "Faible", "Inconnu"].map((x) => <option key={x}>{x}</option>)}</Select>
          <div className="md:col-span-3"><Textarea rows={2} placeholder="Services offerts" value={form.services} onChange={(e) => update("services", e.target.value)} /></div>
          <div className="md:col-span-3"><Textarea rows={3} placeholder="Notes internes" value={form.notes} onChange={(e) => update("notes", e.target.value)} /></div>
          <Textarea rows={2} placeholder="Objections" value={form.objection} onChange={(e) => update("objection", e.target.value)} />
          <Textarea rows={2} placeholder="Offre proposée" value={form.offre} onChange={(e) => update("offre", e.target.value)} />
          <Input placeholder="Source" value={form.source} onChange={(e) => update("source", e.target.value)} />
        </div>
        <div className="mt-5 flex justify-end gap-2"><Button variant="secondary" onClick={onClose}>Annuler</Button><Button onClick={() => onSave(form)}>Sauvegarder</Button></div>
      </div>
    </div>
  );
}

function LeadDetail({ lead, onClose, onDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-auto rounded-3xl bg-white p-5 shadow-2xl dark:bg-slate-900">
        <div className="mb-5 flex items-start justify-between gap-4"><div><h2 className="text-3xl font-black text-slate-950 dark:text-white">{lead.entreprise}</h2><p className="text-slate-500">{lead.niche} · {lead.ville}</p></div><Button variant="ghost" onClick={onClose}>✕</Button></div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card><h3 className="font-bold text-slate-950 dark:text-white">Contact</h3><div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300"><p>Propriétaire : {lead.proprietaire}</p><p>Téléphone : {lead.telephone}</p><p>Email : {lead.email}</p><p>Site : {lead.site}</p></div></Card>
          <Card><h3 className="font-bold text-slate-950 dark:text-white">Score marketing</h3><div className="mt-3 flex flex-wrap gap-2"><Badge tone="purple">Besoin {lead.besoinMarketing}</Badge><Badge tone={tempTone(lead.temperature)}>{lead.temperature}</Badge><Badge tone={statusTone(lead.statut)}>{lead.statut}</Badge><Badge tone="green">{money(lead.valeurMensuelle)}/mois</Badge></div></Card>
          <Card><h3 className="font-bold text-slate-950 dark:text-white">Réseaux sociaux</h3><div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300"><p>Facebook : {lead.facebook}</p><p>Instagram : {lead.instagram}</p><p>TikTok : {lead.tiktok}</p></div></Card>
          <Card><h3 className="font-bold text-slate-950 dark:text-white">Offre / objections</h3><div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300"><p>Offre : {lead.offre}</p><p>Objection : {lead.objection || "Aucune"}</p></div></Card>
          <Card className="md:col-span-2"><h3 className="font-bold text-slate-950 dark:text-white">Notes</h3><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{lead.notes}</p></Card>
        </div>
        <div className="mt-5 flex justify-end"><Button variant="danger" onClick={() => onDelete(lead.id)}>Supprimer le lead</Button></div>
      </div>
    </div>
  );
}

function Leads({ leads, setLeads, user, refreshLeads }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Tous");
  const [temp, setTemp] = useState("Tous");
  const [followFilter, setFollowFilter] = useState("Tous");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [quick, setQuick] = useState({
    entreprise: "",
    telephone: "",
    email: "",
    ville: "",
    niche: "",
    temperature: "Chaud",
    statut: "À contacter",
    besoinMarketing: "Fort",
    assigne: "Samuel"
  });

  const today = new Date().toISOString().slice(0, 10);

  const filtered = leads.filter((l) => {
    const text = [l.entreprise, l.ville, l.niche, l.proprietaire, l.contact, l.telephone, l.email, l.notes].join(" ").toLowerCase();
    const matchText = text.includes(query.toLowerCase());
    const matchStatus = status === "Tous" || l.statut === status;
    const matchTemp = temp === "Tous" || l.temperature === temp;
    const date = l.prochainSuivi || "";
    const matchFollow = followFilter === "Tous" ||
      (followFilter === "Aujourd’hui" && date === today) ||
      (followFilter === "En retard" && date && date < today) ||
      (followFilter === "Sans suivi" && !date);
    return matchText && matchStatus && matchTemp && matchFollow;
  });

  const hotCount = leads.filter((l) => l.temperature === "Chaud").length;
  const dueTodayCount = leads.filter((l) => l.prochainSuivi === today).length;
  const overdueCount = leads.filter((l) => l.prochainSuivi && l.prochainSuivi < today).length;

  function updateQuick(key, value) {
    setQuick((q) => ({ ...q, [key]: value }));
  }

  async function saveLead(lead) {
    if (!lead.entreprise || !lead.entreprise.trim()) {
      alert("Ajoute au minimum le nom de l’entreprise.");
      return;
    }
    setSaving(true);
    const payload = toDbLead(lead, user.id);
    let response;
    if (lead.id) {
      response = await supabase.from("leads").update(payload).eq("id", lead.id).select().single();
    } else {
      response = await supabase.from("leads").insert(payload).select().single();
    }
    setSaving(false);
    if (response.error) {
      alert(response.error.message);
      return;
    }
    const saved = fromDbLead(response.data);
    setLeads((items) => items.some((x) => x.id === saved.id) ? items.map((x) => x.id === saved.id ? saved : x) : [saved].concat(items));
    setModal(null);
  }

  async function addQuickLead() {
    const payload = {
      entreprise: quick.entreprise,
      telephone: quick.telephone,
      email: quick.email,
      ville: quick.ville,
      niche: quick.niche || "À qualifier",
      temperature: quick.temperature,
      statut: quick.statut,
      besoinMarketing: quick.besoinMarketing,
      assigne: quick.assigne,
      source: "Terrain",
      priorite: "Haute",
      budget: "1000+",
      valeurMensuelle: 1000,
      prochainSuivi: today,
      notes: "Lead ajouté rapidement sur le terrain.",
      offre: "Acquisition client via réseaux sociaux",
      interesse: "Peut-être",
      facebook: "Inconnu",
      instagram: "Inconnu",
      tiktok: "Inconnu"
    };
    await saveLead(payload);
    setQuick({ entreprise: "", telephone: "", email: "", ville: "", niche: "", temperature: "Chaud", statut: "À contacter", besoinMarketing: "Fort", assigne: "Samuel" });
  }

  async function deleteLead(id) {
    const ok = window.confirm("Supprimer ce lead définitivement?");
    if (!ok) return;
    const response = await supabase.from("leads").delete().eq("id", id);
    if (response.error) {
      alert(response.error.message);
      return;
    }
    setLeads((items) => items.filter((x) => x.id !== id));
    setSelected(null);
  }

  async function quickUpdate(lead, changes) {
    const updated = { ...lead, ...changes };
    const payload = toDbLead(updated, user.id);
    const response = await supabase.from("leads").update(payload).eq("id", lead.id).select().single();
    if (response.error) {
      alert(response.error.message);
      return;
    }
    const saved = fromDbLead(response.data);
    setLeads((items) => items.map((x) => x.id === saved.id ? saved : x));
  }

  async function seedDemoLeads() {
    const rows = demoLeads.map((lead) => toDbLead(lead, user.id));
    const response = await supabase.from("leads").insert(rows).select();
    if (response.error) {
      alert(response.error.message);
      return;
    }
    refreshLeads();
  }

  function copyText(text, label) {
    if (!text) {
      alert(label + " vide.");
      return;
    }
    navigator.clipboard.writeText(text);
    alert(label + " copié.");
  }

  function exportCSV() {
    const header = ["Entreprise", "Ville", "Téléphone", "Email", "Site", "Niche", "Statut", "Température", "Besoin marketing", "Valeur mensuelle", "Prochain suivi", "Assigné"];
    const rows = filtered.map((l) => [l.entreprise, l.ville, l.telephone, l.email, l.site, l.niche, l.statut, l.temperature, l.besoinMarketing, l.valeurMensuelle, l.prochainSuivi, l.assigne]);
    const csv = [header].concat(rows).map((r) => r.map((v) => '"' + String(v || "").replaceAll('"', '""') + '"').join(",")).join(NL);
    navigator.clipboard.writeText(csv);
    alert("CSV copié. Tu peux le coller dans Google Sheets.");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-950 dark:text-white">Leads terrain</h1>
          <p className="text-slate-500">Ajout rapide, relances visibles et boutons d’action immédiats.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={exportCSV}>📋 Export Sheets</Button>
          <Button variant="secondary" onClick={seedDemoLeads}>Ajouter leads démo</Button>
          <Button onClick={() => setModal({})}>＋ Formulaire complet</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon="🔥" label="Leads chauds" value={hotCount} hint="À prioriser" />
        <StatCard icon="📅" label="Suivis aujourd’hui" value={dueTodayCount} hint={today} />
        <StatCard icon="⚠️" label="En retard" value={overdueCount} hint="À rattraper" />
      </div>

      <Card className="border-violet-200 bg-violet-50/50 dark:border-violet-900 dark:bg-violet-950/20">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-slate-950 dark:text-white">Ajout rapide terrain</h2>
            <p className="text-sm text-slate-500">Version courte : parfait après un appel ou une visite.</p>
          </div>
          <Badge tone="purple">Sauvegarde Supabase</Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-6">
          <Input className="md:col-span-2" placeholder="Entreprise *" value={quick.entreprise} onChange={(e) => updateQuick("entreprise", e.target.value)} />
          <Input placeholder="Téléphone" value={quick.telephone} onChange={(e) => updateQuick("telephone", e.target.value)} />
          <Input placeholder="Email" value={quick.email} onChange={(e) => updateQuick("email", e.target.value)} />
          <Input placeholder="Ville" value={quick.ville} onChange={(e) => updateQuick("ville", e.target.value)} />
          <Input placeholder="Niche" value={quick.niche} onChange={(e) => updateQuick("niche", e.target.value)} />
          <Select value={quick.temperature} onChange={(e) => updateQuick("temperature", e.target.value)}>{temperatures.map((x) => <option key={x}>{x}</option>)}</Select>
          <Select value={quick.statut} onChange={(e) => updateQuick("statut", e.target.value)}>{statuses.map((x) => <option key={x}>{x}</option>)}</Select>
          <Select value={quick.besoinMarketing} onChange={(e) => updateQuick("besoinMarketing", e.target.value)}>{["Très fort", "Fort", "Moyen", "Faible"].map((x) => <option key={x}>{x}</option>)}</Select>
          <Button className="md:col-span-3" onClick={addQuickLead} disabled={saving}>{saving ? "Sauvegarde..." : "＋ Ajouter rapidement"}</Button>
        </div>
      </Card>

      <Card>
        <div className="grid gap-3 md:grid-cols-5">
          <Input className="md:col-span-2" placeholder="Recherche rapide : entreprise, ville, téléphone, niche..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <Select value={status} onChange={(e) => setStatus(e.target.value)}><option>Tous</option>{statuses.map((s) => <option key={s}>{s}</option>)}</Select>
          <Select value={temp} onChange={(e) => setTemp(e.target.value)}><option>Tous</option>{temperatures.map((t) => <option key={t}>{t}</option>)}</Select>
          <Select value={followFilter} onChange={(e) => setFollowFilter(e.target.value)}>{["Tous", "Aujourd’hui", "En retard", "Sans suivi"].map((x) => <option key={x}>{x}</option>)}</Select>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => { setTemp("Chaud"); setStatus("Tous"); setFollowFilter("Tous"); }}>🔥 Chauds</Button>
          <Button variant="secondary" onClick={() => { setFollowFilter("Aujourd’hui"); setTemp("Tous"); setStatus("Tous"); }}>📅 Aujourd’hui</Button>
          <Button variant="secondary" onClick={() => { setFollowFilter("En retard"); setTemp("Tous"); setStatus("Tous"); }}>⚠️ En retard</Button>
          <Button variant="ghost" onClick={() => { setQuery(""); setStatus("Tous"); setTemp("Tous"); setFollowFilter("Tous"); }}>Réinitialiser</Button>
        </div>
      </Card>

      {leads.length === 0 ? <Card className="text-center"><p className="text-lg font-bold text-slate-950 dark:text-white">Aucun lead pour l’instant.</p><p className="mt-2 text-slate-500">Ajoute ton premier lead ou charge les exemples.</p><div className="mt-4 flex justify-center gap-2"><Button onClick={() => setModal({})}>Ajouter un lead</Button><Button variant="secondary" onClick={seedDemoLeads}>Charger exemples</Button></div></Card> : null}

      <div className="grid gap-4">
        {filtered.map((lead) => (
          <Card key={lead.id} className="hover:border-violet-300">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-black text-slate-950 dark:text-white">{lead.entreprise}</h3>
                  <Badge tone={tempTone(lead.temperature)}>{lead.temperature}</Badge>
                  <Badge tone={statusTone(lead.statut)}>{lead.statut}</Badge>
                  <Badge tone="purple">{lead.besoinMarketing}</Badge>
                  {lead.prochainSuivi ? <Badge tone={lead.prochainSuivi < today ? "red" : lead.prochainSuivi === today ? "orange" : "neutral"}>Suivi {lead.prochainSuivi}</Badge> : <Badge tone="neutral">Sans suivi</Badge>}
                </div>
                <p className="text-sm text-slate-500">{lead.niche || "Sans niche"} · {lead.ville || "Ville inconnue"} · {lead.telephone || "Pas de téléphone"}</p>
                <p className="mt-2 line-clamp-2 text-sm text-slate-700 dark:text-slate-300">{lead.services || lead.notes || "Aucune note."}</p>
              </div>

              <div className="grid gap-2 sm:grid-cols-2 xl:w-[520px] xl:grid-cols-4">
                <a href={lead.telephone ? "tel:" + lead.telephone : undefined} className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-3 py-2 text-sm font-bold text-white hover:bg-emerald-700">📞 Appeler</a>
                <Button variant="secondary" onClick={() => copyText(lead.telephone, "Téléphone")}>Copier tél.</Button>
                <Button variant="secondary" onClick={() => copyText(lead.email, "Email")}>Copier email</Button>
                <Button variant="secondary" onClick={() => setSelected(lead)}>Voir</Button>
                <Select value={lead.statut} onChange={(e) => quickUpdate(lead, { statut: e.target.value })}>{statuses.map((s) => <option key={s}>{s}</option>)}</Select>
                <Select value={lead.temperature} onChange={(e) => quickUpdate(lead, { temperature: e.target.value })}>{temperatures.map((t) => <option key={t}>{t}</option>)}</Select>
                <Input type="date" value={lead.prochainSuivi || ""} onChange={(e) => quickUpdate(lead, { prochainSuivi: e.target.value })} />
                <Button onClick={() => quickUpdate(lead, { statut: "Closer" })}>Closer</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && leads.length > 0 ? <Card className="text-center"><p className="font-bold text-slate-950 dark:text-white">Aucun lead ne correspond aux filtres.</p><Button className="mt-3" variant="secondary" onClick={() => { setQuery(""); setStatus("Tous"); setTemp("Tous"); setFollowFilter("Tous"); }}>Réinitialiser les filtres</Button></Card> : null}

      {modal ? <LeadForm editing={modal.id ? modal : null} onClose={() => setModal(null)} onSave={saveLead} /> : null}
      {selected ? <LeadDetail lead={selected} onClose={() => setSelected(null)} onDelete={deleteLead} /> : null}
      {saving ? <div className="fixed bottom-4 right-4 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-lg">Sauvegarde...</div> : null}
    </div>
  );
}

function Pipeline({ leads, setLeads, user }) {
  async function updateStage(lead, statut) {
    const payload = toDbLead({ ...lead, statut: statut }, user.id);
    const response = await supabase.from("leads").update(payload).eq("id", lead.id).select().single();
    if (response.error) {
      alert(response.error.message);
      return;
    }
    const saved = fromDbLead(response.data);
    setLeads((items) => items.map((x) => x.id === saved.id ? saved : x));
  }

  return <div className="space-y-6"><div><h1 className="text-3xl font-black text-slate-950 dark:text-white">Pipeline</h1><p className="text-slate-500">Les changements de statut sont sauvegardés dans Supabase.</p></div><div className="grid gap-4 xl:grid-cols-3 2xl:grid-cols-4">{stages.map((stage) => { const stageLeads = leads.filter((l) => l.statut === stage); const total = stageLeads.reduce((sum, l) => sum + l.valeurMensuelle, 0); return <Card key={stage} className="min-h-64"><div className="mb-4 flex items-center justify-between"><div><h2 className="font-black text-slate-950 dark:text-white">{stage}</h2><p className="text-xs text-slate-500">{money(total)}/mois</p></div><Badge tone={statusTone(stage)}>{stageLeads.length}</Badge></div><div className="space-y-3">{stageLeads.map((lead) => <div key={lead.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950"><p className="font-bold text-slate-950 dark:text-white">{lead.entreprise}</p><p className="text-xs text-slate-500">{lead.niche} · {money(lead.valeurMensuelle)}/mois</p><Select className="mt-3" value={lead.statut} onChange={(e) => updateStage(lead, e.target.value)}>{stages.map((s) => <option key={s}>{s}</option>)}</Select></div>)}</div></Card>; })}</div></div>;
}

function Tasks({ tasks, setTasks, leads, user }) {
  const [title, setTitle] = useState("");
  const [leadId, setLeadId] = useState(leads[0] ? leads[0].id : "");
  const [due, setDue] = useState("2026-05-03");
  const [saving, setSaving] = useState(false);

  async function addTask() {
    if (!title.trim()) return;
    setSaving(true);
    const payload = toDbTask({ title: title, leadId: leadId, due: due, type: "Relance", priority: "Moyenne", status: "À faire", assigned: "Samuel" }, user.id);
    const response = await supabase.from("tasks").insert(payload).select().single();
    setSaving(false);
    if (response.error) {
      alert(response.error.message);
      return;
    }
    setTasks((items) => [fromDbTask(response.data)].concat(items));
    setTitle("");
  }

  async function toggleTask(task) {
    const nextStatus = task.status === "Complété" ? "À faire" : "Complété";
    const response = await supabase.from("tasks").update({ status: nextStatus }).eq("id", task.id).select().single();
    if (response.error) {
      alert(response.error.message);
      return;
    }
    setTasks((items) => items.map((x) => x.id === task.id ? fromDbTask(response.data) : x));
  }

  async function deleteTask(taskId) {
    const ok = window.confirm("Supprimer ce suivi?");
    if (!ok) return;
    const response = await supabase.from("tasks").delete().eq("id", taskId);
    if (response.error) {
      alert(response.error.message);
      return;
    }
    setTasks((items) => items.filter((x) => x.id !== taskId));
  }

  return <div className="space-y-6"><div><h1 className="text-3xl font-black text-slate-950 dark:text-white">Suivis</h1><p className="text-slate-500">Sauvegarde active dans Supabase.</p></div><Card><div className="grid gap-3 md:grid-cols-4"><Input placeholder="Nouvelle tâche" value={title} onChange={(e) => setTitle(e.target.value)} /><Select value={leadId} onChange={(e) => setLeadId(e.target.value)}>{leads.map((l) => <option key={l.id} value={l.id}>{l.entreprise}</option>)}</Select><Input type="date" value={due} onChange={(e) => setDue(e.target.value)} /><Button onClick={addTask} disabled={saving}>{saving ? "Sauvegarde..." : "＋ Ajouter"}</Button></div></Card><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{tasks.map((task) => { const lead = leads.find((l) => l.id === task.leadId); return <Card key={task.id}><div className="flex items-start justify-between gap-3"><div><h3 className="font-black text-slate-950 dark:text-white">{task.title}</h3><p className="text-sm text-slate-500">{lead ? lead.entreprise : "Sans lead"}</p></div><Badge tone={task.priority === "Haute" ? "orange" : "neutral"}>{task.priority}</Badge></div><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Type : {task.type} · Échéance : {task.due || "Aucune"}</p><div className="mt-4 flex gap-2"><Button className="flex-1" variant={task.status === "Complété" ? "secondary" : "primary"} onClick={() => toggleTask(task)}>{task.status === "Complété" ? "Réouvrir" : "Marquer complété"}</Button><Button variant="danger" onClick={() => deleteTask(task.id)}>Supprimer</Button></div></Card>; })}</div></div>;
}

function Emails({ leads }) {
  const templates = getEmailTemplates();
  const [templateId, setTemplateId] = useState(1);
  const [leadId, setLeadId] = useState(leads[0] ? leads[0].id : "");
  const selectedTemplate = templates.find((t) => t.id === Number(templateId)) || templates[0];
  const lead = leads.find((l) => l.id === leadId);
  const body = selectedTemplate.body.replaceAll("{{date_heure}}", "[date et heure]").replaceAll("{{lien_google_meet}}", "[lien Google Meet]");
  function copy() { navigator.clipboard.writeText("Objet : " + selectedTemplate.subject + NL + NL + body); alert("Email copié."); }
  return <div className="space-y-6"><div><h1 className="text-3xl font-black text-slate-950 dark:text-white">Emails</h1><p className="text-slate-500">Templates courts, propres et prêts à copier.</p></div><div className="grid gap-4 lg:grid-cols-3"><Card><h2 className="mb-4 font-black text-slate-950 dark:text-white">Préparer un email</h2><div className="space-y-3"><Select value={templateId} onChange={(e) => setTemplateId(e.target.value)}>{templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}</Select><Select value={leadId} onChange={(e) => setLeadId(e.target.value)}>{leads.map((l) => <option key={l.id} value={l.id}>{l.entreprise}</option>)}</Select><Button className="w-full" onClick={copy}>📋 Copier l’email</Button></div></Card><Card className="lg:col-span-2"><div className="mb-4"><Badge tone="purple">À : {lead ? lead.email : "email du lead"}</Badge></div><p className="font-bold text-slate-950 dark:text-white">Objet : {selectedTemplate.subject}</p><pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-950 dark:text-slate-300">{body}</pre></Card></div></div>;
}

function Appointments({ appointments, setAppointments, leads, user }) {
  const [leadId, setLeadId] = useState(leads[0] ? leads[0].id : "");
  const [date, setDate] = useState("2026-05-04");
  const [time, setTime] = useState("10:00");
  const [meet, setMeet] = useState("");
  const [saving, setSaving] = useState(false);

  async function add() {
    setSaving(true);
    const payload = toDbAppointment({ leadId: leadId, title: "Rencontre découverte", date: date, time: time, duration: 30, meet: meet, status: "Prévu" }, user.id);
    const response = await supabase.from("appointments").insert(payload).select().single();
    setSaving(false);
    if (response.error) {
      alert(response.error.message);
      return;
    }
    setAppointments((items) => [fromDbAppointment(response.data)].concat(items));
    setMeet("");
  }

  async function deleteAppointment(id) {
    const ok = window.confirm("Supprimer ce rendez-vous?");
    if (!ok) return;
    const response = await supabase.from("appointments").delete().eq("id", id);
    if (response.error) {
      alert(response.error.message);
      return;
    }
    setAppointments((items) => items.filter((x) => x.id !== id));
  }

  return <div className="space-y-6"><div><h1 className="text-3xl font-black text-slate-950 dark:text-white">Rendez-vous</h1><p className="text-slate-500">Sauvegarde active dans Supabase.</p></div><Card><div className="grid gap-3 md:grid-cols-5"><Select value={leadId} onChange={(e) => setLeadId(e.target.value)}>{leads.map((l) => <option key={l.id} value={l.id}>{l.entreprise}</option>)}</Select><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /><Input type="time" value={time} onChange={(e) => setTime(e.target.value)} /><Input placeholder="Lien Google Meet" value={meet} onChange={(e) => setMeet(e.target.value)} /><Button onClick={add} disabled={saving}>{saving ? "Sauvegarde..." : "＋ Ajouter"}</Button></div></Card><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{appointments.map((a) => { const lead = leads.find((l) => l.id === a.leadId); return <Card key={a.id}><Badge tone="purple">{a.status}</Badge><h3 className="mt-3 font-black text-slate-950 dark:text-white">{a.title}</h3><p className="text-sm text-slate-500">{lead ? lead.entreprise : "Sans lead"}</p><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{a.date} à {a.time} · {a.duration} min</p><div className="mt-4 flex gap-2"><Button className="flex-1" variant="secondary" onClick={() => navigator.clipboard.writeText(a.meet || "")}>Copier Meet</Button><Button variant="danger" onClick={() => deleteAppointment(a.id)}>Supprimer</Button></div></Card>; })}</div></div>;
}

function Scripts() {
  const [niche, setNiche] = useState("Centre esthétique automobile");
  const [canal, setCanal] = useState("Téléphone");
  const [tone, setTone] = useState("Direct");
  const script = useMemo(() => {
    return {
      Hook: "Salut, je t’appelle rapidement parce que j’ai vu que vous êtes dans la niche " + niche + ", puis je pense qu’il y a une opportunité de vous amener plus de demandes qualifiées.",
      Pitch: "Chez Isaac Media, on aide les entreprises locales à améliorer leur présence en ligne et à attirer plus de clients avec une approche simple, directe et mesurable.",
      Question: "Aujourd’hui, c’est quoi le service le plus payant que vous aimeriez vendre plus souvent?",
      Objection: "Je comprends. Justement, l’idée n’est pas de vous vendre de la pub compliquée, c’est de voir si on peut vous amener des demandes pour vos jobs les plus rentables.",
      CTA: "Est-ce que ça ferait du sens de prendre 10-15 minutes pour voir si on peut vous aider concrètement?"
    };
  }, [niche, canal, tone]);
  function copyScript() { const text = Object.entries(script).map((pair) => pair[0] + ": " + pair[1]).join(NL + NL); navigator.clipboard.writeText(text); alert("Script copié."); }
  return <div className="space-y-6"><div><h1 className="text-3xl font-black text-slate-950 dark:text-white">Scripts IA</h1><p className="text-slate-500">Générateur de scripts simple pour prospection.</p></div><div className="grid gap-4 lg:grid-cols-3"><Card><div className="space-y-3"><Select value={niche} onChange={(e) => setNiche(e.target.value)}>{["Centre esthétique automobile", "Débosselage / carrosserie", "Réparation de pare-brise", "Vente de pneus", "Tuning automobile", "Entreprise locale hors automobile"].map((x) => <option key={x}>{x}</option>)}</Select><Select value={canal} onChange={(e) => setCanal(e.target.value)}>{["Téléphone", "Porte-à-porte", "Email", "DM Facebook", "DM Instagram"].map((x) => <option key={x}>{x}</option>)}</Select><Select value={tone} onChange={(e) => setTone(e.target.value)}>{["Professionnel", "Direct", "Québécois", "Humoristique", "Premium"].map((x) => <option key={x}>{x}</option>)}</Select></div></Card><Card className="lg:col-span-2">{Object.entries(script).map((pair) => <div key={pair[0]} className="mb-4"><Badge tone="purple">{pair[0]}</Badge><p className="mt-2 text-slate-700 dark:text-slate-300">{pair[1]}</p></div>)}<Button variant="secondary" onClick={copyScript}>📋 Copier script</Button></Card></div></div>;
}

function Campaigns({ campaigns, setCampaigns, leads, user }) {
  async function addCampaign() {
    const payload = toDbCampaign({ leadId: leads[0] ? leads[0].id : null, name: "Nouvelle campagne", objective: "Leads", budget: 500, fee: 1000, status: "Idée", leads: 0, appointments: 0, closes: 0 }, user.id);
    const response = await supabase.from("campaigns").insert(payload).select().single();
    if (response.error) {
      alert(response.error.message);
      return;
    }
    setCampaigns((items) => [fromDbCampaign(response.data)].concat(items));
  }

  async function deleteCampaign(id) {
    const ok = window.confirm("Supprimer cette campagne?");
    if (!ok) return;
    const response = await supabase.from("campaigns").delete().eq("id", id);
    if (response.error) {
      alert(response.error.message);
      return;
    }
    setCampaigns((items) => items.filter((x) => x.id !== id));
  }

  return <div className="space-y-6"><div><h1 className="text-3xl font-black text-slate-950 dark:text-white">Campagnes</h1><p className="text-slate-500">Sauvegarde active dans Supabase.</p></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{campaigns.map((c) => { const lead = leads.find((l) => l.id === c.leadId); return <Card key={c.id}><Badge tone="purple">{c.status}</Badge><h3 className="mt-3 font-black text-slate-950 dark:text-white">{c.name}</h3><p className="text-sm text-slate-500">{lead ? lead.entreprise : "Sans lead"}</p><div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300"><p>Budget<br /><b>{money(c.budget)}</b></p><p>Service fee<br /><b>{money(c.fee)}</b></p><p>Leads<br /><b>{c.leads}</b></p><p>RDV<br /><b>{c.appointments}</b></p></div><Button className="mt-4 w-full" variant="danger" onClick={() => deleteCampaign(c.id)}>Supprimer</Button></Card>; })}<Card className="flex min-h-48 items-center justify-center border-dashed"><Button onClick={addCampaign}>＋ Ajouter campagne</Button></Card></div></div>;
}

function SettingsPage({ role, setRole, user }) {
  return <div className="space-y-6"><div><h1 className="text-3xl font-black text-slate-950 dark:text-white">Paramètres</h1><p className="text-slate-500">Configuration Isaac Media CRM.</p></div><div className="grid gap-4 lg:grid-cols-2"><Card><h2 className="font-black text-slate-950 dark:text-white">Entreprise</h2><div className="mt-4 space-y-3"><Input defaultValue="Isaac Media" /><Input defaultValue="https://isaacmedia.ca/" /><Input defaultValue="isaacpaidads@gmail.com" /><Input defaultValue="418-974-3035" /><Input defaultValue="581-744-3026" /></div></Card><Card><h2 className="font-black text-slate-950 dark:text-white">Utilisateur</h2><div className="mt-4 space-y-3"><Input value={user ? user.email : ""} readOnly /><Select value={role} onChange={(e) => setRole(e.target.value)}>{["Admin", "Partner", "Viewer"].map((r) => <option key={r}>{r}</option>)}</Select><div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-950 dark:text-slate-300">Admin = accès complet. Partner = gestion opérationnelle. Viewer = lecture seule.</div></div></Card><Card className="lg:col-span-2"><h2 className="font-black text-slate-950 dark:text-white">Automatisations à connecter plus tard</h2><div className="mt-4 grid gap-3 md:grid-cols-3">{["Rappel de suivi", "Email automatique", "Google Calendar", "Google Sheets export", "Notification lead chaud", "Génération message"].map((a) => <div key={a} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"><p className="font-bold text-slate-950 dark:text-white">{a}</p><Badge tone="neutral">À connecter plus tard</Badge></div>)}</div></Card></div></div>;
}

export default function App() {
  const [booting, setBooting] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("Admin");
  const [active, setActive] = useState("dashboard");
  const [dark, setDark] = useState(false);
  const [leads, setLeads] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const currentUser = data && data.session ? data.session.user : null;
      setUser(currentUser);
      setBooting(false);
    });
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session ? session.user : null);
    });
    return () => subscription.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      loadLeads();
      loadTasks();
      loadAppointments();
      loadCampaigns();
    } else {
      setLeads([]);
      setTasks([]);
      setAppointments([]);
      setCampaigns([]);
    }
  }, [user]);

  async function loadLeads() {
    setLoadingLeads(true);
    const response = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    setLoadingLeads(false);
    if (response.error) {
      alert(response.error.message);
      return;
    }
    setLeads((response.data || []).map(fromDbLead));
  }

  async function loadTasks() {
    const response = await supabase.from("tasks").select("*").order("created_at", { ascending: false });
    if (response.error) {
      alert(response.error.message);
      return;
    }
    setTasks((response.data || []).map(fromDbTask));
  }

  async function loadAppointments() {
    const response = await supabase.from("appointments").select("*").order("created_at", { ascending: false });
    if (response.error) {
      alert(response.error.message);
      return;
    }
    setAppointments((response.data || []).map(fromDbAppointment));
  }

  async function loadCampaigns() {
    const response = await supabase.from("campaigns").select("*").order("created_at", { ascending: false });
    if (response.error) {
      alert(response.error.message);
      return;
    }
    setCampaigns((response.data || []).map(fromDbCampaign));
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setLeads([]);
    setActive("dashboard");
  }

  if (booting) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">Chargement Isaac Media CRM...</div>;
  }

  if (!user) {
    return <AuthScreen onAuth={setUser} />;
  }

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
        <Sidebar active={active} setActive={setActive} dark={dark} setDark={setDark} onLogout={logout} />
        <div className="lg:pl-72">
          <MobileNav active={active} setActive={setActive} />
          <header className="border-b border-slate-200 bg-white/70 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 md:px-8">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6C5CE7] font-black text-white lg:hidden">IM</div>
                <div><p className="text-sm text-slate-500">Connecté comme</p><p className="font-bold">{user.email} · {role}</p></div>
              </div>
              <Badge tone="purple">Supabase connecté</Badge>
            </div>
          </header>
          <main className="p-4 md:p-8">
            {loadingLeads ? <Card className="mb-6">Chargement des leads Supabase...</Card> : null}
            {active === "dashboard" ? <Dashboard leads={leads} tasks={tasks} setActive={setActive} /> : null}
            {active === "leads" ? <Leads leads={leads} setLeads={setLeads} user={user} refreshLeads={loadLeads} /> : null}
            {active === "pipeline" ? <Pipeline leads={leads} setLeads={setLeads} user={user} /> : null}
            {active === "tasks" ? <Tasks tasks={tasks} setTasks={setTasks} leads={leads} user={user} /> : null}
            {active === "emails" ? <Emails leads={leads} /> : null}
            {active === "appointments" ? <Appointments appointments={appointments} setAppointments={setAppointments} leads={leads} user={user} /> : null}
            {active === "scripts" ? <Scripts /> : null}
            {active === "campaigns" ? <Campaigns campaigns={campaigns} setCampaigns={setCampaigns} leads={leads} user={user} /> : null}
            {active === "settings" ? <SettingsPage role={role} setRole={setRole} user={user} /> : null}
          </main>
        </div>
      </div>
    </div>
  );
}
