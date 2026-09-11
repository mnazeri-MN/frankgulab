import path from "path"
import { fileURLToPath } from "url"
import { buildConfig } from "payload"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isAdmin = (req: { user?: unknown } | undefined) =>
  (req?.user as { role?: string } | null)?.role === "admin"

// Prevent editors from publishing or unpublishing — only admins can change _status
const preventEditorPublish = ({
  data,
  req,
  originalDoc,
}: {
  data: Record<string, unknown>
  req: { user?: unknown }
  originalDoc?: Record<string, unknown>
}) => {
  if (isAdmin(req)) return data
  if (data._status === "published") {
    throw new Error("Only admins can publish content. Save as draft instead.")
  }
  return data
}

export default buildConfig({
  admin: {
    user: "users",
    components: {
      afterNavLinks: [
        "@/components/payload/export-people-button#ExportPeopleButton",
        "@/components/payload/pending-changes-nav#PendingChangesNav",
      ],
      views: {
        pendingChanges: {
          Component: "@/components/payload/pending-changes-view#default",
          path: "/pending-changes",
        },
      },
    },
  },

  collections: [
    {
      slug: "users",
      auth: true,
      access: {
        create: ({ req }) => isAdmin(req),
        read: ({ req }) => !!req.user,
        update: ({ req }) => isAdmin(req),
        delete: ({ req }) => isAdmin(req),
      },
      admin: { useAsTitle: "email" },
      fields: [
        { name: "name", type: "text" },
        {
          name: "role",
          type: "select",
          options: [
            { label: "Admin", value: "admin" },
            { label: "Editor", value: "editor" },
          ],
          defaultValue: "editor",
          access: {
            read: () => true,
            update: ({ req }) => isAdmin(req),
          },
          admin: { description: "Admins can publish content. Editors can only save drafts for review." },
        },
      ],
    },

    {
      slug: "media",
      access: {
        read: () => true,
        create: ({ req }) => !!req.user,
        update: ({ req }) => !!req.user,
        delete: ({ req }) => isAdmin(req),
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
      versions: { drafts: true },
      hooks: { beforeChange: [preventEditorPublish] },
      access: {
        read: () => true,
        create: ({ req }) => !!req.user,
        update: ({ req }) => !!req.user,
        delete: ({ req }) => isAdmin(req),
      },
      admin: { useAsTitle: "preferredFirstName", defaultColumns: ["preferredFirstName", "lastInitial", "role"], components: { edit: { PublishButton: "@/components/payload/conditional-publish-button#ConditionalPublishButton" } } },
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
          label: "Last Name",
          admin: { description: "Full last name (e.g. Gu, Smith, Johnson)" },
        },
        {
          name: "showFullLastName",
          type: "checkbox",
          label: "Show full last name publicly",
          defaultValue: true,
          admin: { description: "When off, only the first initial is shown on the site (e.g. Frank G.)" },
        },
        {
          name: "role",
          type: "select",
          required: true,
          options: [
            { label: "Principal Investigator", value: "Principal Investigator" },
            { label: "Research Associate", value: "Research Associate" },
            { label: "Postdoctoral Fellow", value: "Postdoctoral Fellow" },
            { label: "PhD Candidate", value: "PhD Candidate" },
            { label: "Lab Manager", value: "Lab Manager" },
            { label: "MASc Student", value: "MASc Student" },
            { label: "MEng Student", value: "MEng Student" },
            { label: "Undergraduate Researcher", value: "Undergraduate Researcher" },
            { label: "Visiting Scholar", value: "Visiting Scholar" },
          ],
        },
        { name: "bio", type: "textarea", label: "Bio", admin: { description: "100–200 words. Research focus, background, and what they're working on." } },
        {
          name: "showBio",
          type: "checkbox",
          label: "Show bio publicly",
          defaultValue: true,
          admin: { description: "When off, the card is non-interactive and the bio is not shown on the site." },
        },
        { name: "email", type: "email" },
        {
          name: "showEmail",
          type: "checkbox",
          label: "Show email publicly",
          defaultValue: false,
          admin: { description: "Off by default — enable to show the email address on the public site." },
        },
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
          name: "showScholar",
          type: "checkbox",
          label: "Show Google Scholar link publicly",
          defaultValue: true,
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
        {
          name: "showLinkedin",
          type: "checkbox",
          label: "Show LinkedIn link publicly",
          defaultValue: true,
        },
        { name: "photo", type: "upload", relationTo: "media" },
        {
          name: "showPhoto",
          type: "checkbox",
          label: "Show photo publicly",
          defaultValue: true,
          admin: { description: "When off, the initial placeholder is shown instead of the photo." },
        },
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
      versions: { drafts: true },
      hooks: { beforeChange: [preventEditorPublish] },
      access: {
        read: () => true,
        create: ({ req }) => !!req.user,
        update: ({ req }) => !!req.user,
        delete: ({ req }) => isAdmin(req),
      },
      admin: { useAsTitle: "title", defaultColumns: ["firstAuthor", "title", "year"], components: { edit: { PublishButton: "@/components/payload/conditional-publish-button#ConditionalPublishButton" } } },
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
        { name: "summary", type: "textarea", label: "Summary", admin: { description: "~50 words. Why should someone care about this paper? Written for a general audience." } },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Cover Image",
          admin: { description: "Upload an image to override the one fetched from the DOI URL" },
        },
        { name: "blogUrl", type: "text", label: "Blog Post URL", admin: { description: "Link to a Mixture Lab blog post about this publication. When set, a 'Blog' button appears on the publication card." } },
        { name: "fetchedImageUrl", type: "text", admin: { hidden: true } },
      ],
    },

    {
      slug: "projects",
      versions: { drafts: true },
      hooks: { beforeChange: [preventEditorPublish] },
      access: {
        read: () => true,
        create: ({ req }) => !!req.user,
        update: ({ req }) => !!req.user,
        delete: ({ req }) => isAdmin(req),
      },
      admin: { useAsTitle: "title", defaultColumns: ["title", "tag", "order"], components: { edit: { PublishButton: "@/components/payload/conditional-publish-button#ConditionalPublishButton" } } },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true, admin: { description: "Max 30 words. One punchy sentence summarising the research area." } },
        { name: "tag", type: "text", required: true, label: "Category Tag" },
        {
          name: "youtubeUrl",
          type: "text",
          label: "YouTube URL",
          admin: { description: "Paste a YouTube video URL. If provided, the video player is embedded on the card instead of the image." },
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Cover Image",
          admin: { description: "Used only when no YouTube URL is provided." },
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
      versions: { drafts: true },
      hooks: { beforeChange: [preventEditorPublish] },
      access: {
        read: () => true,
        create: ({ req }) => !!req.user,
        update: ({ req }) => !!req.user,
        delete: ({ req }) => isAdmin(req),
      },
      admin: { useAsTitle: "name", defaultColumns: ["name", "tagline", "order"], components: { edit: { PublishButton: "@/components/payload/conditional-publish-button#ConditionalPublishButton" } } },
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
      versions: { drafts: true },
      hooks: { beforeChange: [preventEditorPublish] },
      access: {
        read: () => true,
        create: ({ req }) => !!req.user,
        update: ({ req }) => !!req.user,
        delete: ({ req }) => isAdmin(req),
      },
      admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "source", "date"],
        components: { edit: { PublishButton: "@/components/payload/conditional-publish-button#ConditionalPublishButton" } },
      },
      fields: [
        {
          name: "linkedInUrl",
          type: "text",
          label: "LinkedIn Post URL",
          admin: {
            components: {
              Field: "@/components/payload/linkedin-news-field#LinkedInNewsField",
            },
          },
        },
        { name: "title", type: "text", required: true },
        { name: "source", type: "text", required: true, label: "Source", admin: { description: 'e.g. "Acceleration Consortium", "UofT Engineering News"' } },
        { name: "date", type: "date", required: true, label: "Publication Date" },
        { name: "url", type: "text", required: true, label: "Article URL" },
        { name: "imageUrl", type: "text", label: "Image URL", admin: { description: "Paste the image URL directly from the article page" } },
        { name: "summary", type: "textarea", label: "Summary", admin: { description: "~50 words. What happened and why it matters." } },
      ],
    },

    {
      slug: "opportunities",
      versions: { drafts: true },
      hooks: { beforeChange: [preventEditorPublish] },
      access: {
        read: () => true,
        create: ({ req }) => !!req.user,
        update: ({ req }) => !!req.user,
        delete: ({ req }) => isAdmin(req),
      },
      admin: { useAsTitle: "title", defaultColumns: ["title", "order"], components: { edit: { PublishButton: "@/components/payload/conditional-publish-button#ConditionalPublishButton" } } },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        { name: "order", type: "number", defaultValue: 99, admin: { description: "Display order (lower = first)" } },
      ],
    },

    {
      slug: "posts",
      versions: { drafts: true },
      hooks: { beforeChange: [preventEditorPublish] },
      access: {
        read: () => true,
        create: ({ req }) => !!req.user,
        update: ({ req }) => !!req.user,
        delete: ({ req }) => isAdmin(req),
      },
      admin: { useAsTitle: "title", defaultColumns: ["title", "publishedAt", "_status"], components: { edit: { PublishButton: "@/components/payload/conditional-publish-button#ConditionalPublishButton" } } },
      fields: [
        { name: "title", type: "text", required: true },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          admin: { description: "URL-friendly identifier, e.g. 'new-paper-2025'. Must be unique." },
        },
        { name: "excerpt", type: "textarea", label: "Excerpt", admin: { description: "1–2 sentence preview shown on the homepage card." } },
        {
          name: "coverImage",
          type: "upload",
          relationTo: "media",
          label: "Cover Image",
        },
        {
          name: "author",
          type: "relationship",
          relationTo: "people",
          label: "Author",
          admin: { description: "Optional — select the lab member who wrote this post." },
        },
        { name: "publishedAt", type: "date", label: "Published Date", admin: { description: "Date shown on the post. Defaults to today." } },
        {
          name: "body",
          type: "richText",
          label: "Body",
          editor: lexicalEditor({}),
        },
      ],
    },

    {
      slug: "lab-photos",
      versions: { drafts: true },
      hooks: { beforeChange: [preventEditorPublish] },
      access: {
        read: () => true,
        create: ({ req }) => !!req.user,
        update: ({ req }) => !!req.user,
        delete: ({ req }) => isAdmin(req),
      },
      admin: { useAsTitle: "year", defaultColumns: ["year", "caption"], components: { edit: { PublishButton: "@/components/payload/conditional-publish-button#ConditionalPublishButton" } } },
      fields: [
        { name: "year", type: "number", required: true, admin: { description: "Year the photo was taken (e.g. 2025)" } },
        { name: "caption", type: "text", label: "Caption (optional)" },
        { name: "photo", type: "upload", relationTo: "media", required: true },
        { name: "order", type: "number", defaultValue: 99, admin: { description: "Display order (lower = first). Use 1 for newest." } },
      ],
    },

  ],

  globals: [
    {
      slug: "site-settings",
      access: {
        read: () => true,
        update: ({ req }) => isAdmin(req),
      },
      admin: { group: "Settings" },
      fields: [
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
          label: "Lab Logo",
          admin: { description: "SVG logo shown in navbar and footer. Leave blank to use the default nanoparticle icon." },
        },
        { name: "labName", type: "text", label: "Lab Name", admin: { placeholder: "The Mixture Lab" } },
        { name: "piName", type: "text", label: "Principal Investigator", admin: { placeholder: "Frank Gu" } },
        { name: "institution", type: "text", label: "Institution", admin: { placeholder: "University of Toronto" } },
        { name: "department", type: "text", label: "Department", admin: { placeholder: "Department of Chemical Engineering & Applied Chemistry" } },
        { name: "address", type: "text", label: "Address", admin: { placeholder: "Toronto, Ontario, Canada" } },
        { name: "contactEmail", type: "email", label: "Contact Email", admin: { placeholder: "f.gu@utoronto.ca" } },
        { name: "missionStatement", type: "text", label: "Mission Statement", admin: { placeholder: "We build the labs that will discover tomorrow's formulations, today.", description: "Displayed as the main tagline in the hero section" } },
        { name: "heroSubtitle", type: "textarea", label: "Hero Subtitle", admin: { placeholder: "Automation, robotics, and machine learning applied to formulation science, electrochemistry, and advanced materials research.", description: "Secondary text below the mission statement in the hero" } },
        {
          name: "linkedIn",
          type: "text",
          label: "LinkedIn URL",
          admin: { placeholder: "https://linkedin.com/company/frank-gu-lab" },
        },
        {
          name: "googleScholar",
          type: "text",
          label: "Google Scholar URL",
          admin: { placeholder: "https://scholar.google.ca/citations?user=nZYyToUAAAAJ&hl=en" },
        },
        { name: "footerTagline", type: "text", label: "Footer Tagline", admin: { placeholder: "Funded by NSERC and CIHR." } },
        {
          name: "affiliates",
          type: "array",
          label: "Affiliated With",
          admin: { description: "Links shown in the footer under 'Affiliated With'" },
          fields: [
            { name: "name", type: "text", required: true, label: "Name", admin: { placeholder: "University of Toronto" } },
            { name: "url", type: "text", required: true, label: "URL", admin: { placeholder: "https://www.utoronto.ca" } },
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
