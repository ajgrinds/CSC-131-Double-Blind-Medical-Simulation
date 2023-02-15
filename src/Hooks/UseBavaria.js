import { createVendiaClient } from "@vendia/client"

const client = createVendiaClient({
    apiUrl: `https://kd30o0gl11.execute-api.us-west-2.amazonaws.com/graphql/`,
    websocketUrl: `wss://ew90t2mhe2.execute-api.us-west-2.amazonaws.com/graphql`,
    apiKey: 'ETBcgvCgroAZcatYerbUR1xk3Wr3LpJtSB36GNYE6BB1', 
    })

export default function UseBavaria() {
  return (
    <div>UseBavaria</div>
  )
}
