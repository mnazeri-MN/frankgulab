# Editor Guide — The Mixture Lab Website

This guide is for lab members who have an editor account on the Mixture Lab website. It covers everything you need to add and update content.

**What editors can do:** Create new content, edit existing content, save drafts.  
**What editors cannot do:** Publish content to the live site, delete records, manage other users. Ask Frank to review and publish your changes.

---

## Logging In

1. Go to **https://frankgulab.com/admin**
2. Enter the editor's login credentials (Can be requested from the lab admin or Prof. Gu)

---

## The Interface

After logging in you'll see the admin sidebar on the left. It lists all the content types (collections):

- People
- Publications
- News
- Blog Posts
- Research Projects
- Lab Photos
- Opportunities

Click any collection to see its list of records. Click a record to open and edit it.

---

## Draft and Publish Workflow

All changes you save are **drafts** — they are not visible on the live site until an admin publishes them.

- **Save Draft** — saves your changes privately. Nothing on the site changes.
- When you're done editing, let Frank know so he can review and publish.
- If you save a draft of something that is already published, the live version stays unchanged until Frank publishes the new version.

---

## People

The People section lists all current lab members and alumni.

### Adding a new person

1. Click **People** in the sidebar, then **Create New**
2. Fill in the required fields:
   - **Preferred First Name** — the name shown on the site (e.g. `Frank`)
   - **Last Name** — full last name (e.g. `Gu`)
   - **Role** — select from the dropdown (controls where they appear in the list)
3. Fill in any optional fields (see below)
4. Click **Save Draft**

### Editing an existing person

1. Click **People** in the sidebar
2. Click the person's name in the list
3. Make your changes, then click **Save Draft**

### Fields

| Field | Notes |
|---|---|
| **Title** | Optional honorific — `Dr.` or `Prof.`. Leave blank for students. |
| **Preferred First Name** | Required. Name shown on the site. |
| **Last Name** | Required. Full last name. |
| **Show Full Last Name** | Uncheck to show only the first initial (e.g. Frank G.). |
| **Role** | Required. Determines the person's position in the People section. |
| **Bio** | 100–200 words. Research focus, background, current work. |
| **Show Bio** | Uncheck to hide the bio — the card will not be clickable. |
| **Email** | Optional. Hidden by default — check **Show Email** to display it. |
| **Google Scholar URL** | Full URL starting with `https://scholar.google.ca/citations?user=` |
| **LinkedIn URL** | Full URL starting with `https://linkedin.com/in/` |
| **Photo** | Upload a photo from your computer. Alt text is required after uploading. |
| **Show Photo** | Uncheck to show an initial placeholder instead of a photo. |
| **Start Date** | When the person joined the lab. Leave blank to show immediately. |
| **End Date** | When the person left the lab. Setting this moves them to the Alumni section. |

### Role order on the site

People are listed in this order, then alphabetically within each group:

1. Principal Investigator
2. Research Associate
3. Research Assistant
4. Postdoctoral Fellow
5. PhD Candidate
6. Lab Manager
7. MASc Student
8. MEng Student
9. Undergraduate Researcher
10. Visiting Scholar

### Moving someone to alumni

Set their **End Date** to the date they left (or graduated). They will move from the active members section to Alumni automatically.

---

## Publications

### Adding a publication

The easiest way is to use the DOI field — it auto-fills most details.

1. Click **Publications** in the sidebar, then **Create New**
2. Paste the DOI into the **DOI** field (e.g. `10.1038/s41586-024-00001-1`) and press Tab or click away
3. The title, first author, year, and publication URL should auto-fill
4. Review the auto-filled fields and correct any errors
5. Optionally add a **Summary** (~50 words, written for a general audience — why does this research matter?)
6. Click **Save Draft**

### Adding a cover image

If no image was auto-fetched, or you want a different one:

1. Click the **Cover Image** field
2. Upload an image from your computer, or select one already in the media library
3. Add alt text describing the image

### Linking to a blog post

If there is a related blog post on the lab site, paste the blog post URL into **Blog Post URL**. A "Blog" button will appear on the publication card.

---

## News

News items can be LinkedIn posts or external articles (Acceleration Consortium, UofT News, etc.).

### Adding a LinkedIn post

1. Click **News** in the sidebar, then **Create New**
2. Paste the LinkedIn post URL into **LinkedIn Post URL** and press Tab or click away
3. The title, source, date, and article URL should auto-fill
4. Review the auto-filled fields and correct any errors
5. Optionally add a **Summary** (~50 words)
6. Click **Save Draft**

### Adding an external article

1. Click **News** in the sidebar, then **Create New**
2. Leave **LinkedIn Post URL** blank
3. Fill in:
   - **Title** — the article headline
   - **Source** — the publication (e.g. `Acceleration Consortium`, `UofT Engineering News`)
   - **Publication Date** — the date the article was published
   - **Article URL** — the full URL to the article
   - **Image URL** — paste an image URL from the article page (right-click an image → Copy Image Address)
   - **Summary** — ~50 words explaining what happened and why it matters
4. Click **Save Draft**

---

## Blog Posts

Blog posts appear in the Blog section of the homepage and at `/blog/[slug]`.

> **Note:** The Blog section only appears on the homepage once at least one post has been published. Before the first post is published, the section is hidden.

### Writing a post

1. Click **Blog Posts** in the sidebar, then **Create New**
2. Fill in:
   - **Title** — the post headline
   - **Slug** — a short URL-friendly identifier, e.g. `new-paper-aug-2025`. Use only lowercase letters, numbers, and hyphens. This becomes the post's URL: `/blog/new-paper-aug-2025`. **Do not change the slug after a post is published** — it will break any existing links.
   - **Excerpt** — 1–2 sentences shown on the homepage card
   - **Cover Image** — upload an image or select from the media library
   - **Author** — select the lab member who wrote the post (optional)
   - **Published Date** — defaults to today; adjust if needed
3. Write the post body in the **Body** field (rich-text editor — see below)
4. Click **Save Draft**

### Using the body editor

The body uses a rich-text editor with a toolbar at the top. Key controls:

- **Headings** — select H2 or H3 from the Format dropdown for section headers
- **Bold / Italic** — highlight text, then click B or I
- **Link** — highlight text, click the link icon, paste the URL
- **Bullet list / Numbered list** — click the list icon
- **Images** — click the image icon to upload or select from the media library

---

## Research Projects

Research projects appear in the Research section of the homepage.

### Adding a project

1. Click **Research Projects** in the sidebar, then **Create New**
2. Fill in:
   - **Title** — the project name
   - **Description** — max 30 words. One punchy sentence summarising the research area.
   - **Category Tag** — a short label (e.g. `Interfacial Science`, `Personal Care`)
   - **YouTube URL** — if provided, a video player is embedded on the card
   - **Cover Image** — used only when no YouTube URL is provided
   - **Order** — a number controlling where this project appears. Lower numbers appear first (e.g. `1` appears before `2`). Default is `99`.
3. Click **Save Draft**

---

## Lab Photos

Lab photos appear in the scrolling strip at the bottom of the People section.

### Adding a lab photo

1. Click **Lab Photos** in the sidebar, then **Create New**
2. Fill in:
   - **Year** — the year the photo was taken (e.g. `2025`)
   - **Caption** — optional short caption
   - **Photo** — upload the photo (add alt text after uploading)
   - **Order** — lower numbers appear first. Use `1` for the newest photo.
3. Click **Save Draft**

---

## Opportunities

Opportunities appear in the Opportunities section of the homepage.

### Adding an opportunity

1. Click **Opportunities** in the sidebar, then **Create New**
2. Fill in:
   - **Title** — e.g. `PhD Positions — Fall 2026`
   - **Description** — the opportunity details
   - **Order** — controls display order (lower = first)
3. Click **Save Draft**

---

## Tips

- **You can always edit a draft later.** If you're not done, save a draft and come back.
- **Nothing goes live until Frank publishes it.** Don't worry about accidentally changing the site.
- **Check for typos before saving.** Small errors are easy to miss once content is live.
- **Images need alt text.** When you upload a photo or image, you'll be prompted for alt text — fill it in. It's required for accessibility and search engines.
