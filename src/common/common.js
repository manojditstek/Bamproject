import moment from "moment";

export function dateFormat(value) {
    return moment(value).format("MM/DD/YYYY ");
}

export function timeFormat(value) {
    return moment(value).format(" HH:mm a");
}

export function lengthOfString(value) {
    if (value ? value.length > 22 : '') {
        return value.substring(0, 20) + '...'
    } else {
        return value
    }
}

export  function  updateEvent(event){
    if(event.ticketDiscount.length>0){
    event.ticketConfig.forEach(async (element) => {
        let ticketDiscounts = []
        let minPrice = 0;
        let standardPrice = element.faceValue;
        
        ticketDiscounts =  await Promise.all(event.ticketDiscount.map(discountElement => {
            element.minPrice = 0;
            let discountType = discountElement.type;
            let discountValue = discountElement.value;
            if(discountType === 'amount'){
                if(standardPrice>0){
                discountElement.faceValue = standardPrice - discountValue;
                }else{
                    discountElement.faceValue=discountValue
                }
            }else if(discountType === 'percent'){
                if(standardPrice>0){
                let percentAmount = (standardPrice * discountValue / 100)
                discountElement.faceValue = standardPrice - percentAmount
                }else{
                    discountElement.faceValue=discountValue
                }
            }
            discountElement.isDiscountItem = true;
            discountElement.ticketId = element.id;
            discountElement.standardPrice = standardPrice;

            // console.log('discountType',discountType, "discountValue",discountValue,'discountElement.faceValue',discountElement.faceValue)
            discountElement.ticketsPerUser=element.ticketsPerUser;
            // console.log('ticketsPerUser',discountElement.ticketsPerUser,"discountElmName",discountElement.name)
            return JSON.parse(JSON.stringify(discountElement))
        }))
        ticketDiscounts.forEach((item) => {
            if(minPrice > item.faceValue || minPrice == 0){
                minPrice = item.faceValue
            }   
        });
        minPrice = minPrice > element.faceValue ? element.faceValue : minPrice;
        element.minPrice = minPrice;
        element.ticketDiscount= ticketDiscounts

    }); 
    }
    // console.log("s",event)
    return event;
}




