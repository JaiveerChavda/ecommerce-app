import axiosClient from "@/axios";
import { defineStore } from "pinia";
import { PRODUCT_PER_PAGE } from "@/constant";


export const useProduct = defineStore('products',{
    state(){
        return {
            loading: true,
            perPage: PRODUCT_PER_PAGE,
            search: '',
            products : {
                data:[],
                links:{},
                meta:{},
            }
        }
    },

    actions: {
        async fill(){
            let res = await axiosClient.get('/products',{
                params:{search:this.$state.search,per_page:this.$state.perPage}
            });
            this.products = res.data;
            if(this.products.data.length > 0){
                this.loading = false;
            }
        }
    }
})
