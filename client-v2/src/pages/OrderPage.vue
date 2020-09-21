<template >
    <q-page class="main-container" >
        <img src="/icons/logo.svg" alt="" class="logo mobile-hide" >
        <div class="header-mobile row desktop-hide items-center" >
            <div class="col-3 q-pa-sm items-center row" >
                <img src="/icons/logo.svg" alt="" class="logo-m" >
            </div >
            <div v-ripple class="cart-widget-m " @click="showMobileCart = !showMobileCart" >
                <img src="/icons/basket.svg" alt="" class="cart-logo" >
                <div class="cart-product-num-m" >{{orderProductsNum}}</div >
            </div >
        </div >
        <div >
            <div v-ripple class="cart-widget mobile-hide" @click="showCart = !showCart" >
                <img src="/icons/basket.svg" alt="" class="cart-logo" >
                <div class="cart-product-num" >{{orderProductsNum}}</div >
            </div >
            <div class="yelow-line mobile-hide" v-if="showCart" >
            </div >
            <div class="shadow-cart mobile-hide" v-if="showCart"
                 @click.stop="showCart = !showCart" >
            </div >
        </div >
        <div class="cart row" v-if="showCart" >
            <div class="col-12 col-md-5 form-area mobile-hide" >
                <q-scroll-area
                        :thumb-style="thumbStyle"
                        :content-style="contentStyle"
                        :content-active-style="contentActiveStyle"
                        style="height: 100%; padding-right: 20px"
                        v-if="!thanks"
                >

                    <div class="cart-h1" >Оформление заказа</div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Имя</div >
                        <q-input
                                :value="order.name"
                                @input="setName"
                                bg-color="white"
                                outlined v-model="text" dense />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Телефон</div >
                        <q-input
                                :value="order.phone"
                                @input="setPhone"
                                mask="+7 (###) ###-##-##"
                                bg-color="white"
                                outlined dense />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Укажите тип оплаты</div >
                        <q-radio :value="order.payment"
                                 @input="setPayment"
                                 val="1"
                                 label="Наличные"
                                 color="yellow-14" />
                        <q-radio :value="order.payment"
                                 @input="setPayment"
                                 val="2"
                                 label="Карта"
                                 color="yellow-14" />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Адрес</div >
                        <q-input
                                :value="order.address"
                                @input="setAddress"
                                bg-color="white"
                                outlined dense />
                    </div >

                    <div class="pho-pb-2" >
                        <div class="name-field" >Квартира</div >
                        <q-input
                                :value="order.apartment"
                                @input="setApartment"
                                bg-color="white"
                                outlined dense />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Кол-во персон</div >
                        <q-input
                                :value="order.forks"
                                @input="setForks"
                                bg-color="white"
                                outlined dense />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Время доставки</div >
                        <div class="row items-center" >
                            <div class="col-5" >
                                <q-input
                                        :value="order.time"
                                        @input="setTime"
                                        mask="##:##"
                                        bg-color="white"
                                        outlined dense />
                            </div >
                            <div class="col-grow" >
                                <q-checkbox
                                        :value="order.early"
                                        @input="setEarly"
                                        color="yellow-14"
                                        size="xs" label="Как можно скорее" />
                            </div >
                            <div class="pho-caption" >
                                Доставка в среднем занимает 1,5 часа.<br>
                                Режим работы доставки: с 12:00 о 22:00
                            </div >
                            <div >
                            </div >
                        </div >
                    </div >
                    <div >
                        <div class="name-field" >Комментарий</div >
                        <q-input type="textarea"
                                 class="comment-input"
                                 :value="order.comment"
                                 @input="setComment"
                                 outlined bg-color="white"
                        />
                    </div >
                    <q-banner inline-actions class="text-white bg-red q-my-md" v-if="error" >
                        При отправке заказа произошла ошибка.
                        Попробуйте ещё раз. Если ошибка повториться сообщите пожалуйста нам об этом.
                        <template v-slot:action >
                            <q-btn flat color="white" @click="error = !error" label="ОК" />
                        </template >
                    </q-banner >
                    <q-btn flat style="background: #FCD000; color:#fff" class="full-width q-my-md"
                           @click="sendOrder"
                    >
                        <q-spinner
                                v-if="loading"
                                color="white"
                                size="1em"
                                class="q-mr-md"
                                :thickness="2"
                        />
                        <div class="bold" >
                            Оформить заказ
                        </div >
                        <q-spinner
                                v-if="loading"
                                color="white"
                                size="1em"
                                class="q-ml-md"
                                :thickness="2"
                        />
                    </q-btn >
                </q-scroll-area >
                <div v-else >
                    <h6 class="bold" >Спасибо за заказ!</h6 >
                    <div >
                        В ближайшее время с вами свяжется наш менеджер.
                    </div >
                </div >
            </div >

            <div class="col-12 col-md-7 cart-area mobile-hide" >
                <div class="cart-h1" >
                    Корзина
                </div >
                <q-scroll-area
                        :thumb-style="thumbStyle"
                        :content-style="contentStyle"
                        :content-active-style="contentActiveStyle"
                        style="height: 80%; padding-right: 20px"
                >
                    <div class="column" >

                        <q-separator />
                        <div :key="product.id" v-for="product in orderProducts" >
                            <BasketItem
                                    :addToBasket="addProductToBasket"
                                    :removeFromBasket="removeProductToBasket"
                                    :removeOneProduct="removeOneProduct"

                                    :product="product"
                            ></BasketItem >
                            <q-separator />
                        </div >

                    </div >
                </q-scroll-area >
                <div class="row justify-between items-center" >
                    <div>
                        <q-input
                                :value="order.promocode"
                                @input="setPromoCode"
                                label="Прмокод"
                                bg-color="white"
                                outlined dense />
                    </div>
                    <div >
                        <div class="total text-right" >
                            Сумма заказа: <span class="total-sum" >{{totalSum}} ₽</span >
                        </div >
                        <div class="pho-caption" v-if="totalSum < 800">
                            Минимальная сумма заказа 800 ₽
                        </div >
                    </div >
                </div >
            </div >
        </div >
        <div class="container" >
            <div class="row items-center justify-md-start justify-between" >
                <div class="pho-h1" >
                    Доставка
                </div >
                <div >
                    <q-btn flat style="background: #FCD000; color: #4F4F4F"
                           @click="showMap = !showMap"
                           class="q-ml-lg q-px-sm mobile-hide" >
                        <img src="/icons/location-baloon.svg" alt="" class="q-mr-sm" >
                        <div >
                            Зона доставки
                        </div >
                    </q-btn >
                    <q-btn flat style="background: #FFFFFF; color: #4F4F4F"
                           @click="showMap = !showMap"
                           class="q-ml-lg q-px-sm zone-btm-m desktop-hide" >
                        <img src="/icons/location-baloon.svg" alt="" class="q-mr-sm ballun-m" >
                        <div >
                            Зона<br >
                            доставки
                        </div >
                    </q-btn >
                </div >
            </div >
            <div class="row q-pb-lg" >
                <template v-for="category in categoriesMenu" >
                    <q-btn v-if="activeCategory !== null &&  category.id === activeCategory"
                           @click="chooseCategory(category)"
                           class="pho-btn"
                           flat :key="category.id" >
                        <div >
                            {{category.Name}}
                        </div >
                    </q-btn >
                    <q-btn v-else
                           flat
                           class="pho-btn-outline"
                           @click="chooseCategory(category)"
                           :key="category.id" >
                        <div >
                            {{category.Name}}
                        </div >
                    </q-btn >
                </template >
            </div >
            <div class="row q-col-gutter-md items-stretch content-stretch" >
                <ProductItem :key="product.name" :product="product"
                             v-for="product in activeCategoryProducts" >
                </ProductItem >
            </div >
        </div >
        <q-dialog :full-width="true" v-model="showMobileCart" >
            <q-card style="width: 100%; height: 95%" >
                <div class="col-12 cart-area" >
                    <div class="row justify-between " >
                        <div class="cart-h1 q-py-md" >
                            Корзина
                        </div >
                        <q-btn class="" color="grey-5" size="md"
                               @click="showMobileCart = !showMobileCart"
                               flat icon="close" ></q-btn >
                    </div >
                    <div class="column" >
                        <q-separator />
                        <div :key="product.id" v-for="product in orderProducts" >
                            <BasketItem
                                    :addToBasket="addProductToBasket"
                                    :removeFromBasket="removeProductToBasket"
                                    :removeOneProduct="removeOneProduct"

                                    :product="product"
                            ></BasketItem >
                            <q-separator />
                        </div >
                    </div >
                    <div class="row justify-end" >
                        <div class="total" >
                            Сумма заказа: <span class="total-sum" >{{totalSum}} ₽</span >
                        </div >
                        <div class="pho-caption" v-if="totalSum < 800">
                            Минимальная сумма заказа 800 ₽
                        </div >
                    </div >
                </div >
                <div class="col-12 form-area" v-if="!thanks" >
                    <div class="cart-h1" >Оформление заказа</div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Имя</div >
                        <q-input
                                :value="order.name"
                                @input="setName"
                                bg-color="white"
                                outlined v-model="text" dense />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Телефон</div >
                        <q-input
                                :value="order.phone"
                                @input="setPhone"
                                mask="+7 (###) ###-##-##"
                                bg-color="white"
                                outlined dense />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Укажите тип оплаты</div >
                        <q-radio :value="order.payment"
                                 @input="setPayment"
                                 val="1"
                                 label="Наличные"
                                 color="yellow-14" />
                        <q-radio :value="order.payment"
                                 @input="setPayment"
                                 val="2"
                                 label="Карта"
                                 color="yellow-14" />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Адрес</div >
                        <q-input
                                :value="order.address"
                                @input="setAddress"
                                bg-color="white"
                                outlined dense />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Квартира</div >
                        <q-input
                                :value="order.apartment"
                                @input="setApartment"
                                bg-color="white"
                                outlined dense />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Кол-во персон</div >
                        <q-input
                                :value="order.forks"
                                @input="setForks"
                                bg-color="white"
                                outlined dense />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Время доставки</div >
                        <div class="row items-center" >
                            <div class="col-5" >
                                <q-input
                                        :value="order.time"
                                        @input="setTime"
                                        mask="##:##"
                                        bg-color="white"
                                        outlined dense />
                            </div >
                            <div class="col-grow" >
                                <q-checkbox
                                        :value="order.early"
                                        @input="setEarly"
                                        color="yellow-14"
                                        size="xs" label="Как можно скорее" />
                            </div >
                            <div class="pho-caption" >
                                Доставка в среднем занимает 1,5 часа
                                <br>
                                Режим работы доставки: с 12:00 о 22:00
                            </div >
                            <div >
                            </div >
                        </div >
                    </div >
                    <div class="pho-pb-2">
                        <q-input
                                :value="order.promocode"
                                @input="setPromoCode"
                                label="Прмокод"
                                bg-color="white"
                                outlined dense />
                    </div>
                    <div >
                        <div class="name-field" >Комментарий</div >
                        <q-input type="textarea"
                                 class="comment-input"
                                 :value="order.comment"
                                 @input="setComment"
                                 outlined bg-color="white"
                        />
                    </div >
                    <q-banner inline-actions class="text-white bg-red q-my-md" v-if="error" >
                        При отправке заказа произошла ошибка.
                        Попробуйте ещё раз. Если ошибка повториться сообщите пожалуйста нам об этом.
                        <template v-slot:action >
                            <q-btn flat color="white" @click="error = !error" label="ОК" />
                        </template >
                    </q-banner >
                    <q-btn flat style="background: #FCD000; color:#fff" class="full-width q-my-md"
                           @click="sendOrder"
                    >
                        <q-spinner
                                color="white"
                                size="1em"
                                :thickness="2"
                                class="q-mx-md"
                                v-if="loading"
                        />

                        <div class="bold" >
                            Оформить заказ
                        </div >
                        <q-spinner
                                v-if="loading"
                                color="white"
                                size="1em"
                                class="q-mx-md"
                                :thickness="2"
                        />

                    </q-btn >
                </div >
                <div v-else class="form-area" >
                    <h6 class="bold" >Спасибо за заказ!</h6 >
                    <div >
                        Дайте нам пару минут и наш менеджер свяжется с вами.
                    </div >
                    <div >
                        Но если этого не произойдет, звоните по телефону 596-001.
                    </div >
                </div >
            </q-card >
        </q-dialog >
        <q-dialog v-model="showMap" >
            <q-card style="min-width: 80%" >
                <q-card-section >
                    <div class="text-h6" >Зона доставки</div >
                </q-card-section >

                <q-card-section class="q-pt-none" >
                    <yandex-map :controls="controls"
                                :coords="centerMap"
                                style="width: 100%; height: 600px;"
                                v-if="isMounted"
                                zoom="12"
                                :settings="settings"
                    >
                        <ymap-marker :balloon="{
                                        body: item.properties.description
                                     }"
                                     :coords="getPriceZoneCoords(item)"
                                     :key="index"
                                     :marker-fill="{
                                        color: item.properties.fill,
                                        opacity: item.properties['fill-opacity']
                                     }"
                                     :marker-stroke="{
                                        color: item.properties.stroke,
                                        width: item.properties['stroke-width'],
                                        opacity: item.properties['stroke-opacity'],
                                    }"
                                     :markerId="'m' + index"
                                     marker-type="Polygon"
                                     v-for="(item, index) in dsZonesPriced.features"
                        ></ymap-marker >
                        <ymap-marker
                                v-if="coords.length !== 0"
                                :coords="[coords[0], coords[1]]"
                                markerId="42m"
                                marker-type="Placemark"
                        ></ymap-marker >
                        <ymap-marker
                                :coords="[ourDepartment[0], ourDepartment[1]]"
                                markerId="ourMap"
                                hint-content="Pho Me"
                                marker-type="Placemark"
                                :properties="departmentProperty"
                        ></ymap-marker >

                    </yandex-map >
                </q-card-section >

                <q-card-actions align="right" >
                    <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions >
            </q-card >
        </q-dialog >
    </q-page >
</template >

<script >
import { dom } from 'quasar';

const { height } = dom;
import { loadYmap } from 'vue-yandex-maps';
import { mapState, mapMutations, mapGetters } from 'vuex';
import ProductItem from '../components/ProductItem';
import BasketItem from '../components/BasketItem';

export default {
  name: 'OrderPage',
  components: {
    ProductItem,
    BasketItem,
  },
  meta: {
    title: 'Pho me. Доставка из азиатскиого ресторана в Иркутске',
  },
  data() {
    return {
      API_LINK: process.env.API_LINK,
      categories: [],
      products: [],
      activeCategoryProducts: [],
      activeCategory: null,
      showCart: false,
      contentStyle: {
        color: '#555',
      },
      showMap: false,
      showMobileCart: false,
      contentActiveStyle: {
        color: 'black',
      },

      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#F8C200',
        width: '5px',
        opacity: 0.75,
      },
      height: height - 1,
      isMounted: false,
      dsZonesPriced:
          {
            type: 'FeatureCollection',
            metadata: {
              name: 'Зона доставки',
              creator: 'Yandex Map Constructor',
              description: 'На данный момент мы доставляем в пределах желтой границы',
            },
            features: [{
              type: 'Feature',
              id: 0,
              geometry: {
                type: 'Polygon',
                coordinates: [[[104.2812635272918, 52.26171158449481],
                  [104.28356519180292, 52.26067225516424],
                  [104.28773714770827, 52.259371067836994],
                  [104.29252371980843, 52.259491566726524],
                  [104.29888524277618, 52.25815790045579],
                  [104.30847830656035, 52.25556063758044],
                  [104.31651949317501, 52.2523570289957],
                  [104.32496837555982, 52.24991705251826],
                  [104.3309539295229, 52.24892185140377],
                  [104.3358236845358, 52.24919098351705],
                  [104.34101416807238, 52.25115158231291],
                  [104.3437294562534, 52.249554346186734],
                  [104.34485687669765, 52.248167780577226],
                  [104.34505178106262, 52.246342843232135],
                  [104.34588278652707, 52.24480560514018],
                  [104.34816411912072, 52.24360818788533],
                  [104.35301355301964, 52.244569722356395],
                  [104.35844234406581, 52.245149267265504],
                  [104.3600302118026, 52.24609759706977],
                  [104.36234764039146, 52.24570246212695],
                  [104.36530879914392, 52.24630833425986],
                  [104.36711124360197, 52.24860003624705],
                  [104.37650970399017, 52.246703463780094],
                  [104.38044615174346, 52.24819601019439],
                  [104.3836959539889, 52.25082111457811],
                  [104.38533850098658, 52.25289762106479],
                  [104.38612274109953, 52.25494769293895],
                  [104.35337833344579, 52.26118910407898],
                  [104.3467693704331, 52.2663237803969],
                  [104.34668353974462, 52.26771925580693],
                  [104.34891513764502, 52.26919367242849],
                  [104.34998802125097, 52.27035210805849],
                  [104.35024551331638, 52.27332704198503],
                  [104.3541937249863, 52.27322173801513],
                  [104.3541937249863, 52.27390620932522],
                  [104.35663989960793, 52.273853558063124],
                  [104.35613564431308, 52.279276307879805],
                  [104.3572943586075, 52.279414500314374],
                  [104.35721389233706, 52.28056937729784],
                  [104.35691884934545, 52.281224123177566],
                  [104.35758403718118, 52.28238224283415],
                  [104.3576108592713, 52.28439571935907],
                  [104.35750893532875, 52.286409103930936],
                  [104.35733920533693, 52.287055765249946],
                  [104.35692857235311, 52.28789050311774],
                  [104.35494273185374, 52.28781915859359],
                  [104.35268766462447, 52.288123862642394],
                  [104.34967956721427, 52.288864848044895],
                  [104.34683910786754, 52.28847832003281],
                  [104.34459141671306, 52.28807369558907],
                  [104.34241346299297, 52.28715916486967],
                  [104.34024623810892, 52.286803874437275],
                  [104.33767131745458, 52.288093433453525],
                  [104.33539680420985, 52.28810659202437],
                  [104.33301500260461, 52.287678936455],
                  [104.33107308327777, 52.28709666027894],
                  [104.32909361302481, 52.287476621028425],
                  [104.32763180911168, 52.28741658415815],
                  [104.32587093889342, 52.286794416434894],
                  [104.32381033181773, 52.28577273465718],
                  [104.32168568700179, 52.28584089548876],
                  [104.32004400744661, 52.28616447808946],
                  [104.31834340311217, 52.28633942759728],
                  [104.3172356088795, 52.28641374301875],
                  [104.3158703225814, 52.286974940558665],
                  [104.31474082833887, 52.287759675940706],
                  [104.31425506425991, 52.28893914873763],
                  [104.3139025924474, 52.28979395217563],
                  [104.3117047608328, 52.290780316943],
                  [104.31014466987808, 52.291373601712905],
                  [104.30957163184078, 52.29189387985435],
                  [104.30895567845923, 52.2923088934639],
                  [104.30640603424452, 52.293436620628924],
                  [104.3037529204366, 52.294496582485834],
                  [104.30153659760592, 52.29520067308848],
                  [104.29760575517777, 52.29597161975357],
                  [104.2948336270441, 52.29721616606262],
                  [104.29234453707842, 52.298926393323306],
                  [104.2869372037044, 52.29455860431649],
                  [104.27998415842451, 52.29295044943755],
                  [104.27620722837494, 52.29180425722366],
                  [104.27105700730979, 52.29128960543344],
                  [104.26698782818845, 52.289106979883506],
                  [104.26589393389197, 52.28719821941447],
                  [104.266516653365, 52.285026187306045],
                  [104.27015554616561, 52.282615467596834],
                  [104.272614266999, 52.280112489479045],
                  [104.2748801065933, 52.27895266504153],
                  [104.27561605945611, 52.27724742094875],
                  [104.27568362847794, 52.27583538286637],
                  [104.27431353346783, 52.27456808851974],
                  [104.27392675633553, 52.27310043307234],
                  [104.27321849374577, 52.27184432919076],
                  [104.27414101423717, 52.27058818953614],
                  [104.2758191496616, 52.26947854915531],
                  [104.27586650200503, 52.26684177703718],
                  [104.27793531252688, 52.265622852475815],
                  [104.27975594552593, 52.262589786268954],
                  [104.2812635272918, 52.26171158449481]]],
              },
              properties: {
                description: 'Сумма заказа от 800 руб.',
                fill: '#ffd21e',
                'fill-opacity': 0.6,
                stroke: '#ffd21e',
                'stroke-width': '5',
                'stroke-opacity': 0.9,
              },
            }, {
              type: 'Feature',
              id: 1,
              geometry: {
                type: 'Point',
                coordinates: [104.29042273754133, 52.27333480057664],
              },
              properties: {
                description: 'Наш ресторан',
                iconCaption: 'Фо Ми',
                'marker-color': '#f371d1',
              },
            }],
          },
      coords: [],
      centerMap: [52.286191, 104.297709],
      ourDepartment: [52.27333480057664, 104.29042273754133],
      loading: false,
      thanks: false,
      error: false,
      departmentProperty: {
        description: 'Наш ресторан',
        iconCaption: 'Фо Ми',
        'marker-color': '#f371d1',
      },
    };
  },
  computed: {
    ...mapState('order', ['order', 'orderProducts', 'orderMenu', 'categoriesMenu']),
    ...mapGetters('order', ['totalSum', 'orderProductsNum']),

  },
  methods: {
    ...mapMutations('order', ['addProductToBasket',
      'removeProductToBasket',
      'setPromoCode',
      'removeOneProduct',
      'setPhone',
      'setAddress',
      'setApartment',
      'setTime',
      'setEarly',
      'setComment',
      'setPayment',
      'setCostume',
      'setName',
      'setForks',
      'setBusinessLunch',
    ]),
    chooseCategory(category) {
      this.activeCategory = category.id;
      this.activeCategoryProducts = [...category.products];
    },
    sendOrder() {
      this.loading = true;
      this.$axios.post('https://repairs.rest38.ru/api/phome',
        {
          order: this.order,
          products: this.orderProducts,
        })
        .then(() => {
          this.thanks = true;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
        });
    },
    getPriceZoneCoords(item) {
      const result = item.geometry.coordinates[0];

      return [result];
    },
  },
  async mounted() {
    this.$store.dispatch('order/getOrderMenu')
      .then(() => {
        if (this.categoriesMenu[0] !== undefined) {
          this.chooseCategory(this.categoriesMenu[0]);
        }
      });
    this.isMounted = true;
    await loadYmap();
    // eslint-disable-next-line
      this.ymapsObj = ymaps;

    this.dsZonesPriced.features[0].geometry.coordinates[0].forEach((item, idex) => {
      const temp0 = item[0];
      const temp1 = item[1];
      this.dsZonesPriced.features[0].geometry.coordinates[0][idex][0] = temp1;
      this.dsZonesPriced.features[0].geometry.coordinates[0][idex][1] = temp0;
    });
  },
};
</script >

<style scoped >
    @font-face {
        font-family: lb;
        src: url(../font/TTLakes-Black.ttf);
    }

    .logo {
        padding: 40px 0 0px 40px;
    }

    @media (min-width: 500px) {
        .pho-h1 {
            font-family: 'lb';
            color: #fff;
            font-style: italic;
            font-weight: 900;
            text-transform: uppercase;
            font-size: 90px;
            line-height: 145px;
        }

        .pho-btn {
            font-family: lcb;
            margin: 10px 10px 10px 0px;
            border-radius: 10px;
            background: #FCD000;
            border: 2px solid #FCD000;
            color: #4F4F4F;
            font-size: 22px;
        }

        .pho-btn-outline {
            margin: 10px 10px 10px 0px;
            border-radius: 10px;
            border: 2px solid #FFFFFF;
            color: #fff;
            font-family: lcb;
            font-size: 22px;
        }

        .pho-btn-outline:hover {
            margin: 10px 10px 10px 0px;
            border-radius: 10px;
            background: #FCD000;
            border: 2px solid #FCD000;
            color: #4F4F4F;
        }

        .pho-btn-outline:hover > div {
            color: #4F4F4F;
        }
    }

    @media (max-width: 499px) {
        .container {
            padding-top: 48px;
        }

        .pho-h1 {
            font-family: 'lb';
            color: #fff;
            font-style: italic;
            font-weight: 900;
            font-size: 36px;
        }

        .pho-btn {
            font-family: lcb;
            margin: 10px 10px 0px 0px;
            border-radius: 10px;
            background: #FCD000;
            border: 2px solid #FCD000;
            color: #4F4F4F;
            font-size: 14px;
        }

        .pho-btn-outline {
            margin: 10px 10px 0px 0px;
            border-radius: 10px;
            border: 2px solid #FFFFFF;
            color: #fff;
            font-family: lcb;
            font-size: 14px;
        }

        .pho-btn-outline:hover {
            margin: 10px 10px 10px 0px;
            border-radius: 10px;
            background: #FCD000;
            border: 2px solid #FCD000;
            color: #4F4F4F;
        }

        .pho-btn-outline:hover > div {
            color: #4F4F4F;
        }
    }

    .main-container {
        background: #02BBBD;
        padding-bottom: 100px;
    }

    .container {
    }

    .product-area {
        display: flex;
        flex-direction: row;
    }

    .cart-widget {
        position: fixed;
        width: 95px;
        height: 95px;
        right: 0;
        top: 0;
        background: #CA17A8;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .cart-widget-m {
        position: fixed;
        width: 48px;
        height: 48px;
        right: 0;
        top: 0;
        background: #CA17A8;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .cart-product-num-m {
        position: absolute;
        font-family: lcb;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 4px;
        color: #fff;
        font-size: 9px;
    }

    .cart-product-num {
        position: absolute;
        top: 39%;
        right: 45%;
        font-family: lcb;
        color: #fff;
        font-size: 12px;
    }

    .yelow-line {
        position: fixed;
        width: 95px;
        height: 100%;
        right: 0;
        top: 0;
        background: #F8C200;
        z-index: 100;
    }

    .shadow-cart {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.4;
        z-index: 99;
    }

    @media (min-width: 1000px) {
        .cart {
            z-index: 100;
            position: fixed;
            right: 95px;
            top: 0;
            width: 50%;
            min-width: 900px;
            max-width: 100%;
            height: 100%;
            background: #fff;
        }

        .cart-area {
            padding: 32px;
        }

        .form-area {
            padding: 32px 16px 32px 53px;
            background: #FAFAFA;

        }

    }

    @media (max-width: 999px) {
        .cart {
            position: fixed;
            z-index: 100;
            padding-top: 48px;
            top: 48px;
            width: 100%;
            max-width: 100%;
            background: #fff;
        }

        .form-area {
            padding: 32px 15px 32px 15px;
            background: #FAFAFA;

        }

        .cart-area {
            padding: 10px;
        }

    }

    .cart-h1 {
        font-family: 'lb';
        font-style: italic;
        font-size: 24px;
        line-height: 32px;
    }

    .total {
        font-size: 16px;
        line-height: 22px;
        color: #828282;
    }

    .total-sum {
        font-size: 24px;
        line-height: 32px;
        font-family: lcb;
        padding-left: 20px;
        color: #333333;
    }

    .name-field {
        color: #4F4F4F;
        padding-bottom: 2px;
        font-weight: 500;
    }

    .comment-input {
        height: 77px;

        background: #FFFFFF;
        box-sizing: border-box;
        resize: none;
    }

    .pho-caption {
        font-size: 12px;
        line-height: 16px;

        /* Gray 4 */
        color: #BDBDBD;
    }

    .pho-pb-2 {
        padding-bottom: 13px;
    }

    .ballun-m {
        width: 15px;
    }

    .zone-btm-m {
        text-transform: none;
        font-size: 12px;
        line-height: 12px;
        border-radius: 10px;
    }

    .header-mobile {
        z-index: 100;
        width: 100%;
        height: 48px;
        position: fixed;
        background: #F8C200;
    }

    .logo-m {
        width: 100%;
    }
</style >
