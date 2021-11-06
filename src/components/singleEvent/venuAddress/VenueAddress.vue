<template>
<div>
    <span>{{venueName ? venueName.name :''}}</span><br/>
    <span>{{venueName ? venueName.address.city :''}}</span>
</div>
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
                if (props.venue_id?props.venue_id:'') {
                    store.commit('loadingStatus', true)
                    await bam.venue.getVenue({
                        id: props.venue_id
                    }).then((response) => {
                        venueName.value = response
                        store.commit('loadingStatus', false)
                    }).catch(response => {
                        store.commit('loadingStatus', false)
                        store.commit('errorMsg', response);
                    });
                }

                })
        

        return {
            venueName,
        }
    },
}
</script>
