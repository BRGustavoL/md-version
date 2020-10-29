<template>
  <div class="login">
    <div class="inputs">
      <label class="custom-label" for="username" required>Agente</label>
      <input class="custom-input input-user" type="text" v-model="username">
      <label class="custom-label" for="password">Senha</label>
      <input class="custom-input input-pass" type="password" v-model="password">
    </div>
    <div class="send-button">
      <button class="button-send" @click="send()">Entrar</button>
    </div>
    <div class="register">
      <p>Agência não liberou sua conta? Registre-se <a class="register-text" @click="signUp()">aqui</a></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import md2 from 'js-md2'
import md4 from 'js-md4'
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
        theme: "toasted-primary",
        position: "top-center",
        duration : 2000
      })
    },

    signUp () {
      this.$router.push('/register')
    },

    redirect () {
      this.toast('show', 'Seja bem-vindo!')
      setTimeout(() => {
        this.$router.push('/dashboard')
      }, 1000)
    },

    isValidUser (users) {
      let result = false
      users.forEach(el => {
        if (el.username === this.username && el.passwordMD2 === md2(this.password) && el.passwordMD4 === md4(this.password) && el.passwordMD5 === md5(this.password)) {
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
        passwordMD2: '',
        passwordMD4: '',
        passwordMD5: ''
      }
      if (this.username && this.password) {
        body = {
          username: this.username,
          passwordMD2: md2(this.password),
          passwordMD4: md4(this.password),
          passwordMD5: md5(this.password)
        }
        axios.post('http://localhost:4000/find-user', body)
        .then(res => {
          if (res && res.data && res.data.DATA && res.data.DATA.length > 0) {
            if (this.isValidUser(res.data.DATA)) {
              this.redirect()
            }
          } else {
            this.toast('show', 'Usuário e senha inválidos!')
          }
        })
        .catch(err => {
          this.toast('error', err)
        })
      } else {
        this.toast('show', 'Insira um usuário!')
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
    height: 100vh;
    background-image: url('https://wallpapercave.com/wp/wp2728040.jpg');
    background-repeat: no-repeat;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    flex-wrap: wrap;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    z-index: 1;

    .inputs {
      display: flex;
      flex-direction: column;
      margin-top: 100px;

      .custom-input {
        border: none;
        padding: 10px;
        padding-left: 16px;
        outline: none;
        font-size: 22px;
        background-color: rgba($color: #000000, $alpha: 0.8);
        color: rgba($color: #FFFF, $alpha: 0.8);
      }

      .custom-label {
        font-size: 26px;
        margin-bottom: 10px;
        color: rgba($color: #FFFF, $alpha: 0.8);
      }

      .input-user, .input-pass {
        margin-bottom: 14px;
      }
    }

    .register {
      margin-top: 10px;
      color: rgba($color: #FFFF, $alpha: 0.8);

      .register-text {
        font-weight: bold;
        transition: all 200ms;
        color: rgba($color: #FFFF, $alpha: 0.8);;
        cursor: pointer;

        &:hover {
          color: white;
          transition: all 200ms;
        }
      }
    }

    .send-button {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 20px;
      margin-bottom: 10px;
      .button-send {
        width: 200px;
        height: 40px;
        border: 0;
        background-color: rgba($color: #000000, $alpha: 0.9);
        padding: 4px;
        outline: none;
        color: white;
        cursor: pointer;
        transition: all 200ms;

        &:hover {
          transition: all 200ms;
          background-color: rgba($color: #000000, $alpha: 1.0);
        }
      }
    }
  }
</style>
