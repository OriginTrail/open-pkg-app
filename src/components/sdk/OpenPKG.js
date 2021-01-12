const Config = require('../../../open-pkg.config.json');

const PipelineService = require('../../services/PipelineService.js');

const NodeUtilities = require('./NodeUtilities.js');

const Web3 = require("web3");
const ethUtil = require('ethereumjs-util');

const Token = Config.token;
const EndPoint = Config.backendDomain;
const Identity = Config.identity;

const dataCollectionPipelineInstanceId = 'c57aa99c-732e-4294-bbf9-bf64f60dc5ad';
const dataPublishingPipelineInstanceId = 'e1880d58-c608-48f9-832a-73525be5e4ef';
const dataRequestPipelineInstanceId = 'd3bd6d30-9754-4111-ab90-4c9c82345368';
const dataDeletePipelineInstanceId = '03bbeb8f-f968-4bbe-a650-df65c49783d9';

module.exports = {

    // data collection
    async storePersonalData(activityObject) {

        if (this.configIsReady()) {

            let publicKey = await this.getPublicKey();

            if(publicKey !== null) {

                let requestBody = {
                    "activityObject": activityObject,
                    "entity": Identity,
                    "timestamp": Date.now(),
                    "publicKey": publicKey
                };

                let result = await PipelineService.triggerPipelineInstance(EndPoint, dataCollectionPipelineInstanceId, Token, requestBody);

                if(result.hasOwnProperty('status') && result.status === 'COMPLETED') {


                    if(result.hasOwnProperty('data') && result.data.hasOwnProperty('pipeline_instance_id')) {

                        const pipelineInstanceId = result.data.pipeline_instance_id;

                        let pipelineResult = await PipelineService.getPipelineInstanceResult(EndPoint, pipelineInstanceId, Token);

                        if(PipelineService.isNotFinished(pipelineResult)) {

                            let pipelineFinalResult = await PipelineService.waitForPipelineToFinish(EndPoint, pipelineInstanceId, Token);


                            if(pipelineFinalResult.hasOwnProperty('status') && pipelineFinalResult.status === 'COMPLETED') {
                                console.log(pipelineFinalResult, 'storing data result');
                                return pipelineFinalResult;
                            } else {
                                return { status : 'FAILED'};
                            }


                        } else {

                            if(pipelineResult.hasOwnProperty('status') && pipelineResult.status === 'COMPLETED') {

                                return pipelineResult;
                            } else {
                                return { status : 'FAILED'};
                            }
                        }
                    }
                }
            }
        }
    },

    // data publishing
    async publishPersonalData() {

        if (this.configIsReady()) {

            let requestBody = {};

            let result = await PipelineService.triggerPipelineInstance(EndPoint, dataPublishingPipelineInstanceId, Token, requestBody);

            if(result.hasOwnProperty('status') && result.status === 'COMPLETED') {

                if(result.hasOwnProperty('data') && result.data.hasOwnProperty('pipeline_instance_id')) {

                    const pipelineInstanceId = result.data.pipeline_instance_id;

                    let pipelineResult = await PipelineService.getPipelineInstanceResult(EndPoint, pipelineInstanceId, Token);

                    if(PipelineService.isNotFinished(pipelineResult)) {

                        let response = { status : 'Publishing has being started successfully.'};
                        console.log(response, 'publish data result');
                        return response;

                    } else {
                        return { status : 'FAILED'};
                    }
                }
            }
        }
    },

    // data request
    async getPersonalData() {

        if (this.configIsReady()) {

            let message = "I send DSAR request";

            let publicKey = await this.getPublicKey();

            if(publicKey !== null) {

                let signature = await this.signMessage(message, publicKey);

                let requestBody = {
                    "message": message,
                    "publicKey": publicKey,
                    "entity": Identity,
                    "timestamp": Date.now(),
                    "signature": signature
                };

                let result = await PipelineService.triggerPipelineInstance(EndPoint, dataRequestPipelineInstanceId, Token, requestBody);

                if(result.hasOwnProperty('status') && result.status === 'COMPLETED') {

                    if(result.hasOwnProperty('data') && result.data.hasOwnProperty('pipeline_instance_id')) {


                        const pipelineInstanceId = result.data.pipeline_instance_id;

                        let pipelineResult = await PipelineService.getPipelineInstanceResult(EndPoint, pipelineInstanceId, Token);


                        if(PipelineService.isNotFinished(pipelineResult)) {

                            let pipelineFinalResult = await PipelineService.waitForPipelineToFinish(EndPoint, pipelineInstanceId, Token);


                            if(pipelineFinalResult.hasOwnProperty('response')) {
                                console.log(pipelineFinalResult, 'get data result');
                                return pipelineFinalResult;
                            } else {
                                return { status : 'FAILED'};
                            }


                        } else {

                            if(pipelineResult.hasOwnProperty('response')) {
                                return pipelineResult.response;
                            } else {
                                return { status : 'FAILED'};
                            }
                        }
                    }
                }
            }
        }
    },

    // data delete
    async deletePersonalData() {

        if (this.configIsReady()) {

            let message = "I send DSAR_DEL request";

            let publicKey = await this.getPublicKey();

            if(publicKey !== null) {

                let signature = await this.signMessage(message, publicKey);

                let requestBody = {
                    "message": message,
                    "publicKey": publicKey,
                    "entity": Identity,
                    "timestamp": Date.now(),
                    "signature": signature
                };

                let result = await PipelineService.triggerPipelineInstance(EndPoint, dataDeletePipelineInstanceId, Token, requestBody);

                if(result.hasOwnProperty('status') && result.status === 'COMPLETED') {

                    if(result.hasOwnProperty('data') && result.data.hasOwnProperty('pipeline_instance_id')) {


                        const pipelineInstanceId = result.data.pipeline_instance_id;

                        let pipelineResult = await PipelineService.getPipelineInstanceResult(EndPoint, pipelineInstanceId, Token);


                        if(PipelineService.isNotFinished(pipelineResult)) {

                            let pipelineFinalResult = await PipelineService.waitForPipelineToFinish(EndPoint, pipelineInstanceId, Token);

                            if(pipelineFinalResult.hasOwnProperty('status') && pipelineFinalResult.status === 'COMPLETED') {
                                console.log(pipelineFinalResult, 'delete data result');
                                return pipelineFinalResult;
                            } else {
                                return { status : 'FAILED'};
                            }


                        } else {

                            if(pipelineResult.hasOwnProperty('status') && pipelineResult.status === 'COMPLETED') {
                                return pipelineResult;
                            } else {
                                return { status : 'FAILED'};
                            }
                        }
                    }
                }
            }
        }
    },

    configIsReady() {
        return Config.hasOwnProperty('backendDomain') &&
            Config.backendDomain !== '' &&
            Config.backendDomain !== undefined &&
            Config.backendDomain !== null;
    },

    async getPublicKey() {
        if (window.hasOwnProperty('ethereum') && window.ethereum.hasOwnProperty('isMetaMask')) {

            if (window.ethereum._state.hasOwnProperty('accounts')
                && window.ethereum._state.accounts !== undefined
                && window.ethereum._state.accounts.length > 0) {

                return window.ethereum._state.accounts[0];

            } else {
                console.log('Account on Metamask not connected');

                return null;
            }

        } else {
            alert("Please install the MetaMask browser extension to use this decentralized app!");

            return null;
        }
    },

    async signMessage(message, publicKey) {

        return new Promise(resolve => {

            let msg = ethUtil.bufferToHex(new Buffer(message, 'utf8'));
            let from = publicKey;

            let params = [msg, from];
            let method = 'personal_sign';

            const ethEnabled = () => {
                if (window.ethereum) {
                    window.web3 = new Web3(window.ethereum);
                    window.ethereum.enable();
                    return true;
                }
                return false;
            };

            if (!ethEnabled()) {
                alert("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!");
                return null;
            } else {

                window.web3.currentProvider.sendAsync({
                    method,
                    params,
                    from,
                }, function (err, result) {

                    if(err || result.error) {

                        //signing finished error
                        console.log('signing finished error');
                        resolve(null);

                    } else {

                        document.dispatchEvent(new Event('open-pkg:metamask-signed:download'));

                        resolve(result.result);
                    }
                });
            }

        });
    },
};

