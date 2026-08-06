import { getSiteSettings } from "@/lib/site-settings"
import { NavbarInner } from "./navbar-inner"

export async function Navbar() {
  const s = await getSiteSettings()
  return (
    <NavbarInner
      s={{ logoUrl: s.logoUrl, labName: s.labName, piName: s.piName, institution: s.institution }}
    />
  )
}
