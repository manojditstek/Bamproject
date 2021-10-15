<template>
    <div>
        <div v-for="ticket in tcktDetails.data.data.order_item" :key="ticket.id">
            <div v-for="tkt in ticket.ticket" :key="tkt.id">
                <div>Tickets:{{tkt.ticket_config.name}} - {{tkt.ticket_config.face_value}} {{tkt.ticket_config.currency}}</div>
                <div @click="downloadTkt(tkt.id)"></div>
                <!-- <a rel="icon" :href="`https://org1.develop.bam.fan/event/v1/order/845/download_tickets/${tkt.id}`"> Download Ticket </a> -->
            </div>
        </div>
        <div>Total Price : {{tcktDetails.data.data.total}}</div>
    </div>
</template>

<script>
import {
    computed
} from 'vue'
import {
    useStore
} from 'vuex';
import axios from 'axios';
export default {
    name:'DownloadTicket',

    setup(){
        const store = useStore();

        const tcktDetails = computed(() => {
            return store.state.downloadTicket;
        });

        let orderID = computed(() => {
            return store.state.createdOrder;
        })

         let downloadTkts = computed(() => {
            return  store.state.downloadTicketPdf;
        })

        var sampleBytes = new Int8Array(4096);

var saveByteArray = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, name) {
        var blob = new Blob(data, {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

saveByteArray([downloadTkts], 'example.pdf');

       async function downloadTkt(tktId) {
            console.log("jdhjhjhkhkj",{orderId:orderID.value.id,tktId})
           store.dispatch('downloadTicketPdf',{orderId:orderID.value.id,tktId})
            // await axios.get(`https://org1.develop.bam.fan/event/v1/order/${orderID.value.id}/download_tickets/${id}`)
        }



        return{
            tcktDetails,
            downloadTkt,
            downloadTkts
        }
    }
    
}
</script>