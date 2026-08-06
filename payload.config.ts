import path from "path"
import { fileURLToPath } from "url"
import { buildConfig } from "payload"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: "users",
  },

  collections: [
    {
      slug: "users",
      auth: true,
      admin: { useAsTitle: "email" },
      fields: [
        { name: "name", type: "text" },
      ],
    },

    {
      slug: "media",
      access: {
        read: () => true,
      },
      upload: {
        staticDir: path.resolve(dirname, "public/uploads"),
        imageSizes: [
          { name: "card", width: 800, height: undefined, position: "centre" },
          { name: "thumb", width: 400, height: 400, position: "centre" },
        ],
      },
      fields: [
        { name: "alt", type: "text", required: true },
      ],
    },

    {
      slug: "people",
      admin: { useAsTitle: "preferredFirstName", defaultColumns: ["preferredFirstName", "lastInitial", "role"] },
      fields: [
        {
          name: "title",
          type: "select",
          label: "Title",
          options: [
            { label: "(none)", value: "" },
            { label: "Dr.", value: "Dr." },
            { label: "Prof.", value: "Prof." },
          ],
        },
        { name: "preferredFirstName", type: "text", required: true, label: "Preferred First Name" },
        {
          name: "lastInitial",
          type: "text",
          required: true,
          label: "Last Initial",
          validate: (value: string | null | undefined) => {
            if (!value) return "Required"
            if (!/^[A-Za-z]$/.test(value)) return "Must be a single letter (A–Z)"
            return true
          },
          admin: { description: "First letter of last name only, e.g. G" },
        },
        {
          name: "role",
          type: "select",
          required: true,
          options: [
            { label: "Principal Investigator", value: "Principal Investigator" },
            { label: "Postdoctoral Fellow", value: "Postdoctoral Fellow" },
            { label: "PhD Candidate", value: "PhD Candidate" },
            { label: "MASc Student", value: "MASc Student" },
            { label: "MEng Student", value: "MEng Student" },
            { label: "Undergraduate Researcher", value: "Undergraduate Researcher" },
            { label: "Research Associate", value: "Research Associate" },
            { label: "Lab Manager", value: "Lab Manager" },
            { label: "Visiting Scholar", value: "Visiting Scholar" },
          ],
        },
        { name: "email", type: "email" },
        {
          name: "googleScholar",
          type: "text",
          label: "Google Scholar URL",
          validate: (value: string | null | undefined) => {
            if (!value) return true
            if (!value.startsWith("https://scholar.google.ca/citations?user="))
              return 'Must start with "https://scholar.google.ca/citations?user="'
            return true
          },
          admin: {
            components: {
              Field: "@/components/payload/prefixed-url-field#ScholarField",
            },
          },
        },
        {
          name: "linkedin",
          type: "text",
          label: "LinkedIn URL",
          validate: (value: string | null | undefined) => {
            if (!value) return true
            if (!value.startsWith("https://linkedin.com/in/"))
              return 'Must start with "https://linkedin.com/in/"'
            return true
          },
          admin: {
            components: {
              Field: "@/components/payload/prefixed-url-field#LinkedInField",
            },
          },
        },
        { name: "photo", type: "upload", relationTo: "media" },
        {
          name: "startDate",
          type: "date",
          label: "Start Date",
          admin: { description: "When this person joined the lab. Leave blank to show immediately." },
        },
        {
          name: "endDate",
          type: "date",
          label: "End Date",
          admin: { description: "When this person leaves the lab. Leave blank for permanent members (e.g. Frank)." },
        },
      ],
    },

    {
      slug: "publications",
      admin: { useAsTitle: "title", defaultColumns: ["firstAuthor", "title", "year"] },
      fields: [
        {
          name: "doi",
          type: "text",
          label: "DOI",
          admin: {
            components: {
              Field: "@/components/payload/doi-field#DoiField",
            },
          },
        },
        { name: "title", type: "text", required: true, admin: { description: "Auto-filled from DOI — edit if needed" } },
        { name: "firstAuthor", type: "text", label: "First Author", admin: { description: "Auto-filled from DOI — edit if needed (e.g. F. Gu et al.)" } },
        { name: "year", type: "number", required: true, admin: { description: "Auto-filled from DOI" } },
        { name: "href", type: "text", label: "Publication URL", admin: { description: "Auto-filled from DOI" } },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Cover Image",
          admin: { description: "Upload an image to override the one fetched from the DOI URL" },
        },
        { name: "fetchedImageUrl", type: "text", admin: { hidden: true } },
      ],
    },

    {
      slug: "projects",
      admin: { useAsTitle: "title", defaultColumns: ["title", "tag", "order"] },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true, admin: { description: "Max 30 words. One punchy sentence summarising the research area." } },
        { name: "tag", type: "text", required: true, label: "Category Tag" },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Cover Image",
        },
        {
          name: "order",
          type: "number",
          defaultValue: 99,
          admin: { description: "Display order (lower = first)" },
        },
      ],
    },


    {
      slug: "hero-slides",
      admin: { useAsTitle: "name", defaultColumns: ["name", "tagline", "order"] },
      fields: [
        { name: "name", type: "text", required: true, label: "Name / Title" },
        { name: "tagline", type: "text", required: true },
        { name: "image", type: "upload", relationTo: "media", required: true },
        {
          name: "order",
          type: "number",
          defaultValue: 99,
          admin: { description: "Display order (lower = first)" },
        },
      ],
    },

    {
      slug: "news",
      admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "source", "date"],
      },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "source", type: "text", required: true, label: "Source", admin: { description: 'e.g. "Acceleration Consortium", "UofT Engineering News"' } },
        { name: "date", type: "date", required: true, label: "Publication Date" },
        { name: "url", type: "text", required: true, label: "Article URL" },
        { name: "imageUrl", type: "text", label: "Image URL", admin: { description: "Paste the image URL directly from the article page" } },
      ],
    },

    {
      slug: "research-highlights",
      admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "icon", "order"],
      },
      fields: [
        { name: "title", type: "text", required: true },
        {
          name: "icon",
          type: "select",
          required: true,
          options: [
            { label: "Robot / Automation",           value: "Bot" },
            { label: "Machine Learning / AI",         value: "BrainCircuit" },
            { label: "Electrochemistry / Energy",     value: "Zap" },
            { label: "Formulation / Fluids",          value: "Droplets" },
            { label: "Chemistry",                     value: "FlaskConical" },
            { label: "Biology / Genetics",            value: "Dna" },
            { label: "Microscopy / Imaging",          value: "Microscope" },
            { label: "Physics / Materials",           value: "Atom" },
            { label: "Experiments / Synthesis",       value: "TestTube" },
            { label: "Computing / Hardware",          value: "Cpu" },
            { label: "Networks / Systems",            value: "Network" },
            { label: "Data Analysis",                 value: "TrendingUp" },
            { label: "Magnetism",                     value: "Magnet" },
            { label: "Thermal / Temperature",         value: "Thermometer" },
            { label: "Spectroscopy / Waves",          value: "Waves" },
            { label: "Electronics",                   value: "CircuitBoard" },
            { label: "Pharmaceuticals",               value: "Pill" },
            { label: "Biomedical / Health",           value: "HeartPulse" },
            { label: "Drug Delivery",                 value: "Syringe" },
            { label: "Sustainability / Environment",  value: "Leaf" },
            { label: "Data Management",               value: "Database" },
            { label: "Composites / Multilayer",       value: "Layers" },
            { label: "Engineering",                   value: "Wrench" },
            { label: "Global / Environmental",        value: "Globe" },
          ],
          admin: {
            components: {
              Field: "@/components/payload/icon-select-field#IconSelectField",
            },
          },
        },
        { name: "description", type: "textarea", required: true },
        { name: "order", type: "number", defaultValue: 99 },
      ],
    },
  ],

  globals: [
    {
      slug: "site-settings",
      admin: { group: "Settings" },
      fields: [
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
          label: "Lab Logo",
          admin: { description: "SVG logo shown in navbar and footer. Leave blank to use the default nanoparticle icon." },
        },
        { name: "labName", type: "text", label: "Lab Name", admin: { description: 'e.g. "The Mixture Lab"' } },
        { name: "piName", type: "text", label: "Principal Investigator", admin: { description: 'e.g. "Frank Gu"' } },
        { name: "institution", type: "text", label: "Institution", admin: { description: 'e.g. "University of Toronto"' } },
        { name: "department", type: "text", label: "Department", admin: { description: 'e.g. "Department of Chemical Engineering & Applied Chemistry"' } },
        { name: "address", type: "text", label: "Address", admin: { description: 'e.g. "Toronto, Ontario, Canada"' } },
        { name: "contactEmail", type: "email", label: "Contact Email" },
        { name: "missionStatement", type: "text", label: "Mission Statement", admin: { description: "Displayed as the main tagline in the hero section" } },
        { name: "heroSubtitle", type: "textarea", label: "Hero Subtitle", admin: { description: "Secondary text below the mission statement in the hero" } },
        {
          name: "linkedIn",
          type: "text",
          label: "LinkedIn URL",
          validate: (value: string | null | undefined) => {
            if (!value) return true
            if (!value.startsWith("https://linkedin.com/")) return 'Must start with "https://linkedin.com/"'
            return true
          },
        },
        {
          name: "googleScholar",
          type: "text",
          label: "Google Scholar URL",
          validate: (value: string | null | undefined) => {
            if (!value) return true
            if (!value.startsWith("https://scholar.google")) return 'Must start with "https://scholar.google"'
            return true
          },
        },
        { name: "footerTagline", type: "text", label: "Footer Tagline", admin: { description: 'e.g. "Funded by NSERC and CIHR."' } },
        {
          name: "affiliates",
          type: "array",
          label: "Affiliated With",
          admin: { description: "Links shown in the footer under 'Affiliated With'" },
          fields: [
            { name: "name", type: "text", required: true, label: "Name" },
            { name: "url", type: "text", required: true, label: "URL" },
          ],
        },
        {
          name: "contactPhoto",
          type: "upload",
          relationTo: "media",
          label: "Contact Section Photo",
          admin: { description: "Photo shown on the right side of the Contact section" },
        },
      ],
    },
  ],

  plugins: [
    vercelBlobStorage({
      enabled: /^vercel_blob_rw_/i.test(process.env.BLOB_READ_WRITE_TOKEN ?? ""),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN ?? "",
    }),
  ],

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),

  editor: lexicalEditor({}),

  secret: process.env.PAYLOAD_SECRET ?? "",

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
})
