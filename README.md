# open-pkg-app

## Installation steps:

1. Clone OpenPKG plugin from the GitHub repository into the website’s public folder
  	https://github.com/OriginTrail/open-pkg-app
  	
2. Install required dependencies

   	npm install
   	
3. Configuration file setup

    The root directory of the plugin (open-pkg-app) includes “open-pkg.config.json” file which is used as the main configuration template, responsible for communication with the OpenPKG backend. In order to have successful implementation all three parameters need to be populated:
    
    1. **backendDomain** - domain of the OpenPKG backend
    2. **token** - value of the token should be retrieved in the backend installation process
    3. **identity** - can be anything which identifies this website. The good practice is to put your website domain

4. Compile main components (AdminPanel, SignInPopup and OpenPKG SDK)

```
npm run build:admin-panel
npm run build:sign-in-popup
npm run build:sdk
```

After successful compilation of the main components in the open-pkg-app folder there should be three directories:
- admin_panel
- sign_in_popup
- sdk





## Implementation:

#### Admin Panel

Paste following code snippet on the page dedicated to OpenPKG Admin Panel and change your path to the “admin-panel.min.js” script:
```
<script src="./admin_panel/admin-panel.min.js"></script>
<admin-panel></admin-panel>
```


#### Sign in popup

In order to get Sign In popup on your website pages paste the following code snippet and change your path to the “open-pkg-sign.min.js” script:
```
<script src="./sign_in_popup/open-pkg-sign.min.js"></script>
<open-pkg-sign></open-pkg-sign>
```


#### OpenPKG SDK
In order to get OpenPKG SKD object on your website pages paste the following code snippet and change your path to the “OpenPKG.umd.min.js” script:
```
<script src="./sdk/OpenPKG.umd.min.js"></script>
```

If the implementation of “OpenPKG.umd.min.js” script is successful OpenPKG object should be globally available on the page where the script is implemented. Object includes three main methods:

- deletePersonalData()
- getPersonalData()
- storePersonalData(**personalData**)

Type of variable personalData can be string, object or array.

