import {BAM} from 'bam-ticketing-sdk';

const bam =new BAM(process.env.VUE_APP_ROOT_API) // set base url
    bam.authorize() //for auth 
    bam.useOrganizer(process.env.VUE_APP_ORGANIZER_ID)// set organization  


export default bam