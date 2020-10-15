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
import md2 from 'js-md2'
import md4 from 'js-md4'
import md5 from 'js-md5'
import { v4 as uuidv4 } from 'uuid'
import { usersRef } from '../../firebase/firebase'
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
          this.updateFirebaseUserData(this.username, this.email, this.password)
          alert('Cadastro realizado com sucesso!')
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

    updateFirebaseUserData (username, email, password) {
      usersRef.add({
        id: uuidv4(),
        username: username ? username : '',
        email: email ? email : '',
        passwordMD2: md2(password),
        passwordMD4: md4(password),
        passwordMD5: md5(password)
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
