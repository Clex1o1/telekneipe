<template>
  <div class="container">
    <v-header></v-header>
  </div>
</template>

<script>
import VHeader from '@/components/VHeader'
export default {
  components: {
    VHeader
  },
  data() {
    return {
      roomId: this.$route.params.id
    }
  },
  mounted() {},
  /* ToDo load socket local */
  head() {
    return {
      title: this.roomId + ' Telekneipe'
    }
  }
}
</script>

<style>
.headline {
  width: 100%;
  text-align: center;
  margin: var(--space-medium) 0;
}
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

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  will-change: opacity;
  transition: opacity var(--transition-default);
}
@media screen and (max-width: 992px) {
  .header .headline {
    display: none;
  }
  .videos.video-list {
    grid-template-columns: repeat(auto-fit, 136px);
    grid-gap: var(--space-small);
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
