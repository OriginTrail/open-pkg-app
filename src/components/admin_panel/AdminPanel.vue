<template>
    <div id="open-pkg-main-wrapper" v-if="wallet !== null">
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
                                <button @click="showDownloadContainer()" type="button"
                                        class="btn get-personal-data-btn">GET MY
                                    PERSONAL DATA
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
                                <button type="button" @click="showDeleteContainer()"
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
                                    <div class="col-md-12 table-column">
                                        <div class="item-icon-wrapper">
                                            <img class="item-icon"
                                                 src="~@/assets/download.svg"
                                                 alt="Download">
                                            <!-- <img class="item-icon" src="~@/assets/trash.svg" alt="Deleted">-->
                                        </div>
                                        <div class="item-status-wrapper">
                                            <span class="item-status">Downloaded</span>
                                            <!-- <span>Deleted</span>-->
                                        </div>
                                        <div class="item-date-wrapper">
                                            <span class="item-date">20.11.2020</span>
                                        </div>
                                    </div>

                                    <!-- ACTIVITY SINGLE ROW-->
                                    <div class="col-md-12 table-column">
                                        <div class="item-icon-wrapper">
                                            <!-- <img class="item-icon" src="~@/assets/download.svg" alt="Download">-->
                                            <img class="item-icon"
                                                 src="~@/assets/trash.svg"
                                                 alt="Deleted">
                                        </div>
                                        <div class="item-status-wrapper">
                                            <!-- <span class="item-status">Downloaded</span>-->
                                            <span class="item-status">Deleted</span>
                                        </div>
                                        <div class="item-date-wrapper">
                                            <span class="item-date">20.11.2020</span>
                                        </div>
                                    </div>

                                    <!--ACTIVITY SINGLE ROW-->
                                    <div class="col-md-12 table-column">
                                        <div class="item-icon-wrapper">
                                            <img class="item-icon"
                                                 src="~@/assets/download.svg"
                                                 alt="Download">
                                            <!--<img class="item-icon" src="~@/assets/trash.svg" alt="Deleted">-->
                                        </div>
                                        <div class="item-status-wrapper">
                                            <span class="item-status">Downloaded</span>
                                            <!--<span class="item-status">Deleted</span>-->
                                        </div>
                                        <div class="item-date-wrapper">
                                            <span class="item-date">20.11.2020</span>
                                        </div>
                                    </div>

                                    <div class="col-md-12 table-column">
                                        <div class="item-icon-wrapper">
                                            <img class="item-icon"
                                                 src="~@/assets/download.svg"
                                                 alt="Download">
                                            <!--<img class="item-icon" src="~@/assets/trash.svg" alt="Deleted">-->
                                        </div>
                                        <div class="item-status-wrapper">
                                            <span class="item-status">Downloaded</span>
                                            <!--<span class="item-status">Deleted</span>-->
                                        </div>
                                        <div class="item-date-wrapper">
                                            <span class="item-date">20.11.2020</span>
                                        </div>
                                    </div>

                                    <div class="col-md-12 table-column">
                                        <div class="item-icon-wrapper">
                                            <img class="item-icon"
                                                 src="~@/assets/download.svg"
                                                 alt="Download">
                                            <!--<img class="item-icon" src="~@/assets/trash.svg" alt="Deleted">-->
                                        </div>
                                        <div class="item-status-wrapper">
                                            <span class="item-status">Downloaded</span>
                                            <!--<span class="item-status">Deleted</span>-->
                                        </div>
                                        <div class="item-date-wrapper">
                                            <span class="item-date">20.11.2020</span>
                                        </div>
                                    </div>

                                    <!--PAGINATION-->
                                    <nav aria-label="Page navigation example" class="activity-pagination">
                                        <ul class="pagination">
                                            <li class="page-item">
                                                <a class="page-link" href="#" aria-label="Previous">
                                                    <span aria-hidden="true">&laquo;</span>
                                                    <span class="sr-only">Previous</span>
                                                </a>
                                            </li>
                                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                                            <li class="page-item"><a class="page-link" href="#">4</a></li>
                                            <li class="page-item"><a class="page-link" href="#">5</a></li>
                                            <li class="page-item">
                                                <a class="page-link" href="#" aria-label="Next">
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


        <!--Inner Validation pop-up container-->
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

    export default {
        name: "AdminPanel",
        data() {
            return {
                wallet: '0x7778830314',
            }
        },
        mounted() {
            this.listenEthereumEvents();

            this.checkIfMemataskIsSigned();

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
            checkIfMemataskIsSigned() {

                if (window.ethereum && window.ethereum.isMetaMask) {

                    if (window.ethereum._state.accounts.length > 0) {

                        console.log('already connected');

                        this.wallet = window.ethereum._state.accounts[0];

                    } else {

                        console.log('not connected');
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

<style lang="scss">
    @import "~@/scss/_open-pkg.scss";
    @import "~bootstrap/dist/css/bootstrap.min.css";
</style>
