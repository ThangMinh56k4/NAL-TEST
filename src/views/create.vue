<template>
  <articlesLayout>
    <div slot="header-item-center">
      <span class="title-detail">Create</span>
    </div>
    <div slot="header-item-right">
      <button @click="pushRoute('/')" type="button" class="btn btn-primary">
        Back
      </button>
    </div>
    <div class="main-create">
      <div>
        <div class="create-body">
          <formComponet
            :article="article"
            :validate="validate"
            @getEvent="changeArticle"
          ></formComponet>
        </div>
        <div class="create-footer">
          <button type="button" class="btn btn-secondary" @click="handleCancel">
            Cancel
          </button>
          <button type="button" class="btn btn-primary" @click="handleSave">
            Save
          </button>
        </div>
      </div>
    </div>
  </articlesLayout>
</template>
<script>
import articlesLayout from "../layouts/articles.vue";
import formComponet from "./form.vue";
export default {
  components: {
    articlesLayout,
    formComponet,
  },
  data() {
    return {
      article: {
        title: "",
        content: "",
      },
      validate: {
        title: false,
        content: false,
      },
    };
  },
  methods: {
    changeArticle(event) {
      const key = event.key;
      const value = event.value;
      this.article[key] = value;
    },
    pushRoute(path) {
      this.$router.push({
        path: path,
      });
    },
    beforeSave() {
      if (!this.article.title || this.article.title.trim() == "") {
        this.validate.title = true;
        setTimeout(() => {
          this.validate.title = false;
        }, 1500);
        return false;
      }
      if (!this.article.content || this.article.content.trim() == "") {
        this.validate.content = true;
        setTimeout(() => {
          this.validate.content = false;
        }, 1500);
        return false;
      }
      return true;
    },
    handleSave() {
      if (!this.beforeSave()) return;

      const api = "https://617b71c2d842cf001711bed9.mockapi.io/api/v1/blogs";
      const dataCreate = this.article;

      this.axios
        .post(api, dataCreate)
        .then((res) => {
          this.article = res.data;
          this.$bvModal
            .msgBoxOk("Successful new creation", {
              title: "Success",
              size: "sm",
              buttonSize: "sm",
              okVariant: "success",
              headerClass: "p-2 border-bottom-0",
              footerClass: "p-2 border-top-0",
              centered: true,
            })
            .then((value) => {
              console.log("value______", value);
              this.clearData();
            });
        })
        .catch((e) => {
          console.log(e);
          this.$bvModal.msgBoxOk("Successful new creation", {
            title: "Unsuccessful",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            headerClass: "p-2 border-bottom-0",
            footerClass: "p-2 border-top-0",
            centered: true,
          });
        });
    },
    handleCancel() {
      this.pushRoute("/");
    },
    clearData() {
      this.article = {
        title: "",
        content: "",
      };
    },
  },
};
</script>
<style scoped>
.main-create {
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.main-create > div {
  width: 80%;
  border: 1px solid #f5f6fa;
  border-radius: 5px;
  padding: 15px;
  background: #f5f6fa;
}
.title-detail {
  color: #000000;
  font-size: 25px;
  line-height: 150%;
  font-weight: bold;
}
.create-footer {
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.create-footer > button:not(:first-child) {
  margin-left: 10px;
}
</style>