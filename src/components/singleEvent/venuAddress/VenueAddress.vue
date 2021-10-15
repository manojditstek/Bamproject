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
import {
    BAM
} from 'bam-ticketing-sdk';
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
         const bam = new BAM("https://org1.develop.bam.fan")
        const store = useStore();
        const venueName= ref();
        // const venueName = computed(() => {
        //     return store.state.venueAddress;
        // });
         console.log("BAM=>",bam)
        console.log("BAM Object=>",bam.event)
        watchEffect(async()=>{
            // await DataService.venueAddress(props.venue_id).then((response) => {
            // venueName.value = response.data.data;
            // }).catch(error => {
            //     console.log(error);
            // }); 
            // await store.dispatch('getVenue',props.venue_id)

              
    
    // await DataService.venueAddress(venue_id).then((response) => {
    //     commit('setVenue', response.data.data)
    //     commit('loadingStatus', false)
    // await bam.venue.getVenue({ id: props.venue_id }).then((response) => {
    //     // commit('setVenue', response.data.data)
    //     venueName.value = response.data.data;
    //     console.log("setVenue",response)
    //     // commit('loadingStatus', false)
    // }).catch(error => {
    //     console.log(error);
    //     // commit('loadingStatus', false)
    // });
        })
        return {
          venueName,
        }
    },
}
</script>
