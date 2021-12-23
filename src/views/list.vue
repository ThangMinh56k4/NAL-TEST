<template>
  <articlesLayout>
    <div slot="header-item-center">
      <div class="box-search-sort">
        <input
          type="text"
          v-model="search"
          @input="handleSearch"
          class="form-control"
          placeholder="Search"
        />
        <b-dropdown
          id="dropdown-dropright"
          dropright
          :text="
            order == 'desc'
              ? 'Creation date - Latest'
              : 'Date of creation - Oldest'
          "
          variant="primary"
        >
          <b-dropdown-item
            @click="changeOrder('desc')"
            :active="order == 'desc' ? true : false"
            >Creation date - Latest</b-dropdown-item
          >
          <b-dropdown-item
            @click="changeOrder('asc')"
            :active="order == 'asc' ? true : false"
            >Date of creation - Oldest</b-dropdown-item
          >
        </b-dropdown>
      </div>
    </div>
    <div slot="header-item-right">
      <button
        @click="pushRoute('/create')"
        type="button"
        class="btn btn-primary"
      >
        Create article
      </button>
    </div>
    <div class="main-list">
      <div class="main-table">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">Created at</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody v-if="!loading">
            <tr v-for="(item, index) in dataFetchs" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.id }}</td>
              <td>
                <div class="main-img">
                  <div
                    class="box-img"
                    :style="{
                      'background-image': `url(${
                        item.image ? item.image : ''
                      })`,
                    }"
                  ></div>
                </div>
              </td>
              <td>{{ item.title }}</td>
              <td>{{ item.content }}</td>
              <td>
                {{
                  new Date(item.createdAt) | moment("MMMM Do YYYY, h:mm:ss a")
                }}
              </td>
              <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button
                    type="button"
                    class="btn btn-info btn-sm"
                    @click="pushRoute('/detail/' + item.id)"
                  >
                    View
                  </button>
                  <button
                    @click="pushRoute('/edit/' + item.id)"
                    type="button"
                    class="btn btn-warning btn-sm"
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="empty-data" v-if="!loading && !dataFetchs.length">
          <span>No Data</span>
        </div>
        <div class="box-loading" v-if="loading">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only"></span>
          </div>
        </div>
      </div>
      <div class="main-pagination" v-if="!loading && total">
        <span
          >{{ total ? getSkip() + 1 : 0 }} - {{ getLimit() }} out of
          {{ total }}</span
        >
        <b-pagination
          v-model="current"
          :total-rows="total"
          :per-page="pageSize"
          aria-controls="my-table"
          @change="changePagination"
        ></b-pagination>
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
  data() {
    return {
      dataFetchs: [],
      total: 0,
      current: 1,
      pageSize: 10,
      search: "",
      loading: false,
      waitForInput: null,
      order: "asc", // asc--(old createAt) desc--(new createAt)
    };
  },
  created() {
    this.fetchAllData();
    this.fetchData(1);

    console.log("this.$store.state.count", this.$store.getters.getUser);
  },
  methods: {
    handleSearch() {
      this.loading = true;
      clearTimeout(this.waitForInput);
      this.waitForInput = setTimeout(() => {
        this.current = 1;
        this.fetchAllData();
        this.fetchData(1);
      }, 1500);
    },
    pushRoute(path) {
      this.$router.push({
        path: path,
      });
    },
    getSkip() {
      return this.pageSize * (this.current - 1);
    },
    getLimit() {
      const skip = this.getSkip();
      let limit = skip + this.pageSize;
      if (limit > this.total) return this.total;
      return limit;
    },
    fetchData(current) {
      this.loading = true;
      let api = `https://617b71c2d842cf001711bed9.mockapi.io/api/v1/blogs?page=${current}&limit=10&sortBy=createdA}&order=${this.order}`;
      if (this.search && this.search.trim() !== "")
        api += `&search=${this.search}`;
      this.axios
        .get(api)
        .then((res) => {
          // console.log("fetchData_______",res);
          this.dataFetchs = res.data;
          setTimeout(() => {
            this.loading = false;
          }, 300);
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
        });
    },
    fetchAllData() {
      let api = `https://617b71c2d842cf001711bed9.mockapi.io/api/v1/blogs`;
      if (this.search && this.search.trim() !== "")
        api += `?search=${this.search}`;
      this.axios
        .get(api)
        .then((res) => {
          // console.log("fetchAllData___________",res);
          this.total = res.data.length;
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
        });
    },
    changePagination(ev) {
      this.current = ev;
      this.fetchData(ev);
    },
    changeOrder(event) {
      this.order = event;
      this.current = 1;
      this.fetchData(1);
    },
  },
  computed: {
    dataTable() {
      return this.dataFetchs;
    },
  },
};
</script>
<style scoped>
.box-loading {
  width: 100%;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-list {
  width: 100%;
  height: 100%;
  padding: 30px;
}
.main-table,
.main-pagination {
  width: 100%;
}
.main-pagination {
  display: flex;
  justify-content: space-between;
}
.main-pagination > nav {
  cursor: pointer;
}
.box-img {
  background: #f5f6fa;
  width: 55px;
  height: 55px;
  border-radius: 5px;
  flex-shrink: 0;
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  border: 2px solid #e5e5e5;
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: center;
}
.main-img {
  width: 100%;
  display: flex;
  justify-content: center;
}
.box-search-sort {
  display: flex;
  align-items: center;
}
.box-search-sort > input {
  margin-right: 5px;
}
.empty-data {
  margin-bottom: 15px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eee;
}
.empty-data > span {
  color: #000000;
  font-size: 15px;
  line-height: 125%;
}
</style>