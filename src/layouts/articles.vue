<template>
  <div class="LayoutArticle">
    <div class="main-header">
      <div class="box-logo">
        <router-link to="/">
          <img alt="Vue logo" src="../assets/nal.jpg" />
        </router-link>
      </div>
      <div class="header-item-center">
        <slot name="header-item-center"> </slot>
      </div>
      <div>
        <slot name="header-item-right"> </slot>
      </div>
    </div>
    <main class="LayoutArticle-main">
      <slot />
    </main>
    <!-- <footer class="LayoutArticle-ooter">&copy; thangminh56k4@gmai.com</footer> -->
  </div>
</template>

<script>
export default {
  name: `LayoutArticle`,
  methods: {
    pushRoute(path) {
      this.$router.push({
        path: path,
      });
    },
  },
  computed: {
    routePath() {
      return this.$route.path;
    },
  },
};
</script>
<style>
.LayoutArticle {
  width: 100%;
  height: 100%;
}
.main-header {
  border-bottom: 1px solid #eee;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px 15px;
}
.box-logo {
  width: 60px;
  height: 60px;
}
.box-logo > a > img {
  width: 100%;
}

.LayoutArticle-ooter {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000000;
  color: #ffffff;
}
.LayoutArticle-main {
  width: 100%;
  height: calc(100% - 100px);
}
</style>