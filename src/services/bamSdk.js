import {BAM,} from 'bam-ticketing-sdk';

const bam =new BAM(process.env.VUE_APP_ROOT_API) // set base url
    async function main(){
       await bam.authorize() //for auth 
       await bam.useOrganizer(process.env.VUE_APP_ORGANIZER_ID)// set organization 
    }

    main();

export default bam