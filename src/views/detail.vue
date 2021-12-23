<template>
  <articlesLayout>
    <div slot="header-item-center">
      <span class="title-detail">{{this.$route.path}}</span>
    </div>
    <div slot="header-item-right">
      <button @click="pushRoute('/')" type="button" class="btn btn-primary">
        Back
      </button>
    </div>
    <div class="main-detail">
      <div class="box-card">
        <div
          class="detail-img"
          :style="{
            'background-image': `url(${
              articleDetail && articleDetail.image ? articleDetail.image : ''
            })`,
          }"
        ></div>
        <div class="detail-body">
          <p class="detail-body-title">
            {{
              articleDetail && articleDetail.title ? articleDetail.title : ""
            }}
          </p>
          <p class="detail-body-content">
            {{
              articleDetail && articleDetail.content
                ? articleDetail.content
                : ""
            }}
          </p>
          <p
            class="detail-body-time"
            v-if="articleDetail && articleDetail.image"
          >
            {{
              new Date(articleDetail.createdAt)
                | moment("dddd, MMMM Do YYYY, h:mm:ss a")
            }}
          </p>
        </div>
      </div>
    </div>
  </articlesLayout>
</template>
<script>
import articlesLayout from "../layouts/articles.vue";
export default {
  components: {
    articlesLayout,
  },
  created() {
    this.fetchData();
  },
  data() {
    return {
      articleDetail: null,
    };
  },
  methods: {
    pushRoute(path) {
      this.$router.push({
        path: path,
      });
    },
    fetchData() {
      let api =
        " https://617b71c2d842cf001711bed9.mockapi.io/api/v1/blogs/" +
        this.articleID;
      this.axios.get(api).then((res) => {
        // console.log("res____________", res.data);
        this.articleDetail = res.data;
      });
    },
  },
  computed: {
    articleID() {
      return this.$route.params.id;
    },
  },
};
</script>
<style scoped>
.main-detail {
  padding: 20px 10%;
}
.detail-img {
  background: #f5f6fa;
  width: 155px;
  height: 155px;
  border-radius: 5px;
  flex-shrink: 0;
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  border: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: center;
  flex-shrink: 0;
}
.detail-body {
  width: calc(100% - 170px);
  margin-left: 15px;
  flex: 1;
}
.detail-body > p {
  text-align: left;
}
.detail-body-title {
  font-weight: bold;
  margin-bottom: 15px;
  font-size: 20px;
}

.detail-body-title,
.detail-body-content {
  line-height: 16px;
  color: #000000;
}
.detail-body-content {
  font-size: 16px;
  margin-bottom: 10px;
}
.detail-body-time {
  font-size: 14px;
  margin-bottom: 0;
  color: #9e9e9e;
}
.box-card {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  border: 1px solid #dcdfe5;
}
.title-detail{
  color: #000000;
  font-size: 25px;
  line-height: 150%;
  font-weight: bold;
}
</style>