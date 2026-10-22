# Market research: Thailand beauty e-commerce

> Collected 2026-10-22. Figures come from vendor and market-research sources; treat them as direction, not exact numbers. Re-check before quoting them to anyone.

## What Thai beauty shoppers do

- **Almost half of beauty shoppers now buy online**, across all age groups. Offline store traffic is still about 8× higher, so the site must work as both a store and a showroom. ([Worldpanel](https://worldpanelbynumerator.com/insights/beauty-pulse-channel-trends-in-thailand))
- **A great delivery experience is the factor most likely to make them buy online.** Show delivery time and cost early, on the product page, not only at checkout. (Worldpanel)
- **Social commerce is large**: Facebook, LINE, YouTube, TikTok and Instagram. Buyers aged 17–36 are about 62% of e-commerce customers. ([Ken Research](https://www.kenresearch.com/industry-reports/thailand-social-commerce-market))
- **Live streaming and influencers** drive younger buyers. ([EasySell](https://easysellapp.com/blogs/wiki/thailand-ecommerce-cod-shopify-market-entry-2026))

## How they pay

| Method | Share / note | Source |
|---|---|---|
| Digital wallets | ~29% of e-commerce transaction volume (2026) | [2C2P / IDC](https://2c2p.com/blog/thailand-payment-methods) |
| Wallet split (2023) | TrueMoney 52.6%, Rabbit LINE Pay 24.7%, ShopeePay 8.1% | 2C2P / IDC |
| PromptPay (QR bank transfer) | 24.3 billion transactions in 2024; ~41% of mobile payments | 2C2P; EasySell |
| Cash on delivery | Declining, still expected by some shoppers | EasySell |
| Cards | Declining share | EasySell |

**Must have at launch:** PromptPay QR, TrueMoney Wallet, Rabbit LINE Pay, Visa/Mastercard. COD is a business decision (see open decisions in the [project brief](project-brief.md)).

## Thai brands customers already know

Mistine, Srichand, 4U2, Cute Press, Baby Bright, Odbo, Cathy Doll. ([Shopee SG blog](https://shopee.sg/blog/best-thai-makeup-brands/), [Beauty321](https://www.beauty321.com/post/60317))

What we learn from them:
- **Srichand** is known for oil-control loose powder → heat and humidity matter. Long-wear, oil-control, waterproof and sweat-proof claims sell.
- **Cute Press** releases limited-edition character collaborations → limited drops and gift packaging create urgency.
- **4U2** offers blush in cream, matte and shimmer finishes → let shoppers filter by finish and texture, not only by color.
- Most of these brands sell heavily through **Shopee, Lazada and TikTok Shop**. Our own site must offer something the marketplaces can't: brand story, shade guidance, tutorials, gift wrapping, members-only offers.

## Reference websites to study

Study these for patterns, not to copy. Before using a pattern, open the live site and take screenshots with the `playwright-cli` skill and save them in [../design/references/](../design/).

| Site | What to study |
|---|---|
| Rare Beauty | Soft palette, shade swatches on many skin tones, emotional brand story |
| Fenty Beauty | Shade range presentation, bold product close-ups |
| Charlotte Tilbury | Luxury feel, gift sets, "find your shade" flows |
| Glossier | Minimal layout that lets products stand out ([nopCommerce](https://www.nopcommerce.com/de/blog/12-best-beauty-ecommerce-websites-inspiring-examples-tips)) |
| Sephora | Navigation, filters, personal recommendations (nopCommerce) |
| Space NK | Speed, ease of use, trust signals ([Limely](https://www.limely.co.uk/blog/our-top-10-beauty-cosmetics-ecommerce-websites)) |
| Mistine, Srichand, Cute Press (Thai sites) | Thai copy tone, Thai typography, local promotions |
| DesignRush "Best Fashion & Beauty Website Designs 2026" | Current design trends ([DesignRush](https://www.designrush.com/best-designs/websites/fashion-beauty)) |

## Thai calendar: sales moments to design for

| When | Event |
|---|---|
| Every month | "Double day" mega sales: 1.1 … 9.9, 10.10, 11.11, 12.12 (biggest: 11.11 and 12.12) |
| February | Valentine's Day (gift sets) |
| April | Songkran (Thai New Year): waterproof and long-wear makeup |
| Mid-year | Payday campaigns (end of month, 25th onward) |
| November | Loy Krathong |
| December | Christmas and New Year gifting |

The home page hero and banners must be easy to swap for these campaigns without code changes.
