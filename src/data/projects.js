// Single source of truth for all case studies.
// Home page Work section renders summary; /work/:slug renders the full study.
// featured: true → always visible on home; false → behind "Show more".

const PROJECTS = [
  {
    featured: true,
    slug: "tech-intelligence-powerhouse",
    label: "// Published build",
    title: "AI Tech Intelligence Powerhouse",
    summary:
      "Pulls from five free sources — HackerNews, Dev.to, GitHub Trending, TechCrunch, Reddit — scores and deduplicates every story, runs each batch through an AI analysis loop, then publishes to seven channels in parallel. Full audit trail on every run. Zero paid APIs.",
    tags: ["n8n", "Groq / LLaMA-3", "Telegram", "Discord", "Gmail", "Dev.to", "Hashnode", "GitHub Gist", "Slack"],
    problem:
      "Staying current on tech means checking five different sites every morning, deciding what matters, and rewriting the good stuff for every channel you publish to. Do that manually and it eats an hour a day — skip it and your newsletter, Telegram channel, and blog all go quiet.",
    solution:
      "A dual-trigger n8n pipeline (daily 7 AM schedule plus on-demand webhook) that fetches from five free sources in a batch loop, normalizes RSS and JSON into one schema, deduplicates by URL, and scores every story on keywords, recency, and engagement. The top 20 go through a Groq LLaMA-3 analysis loop that extracts category, sentiment, key insight, and trending flags. Four content streams are generated in parallel — newsletter HTML, social posts, chat embeds, executive summary — and a priority router decides which of seven channels each piece hits.",
    outcome:
      "One pipeline replaces the entire daily research-and-publish routine across seven channels. Quality gates drop weak stories before they reach the AI loop, so output stays high-signal. Every run logs to Airtable with success rates and a Telegram run report — and the whole stack runs on free-tier APIs.",
    steps: [
      "Schedule or webhook trigger fires; pipeline config seeds run ID, date, and quality thresholds",
      "Batch loop fetches HackerNews, Dev.to, GitHub Trending, TechCrunch, and Reddit; RSS is XML-parsed, JSON goes straight to the normalizer",
      "Stories are aggregated, deduplicated by URL, and scored 0–100 on keywords, recency, and engagement; scores under the gate are dropped",
      "Groq LLaMA-3 analyzes each batch of five stories — category, sentiment, key insight, trending flag, importance",
      "Four parallel generators build the newsletter, Twitter/LinkedIn posts, Telegram/Discord embeds, and a Markdown executive summary",
      "A priority switch routes content to all seven channels, four channels, or archive-only based on quality",
      "Publish results merge into run stats, log to Airtable, and a run report lands in Telegram; an error guard emails the admin on any node failure",
    ],
    image: "/work/tech-intelligence-powerhouse.png",
  },
  {
    featured: true,
    slug: "journalist-database",
    label: "// Client work — PR agency",
    title: "Journalist Database System",
    summary:
      "A daily scraper reads Techmeme, extracts journalist bylines with structured AI output, and keeps an Airtable database current — insert new, update existing. A separate backfill loop enriched 6,000 legacy journalist records without manual data entry.",
    tags: ["n8n", "Grok-4.1", "Airtable", "Structured Output", "Techmeme"],
    problem:
      "A PR agency's journalist database goes stale the moment it's built. New reporters appear on beats daily, old contacts move outlets, and nobody has time to re-verify a thousand rows by hand — so pitches go to the wrong people.",
    solution:
      "Two n8n workflows against one Airtable base. The daily scraper fetches Techmeme every morning, parses article bylines, and runs each through Grok-4.1 with a structured output parser to extract and enrich journalist details — then checks if the journalist already exists and either updates the row or inserts a new one. A separate backfill workflow looped the 6,000 existing legacy records through the same AI enrichment with a wait node for rate limiting.",
    outcome:
      "The database now maintains itself: new tech journalists appear in Airtable the morning they publish, existing records stay current, and the 6,000-contact backlog was enriched by machine instead of by an intern with a spreadsheet. The team pitches from live data.",
    steps: [
      "Schedule trigger fetches the Techmeme front page daily",
      "Parser extracts articles; each item enters the enrichment loop",
      "Grok-4.1 with a structured output parser extracts journalist name, outlet, and beat from each article",
      "Validity filter drops non-journalist entries",
      "Airtable lookup checks whether the journalist already exists",
      "Existing records get updated; new journalists get inserted",
      "Separate backfill flow processed 6,000 legacy rows through the same AI enrichment, rate-limited with wait nodes",
    ],
    image: "/work/journalist-database.png",
  },
  {
    featured: true,
    slug: "journalist-updater",
    label: "// Client work — PR agency",
    title: "Journalist Updater Agent",
    summary:
      "Walks the journalist database row by row, spots missing fields, and fills them using live AI web research — including a dedicated phone-number finder with deep-research fallback. Only writes back when enrichment is actually found.",
    tags: ["n8n", "Perplexity Sonar Pro", "Deep Research", "Google Sheets", "Airtable"],
    problem:
      "Even a maintained journalist database has holes — missing phone numbers, outdated outlets, empty beat fields. Researching one journalist properly takes 10–15 minutes of googling. Multiply by hundreds of incomplete rows and it never gets done.",
    solution:
      "An n8n agent that reads the journalist database, identifies which fields are missing per row, and routes only the incomplete ones into an AI web-research chain: Perplexity Sonar Pro handles standard enrichment, a dedicated phone-number finder runs with Perplexity Deep Research as fallback, and a structured extractor turns the research into clean database fields. Rows that need nothing are skipped; rows that fail research are left untouched rather than polluted.",
    outcome:
      "Field gaps get filled by an agent that does real web research per contact, not bulk guessing. The team stopped doing manual journalist lookups, and the database converges toward complete instead of decaying. Runs on both Google Sheets and Airtable versions.",
    steps: [
      "Trigger starts the enrichment run; workflow reads the journalist database",
      "Loop processes each journalist row and identifies missing data fields",
      "Gate checks: does this row need enrichment? Complete rows skip the AI entirely",
      "Perplexity Sonar Pro researches the journalist across the live web; a structured parser extracts fields",
      "A dedicated phone-number finder runs next, escalating to Perplexity Deep Research when the first pass fails",
      "Enriched data is finalized and merged; the journalist record is updated in place",
    ],
    image: "/work/journalist-updater.png",
  },
  {
    featured: true,
    slug: "newsjack-agent",
    label: "// Client work — PR agency",
    title: "NewsJack Agent",
    summary:
      "The PR team asks for newsjacking angles in Slack; the agent finds recent relevant articles, matches them against client positioning, and returns formatted opportunities with one-click send buttons. Separate prod and test channel routing built in.",
    tags: ["n8n", "AI Agent", "Slack", "Airtable", "OpenRouter", "Zoho"],
    problem:
      "Newsjacking only works fast — a story breaks, and the pitch has to land while it's hot. But finding the right breaking article, matching it to the right client angle, and formatting a pitch takes the team an hour. By then the window is closing.",
    solution:
      "A webhook-triggered n8n agent wired into Slack. The team sends a request; an AI prompt builder assembles the query (archived to Zoho for reuse), then an article-finder agent searches the recent-articles tables, matches stories against the brief, and posts formatted opportunities back to Slack — with interactive send buttons and a no-articles-found path. A channel switch routes every message to prod, user, or test channels so the team can iterate without spamming the main channel.",
    outcome:
      "Newsjacking went from an hour of manual research to a Slack message and a coffee refill. The team gets ranked, formatted opportunities while the story is still hot, and one click sends them onward.",
    steps: [
      "Team member triggers the agent from Slack; webhook receives the request",
      "Inputs are prepared and checked — blank prompts route to the AI prompt builder, which archives the built prompt to Zoho",
      "Slack is notified the agent has started; recent-article tables are refreshed",
      "The article-finder AI agent searches Airtable and n8n data tables for stories matching the brief",
      "Found articles are formatted and ordered; Slack messages go out with send buttons",
      "No matches? The agent says so explicitly in the channel instead of going silent",
      "Every output routes through a prod/user/test channel switch",
    ],
    image: "/work/newsjack-agent.png",
  },
  {
    featured: true,
    slug: "blog-generator",
    label: "// Client work — PR agency",
    title: "Blog Content Generator",
    summary:
      "Five stages, each on the model best suited for it: outline generation, per-topic research agents, final drafting on Claude Sonnet 4.5, title generation on GPT-5 — wired to a custom web app and Slack. A blog draft that used to take a day now takes minutes.",
    tags: ["n8n", "Claude Sonnet 4.5", "GPT-5", "GPT-4.1-mini", "Lovable", "Slack"],
    problem:
      "Agency blog posts stall in the pipeline: someone has to outline, research each section, draft, and title every piece. A single post ties up a writer for the better part of a day, so content ships late or not at all.",
    solution:
      "A five-stage n8n pipeline behind a custom web app. The app sends the request via webhook; a newsletter-expert agent and outline generator (GPT-4.1-mini with structured output) plan the piece; the outline is split and each topic gets its own research agent pass; an editor agent on Claude Sonnet 4.5 assembles the final version; GPT-5 generates the title; and the finished draft returns to both the app and Slack. Each stage runs on the model that's actually best at that job, not one model for everything.",
    outcome:
      "Draft-in-minutes instead of draft-in-a-day. The team reviews and edits instead of staring at blank pages, and the multi-model split keeps quality up where a single-model pipeline goes generic.",
    steps: [
      "The custom app (built on Lovable) submits topic and parameters via webhook",
      "Newsletter-expert agent frames the piece; outline generator produces a structured outline (GPT-4.1-mini)",
      "Outline splits into topics; each topic runs through its own research agent, results merge back",
      "Editor agent on Claude Sonnet 4.5 writes the final version from outline plus research",
      "GPT-5 generates the title; output is formatted",
      "Draft returns to the web app and posts to Slack simultaneously",
    ],
    image: "/work/blog-generator.png",
  },
  {
    featured: true,
    slug: "rss-intelligence-hub",
    label: "// Published build",
    title: "RSS Intelligence Hub",
    summary:
      "Thirty-five nodes: three feeds fetched in a loop, articles scored and gated on quality, top ten curated, five platform-native formats built in parallel, then a priority router decides what publishes where — high-signal stories hit all six channels, low-signal ones archive quietly.",
    tags: ["n8n", "RSS", "Quality Gates", "Priority Routing", "Airtable", "Telegram"],
    problem:
      "RSS feeds give you everything, which means mostly noise. Republishing feed content across channels manually means either flooding your audience with filler or spending an hour a day curating by hand.",
    solution:
      "A 35-node n8n pipeline with dual triggers (every 6 hours scheduled, plus manual webhook with custom config). Three feeds are fetched one-by-one in a batch loop handling both RSS 2.0 and Atom, articles are deduplicated and scored on recency, keywords, and content depth, and only stories clearing the quality threshold survive. The top 10 are transformed into five platform-native formats simultaneously, then a priority router sends high-priority items to all six channels, normal items to four (skipping Slack), and low-priority ones to archive-only — with a business-hours gate for time-sensitive channels.",
    outcome:
      "Feeds get read, scored, and republished without a human in the loop — but the quality gate and priority tiers mean channels only get what's worth their attention. Structured execution records land in Airtable, and a separate Telegram report confirms each run.",
    steps: [
      "Schedule (every 6 hours) or manual webhook trigger starts a run with a traceable run ID",
      "Three RSS feeds are fetched and parsed in a batch loop — RSS 2.0 and Atom both handled",
      "Articles are aggregated, deduplicated by URL, timestamp-normalized, then scored and classified",
      "Quality gate keeps only articles scoring 20+ and recent; survivors are ranked and the top 10 curated",
      "Five parallel transforms build the Twitter thread, LinkedIn post, newsletter HTML, Discord embed, and plain-text digest",
      "Priority router: high → all 6 channels, normal → 4 channels, low → GitHub Gist + Airtable archive only; business-hours gate holds time-sensitive sends",
      "All publish results merge into a run summary — Airtable log plus Telegram confirmation",
    ],
    image: "/work/rss-intelligence-hub.png",
  },
  {
    featured: true,
    slug: "content-repurposing-engine",
    label: "// Published build",
    title: "Content Repurposing Engine",
    summary:
      "One article URL in. The engine extracts and cleans the text, scores it, and rebuilds it as a Twitter thread, LinkedIn post, HTML newsletter, Dev.to article, and Hashnode post — simultaneously — then publishes to six platforms and returns a full manifest to the caller.",
    tags: ["n8n", "Webhook API", "Parallel Transform", "Dev.to", "Hashnode", "Telegram", "Discord"],
    problem:
      "You write one good article, and then the real work starts: a thread version for X, a professional cut for LinkedIn, a newsletter block, platform-specific formats for Dev.to and Hashnode. Repurposing one piece across six platforms takes longer than writing it did.",
    solution:
      "A webhook API built in n8n. POST a URL with title and tags; the engine fetches the raw HTML (no auth needed, any public article), strips and cleans it, extracts headings and key sentences, and scores content quality. Five Code nodes then transform the same article into five platform-native formats simultaneously. A quality gate checks score, title, and format count before anything publishes — bad content publishes nowhere. Six platforms fire in parallel, and the caller gets back a JSON manifest with every platform URL and status code.",
    outcome:
      "Six platforms from one URL, in one call, with a machine-readable manifest as the receipt. The quality gate protects every channel from weak content automatically, and an error guard alerts by Gmail if any of the 26 nodes fails.",
    steps: [
      "Webhook receives URL, title, and tags; pipeline config is seeded",
      "HTTP node fetches the source; Code nodes strip HTML, extract structure, and score content quality",
      "Five parallel transforms: numbered Twitter thread, LinkedIn post, styled HTML newsletter, Dev.to Markdown, Hashnode GraphQL payload",
      "Merge assembles one unified payload — all formats plus metadata and pipeline ID",
      "Quality gate enforces content score > 10, non-empty title, and 3+ formats; failures publish nowhere",
      "Six publishers fire simultaneously: Dev.to, Hashnode, Telegram, Discord, Gmail newsletter, GitHub Gist",
      "Publish manifest with platform URLs and status codes returns to the webhook caller; Airtable logs the run",
    ],
    image: "/work/content-repurposing-engine.png",
  },
  {
    featured: true,
    slug: "github-oss-hub",
    label: "// Published build",
    title: "GitHub OSS Intelligence Hub",
    summary:
      "Five GitHub search queries plus HackerNews, ranked on a weighted score — stars, recent activity, issue opportunities, topic relevance. AI analysis explains why each repo matters and flags hidden gems. Ships a developer briefing across seven channels daily.",
    tags: ["n8n", "GitHub API", "Groq", "Weighted Scoring", "HackerNews", "Telegram"],
    problem:
      "Interesting open-source projects surface constantly, but finding them means scrolling GitHub trending, HackerNews, and newsletters — and star counts alone don't tell you whether a repo is actually worth your evening.",
    solution:
      "A dual-source n8n pipeline: five GitHub search queries (AI tools, automation, CLI tools, dev utils, open-source projects) run through the API loop while HackerNews RSS is parsed for tech stories. Everything merges, deduplicates, and ranks on a weighted score — stars 30%, recent activity 25%, issue opportunities 20%, topic relevance 25%. The top 25 pass a quality gate into a per-repo enrichment loop (full metadata, open issues, contributor stats, license), then Groq analyzes each batch: why it's interesting, contribution difficulty, learning value 1–10, and hidden-gem flags. Five content outputs ship across up to seven channels.",
    outcome:
      "A daily developer briefing that explains why each repo matters instead of just listing stars — with contribution guides and a tech-radar update generated from the same analysis. Runs entirely on free APIs with full analytics logging.",
    steps: [
      "Daily 8 AM schedule or on-demand webhook starts the run; search config seeds topics, star thresholds, and language filters",
      "Five GitHub search queries loop through the API; HackerNews RSS is parsed in parallel; both merge",
      "Deduplication by URL, then weighted scoring: stars 30%, activity 25%, issue opportunities 20%, relevance 25%; quality gate at 20; top 25 selected",
      "Enrichment loop deep-fetches each repo — metadata, open issues, contributors, license",
      "Groq AI analyzes batches of four repos: why interesting, contribution difficulty, learning value 1–10, hidden-gem flags",
      "Five content generators run from the results: daily digest, contribution guide, tech-radar update, social posts, executive summary",
      "Distribution switch routes by priority to up to seven channels; run analytics log to Airtable and archive to GitHub Gist",
    ],
    image: "/work/github-oss-hub.png",
  },
  {
    featured: true,
    slug: "knowledge-capture",
    label: "// Published build",
    title: "Personal Knowledge Capture",
    summary:
      "Forward anything to a Telegram bot — a link, a thought, a paragraph. AI extracts the title, summary, category, and action items into an auto-organized Airtable wiki. Search and stats commands built in, plus weekly spaced-repetition resurfacing so old notes come back.",
    tags: ["n8n", "Telegram Bot", "Groq", "Airtable", "Spaced Repetition"],
    problem:
      "Notes apps are where ideas go to die. You save the link, you never see it again, and search only helps if you remember what you saved. Capture is easy — organization and recall are what actually fail.",
    solution:
      "A Telegram bot backed by n8n and Airtable. Send it anything: a mode switch routes between capture, search, stats, and help. URLs are detected by regex, fetched, and stripped to text; raw thoughts go straight through. Groq extracts the title, summary, category, tags, key concepts, action items, and an importance level, and the note lands in an Airtable knowledge base with instant confirmation. A second trigger runs every Sunday at 9 AM: it fetches old notes, scores them by age and surface count, and sends the top N back to you as formatted cards — spaced repetition for your own notes.",
    outcome:
      "Capture became one forward instead of app-switching and folder-filing — and the weekly resurfacing loop means old notes actually return instead of rotting. Search and stats live in the same chat where capture happens.",
    steps: [
      "Telegram webhook receives anything — link, thought, command; parser extracts text, chat ID, and command",
      "Mode switch routes: capture, search, stats, resurface, or help",
      "Capture path: regex detects URLs, fetches and strips the page, otherwise uses the raw text directly",
      "Groq extracts title, summary, category, tags, key concepts, action items, and importance",
      "Note saves to the Airtable knowledge base; confirmation with title and category returns instantly",
      "Search path builds an Airtable filterByFormula query across titles, tags, and summaries; results format back to chat",
      "Every Sunday 9 AM: old notes are scored by age and surface count, and the top picks return as formatted resurface cards",
    ],
    image: "/work/knowledge-capture.png",
  },
  {
    featured: false,
    slug: "tech-intelligence-engine",
    label: "// Published build",
    title: "AI Tech Intelligence Engine",
    summary:
      "Every weekday at 9 AM: HackerNews and TechCrunch are fetched in parallel, normalized into one schema, quality-gated, and batch-analyzed by Claude. Out the other end: a styled HTML email, a structured Notion page, and a Slack summary — routed by day of week.",
    tags: ["n8n", "Claude API", "Gmail", "Notion", "Slack", "Airtable"],
    problem:
      "A daily tech briefing is only useful if it's actually daily. Reading two news sites, picking the stories that matter, tagging them, and writing a digest for email, Notion, and Slack is 45 minutes of morning work that gets skipped the moment the week gets busy.",
    solution:
      "A scheduled n8n pipeline that fires weekdays at 9 AM. HackerNews top stories and TechCrunch RSS are fetched in parallel, mapped to a unified schema, deduplicated by URL, and gated on score. SplitInBatches feeds Claude five stories per cycle — respecting API rate limits — and Claude returns structured JSON per story: category, sentiment, relevance score 1–10, and a two-sentence summary. The enriched set becomes a styled HTML email, a Notion database page with Markdown body, and a Slack channel summary; a day-of-week switch sends the full digest Mon–Fri and a summary-only format on weekends.",
    outcome:
      "The briefing ships every weekday whether anyone remembers or not. Claude's relevance scoring keeps filler out, the Notion page builds a searchable archive over time, and execution metrics — duration, story count, token estimate — log to Airtable for pipeline observability and SLA monitoring.",
    steps: [
      "Schedule trigger fires 9 AM weekdays; pipeline variables (report date, batch size, max stories) are seeded",
      "HackerNews Firebase API and TechCrunch RSS are fetched in parallel — top 15 story IDs get individual detail fetches, XML parses to JSON",
      "Merge combines both streams; stories map to one schema, deduplicate by URL, and pass a quality-score gate of 10+",
      "SplitInBatches processes five stories per cycle; Claude analyzes each batch and returns structured JSON — category, sentiment, relevance 1–10, summary",
      "Aggregate collects enriched stories; generators build the styled HTML email, Notion Markdown report, and channel summary",
      "IF gate verifies stories exist; day-of-week switch picks full digest (weekdays) or summary format (weekends)",
      "Gmail, Notion, and Slack all publish simultaneously; execution metrics log to Airtable; an error trigger emails an admin alert on any failure",
    ],
    image: "/work/tech-intelligence-engine.png",
  },
  {
    featured: false,
    slug: "email-automation",
    label: "// Published build",
    title: "Multi-Agent Email Automation",
    summary:
      "Gmail trigger, AI classifier, then a switch routes every email to one of four specialist AI responders — order status, refunds, product questions, general. Each writes a personalized reply from its own template set; everything logs to Notion.",
    tags: ["n8n", "OpenAI", "Gmail", "Notion", "Multi-Agent"],
    problem:
      "A shared inbox fills with the same four kinds of email — order status, refund requests, product questions, everything else — and each needs a different tone and different information. One generic auto-responder makes it worse; answering all of them by hand takes hours a day.",
    solution:
      "A multi-agent n8n pipeline on the Gmail trigger. Incoming email is parsed, then an AI classifier reads it and decides the category; the result is parsed, logged to Notion, and matched against email templates. A switch routes to one of four specialist AI personalizers — order status, refund, product, general — each with its own tools and prompt tuned to that request type. The chosen agent's reply merges back into one stream, the reply text is extracted, and Gmail sends the response in-thread.",
    outcome:
      "Every email gets a category-appropriate, personalized reply instead of one generic template — and the four-specialist split means each agent stays simple and on-tone. Notion keeps the audit log of what was classified and answered.",
    steps: [
      "Gmail trigger fires on incoming email; subject, sender, and body are extracted",
      "AI classifier assigns the email to one of four categories",
      "Classification is parsed, logged to Notion, and matched to the email template set",
      "Switch routes by category to the specialist responder: order status, refund, product, or general",
      "The specialist AI agent writes a personalized reply using its templates and tools",
      "Merge collects the four branches; reply text is extracted and sent back through Gmail in-thread",
    ],
    image: "/work/email-automation.png",
  },
  {
    featured: false,
    slug: "spreadsheet-validator",
    label: "// Published build",
    title: "Spreadsheet Data Validator & Cleaner",
    summary:
      "Every 30 minutes, unvalidated Airtable rows get run through deterministic rules — email regex, phone normalization, duplicate and z-score outlier checks — with AI normalization for what rules can't fix. Clean rows patch back automatically; flagged rows alert to Telegram.",
    tags: ["n8n", "Airtable", "Groq", "Data Validation", "Telegram"],
    problem:
      "Shared spreadsheets rot: emails with typos, phone numbers in five formats, duplicate entries, numeric outliers from fat-fingered zeros. Manual cleanup is mind-numbing and never keeps up with new rows.",
    solution:
      "A dual-trigger n8n validator — every 30 minutes on schedule, plus a manual webhook. It fetches Airtable rows where ValidationStatus is empty, explodes them into per-row items, and runs a deterministic validation engine: email regex, phone normalization, duplicate detection, z-score outlier checks. Rows needing more than rules can fix go to Groq for field normalization, and the AI result OR-merges with the deterministic fixes. A PATCH payload per row applies fixes or sets flags, batch statistics are computed, and flagged rows produce a detailed Telegram alert.",
    outcome:
      "The spreadsheet cleans itself on a 30-minute loop: fixable problems get fixed in place, unfixable ones get flagged with specifics instead of sitting silent. Every validation run logs to an Airtable ValidationRuns table, so data quality is auditable over time.",
    steps: [
      "Schedule (every 30 min) or manual webhook trigger; validation rules are defined in code",
      "Airtable rows with empty ValidationStatus are fetched — the unprocessed batch",
      "Rows explode into items; SplitInBatches iterates one row at a time, all rows kept for duplicate and outlier checks",
      "Deterministic validation engine runs: email regex, phone normalization, duplicate detection, z-score outliers; unfixable issues get flagged",
      "Rows needing normalization go to Groq; AI fixes OR-merge with the deterministic path",
      "PATCH payload per row applies fixes or sets flags in Airtable; loop collects results",
      "Batch statistics are computed; flagged rows send a detailed Telegram alert; the full run logs to a ValidationRuns table",
    ],
    image: "/work/spreadsheet-validator.png",
  },
  {
    featured: false,
    slug: "morning-brief",
    label: "// Published build",
    title: "Daily Morning Brief",
    summary:
      "Weather and the top HackerNews stories, fetched in parallel at 8 AM on weekdays, merged into one styled brief, and delivered to Gmail and Telegram simultaneously. Zero paid APIs, zero credentials for the news sources.",
    tags: ["n8n", "Open-Meteo", "HackerNews API", "Gmail", "Telegram"],
    problem:
      "The morning routine of checking the weather app, then HackerNews, then deciding what's worth reading, repeats every single day. It's five minutes that fragments into twenty once the scrolling starts.",
    solution:
      "A weekday 8 AM n8n pipeline on entirely free APIs. Open-Meteo (live weather — no key needed) and the HackerNews Firebase API fetch in parallel; weather is parsed into condition, temperature, wind, and rain probability, and the HN ID list is sliced to the top 8 stories with full detail fetches. Everything merges into one stream that builds both a styled HTML email and a Telegram-formatted message. A weekday gate blocks weekend runs, then both channels deliver simultaneously.",
    outcome:
      "One glance at 8 AM replaces the morning scroll: weather plus the eight stories worth knowing, in the inbox and in Telegram. The whole stack costs nothing to run — no API keys for either data source.",
    steps: [
      "Schedule trigger fires 8 AM; parallel fetch begins — no credentials needed for either source",
      "Open-Meteo returns live weather; HackerNews Firebase returns top story IDs",
      "Weather parses to condition, °C/°F, wind, and rain probability; HN IDs slice to the top 8",
      "Full story details are fetched per ID and normalized — title, URL, score, author, comment count",
      "Merge appends weather and stories into one stream; both the HTML email and Telegram text are built in one pass",
      "Weekday gate (Mon–Fri only) blocks weekend sends; Gmail and Telegram deliver in parallel",
    ],
    image: "/work/morning-brief.png",
  },
];

export default PROJECTS;
export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug);
