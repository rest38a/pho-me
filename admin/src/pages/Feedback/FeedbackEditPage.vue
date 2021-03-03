<template>
    <div class="q-pa-md">
        <h5>Отзыв {{ feedback.id }}</h5>
        <q-form
                class="q-gutter-md"
        >
            <div class="row">
                <div class="col-4">
                    <q-input v-model="feedback.authorName" disable outlined label="Имя клиента"/>
                </div>
                <div class="col-4">
                    <q-input v-model="feedback.email" disable outlined label="Контакт"/>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <q-input
                            outlined
                            v-model="feedback.comment"
                            label="Отзыв"
                            type="textarea"
                    />
                </div>
                <div class="col-6">
                    <q-input
                            outlined
                            label="Ответ"
                            v-model="feedback.answer"
                            type="textarea"
                    />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    Оценка: {{feedback.raits}}
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <q-input outlined
                             label="Дата отзыва"
                             v-model="feedback.createdAt"
                    >
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy"
                                               transition-show="scale"
                                               transition-hide="scale">
                                    <q-date v-model="feedback.createdAt"
                                            mask="DD.MM.YYYY"
                                            @input="() => $refs.qDateProxy.hide()"/>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
            </div>
            <q-toggle
                    label="Активен"
                    v-model="feedback.isApprove"
                    color="amber"
            />
            <errorAlert
                    :massageText="alert.massageText"
                    :massageType="alert.massageType"
                    :show="alert.show"
            ></errorAlert>
            <div class="row">
                <div class="col-4">
                    <q-btn color="primary" @click='saveFeedback' label="Сохранить"/>
                </div>
                <div class="col-grow" v-if="edit"></div>
<!--                <div class="col-4 row justify-end" v-if="edit">-->
<!--                    <q-btn color="negative" @click='deletePromotion(promotion.id)'-->
<!--                           label="Удалить"/>-->
<!--                </div>-->
            </div>
        </q-form>
    </div>
</template>

<script>
import errorAlert from '../../components/common/ErrorAlert.vue';

import keysToCamel from '../../helpers/toCamelCase';

export default {
  name: 'FeedbackEditPage',
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
      feedback: {
        id: null,
        orderid: null,
        clientId: null,
        authorName: null,
        email: null,
        phone: null,
        comment: null,
        rait: null,
        answer: null,
        answerDate: new Date(),
        isDelete: false,
        isApprove: false,
        createdAt: null,
      },
      alert: {
        massageText: '',
        massageType: '',
        show: false,
      },
    };
  },
  methods: {
    saveFeedback() {
      this.$axios.post('/api/feedback', { feedback: this.feedback })
        .then(({ data }) => {
          if (data.error !== undefined) {
            this.alert.show = true;
            this.alert.massageText = data.error;
            this.alert.massageType = 'error';
          } else {
            this.alert.show = true;
            this.alert.massageText = data.massage;
            this.alert.massageType = 'success';
          }
        })
        .catch(({ data }) => {
          this.alert.show = true;
          this.alert.massageText = data.error;
          this.alert.massageType = 'error';
        });
    },
  },
  mounted() {
    if (this.edit) {
      this.$axios.get(`/api/feedback/${this.$route.params.id}`)
        .then(({ data }) => {
          // console.log('mounted2');
          this.feedback = keysToCamel(data.feedback);
        });
    }
  },
};
</script>

<style scoped>

</style>
