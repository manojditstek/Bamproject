<template>
<div @click="backToHome" >
    <i  v-if="message!='Back'" class="fa fa-angle-left" aria-hidden="true"></i>
    {{message}}
</div>
</template>
<script>
import {
    useStore
} from "vuex";
import {
    useRouter
} from "vue-router";
export default ({
name:'BackButton',
props:{
message:String
},
    setup() {
        const store = useStore();
        const router = useRouter();
        function backToHome(){
            if(confirm("Do you really want to back your order will be cancel?")){

               store.commit("backToHome");
               router.push({
                        path: '/'
                    })
            }
            
            
        }

        return{
            backToHome
        }
        
    },
})
</script>

