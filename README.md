# Scale Chrome Extension

Extension for serial communications with industrial scales.

## Features

- Used ReactJs to write chrome extension
- Injecting extension to host page as content script
- Utilized the Chrome messaging API
- Isolated extension CSS using Iframe
- TODO: Serial communication with host computer

## Installation
>Make sure you have latest **NodeJs** version installed

Clone repo

```
git clone https://github.com/lu-dias/scale-extension.git
```
Go to `scale-extension` directory run

```
yarn install
```
Now build the extension using
```
yarn build
```
You will see a `build` folder generated inside `[PROJECT_HOME]`

## Adding React app extension to Chrome

In Chrome browser, go to chrome://extensions page and switch on developer mode. This enables the ability to locally install a Chrome extension.

<img src="https://cdn-images-1.medium.com/max/1600/1*OaygCwLSwLakyTqCADbmDw.png" />

Now click on the `LOAD UNPACKED` and browse to `[PROJECT_HOME]\build` ,This will install the React app as a Chrome extension.

When you go to any website and click on extension icon, injected page will toggle.

<img src="https://cdn-images-1.medium.com/max/1600/1*bXJYfvrcHDWKwUZCrPI-8w.png" />

## License

The repo is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
