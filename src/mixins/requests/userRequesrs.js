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
    }

    function getPaymentLink() {
        axios.get(`${testUrl}/api/plans`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => location.href = response.link)
    }

    return {
        getPlans,
        getPaymentLink
    }
}
