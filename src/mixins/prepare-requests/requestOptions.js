import {mainStore} from "@/store/mainStore";

export default function getRequestOptions(payload) {
    const main = mainStore();
    const headers = {};

    payload.forEach(headerElement => {
        if (headerElement.key === 'Authorization') {
            headers[headerElement.key] = `${headerElement.body} ${main.person.token}`;
        } else {
            headers[headerElement.key] = headerElement.body;
        }
    });
    return headers
}
