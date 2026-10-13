# Admin Guide — The Mixture Lab Website

This guide is for the site administrator (Frank). It covers everything in the editor guide, plus publishing, managing users, and site settings.

For day-to-day content editing, see [editor-guide.md](editor-guide.md) — it covers all the content types in detail.

---

## Admins vs. Editors

| Action | Editor | Admin |
|---|---|---|
| Create and edit content | ✓ | ✓ |
| Save drafts | ✓ | ✓ |
| Publish content to the live site | — | ✓ |
| Unpublish content | — | ✓ |
| Delete records | — | ✓ |
| Manage user accounts | — | ✓ |
| Edit Site Settings | — | ✓ |

---

## Publishing Content

Content is only visible on the live site after it has been published.

### Publishing a draft

1. Open the record (e.g. a People entry or a News item)
2. Review the content
3. Click **Publish Changes** in the top-right corner
4. The record is now live

### Unpublishing content

1. Open the published record
2. Click the status dropdown (shows **Published**) and select **Draft**
3. Click **Save** — the record is immediately removed from the live site

### Reviewing all pending drafts at once

Go to **https://frankgulab.com/admin/pending-changes** (also linked in the sidebar as **Pending Changes**). This page lists every document that has unsaved draft changes, grouped by collection. Click any title to open and review it.

---

## Site Settings

Site Settings control global information shown across the site: the lab name, contact details, hero text, and footer content.

Go to **https://frankgulab.com/admin/globals/site-settings** (or click **Site Settings** in the sidebar under Settings).

| Field | What it controls |
|---|---|
| **Lab Name** | Shown in the navbar and page title (e.g. `The Mixture Lab`) |
| **Principal Investigator** | PI name shown in the navbar and page title |
| **Institution** | University name |
| **Department** | Department name |
| **Address** | City/address shown in the Contact section |
| **Mission Statement** | Main tagline shown in the hero section |
| **Hero Subtitle** | Secondary text below the mission statement |
| **Contact Email** | Email shown in the Contact section |
| **LinkedIn URL** | Lab LinkedIn — shown in the footer |
| **Google Scholar URL** | Frank's Google Scholar — shown in the footer |
| **Footer Tagline** | Short text shown in the footer (e.g. `Funded by NSERC and CIHR.`) |
| **Affiliated With** | List of links shown in the footer under "Affiliated With" — add the name and URL for each affiliation |
| **Contact Section Photo** | Photo shown on the right side of the Contact section |
| **Lab Logo** | SVG logo in the navbar and footer |

After editing, click **Save** — Site Settings changes take effect immediately (no draft/publish step).

---

## Hero Slides

Hero slides appear in the rotating slideshow at the top of the homepage.

### Adding or editing a slide

1. Click **Hero Slides** in the sidebar
2. Click an existing slide to edit, or click **Create New**
3. Fields:
   - **Name / Title** — internal label and text shown on the slide
   - **Tagline** — subtitle shown on the slide
   - **Image** — required. Upload or select from the media library.
   - **Order** — lower numbers appear first
4. Click **Publish Changes** when done

---

## Managing Users

### Adding an editor account

1. Click **Users** in the sidebar
2. Click **Create New**
3. Fill in:
   - **Name** — the person's name
   - **Email** — their email address (used to log in)
   - **Password** — set a temporary password; ask them to change it after first login
   - **Role** — set to `Editor`
4. Click **Save**

### Changing a user's role

1. Click **Users** in the sidebar
2. Click the user's name
3. Change the **Role** field to `Admin` or `Editor`
4. Click **Save**

### Removing a user

1. Click **Users** in the sidebar
2. Click the user's name
3. Click the three-dot menu (⋮) in the top-right corner and select **Delete**
4. Confirm the deletion

> **Note:** Removing a user immediately revokes their access to the admin.

---

## Media Library

The media library stores all uploaded images and files.

### Uploading a file directly

1. Click **Media** in the sidebar
2. Click **Create New**
3. Drag and drop a file, or click to browse
4. Add **Alt Text** (required)
5. Click **Save**

Uploaded files are also available when you're editing any record with an image field — you don't need to upload to the media library first.

### Deleting a file

1. Click **Media** in the sidebar
2. Click the file
3. Click the three-dot menu (⋮) and select **Delete**

> Before deleting a file, make sure it is not referenced by any record. Deleting a file that is in use will leave a broken image on the site.

---

## Deleting Content

Deleting a record permanently removes it from the site and the database. This cannot be undone.

1. Open the record you want to delete
2. Click the three-dot menu (⋮) in the top-right corner
3. Select **Delete**
4. Confirm the deletion

For People, consider setting an **End Date** instead of deleting — this moves the person to the Alumni section and preserves their record.

---

## Logging In

Admin URL: **https://frankgulab.com/admin**

If you're locked out, use the **Forgot Password** link on the login page to reset your password by email.
