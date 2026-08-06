import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export async function GET() {
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      labName: "The Mixture Lab",
      piName: "Frank Gu",
      institution: "University of Toronto",
      department: "Department of Chemical Engineering & Applied Chemistry",
      address: "Toronto, Ontario, Canada",
      contactEmail: "f.gu@utoronto.ca",
      missionStatement: "We build the labs that will discover tomorrow's formulations, today.",
      heroSubtitle: "Automation, robotics, and machine learning applied to formulation science, electrochemistry, and advanced materials research.",
      linkedIn: "https://linkedin.com/company/frank-gu-lab",
      googleScholar: "https://scholar.google.ca/citations?user=nZYyToUAAAAJ&hl=en",
      footerTagline: "Funded by NSERC and CIHR.",
      affiliates: [
        { name: "University of Toronto",                    url: "https://www.utoronto.ca" },
        { name: "Chemical Engineering & Applied Chemistry", url: "https://www.chem-eng.utoronto.ca" },
        { name: "Acceleration Consortium",                  url: "https://acceleration.utoronto.ca" },
      ],
    },
  })

  const result = await payload.findGlobal({ slug: "site-settings" })
  return NextResponse.json({ ok: true, labName: result.labName, piName: result.piName, footerTagline: result.footerTagline })
}
