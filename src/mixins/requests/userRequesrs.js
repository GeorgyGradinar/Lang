import axios from "axios";
import {HEADER_PARAMETERS, testUrl} from "../../../config";
import requestOptions from "@/mixins/prepare-requests/requestOptions";
import {mainStore} from "@/store/mainStore";

export default function userRequests() {
    const main = mainStore();
    const {changePlans} = main;

    function getPlans() {
        axios.get(`${testUrl}/api/plans`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                changePlans(response.data.data);
            })
            .catch(error => handleError(error))
    }

    function getPaymentLink(id) {
        axios.post(`${testUrl}/api/payment`, {plan_id: id}, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => location.href = response.data.link)
            .catch(error => handleError(error))
    }

    function handleError(error) {
        console.log(error)
    }

    return {
        getPlans,
        getPaymentLink
    }
}
