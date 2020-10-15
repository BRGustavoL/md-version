<template>
  <div class="login">
    <div class="inputs">
      <label for="username" required>Usuário</label>
      <input class="input-user" type="text" v-model="username">
      <label for="password">Senha</label>
      <input class="input-pass" type="password" v-model="password">
    </div>
    <div class="send-button">
      <button class="button-send" @click="send()">Entrar</button>
    </div>
    <div class="register">
      <p>Não tem conta? Registre-se <a class="register-text" @click="signUp()">aqui</a></p>
    </div>
  </div>
</template>

<script>
import md2 from 'js-md2'
import md4 from 'js-md4'
import md5 from 'js-md5'
import { usersRef } from '../../firebase/firebase'
export default {
  name: 'login',

  data () {
    return {
      username: '',
      password: '',
      users: []
    }
  },

  firestore() {
    return {
      users: usersRef.orderBy('id', 'desc')
    }
  },

  methods: {
    signUp () {
      this.$router.push('/register')
    },

    isValidUser (user, pass) {
      let result = false
      this.users.forEach(el => {
        if (el.username === user && el.passwordMD2 === md2(pass) && el.passwordMD4 === md4(pass) && el.passwordMD5 === md5(pass)) {
          result = true
        } else {
          result = false
        }
      })

      return result
    },

    send () {
      if (this.username && this.password) {
        if (this.isValidUser(this.username, this.password)) {
          alert('Login realizado com sucesso!')
          setTimeout(() => {
            this.$router.push('/dashboard')
          }, 1000)
        } else {
          alert('Usuário e senha inválidos!')  
        }
      } else {
        alert('Insira um usuário e senha!')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 90vh;

    .inputs {
      display: flex;
      flex-direction: column;

      .input-user, .input-pass {
        margin-bottom: 10px;
      }
    }

    .register {
      margin-top: 10px;

      .register-text {
        cursor: pointer;
      }

      .register-text:hover {
        color: blue;
        transition: all 400ms;
      }
    }

    .send-button {
      width: 100%;
      display: flex;
      justify-content: center;
      .button-send {
        width: 100px;
      }
    }
  }
</style>
