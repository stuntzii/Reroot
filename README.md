# Reroot

Reroot is an extension for chromium based browsers that injects content when the user visits twitter.com, allowing them to post to lens protocol and twitter at the same time.

This project is an attempt to bootstrap the twitter userbase into the Lens ecosystem by making it convenient and comfortable to use for the average twitter user.

## How to use

1. First, clone this repo:

```sh
git clone https://github.com/stuntzii/Reroot
```

2. Copy `src/env.example.js` to `src/env.js` and fill in the values with your api keys:

```javascript
export const INFURA_ID = "";
export const LENS_API = "https://api-mumbai.lens.dev";
export const PINATA_API_KEY = "";
export const PINATA_API_SECRET = "";
```

3. Ensure you have Node installed and run the following to build the extension:

```sh
yarn
yarn build
```

4. Open your browser extensions manager and enable developer mode. Then `Load unpacked` and choose the `dist` folder within this repo.

5. Navigate to twitter.com and you should now see the Lens button beside `tweet`
