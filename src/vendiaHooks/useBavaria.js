import { createVendiaClient } from '@vendia/client'


const client = createVendiaClient({
    apiUrl: 'https://050jwu8m27.execute-api.us-west-2.amazonaws.com/graphql/',
    websocketUrl: 'wss://k69fcq9qrj.execute-api.us-west-2.amazonaws.com/graphql',
    apiKey: 'HzpPNdd3WoxaFdZZfS13aFzjQb6USdW2xRCCW486Ktka', // <---- API key
})

const {entities} = client;

const useBavaria = () =>{
    return {entities};
};

export default useBavaria;