// Question set for the agent website build. Edit here; the app renders from this.
// Types: text, email, tel, url, number, textarea, radio, checkbox, select, yesno, scale
window.INTAKE_VERSION = "1.0";
window.INTAKE_SECTIONS = [
{
  id: "about", title: "About you", icon: "01",
  intro: "The basics we need to get your name, license and contact details right everywhere on the site.",
  fields: [
    { id: "first_name", label: "First name", type: "text", required: true },
    { id: "last_name", label: "Last name", type: "text", required: true },
    { id: "display_name", label: "How should your name appear on the site?", type: "text", help: "Example: \"Jane Smith\" or \"Jane Smith, REALTOR®\" or a team name.", required: true },
    { id: "title", label: "Your title", type: "text", help: "Example: REALTOR®, Affiliate Broker, Broker, Team Lead.", required: true },
    { id: "designations", label: "Designations and certifications", type: "text", help: "ABR, GRI, SRS, CRS, Luxury Home Specialist, etc. Leave blank if none." },
    { id: "license", label: "Tennessee license number", type: "text", help: "This has to show on the site by state rule.", required: true },
    { id: "other_states", label: "Licensed in any other states?", type: "text", help: "List them, or leave blank." },
    { id: "years", label: "Years in real estate", type: "number", required: true },
    { id: "office", label: "Which Wallace office are you with?", type: "select", required: true,
      options: ["Bearden", "Downtown", "Farragut", "Lakeside", "Nelson (Maryville)", "North", "Northshore", "West", "TN Valley", "Upper Cumberland", "Wallace Commercial", "Other / not sure"] },
    { id: "team", label: "Are you solo or part of a team?", type: "radio", required: true, options: ["Solo agent", "I lead a team", "I'm a member of a team"] },
    { id: "team_name", label: "Team name and who is on it", type: "textarea", help: "Names and roles. Tell us if each person needs their own page.", showIf: { id: "team", not: "Solo agent" } },
    { id: "phone", label: "Cell phone (the one you want on the site)", type: "tel", required: true },
    { id: "email", label: "Email for the site and for leads", type: "email", required: true },
    { id: "office_phone_show", label: "Show the office phone number too?", type: "yesno" },
    { id: "address_show", label: "What address should show on the site?", type: "radio", options: ["My Wallace office address", "A different address (tell us below)", "No address, just phone and email"] },
    { id: "address_other", label: "Address to show", type: "textarea", showIf: { id: "address_show", is: "A different address (tell us below)" } },
    { id: "gbp", label: "Google Business Profile", type: "radio", required: true, options: ["Yes, I have one and I manage it", "Yes, but I don't know how to get into it", "No, I don't have one", "Not sure"] },
    { id: "gbp_link", label: "Link to your Google Business Profile (or the name it shows under)", type: "text", showIf: { id: "gbp", in: ["Yes, I have one and I manage it", "Yes, but I don't know how to get into it"] } },
    { id: "headshot", label: "Do you have a professional headshot you like?", type: "radio", required: true, options: ["Yes, recent (within 2 years)", "Yes, but it's old", "No, I need one"] },
    { id: "logo", label: "Do you have a personal or team logo?", type: "radio", required: true, options: ["Yes, and I have the files", "Yes, but I only have a picture of it", "No, I use the Wallace logo", "No, and I'd like one"] },
    { id: "brand_colors", label: "Brand colors or fonts you already use", type: "textarea", help: "Hex codes if you know them. Or just say \"navy and gold\" or \"I have none\"." },
    { id: "tagline", label: "Do you have a tagline or slogan?", type: "text", help: "Example: \"Your Lake Life Starts Here\". Leave blank if none." },
    { id: "files_link", label: "Link to a folder with your headshot, logo, photos and any guides", type: "url", help: "Google Drive, Dropbox or OneDrive link set to \"anyone with the link can view\". You can also send these later by email." }
  ]
},
{
  id: "website", title: "Your website today", icon: "02",
  intro: "What you have now, what you own, and what you like and don't like.",
  fields: [
    { id: "has_site", label: "Do you have a website right now?", type: "radio", required: true, options: ["Yes", "No", "I have a Moxi agent page but never touched it"] },
    { id: "site_url", label: "Your current website address", type: "url", showIf: { id: "has_site", not: "No" } },
    { id: "site_like", label: "What do you like about your current site?", type: "textarea", showIf: { id: "has_site", not: "No" } },
    { id: "site_dislike", label: "What do you dislike or what's broken?", type: "textarea", showIf: { id: "has_site", not: "No" } },
    { id: "domain", label: "Do you own a domain name (like janesmithhomes.com)?", type: "radio", required: true, options: ["Yes, and I know where it's registered (GoDaddy, Namecheap, etc.)", "Yes, but I don't know where it's registered", "No, I need one", "No, I'll use a Wallace address"] },
    { id: "domain_names", label: "List every domain you own", type: "textarea", help: "One per line. Include old ones you don't use any more.", showIf: { id: "domain", in: ["Yes, and I know where it's registered (GoDaddy, Namecheap, etc.)", "Yes, but I don't know where it's registered"] } },
    { id: "domain_ideas", label: "Domain name ideas you'd like", type: "textarea", help: "Give us 3 to 5 ideas and we'll check what's available.", showIf: { id: "domain", is: "No, I need one" } },
    { id: "platform", label: "Where should the new site live?", type: "radio", required: true, options: ["Moxi agent site (same system as WallaceTN.com)", "Somewhere else (tell us below)", "I'll let Howard decide"] },
    { id: "platform_other", label: "Where, and why?", type: "textarea", showIf: { id: "platform", is: "Somewhere else (tell us below)" } },
    { id: "analytics", label: "Do you have Google Analytics or Google Search Console set up?", type: "radio", options: ["Yes, both", "Yes, one of them", "No", "Not sure"] },
    { id: "access_note", label: "Access we will need later (do NOT type passwords here)", type: "checkbox", help: "Check what you can give us access to. We'll collect logins securely, never through this form.",
      options: ["Domain registrar", "Current website", "Google Business Profile", "Google Analytics / Search Console", "Facebook / Instagram business pages", "YouTube channel", "Zillow / Realtor.com profiles", "Email marketing tool (Mailchimp, etc.)"] },
    { id: "admire_sites", label: "3 websites you love (any industry) and why", type: "textarea", required: true, help: "Paste the address and one line on what you like. Other agents' sites are great examples." },
    { id: "hate_sites", label: "Anything you've seen on other sites that you do NOT want", type: "textarea" },
    { id: "design_words", label: "3 words that should describe the look of your site", type: "text", required: true, help: "Example: clean, warm, upscale. Or: bold, modern, fun." },
    { id: "design_style", label: "Pick the style closest to what you want", type: "radio", required: true, options: ["Luxury and understated (dark tones, serif fonts, lots of space)", "Bright and friendly (light, warm colors, approachable)", "Modern and bold (strong colors, big photos, punchy words)", "Classic and trustworthy (navy, traditional, straightforward)", "Not sure, show me options"] }
  ]
},
{
  id: "market", title: "Your market", icon: "03",
  intro: "Google ranks pages for places. We will build one strong page for each place you name here, so be specific and honest about where you really work.",
  fields: [
    { id: "area_1", label: "#1 area you want to own", type: "text", required: true, help: "A town, neighborhood, lake or county. Example: Farragut, Tellico Village, Norris Lake, Hardin Valley." },
    { id: "area_2", label: "#2 area", type: "text", required: true },
    { id: "area_3", label: "#3 area", type: "text", required: true },
    { id: "area_4", label: "#4 area", type: "text" },
    { id: "area_5", label: "#5 area", type: "text" },
    { id: "area_6", label: "#6 area", type: "text" },
    { id: "counties", label: "Counties you work in", type: "checkbox", required: true,
      options: ["Knox", "Blount", "Anderson", "Loudon", "Roane", "Sevier", "Jefferson", "Union", "Grainger", "Campbell", "Monroe", "Cumberland", "Hamblen", "Cocke", "Claiborne", "Morgan", "Rhea", "Fentress", "Hawkins", "Sullivan", "Other"] },
    { id: "counties_other", label: "Other counties", type: "text", showIf: { id: "counties", has: "Other" } },
    { id: "home_base", label: "Where do you live?", type: "text", required: true, help: "Town or neighborhood. People trust agents who live where they sell." },
    { id: "closings_where", label: "Where were most of your closings in the last 2 years?", type: "textarea", required: true, help: "Towns or ZIP codes. Rough is fine." },
    { id: "travel", label: "How far will you travel for a client?", type: "radio", options: ["Within 20 minutes of home", "Within 45 minutes", "Anywhere in East Tennessee", "Anywhere in Tennessee"] },
    { id: "no_areas", label: "Areas you do NOT want to be known for", type: "textarea" },
    { id: "local_knowledge", label: "What do you know about your top area that most agents don't?", type: "textarea", required: true, help: "Schools, HOA quirks, flood zones, septic, short-term rental rules, lake levels, new builder phases. This is what makes your pages better than Zillow." },
    { id: "local_favorites", label: "Your favorite local spots in your top areas", type: "textarea", help: "Coffee shops, restaurants, parks, trails, boat ramps, events. We use these for community pages." }
  ]
},
{
  id: "niche", title: "Niches and clients", icon: "04",
  intro: "Who you serve and what kind of homes you sell.",
  fields: [
    { id: "specialties", label: "What do you specialize in?", type: "checkbox", required: true,
      options: ["Luxury homes", "Lakefront / waterfront", "Mountain homes and cabins", "New construction", "First-time buyers", "Relocation (moving to East TN)", "Downsizing / 55+", "Investors and rentals", "Short-term rental cabins", "Land, farms and acreage", "Horse properties", "Condos and townhomes", "Military / VA buyers", "Historic homes", "Commercial", "Golf communities", "Gated communities", "Other"] },
    { id: "specialties_other", label: "Other specialty", type: "text", showIf: { id: "specialties", has: "Other" } },
    { id: "top_specialty", label: "If you could only be known for ONE thing, what is it?", type: "text", required: true },
    { id: "client_split", label: "Buyers vs sellers", type: "radio", required: true, options: ["Mostly buyers", "Mostly sellers", "About half and half"] },
    { id: "client_type", label: "Who is your typical client?", type: "textarea", required: true, help: "Age, stage of life, where they come from, what they want. Example: \"Retirees from Florida and the Midwest buying lake homes $500k to $1M.\"" },
    { id: "price_typical", label: "Your typical price range", type: "select", required: true, options: ["Under $250k", "$250k to $400k", "$400k to $600k", "$600k to $1M", "$1M to $2M", "Over $2M"] },
    { id: "price_high", label: "Highest sale you've closed", type: "text", help: "Rough number is fine." },
    { id: "price_target", label: "Price range you WANT to work in", type: "select", options: ["Same as now", "Under $250k", "$250k to $400k", "$400k to $600k", "$600k to $1M", "$1M to $2M", "Over $2M"] },
    { id: "luxury_member", label: "Are you part of Wallace Luxury or Luxury Portfolio International?", type: "yesno" },
    { id: "builders", label: "Builders or developments you work with", type: "textarea", help: "Names of builders, communities or phases you sell in." },
    { id: "languages", label: "Languages you speak besides English", type: "text" },
    { id: "out_of_state", label: "What share of your clients move from out of state?", type: "radio", options: ["Almost none", "About a quarter", "About half", "Most of them"] },
    { id: "from_where", label: "Where do your out-of-state clients come from?", type: "text", help: "Example: Florida, Ohio, Michigan, California.", showIf: { id: "out_of_state", not: "Almost none" } }
  ]
},
{
  id: "proof", title: "Proof and reviews", icon: "05",
  intro: "Numbers, awards and reviews make people trust you before they call. Only give us what you are OK showing in public.",
  fields: [
    { id: "vol_last_year", label: "Sales volume last year (dollars)", type: "text", help: "Example: $12.5M. OK to leave blank." },
    { id: "units_last_year", label: "Homes sold last year", type: "number" },
    { id: "career_volume", label: "Career sales volume", type: "text" },
    { id: "career_units", label: "Career homes sold", type: "number" },
    { id: "dom", label: "Your average days on market for listings", type: "text", help: "If you know it." },
    { id: "list_to_sale", label: "Your average list-to-sale price ratio", type: "text", help: "Example: 99%. If you know it." },
    { id: "show_numbers", label: "Which of these numbers can we show on the site?", type: "checkbox", options: ["Sales volume", "Homes sold", "Days on market", "List-to-sale ratio", "Years in business", "None, please don't show numbers"] },
    { id: "awards", label: "Awards and rankings", type: "textarea", help: "Wallace awards, Knoxville Area Association of REALTORS® awards, Top Producer, Best of Knoxville, etc. Include years." },
    { id: "press", label: "Press, podcasts, TV or publications you've been in", type: "textarea" },
    { id: "community", label: "Community involvement", type: "textarea", help: "Boards, charities, sponsorships, church, schools, coaching. These matter a lot for local search." },
    { id: "review_sources", label: "Where do your reviews live?", type: "checkbox", required: true, options: ["Google", "Zillow", "Realtor.com", "Facebook", "TestimonialTree (Wallace)", "Yelp", "I don't have many reviews yet", "Other"] },
    { id: "review_counts", label: "About how many reviews on each, and your star rating", type: "textarea", help: "Example: Google 42 (5.0), Zillow 18 (4.9)." },
    { id: "review_permission", label: "May we show your reviews on the site?", type: "radio", required: true, options: ["Yes, all of them", "Yes, but let me pick", "No"] },
    { id: "best_reviews", label: "Paste 3 to 5 of your favorite reviews", type: "textarea", help: "Include the client's first name and the town if you can." },
    { id: "video_testimonials", label: "Do you have video testimonials?", type: "yesno" },
    { id: "featured_sales", label: "Past sales you'd like featured", type: "textarea", help: "Addresses or MLS numbers. 6 to 12 is ideal, with a photo if you have one." },
    { id: "case_story", label: "Tell us one deal you're proud of", type: "textarea", help: "What was the problem and how did you solve it? We turn this into a story on the site." }
  ]
},
{
  id: "story", title: "Your story and voice", icon: "06",
  intro: "This is the part no one else can write for you. Don't worry about grammar. Talk like you talk. Long answers are good here.",
  fields: [
    { id: "why_re", label: "Why did you get into real estate?", type: "textarea", required: true },
    { id: "before_re", label: "What did you do before real estate?", type: "textarea", required: true },
    { id: "tn_story", label: "How long have you lived in East Tennessee, and how did you get here?", type: "textarea", required: true },
    { id: "why_you", label: "Why should someone pick you over the other 900 Wallace agents?", type: "textarea", required: true, help: "Be honest and specific. \"I care about my clients\" doesn't help. \"I've lived on Norris Lake for 20 years and know every cove\" does." },
    { id: "three_words", label: "3 words your past clients would use to describe you", type: "text", required: true },
    { id: "misconception", label: "What do people get wrong about buying or selling in your area?", type: "textarea" },
    { id: "process_buyers", label: "Walk us through how you work with a buyer, in your own words", type: "textarea", required: true },
    { id: "process_sellers", label: "Walk us through how you work with a seller, in your own words", type: "textarea", required: true },
    { id: "tone", label: "How should the website sound?", type: "radio", required: true, options: ["Warm and personal, like a friend who knows real estate", "Polished and professional", "Direct and no-nonsense", "Upscale and quiet", "Fun and energetic"] },
    { id: "personal_ok", label: "What personal things are OK to show?", type: "checkbox", options: ["Family", "Pets", "Hobbies", "Faith", "Hometown and school", "Sports teams", "Volunteer work", "Keep it strictly business"] },
    { id: "personal_details", label: "Tell us about those (family, pets, hobbies, etc.)", type: "textarea", showIf: { id: "personal_ok", notHas: "Keep it strictly business" } },
    { id: "fun_fact", label: "A fun fact about you", type: "text" },
    { id: "never_say", label: "Anything we should NEVER say or show on your site", type: "textarea" },
    { id: "voice_memo", label: "Would you be willing to do a 20-minute recorded call so we can capture your voice?", type: "radio", options: ["Yes", "Maybe", "No, I'd rather write"] }
  ]
},
{
  id: "services", title: "Services and offers", icon: "07",
  intro: "What you do for clients and what you give away to earn their trust.",
  fields: [
    { id: "services", label: "Services you offer", type: "checkbox", required: true,
      options: ["Buyer representation", "Listing / seller representation", "Relocation help", "New construction guidance", "Luxury marketing", "Investment property help", "Land and lots", "Short-term rental setup advice", "Downsizing / estate sales", "Commercial", "Property management referrals", "Staging", "Professional photography and video", "Drone photos", "3D tours", "Home valuation", "Other"] },
    { id: "services_other", label: "Other services", type: "text", showIf: { id: "services", has: "Other" } },
    { id: "listing_extras", label: "What comes with every listing you take?", type: "textarea", help: "Pro photos, drone, video, staging consult, floor plans, open houses, social ads, mailers. This becomes your \"marketing plan\" page." },
    { id: "guides", label: "Guides or downloads you already have", type: "checkbox", options: ["Buyer guide", "Seller guide", "Relocation guide", "Neighborhood guide", "Pricing or market report", "MoxiPresent presentation", "None yet"] },
    { id: "guides_links", label: "Links to those guides", type: "textarea", showIf: { id: "guides", notHas: "None yet" } },
    { id: "lead_magnets", label: "Which free offers should the site have?", type: "checkbox", required: true, options: ["Instant home value", "Buyer guide download", "Relocation guide download", "New listing alerts", "Market report by email", "Free consultation", "Open house list", "Not sure, you pick"] },
    { id: "partners", label: "Lenders, title companies, inspectors or other partners to feature", type: "textarea", help: "Name, company and whether they've agreed to be listed." },
    { id: "guarantees", label: "Any guarantees or programs you offer", type: "textarea", help: "Example: cancel anytime listing, love it or leave it, cash offer program." },
    { id: "commission_talk", label: "Do you want the site to talk about your fees or commission?", type: "radio", options: ["Yes", "No", "Only in a general way"] }
  ]
},
{
  id: "leads", title: "Leads and follow-up", icon: "08",
  intro: "A site is only worth it if the leads reach you fast. Tell us exactly where they should go.",
  fields: [
    { id: "lead_email", label: "Email address(es) that should get every lead", type: "text", required: true, help: "Separate with commas if more than one." },
    { id: "lead_text", label: "Do you want a text message when a lead comes in?", type: "yesno", required: true },
    { id: "lead_text_phone", label: "Cell number for text alerts", type: "tel", showIf: { id: "lead_text", is: "Yes" } },
    { id: "crm", label: "What CRM or follow-up system do you use?", type: "select", required: true, options: ["MoxiEngage", "Follow Up Boss", "kvCORE / BoldTrail", "Lofty (Chime)", "BoomTown", "Sierra Interactive", "HubSpot", "A spreadsheet", "Nothing yet", "Other"] },
    { id: "crm_other", label: "Which one?", type: "text", showIf: { id: "crm", is: "Other" } },
    { id: "who_answers", label: "Who answers calls and leads?", type: "radio", required: true, options: ["I do, personally", "My assistant or team member", "An inside sales agent", "Depends on the day"] },
    { id: "response_time", label: "How fast do you usually respond to a new lead?", type: "radio", options: ["Within 5 minutes", "Within an hour", "Same day", "Next day"] },
    { id: "booking_link", label: "Calendar booking link (Calendly, etc.)", type: "url", help: "Leave blank if none." },
    { id: "forms_wanted", label: "Which forms do you want on the site?", type: "checkbox", required: true, options: ["Contact me", "What's my home worth", "Schedule a showing", "Buyer consultation", "Seller consultation", "Relocation questionnaire", "Join my newsletter", "Request a guide"] },
    { id: "lead_sources", label: "Where do your leads come from today?", type: "checkbox", options: ["Referrals and past clients", "Sphere / friends and family", "Zillow or Realtor.com (paid)", "Facebook / Instagram ads", "Google ads", "Open houses", "Door knocking / farming", "Social media (organic)", "YouTube", "Moxi / Wallace website", "Other"] },
    { id: "paid_spend", label: "About how much do you spend on marketing each month?", type: "select", options: ["$0", "Under $250", "$250 to $500", "$500 to $1,000", "$1,000 to $2,500", "Over $2,500"] },
    { id: "email_tool", label: "Do you send an email newsletter? With what tool?", type: "text" },
    { id: "lead_goal", label: "How many new leads a month would make this site a win for you?", type: "number" }
  ]
},
{
  id: "content", title: "Content and social", icon: "09",
  intro: "Links to everything you already have online so we can connect it all and keep it consistent.",
  fields: [
    { id: "facebook", label: "Facebook business page", type: "url" },
    { id: "instagram", label: "Instagram", type: "url" },
    { id: "linkedin", label: "LinkedIn", type: "url" },
    { id: "youtube", label: "YouTube channel", type: "url" },
    { id: "tiktok", label: "TikTok", type: "url" },
    { id: "zillow", label: "Zillow profile", type: "url" },
    { id: "realtor_com", label: "Realtor.com profile", type: "url" },
    { id: "other_profiles", label: "Any other profiles (Homes.com, Yelp, Nextdoor, etc.)", type: "textarea" },
    { id: "social_active", label: "Which one are you most active on?", type: "text" },
    { id: "video", label: "Do you make videos?", type: "radio", required: true, options: ["Yes, regularly", "Sometimes", "No, but I want to", "No"] },
    { id: "blog", label: "Do you want a blog or market update section?", type: "radio", required: true, options: ["Yes, and I'll write it", "Yes, but I need help writing it", "Yes, fully done for me", "No"] },
    { id: "market_update_freq", label: "How often would you post market updates?", type: "radio", options: ["Weekly", "Monthly", "Quarterly", "Never"], showIf: { id: "blog", not: "No" } },
    { id: "existing_content", label: "Links to content you've already made", type: "textarea", help: "Blog posts, videos, flyers, past newsletters, press releases." },
    { id: "photos", label: "Photos you have that we can use", type: "checkbox", options: ["Me at work (showings, closings, signs)", "Me in the community", "Local scenery (lakes, mountains, downtown)", "Past listings", "Team photos", "Lifestyle / family (if OK to use)", "None, I need a photo shoot"] },
    { id: "photo_shoot", label: "Are you open to a photo and video shoot for the site?", type: "yesno" }
  ]
},
{
  id: "goals", title: "Goals and sign-off", icon: "10",
  intro: "Last few questions so we build the right thing, in the right order.",
  fields: [
    { id: "goal_main", label: "What is the #1 thing this website must do for you?", type: "radio", required: true, options: ["Bring me new buyer and seller leads from Google", "Make me look credible when referrals check me out", "Show my listings beautifully", "Build my brand in a specific area or niche", "Recruit or grow my team", "Something else"] },
    { id: "goal_other", label: "Tell us more", type: "textarea", showIf: { id: "goal_main", is: "Something else" } },
    { id: "goal_rank", label: "Rank what matters most (pick your top 3)", type: "checkbox", required: true, max: 3, options: ["Ranking on Google for my areas", "Looking high-end", "Fast and simple for visitors", "Showing listings and search", "Telling my story", "Capturing leads", "Showing reviews and proof", "Easy for me to update"] },
    { id: "deadline", label: "When do you need the site live?", type: "radio", required: true, options: ["As soon as possible", "Within 30 days", "Within 60 days", "Within 90 days", "No rush, do it right"] },
    { id: "deadline_reason", label: "Is there a date or event driving that?", type: "text" },
    { id: "decision_maker", label: "Who approves the final site?", type: "text", required: true, help: "You, a partner, a team lead?" },
    { id: "feedback_style", label: "How do you like to give feedback?", type: "radio", options: ["Send me a link and I'll email notes", "Quick phone call", "Screen-share meeting", "Text me"] },
    { id: "update_self", label: "Do you want to update the site yourself later?", type: "radio", options: ["Yes, teach me", "No, Howard's team handles it", "Maybe small things"] },
    { id: "competitors", label: "3 agents or teams you compete with most", type: "textarea", help: "Names and websites if you know them. We look at what they rank for." },
    { id: "success", label: "A year from now, how will you know this site worked?", type: "textarea", required: true },
    { id: "anything_else", label: "Anything else we should know?", type: "textarea" },
    { id: "confirm", label: "I've checked my answers and I'm OK with Howard's team using them to build my site.", type: "checkbox", required: true, options: ["Yes"] }
  ]
}
];
