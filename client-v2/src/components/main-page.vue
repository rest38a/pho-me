<template >
    <div class="yelow_side2 container-fluid" >
        <div class="logo">
			<img src='/icons/logo.svg' >
        </div >
        <div class="main-container container">
			<div class="text-col">
				<h1>Мы запустили доставку</h1>
				<h2>Азиатская кухня и напитки.</h2>
				<div class="delivery-btn" @click="gotoDelivery()">Заказать доставку</div >
				<div class="image"><img src="../assets/image/dish.png" alt=""></div>
			</div>
        </div >
    </div >
</template >

<script >
export default {
  name: 'main-page',
  methods: {
    gotoDelivery() {
      this.$router.push('delivery');
    },
  },

};
</script >

<style scoped >
    .img-fluid {
        max-width: 100%;
        height: auto;
    }

    @font-face {
        font-family: gl;
        src: url(../assets/font/GothaProLig.otf);
    }

    @font-face {
        font-family: gtb;
        src: url(../assets/font/gtb.ttf);
    }

    @font-face {
        font-family: ttdb;
        src: url(../assets/font/ttdb.ttf);
    }

    @font-face {
        font-family: ttm;
        src: url(../assets/font/ttm.ttf);
    }

	.yelow_side2 {
		background: #fcd000 no-repeat center / cover url("../assets/image/main-gradient.png");
		height: 100vh;
		position: relative;
		overflow: hidden;
    }

    .main-container {
		width: 1400px;
		position: relative;
		display: flex;
		height: 100%;
    }

	h1 {
		font-family: lb;
		font-style: italic;
		font-weight: 900;
		font-size: 120px;
		line-height: 120px;
		color: #fff;
		margin: 0;
	}

	h2 {
		font-family: lcb;
		font-weight: 500;
		font-size: 24px;
		line-height: 32px;
		color: #fff;
		margin: 35px 0;
	}

	.delivery-btn {
		font-family: lb;
		font-weight: 900;
		font-size: 21px;
		line-height: 28px;
		text-align: center;
		text-transform: uppercase;
		display: inline-block;
		padding: 21px 32px;
		color: #fff;
		background: #CA17A8;
		border-radius: 10px;
		cursor: pointer;
		-webkit-transition: .5s box-shadow;
		-o-transition: .5s box-shadow;
		transition: .5s box-shadow;
	}

	.delivery-btn:hover {
		-webkit-box-shadow: 0px 8px 35px 1px rgba(255,0,0,1);
		-moz-box-shadow: 0px 8px 35px 1px rgba(255,0,0,1);
		box-shadow: 0px 8px 35px 1px rgba(255,0,0,1);
	}

	.logo {
		padding-top: 23px;
		padding-left: 50px;
		position: absolute;
		top: 23px;
		left: 50px;
		z-index: 10;
	}

	.text-col {
		align-self: center;
		padding-right: 260px;
	}

	.image {
		position: absolute;
		right: -280px;
		top: 0;
	}

    @media (max-width: 600px) {
		.logo {
			left: 25px;
		}
    }

    .soon2 {
        text-align: center;
        color: #b32ba9;
        font-family: gtb;
        font-size: 40px;
    }

    .tag {
        float: left;
        color: #fff;
        font-family: ttdb;
        font-size: 30px;
    }

    #mouse {
        margin-top: -40px;
        margin-left: auto;
        margin-right: auto;
        width: 1.5em;
        height: 2.5em;
        background-color: rgba(255, 255, 255, 0);
        border-radius: 100px;
        border: 2px solid white;
    }

    #wheel {
        margin-top: 1.5em;
        margin-left: auto;
        margin-right: auto;
        width: 0.4em;
        height: 0.4em;
        background-color: white;
        border-radius: 50%;
    }

    .scroll2 {
        opacity: 0;
        margin-left: auto;
        margin-right: auto;
        width: 0px;
        height: 0px;
        border-left: 0.35em solid transparent;
        border-right: 0.35em solid transparent;
        border-top: 0.4em solid white;
        -webkit-animation: down2 1s infinite;
        animation: down2 1s infinite;
    }

    .scroll3 {
        opacity: 0;
        margin-left: auto;
        margin-right: auto;
        width: 0px;
        height: 0px;
        border-left: 0.35em solid transparent;
        border-right: 0.35em solid transparent;
        border-top: 0.4em solid white;
        -webkit-animation: down 1s infinite;
        animation: down 1s infinite;
    }

    .scroll {
        opacity: 0;
        margin-left: auto;
        margin-right: auto;
        width: 0px;
        height: 0px;
        border-left: 0.35em solid transparent;
        border-right: 0.35em solid transparent;
        border-top: 0.4em solid white;
        -webkit-animation: down3 1s infinite;
        animation: down3 1s infinite;
    }

    @-webkit-keyframes down {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
            transform: translateY(2.3em);
        }
    }

    @-webkit-keyframes down2 {
        40% {
            opacity: 0;
        }
        100% {
            opacity: 0.5;
            transform: translateY(2.3em);
        }
    }

    @-webkit-keyframes down3 {
        60% {
            opacity: 0;
        }
        100% {
            opacity: 0.2;
            transform: translateY(2.3em);
        }
    }

    @keyframes down {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
            transform: translateY(2.3em);
        }
    }

    @keyframes down2 {
        40% {
            opacity: 0;
        }
        100% {
            opacity: 0.5;
            transform: translateY(2.3em);
        }
    }

    @keyframes down3 {
        60% {
            opacity: 0;
        }
        100% {
            opacity: 0.2;
            transform: translateY(2.3em);
        }
    }

    #text {
        font-family: "lcm";
        font-size: 1em;
        text-align: center;
        margin-top: 0.5em;
        color: white;
    }

    .insta {
        float: right;
        font-family: ttm;
        font-size: 25px;
        background: #ad1da3;
        padding: 5px 30px;
        border-radius: 25px;
        color: #fcd000;
        cursor: pointer;
    }

    .w-50 {
        width: 50% !important;
    }

    .w-75 {
        width: 75% !important;
    }
</style >
