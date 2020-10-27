<template>
  <div class="login">
    <div class="inputs">
      <label for="username" required>Usuário</label>
      <input class="input-user" type="text" v-model="username">
      <label for="username" required>E-mail</label>
      <input class="input-user" type="email" v-model="email">
      <label for="password">Senha</label>
      <input class="input-pass" type="password" v-model="password">
      <label for="password">Confirmar Senha</label>
      <input class="input-pass-confirm" type="password" v-model="passwordConfirm">
      <small class="pass-confirm-text">*As senhas devem ser iguais</small>
    </div>
    <div class="buttons">
      <button class="button-back" @click="back()">{{ backText }}</button>
      <button class="button-send" @click="register()">Cadastrar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
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
    back () {
      this.$router.push('/')
    },

    register () {
      if (this.username && this.email && this.password && this.passwordConfirm) {
        if (this.password === this.passwordConfirm) {
          this.sendUserInfo(this.username, this.email, this.password)
          setTimeout(() => {
            this.$router.push('/')
          }, 400)
        } else {
          alert('As senhas não são iguais!')
        }
      } else {
        alert('Preencha todos os campos!')
      }
    },

    sendUserInfo (username, email, password) {
      let data = {
        username: username,
        email: email,
        password: md5(password)
      }
      axios.post('http://localhost:4000/create-user', data)
        .then(() => {
          alert('Cadastro realizado com sucesso!')
        })
        .catch(err => {
          console.error(err)
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
    height: 90vh;

    .inputs {
      display: flex;
      flex-direction: column;
      width: 200px;

      .input-user, .input-pass, .pass-confirm-text {
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

    .buttons {
      width: 200px;
      display: flex;
      justify-content: space-between;
      .button-send {
        width: 100px;
      }
    }
  }
</style>
