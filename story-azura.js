/*
  AZURA'S PHONE
  -------------
  Same format as story.js (see the guide at the top of that file).
  On this phone, "me" = Azura. Plain default look: she never customised anything.
  Nik set this phone up for her years ago.
*/

window.PHONES = window.PHONES || {};

PHONES.azura = {
  id: "azura",
  theme: "azura",
  ownerName: "Azura",
  ownerLabel: "Azura's iPhone",
  passcode: "0111",          // Nik's first day too. Of course.
  passcodeNote: "Nik's first day at work",

  apps: {
    grid: ["calendar", "photos", "camera", "mail", "notes", "clock", "contacts", "settings"],
    dock: ["phone", "browser", "messages", "music"]
  },

  /* ---------- Chats ---------- */
  threads: [
    { id: "nik", name: "Ms Nikita", initial: "N", color: "#8a63c9", photo: "avatars/nik.jpg" },
    { id: "vp", name: "Kimi", initial: "K", color: "#6c8ebf", photo: "avatars/kimi.jpg" },
    { id: "nikki", name: "Nikki (NOT Nikita)", initial: "N", color: "#f2a65a" },
    { id: "riy", name: "Riy", initial: "R", color: "#c48bb8", app: "jodoh", photo: "avatars/riy.jpg" }
  ],

  /* ---------- Already on the phone ---------- */
  notes: [
    { title: "How to use your phone (by Nikita)", date: "Year 1",
      body: "Ms Azura,\n\n1. Swipe up to unlock.\n2. Your calendar is updated by me. Please do not delete events.\n3. Your email password is in a note titled \"DO NOT OPEN.\" Please do not open it in meetings.\n4. If anything breaks, call me.\n\nNikita" },
    { title: "DO NOT OPEN", date: "Year 1", body: "Nice try." }
  ],
  photos: [
    { src: "photos/azura-report.jpg", emoji: "📊", caption: "Screenshot: Q3 report, page 14", date: "Year 9", color: "#d1d1d6" }
  ],
  mail: [],
  searches: [
    { query: "how to change phone wallpaper", time: "Year 2", results: [
      { site: "The Career Desk", path: "tech help", title: "Change your wallpaper in 3 steps", snippet: "Open Settings, tap Wallpaper, choose a photo." }
    ]}
  ],
  calls: [],

  calendar: [
    { day: "Mon, 11 Nov", events: [{ time: "10:00 AM", title: "Hartman meeting", note: "Created by Nikita Aulia" }] },
    { day: "Thu, 14 Nov", events: [
      { time: "9:00 AM", title: "Board prep", note: "Created by Nikita Aulia" },
      { time: "11:45 AM", title: "Lunch (please eat)", note: "Created by Nikita Aulia" }
    ]},
    { day: "Thu, 21 Nov", events: [{ time: "7:30 PM", title: "Shareholders' Annual Dinner", note: "Created by Nikita Aulia" }] },
    { day: "Fri, 29 Nov", events: [{ time: "All day", title: "Ms Nikita: last day", note: "Created by Nikita Aulia" }] },
    { day: "Mon, 2 Dec", events: [] },
    { day: "Tue, 3 Dec", events: [] }
  ],

  alarms: [{ time: "7:00", label: "Alarm", on: true }],

  contacts: [
    { name: "Faris Hakimi, Vice President", initial: "K", subtitle: "Azure Horizon Group", color: "#6c8ebf", photo: "avatars/kimi.jpg", notes: "Best friend since forever. Not by choice." },
    { name: "Board Secretary", initial: "B", subtitle: "Azure Horizon Group" },
    { name: "Dry Cleaner", initial: "D", subtitle: "(Ms Nikita handles this)" },
    { name: "Ms Nikita", initial: "N", color: "#8a63c9", photo: "avatars/nik.jpg", notes: "Knows everything." },
    { name: "Nikki (NOT Nikita)", initial: "N", color: "#f2a65a" }
  ],

  music: [
    { name: "Playlist 1", note: "Made by Nikita: for focus", spotify: "https://open.spotify.com/playlist/0UajSnnA5TMNvq3T30OQL9", ytmusic: "https://music.youtube.com/playlist?list=PLORIs2DKoZm0", tracks: [
      "Clair de Lune by Debussy",
      { title: "Gymnopédie No. 1", artist: "Erik Satie", preview: "gymnopedie" },
      "Nocturne in E-flat major, Op. 9 No. 2 by Chopin",
      { title: "Cello Suite No. 1 in G major: Prelude", artist: "Bach", preview: "cello" },
      "\"Winter\" from The Four Seasons by Vivaldi",
      { title: "Piano Sonata No. 14 \"Moonlight\"", artist: "Beethoven", preview: "moonlight" }
    ] }
  ],

  settings: {
    name: "Azura Adnan", initial: "A", color: "#e0679a", photo: "avatars/azura.jpg", wallpaper: "Default",
    screenTime: [
      { app: "Messages", minutes: 372, label: "6h 12m", note: "Most messaged: Ms Nikita" },
      { app: "Mail", minutes: 120, label: "2h" },
      { app: "Cari", minutes: 41, label: "41m" },
      { app: "Calendar", minutes: 3, label: "3m", note: "Ms Nikita updates it" }
    ]
  },

  cameraText: "",
  cameraVideo: "videos/azura-camera.mp4",
  jodoh: {
    name: "Azura", initial: "A", color: "#e0679a", photo: "avatars/azura.jpg",
    job: "CEO",
    bio: "Not here to date. Just checking something.",
    interestedIn: "Men & Women"
  },

  /* =====================================================================
     THE STORY
     ===================================================================== */
  beats: [

    /* ---------------- PART 2 ---------------- */
    { part: 2, title: "Exact Location" },

    { when: "Mon 11 Nov, 9:02 AM", mail: { from: "Nikita Aulia", to: "Azura Adnan", subject: "Resignation",
      body: "Dear Ms Azura,\n\nPlease accept this letter as notice of my resignation as Executive Secretary. My last working day will be Friday, 29 November.\n\nThank you for the past nine years. I will make sure the handover is complete.\n\nNikita Aulia" } },

    { when: "Mon 11 Nov, 9:06 AM", mail: { folder: "Drafts", from: "Azura Adnan", to: "Nikita Aulia", subject: "Re: Resignation",
      body: "Ms Nikita,\n\nI do not accept this.\n\nReasons:\n1." } },

    { when: "Mon 11 Nov, 9:14 AM", mail: { folder: "Sent", from: "Azura Adnan", to: "Nikita Aulia", subject: "Re: Resignation", body: "Received." } },

    { when: "Mon 11 Nov, 9:20 AM", search: {
      query: "what does a secretary do all day",
      results: [
        { site: "The Career Desk", path: "jobs › admin", title: "Executive secretary duties",
          snippet: "Managing schedules, emails, meetings, travel, files, and much more." },
        { site: "OfficeTalk Forum", path: "threads › bosses", title: "Signs you depend on your secretary too much",
          snippet: "Number 1: you do not know your own email password." }
      ]
    }},

    { when: "Mon 11 Nov, 2:10 PM", chat: "nik", messages: [
      { from: "me", text: "Ms Nikita. Salary plus 30%." },
      { from: "them", text: "Thank you, Ms Azura. My last day is still 29 November." },
      { from: "me", text: "New title. Executive Assistant Director." },
      { from: "them", text: "Thank you, Ms Azura. My last day is still 29 November." },
      { from: "me", text: "An office. With a window." },
      { from: "them", text: "Thank you, Ms Azura. My last day is still 29 November." },
      { from: "me", text: "Fine." },
      { from: "me", text: "Find your replacement." }
    ]},

    { when: "Mon 11 Nov, 2:15 PM", chat: "vp", messages: [
      { from: "me", text: "Code red. Office I. Sekarang." },
      { from: "them", text: "boleh tak I habiskan lunch dulu" },
      { from: "me", text: "Tak." },
      { from: "them", text: "ok fine. coming, your highness." }
    ]},

    { when: "Mon 11 Nov, 11:02 PM", note: { title: "Reasons Ms Nikita cannot leave", date: "Mon 11 Nov",
      body: "1. Contract. (No clause. Who wrote this contract?)\n2. Raise her salary. (Rejected.)\n3. Bigger title. (Rejected.)\n4. New office with a window. (Rejected.)\n5. Plan B. (Ask Kimi.)" } },

    { when: "Wed 13 Nov, 10:06 AM", chat: "vp", messages: [
      { from: "me", text: "Kenapa budak baru tu ingat dia Nik." },
      { from: "them", text: "...sebab nama dia Nikki?" },
      { from: "me", text: "Irrelevant." },
      { from: "them", text: "you baru je panggil Nikita \"Nik\" kat intercom kan" },
      { from: "me", text: "Tak." },
      { from: "them", text: "satu floor dengar, Azura" },
      { from: "me", text: "Nikki is Nikki. Nik is Nik. End of discussion." },
      { from: "them", text: "ok babe 🙂" }
    ]},

    { when: "Thu 14 Nov, 11:48 AM", chat: "nik", messages: [
      { from: "them", text: "Ms Azura, may I take half day today? Nikki can handle the afternoon." },
      { from: "me", text: "Reason?" },
      { from: "them", text: "Personal matter." },
      { from: "me", text: "Fine." }
    ]},

    { when: "Thu 14 Nov, 2:33 PM", chat: "nikki", messages: [
      { from: "me", text: "Nikki. Do not tell anyone what you just told me." },
      { from: "them", text: "Okay Ms Azura!! 🤐" },
      { from: "them", text: "(I bagitahu apa eh?)" },
      { from: "me", text: "Good." }
    ]},

    { when: "Thu 14 Nov, 2:34 PM", chat: "nik", messages: [
      { from: "me", text: "Ms Nikita. Where is the Hartman file." },
      { from: "me", text: "Also the password for my email." },
      { from: "me", text: "Also, is a blind date considered a \"personal matter.\"" },
      { from: "them", text: "Hartman file is in the second drawer, Ms Azura. Email password is in your Notes, titled \"DO NOT OPEN.\"" },
      { from: "them", text: "And yes. It is personal." }
    ]},

    { when: "Thu 14 Nov, 2:35 PM", chat: "vp", messages: [
      { from: "me", text: "Dia pergi BLIND DATE." },
      { from: "me", text: "Waktu OFFICE HOURS." },
      { from: "them", text: "dia ambil half day. you yang approve." },
      { from: "me", text: "I approve personal matter. Bukan THAT." },
      { from: "them", text: "wow. terkejut. perempuan single pergi date. call polis cepat." },
      { from: "me", text: "You perli I ke." },
      { from: "them", text: "tak Ms Azura. mana berani. sorry Ms Azura." },
      { from: "me", text: "Cari dia kat mana." },
      { from: "them", text: "I ni Vice President tau." },
      { from: "me", text: "So?" },
      { from: "them", text: "...bagi I 10 minit." }
    ]},

    { when: "Thu 14 Nov, 2:36 PM", call: { name: "Ms Nikita", type: "out", count: 2, detail: "No answer", note: "No answer." } },

    { when: "Thu 14 Nov, 2:52 PM", chat: "vp", messages: [
      { from: "them", text: "ok I dah jumpa. dia kat cafe area KLCC. nampak happy. biarlah dia." },
      { from: "me", text: "Exact location." },
      { from: "them", text: "Azura, with respect, I rasa" },
      { from: "me", text: "Exact location, or you boleh kemas barang you." },
      { from: "them", text: "Fine." },
      { from: "them", text: "Maison Lumière, Jalan Pinang. Corner table tepi tingkap. Date dia nama Marsh. Senior researcher kat bank." },
      { from: "me", text: "Ha." },
      { from: "me", text: "With THAT??" },
      { from: "me", text: "Takde class langsung. I boleh bagi dia lebih dari tu." },
      { from: "them", text: "well yeah." },
      { from: "them", text: "tapi dia bukan you." },
      { from: "them", text: "eh sorry. maksud I. dia BUKAN you. which is good. untuk dia." },
      { from: "me", text: "You nak cari kerja baru esok ke?" },
      { from: "them", text: "tak Ms Azura." },
      { from: "them", text: "have a nice day Ms Azura." }
    ]},

    { when: "Thu 14 Nov, 2:55 PM", search: {
      query: "senior researcher bank what do they do",
      results: [
        { site: "The Career Desk", path: "jobs › banking", title: "What does a senior researcher at a bank do?",
          snippet: "They study markets, data and trends, and turn them into reports the bank uses to make decisions." }
      ],
      people: [
        { q: "Is a senior researcher a good job?", a: "It is a respected role that needs strong analysis and writing skills." }
      ]
    }},

    { when: "Thu 14 Nov, 2:58 PM", chat: "nik", messages: [
      { from: "me", text: "Ms Nikita. The shareholders' annual dinner is next week." },
      { from: "me", text: "The seating plan has 3 mistakes. The menu has 2." },
      { from: "me", text: "Interesting that you chose today for a \"personal matter.\"" },
      { from: "them", text: "The seating plan was approved by you on Monday, Ms Azura." },
      { from: "me", text: "I changed my mind." },
      { from: "me", text: "I'm coming to you. We'll fix it there." },
      { from: "them", text: "Ms Azura, you don't know where I am." }
    ]},

    { when: "Thu 14 Nov, 6:15 PM", chat: "vp", messages: [
      { from: "them", text: "so? macam mana?" },
      { from: "me", text: "Productive. Seating plan dah perfect." },
      { from: "them", text: "and the date?" },
      { from: "me", text: "Date apa." }
    ]},

    { when: "Thu 14 Nov, 11:20 PM", photo: { src: "photos/azura-nik-blurry.jpg", emoji: "📸", color: "#c7c7cc", date: "Year 3",
      caption: "Ms Nikita at the annual dinner (blurry, taken by accident, apparently)" } },

    { when: "Thu 14 Nov, 11:30 PM", search: {
      query: "how to make employee stay",
      results: [
        { site: "The Career Desk", path: "leadership", title: "Why good employees leave",
          snippet: "It is rarely about money." },
        { site: "OfficeTalk Forum", path: "threads › bosses", title: "I offered everything and she still said no",
          snippet: "Top reply: did you ask her what she actually wants?" }
      ]
    }},

    { when: "Thu 14 Nov, 11:41 PM", chat: "nik", messages: [
      { unsent: "Nik." },
      { unsent: "I need you." },
      { unsent: "Nothing in this office makes sense without you." },
      { from: "me", text: "Ms Nikita. 8am tomorrow. The office needs you." },
      { status: "Delivered" }
    ]},

    /* ---------------- PART 4 ---------------- */
    { part: 4, title: "Plan B" },

    { when: "Fri 15 Nov, 7:40 AM", note: { title: "8am meeting with Ms Nikita", date: "Fri 15 Nov",
      body: "1. Do not mention the date.\n2. Do not mention Marsh.\n3. Do not mention the tie.\n4. Be normal.\n5. What is normal." } },

    { when: "Fri 15 Nov, 8:20 AM", chat: "nik", messages: [
      { from: "them", text: "Ms Azura, I'm here. What does the office need?" },
      { from: "me", text: "The seating plan." },
      { from: "them", text: "You fixed it yesterday. At my date." },
      { from: "me", text: "I fixed version 9. We need version 10." },
      { from: "them", text: "..." },
      { from: "them", text: "Baik, Ms Azura." }
    ]},

    { when: "Fri 15 Nov, 9:05 AM", chat: "vp", messages: [
      { from: "them", text: "so... Plan B tu apa sebenarnya" },
      { from: "me", text: "The Blockbuster Effect." },
      { from: "them", text: "the what" },
      { from: "me", text: "Once you've watched a blockbuster, you can't go back to a cheap indie film." },
      { from: "them", text: "so Marsh tu indie film la?" },
      { from: "me", text: "Marsh is a student film. Shot on a phone. Vertical." },
      { from: "them", text: "Azura 😭" }
    ]},

    { when: "Fri 15 Nov, 10:30 AM", search: {
      query: "most premium cafe near KLCC catering",
      results: [
        { site: "The Career Desk", path: "workplace", title: "Corporate catering that impresses",
          snippet: "Nothing says 'we value you' like a coffee nobody can afford." }
      ]
    }},

    { when: "Fri 15 Nov, 11:00 AM", note: { title: "THE BLOCKBUSTER EFFECT (Plan B)", date: "Fri 15 Nov",
      body: "1. Marsh paid for ONE latte.\n→ Maison Lumière for the whole of Level 12. Every morning.\n\n2. Marsh wore a crooked tie.\n→ Wear a perfect tie. (Do I own a tie? Buy a tie.)\n\n3. Marsh took her to a cafe.\n→ Shareholders' dinner. Five-star hotel. String quartet. She leads it.\n\n4. Make her last two weeks so good that every other job looks like an indie film.\n\n5. At the dinner, announce her new role in front of the board.\n\n6. She stays. Credits roll." } },

    { when: "Fri 15 Nov, 11:30 AM", mail: { folder: "Sent", from: "Azura Adnan", to: "Maison Lumière", subject: "Standing order: Level 12",
      body: "Hello,\n\nLattes for all of Level 12, delivered 8:30 AM daily until 29 November.\n\nThe foam must not be emotionally flat.\n\nAzura Adnan\nCEO, Azure Horizon Group" } },

    { when: "Fri 15 Nov, 1:15 PM", chat: "vp", messages: [
      { from: "them", text: "kenapa satu Level 12 dapat latte Maison Lumière pagi ni" },
      { from: "me", text: "Blockbuster Effect." },
      { from: "them", text: "Riz dah minum tiga. dia tengah menari kat pantry" },
      { from: "them", text: "and point 5 tu. announce depan 40 orang?? ni bukan blockbuster, ni hostage situation" },
      { from: "me", text: "It's a promotion." },
      { from: "them", text: "kenapa you tak cakap je you nak dia stay sebab you..." },
      { from: "me", text: "Finish that sentence and you're presenting the Q4 budget alone." },
      { from: "them", text: "...Plan B sounds amazing Ms Azura." }
    ]},

    { when: "Fri 15 Nov, 3:00 PM", mail: { folder: "Sent", from: "Azura Adnan", to: "Nikita Aulia", subject: "Shareholders' Annual Dinner: Lead Organiser",
      body: "Ms Nikita,\n\nEffective immediately, you will lead the Shareholders' Annual Dinner on 21 November. Nikki will assist.\n\nThis is not optional.\n\nAzura Adnan\nCEO" } },

    { when: "Fri 15 Nov, 3:12 PM", chat: "nik", messages: [
      { from: "them", text: "Ms Azura, I received your email. With respect, the dinner was always my job." },
      { from: "me", text: "Now it is officially your job." },
      { from: "them", text: "It was officially my job before." },
      { from: "me", text: "Now it is MORE officially." },
      { from: "them", text: "Noted, Ms Azura." },
      { from: "them", text: "Also, thank you for the lattes." },
      { from: "me", text: "What lattes." },
      { from: "them", text: "The ones with your name printed on every cup." },
      { from: "me", text: "Coincidence." }
    ]},

    { when: "Fri 15 Nov, 5:40 PM", chat: "nikki", messages: [
      { from: "them", text: "Ms Azura!! Kak Nik cakap I assist dinner tu?? I tak pernah buat event sebesar ni 😭😭 apa I kena buat" },
      { from: "me", text: "Watch her. Learn everything." },
      { from: "me", text: "And tell me if she smiles at her phone." },
      { from: "them", text: "huh?" },
      { from: "me", text: "Nothing. Goodnight Nikki." },
      { from: "them", text: "(Ms Azura tak pernah cakap goodnight kat I 😳)" }
    ]},

    { when: "Fri 15 Nov, 11:05 PM", search: {
      query: "jodoh app how does matching work",
      results: [
        { site: "The Career Desk", path: "life", title: "Dating apps explained",
          snippet: "You match when both people like each other's profile." }
      ],
      people: [
        { q: "Can you see who someone else is matching with?", a: "No. And you should not try." }
      ]
    }},

    { when: "Fri 15 Nov, 11:20 PM", install: "jodoh" },

    { when: "Fri 15 Nov, 11:40 PM", chat: "riy", messages: [
      { from: "them", text: "hi!! wait. is this THE Azura Adnan?? CEO Azure Horizon??" },
      { from: "me", text: "Who are you." },
      { from: "them", text: "your match 😳 Riy. I nampak you dalam majalah business bulan lepas" },
      { from: "me", text: "I was looking for someone else." },
      { from: "them", text: "ouch. who?" },
      { from: "me", text: "Irrelevant. Since you're here. Question." },
      { from: "them", text: "anything 🥹" },
      { from: "me", text: "Someone buys you one latte. Someone else buys lattes for your whole office. Which one do you like more?" },
      { from: "them", text: "...the one asking me this at 11pm?" },
      { from: "me", text: "Wrong answer. Try again." },
      { from: "them", text: "the whole office one??" },
      { from: "me", text: "Correct. Goodnight." },
      { from: "them", text: "wait did I pass something" }
    ]},

    /* ---------------- PART 6 ---------------- */
    { part: 6, title: "Dessert" },

    { when: "Thu 21 Nov, 4:00 PM", note: { title: "Announcement (5 minutes)", date: "Thu 21 Nov",
      body: "Good evening, shareholders.\n\nTonight I would like to announce a new role at Azure Horizon Group.\n\nChief of Staff: Nikita Aulia.\n\n(Pause for applause.)\n(She cannot say no. 40 people are watching.)\n(Do not look at her while saying this. You will forget the words.)" } },

    { when: "Thu 21 Nov, 5:30 PM", chat: "riy", messages: [
      { from: "me", text: "Rate this. String quartet. White peonies. Five-star ballroom." },
      { from: "them", text: "for a date?? 10/10 I'd marry you" },
      { from: "me", text: "It's a shareholders' dinner." },
      { from: "them", text: "oh. then 4/10, too romantic for shareholders" },
      { from: "me", text: "Good. That's the point." },
      { from: "them", text: "I'm so confused but I'm happy to help 🥹" }
    ]},

    { when: "Thu 21 Nov, 7:20 PM", chat: "vp", messages: [
      { from: "them", text: "Azura. ballroom ni ada STRING QUARTET. untuk shareholders yang separuh dah tidur" },
      { from: "me", text: "Blockbuster." },
      { from: "them", text: "dan peony putih. you tak pernah peduli pasal bunga" },
      { from: "me", text: "Nikita yang pilih." },
      { from: "them", text: "oh. so dia tahu bunga favourite you" },
      { from: "me", text: "..." },
      { from: "them", text: "🙂" }
    ]},

    { when: "Thu 21 Nov, 7:45 PM", photo: { camera: true, src: "photos/azura-nik-dinner.jpg", emoji: "👗", color: "#c7c7cc", caption: "Ms Nikita at the annual dinner (not blurry. on purpose.)" } },

    { when: "Thu 21 Nov, 7:47 PM", chat: "vp", messages: [
      { from: "them", text: "I nampak you ambil gambar dia" },
      { from: "me", text: "For the company newsletter." },
      { from: "them", text: "company kita takde newsletter" },
      { from: "me", text: "Sekarang ada." }
    ]},

    { when: "Thu 21 Nov, 8:30 PM", chat: "nikki", messages: [
      { from: "them", text: "Ms Azura!! update: Kak Nik ubah run-sheet last minute 😳" },
      { from: "me", text: "Changed what." },
      { from: "them", text: "dia letak \"Closing remarks: Nikita Aulia\" SEBELUM announcement you" },
      { from: "me", text: "Why." },
      { from: "them", text: "dia cakap \"Ms Azura's announcement should be the last thing people remember\" 🥹 sweet kan" },
      { from: "me", text: "..." },
      { from: "me", text: "It's not sweet, Nikki. It's strategy." }
    ]},

    { when: "Thu 21 Nov, 8:34 PM", chat: "vp", messages: [
      { from: "me", text: "Dia gerak dulu." },
      { from: "them", text: "siapa" },
      { from: "me", text: "Nikita. Before my announcement. She moved the run-sheet." },
      { from: "them", text: "...dia tahu ke?" },
      { from: "me", text: "Dia selalu tahu." },
      { from: "them", text: "so cancel la Plan B" },
      { from: "me", text: "I tak cancel. I adapt." }
    ]},

    { when: "Thu 21 Nov, 8:52 PM", chat: "vp", messages: [
      { from: "them", text: "Azura. dia tengah speech." },
      { from: "them", text: "dia cakap \"thank you Ms Azura, for nine years of teaching me what excellence looks like\"" },
      { from: "them", text: "satu ballroom tepuk tangan" },
      { from: "them", text: "and now dia introduce Nikki as \"the person who will take care of Ms Azura from December\"" },
      { from: "them", text: "Azura. dia announce replacement dia DEPAN 40 orang." },
      { from: "them", text: "Plan B you dah kena counter" },
      { from: "them", text: "...Azura?" },
      { from: "me", text: "Speech dia perfect." },
      { from: "me", text: "Of course. I yang train dia." }
    ]},

    { when: "Thu 21 Nov, 9:05 PM", note: { title: "Announcement (version 2)", date: "Thu 21 Nov",
      body: "Good evening, shareholders.\n\nThank you for coming.\n\nThe dessert is from Maison Lumière.\n\nThat is the announcement." } },

    { when: "Thu 21 Nov, 9:20 PM", chat: "vp", messages: [
      { from: "them", text: "you announce DESSERT." },
      { from: "them", text: "depan 40 shareholders." },
      { from: "me", text: "It was a very good dessert." },
      { from: "them", text: "Azura..." },
      { from: "me", text: "Dia akan cakap no, Kimi. Depan semua orang. Dengan sopan. Perfectly." },
      { from: "me", text: "\"Thank you, Ms Azura. My last day is still 29 November.\"" },
      { from: "them", text: "..." },
      { from: "them", text: "then cakap je la benda sebenar. bukan promotion. benda SEBENAR." },
      { from: "me", text: "I tak tahu apa benda sebenar tu." },
      { from: "them", text: "you tahu. you cuma tak nak cakap." }
    ]},

    { when: "Thu 21 Nov, 10:40 PM", chat: "nik", messages: [
      { from: "them", text: "Ms Azura, the dinner is done. Thank you for the quartet. And the peonies." },
      { from: "them", text: "What was your announcement supposed to be?" },
      { from: "me", text: "Dessert." },
      { from: "them", text: "Ms Azura." },
      { from: "me", text: "It was a very good dessert, Ms Nikita." },
      { from: "them", text: "It was. Goodnight, Ms Azura." }
    ]},

    { when: "Thu 21 Nov, 11:30 PM", search: {
      query: "how to tell someone you need them",
      results: [
        { site: "The Career Desk", path: "life", title: "Saying what you mean",
          snippet: "Being honest is not the same as being weak." }
      ],
      people: [
        { q: "What if it was never about work?", a: "Then it was never a work problem." }
      ]
    }},

    { when: "Thu 21 Nov, 11:58 PM", chat: "nik", messages: [
      { unsent: "Nik." },
      { unsent: "Stay." },
      { unsent: "Not for the company." }
    ]},

    /* ---------------- PART 8 ---------------- */
    { part: 8, title: "Five Working Days" },

    { when: "Sun 24 Nov, 11:47 PM", chat: "nik", messages: [
      { from: "me", text: "Ms Nikita. Five working days left." },
      { status: "Delivered" }
    ]},

    { when: "Mon 25 Nov, 12:40 AM", search: {
      query: "how to fall asleep fast",
      results: [
        { site: "The Career Desk", path: "health", title: "Can't sleep? Try this first",
          snippet: "Put your phone down." }
      ],
      people: [
        { q: "Why can't I sleep before a big change?", a: "Your brain is trying to solve something you keep avoiding." }
      ]
    }},

    { when: "Mon 25 Nov, 1:15 AM", chat: "vp", messages: [
      { from: "me", text: "You awake?" },
      { from: "them", text: "sekarang dah" },
      { from: "them", text: "kenapa" },
      { from: "me", text: "Lima hari." },
      { from: "them", text: "I know babe." },
      { from: "them", text: "you nak buat apa?" },
      { from: "me", text: "Tidur." },
      { from: "them", text: "you dah dua minggu cakap benda sama" },
      { from: "me", text: "Goodnight Kimi." },
      { from: "them", text: "Azura. cakap dengan dia. bukan dengan I." }
    ]},

    { when: "Mon 25 Nov, 1:30 AM", chat: "riy", messages: [
      { from: "me", text: "Riy. Are you awake." },
      { from: "them", text: "for you? always 😳" },
      { from: "me", text: "If someone told you at 3am that they want you in their life. Would you be angry?" },
      { from: "them", text: "...is this about me??" },
      { from: "me", text: "No." },
      { from: "them", text: "ok 🙂 then no. I'd be very happy. whoever it is, they're lucky" },
      { from: "me", text: "Noted." },
      { from: "them", text: "...you're going to do something tonight, aren't you" },
      { from: "me", text: "Goodnight, Riy." }
    ]},

    { when: "Mon 25 Nov, 1:50 AM", note: { title: "Things Nikita knows about me", date: "Mon 25 Nov",
      body: "She knows I don't eat spicy food.\nShe knows I don't drink fizzy drinks.\nShe knows I bite my nails when a meeting goes badly.\nShe knows my favourite flower. I didn't know I had one.\nShe knows everything.\nExcept one thing." } },

    { when: "Mon 25 Nov, 2:47 AM", chat: "nik", messages: [
      { from: "me", text: "Nik." },
      { from: "me", text: "I can't sleep. I haven't slept properly since you resigned." },
      { from: "me", text: "I offered you money. A title. A window. A car. A string quartet." },
      { from: "me", text: "None of that was the point." },
      { from: "me", text: "I don't want a secretary." },
      { from: "me", text: "I want you." },
      { from: "me", text: "Not in the office. In my life." },
      { from: "me", text: "You can still leave on Friday. I won't stop you." },
      { from: "me", text: "But I couldn't let you go without saying it." },
      { status: "Delivered" }
    ]},

    { when: "Mon 25 Nov, 2:49 AM", search: {
      query: "can you unsend a text message",
      results: [
        { site: "OfficeTalk Forum", path: "threads › help", title: "I sent something at 3am. Help.",
          snippet: "Top reply: you can't. it's out there now. go drink water." }
      ],
      people: [
        { q: "What if they're asleep?", a: "Then you have until morning to panic." }
      ]
    }},

    { when: "Mon 25 Nov, 2:51 AM", chat: "nik", messages: [
      { unsent: "Please ignore that." },
      { unsent: "That was a typo." },
      { unsent: "Nine typos." }
    ]},

    { when: "Mon 25 Nov, 2:55 AM", chat: "vp", messages: [
      { from: "me", text: "I said it." },
      { from: "them", text: "SAID WHAT" },
      { from: "me", text: "Everything." },
      { from: "them", text: "AZURA" },
      { from: "them", text: "pukul 3 PAGI??" },
      { from: "me", text: "Goodnight Kimi." },
      { from: "them", text: "TAK BOLEH GOODNIGHT SEKARANG" }
    ]},

    /* ---------------- PART 10 (EPILOGUE) ---------------- */
    { part: 10, title: "Epilogue: Credits Roll" },

    { when: "Fri 29 Nov, 7:30 AM", note: { title: "Ms Nikita's last day", date: "Fri 29 Nov",
      body: "1. Do not cry. CEOs do not cry.\n2. Sign her release letter. With a nice pen.\n3. Take her to lunch. Not as her boss. (Maison Lumière. Foam checked in advance.)\n4. Rename her contact." } },

    { when: "Fri 29 Nov, 8:30 AM", chat: "nikki", messages: [
      { from: "them", text: "Ms Azura!! hari ni last day Kak Nik 😭😭 I dah buat banner" },
      { from: "them", text: "Isnin I start full time!! I janji I buat yang terbaik!!" },
      { from: "me", text: "I know you will, Nikki." },
      { from: "me", text: "She trained you. That means you're good." },
      { from: "them", text: "MS AZURA PUJI I??? 😭😭 I nak screenshot" },
      { from: "me", text: "Do not screenshot." },
      { from: "them", text: "dah screenshot 🙂" }
    ]},

    { when: "Fri 29 Nov, 10:00 AM", mail: { folder: "Sent", from: "Azura Adnan", to: "HR Department", subject: "Release letter: Nikita Aulia",
      body: "Hello,\n\nPlease process Nikita Aulia's release, effective 29 November.\n\nAlso add this to her file: the best Executive Secretary this company has ever had.\n\nDo not frame this.\n\n(Frame this.)\n\nAzura Adnan\nCEO" } },

    { when: "Fri 29 Nov, 1:30 PM", chat: "vp", messages: [
      { from: "them", text: "so. I dengar CEO kita pegang tangan orang dalam lif Isnin lepas" },
      { from: "me", text: "Fake news." },
      { from: "them", text: "Riz ada TIMELINE, Azura" },
      { from: "me", text: "Riz is fired." },
      { from: "them", text: "you tak boleh fire Riz sebab cakap benda betul" },
      { from: "me", text: "...Riz is promoted. To silence." },
      { from: "them", text: "😭" },
      { from: "them", text: "btw. I told you so." },
      { from: "me", text: "You told me nothing." },
      { from: "them", text: "I CAKAP \"cakap dengan dia, bukan dengan I\" PUKUL 1 PAGI" },
      { from: "me", text: "...Fine. Thank you, Kimi." },
      { from: "them", text: "AZURA ADNAN CAKAP THANK YOU. I nak screenshot" },
      { from: "me", text: "Everyone in this company screenshots." }
    ]},

    { when: "Fri 29 Nov, 5:30 PM", photo: { camera: true, src: "photos/azura-last-day.jpg", emoji: "🎉", color: "#d1d1d6", caption: "Nik's last day. Level 12, everyone. (Riz blinked. Liza brought her own Tealive.)" } },

    { when: "Fri 29 Nov, 6:00 PM", chat: "nik", messages: [
      { from: "them", text: "Kak Zura, I've cleared my desk." },
      { from: "them", text: "The Hartman file is in the second drawer. Your email password is still in your Notes." },
      { from: "me", text: "I know where the Hartman file is." },
      { from: "them", text: "Since when?" },
      { from: "me", text: "Since today. I'm learning." },
      { from: "them", text: "Proud of you." },
      { from: "me", text: "Don't." },
      { from: "them", text: "Very proud." },
      { from: "me", text: "Nik." },
      { from: "them", text: "Yes?" },
      { from: "me", text: "Dinner. 8pm. I'll pick you up." },
      { from: "them", text: "With the black car?" },
      { from: "me", text: "With me." }
    ]},

    { when: "Fri 29 Nov, 6:10 PM", rename: { thread: "nik", name: "Nik 🤍" } },

    { when: "Fri 29 Nov, 6:12 PM", note: { title: "Things Nik knows about me (updated)", date: "Fri 29 Nov",
      body: "She knows I don't eat spicy food.\nShe knows I don't drink fizzy drinks.\nShe knows I bite my nails when a meeting goes badly.\nShe knows my favourite flower.\nShe knows everything.\nNow she knows that too." } },

    { when: "Fri 29 Nov, 7:10 PM", chat: "riy", messages: [
      { from: "me", text: "Riy. I'm deleting this app." },
      { from: "them", text: "noooo 😭 did it work?? the latte person??" },
      { from: "me", text: "It worked." },
      { from: "them", text: "I KNEW IT. I was a very good lab rat" },
      { from: "me", text: "You were. The best one." },
      { from: "them", text: "can I at least get a Maison Lumière latte as payment" },
      { from: "me", text: "Check your doorstep tomorrow. 8:30 AM." },
      { from: "them", text: "AZURA 😭🤍" },
      { event: "You unmatched with Riy" }
    ]},

    { when: "Fri 29 Nov, 7:40 PM", search: {
      query: "how to be a good girlfriend",
      results: [
        { site: "The Career Desk", path: "life", title: "Starting something new",
          snippet: "Ask what they actually want." }
      ],
      people: [
        { q: "Is it normal to be nervous after nine years?", a: "Yes. It means it matters." }
      ]
    }}
  ]
};
