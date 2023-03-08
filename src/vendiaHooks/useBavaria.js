import { createVendiaClient } from '@vendia/client'


const client = createVendiaClient({
    apiUrl: `https://kd30o0gl11.execute-api.us-west-2.amazonaws.com/graphql/`,
    websocketUrl: `wss://ew90t2mhe2.execute-api.us-west-2.amazonaws.com/graphql`,
    apiKey: `Bjwv2NbUi4kDHkmnZ8Vv2KYMynKdktBdwSz3Mja231bF`, // <---- API key
})

const {entities} = client;

const useBavaria = () =>{
    return {entities};
};

export default useBavaria;