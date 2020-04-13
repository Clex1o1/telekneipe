<template>
  <div v-if="emailAdresses.length" class="donation">
    <label>Suchen:</label>
    <v-select
      v-model="selectedMail"
      class="select-box"
      label="name"
      :options="emailAdresses"
      :components="{ OpenIndicator }"
      @search:focus="clearInput"
    >
      <template v-slot:no-options="{ search, searching }">
        <template v-if="searching">
          Kneipe <em>{{ search }}</em> nicht gefunden.?<br /><br />
          Sende uns doch eine Mail und schlage uns deine lieblings Kneipe vor.
        </template>
        <em v-else>Suche deine Kneipe</em>
      </template>
    </v-select>
    <form
      action="https://www.paypal.com/cgi-bin/webscr"
      method="post"
      target="_top"
      class="paypal-form"
    >
      <input type="hidden" name="cmd" value="_donations" />
      <input type="hidden" name="currency_code" value="EUR" />
      <input
        type="hidden"
        name="business"
        :value="selectedMail ? selectedMail.email : ''"
      />
      <input
        v-if="selectedMail && selectedMail.email"
        ref="donationButton"
        type="image"
        src="https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif"
        border="0"
        name="submit"
        title="PayPal - The safer, easier way to pay online!"
        alt="Spenden mit dem PayPal-Button"
        class="donation-button"
      />
      <a
        v-else-if="selectedMail && selectedMail.link"
        class="button"
        :href="selectedMail.link"
        >Spenden</a
      >
      <a v-else class="button">Spenden</a>
    </form>
  </div>
</template>
<script>
export default {
  data: () => ({
    selectedMail: '',
    emailAdresses: [
      /* { email: 'alexander@classen.rocks', name: 'Alexander Classen' } */
      { email: 'rettedeinhoteleuropa@gmx.de', name: 'Hotel Europa (Aachen)' },
      {
        email: false,
        link: 'https://paypal.me/pools/c/8nuwwdSrAJ',
        name: 'Wild Rover (Aachen)'
      }
      // { email: 'alexander@classen.rocks222', name: 'Alexander Classen 2' }
    ],
    OpenIndicator: {
      render: (createElement) =>
        createElement('span', { class: { toggle: true } })
    }
  }),
  methods: {
    clearInput() {
      this.selectedMail = ''
    }
  }
}
</script>
<style scoped>
.donation {
  width: 80%;
}
.select-box {
  color: var(--color-text);
  position: relative;
}

.donation-button {
  border: none;
}
.paypal-form {
  display: flex;
  justify-content: center;
}
</style>
<style>
.vs__selected-options {
  position: relative;
}
.vs__selected {
  position: absolute;
  bottom: 50%;
  transform: translateY(50%);
  left: 0;
}
.vs__search {
  margin: 0;
  width: 100%;
}
.vs__actions {
  position: absolute;
  right: 0;
  bottom: 50%;
  transform: translateY(50%);
}
.vs__clear,
.vs__open-indicator {
  background: var(--color-text);
  border-radius: 100%;
  height: 20px;
  width: 20px;
  color: var(--color-text);
  border: none;
}
.vs__dropdown-menu {
  position: absolute;
  left: 0;
  right: 0;
  background: var(--color-background-light);
  padding: var(--space-medium) var(--space-small);
  border-radius: var(--border-radius);
}
ul.vs__dropdown-menu li {
  list-style-type: none;
}

.vs__dropdown-option {
  list-style-type: none;
  cursor: pointer;
}
.vs__dropdown-option--selected {
  color: var(--color-primary);
}
</style>
