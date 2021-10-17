<template>
    <div>
        <p>{{venueName ? venueName.name :''}}</p>
        <p>{{venueName ? venueName.address.city :''}}</p>
    </div>  
</template>
<script>
import {
    ref,
    watchEffect,
    computed
} from "vue"
import DataService from "../../../services/DataService"
import {
    useStore
} from "vuex";
export default {
    name: 'VenuAddress',
    props: {
        venue_id: String,
    },

     setup(props) {
        const store = useStore();
        const venueName= ref();
        // const venueName = computed(() => {
        //     return store.state.venueAddress;
        // });
        watchEffect(async()=>{
            await DataService.venueAddress(props.venue_id).then((response) => {
            venueName.value = response.data.data;
            console.log("venueAdress", response.data.data)
            }).catch(error => {
                console.log(error);
            }); 
            // await store.dispatch('getVenue',props.venue_id)
        })
        return {
          venueName,
        }
    },
}
</script>
