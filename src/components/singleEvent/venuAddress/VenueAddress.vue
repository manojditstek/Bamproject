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
} from "vue"
import DataService from "../../../services/DataService"
export default {
    name: 'VenuAddress',
    props: {
        venue_id: String,
    },

     setup(props) {
        const venueName= ref();
        watchEffect(async()=>{
            // await DataService.venueAddress(props.venue_id).then((response) => {
            // venueName.value = response.data.data;
            // }).catch(error => {
            //     console.log(error);
            // }); 
        })
        return {
          venueName,
        }
    },
}
</script>
