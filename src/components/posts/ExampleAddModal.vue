<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      :value="open"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" @click="$emit('update:open', false)">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section
          class="q-pt-none"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  created() {},
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      maximizedToggle: true
    };
  }
};
</script>