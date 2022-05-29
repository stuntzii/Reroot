# Reroot

Reroot is an extension for chromium based browsers that injects content when the user visits twitter.com, allowing them to post to lens protocol and twitter at the same time.

This project is an attempt to bootstrap the twitter userbase into the Lens ecosystem by making it convenient and comfortable to use for the average twitter user.

## How to install

1. Download the `reroot.zip` file in the latest release found [here](https://github.com/stuntzii/Reroot/releases) and unzip.
<img width="936" alt="Screen Shot 2022-05-29 at 1 51 12 PM" src="https://user-images.githubusercontent.com/105610705/170891218-d1f206af-91b3-41f8-b904-06d5fd0e8e6d.png">
  
2. Navigte to `chrome://extensions` in your browser and enable "Developer mode".
<img width="1509" alt="Screen Shot 2022-05-29 at 1 55 54 PM" src="https://user-images.githubusercontent.com/105610705/170891242-f147e945-14f9-46ae-bc70-25ecd3028c10.png">

3. Click "Load unpacked" and select the unzipped `reroot` folder from step 1.
<img width="1512" alt="Screen Shot 2022-05-29 at 1 56 29 PM" src="https://user-images.githubusercontent.com/105610705/170891263-4ffde5bd-6e42-4e0e-b4bd-527411ce1996.png">

4. You should now see the reroot extension added and ready to use.
<img width="455" alt="Screen Shot 2022-05-29 at 1 56 56 PM" src="https://user-images.githubusercontent.com/105610705/170891365-ec361afa-1d31-466f-8290-27818dbc88d2.png">

> **Warning**
> 
> Network detection can be buggy, before connecting to your wallet to the extension please make sure you are connected to either the `Polygon` or `Mumbai` networks.


## Development

1. Copy `src/env.example.js` to `src/env.js` and fill in the values with your api keys:

```javascript
export const INFURA_ID = "";
export const LENS_API = "https://api-mumbai.lens.dev";
export const PINATA_API_KEY = "";
export const PINATA_API_SECRET = "";
```

4. Ensure you have Node installed and run the following to build the extension:

```sh
yarn
yarn build
```

4. Open your browser extensions manager and enable developer mode. Then `Load unpacked` and choose the `dist` folder within this repo.

5. Navigate to twitter.com and you should now see the Lens button beside `tweet`
