<template>
        <p>{{venueName ? venueName.name :''}}</p>
        <p>{{venueName ? venueName.address.city :''}}</p>
</template>

<script>
import {watchEffect,ref} from "vue"
import {useStore} from "vuex";
import bam from '../../../services/bamSdk'
export default {
    name: 'VenuAddress',
    props: {
        venue_id: String,
    },

    setup(props) {
        const store = useStore();
        const venueName = ref();
        
        watchEffect(async () => {
            store.commit('loadingStatus', true)
                if (props.venue_id?props.venue_id:'') {
                    store.commit('loadingStatus', true)
                    try{
                    let response = await bam.venue.getVenue({
                        id: props.venue_id
                    })
                        venueName.value = response
                        store.commit('loadingStatus', false)
                    }
                    catch(error) {
                        store.commit('loadingStatus', false)
                        store.commit('errorMsg', error);
                    }
                }

                })
        

        return {
            venueName,
        }
    },
}
</script>
