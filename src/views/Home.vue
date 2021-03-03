<template>
  <div>
  <h1>Top Headlines</h1>
  <nav class="nav">
    <ul class="nav_menu">
      <li v-for="(category, index) in categories" :key="index" @click="fetchNewsByCategory(category)">{{ category }}</li>
    </ul>
  </nav>
    <div class="home">
      <h1 v-if="isLoading">Loading...</h1>
      <div class="posts" v-else>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "Home",
  components: {},
  //   build a news app that does the following
  // 1. On the landing page, the user should see top headlines of news
  // *Info should contain
  // -News Headline
  // -Snippet of the news
  // -Source
  // 2. User should be able to view top headlines of categories like: business, entertainment, general, health, science, sports, technology
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
    };
  },
  mounted() {
    const { apiURL, apiKey } = this;
    axios
      .get(`${apiURL}?country=us&apiKey=${apiKey}`)
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

  methods: {
    fetchNewsByCategory(cat) {
      const { apiURL, apiKey } = this;
      this.isLoading = true;
      axios
        .get(`${apiURL}?country=us&apiKey=${apiKey}&category=${cat !== 'all' ? cat : ''}`)
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
  },
};
</script>

<style scoped>
.home {
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
  padding: 20px;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
}
.nav_menu {
  list-style: none;
  display: flex;
  justify-content: space-between;
}
.nav_menu li {
  padding: 0 10px;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 600;
}
</style>