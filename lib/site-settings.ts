import { getPayload } from "payload"
import config from "@payload-config"

export type SiteSettingsData = {
  logoUrl: string | null
  labName: string
  piName: string
  institution: string
  department: string
  address: string
  contactEmail: string
  missionStatement: string
  heroSubtitle: string
  linkedIn: string
  googleScholar: string
  footerTagline: string
  affiliates: { name: string; url: string }[]
  contactPhotoUrl: string | null
  contactPhotoAlt: string | null
}

const DEFAULTS: SiteSettingsData = {
  logoUrl: null,
  labName: "The Mixture Lab",
  piName: "Frank Gu",
  institution: "University of Toronto",
  department: "Department of Chemical Engineering & Applied Chemistry",
  address: "Toronto, Ontario, Canada",
  contactEmail: "f.gu@utoronto.ca",
  missionStatement: "We build the labs that will discover tomorrow's formulations, today.",
  heroSubtitle:
    "Automation, robotics, and machine learning applied to formulation science, electrochemistry, and advanced materials research.",
  linkedIn: "https://linkedin.com/company/frank-gu-lab",
  googleScholar: "https://scholar.google.ca/citations?user=nZYyToUAAAAJ&hl=en",
  footerTagline: "Funded by NSERC and CIHR.",
  affiliates: [
    { name: "University of Toronto", url: "https://www.utoronto.ca" },
    { name: "Chemical Engineering & Applied Chemistry", url: "https://www.chem-eng.utoronto.ca" },
    { name: "Acceleration Consortium", url: "https://acceleration.utoronto.ca" },
  ],
  contactPhotoUrl: null,
  contactPhotoAlt: null,
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const payload = await getPayload({ config })
  const s = await payload.findGlobal({ slug: "site-settings" }) as Record<string, unknown>

  const logo = s.logo && typeof s.logo === "object" ? s.logo as { url?: string } : null
  const contactPhoto =
    s.contactPhoto && typeof s.contactPhoto === "object"
      ? (s.contactPhoto as { url?: string; alt?: string })
      : null

  const affiliatesRaw = Array.isArray(s.affiliates) ? s.affiliates as { name?: string; url?: string }[] : []

  return {
    logoUrl: logo?.url ?? DEFAULTS.logoUrl,
    labName: (s.labName as string) || DEFAULTS.labName,
    piName: (s.piName as string) || DEFAULTS.piName,
    institution: (s.institution as string) || DEFAULTS.institution,
    department: (s.department as string) || DEFAULTS.department,
    address: (s.address as string) || DEFAULTS.address,
    contactEmail: (s.contactEmail as string) || DEFAULTS.contactEmail,
    missionStatement: (s.missionStatement as string) || DEFAULTS.missionStatement,
    heroSubtitle: (s.heroSubtitle as string) || DEFAULTS.heroSubtitle,
    linkedIn: (s.linkedIn as string) || DEFAULTS.linkedIn,
    googleScholar: (s.googleScholar as string) || DEFAULTS.googleScholar,
    footerTagline: (s.footerTagline as string) || DEFAULTS.footerTagline,
    affiliates:
      affiliatesRaw.length > 0
        ? affiliatesRaw.map((a) => ({ name: a.name ?? "", url: a.url ?? "" }))
        : DEFAULTS.affiliates,
    contactPhotoUrl: contactPhoto?.url ?? DEFAULTS.contactPhotoUrl,
    contactPhotoAlt: contactPhoto?.alt ?? DEFAULTS.contactPhotoAlt,
  }
}
