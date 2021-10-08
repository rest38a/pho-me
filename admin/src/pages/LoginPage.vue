<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <q-card class="my-card fixed-center">
          <q-card-section class="bg-amber text-black">
            <div class="text-h6">BackOffice</div>
          </q-card-section>
          <q-separator/>
          <q-card-actions align="center">
            <div class="column full-width">
              <div class="col q-pt-md q-px-sm">
                <q-input outlined
                         v-model="phone"
                         mask="+7 (###) ###-##-##"
                         unmasked-value
                         label="Телефон"/>
              </div>
              <div class="col q-pt-md q-px-sm">
                <q-input v-model="password"
                         label="Пароль"
                         outlined :type="isPwd ? 'password' : 'text'">
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </div>
              <div class="q-py-md q-px-sm">
                <error-alert
                  :massageText="massageText"
                  massageType="error"
                  :show="showError"
                />
              </div>
              <div class="col q-pt-md q-pb-sm row justify-center">
                <q-btn color="amber"
                       class="q-px-md"
                       @click="proxyLogin"
                       text-color="black" label="Вход"/>
              </div>
            </div>
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex';
import ErrorAlert from '../components/common/ErrorAlert';

export default {
  name: 'LoginPage',
  components: { ErrorAlert },
  data() {
    return {
      isPwd: true,
      phone: null,
      password: null,
      massageText: null,
      showError: false,
    };
  },
  methods: {
    ...mapActions('auth', ['login']),
    async proxyLogin() {
      const authData = {
        phone: this.phone,
        password: this.password,
      };
      this.login(authData)
        .then((data) => {
          if (data) {
            this.showError = true;
            this.massageText = 'Неверный логин или пароль';
          }
        })
        .catch(() => {
          this.showError = true;
          this.massageText = 'Возникла ошибка при авторизации сообщите администратору';
        });
    },
  },
};
</script>

<style scoped>
.wrap {
  height: 100%;
  max-width: 100%;
}

.my-card {
  width: 30%;
  min-width: 320px;
}
</style>
