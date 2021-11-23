<template>
<a href="javascript:void(0)" @click="backToHome" >
    <i  v-if="message!='back'" class="fa fa-angle-left" aria-hidden="true"></i>
    {{ $t(`common.${message}`) }}
</a>
</template>
<script>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
export default ({
name:'BackButton',
props:{
message:String
},
    setup() {
        const store = useStore();
        const router = useRouter();
        function backToHome(){
            if(confirm("Do you want to cancel your current tickets in cart?")){
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

