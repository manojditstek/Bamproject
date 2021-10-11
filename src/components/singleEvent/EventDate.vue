<template>
<h4>{{ eventDateFormat ? eventDateFormat[0] : "" }}</h4>
        <h2>{{ eventDateFormat ? eventDateFormat[1] : "" }}</h2>
        <h4>
          {{ eventDateFormat ? eventDateFormat[2] : "" }}
          {{ eventDateFormat ? eventDateFormat[3] : "" }}
        </h4>
        <time
          >{{ eventDateFormat ? eventDateFormat[4] : "" }}
          {{ eventDateFormat ? eventDateFormat[5] : "" }}</time>
</template>

<script>
import { ref, watchEffect } from "vue";
import moment from "moment"
export default {
    name:'EventDate',
    props:{
        eventDate:String
    },

    setup(props){
        const eventDateFormat = ref();

      watchEffect(()=>{
        eventDateFormat.value = moment(props.eventDate)
      .format("ddd DD MMM YY HH:mm a")
      .split(" ");
      })
      

        return{
            eventDateFormat

        }
    }

}
</script>

<style>

</style>
