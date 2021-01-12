<template>
    <div id="open-pkg-main-wrapper" v-if="wallet !== null && renderApplication">
        <div class="container-fluid">
            <div class="row open-pkg-header">
                <div class="col-md-12">
                    <div class="header-container">
                        <img class="opkg-logo" src="~@/assets/OpenPKG-logo.png" alt="OpenPKG">
                    </div>
                </div>
            </div>

        </div>
        <div class="container">
            <div class=" application-content-wrapper">
                <div class="tabs opkg-tabs">
                    <div class="open-pkg-application-content row">
                        <div class="col-lg-7">
                            <div class="identity-wrapper visible-tablet">
                                <img class="identicon-img"
                                     src="~@/assets/identicon.png"
                                     alt="">
                                <p class="identity-text">
                                    did:ethr:{{ wallet }}</p>
                            </div>
                            <div class="personal-data-wrapper display-personal-data" id="personal-data">
                                <h1 class="application-main-headline">OpenPKG</h1>
                                <p class="large-text large-spacing">
                                    Own your data. Use OpenPKG to discover what personal data organisations hold about
                                    you, validate it or request its automated deletion.
                                </p>
                                <h2 class="application-medium-headline">
                                    Get personal data
                                </h2>
                                <p class="regular-text">
                                    You can request all personal data collected by the OpenPKG-enabled website based on
                                    your DID. You can trigger the request in the OpenPKG section of the organization’s
                                    website, and can download the file when it is ready. Requesting data is only
                                    possible if you are signed into OpenPKG.
                                </p>

                                <button @click="getPersonalDataPopup()" type="button"
                                        class="btn get-personal-data-btn">
                                    GET MY PERSONAL DATA
                                </button>

                                <div class="separator"></div>
                                <h2 class="application-medium-headline">
                                    Delete personal data
                                </h2>
                                <p class="regular-text">
                                    You can request deletion of all personal data collected by the OpenPKG-enabled
                                    website based on your DID. You can trigger the request below and receive
                                    confirmation in the Activity log once deletion is finalised.
                                </p>
                                <button type="button" @click="deletePersonalDataPopup()"
                                        class="btn get-personal-data-btn">
                                    DELETE PERSONAL DATA
                                </button>
                                <div class="separator"></div>
                                <h2 class="application-medium-headline">
                                    Validate data integrity
                                </h2>
                                <p class="regular-text">
                                    You can validate the integrity of personal data stored in OpenPKG. You can do this
                                    in the OpenPKG section of the organization’s website.
                                </p>
                                <button @click="showValidationPopUp()" type="button" class="btn validate-data-btn">
                                    VALIDATE DATA INTEGRITY
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-5">
                            <!--ACTIVITY COMPONENT-->
                            <div class="activity-wrapper" id="activity-data">
                                <div class="identity-wrapper visible-desktop">
                                    <img class="identicon-img"
                                         src="~@/assets/identicon.png"
                                         alt="">
                                    <p class="identity-text">
                                        did:ethr:{{ wallet }}</p>
                                </div>

                                <h1 class="activity-headline">Activity log</h1>
                                <p class="regular-text medium-spacing">
                                    Nunc ultricies habitant luctus condimentum eu, risus. Vulputate nam phasellus mi
                                    curabitur
                                    phasellus tincidunt adipiscing eget dolor.
                                </p>

                                <!-- ACTIVITY TABLE-->
                                <div class="row table-row" id="activity">

                                    <!--  ACTIVITY SINGLE ROW-->
                                    <div class="col-md-12 table-column" v-for="(activity, index) in selectedActivities">
                                        <div class="item-icon-wrapper">
                                            <img class="item-icon"
                                                 src="~@/assets/download.svg"
                                                 alt="Download" v-if="activity.type === 'Downloaded'">

                                            <img class="item-icon" src="~@/assets/trash.svg" alt="Deleted"
                                                 v-if="activity.type === 'Deleted'">
                                        </div>
                                        <div class="item-status-wrapper">
                                            <span class="item-status">{{ activity.type }}</span>
                                            <!-- <span>Deleted</span>-->
                                        </div>
                                        <div class="item-date-wrapper">
                                            <span class="item-date">{{ activity.formatted_date }}</span>
                                        </div>
                                    </div>

                                    <!--PAGINATION-->
                                    <nav aria-label="Page navigation example" class="activity-pagination" v-if="selectedActivities.length > 0">
                                        <ul class="pagination">
                                            <li class="page-item">
                                                <a @click="selectPage(1)" class="page-link" href="javascript:void(0)"
                                                   aria-label="Previous">
                                                    <span aria-hidden="true">&laquo;</span>
                                                    <span class="sr-only">Previous</span>
                                                </a>
                                            </li>
                                            <li class="page-item" v-for="index in numberOfPages" :key="index">
                                                <a class="page-link"
                                                   :class="(selectedPage === index ? 'active-page' : '')"
                                                   href="javascript:void(0)" @click="selectPage(index)">{{ index }}</a>
                                            </li>
                                            <li class="page-item">
                                                <a @click="selectPage(numberOfPages)" class="page-link"
                                                   href="javascript:void(0)" aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
                                                    <span class="sr-only">Next</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div> <!-- END Right side column 9 -->
                </div><!-- END tabs -->
            </div> <!-- END Application content wrapper -->
        </div> <!-- END Application container -->

        <!--        Inner Download pop-up container-->
        <div id="download-data-pop-up-container" class="download-container-disabled"
             :class="(downloadActive) ? 'download-container-active' : ''">
            <div id="download-data-pop-up" class="download-pop-up">
                <img src="~@/assets/close-img.svg"
                     class="pop-up-close-button" id="close-pop-up-metamask" alt="X" @click="downloadActive = false">
                <h2 class="pop-up-header">
                    Downloading...
                </h2>
                <p class="pop-up-text-regular">
                    Download of personal data is in progress. This can take a while.
                </p>
                <div class="download-bar">
                    <div class="download-progress" id="download-progress-animation"
                         :class="[(progressActive) ? 'animate-download' : '', (fetchingDataFinished) ? 'no-animation-width-100' : '']"></div>
                </div>
            </div>
        </div>

        <!--       Inner Delete pop-up container-->
        <div id="delete-data-pop-up-container" class="delete-container-disabled"
             :class="(showDeletePopup) ? 'delete-container-active' : ''">
            <div id="delete-data-pop-up" class="delete-pop-up">
                <img @click="closePopUpContainer()" src="~@/assets/close-img.svg"
                     class="pop-up-close-button" id="close-pop-up-metamask" alt="X">
                <h2 class="pop-up-header">
                    Delete personal data
                </h2>
                <p class="pop-up-text-regular">
                    OpenPKG should only delete data related to the DID currently signed in through MetaMask.
                    Are you sure you want to delete personal data?
                </p>
                <div class="popup-btns-wrapper">
                    <button @click="showDeletePopup = false" id="cancel-sign-in-btn" class="cancel-delete-data">
                        CANCEL
                    </button>
                    <button id="sign-in-metamask-btn" class="delete-data-button" @click="deletePersonalData()">DELETE
                    </button>
                </div>
            </div>
        </div>


        <!--Inner Validation pop-up container-->
        <div id="validate-data-pop-up-container" class="validation-container-disabled"
             :class="(showValidation) ? 'validation-container-active' : ''">
            <div id="validation-data-pop-up" class="validation-pop-up">
                <img @click="closePopUpContainer()" src="~@/assets/close-img.svg"
                     class="pop-up-close-button" id="close-pop-up-metamask" alt="X">
                <h2 class="pop-up-header">
                    Data Validation
                </h2>
                <img class="temp-validation-image img-fluid"
                     src="~@/assets/validation-component-temp-image.png"
                     alt="">
                <!-- Remove image from directory when Validation is added-->
                <button id="verify-again-button" class="verify-data-button"><img class="verify-arrow-img"
                                                                                 src="~@/assets/verify-again-arrow.png"
                                                                                 alt="">VERIFY AGAIN
                </button>
            </div>
        </div>
    </div>
</template>

<script>

    import "./admin_panel_main.js";

    import * as OpenPKG from '../sdk/OpenPKG.js';

    export default {
        name: "AdminPanel",
        data() {
            return {
                wallet: null,
                showDeletePopup: false,
                showValidation: false,
                downloadActive: false,
                progressActive: false,
                activities: [],
                myPersonalData: [],
                renderApplication: true,
                ETHEREUM: window.ethereum,
                fetchingDataFinished: false,
                pageSize: 5,
                pageNumber: 1,
                selectedPage: 1,
                totalNumberOfActivities: 0,
                numberOfPages: 0,
                selectedActivities: []
            }
        },
        mounted() {

            this.listenEthereumEvents();

            this.checkIfMemataskIsSigned();

            document.addEventListener('open-pkg:metamask-signed:download', (e) => {
                this.progressActive = true;
            });

            document.addEventListener('open-pkg:metamask-signed:download:close', (e) => {
                this.downloadActive = false;
                this.progressActive = false;
                this.fetchingDataFinished = false
            });

            // terms and conditions activate/disable buttons
            $('#terms-and-conditions-checkbox').click(function () {
                $('#accept-terms-btn').toggleClass('button-inactive');
                $('#decline-btn').toggleClass('button-inactive');
            });

            // show sign in step 1
            $('#sign-in-button').click(function () {
                $('#sign-in-boxes-container').addClass('sign-in-boxes-container-active');
                setTimeout(function () {
                    $('#terms-and-conditions-check').addClass('terms-and-conditions-box-show');
                }, 300);
            });

            $('#accept-terms-btn').click(function () {
                $('#metamask-sign-in').addClass('metamask-sign-in-box-show');
            });

            $('#sign-in-metamask-btn').click(function () {
                $('#successfull-sign-in').addClass('successfull-sign-in-box-show');
            });


            // Show first tab
            $('#opkg-navigation-tabs li:first-child').addClass('active');
            $('.tab-content').hide();
            $('.tab-content:first').show();

            // Click
            $('#opkg-navigation-tabs li').click(function () {
                $('#opkg-navigation-tabs li').removeClass('active');
                $(this).addClass('active');
                $('.tab-content').hide();

                let activeTab = $(this).find('a').attr('href');
                $(activeTab).fadeIn('fast');
                return false;
            });
        },
        methods: {
            async getMyPersonalData() {

                let personalDataResponse = await OpenPKG.getPersonalData();

                if (personalDataResponse.hasOwnProperty('response') && typeof personalDataResponse.response === 'object') {

                    let processed = 0;

                    personalDataResponse.response.forEach((row, index) => {

                        if (row.hasOwnProperty('claim')) {

                            row.timestamp_post = row.claim.request.timestamp;

                            if (row.claim.request.hasOwnProperty('message')) {

                                row.type = this.getActivityType(row.claim.request.message);

                                row.formatted_date = this.formatDate(row.claim.request.timestamp);

                                this.activities.push(row);
                            }

                        } else {
                            this.myPersonalData.push(row);
                        }

                        processed++;

                        if (processed === personalDataResponse.response.length) {

                            this.totalNumberOfActivities = this.activities.length;

                            this.activities.sort((a, b) => (a.timestamp_post < b.timestamp_post) ? 1 : -1);

                            this.numberOfPages = Math.ceil(this.totalNumberOfActivities / this.pageSize);

                            this.selectPage(1);

                            return true;
                        }
                    });

                } else {
                    return false;
                }
            },
            getActivityType(message) {
                switch (message) {
                    case "I send DSAR_DEL request":
                        return "Deleted";

                    case "I send DSAR request":
                        return "Downloaded";
                    default:
                        return "Unknown"
                }

            },
            formatDate(timestamp) {
                let d = new Date(timestamp);
                return d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
            },
            selectPage(pageNumber) {

                this.selectedPage = pageNumber;

                let end = this.selectedPage * this.pageSize;
                let start = end - this.pageSize;

                this.selectedActivities = this.activities.slice(start, end);
            },
            checkIfMemataskIsSigned() {

                if (window.ethereum && window.ethereum.isMetaMask) {

                    if (window.ethereum._state.hasOwnProperty('accounts')
                        && window.ethereum._state.accounts !== undefined
                        && window.ethereum._state.accounts.length > 0) {


                        this.wallet = window.ethereum._state.accounts[0];

                    } else {

                    }

                } else {
                    alert("Please install the MetaMask browser extension to use this decentralized app!");
                }
            },
            listenEthereumEvents() {
                window.ethereum.on('accountsChanged', (accounts) => {

                    if (accounts.length === 0) {
                        this.wallet = null;

                    } else {

                        this.wallet = accounts[0];
                    }

                });
            },
            signInWithMetamask() {

                const ethEnabled = () => {
                    if (window.ethereum) {
                        window.web3 = new Web3(window.ethereum);
                        window.ethereum.enable();
                        return true;
                    }
                    return false;
                };

                if (!ethEnabled()) {
                    alert("Please install the MetaMask browser extension to use this decentralized app!");
                } else {

                }
            },
            // Close sign in process
            closeSignInProcess() {
                $('#terms-and-conditions-check').removeClass('terms-and-conditions-box-show');
                $('#metamask-sign-in').removeClass('metamask-sign-in-box-show');
                $('#successfull-sign-in').removeClass('successfull-sign-in-box-show');
                setTimeout(function () {
                    $('#sign-in-boxes-container').removeClass('sign-in-boxes-container-active');
                }, 300);
            },


            // SHOW download popup
            getPersonalDataPopup() {

                this.downloadActive = true;

                this.getMyPersonalData().then(response => {

                    this.fetchingDataFinished = true;

                    setTimeout(() => {
                        let date = (new Date()).toLocaleDateString("fr-CA");
                        let filename = `${date}-my-personal-data`;
                        let extension = 'json';

                        this.saveJson(this.myPersonalData, filename, extension);
                    }, 500);
                });
            },

            deletePersonalDataPopup() {
                this.showDeletePopup = true;
            },

            async deletePersonalData() {
                let deleteDataResult = await OpenPKG.deletePersonalData();

                this.showDeletePopup = false;

                this.activities = [];

                this.selectedActivities = [];

                this.numberOfPages = 0;

                return deleteDataResult;
            },

            saveJson(obj, name, extension) {
                let str;
                let type;
                if (typeof obj === 'string') {
                    str = obj;
                    type = 'text/plain';

                } else {
                    str = JSON.stringify(obj, null, 2);
                    type = 'application/octet-stream';
                }
                let data = this.encode(str);

                let filename = name + '.' + extension;

                let blob = new Blob([str], {
                    type: type
                });

                let url = URL.createObjectURL(blob);
                let link = document.createElement('a');
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                let event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                link.dispatchEvent(event);

                document.dispatchEvent(new Event('open-pkg:metamask-signed:download:close'));

            },
            encode(s) {
                let out = [];
                for (let i = 0; i < s.length; i++) {
                    out[i] = s.charCodeAt(i);
                }
                return new Uint8Array(out);
            },

            // Show delete popup
            showDeleteContainer() {
                $('#delete-data-pop-up-container').addClass('delete-container-active');
                $('#delete-data-pop-up').addClass('delete-pop-up');
            },


            // Show Validation popup
            showValidationPopUp() {
                this.showValidation = true;
            },

            closePopUpContainer() {
                this.showValidation = false;
            }
        },
        watch: {
            ETHEREUM(val) {
                console.log(val, 'ethereum');
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/scss/_open-pkg.scss";
    @import "~bootstrap/dist/css/bootstrap.min.css";
</style>
