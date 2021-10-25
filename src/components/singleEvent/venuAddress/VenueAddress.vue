<template>
<div>
    <p>{{venueName ? venueName.name :''}}</p>
    <p>{{venueName ? venueName.address.city :''}}</p>
</div>
</template>

<script>
import {
    watchEffect,
    ref,
    ErrorCodes,
    computed
} from "vue"
import {
    useStore
} from "vuex";
import {
    BAM
} from 'bam-ticketing-sdk';

export default {
    name: 'VenuAddress',
    props: {
        venue_id: String,
    },

    setup(props) {
        const store = useStore();
        const venueName = ref();
        const bam = new BAM('https://develop.bam.fan')
        bam.useOrganizer('eventspace')
        // console.log('sdk end point==>', bam)
        watchEffect(async () => {
                if (props.venue_id?props.venue_id:'') {
                    await bam.venue.getVenue({
                        id: props.venue_id
                    }).then((response) => {
                        venueName.value = response
                        store.commit('loadingStatus', false)
                    }).catch(error => {
                        store.commit('loadingStatus', false)
                    });
                }
                })
        

        return {
            venueName,
        }
    },
}
</script>
