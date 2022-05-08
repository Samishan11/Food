import myKey from "./khaltikeys";
let config = {
    // replace this key with yours
    publicKey: myKey.publicTestKey,
    productIdentity: "123766",
    productName: "Hamro Pasal",
    productUrl: "http://localhost:3000",
    eventHandler: {
        onSuccess(payload) {
            console.log('payload');
        },
        onError(error) {
            console.log(error);
        },
        onClose() {
            console.log("widget is closing");
        },
    },
    paymentPreference: [
        "KHALTI",
        "EBANKING",
        "MOBILE_BANKING",
        "CONNECT_IPS",
        "SCT",
    ],
};

export default config;