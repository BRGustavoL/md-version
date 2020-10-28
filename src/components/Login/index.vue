<template>
  <div class="login">
    <div class="inputs">
      <label class="custom-label" for="username" required>Usuário</label>
      <input class="custom-input input-user" type="text" v-model="username">
      <label class="custom-label" for="password">Senha</label>
      <input class="custom-input input-pass" type="password" v-model="password">
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
    toast (type, msg) {
      this.$toasted[type](msg, { 
        theme: "outline", 
        position: "top-center", 
        duration : 2000
      })
    },

    signUp () {
      this.$router.push('/register')
    },

    redirect () {
      this.toast('success', 'Seja bem-vindo!')
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
            this.toast('error', 'Usuário e senha inválidos!')
          }
        })
        .catch(err => {
          this.toast('error', err)
        })
      } else {
        this.toast('error', 'Insira um usuário!')
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

      .custom-input {
        border-radius: 30px;
        border: 1px solid rgba($color: #000000, $alpha: 0.8);
        padding: 6px;
        padding-left: 14px;
        outline: none;
      }

      .custom-label {
        margin-left: 12px;
      }

      .input-user, .input-pass {
        margin-bottom: 14px;
      }
    }

    .register {
      margin-top: 10px;

      .register-text {
        font-weight: bold;
        transition: all 200ms;
        cursor: pointer;

        &:hover {
          color: red;
          transition: all 200ms;
        }
      }
    }

    .send-button {
      width: 100%;
      display: flex;
      justify-content: center;
      .button-send {
        width: 100px;
        border-radius: 30px;
        border: 0;
        background-color: #484848;
        padding: 4px;
        outline: none;
        transition: all 200ms;
        color: white;
        cursor: pointer;

        &:hover {
          transition: all 200ms;
          background-color: #767676;
        }
      }
    }
  }
</style>
