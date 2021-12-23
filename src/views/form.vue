<template>
  <form>
    <div class="form-group mb-2">
      <label for="exampleInputEmail1"
        >Title <span class="text-danger">*</span></label
      >
      <input
        type="text"
        v-model="title"
        class="form-control mt-2"
        :class="{ 'is-invalid': validate.title }"
      />
      <small v-if="validate.title" class="form-text text-danger"
        >Can't be left blank.</small
      >
    </div>
    <div class="form-group mb-2">
      <label for="exampleInputEmail1">Image</label>
      <input type="file" class="form-control mt-2" />
      <!-- <small id="emailHelp" class="form-text text-danger"
        >We'll never share your email with anyone else.</small
      > -->
    </div>
    <div class="form-group mb-2">
      <label for="exampleInputEmail1"
        >Content <span class="text-danger">*</span></label
      >
      <textarea
        class="form-control mt-2"
        :class="{ 'is-invalid': validate.content }"
        id="exampleFormControlTextarea1"
        rows="4"
        v-model="content"
      ></textarea>
      <small v-if="validate.content" class="form-text text-danger"
        >Can't be left blank.</small
      >
    </div>
  </form>
</template>
<script>
export default {
  props: {
    article: Object,
    validate: Object,
  },
  data() {
    return {
      title: "",
      image: "",
      content: "",
    };
  },
  watch: {
    article: {
      handler: function (obj) {
        console.log(obj);
        if (!obj) return;
        this.title = obj.title;
        this.image = obj.image;
        this.content = obj.content;
      },
      deep: true,
    },
    title(val) {
      const event = {
        key: "title",
        value: val,
      };
      this.handleChangeInput(event);
    },
    content(val) {
      const event = {
        key: "content",
        value: val,
      };
      this.handleChangeInput(event);
    },
  },
  created() {
    console.log(this.article);
  },
  methods: {
    handleChangeInput(event) {
      this.$emit("getEvent", event);
    },
  },
};
</script>