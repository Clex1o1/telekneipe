<template>
  <div>
    <nuxt />
  </div>
</template>

<style>
@font-face {
  font-family: 'ITC Avant Garde Gothic Std';
  src: url('/fonts/ITC-Avant-Garde-Gothic-Medium.otf') format('opentype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'ITC Avant Garde Gothic Std';
  src: url('/fonts/itc-avant-garde-gothic-std-demi-589572a199962.otf')
    format('opentype');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'ITC Avant Garde Gothic Std';
  src: url('/fonts/itc-avant-garde-gothic-std-extra-light-5895708744eb6.otf')
    format('opentype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'ITC Avant Garde Gothic Std';
  src: url('/fonts/itc-avant-garde-gothic-std-book-58957161d80eb.otf')
    format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'ITC Avant Garde Gothic Std';
  src: url('/fonts/itc-avant-garde-gothic-std-bold-589572c7e9955.otf')
    format('opentype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
:root {
  --color-primary: #00ff00;
  --color-text: #fff;
  --color-text-alternative: #000;
  --color-background: #000;
  --color-background-light: #0f0f0f;
  --color-yellow: #ffe000;
  --color-red: #ff4b35;
  --color-blue: #0b51ff;
  --color-white: #fff;

  --font-size-base: 16px;
  --font-size-small: 0.8em;
  --font-size-medium: 1.2em;
  --font-size-big: 2em;
  --font-size-super-big: 4em;
  --line-height-base: 1.2em;

  --space-small: 7.5px;
  --space-medium: 20px;

  --transition-default: 500ms ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: ITC Avant Garde Gothic Std, sans-serif;
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  background: var(--color-background);
}
h1 {
  font-size: var(--font-size-big);
}
h1,
h2,
h3 {
  color: var(--color-text);
  line-height: var(--line-height-base);
}
p {
  color: var(--color-text);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
}
.button {
  color: var(--color-text-alternative);
  border: 3px solid var(--color-text);
  border-radius: 50px;
  cursor: pointer;
  background: var(--color-text);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  padding: var(--space-small) var(--space-medium);
  box-shadow: 0 6px 29px 0 rgba(#000, 0.16);
  margin: var(--space-small);
  outline: none;
  transition: background var(--transition-default),
    border-color var(--transition-default), box-shadow var(--transition-default);
}
.button:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  box-shadow: 0 3px 9px 0 rgba(0, 255, 0, 0.27);
}

input {
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-text);
  border: none;
  border-bottom: 1px solid var(--color-text);
  appearance: none;
  background: transparent;
  box-shadow: 0 6px 29px 0 rgba(#000, 0.16);
  outline: none;
  padding: var(--space-small) 0;
  margin: var(--space-small);
  transition: color var(--transition-default),
    border-color var(--transition-default), box-shadow var(--transition-default);
}
input:focus {
  color: var(--color-primary);
  border-color: var(--color-primary);
  box-shadow: 0 3px 9px 0 rgba(0, 255, 0, 0.27);
}

a {
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-primary);
  transition: box-shadow var(--transition-default);
  text-shadow: 0 6px 29px 0 rgba(#000, 0.16);
  text-decoration: none;
}
a:hover {
  text-shadow: 0 3px 9px 0 rgba(0, 255, 0, 0.27);
}
@media screen and (max-width: 992px) {
  :root {
    --font-size-big: 1.5em;
    --font-size-super-big: 2em;
  }
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(/images/brickwall-pattern.jpg);

  background-size: 100%, 60px;
  background-repeat: no-repeat, repeat;
  min-height: 100vh;
}
</style>
