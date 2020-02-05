<template>
  <q-list>
    <div v-for="i in 10" :key="i">
      <q-item class="q-px-none">
        <q-item-section>
          <q-item-label>Single line item</q-item-label>
          <q-item-label
            caption
            lines="2"
          >Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>
      <q-separator spaced />
    </div>
  </q-list>
</template>