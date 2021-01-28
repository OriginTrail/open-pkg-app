<template>
    <div id="open-pkg-main-wrapper">
        <div id="website-widget" v-if="wallet === null">
            <button class="widget-button" id="sign-in-button" @click="signInMain">SIGN IN</button>
        </div>

        <!--        Terms and conditions pop-up-->
        <div id="sign-in-boxes-container" class="sign-in-boxes-container-closed" :class="(showSignInBox) ? 'sign-in-boxes-container-active' : ''">
            <div id="terms-and-conditions-check" class="terms-and-conditions-box" :class="(showTerms) ? 'terms-and-conditions-box-show' : ''">
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
                    <input class="form-check-input" type="checkbox" value="" v-model="termsCheckInput" id="terms-and-conditions-checkbox" @change="changedTerms">
                    <label class="form-check-label" for="terms-and-conditions-checkbox">
                        I accept <span class="checkbox-bold-text">Terms and Conditions</span>
                    </label>

                </div>
                <p class="pop-up-text-small">
                    *In order to accept you’ll need to have your MetaMask installed
                </p>
                <div class="pop-up-buttons-wrapper">
                    <button id="accept-terms-btn" class="pop-up-button-accept" :class="(!termsCheckInput) ? ' button-inactive' : ''" @click="acceptTerms">ACCEPT</button>
                    <button id="decline-btn" @click="closeSignInProcess()" style="display: none;"
                            class="pop-up-button-decline button-inactive">
                        DECLINE
                    </button>
                    <a class="what-is-opkg-link" target="_blank" href="https://nos.test/open-pkg-development">What is
                        OpenPKG</a>
                </div>
            </div>

            <!--            Metamask sign in box-->
            <div id="metamask-sign-in" class="metamask-sign-in-box" :class="(termsAccepted) ? 'metamask-sign-in-box-show': ''">
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
            <div id="successfull-sign-in" class="successfull-sign-in-box" :class="(metamaskSignedIn) ? 'successfull-sign-in-box-show' : ''">
                <img @click="closeSignInProcess()" src="~@/assets/close-img.svg"
                     class="pop-up-close-button" id="close-pop-up-metamask" alt="X">
                <img class="pop-up-image" src="~@/assets/OpenPKG-logo.png" alt="OpenPKG">
                <h2 class="pop-up-headline">
                    OpenPKG setup successful
                </h2>
                <p class="pop-up-text">
                    You can close this window and continue browsing the website.
                </p>
                <div class="pop-up-buttons-wrapper">
                    <button class="pop-up-button-accept" @click="goToAdminPanel">VISIT ADMIN PANEL</button>
                </div>
            </div>

        </div>

        <button class="pop-up-button-accept floating-button" @click="goToAdminPanel" v-if="showAdminPanelButton">OPENPKG PANEL</button>
    </div>
</template>

<script>

    import './sign_in_popup_main.js';

    export default {
        name: "SignInPopup",
        data() {
            return {
                wallet: 'wallet',
                showSignInBox: false,
                showTerms: false,
                termsCheckInput: false,
                termsAccepted: false,
                metamaskSignedIn: false,
                isConnected: false,
                accounts: null,
                signedIn: false,
                showAdminPanelButton: false,
                showAdminPanelInitial: false
            }
        },
        mounted() {

            this.isConnected = window.ethereum._state.isConnected;

            this.accounts = window.ethereum._state.accounts;

            this.listenEthereumEvents();

            setTimeout(() => {
                this.checkIfMemataskIsSigned();
            }, 1000);

        },
        methods: {
            goToAdminPanel() {
                window.open('/open-pkg-admin.html', '_blank');
            },
            checkIfMemataskIsSigned() {

                if (window.ethereum && window.ethereum.isMetaMask) {

                    if (window.ethereum._state.hasOwnProperty('accounts')
                        && window.ethereum._state.accounts !== null
                        && window.ethereum._state.accounts.length > 0) {

                        this.wallet = window.ethereum._state.accounts[0];

                        this.signedIn = true;

                    } else {

                        this.wallet = null;

                    }

                } else {
                    alert("Please install the MetaMask browser extension to use this decentralized app!");
                }
            },
            changedTerms() {
                if(this.termsCheckInput) {

                }
            },
            acceptTerms() {
                this.termsAccepted = true;
            },
            checkBoxTerms() {
                this.termsCheckInput = true;
            },
            signInMain() {

                this.showSignInBox = true;

                this.showTerms = true;

                setTimeout(function () {

                }, 300);
            },
            listenEthereumEvents() {

                window.ethereum.on('accountsChanged', (accounts) => {

                    if(accounts.length === 0) {
                        this.wallet = null;
                        this.metamaskSignedIn = false;

                    } else {

                        this.wallet = accounts[0];
                        this.metamaskSignedIn = true;
                    }

                });
            },
            signInWithMetamask() {

                const ethEnabled = () => {
                    if (window.ethereum) {
                        window.web3 = new window.Web3(window.ethereum);
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
                this.showSignInBox = false;
                this.showTerms = false;
                this.termsAccepted = false;
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
        },
        watch: {
            isConnected(val) {
                if(val) {
                    // this.checkIfMemataskIsSigned();
                }
            },
            accounts(val) {
                console.log(val, 'accounts');
            },
            wallet() {
                if (window.location.href.indexOf('admin') === -1 && this.wallet !== null) {
                    this.showAdminPanelButton = true;
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/scss/_open-pkg.scss";
    @import "~bootstrap/dist/css/bootstrap.min.css";
</style>
