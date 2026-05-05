const markdownFiles = {
    profile: "content/profile/index.md",
    work: "content/work/index.md",
    publications: "content/publications/index.md",
    spotlights: "content/spotlights/index.md",
    projects: "content/projects/index.md"
};

function escapeHtml(text) {
    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

const PLATFORM_META = {
    email: {
        bg: "#c0392b", fg: "#fff",
        icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    },
    linkedin: {
        bg: "#0077B5", fg: "#fff",
        icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    },
    github: {
        bg: "#24292e", fg: "#fff",
        icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
    },
    scholar: {
        bg: "#4285F4", fg: "#fff",
        icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true"><path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 10a8 8 0 0 1 7.162 3.44L24 9.5z"/></svg>`,
    },
    twitter: {
        bg: "#000", fg: "#fff",
        icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    },
    cv: {
        bg: "#555", fg: "#fff",
        icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15h8v2H8zm0-4h8v2H8z"/></svg>`,
    },
    default: {
        bg: "var(--basil-dark)", fg: "var(--basil-soft)",
        icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
    },
};

function detectPlatform(label, href) {
    const l = label.toLowerCase().trim();
    const h = (href || "").toLowerCase();
    if (l === "email" || h.startsWith("mailto:")) return "email";
    if (l.includes("scholar") || h.includes("scholar.google")) return "scholar";
    if (l === "linkedin" || h.includes("linkedin.com")) return "linkedin";
    if (l === "github" || h.includes("github.com")) return "github";
    if (l === "twitter" || l === "x" || h.includes("twitter.com") || h.includes("x.com")) return "twitter";
    if (l === "cv" || l === "resume") return "cv";
    return "default";
}

function renderContactRow(markdownLine) {
    const match = markdownLine.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (!match) return "";
    const [, label, href] = match;
    const platform = detectPlatform(label, href);
    const meta = PLATFORM_META[platform];
    const normalizedHref = platform === "email" && !href.startsWith("mailto:") ? `mailto:${href}` : href;
    const visibleHref = normalizedHref
        .replace(/^mailto:/, "")
        .replace(/^https?:\/\//, "")
        .replace(/\/$/, "");
    const value = visibleHref && visibleHref !== "#" ? visibleHref : label;

    if (platform === "email") {
        return `
            <li class="profile-contact-item profile-contact-item--email" style="--item-bg:${meta.bg};--item-fg:${meta.fg}">
                <button class="email-copy-btn" type="button" data-copy-email="${escapeHtml(value)}" aria-label="Copy email">
                    <span class="contact-icon" style="--icon-bg:${meta.bg};--icon-fg:${meta.fg}">${meta.icon}</span>
                    <span class="contact-label">${escapeHtml(label)}:</span>
                    <span class="contact-value">${escapeHtml(value)}</span>
                </button>
            </li>
        `;
    }

    return `
        <li class="profile-contact-item profile-contact-item--icon" style="--item-bg:${meta.bg};--item-fg:${meta.fg}">
            <a class="contact-icon-link" href="${escapeHtml(normalizedHref)}" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}" style="--icon-bg:${meta.bg};--icon-fg:${meta.fg}">
                <span class="contact-icon">${meta.icon}</span>
            </a>
        </li>
    `;
}

function setupProfileContactActions() {
    document.querySelectorAll("[data-copy-email]").forEach((button) => {
        button.addEventListener("click", async () => {
            const email = button.dataset.copyEmail;
            const originalText = button.getAttribute("aria-label") || "Copy email";

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(email);
                } else {
                    const textarea = document.createElement("textarea");
                    textarea.value = email;
                    textarea.setAttribute("readonly", "");
                    textarea.style.position = "fixed";
                    textarea.style.opacity = "0";
                    document.body.appendChild(textarea);
                    textarea.select();
                    const copied = document.execCommand("copy");
                    textarea.remove();

                    if (!copied) {
                        throw new Error("Copy command failed");
                    }
                }

                button.classList.add("is-copied");
                button.setAttribute("aria-label", "Email copied");
                window.setTimeout(() => {
                    button.classList.remove("is-copied");
                    button.setAttribute("aria-label", originalText);
                }, 1400);
            } catch (error) {
                window.location.href = `mailto:${email}`;
            }
        });
    });
}

function renderInlineMarkdown(text) {
    return escapeHtml(text)
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}

function renderActionLinks(markdownLinks) {
    return Array.from(markdownLinks.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g))
        .map(([, label, href]) => {
            const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            return `<a class="action-btn action-${slug}" href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
        })
        .join("");
}

async function fetchMarkdown(path) {
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Could not load ${path}`);
    }

    return response.text();
}

function getTitle(markdown) {
    return markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() || "";
}

function getIntro(markdown) {
    const withoutTitle = markdown.replace(/^#\s+.+$/m, "").trim();
    const beforeFirstSection = withoutTitle.split(/\n##\s+/)[0].trim();
    return beforeFirstSection;
}

function getSections(markdown) {
    return markdown
        .split(/\n(?=##\s+)/)
        .filter((block) => block.trim().startsWith("## "))
        .map((block) => {
            const lines = block.trim().split("\n");
            const heading = lines.shift().replace(/^##\s+/, "").trim();
            const subheadingIndex = lines.findIndex((line) => line.startsWith("### "));
            const subheading = subheadingIndex >= 0 ? lines[subheadingIndex].replace(/^###\s+/, "").trim() : "";
            const bodyLines = subheadingIndex >= 0 ? lines.slice(subheadingIndex + 1) : lines;
            const body = bodyLines.join("\n").trim();

            return { heading, subheading, body };
        });
}

function getBasePath(filePath) {
    return filePath.substring(0, filePath.lastIndexOf("/") + 1);
}

function resolveMedia(path, basePath) {
    if (!path || path.startsWith("http") || path.startsWith("/") || path.startsWith("data:")) {
        return path;
    }
    return basePath + path;
}

function getMarkdownField(markdown, field) {
    const prefix = `${field}:`;
    return markdown.split("\n")
        .map((l) => l.trim())
        .find((l) => l.toLowerCase().startsWith(prefix.toLowerCase()))
        ?.slice(prefix.length).trim() || "";
}

function getBodyField(body, field) {
    const prefix = `${field}:`;
    return body.split("\n").map((l) => l.trim()).find((l) => l.toLowerCase().startsWith(prefix.toLowerCase()))
        ?.slice(prefix.length).trim() || "";
}

function stripBodyField(body, field) {
    const prefix = `${field}:`;
    return body.split("\n").filter((l) => !l.trim().toLowerCase().startsWith(prefix.toLowerCase())).join("\n");
}

function getYear(value) {
    return String(value || "").match(/\b(19|20)\d{2}\b/)?.[0] || "Undated";
}

function groupByYear(items, getValue) {
    const groups = new Map();

    items.forEach((item) => {
        const year = getYear(getValue(item));
        groups.set(year, [...(groups.get(year) || []), item]);
    });

    return Array.from(groups.entries())
        .sort(([a], [b]) => {
            if (a === "Undated") return 1;
            if (b === "Undated") return -1;
            return Number(b) - Number(a);
        });
}

function renderParagraphs(markdown) {
    return markdown
        .split(/\n\s*\n/)
        .map((block) => block.trim())
        .filter(Boolean)
        .map((block) => {
            if (block.startsWith("- ")) {
                const items = block
                    .split("\n")
                    .map((line) => line.replace(/^-\s+/, "").trim())
                    .map((line) => `<li>${renderInlineMarkdown(line)}</li>`)
                    .join("");
                return `<ul class="contact-list">${items}</ul>`;
            }

            return `<p>${renderInlineMarkdown(block.replace(/\n/g, " "))}</p>`;
        })
        .join("");
}

function renderProfile(markdown, basePath = "") {
    const profile = document.querySelector("[data-profile]");
    const sectionLabel = getTitle(markdown);
    const name = getMarkdownField(markdown, "Name") || sectionLabel;
    const intro = getIntro(markdown)
        .split("\n")
        .filter((line) => !/^\s*[A-Za-z]+:\s/.test(line))
        .join("\n")
        .trim();
    const sections = getSections(markdown);
    const linksSection = sections.find((s) => s.heading === "Links");
    const newsSection = sections.find((s) => s.heading === "News");
    const photoSrc = resolveMedia(getMarkdownField(markdown, "Photo"), basePath);
    const iconSrc = resolveMedia(getMarkdownField(markdown, "Icon"), basePath);
    const copyright = getMarkdownField(markdown, "Copyright") || `© ${new Date().getFullYear()} ${name}`;
    const iconCredit = getMarkdownField(markdown, "IconCredit");

    if (!profile) {
        return;
    }

    const links = linksSection?.body
        .split("\n")
        .filter((line) => line.startsWith("- "))
        .map((line) => line.replace(/^-\s+/, "").trim())
        .join("\n") || "";

    const newsLines = newsSection?.body
        .split("\n")
        .filter((line) => line.startsWith("- "))
        .map((line) => line.replace(/^-\s+/, "").trim())
        .filter(Boolean) || [];

    const newsItems = groupByYear(newsLines, (line) => line)
        .map(([year, lines]) => `
            <section class="news-year-group">
                <h3>${escapeHtml(year)}</h3>
                <ul>
                    ${lines.map((line) => `<li>${renderInlineMarkdown(line.replace(/^\*\*\[(?:19|20)\d{2}\]\*\*\s*/, ""))}</li>`).join("")}
                </ul>
            </section>
        `)
        .join("");

    const newsHtml = newsItems
        ? `<div class="header-column">
               <h2 class="header-subheading">News</h2>
               <div class="news-list">${newsItems}</div>
           </div>`
        : "";
    const contactsHtml = links
        ? `<div class="header-column">
               <h2 class="header-subheading">Contacts</h2>
               <ul class="profile-contact-list">${links.split("\n").filter(Boolean).map(renderContactRow).join("")}</ul>
           </div>`
        : "";

    const bottomHtml = contactsHtml || newsHtml
        ? `<div class="header-bottom">${contactsHtml}${newsHtml}</div>`
        : "";

    const portraitHtml = photoSrc
        ? `<div class="portrait"><img src="${escapeHtml(photoSrc)}" alt="${escapeHtml(name)}"></div>`
        : `<div class="portrait portrait--placeholder">Photo</div>`;

    if (iconSrc) {
        let iconLink = document.querySelector("link[rel='icon']");
        if (!iconLink) {
            iconLink = document.createElement("link");
            iconLink.rel = "icon";
            document.head.appendChild(iconLink);
        }
        iconLink.href = iconSrc;
    }

    profile.innerHTML = `
        <div class="header-bio">
            ${portraitHtml}
            <p class="bio-label">${escapeHtml(sectionLabel)}</p>
            <h1 class="site-title">${escapeHtml(name)}</h1>
            <p class="tagline">${renderInlineMarkdown(intro.replace(/\n/g, " "))}</p>
        </div>
        ${bottomHtml}
    `;

    const footer = document.querySelector("[data-footer]");
    if (footer) {
        footer.innerHTML = `
            <p class="footer-copy">${renderInlineMarkdown(copyright)}</p>
            ${iconCredit ? `<p class="footer-icon-credit">Icon by ${renderInlineMarkdown(iconCredit)}</p>` : ""}
        `;
    }
}

function renderNavigation(name) {
    const nav = document.querySelector("[data-nav]");

    if (!nav) {
        return;
    }

    const items = [
        { label: name, href: "#top" },
        { label: "Work", href: "#work-experience" },
        { label: "Publications", href: "#publications" },
        { label: "Projects", href: "#projects" },
        { label: "Spotlights", href: "#spotlights" }
    ];

    nav.innerHTML = items.map((item) => `<a href="${item.href}">${escapeHtml(item.label)}</a>`).join("");
}

function renderWork(markdown, basePath = "") {
    const list = document.querySelector("[data-work-list]");
    const sections = getSections(markdown);

    if (!list) {
        return;
    }

    list.innerHTML = sections.map((item) => {
        const gif = resolveMedia(getBodyField(item.body, "Gif"), basePath);
        const place = getBodyField(item.body, "Place");
        const location = getBodyField(item.body, "Location");
        const website = getBodyField(item.body, "Website");
        const mentors = getBodyField(item.body, "Mentors");
        const summary = getBodyField(item.body, "Summary");
        const skills = getBodyField(item.body, "Skills")
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean);
        const thumbInner = gif ? `<img src="${escapeHtml(gif)}" alt="">` : "";
        const thumb = website
            ? `<a class="entry-thumb" href="${escapeHtml(website)}" aria-label="${escapeHtml(place || item.subheading)}">${thumbInner}</a>`
            : `<div class="entry-thumb">${thumbInner}</div>`;
        const locationHtml = location
            ? `<p class="entry-location">${website ? `<a href="${escapeHtml(website)}">${renderInlineMarkdown(location)}</a>` : renderInlineMarkdown(location)}</p>`
            : "";
        const skillsHtml = skills.length
            ? `<div class="skill-tags">${skills.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("")}</div>`
            : "";

        return `
        <article class="entry">
            ${thumb}
            <div>
                <p class="date">${renderInlineMarkdown(item.heading)}</p>
                <h3 class="entry-title">${renderInlineMarkdown(item.subheading)}</h3>
                ${place ? `<p class="entry-place">${website ? `<a href="${escapeHtml(website)}">${renderInlineMarkdown(place)}</a>` : renderInlineMarkdown(place)}</p>` : ""}
                ${locationHtml}
                ${mentors ? `<p class="entry-mentors"><span>Mentors:</span> ${renderInlineMarkdown(mentors)}</p>` : ""}
                ${summary ? `<p class="entry-summary">${renderInlineMarkdown(summary)}</p>` : ""}
                ${skillsHtml}
            </div>
        </article>
        `;
    }).join("");
}

function renderPublications(markdown, basePath = "") {
    const list = document.querySelector("[data-publications-list]");
    const sections = getSections(markdown);

    if (!list) {
        return;
    }

    list.innerHTML = sections.map((item) => {
        const lines = item.body.split("\n").map((line) => line.trim()).filter(Boolean);
        const authors = lines.find((line) => line.startsWith("Authors:"))?.replace("Authors:", "").trim() || "";
        const venueRaw = lines.find((line) => line.startsWith("Venue:"))?.replace("Venue:", "").trim() || "";
        const award = lines.find((line) => line.startsWith("Award:"))?.replace("Award:", "").trim() || "";
        const links = lines.find((line) => line.startsWith("Links:"))?.replace("Links:", "").trim() || "";
        const gif = resolveMedia(lines.find((line) => line.startsWith("Gif:"))?.replace("Gif:", "").trim() || "", basePath);
        const thumbInner = gif ? `<img src="${escapeHtml(gif)}" alt="">` : "";
        const venueParts = venueRaw.split("⭐").map((part) => part.trim()).filter(Boolean);
        const venue = venueParts[0] || "";
        const inlineAward = venueParts[1] || "";
        const awardText = award || inlineAward;

        return `
            <article class="publication">
                <div class="pub-thumb">${thumbInner}</div>
                <div>
                    <p class="date">${renderInlineMarkdown(item.heading)}</p>
                    <p class="publication-title">${renderInlineMarkdown(item.subheading)}</p>
                    <p class="authors">${renderInlineMarkdown(authors)}</p>
                    <div class="pub-meta">
                        ${venue ? `<span class="venue-badge">${renderInlineMarkdown(venue)}</span>` : ""}
                        ${awardText ? `<span class="award-badge"><span aria-hidden="true">🎉</span>${renderInlineMarkdown(awardText)}</span>` : ""}
                    </div>
                    <div class="pub-links">${renderActionLinks(links)}</div>
                </div>
            </article>
        `;
    }).join("");
}

function renderSpotlights(markdown, basePath = "") {
    const list = document.querySelector("[data-spotlights-list]");
    const sections = getSections(markdown);

    if (!list) {
        return;
    }

    list.innerHTML = sections.map((item) => {
        const source = getBodyField(item.body, "Source") || item.heading;
        const work = getBodyField(item.body, "Work");
        const date = getBodyField(item.body, "Date");
        const link = getBodyField(item.body, "Link");
        const thumbnail = resolveMedia(getBodyField(item.body, "Thumbnail"), basePath);
        let bodyText = stripBodyField(item.body, "Source");
        bodyText = stripBodyField(bodyText, "Work");
        bodyText = stripBodyField(bodyText, "Date");
        bodyText = stripBodyField(bodyText, "Link");
        bodyText = stripBodyField(bodyText, "Thumbnail").trim();

        const titleHtml = link
            ? `<a href="${escapeHtml(link)}">${renderInlineMarkdown(item.subheading || source)}</a>`
            : renderInlineMarkdown(item.subheading || source);
        const thumbnailInner = thumbnail
            ? `<img src="${escapeHtml(thumbnail)}" alt="">`
            : `<span>${escapeHtml(source)}</span>`;
        const thumbnailHtml = link
            ? `<a class="spotlight-thumb" href="${escapeHtml(link)}" aria-label="${escapeHtml(item.subheading || source)}">${thumbnailInner}</a>`
            : `<div class="spotlight-thumb">${thumbnailInner}</div>`;

        return `
            <article class="project-card spotlight-card">
                ${thumbnailHtml}
                <div class="project-body spotlight-body">
                    <div class="spotlight-kicker">
                        <span>${renderInlineMarkdown(source)}</span>
                        ${date ? `<span>${renderInlineMarkdown(date)}</span>` : ""}
                    </div>
                    <h3 class="project-title spotlight-title">${titleHtml}</h3>
                    ${work ? `<p class="project-tagline spotlight-work">${renderInlineMarkdown(work)}</p>` : ""}
                    <div class="project-description spotlight-description">${renderParagraphs(bodyText)}</div>
                    ${link ? `<div class="project-links spotlight-actions"><a href="${escapeHtml(link)}">Read feature</a></div>` : ""}
                </div>
            </article>
        `;
    }).join("");
}

function renderProjects(markdown, basePath = "") {
    const list = document.querySelector("[data-projects-list]");
    const sections = getSections(markdown);

    if (!list) {
        return;
    }

    list.innerHTML = sections.map((item) => {
        const lines = item.body.split("\n").map((l) => l.trim()).filter(Boolean);
        const gif = resolveMedia(lines.find((l) => l.startsWith("Gif:"))?.replace("Gif:", "").trim() || "", basePath);
        const start = lines.find((l) => l.startsWith("Start:"))?.replace("Start:", "").trim() || "";
        const end = lines.find((l) => l.startsWith("End:"))?.replace("End:", "").trim() || "";
        const tags = lines.find((l) => l.startsWith("Tags:"))?.replace("Tags:", "").trim() || "";
        const links = lines.find((l) => l.startsWith("Links:"))?.replace("Links:", "").trim() || "";
        const descLines = item.body.split("\n")
            .filter((l) => !["Gif:", "Start:", "End:", "Tags:", "Links:"].some((f) => l.trim().startsWith(f)));
        const description = renderParagraphs(descLines.join("\n"));

        const thumbHtml = gif
            ? `<img src="${escapeHtml(gif)}" alt="">`
            : "";

        const tagsHtml = tags
            ? `<div class="project-tags">${tags.split(",").map((t) => `<span class="project-tag">${escapeHtml(t.trim())}</span>`).join("")}</div>`
            : "";

        const linksHtml = links
            ? `<div class="project-links">${renderInlineMarkdown(links)}</div>`
            : "";
        const dateHtml = start || end
            ? `<p class="project-date">${escapeHtml([start, end].filter(Boolean).join(" - "))}</p>`
            : "";

        return `
            <article class="project-card">
                <div class="project-thumb">${thumbHtml}</div>
                <div class="project-body">
                    <h3 class="project-title">${renderInlineMarkdown(item.heading)}</h3>
                    ${dateHtml}
                    ${item.subheading ? `<p class="project-tagline">${renderInlineMarkdown(item.subheading)}</p>` : ""}
                    <div class="project-description">${description}</div>
                    ${tagsHtml}
                    ${linksHtml}
                </div>
            </article>
        `;
    }).join("");
}

function drawPaperNoise() {
    const paperNoise = document.querySelector("[data-paper-noise]");

    if (!paperNoise) {
        return;
    }

    const context = paperNoise.getContext("2d");
    const pixelRatio = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const spacing = 22;
    const radius = 3.5;

    paperNoise.width = width * pixelRatio;
    paperNoise.height = height * pixelRatio;
    paperNoise.style.width = `${width}px`;
    paperNoise.style.height = `${height}px`;
    context.scale(pixelRatio, pixelRatio);

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "rgba(0, 0, 0, 0.07)";

    for (let row = 0; row * spacing < height + spacing; row++) {
        for (let col = 0; col * spacing < width + spacing; col++) {
            const x = col * spacing + spacing / 2;
            const y = row * spacing + spacing / 2;
            context.beginPath();
            context.arc(x, y, radius, 0, Math.PI * 2);
            context.fill();
        }
    }
}

async function renderSite() {
    const [profile, work, publications, projects, spotlights] = await Promise.all([
        fetchMarkdown(markdownFiles.profile),
        fetchMarkdown(markdownFiles.work),
        fetchMarkdown(markdownFiles.publications),
        fetchMarkdown(markdownFiles.projects),
        fetchMarkdown(markdownFiles.spotlights)
    ]);

    renderNavigation(getMarkdownField(profile, "Name") || getTitle(profile));
    renderProfile(profile, getBasePath(markdownFiles.profile));
    setupProfileContactActions();
    renderWork(work, getBasePath(markdownFiles.work));
    renderPublications(publications, getBasePath(markdownFiles.publications));
    renderProjects(projects, getBasePath(markdownFiles.projects));
    renderSpotlights(spotlights, getBasePath(markdownFiles.spotlights));
    drawPaperNoise();
}

let paperNoiseTimer;

window.addEventListener("resize", () => {
    window.clearTimeout(paperNoiseTimer);
    paperNoiseTimer = window.setTimeout(drawPaperNoise, 160);
});

renderSite().catch((error) => {
    console.error(error);
});
