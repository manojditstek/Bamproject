import http from "./http";
import axios from 'axios';
import moment from "moment"

class DataService {

  //this method used for authorize header
  authHeader() {
    let auth = localStorage.getItem('token'); //this token comes from app.vue component
    // console.log('ttoken=>',auth)
    if (auth) {
      return {
        Authorization: 'Bearer ' + auth
      };
    } else {
      return {}; 
    }
  } //end

  //  events(dateRange) {
  //    if(dateRange){
  //      let startDateFormat='';
  //           let endDateFormat='';
  //           if(dateRange.start!='' && dateRange.end!=''){
  //           startDateFormat = moment(dateRange.start).format('YYYY-MM-DD')
  //            endDateFormat = moment(dateRange.end).format('YYYY-MM-DD')

  //            return http.get(`/event/v1/organizer/` + process.env.VUE_APP_ORGANIZER_ID + `/event?with=[subcategory,sector,ticket_config.[ticket_discount],occurrence.[ticket_config,timeslot],timeslot,ticket_format]&created_at=${startDateFormat};${endDateFormat}`, {
  //             headers: this.authHeader()
  //           });
  //           }
  //    }else{
  //     return http.get(`/event/v1/organizer/` + process.env.VUE_APP_ORGANIZER_ID + `/event?with=[subcategory,sector,ticket_config.[ticket_discount],occurrence.[ticket_config,timeslot],timeslot,ticket_format]&created_at=2021-09-10;2021-12-12`, {
  //       headers: this.authHeader()
  //     });
  //    } 
  // }

//   recurringEvent(id) {
//     return http.get(`/event/v1/organizer/eventspace/event/${id}?with=[subcategory,sector,ticket_config.[ticket_discount],ticket_discount,occurrence.[ticket_config,timeslot],timeslot,ticket_format]`, {
//      headers: this.authHeader()
//    }); 
//  }
//    event(eventID) {
//      if(!eventID!=''){
//       return http.get(`event/v1/event/${eventID}?with=[subcategory,sector,ticket_config.[ticket_discount],occurrence.[ticket_config,timeslot],timeslot.[ticket_config],ticket_format]&public=true`, {
//         headers: this.authHeader()
//       });
//      }else{
//      return http.get(`event/v1/event/${eventID}?with=[subcategory,sector,ticket_config.[ticket_discount],occurrence.[ticket_config,timeslot],timeslot.[ticket_config],ticket_format]&public=true`, {
//       headers: this.authHeader()
//     });
//   }
//   }

//   eventDetails(event_id) {
//     return http.get(`event/v1/event/${event_id}?with=[subcategory,sector,ticket_config.[ticket_discount],occurrence.[ticket_config,timeslot],timeslot.[ticket_config],ticket_format]&public=true`, {
//      headers: this.authHeader()
//    });
//  }

   tickets(event_id) {
     return http.get(`/event/v1/event/${event_id}?pick=[ticket_config]&public=true`, {
      headers: this.authHeader()
    });
  }

   venueAddress(venue_id) {
     return axios.get(`https://develop.bam.fan/venue/v1/venue/${venue_id}?with=address.position`, {
      headers: this.authHeader()
    });
  }


  createOrder(cartItem) {
    return axios.post(`https://org1.develop.bam.fan/event/v1/order`, {
      order_item: cartItem.cartItems,
      format:cartItem.format},{
     headers: this.authHeader()
   });
 }



 getOrderDetails(order_id) {
  return axios.get(`https://org1.develop.bam.fan/event/v1/order/${order_id}?with=[order_item.ticket.[sector,ticket_config,ticket_discount,ticket_holder.address],order_contact]`, {
   headers: this.authHeader()
 });
}



ticketHolder(order_id) {
  return axios.post(`https://org1.develop.bam.fan/event/v1/ticket/${order_id}/ticket_holder`,{first_name:'Branimir',last_name:'Malesevic',phone:'123123123'}, {
   headers: this.authHeader()
 });
}


orderContact(data) {
  return axios.post(`https://org1.develop.bam.fan/event/v1/order/${data.id}/order_contact`,{
    first_name: data.data.first_name,
            last_name: data.data.last_name,
            phone: data.data.phone,
            email: data.data.email,
            billing_email: data.data.billing_email,
  },
  {headers: this.authHeader()
 });
}


paymentInitiate(data) {
  return axios.post(`https://org1.develop.bam.fan/payment/v1/payment?order_id=${data.id}&type=${data.payMethod}`,{},
  {headers: this.authHeader()
 });
}

downloadTicket(data) {
  return axios.get(`https://org1.develop.bam.fan/event/v1/order/${data.id}?with=[order_item.ticket.[sector,ticket_config,ticket_discount,ticket_holder.address],order_contact]`,
  {headers: this.authHeader()
 });
}

downloadTicketPdf(data) {
  return axios.get(`https://org1.develop.bam.fan/event/v1/order/${data.orderId}/download_tickets`,
  {headers:this.authHeader(),responseType: 'blob',
 }
 
 );
}



}

export default new DataService();