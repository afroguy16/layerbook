---
title: "UX research & design playbook (how we'll work)"
source: https://ewvie.atlassian.net/wiki/spaces/AB/pages/64028673
confluence_page_id: 64028673
version: 1
version_date: 2026-10-16T10:53:33.009Z
version_message: ""
exported: 2026-10-16 (read-only export; edit in Confluence, not here)
---

# UX research & design playbook (how we'll work)

*Context: a short, sourced playbook of the UX research and design methods Auto Book will use, written 16 Oct 2026 before the booking-UI research; desk research only, nobody contacted.*

## Why this page exists

Auto Book's bar is that a mechanic logs a car, and an owner books, in about a minute on a phone in Lagos conditions (see the [Idea brief](https://ewvie.atlassian.net/wiki/spaces/AB/pages/62750721/Idea+brief+Auto+Book+family+doctor+for+your+car)). To hit that bar we need a repeatable way to learn, design and measure. This page picks a small set of proven methods from reputable sources and says how we'll use each. All links were checked on 16 Oct 2026.

## 1. Research methods we'll use

NN/g groups research methods on two axes: what people **say** vs what they **do**, and **why** (qualitative) vs **how many** (quantitative). Pick the method by the question you're asking. ([NN/g: When to use which UX research methods](https://www.nngroup.com/articles/which-ux-research-methods/))

| Method | What it answers | How we'll use it |
| --- | --- | --- |
| **Field study / contextual observation** | How work really happens, in place | Sit in 2 to 3 workshops and watch how jobs, estimates and bookings flow today (WhatsApp, phone, exercise book). ([NN/g: Field studies](https://www.nngroup.com/articles/field-studies/); [IDEO.org Field Guide to Human-Centered Design](https://www.designkit.org/resources/1.html), 57 methods incl. immersion and interviews) |
| **Task analysis** | The steps a person takes to reach a goal | Write down the steps of "log a car" and "book a slot" as observed, before designing screens. ([NN/g: Task analysis](https://www.nngroup.com/articles/task-analysis/)) |
| **Usability testing (small and often)** | Where people get stuck | Hand a prototype to 5 people with no explanation, watch, fix, repeat. NN/g's well-known finding is that about 5 users reveal about 85% of usability problems, so many small rounds beat one big one. ([NN/g: Why you only need to test with 5 users](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/); [NN/g: Usability testing 101](https://www.nngroup.com/articles/usability-testing-101/)) |
| **Lightweight research habits** | Keeping research cheap and honest | Erika Hall's *Just Enough Research* argues for small, purposeful research tied to decisions. ([A Book Apart](https://abookapart.com/products/just-enough-research)); the UK Government Digital Service treats user research as continuous through a service's life ([GOV.UK Service Manual: User research](https://www.gov.uk/service-manual/user-research)). |

## 2. How we'll evaluate and benchmark designs

- **Task success rate**: did the person finish without help? NN/g calls it the simplest usability metric. ([NN/g](https://www.nngroup.com/articles/success-rate-the-simplest-usability-metric/))
- **Time on task**: stopwatch from first tap to done. Our target is about 60 seconds for both logging and booking.
- **Steps, taps and fields**: count them per flow. Baymard's checkout research found the number of form fields matters more than the number of steps; the average 2024 checkout had 5.1 steps and 11.3 fields, while most need only about 8. ([Baymard](https://baymard.com/blog/checkout-flow-average-form-fields)) For us: count fields first, steps second.
- **SUS (System Usability Scale)**: a standard 10-question survey after a test. Average score across \~500 studies is 68; above 80.3 is top-10% ("A"). It tells you *how good*, not *why*. ([MeasuringU](https://measuringu.com/sus/); [usability.gov](https://www.usability.gov/how-to-and-tools/methods/system-usability-scale.html)) We'll read the questions aloud in plain English or Pidgin for low-literacy users (our adaptation, untested).
- **Benchmarking over time**: measure the same tasks the same way each round, so we can see if a change helped. ([NN/g: Benchmarking UX](https://www.nngroup.com/articles/benchmarking-ux/))
- **Competitive usability evaluation**: run the same tasks on competitor or analogous apps to learn what works before building. ([NN/g: Competitive usability evaluations](https://www.nngroup.com/articles/competitive-usability-evaluations/)) This is how we'll do the top-10 booking-UI research.

## 3. Usability heuristics (our design-review checklist)

Jakob Nielsen's 10 heuristics are the standard checklist: visibility of system status; match the real world; user control and freedom; consistency; error prevention; recognition over recall; flexibility and efficiency; minimalist design; help users recover from errors; help and documentation. ([NN/g: 10 heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/); [how to run a heuristic evaluation](https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/)) Two classic books back the same ideas: Steve Krug's *Don't Make Me Think* (every screen should be self-evident) ([Peachpit](https://www.peachpit.com/store/dont-make-me-think-revisited-a-common-sense-approach-9780321965516)) and Don Norman's *The Design of Everyday Things* (affordances, feedback, mapping) ([Basic Books](https://www.basicbooks.com/titles/don-norman/the-design-of-everyday-things/9780465050659/)).

For Auto Book, "recognition over recall" is the big one: tap a chip from a list instead of typing.

## 4. Designing for emerging markets and lower literacy

- **Lower-literacy users read word by word, don't scan, and miss things outside the main column.** NN/g's advice: plain words (about 6th-grade level on key screens), main point at the top, one column, linear choices, little scrolling, no moving text. In their test, rewriting a site this way cut lower-literacy users' task time from 22.3 to 9.5 minutes and raised success from 46% to 82%, and higher-literacy users improved too. ([NN/g: Lower-literacy users](https://www.nngroup.com/articles/writing-for-lower-literacy-users/), 2005 but still the clearest study)
- **Low data, low-end phones, weak networks.** Google's Android "Build for billions" guidance covers connectivity, device range, data cost and battery. ([Android Developers](https://developer.android.com/docs/quality-guidelines/build-for-billions)) Set a performance budget (max page weight / load time) and check every release against it. ([web.dev: Performance budgets 101](https://web.dev/articles/performance-budgets-101))
- **Accessibility as a baseline**: follow WCAG (contrast, target size, labels), which also helps greasy fingers and bright sun. ([W3C WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/); [Material 3 accessible design](https://m3.material.io/foundations/accessible-design/overview))

## 5. How we'll choose a design system / UI kit

A design system is a set of reusable components and standards, not just a style guide. ([NN/g: Design systems 101](https://www.nngroup.com/articles/design-systems-101/); [Design systems vs style guides](https://www.nngroup.com/articles/design-systems-vs-style-guides/)) Good reference systems: [Material 3](https://m3.material.io/) and the [GOV.UK Design System](https://design-system.service.gov.uk/) (famous for plain, accessible, one-thing-per-page forms).

Our criteria (to be scored in the UI library comparison): download size / low data; accessibility built in; mobile and touch first; theming; licence and cost; maturity and maintenance; Figma kit available; fits our stack.

## 6. The loop we'll run (summary)

1. **Observe** in workshops (field study, task analysis).
2. **Benchmark** analogous booking UIs (competitive evaluation, step/field counts).
3. **Design** against the heuristics and the low-literacy rules; pick a design system by the criteria above.
4. **Test weekly** with 5 people: success rate, time on task (goal ≈ 60 s), taps/fields, SUS.
5. **Change one thing, re-measure** the same tasks.

## Learning more (reputable courses)

- [Google UX Design Professional Certificate (Coursera)](https://www.coursera.org/specializations/google-ux-design)
- [Interaction Design Foundation courses](https://www.interaction-design.org/courses)
- [Baymard UX research library](https://baymard.com/research)

## Further reading

- [Idea brief: Auto Book](https://ewvie.atlassian.net/wiki/spaces/AB/pages/62750721/Idea+brief+Auto+Book+family+doctor+for+your+car)
- [Mechanic Booking App: Competitor & Market Scan (Oct 2026)](https://ewvie.atlassian.net/wiki/spaces/AB/pages/63799297/Mechanic+Booking+App+Competitor+Market+Scan+Oct+2026)
- [Auto Book: post-MVP and AI direction](https://ewvie.atlassian.net/wiki/spaces/AB/pages/63340546/Auto+Book+post-MVP+and+AI+direction)
