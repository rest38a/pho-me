<template >
    <div id="feedback">
        <div class='lcm_font q-pb-lg px-0'>
            <a name='feedback2' id='feedback2'> </a>
            <div class='h1 text-center mobile-hide'>ОТЗЫВЫ</div>
            <div class='container'>
                <div class="row">
                <div class='col-md-6 text-center col-12'>
                    <div class='yelow_feedback bg-warning-pho  q-mr-md-lg '>
                        <div class='h3 '>
                            ОСТАВИТЬ ОТЗЫВ
                        </div>
                        <div id='sent_space' v-if="!sent">
                            <div class='row justify-content-between q-col-gutter-lg'>
                                <div class='col-6 q-pl-0'>
                                    <div class='name_input'>
                                        Имя
                                    </div>
                                    <div>
                                        <input type='text' id='name'
                                               v-model="new_feedback.name"
                                               class='feedback_input_m'>
                                    </div>
                                </div>
                                <div class='col-6 q-pr-0'>
                                    <div class='name_input'>
                                        E-MAIL
                                    </div>
                                    <div>
                                        <input type='text' id='email'
                                               v-model="new_feedback.email"
                                               class='feedback_input_m'>
                                    </div>
                                </div>
                            </div>
                            <div class="q-py-md">

                                    <div class='name_input'>
                                        СООБЩЕНИЕ
                                    </div>
                                    <div>
                                        <textarea type='text'
                                                  id='massage'
                                                  v-model="new_feedback.feedback_text"
                                                  class='feedback_input_ta'>
                                        </textarea>
                                    </div>

                            </div>
                            <div v-if="errors.length">
                                <b>Пожалуйста исправьте следующие ошибки:</b>
                                <div :key="error" v-for="error in errors">{{ error }}</div>
                            </div>
                            <q-btn class='menu_1_d'
                                    @click='create' :disabled="errors.length > 0
                                    || new_feedback.feedback_text === null">
                                <b-spinner small label="Small Spinner" type="grow"
                                           v-show="load">

                                </b-spinner>
                                ОТПРАВИТЬ
                                <b-spinner small label="Small Spinner"
                                           type="grow" v-show="load"></b-spinner>
                            </q-btn>

                        </div>
                        <div  v-if="sent">
                            Ваш отзыв успешно сохранен <br> Спасибо!
                        </div>
                    </div>
                </div>
                <div class='col-md-6 col-12 pt-4 pt-md-0 feedback_one'>
                    <div class='h2 text-center desktop-hide'>ОТЗЫВЫ</div>
                    <div class='' id='comment'>
                        <div class='line_attr d-flex justify-content-between align-items-center'>
                            <div class='h2' id='name_otz'>
                                {{ feedbacks[num_show].name }}
                            </div>
                            <div class='date_feed' id='date_otz'>
                                {{ feedbacks[num_show].date_create.substr(0,10) }}
                            </div>

                        </div>
                        <div class=''>
                            <div class='feed_user py-4' id='comment_otz'>
                                {{ feedbacks[num_show].feedback_text }}
                            </div>
                            <div class='feed_our' id='our_comment_otz'>
                                {{ feedbacks[num_show].answer }}
                            </div>
                        </div>
                        <div class='line_attr'>
                            <div class='text-right'>
                                <div class='left_feed' id='left' @click='goto(-1)'></div>
                                <div class='right_feed' id='right' @click='goto(1)'></div>
                            </div>
                        </div>
                    </div>
                </div>
                    </div>
            </div>
        </div>
    </div>
</template >

<script >
const axios = require('axios').default;
// tslint:disable-block
export default {
  name: 'feedback',
  data() {
    return {
      new_feedback: {
        name: null,
        feedback_text: null,
        public: false,
        email: null,
        date_create: new Date(),
        answer: null,
      },
      errors: [],
      feedbacks: [{
        name: '',
        date_create: '',
        feedback_text: '',
        answer: '',
      }],
      num_show: 0,
      sent: false,
      load: false,
    };
  },
  mounted() {
    axios.get('http://176.112.218.115:1337/feedbacks?public=true')
      .then((response) => {
        this.feedbacks.splice(0, this.feedbacks.length, ...response.data);
      });
  },
  methods: {
    goto(num) {
      if (this.num_show + num < 0) {
        this.num_show = this.feedbacks.length - 1;
      } else if ((this.num_show + num) > this.feedbacks.length - 1) {
        this.num_show = 0;
      } else {
        this.num_show = num + this.num_show;
      }
    },
    create() {
      this.load = true;
      axios.post('http://176.112.218.115:1337/feedbacks', this.new_feedback)
        .then(() => {
          this.sent = true;
          this.load = false;
        });
      this.load = false;
    },
    checkForm() {
      this.errors = [];

      if (!this.new_feedback.name) {
        this.errors.push('Укажите имя.');
      }
      if (!this.new_feedback.email) {
        this.errors.push('Укажите электронную почту.');
      } else if (!this.validEmail(this.new_feedback.email)) {
        this.errors.push('Укажите корректный адрес электронной почты.');
      }
      if (this.new_feedback.feedback_text.length === 0) {
        this.errors.push('Отзыв не может быть пустым');
      }

      if (!this.errors.length) {
        return true;
      }
      return false;
    },

    validEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
  watch: {
    'new_feedback.email': function () {
      this.checkForm();
    },
    'new_feedback.feedback_text': function () {
      this.checkForm();
    },
    'new_feedback.name': function () {
      this.checkForm();
    },
  },
};
</script >

<style scoped >
    .bg-warning-pho {
        background: #fcd000;
    }
    .h1, .h2{
        font-family:lcb;
        font-size: 2.5rem;
    }
    .h3{
        font-size: 1.75rem;
        font-weight: 500;
        line-height: 1.2;
    }
    .lcm_font{
        font-family:lcm;
    }
    .yelow_feedback{
        background: #fcd000;
        border-radius:10px;
        padding:20px 20px;
    }
    .name_input{
        font-family:lcm;
        text-align:left;
    }
    .feedback_input_m{
        border-radius:10px;
        border:1px #ad1da3 solid;
        height:40px;
        width:100%;
    }
    .feedback_input_ta{
        border-radius:10px;
        border:1px #ad1da3 solid;
        height:100px;
        width:100%;
        font-family:arial;
        font-size:12px;
    }

    @media (min-width: 780px) {
        .feedback_one{
            width:50%;
            padding:40px 0px 40px 40px;
            border-left:1px #000 dashed;

        }
    }

    .line_attr{
        border-bottom:1px #000 dashed;
    }
    .feed_our{
        padding:10px;
        background:#fcd000;
        border-radius:10px;
        font-family:lcr;
        font-size:14px;
        margin:0 0 20px 0;
    }
    .left_feed{
        width:35px;
        height:35px;
        background:#ad1da3;
        background-image:url(../assets/image/left.png);
        background-repeat:no-repeat;
        background-position:9px 7px;
        border-radius:20px;
        float:left;
        margin:10px;
        cursor:pointer;
    }
    .right_feed{
        float:left;
        width:35px;
        height:35px;
        margin:10px 00px 10px 5px;
        background:#ad1da3;
        background-image:url(../assets/image/right.png);
        background-repeat:no-repeat;
        background-position:13px 7px;
        border-radius:20px;
        cursor:pointer;
    }

    .menu_1_d {
        font-family: lcm;
        text-align: center;
        color: #000000;
        background: #ad1da3;
        color: #ffffff;
        font-size: 1.4rem;
        margin: 5px auto;
        border-radius: 20px;
        padding: 0 50px;
    }

    .menu_1_d:hover {
        background: #ad1da3;
        color: #ffffff;
        padding: 0 50px;
        border-radius: 20px;
    }
</style >
