<template>
<div>
    <div v-for="ticket in tcktDetails.data.data.order_item" :key="ticket.id">
        <div v-for="tkt in ticket.ticket" :key="tkt.id">
            <div>Tickets:{{tkt.ticket_config.name}} - {{tkt.ticket_config.face_value}} {{tkt.ticket_config.currency}}</div>
            <button @click="downloadTkt(tkt.id)">Download Ticket</button>
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

export default {
    name: 'DownloadTicket',
    setup() {
        const store = useStore();

        const tcktDetails = computed(() => {
            return store.state.downloadTicket;
        });

        let orderID = computed(() => {
            return store.state.createdOrder;
        })

        async function downloadTkt(tktId) {
            console.log("jdhjhjhkhkj", {
                orderId: orderID.value.id,
                tktId
            })
            await store.dispatch('downloadTicketPdf', {
                orderId: orderID.value.id,
                tktId
            })
        }
        return {
            tcktDetails,
            downloadTkt,

        }
    }

}
</script>
