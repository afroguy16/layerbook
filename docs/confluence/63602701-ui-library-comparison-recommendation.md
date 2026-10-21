---
title: "UI library comparison & recommendation"
source: https://ewvie.atlassian.net/wiki/spaces/AB/pages/63602701
confluence_page_id: 63602701
version: 1
version_date: 2026-10-16T11:01:01.695Z
version_message: ""
exported: 2026-10-16 (read-only export; edit in Confluence, not here)
---

# UI library comparison & recommendation

*Context: which UI kit / design system gives Auto Book a polished, light, accessible UI fastest. Criteria come from the [playbook](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64028673/UX+research+design+playbook+how+we+ll+work) section 5; data gathered 16 Oct 2026.*

## What a UI library is, in one paragraph

A UI library gives you ready-made buttons, inputs, dialogs and so on, already styled and (ideally) accessible, so we don't design and code every piece ourselves. The choice affects how fast pages load on Lagos data, how polished it looks, and how easy it is to theme to our own brand.

## Assumption about our stack

The brief says owners use "a well-designed web app", so we assume a **React web app / PWA** for both sides. If we later go native, see the React Native row.

## Criteria

| Criterion | Why it matters for Auto Book |
| --- | --- |
| **JS size (low data)** | Every KB costs Lagos users data and time ([principle 5](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64159745/Design+principles+first+flow+sketch)). |
| **Accessibility** | Big targets, labels, keyboard/screen-reader support; WCAG \[PB\]. |
| **Mobile / touch** | Phone-first, greasy fingers. |
| **Theming** | Our own look ("Apple-style simple and sleek", brief), not a generic one. |
| **Licence** | Free for commercial use; we're bootstrapped. |
| **Maturity** | Actively maintained, big community. |
| **Figma kit** | Design and code stay in sync. |

## How we measured size

For each web library we bundled **Button + Dialog/Modal + text Input** with esbuild (minified, React excluded) and gzipped the output, on 16 Oct 2026 with the latest npm versions. This is our own measurement, a like-for-like rough guide, not an official figure. CSS is extra where noted.

## Comparison

| Library | Platform | JS size (our test, gzip) | Accessibility | Theming | Licence | Maturity (GitHub stars, last push) | Figma |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **[shadcn/ui](https://ui.shadcn.com/docs)** (built on [Radix](https://www.radix-ui.com/primitives/docs/overview/accessibility) + Tailwind) | Web | **\~14 KB** (Radix Dialog + Slot; components are copied into our code) + only the Tailwind CSS we use | Radix follows WAI-ARIA authoring practices | Full: we own the code | MIT | \~126k ★, pushed 16 Oct 2026 | Yes, official [Figma page](https://ui.shadcn.com/docs) in docs |
| **[Mantine](https://mantine.dev/)** | Web | \~35 KB + CSS (full stylesheet 41 KB gz; can import per component) | Advertises "accessible web applications" | Strong theme object | MIT | \~32k ★, 11 Oct 2026 | Not verified |
| **[MUI (Material UI)](https://mui.com/material-ui/design-resources/material-ui-for-figma/)** | Web | \~67 KB | Good, Material-based | Good but looks "Google" unless heavily themed | MIT (core) | \~99k ★, 16 Oct 2026 | Yes, Figma Design Kit |
| **[Chakra UI](https://chakra-ui.com/docs/get-started/installation)** | Web | \~85 KB | Good | Strong | MIT | \~41k ★, 12 Oct 2026 | Yes (Figma page in docs) |
| **[Ionic React](https://ionicframework.com/docs/)** | Web / hybrid mobile | \~88 KB | Good | Platform look (iOS/Material) | MIT | \~53k ★, 16 Oct 2026 | Not verified |
| **Ant Design** | Web | \~105 KB | Good | Enterprise look | MIT | \~100k ★, 16 Oct 2026 | Not verified |
| **[daisyUI](https://daisyui.com/)** | Web (CSS only, Tailwind plugin) | 0 KB JS (CSS only) | Basic; we must add ARIA behaviour ourselves | Themes built in | MIT | \~43k ★, 13 Oct 2026 | Not verified |
| **[React Native Paper](https://callstack.github.io/react-native-paper/)** | React Native | n/a (native app) | Material-based | Material theming | MIT | \~14k ★, 12 Oct 2026 | Not verified |
| Tamagui / gluestack-ui | React Native + web | not measured | — | Strong | MIT / ISC | \~14k / \~5k ★ | Not verified |

Stars and licences from the GitHub API and npm registry on 16 Oct 2026. "Not verified" means we didn't confirm an official Figma kit; it doesn't mean there isn't one.

## Recommendation

**Use shadcn/ui (Radix primitives + Tailwind) for the web/PWA, themed to Auto Book.**

1. **Lightest JS of the full-featured options** in our test (\~14 KB vs 35–105 KB), which matters most for Lagos data (principle 5).
2. **Accessible behaviour built in** via Radix's WAI-ARIA approach, so big, labelled, keyboard-safe controls come free (principles 3 and 4).
3. **We own the code**, so we can make the few components we need (big chips, three urgency buttons, slot picker) look "Apple-simple" rather than generic, and delete anything unused.
4. **MIT and free**, with an official Figma page to keep design and code in sync.
5. **Huge community** (largest star count of the group).

**Runner-up:** Mantine, if we want more ready-made components (date pickers, notifications) with less assembly, at about 2–3× the JS.

**If we go native later:** React Native Paper is the mature, MIT, Material-based choice.

**Trade-off to accept:** with shadcn/ui we maintain the copied components ourselves, and Tailwind takes a little learning.

## Next steps

- Build the 5 screens of [flow sketch A](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64159745/Design+principles+first+flow+sketch) with shadcn/ui; set a page-weight budget and check it on a cheap Android over 3G.
- Re-measure size once real screens exist.

## Further reading

- [Design principles & first flow sketch](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64159745/Design+principles+first+flow+sketch)
- [Top 10 booking UIs: deep dives](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64126977/Top+10+booking+UIs+deep+dives)
- [UX research & design playbook](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64028673/UX+research+design+playbook+how+we+ll+work)
