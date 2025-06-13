# Université de Montréal – Digital Brand Guidelines (Web)

*Last updated: 2025‑06‑13*

---

## 1. Core Logo Usage

| Asset                             | File                   | Notes                                                           |
| --------------------------------- | ---------------------- | --------------------------------------------------------------- |
| Master lock‑up (horizontal)       | `udem-logo-h.svg`      | Blue (**Pantone 293 C**) on white only. Minimum width = 120 px. |
| Master lock‑up (reversed)         | `udem-logo-h-rev.svg`  | White on `--udem-blue-500` or `--udem-blue-900`.                |
| Square signature ("et du monde.") | `udem-logo-square.svg` | Use for social avatars, favicons and small ads.                 |

> Never add shadows, gradients, borders or recolour the logo. Maintain the exclusion zone equal to the width/height of the **M** glyph on all sides. ([marque.umontreal.ca](https://marque.umontreal.ca/))

---

## 2. Colour System

### 2.1 Core palette

| CSS token         | Hex         | RGB         | WCAG Contrast vs #FFF\* | Primary use                |
| ----------------- | ----------- | ----------- | ----------------------- | -------------------------- |
| `--udem-blue-500` | **#0057AC** | 0 87 172    | 4.8 : 1                 | Links, buttons, accents    |
| `--udem-blue-900` | **#0B113A** | 11 17 58    | 12.8 : 1                | Headings, navigation text  |
| `--white`         | #FFFFFF     | 255 255 255 | –                       | Backgrounds, reversed logo |
| `--black`         | #000000     | 0 0 0       | –                       | Body text fallback         |

*Source: official e‑mail signature specification* ([marque.umontreal.ca](https://marque.umontreal.ca/))

### 2.2 Secondary accent palette

UdeM defines **five** accent colours (coral, teal, emerald, gold, rose) which **must always** appear in combination with the primary blue. Exact values are distributed in the Adobe ASE swatch (`udem_couleurs_biblio_adobe.ase`) available from the *Boîte à outils > Nuancier* download.

```css
:root{
  /* to be populated from the ASE file */
  --udem-coral-500:         ;
  --udem-teal-500:          ;
  --udem-emerald-600:       ;
  --udem-gold-400:          ;
  --udem-rose-050:          ;
}
```

> • Accents are for **data‑viz, charts, and micro‑UI states** only.  <br>• Never let an accent dominate more than 25 % of the screen area. ([marque.umontreal.ca](https://marque.umontreal.ca/))

### 2.3 SCSS reference snippet

```scss
$udem-blue-500:   #0057AC;
$udem-blue-900:   #0B113A;
$udem-white:      #FFFFFF;
$udem-black:      #000000;

$link-color:      $udem-blue-500;
$link-hover:      lighten($udem-blue-500, 10%);
$btn-primary-bg:  $udem-blue-500;
$btn-primary-text:$udem-white;
```

<small>*Contrast ratios calculated with the W3C contrast checker.*</small>

---

## 3. Typography

| Role             | Font stack                         | Weight    | Tracking | Rule                         |
| ---------------- | ---------------------------------- | --------- | -------- | ---------------------------- |
| Display (H1–H3)  | `"Figtree", "Arial", sans-serif`   | 600 / 700 | ‑1 %     | Never set in ALL‑CAPS        |
| Body text        | `"Figtree", "Arial", sans-serif`   | 400       | 0        | Min size = 16 px             |
| Long‑form/quotes | `"Lora", "Times New Roman", serif` | 400 / 600 | 0        | Use sparingly                |
| Fallback         | `"Arial", sans-serif`              | 400       | 0        | For unsupported environments |

> Figtree & Lora are available on Google Fonts; load them with `display=swap` to avoid FOIT. Arial and Times New Roman are the sanctioned fallbacks for accessibility and document interoperability. ([marque.umontreal.ca](https://marque.umontreal.ca/), [marque.umontreal.ca](https://marque.umontreal.ca/))

```html
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700&family=Lora:wght@400;600&display=swap" rel="stylesheet">
```

### Typographic scale

| Level   | REM       | Example |
| ------- | --------- | ------- |
| H1      | 3.0 rem   | 48 px   |
| H2      | 2.25 rem  | 36 px   |
| H3      | 1.75 rem  | 28 px   |
| Body    | 1.0 rem   | 16 px   |
| Caption | 0.875 rem | 14 px   |

Line‑height baseline: **1.45**.

---

## 4. Layout Grid

Digital layouts inherit the square grid from print:

```css
.container{
  max-width:1440px;
  margin-inline:auto;
  padding-inline:clamp(1rem,4vw,4rem);
}
.grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(0,1fr));
  gap:clamp(0.75rem,2vw,1.5rem);
}
```

| Breakpoint  | Columns | Gutter |
| ----------- | ------- | ------ |
| ≥ 1280 px   | 12      | 24 px  |
| 960‑1279 px | 8       | 20 px  |
| 600‑959 px  | 4       | 16 px  |
| < 600 px    | 1       | 12 px  |

---

## 5. Iconography

Use the official pictogram set provided by the Bureau des communications et des relations publiques. Strokes = 2 px on 1×, coloured `var(--udem-blue-500)` (or white when reversed). ([marque.umontreal.ca](https://marque.umontreal.ca/))

---

## 6. Accessibility Checklist

| Item            | Requirement                                                   | Tool                 |
| --------------- | ------------------------------------------------------------- | -------------------- |
| Colour contrast | AA for body (≥ 4.5:1) / AAA for headings (≥ 7:1)              | Axe‑core, Lighthouse |
| Focus states    | 2 px outline in `--udem-blue-500`                             | Browser DevTools     |
| Motion          | Respect `prefers‑reduced‑motion`; default animations ≤ 200 ms | CSS media queries    |

---

## 7. Do’s & Don’ts

| ✅ Do                                         | 🚫 Don’t                                         |
| -------------------------------------------- | ------------------------------------------------ |
| Keep `--udem-blue-500` visible on every page | Re‑tint the blue or add drop‑shadows to the logo |
| Use accent colours sparingly (<25 %)         | Make an accent the primary background colour     |
| Stick to Figtree for headings                | Replace headings with unapproved fonts           |
| Maintain min body size = 16 px               | Present headings in ALL CAPS                     |

---

## 8. Starter Boilerplate

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>UdeM Sample</title>

    <!-- Reset & fonts -->
    <link rel="stylesheet" href="reset.css">
    <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700&family=Lora:wght@400;600&display=swap" rel="stylesheet">

    <style>
      :root{
        --udem-blue-500:#0057AC;
        --udem-blue-900:#0B113A;

        --color-text:var(--udem-blue-900);
        --color-bg:#FFFFFF;
      }
      body{
        font-family:"Figtree","Arial",sans-serif;
        font-size:1rem;
        line-height:1.6;
        color:var(--color-text);
        background:var(--color-bg);
      }
      h1,h2,h3{font-weight:600;color:var(--udem-blue-900);}
      a{color:var(--udem-blue-500);}
      a:hover{text-decoration:underline;}
    </style>
  </head>
  <body>
    <header>
      <img src="udem-logo-h.svg" alt="Université de Montréal">
    </header>
    <main>
      <h1>Titre de la page</h1>
      <p>Bienvenue sur ce gabarit conforme aux normes UdeM !</p>
    </main>
  </body>
</html>
```

---

*End of document*
