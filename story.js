/*
  NIK'S PHONE
  -----------
  This file is the story on Nik's phone, in reading order. Read it top to bottom like a script.

  HOW IT WORKS
  - "threads" are the chats on the phone (Messages and the Jodoh dating app).
  - notes, photos, calendar etc. at the top already exist when the story starts.
  - "beats" is the story. Readers get one beat at a time, as a notification.
    { part: 1, title: "..." } starts a part. Parts are read in number order across BOTH phones
    (Part 1 Nik, Part 2 Azura, Part 3 Nik...).

  A BEAT is one moment. It has "when" and ONE of these:
    chat:   "azura", messages: [ ... ]         new messages in a chat
    note:   { title, date, body }               Nik writes a note (revisit: true = an old note she opens)
    mail:   { from, to, subject, body, folder } folder: "Inbox" (default), "Sent" or "Drafts"
    search: { query, results: [...], people: [...] }   a search on Cari
    photo:  { emoji, caption, camera: true }    camera: true = she takes it now
    photos: [ ... ]                             several photos at once (hidden: true = Hidden album)
    call:   { name, type: "missed" or "out", count, note }
  Optional on any beat:  banner: { title, text }  to change the notification wording.

  MESSAGES
    { from: "me", text }           Nik (right side)
    { from: "them", text }         the other person
    { from: "Riz", text }          a named person in a group chat
    { from: "them", voice: "0:47" }
    { unsent: "..." }              typed, then deleted
    { status: "Seen" }             small note under the last bubble
    { event: "Riz added Nikki" }   grey line in the middle

  "when" format: "Thu 14 Nov, 2:31 PM"
*/

window.PHONES = window.PHONES || {};

PHONES.nik = {
  id: "nik",
  theme: "nik",
  ownerName: "Nik",
  ownerLabel: "Nikita's iPhone",
  passcode: "0111",          // Nik's first day at Azure Horizon: 01/11, nine years ago
  passcodeNote: "her first day at work",

  apps: {
    grid: ["notes", "photos", "calendar", "jodoh", "clock", "mail", "contacts", "camera", "settings"],
    dock: ["messages", "phone", "browser", "music"]
  },

  /* ---------- Chats ---------- */
  threads: [
    { id: "azura", name: "Ms Azura (BOSS)", initial: "A", color: "#e0679a", photo: "avatars/azura.jpg" },
    { id: "office", name: "Level 12 Survivors", initial: "🫠", color: "#cfe5fc", group: true, photo: "avatars/level12.jpg",
      members: {
        Liza: { color: "#3f9a8f", photo: "avatars/liza.jpg" },
        Riz: { color: "#d9822b", photo: "avatars/riz.jpg" },
        Fin: { color: "#6a7fd0", photo: "avatars/fin.jpg" },
        Shen: { color: "#9b6fc2", photo: "avatars/shen.jpg" },
        Nikki: { color: "#e07b39" }
      } },
    { id: "situation", name: "Nik's Situation 👀", initial: "👀", color: "#fde4d2", group: true,
      members: {
        Liza: { color: "#3f9a8f", photo: "avatars/liza.jpg" },
        Shen: { color: "#9b6fc2", photo: "avatars/shen.jpg" }
      } },
    { id: "liza", name: "Liza", initial: "L", color: "#3f9a8f", photo: "avatars/liza.jpg" },
    { id: "nikki", name: "Nikki", initial: "N", color: "#f2a65a" },
    { id: "vp", name: "Kimi (VP)", initial: "K", color: "#6c8ebf", photo: "avatars/kimi.jpg" },
    { id: "ayah", name: "Ayah", initial: "A", color: "#8bb98b" },
    { id: "marsh", name: "Marsh", initial: "M", color: "#5b8def", app: "jodoh", photo: "avatars/marsh.jpg" }
  ],

  /* ---------- Already on the phone ---------- */
  notes: [],
  photos: [
    { emoji: "☕", src: "photos/nik-coffee.jpg", caption: "Ms Azura's coffee, redone for the 4th time", date: "Year 1" },
    { src: "photos/nik-office-night.jpg", emoji: "🌃", caption: "Office at 11pm, again", date: "Year 7" }
  ],
  mail: [],
  searches: [],
  calls: [
    { name: "Ayah", type: "out", time: "Last week" }
  ],

  calendar: [
    { day: "Mon, 11 Nov", events: [{ time: "10:00 AM", title: "Ms Azura: Hartman meeting" }] },
    { day: "Thu, 14 Nov", events: [
      { time: "9:00 AM", title: "Ms Azura: board prep" },
      { time: "11:45 AM", title: "Remind Ms Azura: lunch" },
      { time: "2:00 PM", title: "Personal", note: "Half day. Do not tell anyone where." }
    ]},
    { day: "Thu, 21 Nov", events: [{ time: "7:30 PM", title: "Shareholders' Annual Dinner", note: "Seating plan v9 (final, hopefully)" }] },
    { day: "Fri, 29 Nov", events: [{ time: "All day", title: "Last day 🎀" }] }
  ],

  alarms: [
    { time: "6:00", label: "Wake up", on: true },
    { time: "7:30", label: "Leave for office", on: true },
    { time: "11:45", label: "Remind Ms Azura to eat lunch", on: true },
    { time: "15:00", label: "Ms Azura's afternoon coffee (NO fizzy drinks)", on: true },
    { time: "21:00", label: "Check Ms Azura's schedule for tomorrow", on: true }
  ],

  contacts: [
    { name: "Ayah", color: "#8bb98b" },
    { name: "Fin", subtitle: "Level 12", color: "#6a7fd0", photo: "avatars/fin.jpg" },
    { name: "Liza", subtitle: "Level 12 (senior)", color: "#3f9a8f", photo: "avatars/liza.jpg",
      notes: "Says \"ok.\" to everything.\nSays SEGHABUTTTTTT when things get messy.\nWill fight anyone for you, quietly." },
    { name: "Marsh", subtitle: "Jodoh match · Senior Researcher", color: "#5b8def", photo: "avatars/marsh.jpg" },
    { name: "Ms Azura (BOSS)", initial: "A", subtitle: "CEO", color: "#e0679a", photo: "avatars/azura.jpg",
      notes: "No spicy food. No fizzy drinks.\nBites her nails when a meeting goes badly.\nNever says thank you. Says \"fine\" instead." },
    { name: "Nikki", subtitle: "Replacement (very loud)", color: "#f2a65a" },
    { name: "Riz", subtitle: "Level 12 (always in a situation)", color: "#d9822b", photo: "avatars/riz.jpg" },
    { name: "Shen", subtitle: "Level 12 (sees everything)", color: "#9b6fc2", photo: "avatars/shen.jpg",
      notes: "Notices everything. Is always right.\nLoves nenen, kaki, ketiak. Says so openly." },
    { name: "Faris Hakimi (VP)", initial: "K", subtitle: "Vice President · Ms Azura's best friend (not by choice)", color: "#6c8ebf", photo: "avatars/kimi.jpg" }
  ],

  music: [
    { name: "resignation era 🎀", spotify: "https://open.spotify.com/playlist/1VWcLQOg6WNEY1cPVq6njZ", ytmusic: "https://music.youtube.com/playlist?list=PLX487HJkCchU", tracks: ["Unwritten by Natasha Bedingfield", "Flowers by Miley Cyrus", "Good as Hell by Lizzo", "9 to 5 by Dolly Parton"] },
    { name: "Ms Azura meeting mode (do not change)", spotify: "https://open.spotify.com/playlist/4KIycO5n24dJbJOB5D46le", ytmusic: "https://music.youtube.com/playlist?list=PLG79bs2BVASo", tracks: ["Weightless by Marconi Union", "River Flows in You by Yiruma"] },
    { name: "11pm overtime", spotify: "https://open.spotify.com/playlist/4OetlpdRLWLKQBz6vTofrY", ytmusic: "https://music.youtube.com/playlist?list=PLGBwu2e1BaPo", tracks: ["Midnight Rain by Taylor Swift", "Pink + White by Frank Ocean", "Bukan Cinta Biasa by Siti Nurhaliza"] }
  ],

  settings: {
    name: "Nikita Aulia", initial: "N", color: "#8a63c9", photo: "avatars/nik.jpg", wallpaper: "Custom",
    screenTime: [
      { app: "Messages", minutes: 250, label: "4h 10m", note: "Ms Azura (BOSS): 3h 52m" },
      { app: "Notes", minutes: 65, label: "1h 5m" },
      { app: "Calendar", minutes: 48, label: "48m" },
      { app: "Jodoh", minutes: 22, label: "22m" }
    ]
  },

  cameraText: "Tap the button to take a photo",
  cameraVideo: "videos/nik-camera.mp4",

  jodoh: {
    name: "Nikita", initial: "N", color: "#8a63c9", photo: "avatars/nik.jpg",
    job: "Executive Secretary",
    bio: "Organised. Punctual. Looking for someone who doesn't need reminders to eat lunch.",
    interestedIn: "Men & Women"
  },

  /* =====================================================================
     THE STORY
     ===================================================================== */
  beats: [

    /* ---------------- PART 1 ---------------- */
    { part: 1, title: "Personal Matter" },

    { when: "Fri 8 Nov, 5:21 PM", chat: "ayah", messages: [
      { from: "them", text: "Ayah dah dapat surat dari bank. Hutang dah settle semua." },
      { from: "them", text: "Terima kasih Nik. Ayah tak tahu nak cakap apa." },
      { from: "me", text: "Sama-sama Ayah. Lepas ni Nik nak rehat sikit 😊" },
      { from: "them", text: "Rehat lama-lama pun takpe." }
    ]},

    { when: "Fri 8 Nov, 11:02 PM", note: { revisit: true, title: "Things Ms Azura made me redo today", date: "Year 1",
      body: "1. Font size.\n2. Font size again.\n3. The coffee, because the foam was \"emotionally flat.\"\n\nDays until hutang ayah settles: too many." } },

    { when: "Fri 8 Nov, 11:40 PM", note: { title: "Resignation letter (draft 7)", date: "Fri 8 Nov",
      body: "Dear Ms Azura,\n\nPlease accept this letter as notice of my resignation as Executive Secretary. My last working day will be Friday, 29 November.\n\nThank you for the past nine years. I will make sure the handover is complete.\n\nNikita Aulia" } },

    { when: "Mon 11 Nov, 9:02 AM", mail: { folder: "Sent", from: "Nikita Aulia", to: "Ms Azura", subject: "Resignation",
      body: "Dear Ms Azura,\n\nPlease accept this letter as notice of my resignation as Executive Secretary. My last working day will be Friday, 29 November.\n\nThank you for the past nine years. I will make sure the handover is complete.\n\nNikita Aulia" } },

    { when: "Mon 11 Nov, 9:14 AM", mail: { from: "Ms Azura", to: "Nikita Aulia", subject: "Re: Resignation", body: "Received." } },

    { when: "Mon 11 Nov, 9:31 AM", chat: "office", messages: [
      { from: "Riz", text: "GUYS" },
      { from: "Riz", text: "kenapa HR cakap Nik resign???" },
      { from: "Fin", text: "eh wait what" },
      { from: "Liza", text: "ok." },
      { from: "Riz", text: "OK??? itu je you nak cakap??" },
      { from: "Liza", text: "I tengah process, Riz. bagi I grieve in peace." },
      { from: "Liza", text: "dan I perlukan Tealive untuk process benda ni." },
      { from: "Liza", text: "sembilan tahun. SEMBILAN. lepas ni siapa nak cari files? I? dengan mata I sendiri?" },
      { from: "Liza", text: "SEGHABUTTTTTT" },
      { from: "Shen", text: "Nik dah update LinkedIn minggu lepas. I dah agak." },
      { from: "Liza", text: "kenapa you tak cakap" },
      { from: "Shen", text: "sebab you pun dah agak" },
      { from: "Liza", text: "...betul." },
      { from: "me", text: "Betul 🙂 Last day 29 Nov. I'll do proper handover, don't worry." },
      { from: "Riz", text: "habis siapa nak selamatkan I dari printer tu 😭" },
      { from: "Liza", text: "printer tu bukan masalah, Riz. you yang masalah. printer tu mangsa." },
      { from: "Riz", text: "I dengan printer tu ada HISTORY tau" },
      { from: "Liza", text: "ya. history jenayah." },
      { from: "Fin", text: "congrats Nik!! 🎉" }
    ]},

    { when: "Mon 11 Nov, 9:40 AM", chat: "liza", messages: [
      { from: "them", text: "you okay?" },
      { from: "me", text: "I'm okay. Betul." },
      { from: "them", text: "ok." },
      { from: "them", text: "kalau dia susahkan you, bagitahu I." }
    ]},

    { when: "Mon 11 Nov, 2:10 PM", chat: "azura", messages: [
      { from: "them", text: "Ms Nikita. Salary plus 30%." },
      { from: "me", text: "Thank you, Ms Azura. My last day is still 29 November." },
      { from: "them", text: "New title. Executive Assistant Director." },
      { from: "me", text: "Thank you, Ms Azura. My last day is still 29 November." },
      { from: "them", text: "An office. With a window." },
      { from: "me", text: "Thank you, Ms Azura. My last day is still 29 November." },
      { from: "them", text: "Fine." },
      { from: "them", text: "Find your replacement." }
    ]},

    { when: "Mon 11 Nov, 2:30 PM", search: {
      query: "why would my boss offer a raise after I resign",
      results: [
        { site: "OfficeTalk Forum", path: "threads › resignations", title: "Boss offered me a raise after I resigned. Should I stay?",
          snippet: "Counter offers are common. Think about why you wanted to leave in the first place." },
        { site: "The Career Desk", path: "advice", title: "5 reasons employers make counter offers",
          snippet: "Replacing a trusted employee is hard, and some bosses only realise your value when you leave." }
      ],
      people: [
        { q: "Should I accept a counter offer?", a: "It depends on why you resigned. If money was not the reason, a raise rarely fixes it." }
      ]
    }},

    { when: "Mon 11 Nov, 11:15 PM", note: { title: "Reasons Ms Azura won't let me go", date: "Mon 11 Nov",
      body: "1. Contract clause? Checked. No.\n2. She hates change.\n3. She hasn't found someone else to blame for mistakes yet.\n4. Salary plus 30%?? For a secretary??\n5. ???" } },

    { when: "Tue 12 Nov, 10:05 AM", mail: { from: "HR Department", to: "Nikita Aulia", subject: "Replacement confirmed: handover from Wed 13 Nov",
      body: "Hi Nikita,\n\nYour replacement, Nikki, will join on Wednesday, 13 November. Please complete the attached handover checklist with her before your last day.\n\nHR Department" } },

    { when: "Wed 13 Nov, 9:12 AM", chat: "office", messages: [
      { event: "Riz added Nikki to the group" },
      { from: "Nikki", text: "HI SEMUA!!! 👋👋 I Nikki, secretary baru!! excited gila nak kerja dengan you all 🥹💕" },
      { from: "Riz", text: "akhirnya ada orang lagi bising dari I" },
      { from: "Liza", text: "sekarang dah ada dua. I nak buat aduan rasmi." },
      { from: "Fin", text: "welcome Nikki! 😊" },
      { from: "Nikki", text: "Liza I LOVE outfit you hari ni 😍😍" },
      { from: "Liza", text: "ok." },
      { from: "Liza", text: "...terima kasih. you boleh stay." },
      { from: "Riz", text: "Liza tak PERNAH cakap macam tu dekat I" },
      { from: "Liza", text: "you cakap outfit I macam \"lawyer yang benci you\", Riz." },
      { from: "Riz", text: "tu COMPLIMENT okay" },
      { from: "Nikki", text: "Kak Nik tengah train I, dia organised sangat sampai I takut 😭" },
      { from: "me", text: "Welcome, Nikki 🙂" }
    ]},

    { when: "Wed 13 Nov, 9:30 AM", banner: { title: "Ms Azura manual", text: "Nik opens an old note for Nikki's handover" },
      note: { revisit: true, title: "Ms Azura manual", date: "Year 6",
        body: "If she says \"I'm fine\" twice, cancel her 3pm.\nNo spicy food. No fizzy drinks.\nIf she bites her nails in a meeting, the meeting is going badly. Prepare plan B.\nAlways prepare two versions. She will reject the first one." } },

    { when: "Wed 13 Nov, 10:07 AM", chat: "office", messages: [
      { from: "Riz", text: "kenapa DUA DUA Nik lari masuk bilik CEO 😭" },
      { from: "Fin", text: "dia panggil \"NIK\" kat intercom" },
      { from: "Riz", text: "lepas tu dua dua bangun serentak, I nangis" },
      { from: "Nikki", text: "I INGATKAN DIA PANGGIL I 😭" },
      { from: "Liza", text: "bukan." },
      { from: "Liza", text: "I tengok semua dari meja I. dua orang pecut ke satu pintu. macam dokumentari haiwan." },
      { from: "Nikki", text: "Ms Azura cakap \"Nikki is Nikki. Nik is Nik.\" 🥲 apa MAKSUD dia" },
      { from: "Liza", text: "dua Nik. satu intercom. CEO yang tak reti sebut nama penuh." },
      { from: "Liza", text: "SEGHABUTTTTTT." },
      { from: "Shen", text: "CEO tak pernah panggil sesiapa guna nama pendek. sembilan tahun." },
      { from: "Liza", text: "tak pernah." },
      { from: "Shen", text: "👀" },
      { from: "Liza", text: "👀" },
      { from: "Riz", text: "maksudnya CEO ada favourite 👀" },
      { from: "Liza", text: "Riz. Pergi buat kerja." },
      { from: "Riz", text: "I TENGAH buat kerja lah. ni kerja I sekarang" },
      { from: "Liza", text: "...fine. sambung. perlahan-lahan. I pun nak tahu." },
      { from: "Riz", text: "👀👀👀" }
    ]},

    { when: "Wed 13 Nov, 9:14 PM", chat: "marsh", messages: [
      { from: "them", text: "Hi Nikita! Your bio made me laugh 😄" },
      { from: "me", text: "Thank you. It was not a joke." },
      { from: "them", text: "even better. coffee tomorrow? I know a good place" },
      { from: "me", text: "Tomorrow 2:00 PM works. I will take half day." },
      { from: "them", text: "a woman with a schedule. I like it" }
    ]},

    { when: "Wed 13 Nov, 10:40 PM", note: { title: "Nik", date: "Wed 13 Nov",
      body: "Nine years. Always \"Ms Nikita.\"\n\nToday she said Nik.\n\nProbably because Nikki is here now. Easier to tell us apart.\n\nProbably." } },

    { when: "Thu 14 Nov, 8:15 AM", chat: "marsh", messages: [
      { from: "them", text: "still on for 2pm? 😊" },
      { from: "me", text: "Confirmed. 2:00 PM, Maison Lumière, Jalan Pinang. I will be there 10 minutes early." },
      { from: "them", text: "haha very professional. see you, Nikita" }
    ]},

    { when: "Thu 14 Nov, 11:48 AM", chat: "azura", messages: [
      { from: "me", text: "Ms Azura, may I take half day today? Nikki can handle the afternoon." },
      { from: "them", text: "Reason?" },
      { from: "me", text: "Personal matter." },
      { from: "them", text: "Fine." }
    ]},

    { when: "Thu 14 Nov, 12:05 PM", search: {
      query: "first date what to talk about",
      results: [
        { site: "The Career Desk", path: "life", title: "Good first date questions",
          snippet: "Ask about their hobbies. Do not talk about work the whole time." },
        { site: "OfficeTalk Forum", path: "threads › life", title: "How do I stop talking about my boss on dates?",
          snippet: "Top reply: put your phone face down. Then put it in your bag." }
      ]
    }},

    { when: "Thu 14 Nov, 1:40 PM", photo: { camera: true, src: "photos/nik-outfit.jpg", emoji: "👗", caption: "Outfit check before the date" } },

    { when: "Thu 14 Nov, 2:31 PM", chat: "nikki", messages: [
      { from: "them", text: "KAK NIK 😭😭 Ms Azura panggil you, I yang pergi" },
      { from: "them", text: "dia tanya you kat mana" },
      { from: "them", text: "I panik" },
      { from: "them", text: "I cakap blind date 🙂" },
      { from: "them", text: "tapi I cakap dengan SUPPORTIVE!! 💕 good luck kak!!" },
      { from: "me", text: "Nikki." },
      { from: "me", text: "Kenapa." },
      { from: "them", text: "I'M SORRY KAK 😭 dia pandang I, mulut I terbuka sendiri" },
      { from: "me", text: "Takpe. Tapi jangan. JANGAN bagitahu dia location." },
      { from: "them", text: "..." },
      { from: "me", text: "Nikki." }
    ]},

    { when: "Thu 14 Nov, 2:34 PM", chat: "azura", messages: [
      { from: "them", text: "Ms Nikita. Where is the Hartman file." },
      { from: "them", text: "Also the password for my email." },
      { from: "them", text: "Also, is a blind date considered a \"personal matter.\"" },
      { from: "me", text: "Hartman file is in the second drawer, Ms Azura. Email password is in your Notes, titled \"DO NOT OPEN.\"" },
      { from: "me", text: "And yes. It is personal." }
    ]},

    { when: "Thu 14 Nov, 2:36 PM", call: { name: "Ms Azura (BOSS)", type: "missed", count: 2, note: "Nik lets it ring." } },

    { when: "Thu 14 Nov, 2:43 PM", chat: "vp", messages: [
      { from: "them", text: "Hi Nik! Soalan random" },
      { from: "them", text: "cafe mana you suka sekarang? for research" },
      { from: "me", text: "Is this Ms Azura asking?" },
      { from: "them", text: "..." },
      { from: "them", text: "tak" },
      { from: "them", text: "Enjoy your afternoon!! 😊" }
    ]},

    { when: "Thu 14 Nov, 2:58 PM", chat: "azura", messages: [
      { from: "them", text: "Ms Nikita. The shareholders' annual dinner is next week." },
      { from: "them", text: "The seating plan has 3 mistakes. The menu has 2." },
      { from: "them", text: "Interesting that you chose today for a \"personal matter.\"" },
      { from: "me", text: "The seating plan was approved by you on Monday, Ms Azura." },
      { from: "them", text: "I changed my mind." },
      { from: "them", text: "I'm coming to you. We'll fix it there." },
      { from: "me", text: "Ms Azura, you don't know where I am." },
      { status: "Seen" }
    ]},

    /* ---------------- PART 3 (Part 2 is on Azura's phone) ---------------- */
    { part: 3, title: "The Office Needs You" },

    { when: "Thu 14 Nov, 6:02 PM", chat: "nikki", messages: [
      { from: "them", voice: "0:47" },
      { from: "them", text: "voice note tu I minta maaf lagi 😭" }
    ]},

    { when: "Thu 14 Nov, 7:12 PM", chat: "marsh", messages: [
      { from: "them", text: "Hey, I had a nice time. Mostly." },
      { from: "them", text: "Is your boss always like that?" },
      { from: "them", text: "Also my neck still hurts a bit lol" },
      { from: "me", text: "I'm so sorry. She shouted and my hand just pulled." },
      { from: "me", text: "Yes. She is always like that." },
      { from: "them", text: "I paid for her latte and she said it was too foamy 😭" },
      { from: "me", text: "That means she liked it." },
      { from: "them", text: "😂 noted" }
    ]},

    { when: "Thu 14 Nov, 8:30 PM", chat: "office", messages: [
      { from: "Riz", text: "so... date macam mana 👀" },
      { from: "Nikki", text: "KAK NIK I MINTA MAAF SANGAT 😭😭😭" },
      { from: "Fin", text: "eh apa jadi?" },
      { from: "Riz", text: "I dengar CEO datang???" },
      { from: "Liza", text: "Riz." },
      { from: "Riz", text: "I TANYA JE" },
      { from: "Liza", text: "you bukan \"tanya je\". you ada spreadsheet. I nampak." },
      { from: "Riz", text: "tu TIMELINE lah. untuk ketepatan" },
      { from: "Riz", text: "oh and I terkunci dalam pantry tadi. tak related" },
      { from: "Liza", text: "macam mana. MACAM MANA. pintu pantry tu takde kunci pun." },
      { from: "Riz", text: "I jumpa satu 🙂" },
      { from: "Liza", text: "CEO. pergi blind date orang. hari Khamis petang." },
      { from: "Liza", text: "dan Riz, terkunci dalam bilik yang takde kunci." },
      { from: "Liza", text: "satu company ni SEGHABUTTTTTT." },
      { from: "Liza", text: "...hantar timeline tu kat I, Riz." },
      { from: "me", text: "It was fine. Goodnight semua 🙂" }
    ]},

    { when: "Thu 14 Nov, 9:10 PM", chat: "liza", messages: [
      { from: "them", text: "dia pergi date you?" },
      { from: "me", text: "Yes." },
      { from: "them", text: "ok." },
      { from: "them", text: "dia tak buat macam tu untuk orang lain, you tahu tak." },
      { from: "them", text: "goodnight Nik." }
    ]},

    { when: "Thu 14 Nov, 10:40 PM", note: { title: "Today", date: "Thu 14 Nov",
      body: "Fixed Marsh's tie. Ms Azura shouted NIK. Strangled a woman.\n\nMs Azura sat at our table and fixed the seating plan for 40 minutes. Marsh paid for her latte. She said it was too foamy.\n\nShe called me Nik again." } },

    { when: "Thu 14 Nov, 11:05 PM", photos: [
      { hidden: true, src: "photos/hidden-asleep.jpg", emoji: "😴", caption: "Ms Azura asleep in the meeting room", date: "Year 4" },
      { hidden: true, src: "photos/hidden-laughing.jpg", emoji: "🎉", caption: "Ms Azura laughing at the year-end party", date: "Year 6" },
      { hidden: true, src: "photos/hidden-rain.jpg", emoji: "☔", caption: "Ms Azura in the rain, refusing an umbrella", date: "Year 8" }
    ]},

    { when: "Thu 14 Nov, 11:47 PM", chat: "azura", messages: [
      { from: "them", text: "Ms Nikita. 8am tomorrow. The office needs you." }
    ]},

    /* ---------------- PART 5 ---------------- */
    { part: 5, title: "The Blockbuster Effect" },

    { when: "Sat 16 Nov, 10:12 AM", chat: "marsh", messages: [
      { from: "them", text: "morning Nikita! free next weekend? I promise no CEOs this time 😅" },
      { from: "me", text: "I have the company dinner on Thursday. After that, maybe." },
      { from: "them", text: "maybe is good. I'll take maybe" },
      { from: "them", voice: "0:12" },
      { from: "them", text: "that's just me saying good luck lol" }
    ]},

    { when: "Mon 18 Nov, 8:34 AM", chat: "office", messages: [
      { from: "Riz", text: "GUYS. LATTE. MAISON LUMIÈRE. ATAS MEJA SETIAP ORANG" },
      { from: "Fin", text: "cawan dia ada nama CEO 😳" },
      { from: "Riz", text: "I dah addicted. I tak boleh balik Nescafe 3 in 1 dah" },
      { from: "Liza", text: "ini bukan latte. ini strategi." },
      { from: "Riz", text: "strategi apa" },
      { from: "Liza", text: "dia nak buat semua benda lain nampak cikai." },
      { from: "Liza", text: "I tak minum latte orang kaya. I setia dengan Tealive." },
      { from: "Riz", text: "sebab gambar you ada kat dinding Tealive bawah tu ke" },
      { from: "Liza", text: "\"Pelanggan Paling Setia\". tiga tahun berturut-turut." },
      { from: "Shen", text: "empat. you lupa tahun PKP. delivery pun kira." },
      { from: "Liza", text: "...betul." },
      { from: "Riz", text: "staff dia dah start buat air you bila nampak you lalu" },
      { from: "Liza", text: "itu namanya hubungan yang sihat, Riz." },
      { from: "Shen", text: "CEO tukar perfume minggu ni." },
      { from: "Liza", text: "macam mana you tahu" },
      { from: "Shen", text: "I perasan semua benda. perfume. kasut. nenen." },
      { from: "Liza", text: "SEGHABUT LA KO SHEN" },
      { from: "Shen", text: "tapi betul kan perfume dia tukar" },
      { from: "Liza", text: "...betul." },
      { from: "Nikki", text: "Ms Azura pakai TIE hari ni 😳😳" },
      { from: "Fin", text: "tie?? CEO pakai tie??" },
      { from: "Riz", text: "dan tie dia LURUS. sangat lurus. macam ada orang nak buktikan sesuatu" },
      { from: "Liza", text: "SEGHABUTTTTTT." },
      { from: "me", text: "..." }
    ]},

    { when: "Mon 18 Nov, 10:15 AM", chat: "azura", messages: [
      { from: "them", text: "Ms Nikita. The dinner venue. I've upgraded it." },
      { from: "me", text: "It was already at a five-star hotel, Ms Azura." },
      { from: "them", text: "Now it's the ballroom. With a string quartet." },
      { from: "me", text: "For a shareholders' dinner?" },
      { from: "them", text: "For a shareholders' dinner." },
      { from: "me", text: "Noted." }
    ]},

    { when: "Mon 18 Nov, 12:40 PM", chat: "nikki", messages: [
      { from: "them", text: "Kak Nik!! hotel tanya nak bunga apa 😭 I tak tahu Ms Azura suka bunga apa" },
      { from: "me", text: "White peonies. No lilies. She says they smell like a hospital." },
      { from: "them", text: "KAK NIK macam mana you tahu SEMUA 😭😭" },
      { from: "me", text: "Nine years, Nikki." },
      { from: "them", text: "also Ms Azura tanya I tadi kalau you senyum tengok phone 👀" },
      { from: "me", text: "What?" },
      { from: "them", text: "tak, takde apa!! I salah dengar!! bye kak!! 🏃‍♀️💨" }
    ]},

    { when: "Mon 18 Nov, 3:00 PM", search: {
      query: "why does my boss care about my personal life",
      results: [
        { site: "OfficeTalk Forum", path: "threads › bosses", title: "My boss gets weird every time I mention my date",
          snippet: "Top reply: she's not weird. she's jealous. next question." }
      ],
      people: [
        { q: "Is it normal for a boss to ask about your weekend?", a: "Once is polite. Every day is something else." }
      ]
    }},

    { when: "Tue 19 Nov, 7:15 AM", chat: "azura", messages: [
      { from: "them", text: "Ms Nikita. There is a car outside your house." },
      { from: "me", text: "Ms Azura, I have a car." },
      { from: "them", text: "Now you have a better one." },
      { from: "me", text: "How do you know my address?" },
      { from: "them", text: "It's in your HR file." },
      { from: "me", text: "You've never opened an HR file in your life." },
      { from: "them", text: "I opened one this morning." }
    ]},

    { when: "Tue 19 Nov, 8:40 AM", chat: "office", messages: [
      { from: "Fin", text: "guys... Nik keluar kereta hitam kat lobby tadi. driver bukakan pintu" },
      { from: "Riz", text: "WHAT" },
      { from: "Riz", text: "Marsh hantar voice note. CEO hantar KERETA" },
      { from: "Liza", text: "I dah cakap. ini perang. Marsh bawa pisau, CEO bawa kereta kebal." },
      { from: "Liza", text: "SEGHABUTTTTTT." },
      { from: "me", text: "Boleh tak semua orang buat kerja." },
      { from: "Riz", text: "dia marah 👀 maksudnya betul" }
    ]},

    { when: "Tue 19 Nov, 12:30 PM", chat: "situation", messages: [
      { event: "Liza created the group \"Nik's Situation 👀\"" },
      { event: "Liza added Shen and you" },
      { from: "Shen", text: "ok. I dah buat timeline." },
      { from: "Liza", text: "bukan timeline Riz. timeline Shen ni accurate." },
      { from: "Shen", text: "Isnin: latte. Selasa: tie. hari ni: kereta." },
      { from: "Liza", text: "esok: helikopter." },
      { from: "Shen", text: "lusa: rumah." },
      { from: "Shen", text: "and Nik pakai heels baru hari ni." },
      { from: "me", text: "For myself." },
      { from: "Shen", text: "kaki you lawa. CEO setuju. dia tengok kaki you masa meeting pagi tadi." },
      { from: "Liza", text: "Shen. kenapa you tengok CEO tengok kaki Nik" },
      { from: "Shen", text: "I suka kaki. semua orang tahu." },
      { from: "Liza", text: "SEGHABUT LA KO SHEN" },
      { from: "me", text: "Kenapa I ada dalam group ni." },
      { from: "Liza", text: "sebab you subjek kajian." },
      { from: "Shen", text: "research kena ada consent. ni consent form you." },
      { from: "me", text: "I don't consent." },
      { from: "Liza", text: "noted." },
      { from: "Shen", text: "noted." }
    ]},

    { when: "Tue 19 Nov, 9:30 PM", note: { title: "Why am I comparing", date: "Tue 19 Nov",
      body: "Marsh sent me a voice note saying good luck.\nMs Azura sent a car.\n\nMarsh bought one latte.\nMs Azura bought lattes for the whole floor. With her name on them.\n\nMarsh's tie was crooked.\nMs Azura has worn a perfect tie for two days. She has never owned a tie.\n\nWhy am I comparing.\n\nEight more working days." } },

    { when: "Wed 20 Nov, 11:00 AM", chat: "liza", messages: [
      { from: "them", text: "you okay? muka you macam tak tidur" },
      { from: "me", text: "Dinner is tomorrow. I'm fine." },
      { from: "them", text: "ok." },
      { from: "them", text: "Nik. dia beli tie. I tak pernah tengok dia buat effort untuk apa-apa selain share price." },
      { from: "me", text: "It's for the shareholders." },
      { from: "them", text: "ok. kalau you nak percaya macam tu." },
      { from: "them", text: "SEGHABUTTTTTT betul la korang berdua ni." }
    ]},

    { when: "Wed 20 Nov, 6:30 PM", mail: { from: "Ms Azura", to: "Nikita Aulia", subject: "Tomorrow: run-sheet",
      body: "Ms Nikita,\n\nAfter the dessert course, I will make an announcement. Leave five minutes free in the run-sheet.\n\nDo not ask what it is.\n\nAzura Adnan\nCEO" } },

    { when: "Wed 20 Nov, 11:20 PM", chat: "marsh", messages: [
      { from: "them", text: "good luck tomorrow Nikita! you'll do great" },
      { from: "them", text: "also random but... your boss followed me on LinkedIn today" },
      { from: "them", text: "and endorsed me for \"Making Coffee\" 😭" },
      { from: "me", text: "...I'm so sorry." }
    ]},

    { when: "Wed 20 Nov, 11:55 PM", chat: "azura", messages: [
      { unsent: "Did you follow Marsh on LinkedIn" },
      { unsent: "Why are you doing all this" },
      { from: "me", text: "Goodnight, Ms Azura. See you at the dinner." },
      { from: "them", text: "Wear something nice." },
      { from: "them", text: "Not for me. For the shareholders." }
    ]},

    /* ---------------- PART 7 ---------------- */
    { part: 7, title: "Indie Film" },

    { when: "Fri 22 Nov, 9:10 AM", chat: "office", messages: [
      { from: "Riz", text: "CEO announce DESSERT 😭😭😭" },
      { from: "Fin", text: "tapi dessert tu sedap gila" },
      { from: "Liza", text: "lima minit. depan 40 shareholders. untuk dessert." },
      { from: "Liza", text: "SEGHABUTTTTTT." },
      { from: "Nikki", text: "speech Kak Nik semalam buat I nangis 🥹" },
      { from: "me", text: "Can we not." }
    ]},

    { when: "Fri 22 Nov, 12:30 PM", chat: "marsh", messages: [
      { from: "them", text: "how was the dinner?" },
      { from: "me", text: "Long. Beautiful. Strange. My boss announced dessert." },
      { from: "them", text: "😂 wait what" },
      { from: "me", text: "Don't ask." },
      { from: "them", text: "still on for tomorrow? coffee, my treat. normal cafe. no string quartet" },
      { from: "me", text: "Yes. I'd like that." }
    ]},

    { when: "Fri 22 Nov, 2:00 PM", chat: "situation", messages: [
      { from: "Shen", text: "speech Nik semalam. dia sebut nama CEO 4 kali." },
      { from: "Liza", text: "CEO tengok dia 47 kali." },
      { from: "Shen", text: "48. you terlepas satu masa dessert." },
      { from: "Liza", text: "I tengah makan dessert." },
      { from: "Shen", text: "CEO pakai sleeveless semalam." },
      { from: "Liza", text: "kenapa you perasan" },
      { from: "Shen", text: "ketiak dia cantik. I perasan benda cantik." },
      { from: "Liza", text: "SEGHABUT LA KO SHEN" },
      { from: "Shen", text: "and Nik pun tengok ketiak tu. 3 kali." },
      { from: "me", text: "I DID NOT." },
      { from: "Shen", text: "4." },
      { from: "me", text: "You two were COUNTING?" },
      { from: "Shen", text: "kami researcher." },
      { from: "Liza", text: "dibayar dalam Tealive." },
      { from: "Shen", text: "tak dibayar langsung." },
      { from: "Liza", text: "...betul." }
    ]},

    { when: "Sat 23 Nov, 1:40 PM", photo: { camera: true, src: "photos/nik-marsh-coffee.jpg", emoji: "☕", caption: "Coffee with Marsh. Normal cafe. No string quartet." } },

    { when: "Sat 23 Nov, 6:10 PM", note: { title: "Saturday", date: "Sat 23 Nov",
      body: "Marsh laughed at all my jokes. Even the bad ones.\nShe didn't fix anything. She didn't upgrade anything.\nIt was just nice.\n\nI only checked my phone twice.\n(Ms Azura didn't text. Good. That's good.)\n\nI think I like her." } },

    { when: "Sat 23 Nov, 9:45 PM", chat: "marsh", messages: [
      { from: "me", text: "I had a really nice time today." },
      { from: "me", text: "I'd like to do it again. Properly. Not just coffee." },
      { from: "them", text: "Nikita. I had a really nice time too." },
      { from: "them", text: "and that's why I want to be honest with you" },
      { from: "them", text: "today you checked your phone 6 times" },
      { from: "them", text: "every time it wasn't her, you looked a little sad" },
      { from: "them", text: "I don't think I'm the one you're waiting for" },
      { from: "them", text: "I think there's someone out there silently waiting for you. probably in a very expensive tie 😅" },
      { from: "them", text: "we can still be friends tho. I mean it. I'd really like that." },
      { unsent: "But I like you" },
      { from: "me", text: "Okay." },
      { from: "me", text: "Friends." },
      { from: "them", text: "friends 🤍" },
      { from: "them", text: "and Nikita... don't make her wait too long. she looks terrible at waiting." }
    ]},

    { when: "Sat 23 Nov, 11:30 PM", note: { title: "Six", date: "Sat 23 Nov",
      body: "Six times.\nI counted two.\nShe counted six.\n\nEvery time it wasn't her.\n\nHer who.\n\n..." } },

    { when: "Sun 24 Nov, 10:20 AM", chat: "liza", messages: [
      { from: "me", text: "Liza. Are you free?" },
      { from: "them", text: "for you, ya." },
      { from: "me", text: "Marsh said we should just be friends." },
      { from: "them", text: "ok." },
      { from: "them", text: "you okay?" },
      { from: "me", text: "She said someone is waiting for me." },
      { from: "them", text: "she pandai. I suka dia." },
      { from: "them", text: "nak I datang? I bawa ice cream. dan Tealive brown sugar. dua-dua untuk I." },
      { from: "them", text: "and I tak cakap SEGHABUTTTTTT. sekali je." },
      { from: "me", text: "Okay." }
    ]},

    { when: "Sun 24 Nov, 9:30 PM", chat: "liza", messages: [
      { from: "them", text: "dah sampai rumah. ice cream tu habiskan, jangan bazir" },
      { from: "me", text: "Thank you, Liza." },
      { from: "me", text: "Can I ask you something?" },
      { from: "them", text: "tanya." },
      { from: "me", text: "Marsh said someone is waiting for me. Who?" },
      { from: "them", text: "..." },
      { from: "them", text: "Nik. you serius ke ni" },
      { from: "them", text: "ok jom kita list." },
      { from: "them", text: "siapa beli latte untuk satu floor, dengan nama dia kat setiap cawan" },
      { from: "them", text: "siapa tiba-tiba pakai tie, padahal seumur hidup tak pernah ada tie" },
      { from: "them", text: "siapa hantar kereta ke rumah you" },
      { from: "them", text: "siapa follow date you kat LinkedIn" },
      { from: "them", text: "siapa announce DESSERT depan 40 orang sebab plan dia kena counter dengan you" },
      { from: "me", text: "That's Ms Azura." },
      { from: "them", text: "tahniah. you boleh membaca." },
      { from: "me", text: "But that's just Ms Azura being Ms Azura. She's competitive." },
      { from: "them", text: "dengan siapa, Nik. DENGAN SIAPA dia bersaing." },
      { from: "me", text: "..." },
      { from: "me", text: "Am I that blind?" },
      { from: "them", text: "blind tu satu. denial tu satu lagi." },
      { from: "them", text: "you ada dua-dua. combo." },
      { from: "me", text: "Liza." },
      { from: "them", text: "I sayang you. sebab tu I cakap." },
      { from: "them", text: "SEGHABUTTTTTT. sekali je. dah janji." },
      { from: "me", text: "I'm going to sleep this off." },
      { from: "them", text: "tidur la. esok bangun, still dia jugak." },
      { from: "them", text: "goodnight, blind woman." }
    ]},

    /* ---------------- PART 9 ---------------- */
    { part: 9, title: "Kak Zura" },

    { when: "Sun 24 Nov, 11:47 PM", chat: "azura", messages: [
      { from: "them", text: "Ms Nikita. Five working days left." }
    ]},

    { when: "Mon 25 Nov, 2:47 AM", chat: "azura", messages: [
      { from: "them", text: "Nik." },
      { from: "them", text: "I can't sleep. I haven't slept properly since you resigned." },
      { from: "them", text: "I offered you money. A title. A window. A car. A string quartet." },
      { from: "them", text: "None of that was the point." },
      { from: "them", text: "I don't want a secretary." },
      { from: "them", text: "I want you." },
      { from: "them", text: "Not in the office. In my life." },
      { from: "them", text: "You can still leave on Friday. I won't stop you." },
      { from: "them", text: "But I couldn't let you go without saying it." }
    ]},

    { when: "Mon 25 Nov, 6:02 AM", chat: "liza", messages: [
      { from: "me", text: "Liza." },
      { from: "me", text: "LIZA." },
      { from: "them", text: "pukul 6 pagi Nik. Tealive pun belum buka. ni kecemasan ke" },
      { from: "me", text: "She texted me. At 2:47 AM." },
      { from: "me", text: "She said she wants me. In her life." },
      { from: "them", text: "..." },
      { from: "them", text: "OK." },
      { from: "them", text: "I NAK BANGUN BETUL-BETUL UNTUK NI" },
      { from: "them", text: "so? you blind lagi tak" },
      { from: "me", text: "No." },
      { from: "me", text: "I think I've known for a long time." },
      { from: "them", text: "SEGHABUTTTTTT tapi yang baik punya 😭" },
      { from: "them", text: "pergi. cakap dengan dia. sekarang." },
      { from: "me", text: "Ok ok ok I pergi" }
    ]},

    { when: "Mon 25 Nov, 6:20 AM", note: { title: "Nine years", date: "Mon 25 Nov",
      body: "Year 1: I hated her.\nYear 3: I learned how she takes her coffee.\nYear 6: I wrote her a manual.\nYear 9: I resigned.\nYear 9, five working days left: she said it first.\n\nOf course she did. She always has to win." } },

    { when: "Mon 25 Nov, 6:35 AM", chat: "azura", messages: [
      { unsent: "Ms Azura," },
      { from: "me", text: "You said I can still leave on Friday." },
      { from: "me", text: "I'm still leaving on Friday." },
      { from: "them", text: "I understand." },
      { from: "me", text: "I'm leaving the job." },
      { from: "me", text: "Not you." },
      { from: "me", text: "Kak Zura." },
      { from: "them", text: "..." },
      { from: "them", text: "Say it again." },
      { from: "me", text: "Kak Zura." },
      { from: "them", text: "Took you nine years." },
      { from: "me", text: "You took nine years and a string quartet." },
      { from: "them", text: "Fair." }
    ]},

    { when: "Mon 25 Nov, 6:50 AM", rename: { thread: "azura", name: "Kak Zura 🤍" } },

    { when: "Mon 25 Nov, 7:00 AM", chat: "situation", messages: [
      { from: "me", text: "It happened." },
      { from: "Shen", text: "I know." },
      { from: "Liza", text: "akhirnya." },
      { from: "Shen", text: "akhirnya." },
      { from: "me", text: "How do you already know?" },
      { from: "Shen", text: "I dah tahu sejak Year 6. masa you tulis \"Ms Azura manual\"." },
      { from: "me", text: "How do you know about that??" },
      { from: "Shen", text: "you print. guna printer Riz." },
      { from: "Liza", text: "printer tu mangsa. tapi berguna." }
    ]},

    { when: "Mon 25 Nov, 8:40 AM", chat: "office", messages: [
      { from: "Riz", text: "GUYS" },
      { from: "Riz", text: "CEO SENYUM" },
      { from: "Riz", text: "CEO SENYUM KAT LIF. DEKAT I. I TAK TAHU NAK BUAT APA" },
      { from: "Fin", text: "kenapa dia pegang tangan Nik" },
      { from: "Riz", text: "WHAT" },
      { from: "Nikki", text: "KAK NIK??? 😭😭😭💕" },
      { from: "Liza", text: "akhirnya." },
      { from: "Liza", text: "sembilan tahun. dua orang bijak. satu otak pun takde." },
      { from: "Shen", text: "I tulis tarikh ni dalam diary I tiga bulan lepas." },
      { from: "Liza", text: "I empat bulan." },
      { from: "Shen", text: "you menipu." },
      { from: "Liza", text: "sikit." },
      { from: "Liza", text: "SEGHABUTTTTTT. 🤍" },
      { from: "me", text: "Go back to work, everyone 🙂" },
      { from: "Riz", text: "ini kerja I sekarang 👀" }
    ]},

    { when: "Mon 25 Nov, 9:15 AM", chat: "marsh", messages: [
      { from: "me", text: "You were right." },
      { from: "them", text: "I usually am 😌" },
      { from: "them", text: "friends?" },
      { from: "me", text: "Friends." },
      { from: "them", text: "also please tell your CEO to unendorse me for \"Making Coffee\"" }
    ]},

    { when: "Mon 25 Nov, 11:45 AM", chat: "azura", messages: [
      { from: "them", text: "Nik. Lunch." },
      { from: "me", text: "I already set your reminder, Kak Zura." },
      { from: "them", text: "No. Lunch. With me. Not as my secretary." },
      { from: "me", text: "Okay." },
      { from: "them", text: "And Nik." },
      { from: "me", text: "Yes?" },
      { from: "them", text: "\"Kak Zura\" is not allowed in the office." },
      { from: "me", text: "Okay, Kak Zura." },
      { from: "them", text: "...Fine." }
    ]},

    /* ---------------- PART 11 (POST-CREDITS) ---------------- */
    { part: 11, title: "Post-credits" },

    { when: "Sun 15 Dec, 9:40 PM", note: { title: "Marsh", date: "Sun 15 Dec",
      body: "Marsh ada gf baru. Ella kot?\n\nBut I'm happy for her. Truly." } }
  ]
};
