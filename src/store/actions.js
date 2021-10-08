import DataService from "../services/DataService";
import {useRouter} from "vue-router";

const router = useRouter();


export const getEvents = ({commit},startDate)=>{
    commit('loadingStatus',true)
     DataService.events(startDate).then((response) => {
                commit('setEvents',response.data.data)
                commit('loadingStatus',false)
            }).catch(error => {
                    console.log(error);
                });  
}

export const getEvent = ({commit},id)=>{
    commit('loadingStatus',true)
      DataService.event(id).then((response) => {
        commit('setEvent',response.data.data)
        commit('loadingStatus',false)
    }).catch(error => {
        if (error.response.status == 404) {
            alert(`Data not found`);
          }
        console.log(error);
    });  
}

export const getVenue = async ({commit},venue_id)=>{
    commit('loadingStatus',true)
    await DataService.venueAddress(venue_id).then((response) => {
        commit('setVenue',response.data.data)
        commit('loadingStatus',false)
        }).catch(error => {
                    console.log(error);
    }); 

}


export const recurringEvent =  ({commit},id)=>{
    commit('loadingStatus',true)
   DataService.recurringEvent(id).then((response) => {
        commit('setRecurringEvent',response.data.data)
        commit('loadingStatus',false)
        }).catch(error => {
            if (error.response.status == 404) {
                alert(`Data not found`);
              }
            console.log(error);
        }); 

}
