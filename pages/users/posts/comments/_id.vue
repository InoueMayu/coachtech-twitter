<template>
  <div class="container">
    {{$route.params.id}}
    <input type="text" name="comment" id="comment" v-model="newComment">
    <button @click="insertComment">コメント</button>

    <table>
      <tr v-for="item in commentLists" :key="item.id">
        <td>{{ item.comment }}</td>
        <td>
            <button @click="deleteComment(item.id)">削除</button>
          </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newComment: "",
      commentLists: [],
    };
  },
  methods: {
    async getComment() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/comment/"
      );
      this.commentLists = resData.data.data;
    },
    async insertComment() {
      const sendData = {
        comment: this.newComment
      };
      await this.$axios.post("http://127.0.0.1:8000/api/comment/", sendData);
      this.getComment();
    },

    async deleteComment(id) {
      await this.$axios.delete("http://127.0.0.1:8000/api/comment/" + id);
      this.getComment();
    },
  },
  created() {
    this.getComment();
  },
};
</script>


<style>
  p {
    color: white;
  }
</style>
