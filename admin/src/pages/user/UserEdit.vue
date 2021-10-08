<template>
  <div class="q-pa-md">
    <q-form
      class=""
    >
      <div class="row q-col-gutter-lg">
        <div class="col-4">
          <q-input
            outlined
            v-model="user.name"
            label="Имя"
          />
        </div>
        <div class="col-4">
          <q-input
            v-model="user.phone"
            label="телефон"
            outlined
            clearable
            unmasked-value
            ref="phone"
            type="tel"
            mask="+7 (###) ###-##-##"
            :rules="[ val => val && val.length === 10
                            || 'В номере должно быть 11 цифр']"
            fill-mask
          />
        </div>
        <div class="col-4">
          <q-input
            outlined
            v-model="user.email"
            label="email"
          />
        </div>
      </div>
      <div class="row  q-col-gutter-lg">
        <div class="col-4">
          <q-select outlined
                    v-model="user.roles"
                    option-label="name"
                    option-value="id"
                    :options="roles" label="Роль"/>
        </div>
        <div class="col-4">
          <q-input
            outlined
            v-model="user.password"
            :type="isPwd ? 'password' : 'text'"
            label="Новый пароль"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
        <div class="col-4">
          <q-input
            outlined
            v-model="passwordRepeat"
            :type="isPwd2 ? 'password' : 'text'"
            label="Пароль ещё раз"
            :rules="[ val => val === user.password
                            || 'Пароли не совпадают']"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd2 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd2 = !isPwd2"
              />
            </template>
          </q-input>
        </div>
      </div>
      <q-toggle
        v-model="user.isActive"
        label="Активен"
        color="amber"
      />
      <q-toggle
        v-model="user.isStaff"
        label="рабочий аккаунт"
        color="amber"
      />
      <errorAlert
        :massage-text="alert.massageText"
        :massage-type="alert.massageType"
        :show="alert.show"
      />
      <div class="row">
        <div class="col-4">
          <q-btn
            color="primary"
            label="Сохранить"
            @click="saveUser"
          />
        </div>
        <div
          v-if="edit"
          class="col-grow"
        />
        <div
          v-if="edit"
          class="col-4 row justify-end"
        >
          <q-btn
            color="negative"
            label="Удалить"
            @click="deleteStaff(user)"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import errorAlert from '../../components/common/ErrorAlert.vue';

export default {
  name: 'UserEdit',
  components: {
    errorAlert,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isPwd: true,
      isPwd2: true,
      user: {
        id: null,
        name: null,
        email: null,
        phone: null,
        password: null,
        isActive: true,
        isStaff: true,
        isDelete: false,
        roles: null,
      },
      passwordRepeat: null,
      alert: {
        massageText: '',
        massageType: '',
        show: false,
      },
      roles: [],
    };
  },
  mounted() {
    if (this.edit) {
      this.$axios.get(`/api/staff/user/${this.$route.params.id}`)
        .then(({ data }) => {
          data = this.$toCamelCase(data);
          this.user = data.user;
        });
    }
    this.$axios.get('/api/roles')
      .then(({ data }) => {
        data = this.$toCamelCase(data);
        this.roles.splice(0, this.roles.length, ...data.roles);
      });
  },
  methods: {
    saveUser() {
      this.$axios.post('/api/user', { user: this.user })
        .then(({ data }) => {
          if (data.error !== undefined) {
            this.alert.show = true;
            this.alert.massageText = data.error;
            this.alert.massageType = 'error';
          } else {
            this.alert.show = true;
            this.alert.massageText = data.massage;
            this.alert.massageType = 'success';
            this.user.id = data.user.id;
          }
        })
        .catch(({ data }) => {
          this.alert.show = true;
          this.alert.massageText = data.error;
          this.alert.massageType = 'error';
        });
    },
    deleteStaff() {
      this.$axios.post('/api/user_delete', { user: this.user })
        .then(({ data }) => {
          if (data.error !== undefined) {
            this.alert.show = true;
            this.alert.massageText = data.error;
            this.alert.massageType = 'error';
          } else {
            this.alert.show = true;
            this.alert.massageText = data.massage;
            this.alert.massageType = 'success';
            this.user.id = data.user.id;
          }
        })
        .catch(({ data }) => {
          this.alert.show = true;
          this.alert.massageText = data.error;
          this.alert.massageType = 'error';
        });
    },
  },
};
</script>

<style scoped>

</style>
