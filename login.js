
//用「具名匯入」的方式，並使用「解構語法」將createApp這個模組拿出來用
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

const url = 'https://vue3-course-api.hexschool.io'; // 站點(申請api的網站)

createApp({
    data() {
        return {
            userData: {
                //在html中用v-model綁定表單的資料，讓username和password能被更新成input的內容
                username: '',
                password: '',
            },
        }
    },

    methods: {

        login() {
            //使用signin api
            const signinApi = `${url}/v2/admin/signin`;

            //signin api屬於post，用this指向login函式外的userData
            axios.post(signinApi, this.userData)

                //成功結果，並把結果中的token、時效取出，最後加入cookie中
                .then((res) => {

                    //展開res.data並存取token、expired
                    const { token, expired } = res.data;

                    //把登入資料存入cookie
                    document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/`;

                    //導向產品頁面
                    window.location = 'product.html';
                })
                //失敗結果（用.dir才能看到錯誤細部內容）
                .catch((error) => {
                    console.dir(error);
                });
        },
    },
}).mount('#app');