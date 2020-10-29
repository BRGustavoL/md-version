<template>
  <div class="login">
    <div class="inputs">
      <label class="custom-label" for="username" required>Agente</label>
      <input class="custom-input input-user" type="text" v-model="username">
      <label class="custom-label" for="username" required>E-mail</label>
      <input class="custom-input input-user" type="email" v-model="email">
      <label class="custom-label" for="password">Senha</label>
      <input class="custom-input input-pass" type="password" v-model="password">
      <label class="custom-label" for="password">Confirmar Senha</label>
      <input class="custom-input input-pass-confirm" type="password" v-model="passwordConfirm">
      <small class="custom-small-label pass-confirm-text">*As senhas devem ser iguais</small>
    </div>
    <div class="buttons">
      <button class="button-back" @click="back()">{{ backText }}</button>
      <button class="button-send" @click="register()">Cadastrar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import md2 from 'js-md2'
import md4 from 'js-md4'
import md5 from 'js-md5'
export default {
  name: 'register',

  data () {
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      backText: '<'
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

    back () {
      this.$router.push('/')
    },

    register () {
      if (this.username && this.email && this.password && this.passwordConfirm) {
        if (this.password === this.passwordConfirm) {
          this.sendUserInfo(this.username, this.email, this.password)
          setTimeout(() => {
            this.back()
          }, 400)
        } else {
          this.toast('show', 'As senhas não são iguais!')
        }
      } else {
        this.toast('show', 'Preencha todos os campos!')
      }
    },

    sendUserInfo (username, email, password) {
      let data = {
        username: username,
        email: email,
        passwordMD2: md2(password),
        passwordMD4: md4(password),
        passwordMD5: md5(password)
      }
      axios.post('http://localhost:4000/create-user', data)
        .then(() => {
          this.toast('show', 'Cadastro realizado com sucesso!')
        })
        .catch(err => {
          this.toast('error', err)
        })
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
      width: 300px;
      margin-top: 260px;

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

      .custom-small-label {
        margin-top: 4px;
        color: rgba($color: #FFFF, $alpha: 0.8);
      }

      .input-user, .input-pass, .pass-confirm-text {
        margin-bottom: 14px;
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

    .buttons {
      width: 300px;
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .button-back {
        width: 300px;
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
      .button-send {
        width: 300px;
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
