<template>
  <header :class="'header '">
    <h1 class="headline">{{ roomId }}</h1>
    <div class="logo">
      <img
        class="logo-an"
        src="images/Telekneipe-Logo-AN.png"
        alt="Telekneipe Logo an"
      />
      <img
        class="logo-aus"
        src="images/Telekneipe-Logo-AUS.png"
        alt="Telekneipe Logo aus"
      />
    </div>
    <h1 class="headline">Telekneipe</h1>
  </header>
</template>
<script>
export default {
  props: {
    roomId: { default: '', type: String }
  }
}
</script>
<style scoped>
.header {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: var(--space-small) 0;
  flex-wrap: wrap;
}
.header .headline {
  width: auto;
  margin: 0 var(--space-small);
}
.header-videos {
  position: absolute;
  top: 0;
}
.header-videos .logo {
  height: 5vw;
  width: 5vw;
  min-width: 50px;
  min-height: 50px;
}
.headline {
  width: 100%;
  text-align: center;
  margin: var(--space-medium) 0;
}
.logo {
  height: 20vw;
  width: 20vw;
  min-width: 150px;
  min-height: 150px;
  position: relative;
}
.logo .logo-aus {
  animation: logo 10s infinite ease;
}
.logo img {
  position: absolute;
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 992px) {
  .header .headline {
    display: none;
  }
}

@keyframes logo {
  0% {
    opacity: 0;
  }
  1% {
    opacity: 1;
  }
  2% {
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  11% {
    opacity: 1;
  }
  12% {
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  31% {
    opacity: 1;
  }
  32% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
