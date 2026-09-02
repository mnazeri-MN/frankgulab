import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

const PUB_SUMMARIES: Record<number, string> = {
  1: "A robot that designs its own experiments: RAISE mixes surfactant formulations, photographs the droplets, measures how they wet a surface, and asks AI what to try next—automatically. It hits precise wettability targets for medical devices, coatings, or textiles while minimizing surfactant use and cost, running at roughly one measurement per minute.",
  2: "Lab robots typically only move liquids—they can't watch what's happening as they work. This 3D-printed adapter clamps a USB camera alongside an Opentrons pipette, letting the same robot both dispense and image samples in real time. A single machine can now capture soft materials—like gelling hydrogels—forming during preparation.",
  3: "Transplanting healthy mitochondria into damaged cells could treat organ failure, but getting from lab to clinic is hard. This working group review maps three specific obstacles—storing mitochondria, delivering them into cells, and building realistic tissue test models—then proposes concrete steps to close the gap and advance toward clinical trials.",
  4: "Making hyaluronic acid into a gel—used widely in medicine and cosmetics—normally requires chemical reactions that add complexity and potential safety concerns. This work shows ordinary metal ions like magnesium can crosslink it into tunable, self-healing hydrogels without any chemical modification, streamlining how this class of biomaterial is made.",
  5: "Oil sands tailings ponds are toxic to fish, but the culprit isn't necessarily what researchers assumed. Fish toxicity was eliminated within two days of sunlight exposure using floating photocatalysts—well before naphthenic acids were significantly degraded. Something else is the primary toxicant, and solar treatment reliably neutralizes it first.",
  6: "Selenium is both a serious water pollutant and a commercially valuable element used in solar cells, electronics, and agriculture. Industrial water treatment produces selenium-laden sludge usually discarded as waste. This review argues industry should recover and sell it instead—selenium has an unstable global supply, and wastewater could become a reliable secondary source.",
  7: "Before you can train a machine learning model for a polymer, you need to convert its structure into numbers. This paper benchmarks those numerical representations for polymeric biomaterials and introduces graph-based embeddings built from polymer sub-units—showing which approaches work best and why the method scales to any countable chemical space.",
  8: "Understanding why certain polymers bind proteins is critical for drug delivery design, but the mechanisms are mostly a black box. This framework applies machine learning to DISCO NMR data to identify which atomic groups on a polymer drive binding—making the interaction predictable and giving chemists clear targets for design.",
  9: "Naphthenic acids in oil sands wastewater kill the bacteria used for biological cleanup, blocking remediation. Brief photocatalytic pre-treatment at low doses partially oxidizes the acids, reducing their toxicity enough for bacteria to take over. Combined, the two-stage approach removes far more than either light or biological treatment alone.",
  10: "Delivering drugs through the lungs, gut, or other mucosal surfaces means getting them through a sticky mucus barrier first. This review maps the two main nanoparticle strategies—sticking to mucus for slow release, or slipping through it for direct uptake—and explains why most approaches work in animals but haven't crossed into clinical use.",
  11: "Drugs designed to stick to mucosal surfaces rely on polymers binding mucin, but the rules governing that binding were unclear. Using NMR, this work shows how a polymer's backbone type, chain length, and chemical groups each independently control mucin binding strength—providing design rules to predict and tune mucoadhesion.",
  15: "During selenium removal from mining wastewater, TiO2 photocatalysts accumulate selenium on their surface, forming a heterojunction that actually improves performance. The catalyst maintained more than 99.3% selenium removal across 15 consecutive treatment cycles without cleaning or regeneration—demonstrating practical reusability that matters for industrial-scale water treatment deployment.",
  16: "When gold or silver nanoparticles are embedded in hydrogels, the composite can respond to light, heat, or magnetic fields—enabling targeted drug release, accelerated wound healing, and real-time diagnostics in one material. This review organizes a decade of progress in designing these hybrid systems across prevention, diagnosis, and treatment.",
}

const NEWS_SUMMARIES: Record<number, string> = {
  1: "Unilever and UofT's Acceleration Consortium are using a self-driving lab to develop personal care formulations—body washes, lotions, and creams built from submicron emulsions that are exquisitely sensitive to composition. AI navigates this complex ingredient space faster and more systematically than human trial-and-error, cutting development time while improving product consistency.",
  2: "The Acceleration Consortium and Unilever are applying self-driving lab technology to cosmetics formulation: AI directs a robot through thousands of ingredient combinations to find optimal emulsion recipes for personal care products. The partnership shows how tools built for materials discovery can slash development time in an industry historically run on chemist intuition.",
  3: "A $23.8 million federal grant will fund a UofT-led team to develop mitochondrial transplantation—injecting healthy mitochondria into damaged cells to restore energy production rather than just managing symptoms. The funding covers safety validation, hospital partnerships, and preparation for clinical trials across organ failure, inflammation, and degenerative disease.",
  4: "The Acceleration Consortium launched RAISE, a self-driving lab that autonomously discovers liquid formulations controlling how surfaces wet. The system mixes ingredients, images droplets, measures contact angles, and plans its own next experiment using Bayesian optimization—cutting the time and cost of developing coatings for medical devices, textiles, and industrial applications.",
}

export async function GET() {
  const payload = await getPayload({ config })
  const results: Record<string, unknown> = {}

  for (const [idStr, summary] of Object.entries(PUB_SUMMARIES)) {
    const id = Number(idStr)
    await payload.update({ collection: "publications", id, data: { summary } })
    results[`pub_${id}`] = "ok"
  }

  for (const [idStr, summary] of Object.entries(NEWS_SUMMARIES)) {
    const id = Number(idStr)
    await payload.update({ collection: "news", id, data: { summary } })
    results[`news_${id}`] = "ok"
  }

  return NextResponse.json({ ok: true, results })
}
