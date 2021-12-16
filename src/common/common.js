import moment from "moment";

export function dateFormat(value) {
    return moment(value).format("MM/DD/YYYY ");
}

export function timeFormat(value) {
    return moment(value).format(" HH:mm a");
}

export function lengthOfString(value) {
    if (value ? value.length > 15 : '') {
        return value.substring(0, 15) + '...'
    } else {
        return value
    }
}

export function updateEvent(event) {
    if (event.ticketDiscount.length > 0) {
        event.ticketConfig.forEach(async (element) => {
            let ticketDiscounts = []
            let minPrice = 0;
            let standardPrice = element.faceValue;
            ticketDiscounts = await Promise.all(event.ticketDiscount.map(discountElement => {
                element.minPrice = 0;
                let discountType = discountElement.type;
                let discountValue = discountElement.value;
                if (discountType === 'amount') {
                    if (standardPrice > 0) {
                        discountElement.faceValue = standardPrice - discountValue;
                    } else {
                        discountElement.faceValue = discountValue
                    }
                } else if (discountType === 'percent') {
                    if (standardPrice > 0) {
                        let percentAmount = (standardPrice * discountValue / 100)
                        discountElement.faceValue = standardPrice - percentAmount
                    } else {
                        discountElement.faceValue = discountValue
                    }
                }
                discountElement.isDiscountItem = true;
                discountElement.ticketId = element.id;
                discountElement.standardPrice = standardPrice;
                discountElement.ticketsPerUser = element.ticketsPerUser;
                return JSON.parse(JSON.stringify(discountElement))
            }))
            ticketDiscounts.forEach((item) => {
                if (minPrice > item.faceValue || minPrice == 0) {
                    minPrice = item.faceValue
                }
            });
            minPrice = minPrice > element.faceValue ? element.faceValue : minPrice;
            element.minPrice = minPrice;
            element.ticketDiscount = ticketDiscounts

        });
    }
    return event;
}


export function saleStart(start, end) {
    var todayDate = new Date();
    var startDate = new Date(start);
    var endDate = new Date(end);
    if (startDate.getTime() >= todayDate.getTime() || endDate.getTime() <= todayDate.getTime()) {
        return true;
    } else {
        return false
    }
}


