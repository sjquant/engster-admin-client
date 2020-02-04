<template>
  <q-page class="row justify-center q-mt-lg q-mx-lg">
    <div class="col-xs-12 col-sm-8 col-md-6">
      <q-input v-model="title" label="Title" class="q-mb-lg" />
      <q-editor v-model="editor" :toolbar="toolbar" height="256px" class="q-mb-lg" />
      <example-list></example-list>
      <div class="flex justify-end q-my-lg">
        <q-btn color="secondary" label="예문추가" class="q-mr-sm" @click="exAddModalOpen=true" />
        <q-btn color="primary" label="발행" />
      </div>
    </div>
    <example-add-modal :open.sync="exAddModalOpen"></example-add-modal>
  </q-page>
</template>
<script>
import ExampleList from "../components/posts/ExampleList.vue";
import ExampleAddModal from "../components/posts/ExampleAddModal.vue";
export default {
  name: "NewPost",
  components: {
    ExampleList,
    ExampleAddModal
  },
  data() {
    return {
      title: "",
      editor: "",
      toolbar: [["bold", "italic", "strike", "underline"]],
      exAddModalOpen: false
    };
  }
};
</script>