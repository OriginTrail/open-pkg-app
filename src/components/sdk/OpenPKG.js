module.exports = {

    getPersonalData() {
        alert('Personal data');
        return 'Personal data';
    },

    deletePersonalData() {
        return "Personal data deleted";
    },

    forwardSignedConf() {
        return "Initiated";
    },

    getSignInConfirmation() {
        return "Signed in successfully";
    },

    storeUserActivity() {
        return "Initiated";
    },

    getStoringResult() {
        return "Successfully stored";
    },

    publishCollection() {

        let responseObj = {};
        responseObj.handler_id = "1ad-1231-o3iq-1231";
        return responseObj;
    },

    startReplication() {
        return "Initiated";
    },

    verifyCompletedReplication() {
        return "Verified";
    },

    DSARRequest() {

    }

}

