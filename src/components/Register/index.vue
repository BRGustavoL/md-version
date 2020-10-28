<template>
  <div class="login">
    <div class="inputs">
      <label class="custom-label" for="username" required>Usuário</label>
      <input class="custom-input input-user" type="text" v-model="username">
      <label class="custom-label" for="username" required>E-mail</label>
      <input class="custom-input input-user" type="email" v-model="email">
      <label class="custom-label" for="password">Senha</label>
      <input class="custom-input input-pass" type="password" v-model="password">
      <label class="custom-label" for="password">Confirmar Senha</label>
      <input class="custom-input input-pass-confirm" type="password" v-model="passwordConfirm">
      <small class="custom-label pass-confirm-text">*As senhas devem ser iguais</small>
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
    toast (type, msg) {
      this.$toasted[type](msg, { 
        theme: "outline", 
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
          this.toast('error', 'As senhas não são iguais!')
        }
      } else {
        this.toast('error', 'Preencha todos os campos!')
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
          this.toast('success', 'Cadastro realizado com sucesso!')
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
    height: 90vh;

    .inputs {
      display: flex;
      flex-direction: column;
      width: 200px;

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
      .button-back {
        width: 40px;
        border-radius: 30px;
        border: 0;
        background-color: #484848;
        outline: none;
        transition: all 200ms;
        color: white;
        cursor: pointer;

        &:hover {
          transition: all 200ms;
          background-color: #767676;
        }
      }
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
