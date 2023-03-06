import { createVendiaClient } from '@vendia/client'


const client = createVendiaClient({
    apiUrl: ``,
    websocketUrl: ``,
    apiKey: ``, // <---- API key
})

const {entities} = client;

const useFDA = () =>{
    return {entities};
};

export default useFDA;