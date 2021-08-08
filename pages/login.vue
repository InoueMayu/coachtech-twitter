<template>
  <div class="login">
    <Header />
    <table class="login2">
    <tr><th>ログイン</th></tr>
    <tr><td><input type="email" v-model="email" placeholder="メールアドレス" required /></td></tr>
    <tr><td><input type="password" v-model="password" placeholder="パスワード" required /></td></tr>
    <tr><td><button @click="login">ログイン</button></td></tr>
  </table>
  </div>

</template>


<script>
import Header from '@/components/Header'
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert('ログインが完了しました')
          this.$router.push('/')
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/user-disabled':
              alert('ユーザーが無効になっています。')
              break
            case 'auth/user-not-found':
              alert('ユーザーが存在しません。')
              break
            case 'auth/wrong-password':
              alert('パスワードが間違っております。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })
    },
  },
}
</script>

<style>

  .login2 {
    background-color: white;
    border-radius: 20px;
    padding: 50px 50px;
    margin: 0 auto;
  }


  input {
    width: 400px;
    height: 50px;
    margin-top: 20px;
    border-radius: 15px;
    border: 2px solid #ccc;
  }

  .button {
    display: block;
    margin: auto;
    margin-top: 20px;
  }
</style>
