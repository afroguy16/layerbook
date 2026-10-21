// English / Pidgin copy. Pidgin is a draft, validate with users.
const en = {
  jobs: "Jobs", bookings: "Bookings", newCar: "New car", plate: "Plate number?", onFile: "On file", notHere: "Not here? Add {p} as new car", next: "Next",
  brand: "Which brand?", other: "Other", modelYear: "Which model and year?", model: "Model", year: "Year",
  found: "What did you find?", tapAll: "Tap all that apply", picked: "Next · {n} picked", quick: "How quick?", fixNow: "Critical", fixSoon: "Fix soon", canWait: "Can wait",
  notSafe: "Not safe to drive", w2: "Within 2 weeks", nextSvc: "Next service", tapOne: "Tap one to go on", owner: "Owner", bothOpt: "Both optional", name: "Name", wa: "WhatsApp number", skip: "Skip",
  checkSave: "Check and save", car: "Car", problems: "Problems", change: "Change", save: "Save", addProblem: "Add problem", addingTo: "Adding to {p}", addedTo: "Added to {p}", undo: "Undo",
  sendWa: "Send on WhatsApp", done: "Done", today: "Today", tomorrow: "Tomorrow", confirmed: "Confirmed", waiting: "Waiting for owner", nProb: "{n} problem(s)",
  booking: "Booking", remind: "Remind on WhatsApp", resched: "Reschedule", cancel: "Cancel booking", sent: "Reminder sent", cancelled: "Booking cancelled",
  bookCar: "Book visit", whichDay: "Which day?", whatTime: "What time?", checkSend: "Check and send", send: "Send booking", bookSent: "Booking sent to {o}", oneVisit: "One visit for all problems",
  wallet: "Wallet", balance: "Balance", freeStart: "Free credit at the start", feeLine: "Booking fee when completed: ₦{f}", recent: "Recent", topUp: "Top up", howMuch: "How much?", haveCode: "Have a code?", codeOk: "Code applied", codeBad: "Code not valid", perBooking: "Per completed booking",
  payHow: "Pay how?", bank: "Bank transfer", card: "Card", instant: "Instant", pay: "Pay ₦{a}", paid: "Paid ₦{a}", newBal: "New balance ₦{b}", bk: "{n} bookings",
  language: "Language", team: "Team", host: "Host tools", hostSub: "for test visits", help: "Help", logout: "Log out", ownerView: "Owner view (demo)", reset: "Reset demo data",
  welcome: "Welcome", yourPhone: "Your phone number?", smsCode: "We send a code by SMS", sendCode: "Send code", enterCode: "Enter the code", sentTo: "Sent to {p}", again: "Send again in 0:42",
  wsName: "Workshop name?", ownersSee: "Owners see this on WhatsApp", area: "Which area?", noCars: "No cars yet", noCarsSub: "When a car comes in, tap + to log it. Takes 30 seconds.",
  search: "Search", home: "Home", dueWeek: "Cars due back this week", fillWeek: "Remind them and fill your week", remindAll: "Remind all on WhatsApp", remindAllN: "Remind all {n} on WhatsApp",
  bookedTT: "booked today & tomorrow", cameBack: "came back this month", upNext: "Up next", seeAll: "See all", dueBack: "Cars due back", nThis: "{n} cars this week", nNext: "{n} cars next week",
  thisWeek: "This week", nextWeek: "Next week", remindBtn: "Remind", sentBtn: "Sent ✓", remindedTo: "Sent on WhatsApp to {o}", remindedN: "Sent on WhatsApp to {n} owners", allSent: "All reminded", soonTeam: "Coming soon", bkMoved: "Booking moved", bkResched: "Save new time", startJob: "Start job", msgOwner: "Message owner", cancelBk: "Cancel booking", discardBk: "Discard this booking?", discardJob: "Discard this job?", keepGoing: "Keep going", discard: "Discard",
  bkWork: "What work?", bkPre: "Fix-later items for this car are already picked.", bkFixing: "What needs fixing?", howUrgent: "How urgent?", estCost: "Estimated cost", anythingElse: "Anything else?", addAnother: "+ Add another", noNext: "No, next", noteOpt: "Note (optional)", noteEg: "e.g. owner to bring parts", fixLaterPre: "Fix-later items for this car are shown first.", bkDay: "Which day?", bkPick: "Pick a date", bkTime: "What time?", morning: "Morning", afternoon: "Afternoon",
  bkCheck: "Check and book", bkBook: "Book", bkDone: "✓ Booked", bkDoneSub: "Owner gets a WhatsApp message now and a reminder the day before.", bkWaPreview: "WhatsApp to owner", bkReminder: "Reminder, day before",
  bkStart: "Book a car", bkUpcoming: "Upcoming", bkNone: "No bookings yet.", bkTitle: "Bookings",
};
type K = keyof typeof en;
const pcm: Partial<Record<K, string>> = {
  plate: "Wetin be plate number?", notHere: "E no dey? Add {p} as new motor", next: "Continue", brand: "Which brand motor?", modelYear: "Which model and year?",
  found: "Wetin you see?", tapAll: "Tap all wey concern", picked: "Continue · {n} picked", quick: "How quick?", fixNow: "Fix am now", fixSoon: "Fix am soon", canWait: "E fit wait",
  notSafe: "No safe to drive", w2: "Inside 2 weeks", nextSvc: "Next service", tapOne: "Tap one to continue", owner: "Owner", bothOpt: "Both no be must", wa: "WhatsApp number",
  checkSave: "Check am, save", save: "Save am", addProblem: "Add problem", addingTo: "We dey add to {p}", addedTo: "E don add to {p}", sendWa: "Send for WhatsApp",
  today: "Today", tomorrow: "Tomorrow", waiting: "Owner never answer", remind: "Remind for WhatsApp", resched: "Change time", cancel: "Cancel booking", sent: "Reminder don go",
  whichDay: "Which day?", whatTime: "Which time?", checkSend: "Check am, send", send: "Send booking", bookSent: "Booking don go to {o}", oneVisit: "One visit for all di problems",
  freeStart: "Free credit to start", feeLine: "Booking fee when work finish: ₦{f}", topUp: "Top up", howMuch: "How much?", haveCode: "You get code?", codeOk: "Code don work", codeBad: "Dis code no work",
  payHow: "How you wan pay?", language: "Language", logout: "Comot", welcome: "Welcome", yourPhone: "Your phone number?", smsCode: "We go send code by SMS", sendCode: "Send code",
  enterCode: "Put the code", wsName: "Workshop name?", ownersSee: "Owners go see am for WhatsApp", area: "Which area?", noCars: "No motor yet", dueWeek: "Motor wey suppose come back dis week", fillWeek: "Remind dem make your week full", remindAll: "Remind all for WhatsApp", remindAllN: "Remind all {n} for WhatsApp", upNext: "Next ones", seeAll: "See all", remindedTo: "E don go to {o} for WhatsApp", bkWork: "Wetin you go work on?", bkPre: "Di things wey suppose fix later don already pick.", bkFixing: "Wetin need fixing?", howUrgent: "How quick e suppose fix?", estCost: "How much e go reach?", anythingElse: "Any other thing?", addAnother: "+ Add another one", noNext: "No, continue", noteOpt: "Note (no be must)", noteEg: "e.g. owner go bring parts", fixLaterPre: "Things wey suppose fix later show first.", bkDay: "Which day?", bkPick: "Choose date", bkTime: "Which time?", bkCheck: "Check am, book", bkBook: "Book am", bkDone: "✓ E don book", bkDoneSub: "Owner go get WhatsApp message now, and reminder one day before.", bkStart: "Book motor", bkUpcoming: "Wetin dey come", bkNone: "No booking yet.", bkMoved: "Booking don move", bkResched: "Save new time", startJob: "Start work", msgOwner: "Message owner", cancelBk: "Cancel booking", discardBk: "Comot this booking?", discardJob: "Comot this job?", keepGoing: "Continue", discard: "Comot am", noCarsSub: "When motor come, tap + to log am. E no reach 1 minute.",
};
export type Lang = "en" | "pcm";
export const tr = (l: Lang) => (k: K, v: Record<string, string | number> = {}) =>
  ((l === "pcm" && pcm[k]) || en[k]).replace(/\{(\w+)\}/g, (_, x) => String(v[x] ?? ""));
export type T = ReturnType<typeof tr>;
