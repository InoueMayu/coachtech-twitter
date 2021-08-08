<template>
  <div class="register">
    <Header />
    <table class="register2">
    <tr><th>新規登録</th></tr>
    <tr><td><input type="text" v-model="name" placeholder="ユーザーネーム" required /></td></tr>
    <tr><td><input type="email" v-model="email" placeholder="メールアドレス" required /></td></tr>
    <tr><td><input type="password" v-model="password" placeholder="パスワード" required /></td></tr>
    <tr><td><button @click="register">新規登録</button></td></tr>
  </table>
  </div>
</template>

<script>
import Header from '@/components/Header'
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      name:null,
      email: null,
      password: null,
    }
  },
  methods: {
    register() {
      if (!this.name || !this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.sendEmailVerification().then(() => {
            this.$router.replace('/confirm')
          })
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/email-already-in-use':
              alert('このメールアドレスはすでに使われています。')
              break
            case 'auth/weak-password':
              alert('パスワードは6文字以上で入力してください。')
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

  body{
    background-color: black;
  }

  .register2 {
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
