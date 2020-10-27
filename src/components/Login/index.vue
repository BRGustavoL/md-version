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
import axios from 'axios'
import md5 from 'js-md5'
export default {
  name: 'login',

  data () {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    signUp () {
      this.$router.push('/register')
    },

    redirect () {
      alert('Login realizado com sucesso!')
      setTimeout(() => {
        this.$router.push('/dashboard')
      }, 1000)
    },

    isValidUser (users) {
      let result = false
      users.forEach(el => {
        if (el.username === this.username && el.password === md5(this.password)) {
          result = true
        } else {
          result = false
        }
      })

      return result
    },

    send () {
      let body = {
        username: '',
        password: ''
      }
      if (this.username && this.password) {
        body = {
          username: this.username,
          password: md5(this.password)
        }
        axios.post('http://localhost:4000/find-user', body)
        .then(res => {
          if (res && res.data && res.data.DATA && res.data.DATA.length > 0) {
            if (this.isValidUser(res.data.DATA)) {
              this.redirect()
            }
          } else {
            alert('Usuário e senha inválidos!')  
          }
        })
        .catch(err => {
          console.error(err)
        })
      } else {
        alert('Insira um usuário!')
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
