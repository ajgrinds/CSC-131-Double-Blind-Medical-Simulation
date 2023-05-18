import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
  apiUrl: `https://ggchmce667.execute-api.us-west-2.amazonaws.com/graphql/`,
  websocketUrl: `wss://3dywizq6wh.execute-api.us-west-2.amazonaws.com/graphql`,
  apiKey: `C32B4wiNapYdRUmCf5A5jwRYucbXP12ipvV95DxsDdte`, // <---- API key
});

const { entities } = client;

const useFDA = () => {
  return { entities };
};

export default useFDA;
