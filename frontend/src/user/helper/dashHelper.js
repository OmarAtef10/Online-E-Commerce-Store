import {API} from "../../backend";

export const userOrders = (id, token) => {
    return fetch(`${API}order/orders/${id}/${token}/`, {
        method: "GET"
    }).then(response => {
        return response.json()
    })
        .catch(err => console.log(err))
}