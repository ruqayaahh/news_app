<template>
  <div>
    <div>
      <div style="text-align: center">
        <h1>Welcome to Sheebooker NG News Blog</h1>
        <h2>Top Headlines</h2>
      </div>
    </div>
    <nav class="nav">
      <div class="btn_and_search">
        <div>
          <button :showLibrary="showLibrary">My Library</button>
        </div>
        <div>
          <form action="" @submit.prevent="fetchNewsBySearch(search)">
            <input type="text" v-model="search" :search="search" />
            <button>Search</button>
          </form>
        </div>
      </div>
      <div>
        <ul class="nav_menu">
          <li
            v-for="(category, index) in categories"
            :key="index"
            @click="fetchNewsByCategory(category)"
          >
            <router-link :to="`/?category=${category}`">
              {{ category }}
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div v-if="showLibrary">
      <ReadLater :library="library" />
    </div>
    <div class="main" v-if="!showLibrary">
      <h1 v-if="isLoading">Loading...</h1>
      <div class="posts" v-else-if="allHeadlines.length">
        <div
          class="post__single"
          v-for="(headline, index) in allHeadlines"
          :key="index"
        >
          <div class="post__image">
            <img :src="headline.urlToImage" alt="headline.title" />
          </div>
          <h3>{{ headline.title }}</h3>
          <p v-html="headline.content"></p>
          <small>source: {{ headline.source.name }}</small>
          <button>Add to Read Later</button>
        </div>
      </div>
      <div class="posts" v-else>
        <h2>No news for this category</h2>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import ReadLater from "../components/ReadLater.vue";

export default {
  name: "Home",
  components: {
    ReadLater,
  },
  //   build a news app that does the following
  // 3. Users should be able to search news any other category they want,
  // 4. User should be able to view news by several news source
  // 5. Users should be able to add particular news to a read later list that should be persisted on their browser localstorage
  // 6. Each page result should only show 5 news items at a time
  data() {
    return {
      allHeadlines: [],
      isLoading: true,
      apiKey: "660b6336f9f0457c92fa713f12496141",
      apiURL: "https://newsapi.org/v2/top-headlines",
      categories: [
        "all",
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology",
      ],
      showLibrary: false,
      library: [],
      search: null,
    };
  },
  watch: {
    $route: {
      deep: true,
      handler: function (val) {
        const { category } = value.query;
        this.fetchNewsByCategory(category);
      },
    },
  },
  mounted() {
    const { apiURL, apiKey, $route } = this;
    const { category } = $route.query;
    axios
      .get(
        `${apiURL}?country=us&apiKey=${apiKey}&category=${category ? category : ''}`
      )
      .then(({ data }) => {
        const { articles } = data;
        this.allHeadlines = articles;
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  },

  methods: {
    fetchNewsByCategory(cat) {
      const { apiURL, apiKey } = this;
      this.isLoading = true;
      axios
        .get(
          `${apiURL}?country=us&apiKey=${apiKey}&category=${
            cat !== "all" ? cat : ""
          }`
        )
        .then(({ data }) => {
          const { articles } = data;
          this.allHeadlines = articles;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    fetchNewsByQuery(que) {
      const { apiURL, apiKey } = this;
      this.isLoading = "true";
      axios
        .get(`${apiURL}?country=us&apiKey=${apiKey}?q=${que}`)
        .then(({ data }) => {
          const { articles } = data;
          this.allHeadlines = articles;
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          this.isLoading = "false";
        });
    },

    fetchNewsBySearch(find) {
      const { apiURL, apiKey } = this;
      this.isLoading = "true";
      axios
        .get(`${apiURL}?country=us&apiKey=${apiKey}`)
        .then(({ data }) => {
          const { articles } = data;
          this.allHeadlines = articles;
          return this.allHeadlines.filter((item) => {
            return this.search
              .toLowerCase()
              .split(" ")
              .every((find) => {
                item.author.toLowerCase().includes(find);
              });
          });
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  background: #ececec;
  min-height: 70vh;
  padding: 30px;
}
.posts {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
}
.post__single {
  border: 1px solid gray;
  border-radius: 4px;
  padding: 16px;
  overflow: hidden;
}
.post__image {
  width: 100%;
  height: 100px;
  overflow: hidden;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
}
nav {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}
.nav_menu {
  list-style: none;
  display: flex;
  padding: 20px;
  justify-content: space-between;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
}
.nav_menu li {
  padding: 0 10px;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 600;
}
</style>