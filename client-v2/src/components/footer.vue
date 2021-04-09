<template >
    <div>
        <div class='black_blk'>
            <div class='container full-height justify-center justify-md-center'>
                <div class='row justify-right justify-md-center full-height'>
                    <div class='col-md-4 col-sm-6 col-12 text-md-left
                    justify-center contact-col'>
                        <div class='zag11720 text-md-left'>
                            АДРЕС
                        </div>
                        <div class='zag1720 text-md-left'>
                            г. Иркутск, ул. 3 июля, 25<br>
                            ТРК «Модный Квартал», 2 этаж
                        </div>
                    </div>
                    <div class='col-md-4 col-sm-6 col-12 justify-content-center contact-col'>
                        <div class='zag11720'>
                            РЕЖИМ РАБОТЫ
                        </div>
                        <div class='zag1720'>
                            ПН-ЧТ с 12:00 до 23:00<br>
                            ПТ-ВС с 12:00 до 24:00
                        </div>
                    </div>
                    <div class='col-md-4 col-sm-6 col-12 justify-content-center contact-col'>
                        <div class='zag11720'>
                            КОНТАКТЫ
                        </div>
                        <div class='zag1720'>
                            596-011
                        </div>
                    </div>
                    <!-- <div class='socials-wrap col-sm-6 contact-col'>
						<div class='socials'>
                            <a href='https://www.facebook.com/phome.irk/'><div class='faced '></div></a>
                            <a href='https://www.instagram.com/pho_me_/'><div class='instd'></div></a>
						</div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template >

<script >
const axios = require('axios').default;

export default {
  name: 'my-footer',
  data() {
    return {
      wtime: [{
        days: 'ПН-ЧТ',
        hours: 'с 12:00 до 23:00',
      }],
    };
  },
  mounted() {
    axios.get('http://176.112.218.115:1337/worktimes')
      .then((response) => {
        console.log(response);
        this.wtime.splice(0, this.wtime.length, ...response.data);
      });
  },
};
</script >

<style scoped >
	.black_blk {
		background: #18a3a1;
		color: #fff;
		font-family:lcb;
		padding: 12px 0;
		position: relative;
    margin-top: 50px;
	}

    .zag11720 {
		font-weight: 900;
		font-size: 24px;
		line-height: 32px;
		font-family:lb;
	}

    .zag1720 {
		font-weight: 500;
		font-size: 18px;
		line-height: 24px;
	}

	.socials-wrap {
		position: absolute;
		right: 43px;
		top: 0;
		height: 100%;
		width: 110px;
	}

	.socials {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100%;
	}

    .instd{
        width:32px;
        height:32px;
        background-image:url(../assets/image/inst_w.svg);
        background-repeat:no-repeat;
        cursor:pointer;

    }
    .faced{
        width:32px;
        height:32px;
        background-image:url(../assets/image/fb_w.svg);
        background-repeat:no-repeat;
        cursor:pointer;
    }

    @media (max-width: 1023px) {
		.black_blk {
			padding-top: 44px;
			padding-bottom: 15px;
		}
		.socials-wrap {
			position: static;
			height: auto;
			width: 50%;
		}
		.socials {
			width: 80px;
		}
		.contact-col {
			padding-bottom: 30px;
		}
	}
    @media (max-width: 780px) {
		.socials-wrap {
		}
		.zag11720 {
			font-size: 20px;
			line-height: 27px;
		}

		.zag1720 {
			font-size: 16px;
			line-height: 22px;
		}

    }
    @media (max-width: 600px) {
		.socials-wrap {
			width: 100%;
		}
    }

</style >
