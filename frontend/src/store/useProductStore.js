import axiosClient from "@/axios";
import { defineStore } from "pinia";
import { PRODUCT_PER_PAGE } from "@/constant";


export const useProduct = defineStore('products',{
    state(){
        return {
            closeModal: false,
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
        async fill(url = null){
            const requestUrl = url ?? '/products'; // Use the passed URL or default to '/products'
            let res = await axiosClient.get(requestUrl,{
                params:{search:this.$state.search,per_page:this.$state.perPage}
            });
            this.products = res.data;
            if(this.products.data.length > 0){
                this.loading = false;
            }
        },

        async storeProduct(data){
            this.closeModal = false;
            let result = await axiosClient.post('products',data,{
                headers: {
                    'Content-Type': "multipart/form-data; charset=utf-8; boundary="
                  }
            });
            if(result.status == 201){
                this.fill();
                this.closeModal = true;
            }
        }
    }
})
