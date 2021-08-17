new Vue ({
    el: "#app",
    data: {
        isShowingCart: false,
        products: [
            {
                id: '2062',
                name: 'Miss Dior 淡香水',
                price: 2900,
                thumb: 'https://s5.pimg.tw/album/styleme/element/16810585_1450092930-1717385843/sresize/380x380.jpg',
                amount: 0,
                amountShow: 1,
                showingIcon: false
            }, {
                id: '832',
                name: 'All in one 亮彩膏',
                price: 1350,
                thumb: 'https://s7.pimg.tw/album/styleme/element/89173767_1485853372-1511782940/sresize/380x380.jpg',
                amount: 0,
                amountShow: 1,
                showingIcon: false
            }, {
                id: '16762',
                name: '超放電晶潤雙色唇膏',
                price: 850,
                thumb: 'https://s8.pimg.tw/album/styleme/element/89516838_1486096498-3741399352/sresize/380x380.png',
                amount: 0,
                amountShow: 1,
                showingIcon: false
            }, {
                id: '145',
                name: '奇蹟活源精露',
                price: 2100,
                thumb: 'https://s.pimg.tw/album/styleme/element/62038610_1471836809-2423849843/sresize/380x380.jpg',
                amount: 0,
                amountShow: 1,
                showingIcon: false
            }, {
                id: '103',
                name: '星鑽漾采眼影',
                price: 2600,
                thumb: 'https://s.pimg.tw/album/styleme/element/62032760_1471833970-3752241194/sresize/380x380.jpg',
                amount: 0,
                amountShow: 1,
                showingIcon: false
            }, {
                id: '16717',
                name: '新一代魅力 4G 幻彩蜜粉 雞年限量版',
                price: 2150,
                thumb: 'https://s1.pimg.tw/album/styleme/element/88472691_1485277468-753072152/sresize/380x380.png',
                amount: 0,
                amountShow: 1,
                showingIcon: false
            }
        ]
    },
    methods: {
        // 切換 產品列表 / 購物車 的 tab
        toggleTab (shouldShowCart) {
            this.isShowingCart = shouldShowCart
        },

        // 點擊 - / + 後的動作
        minusOne (product) {
            product.amountShow--
            product.amountShow = (product.amountShow < 1) ? 1 : product.amountShow
        },
        addOne (product) {
            product.amountShow++
            product.amountShow = (product.amountShow > 9) ? 9 : product.amountShow
        },

        // 點擊 add to cart 後的動作
        addToCart (product) {
            product.amount += product.amountShow
            
            product.showingIcon = true
            setTimeout(() => {
                product.showingIcon = false
            }, 800)
        },

        // 在購物車裡移除單一品項 ( 把數量設置成 0 )
        remove (product) {
            product.amount = 0
        },
    },
    computed: {
        // 購物車裡的品項
        productsInCart () {
            return this.products
                // 只顯示購買數量 > 0 的項目
                .filter(p => p.amount)
                // 算出每個產品的小計
                .map(p => {
                    p.sum = p.amount * p.price
                    return p
                })
        },

        // 木前購買的金額
        total () {
            return this.productsInCart
                .reduce((sum, p) => (sum + p.sum), 0)
        }
    },
})
