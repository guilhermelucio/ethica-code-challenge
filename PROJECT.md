# Ethyca Code Challenge — Project Overview

## What This Project Does

This is a **Data Map Board** — a visual tool for managing and exploring how different systems within an organization handle personal data. Think of it as a privacy-focused Kanban board.

Each card on the board represents a **system** (an application, service, database, or third-party integration) and shows what personal data it collects, from whom, and for what purpose. Examples include an online storefront, a checkout app, a payments processor like Stripe, or a marketing tool like Mailchimp.

---

## Key Features

### Kanban-style Board
Systems are organized into columns by type: **Application**, **Service**, **Database**, and **Integration**. Each column is color-coded for quick visual orientation.

### Drag & Drop Reclassification
Cards can be dragged from one column to another, allowing users to reassign a system's type. The change is persisted via a backend API call.

### Privacy Declaration Details
Expanding any card reveals its **privacy declarations** — structured metadata that describes:
- What categories of personal data are collected (e.g. email, IP address, financial info)
- Who the data subjects are (e.g. customers)
- What the data is used for (e.g. advertising, analytics, fulfilling orders)

### Relationship Filtering
Clicking the filter icon on any card highlights that system and all systems it depends on across the board. The board theme adapts to the selected system's color, and a legend footer appears to clarify what is highlighted. Clearing the filter restores the full view.

### Live Item Count
Each column header shows a live count of how many systems it currently contains, updating automatically when cards are moved.

---

## The Problem It Solves

Privacy regulations like GDPR and CCPA require organizations to understand and document what personal data flows through their systems and why. This board makes that information visible and interactive — giving teams a centralized, navigable view of their data landscape rather than a static spreadsheet or document.

---

## Technology Summary

Built with **Next.js** (React framework), using a file-based JSON store as the data layer and a REST API for reads and updates. The UI is fully reactive, with client-side state managed through **TanStack Query**.

---

## Time Constraint & Known Limitations

This project was completed within a **4-hour time box**. The core functionality works end-to-end, but several areas were intentionally deferred or left in a rough state to stay within that limit.

### Missing features

The current build is read-and-reclassify only. A complete product would also support full CRUD for both entries and columns.

**Cards (data map entries)**
- **Create** — There is no way to add a new system to the board. A form or modal to define a name, description, type, dependencies, and privacy declarations would be needed.
- **Edit** — Existing cards cannot be updated. Fields like the description, data categories, data subjects, or data use purpose are display-only once created.
- **Delete** — There is no way to remove a card from the board. A delete action with a confirmation step would be the expected pattern.

**Columns (system types)**
- **Create** — The set of columns is fixed to whatever exists in the database seed. There is no UI to define a new system type with a custom name and color.
- **Edit** — Column names and theme colors cannot be changed after creation.
- **Delete** — Columns cannot be removed. Deleting a column would also need to handle (reassign or remove) all cards currently inside it.

---

### Not implemented

- **Error states in the UI** — When a data fetch fails, components return nothing (blank space) instead of showing an error message. There is no user-facing feedback for failed API calls.
- **Loading states** — Similarly, while data is loading the board renders nothing. No skeleton screens or spinners were added.
- **Drag & drop failure feedback** — If a PATCH request fails after a card is dropped, the mutation fails silently. The user receives no indication that the move did not persist.
- **API input validation** — The PATCH endpoint does not validate whether the provided `systemTypeId` or `dataMapId` actually exist. Dropping a card into an unrecognized column type would silently corrupt the record. There are also no 404 responses — an unmatched update returns HTTP 200 with null values.
- **Pagination** — The API response shape includes `cursor`, `hasNext`, `total`, and `size` fields, indicating pagination was designed for. In practice `hasNext` is always `false` and the client never requests subsequent pages.
- **Transitive relationship filtering** — The filter view shows the selected system and its direct dependencies only. It does not traverse the dependency graph further (e.g. dependencies of dependencies are not highlighted).
- **No test coverage** — No unit, integration, or end-to-end tests were written.

### Tech debt left out

- **File-based JSON database** — Using a flat JSON file as the data store works for a demo but is not safe for concurrent writes. Two simultaneous drag-and-drop operations could corrupt the file since there is no locking between the read and write steps.
- **QueryClient instantiated at module level** — The TanStack Query client is created once outside the React component tree. In a server-rendered Next.js application the recommended pattern is to instantiate it per request to avoid state leaking across users.
- **Inconsistent cache configuration** — The system-types query has an explicit `staleTime` to reduce refetches, but the data-maps queries do not, causing unnecessary re-requests on every mount and window focus.
- **Default page metadata** — The browser tab title and description are still the boilerplate values generated by `create-next-app` and were never updated.
- **Manual database backup file** — A file named `db copy.json` was left in the source tree as an ad-hoc snapshot taken during development. It should be removed or replaced with a proper seed/reset script.
