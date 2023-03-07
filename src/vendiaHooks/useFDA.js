import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
  apiUrl: `https://ncd14u7pif.execute-api.us-west-2.amazonaws.com/graphql/`,
  websocketUrl: `wss://3npxswgmxd.execute-api.us-west-2.amazonaws.com/graphql`,
  apiKey: `624LRx7BELcNHN3UPpmgrRn7wHQ1XzHPqVUKc9objmPN`, // <---- API key
});

const { entities } = client;

const useFDA = () => {
  return { entities };
};

export default useFDA;
