<script setup>
import Spinner from '@/components/core/Spinner.vue';
import { onMounted, ref ,reactive, watch } from 'vue';
import { useProduct } from '@/store/useProductStore';
import Modal from '@/components/core/Modal.vue';
import CustomInput from '@/components/core/CustomInput.vue';

const prod = useProduct();

const getForPage = function getForPage(e, link) {
    e.preventDefault();
    if (!link.url || link.active) {
        return
    }

    prod.fill(link.url);
}

onMounted(() => {
    prod.fill();
})

const showModal = ref(false);

const newProduct = reactive({
    title: null,
    price: null,
    description:null,
    image: null,
    imageName: null
});


watch(prod.closeModal,async (closeM) => {
    if (closeM) {
        showModal.value = false;
    }else{
        showModal.value = true;
    }
})

const addProduct = async () => {
    prod.storeProduct(newProduct)
}

const handleImg = function(e){
    newProduct.image = e.target.files[0];
    newProduct.imageName = newProduct.image.name;
}

</script>
<template>
    <div class="flex items-center justify-between mb-3">
        <h1 class="text-3xl font-semibold">Products</h1>
        <button  @click="showModal = true"
            class="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add new Product
        </button>
    </div>
    <div class="bg-white p-4 rounded-lg shadow">
        {{ prod.search }}

        <div class="flex justify-between border-b-2 pb-3">
            <div class="flex items-center">
                <span class="whitespace-nowrap mr-3">Per Page</span>
                <select @change="prod.fill()" v-model="prod.perPage"
                    class="appearance-none relative block w-24 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div>
                <input v-model="prod.search" @change="prod.fill()"
                    class="appearance-none relative block w-48 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Type to Search products">
            </div>
        </div>
        <Spinner v-if="prod.loading" />
        <template v-else>
            <table class="table-auto w-full">
                <thead>
                    <tr>
                        <th class="border-b-2 p-2 text-left">ID</th>
                        <th class="border-b-2 p-2 text-left">Image</th>
                        <th class="border-b-2 p-2 text-left">Title</th>
                        <th class="border-b-2 p-2 text-left">Price</th>
                        <th class="border-b-2 p-2 text-left">Last Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product of prod.products.data" :key="product.id">
                        <td class="border-b p-2 ">{{ product.id }}</td>
                        <td class="border-b p-2 ">
                            <img class="w-16" :src="product.image" :alt="product.title">
                        </td>
                        <td class="border-b p-2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">{{
                            product.title
                            }}
                        </td>
                        <td class="border-b p-2">
                            {{ product.price }}
                        </td>
                        <td class="border-b p-2 ">
                            {{ product.updated_at }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>

        <div class="flex justify-between items-center mt-5">
            <span>
                Showing from {{ prod.products.meta.from }} to {{ prod.products.meta.to }}
            </span>
            <nav v-if="prod.products.meta.total > prod.products.meta.per_page"
                class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
                aria-label="Pagination">
                <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
                <a v-for="(link, i) of prod.products.meta.links" :key="i" :disabled="!link.url" href="#"
                    @click="getForPage($event, link)" aria-current="page"
                    class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
                    :class="[
                        link.active
                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                        i === 0 ? 'rounded-l-md' : '',
                        i === prod.products.meta.links.length - 1 ? 'rounded-r-md' : '',
                        !link.url ? ' bg-gray-100 text-gray-700' : ''
                    ]" v-html="link.label">
                </a>
            </nav>
        </div>

    </div>

    <Teleport to="body">
        <Transition enterFromClass="opacity-0 scale-125" enterToClass="opacity-100 scale-100"
            enterActiveClass="transition duration-300" leaveActiveClass="transition duration-150"
            leaveFromClass="opacity-125 scale-100" leaveToClass="opacity-0 scale-125">
            <Modal :show="showModal" @close="showModal = false">
                <template #default>
                    <h1 class="text-3xl font-semibold">Create new Product</h1>
                    <form action="" class="px-1 py-4" @submit.prevent="addProduct">
                        <div class="flex justify-between" style="gap: 2rem;">
                            <div class="mt-2 flex-1">
                               <CustomInput type="text" v-model="newProduct.title" required=true label="Title" name="title"></CustomInput>
                            </div>
                            <div class="mt-2 flex-1">
                                <CustomInput type="text" v-model="newProduct.price" required=true label="Price" name="price"></CustomInput>
                            </div>
                            <div>
                                <CustomInput type="file" @change="handleImg" required=true label="Upload Image" ref="image" name="image"></CustomInput>
                            </div>
                            <div class="mt-2 flex-1">
                                <CustomInput type="textarea" v-model="newProduct.description" label="Description" name="price"></CustomInput>
                            </div>
                        </div>

                        <!-- <input type="text" name="title"> -->
                        <hr>
                        <div class="mt-4">
                            <button type="submit" class="py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">Save</button>
                            <Spinner v-if="prod.loading"></Spinner>
                        </div>
                    </form>
                </template>
            </Modal>
        </Transition>
    </Teleport>

</template>
