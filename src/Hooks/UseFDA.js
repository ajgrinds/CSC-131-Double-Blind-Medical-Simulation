import { createVendiaClient } from "@vendia/client"

const client = createVendiaClient({
    apiUrl: `https://ncd14u7pif.execute-api.us-west-2.amazonaws.com/graphql/`,
    websocketUrl: `wss://3npxswgmxd.execute-api.us-west-2.amazonaws.com/graphql`,
    apiKey: 'CWFfKKWPg24qi9FrR3rYsenvmrsfde31AsVecJcj71b2', 
    })


export default function UseFDA() {
  return (
    <div>UseFDA</div>
  )
}
