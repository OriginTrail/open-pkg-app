<template>
    <div id="open-pkg-main-wrapper">
        <div class="container-fluid">
            <div class="row open-pkg-header">
                <div class="col-md-3">
                    <img class="opkg-logo" src="~@/assets/OpenPKG-logo.png" alt="OpenPKG">
                </div>
                <div class="col-md-9 identity-column">
                    <div class="identity-wrapper" v-if="wallet !== null">
                        <img class="identicon-img" src="~@/assets/identicon.png" alt="">
                        <p class="identity-text">
                            did:ethr:{{ wallet }}</p>
                    </div>
                    <button type="button" class="btn sign-in-out-btn" v-if="wallet !== null">Sign out</button>
                    <button type="button" class="btn sign-in-out-btn" v-if="wallet === null" @click="signInWithMetamask">Sign in</button>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row application-content-wrapper">

                <!--                 Side menu - LEFT-->
                <div class="tabs opkg-tabs">
                    <div class="col-lg-3 col-md-12 col-sm-12 tabs-column">
                        <ul id="opkg-navigation-tabs">
                            <li><a class="opkg-menu-item" href="#tab1">Personal data options</a></li>
                            <li><a class="opkg-menu-item" href="#tab2">Activity</a></li>
                        </ul> <!-- END opkg-navigation-tabs -->
                    </div>

                    <div class="col-lg-9 col-md-12 col-sm-12 open-pkg-application-content">
                        <!--                        Content - RIGHT-->
                        <div id="tabs-content">
                            <div id="tab1" class="tab-content">
                                <div class="personal-data-wrapper display-personal-data" id="personal-data">
                                    <h1 class="application-main-headline">OpenPKG</h1>
                                    <p class="large-text large-spacing">
                                        Nunc ultricies habitant luctus condimentum eu, risus. Vulputate nam phasellus mi
                                        curabitur
                                        phasellus tincidunt adipiscing eget dolor.
                                    </p>
                                    <h2 class="application-medium-headline">
                                        Get personal data
                                    </h2>
                                    <p class="regular-text">
                                        You can request all personal data collected by the OpenPKG-enabled website based
                                        on your
                                        DID.
                                        You can trigger the request in the OpenPKG section of the organization’s
                                        website, and can
                                        download the file when it is ready. Requesting data is only possible if you are
                                        signed into
                                        OpenPKGR.
                                    </p>
                                    <button @click="showDownloadContainer()" type="button"
                                            class="btn get-personal-data-btn">GET MY
                                        PERSONAL DATA
                                    </button>
                                    <div class="separator"></div>
                                    <h2 class="application-medium-headline">
                                        Delete personal data
                                    </h2>
                                    <p class="regular-text">
                                        Only you can request the deletion of all personal data collected by the OpenPKG
                                        based on
                                        your
                                        DID. You can trigger the request in the OpenPKG section of the organization’s
                                        website. When
                                        the
                                        data is successfully deleted, you will get confirmation. OpenPKG should only
                                        delete data
                                        related
                                        to the DID currently signed in through MetaMask.
                                    </p>
                                    <button type="button" @click="showDeleteContainer()"
                                            class="btn delete-personal-data-btn">
                                        DELETE PERSONAL DATA
                                    </button>
                                    <div class="separator"></div>
                                    <h2 class="application-medium-headline">
                                        Delete personal data
                                    </h2>
                                    <p class="regular-text">
                                        Only you can request the deletion of all personal data collected by the OpenPKG
                                        based on
                                        your
                                        DID. You can trigger the request in the OpenPKG section of the organization’s
                                        website. When
                                        the
                                        data is successfully deleted, you will get confirmation. OpenPKG should only
                                        delete data
                                        related
                                        to the DID currently signed in through MetaMask.
                                    </p>
                                    <button @click="showValidationPopUp()" type="button" class="btn validate-data-btn">
                                        VALIDATE
                                        DATA INTEGRITY
                                    </button>
                                </div>
                            </div>
                            <div id="tab2" class="tab-content">
                                <!--                                ACTIVITY COMPONENT-->
                                <div class="activity-wrapper" id="activity-data">
                                    <h1 class="application-main-headline">Activity</h1>
                                    <p class="large-text medium-spacing">
                                        Nunc ultricies habitant luctus condimentum eu, risus. Vulputate nam phasellus mi
                                        curabitur
                                        phasellus tincidunt adipiscing eget dolor.
                                    </p>
                                    <div class="identity-wrapper">
                                        <img class="identicon-img"
                                             src="~@/assets/identicon.png"
                                             alt="">
                                        <p class="identity-text">
                                            did:ethr:{{ wallet}}</p>
                                    </div>

                                    <!--                                    ACTIVITY TABLE-->
                                    <div class="row table-row" id="activity">

                                        <!--                                        ACTIVITY SINGLE ROW-->
                                        <div class="col-md-12 table-column">
                                            <div class="item-icon-wrapper">
                                                <img class="item-icon"
                                                     src="~@/assets/download.svg"
                                                     alt="Download">
                                                <!--                                                <img class="item-icon" src="~@/assets/trash.svg" alt="Deleted">-->
                                            </div>
                                            <div class="item-status-wrapper">
                                                <span class="item-status">Downloaded</span>
                                                <!--                                                <span>Deleted</span>-->
                                            </div>
                                            <div class="item-date-wrapper">
                                                <span class="item-date">20.11.2020</span>
                                            </div>
                                        </div>

                                        <!--                                       ACTIVITY SINGLE ROW-->
                                        <div class="col-md-12 table-column">
                                            <div class="item-icon-wrapper">
                                                <!--                                                <img class="item-icon" src="~@/assets/download.svg" alt="Download">-->
                                                <img class="item-icon"
                                                     src="~@/assets/trash.svg"
                                                     alt="Deleted">
                                            </div>
                                            <div class="item-status-wrapper">
                                                <!--                                                <span class="item-status">Downloaded</span>-->
                                                <span class="item-status">Deleted</span>
                                            </div>
                                            <div class="item-date-wrapper">
                                                <span class="item-date">20.11.2020</span>
                                            </div>
                                        </div>

                                        <!--                                         External OPKG Widget-->
                                        <div id="website-widget" v-if="wallet === null">
                                            <button class="widget-button">SIGN IN</button>
                                        </div>
                                        <!--                                        ACTIVITY SINGLE ROW-->
                                        <div class="col-md-12 table-column">
                                            <div class="item-icon-wrapper">
                                                <img class="item-icon"
                                                     src="~@/assets/download.svg"
                                                     alt="Download">
                                                <!--                                                <img class="item-icon" src="~@/assets/trash.svg" alt="Deleted">-->
                                            </div>
                                            <div class="item-status-wrapper">
                                                <span class="item-status">Downloaded</span>
                                                <!--                                                <span class="item-status">Deleted</span>-->
                                            </div>
                                            <div class="item-date-wrapper">
                                                <span class="item-date">20.11.2020</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> <!-- END tabs-content -->
                    </div> <!-- END Right side column 9 -->
                </div><!-- END tabs -->
            </div> <!-- END Application content wrapper -->
        </div> <!-- END Application container -->


        <!-- ************************** START WIDGETS and POP Up's ************************** -->

        <!--        External OPKG Widget-->
        <div id="website-widget" v-if="wallet === null">
            <button class="widget-button" id="sign-in-button">SIGN IN</button>
        </div>

        <!--        Terms and conditions pop-up-->
        <div id="sign-in-boxes-container" class="sign-in-boxes-container-closed">
            <div id="terms-and-conditions-check" class="terms-and-conditions-box">
                <img @click="closeSignInProcess()" src="~@/assets/close-img.svg"
                     class="pop-up-close-button" id="close-pop-up-terms" alt="X">
                <img class="pop-up-image" src="~@/assets/OpenPKG-logo.png" alt="OpenPKG">
                <h2 class="pop-up-headline">
                    Protect your data by using OpenPKG
                </h2>
                <p class="pop-up-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                </p>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="terms-and-conditions-checkbox">
                    <label class="form-check-label" for="terms-and-conditions-checkbox">
                        I accept <span class="checkbox-bold-text">Terms and Conditions</span>
                    </label>
                </div>
                <p class="pop-up-text-small">
                    *In order to accept you’ll need to have your MetaMask installed
                </p>
                <div class="pop-up-buttons-wrapper">
                    <button id="accept-terms-btn" class="pop-up-button-accept button-inactive">ACCEPT</button>
                    <button id="decline-btn" @click="closeSignInProcess()"
                            class="pop-up-button-decline button-inactive">
                        DECLINE
                    </button>
                    <a class="what-is-opkg-link" target="_blank" href="https://nos.test/open-pkg-development">What is
                        OpenPKG</a>
                </div>
            </div>

            <!--            Metamask sign in box-->
            <div id="metamask-sign-in" class="metamask-sign-in-box">
                <img @click="closeSignInProcess()" src="~@/assets/close-img.svg"
                     class="pop-up-close-button" id="close-pop-up-metamask" alt="X">
                <img class="pop-up-image" src="~@/assets/OpenPKG-logo.png" alt="OpenPKG">
                <h2 class="pop-up-headline">
                    OpenPKG
                </h2>
                <p class="pop-up-text">
                    To use OpenPKG you must sign in using the MetaMask. If you don’t have MetaMask plugin installed
                    click here for download and wallet setup instructions.
                </p>
                <div class="pop-up-buttons-wrapper">
                    <button id="sign-in-metamask-btn" class="pop-up-button-accept" @click="signInWithMetamask">SIGN IN WITH METAMASK</button>
                    <button @click="closeSignInProcess()" id="cancel-sign-in-btn" class="pop-up-button-decline">CANCEL
                    </button>
                </div>
            </div>

            <!--            Setup successfull box-->
            <div id="successfull-sign-in" class="successfull-sign-in-box">
                <img @click="closeSignInProcess()" src="~@/assets/close-img.svg"
                     class="pop-up-close-button" id="close-pop-up-metamask" alt="X">
                <img class="pop-up-image" src="~@/assets/OpenPKG-logo.png" alt="OpenPKG">
                <h2 class="pop-up-headline">
                    OpenPKG setup successful
                </h2>
                <p class="pop-up-text">
                    Everything is ready now. You can close this window and go to the <span
                        class="bold">OpenPKG page</span>.
                </p>
            </div>
        </div>

        <!--        Inner Download pop-up container-->
        <div id="download-data-pop-up-container" class="download-container-disabled">
            <div id="download-data-pop-up" class="download-pop-up">
                <img @click="closePopUpContainer()" src="~@/assets/close-img.svg"
                     class="pop-up-close-button" id="close-pop-up-metamask" alt="X">
                <h2 class="pop-up-header">
                    Downloading...
                </h2>
                <p class="pop-up-text-regular">
                    Download of personal data is in progress. This can take a while.
                </p>
                <div class="download-bar">
                    <div class="download-progress" id="download-progress-animation"></div>
                </div>
            </div>
        </div>

        <!--       Inner Delete pop-up container-->
        <div id="delete-data-pop-up-container" class="delete-container-disabled">
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
                    <button @click="closePopUpContainer()" id="cancel-sign-in-btn" class="cancel-delete-data">
                        CANCEL
                    </button>
                    <button id="sign-in-metamask-btn" class="delete-data-button">DELETE</button>
                </div>
            </div>
        </div>


        <!--        Inner Validation pop-up container-->
        <div id="validate-data-pop-up-container" class="validation-container-disabled">
            <div id="validation-data-pop-up" class="validation-pop-up">
                <img @click="closePopUpContainer()" src="~@/assets/close-img.svg"
                     class="pop-up-close-button" id="close-pop-up-metamask" alt="X">
                <h2 class="pop-up-header">
                    Data Validation
                </h2>
                <img class="temp-validation-image img-fluid"
                     src="~@/assets/validation-component-temp-image.png"
                     alt="">
                <!--                Remove image from directory when Validation is added-->
                <button id="verify-again-button" class="verify-data-button"><img class="verify-arrow-img"
                                                                                 src="~@/assets/verify-again-arrow.png"
                                                                                 alt="">VERIFY AGAIN
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ApplicationLayout",
        data() {
            return {
                wallet: null
            }
        },
        mounted() {
            this.listenEthereumEvents();

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
            listenEthereumEvents() {
                window.ethereum.on('accountsChanged', (accounts) => {

                    if(accounts.length === 0) {
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
            showDownloadContainer() {
                $('#download-data-pop-up-container').addClass('download-container-active');
                $('#download-progress-animation').animate({width: '100%'}, 3500)
            },

            // Show delete popup
            showDeleteContainer() {
                $('#delete-data-pop-up-container').addClass('delete-container-active');
                $('#delete-data-pop-up').addClass('delete-pop-up');
            },


            // Show Validation popup
            showValidationPopUp() {
                $('#validate-data-pop-up-container').addClass('validation-container-active');
                $('#delete-data-pop-up').addClass('delete-pop-up');
            },

            closePopUpContainer() {
                $('#validate-data-pop-up-container').removeClass('validation-container-active');
                $('#delete-data-pop-up-container').removeClass('delete-container-active');
                $('#download-data-pop-up-container').removeClass('download-container-active');
                $('#download-progress-animation').animate({width: '0'}, 0)
            }
        }
    }
</script>

<style scoped>

</style>
