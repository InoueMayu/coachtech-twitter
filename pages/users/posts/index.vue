<template>
  <div class="home">
    <table>
      <tr>
        <td>
          <table>
      <tr><img src="img/logo.png" width="200px"></tr>
      <tr>
       <td><img class="home-img" src="img/home.png" width="30px">ホーム</td>
      </tr>
      <tr>
        <td><img class="home-img" src="img/logout.png" width="30px">ログアウト</td>
      </tr>
      <tr>
        <td>シェア</td>
      </tr>
      <tr>
        <td><textarea cols="40" rows="10" name="tweet" id="tweet"  v-model="newTweet"></textarea></td>
      </tr>
        <td>
          <button @click="insertTweet" class="button" type="submit">シェアする</button>
        </td>
            </table>
        </td>

    <td>
    <table>
      <tr>
      <tr><th>ホーム</th></tr>
       <tr v-for="item in tweetLists" :key="item.id">
        <td>{{item.text}}</td>
        <td><button @click="deleteTweet(item.id)">削除</button></td>
        <td><button>いいね</button></td>
        <td>
          <nuxt-link :to="`/users/posts/${item.text}`">comment</nuxt-link>

        </td>
      </tr>
    </table>
    </td>
      </tr>
    </table>

  </div>

</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      newTweet: "",
      tweetLists:[],
    };
  },
  methods: {
    async getTweet() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/post/"
      );
      this.tweetLists = resData.data.data;
    },
    async insertTweet() {
      const sendData = {
        text:this.newTweet
      };
      await this.$axios.post("http://127.0.0.1:8000/api/post/", sendData);
      this.getTweet();
    },
    async deleteTweet(id){
      await this.$axios.delete("http://127.0.0.1:8000/api/post/" + id);
      this.getTweet();
    },

  },
  created(){
    this.getTweet();
  },
};
</script>

<style>

  table {
    width: 300px;
  }

  .home-img {
    margin-right: 15px;
  }

  textarea {
    background-color: transparent;
    color: white;
    border-radius: 10px;
  }

  body {
    background-color: black;
    color: white;
  }

</style>
