# Rules: Thailand and localization

## Language

1. Thai (`th`) is the default language. English (`en`) is second. Every user-facing string comes from translation files; no hard-coded text in components.
2. Thai copy is written (or reviewed) by a native Thai speaker. No machine translation in production.
3. Tone: warm, polite, friendly. Use ค่ะ in customer-facing messages (brand voice speaks as a woman to women).
4. Language switch keeps the user on the same page.

## Formatting

| Item | Rule | Example |
|---|---|---|
| Currency | Thai Baht, symbol before number, no decimals unless needed | ฿590, ฿1,290 |
| Dates (th) | Buddhist Era year via `Intl.DateTimeFormat('th-TH')` | 22 ต.ค. 2569 |
| Dates (en) | Gregorian | 22 Oct 2026 |
| Phone | Thai format, store as E.164 | 081-234-5678 → +66812345678 |
| Address | Province → district (อำเภอ/เขต) → subdistrict (ตำบล/แขวง) → postcode; autofill from postcode | |

## Typography

See the Thai type rules in [design-direction.md](../project-info/design/design-direction.md#typography-must-support-thai): line height ≥ 1.6, no letter-spacing or uppercase on Thai, check line breaks at phone width.

## Payments and delivery

1. Checkout must offer PromptPay QR, TrueMoney Wallet, Rabbit LINE Pay and cards.
2. PromptPay QR shows a countdown and updates automatically when paid (no "refresh the page").
3. Show the delivery estimate and shipping cost on the product page and in the bag, not only at checkout.
4. Show the free-shipping threshold as a progress bar in the bag.

## Communication

1. LINE Official Account is the main chat channel. Show a LINE button on product, help and order pages.
2. Order updates can be sent via LINE (with consent) as well as email.

## Legal and trust

1. **PDPA** (Thailand Personal Data Protection Act): cookie consent banner with accept / reject / settings; no analytics or marketing pixels before consent; privacy notice in Thai.
2. Marketing opt-in is a separate unticked checkbox. Never pre-ticked.
3. Show the **Thai FDA (อย.) cosmetic notification number** on every product page.
4. Show full ingredients list and claims that can be backed up. No medical claims (e.g. "cures acne").
