<template>
  <q-page>
    <div class="row justify-center">
      <CreateForm />
    </div>
  </q-page>
</template>
<script>
import CreateForm from "../components/Content/CreateForm.vue";
export default {
  components: {
    CreateForm,
  },
};
</script>
