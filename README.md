# sandbar

![beach](./public/beach4.jpg)

This project is an example of Configuration Driven Development (CDD). This accompanies Andrew and Ram's talk [Configuration Based Development Approach - Andrew Evans & Ram Ramkumar w/CapTech](https://www.meetup.com/rva-js/events/szjphrybclbgb/).

For a copy of our presentation please see the "presentation" folder in this project.

This project also has an accompanying set of APIs that are hosted as Azure Functions. To see those in action, please check out the repo [boardwalk](https://www.github.com/andrewevans0102/boardwalk2).

This project has multiple branches that show how you can iterate from a "traditonal" project over to one that is done with CDD.

-   branch `master` is the final product with CDD
-   branch `level-0` is a basic project with no CDD
-   branch `level-1` is a refactor of the project available at `level-0` to include the addition of some modular components and the start of CDD
-   branch `level-2` is a final refactor of `level-0` with full use of CDD

## Running Locally

This project uses [Azure Functions](https://azure.microsoft.com/en-us/services/functions/) and [Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction) as the backend. Please go to our project [boardwalk](https://www.github.com/andrewevans0102/boardwalk) for the source code for those.

To run this project with a backend, you'll need to deploy the project's functions to Azure (or at least run them locally). Either way, once you have the functions running locally or deployed in Azure, you'll need to add the API prefix (base URL for your functions) to the file at `/src/index.js` as you see here:

```js
// when your backend is deployed, here is where you put the API prefix
const DEV_API_PREFIX = "<YOUR_API_PREFIX_GOES_HERE>";
const initialState = {};
const { persistor, store } = configureStore(initialState);

axios.interceptors.request.use(
    function (config) {
        config.url = DEV_API_PREFIX + config.url;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
```

## Project Images

-   `beach1.jpg` was found [here](https://pixabay.com/photos/california-sunset-dusk-sky-clouds-1751455/)
-   `beach3.jpg` was found [here](https://pixabay.com/photos/beach-foam-motion-ocean-sea-2179183/)
-   `beach4.jpg` was found [here](https://pixabay.com/photos/beach-beverage-caribbean-cocktail-84533/)
-   `beach5.jpg` was found [here](https://pixabay.com/photos/beach-dominican-republic-caribbean-1236581/)
-   `beach6.jpg` was found [here](https://pixabay.com/photos/polynesia-french-polynesia-tahiti-3021072/)
-   `beach7.jpg` was found [here](https://pixabay.com/photos/beach-north-sea-sea-sunset-water-2179624/)
-   `beach8.jpg` was found [here](https://pixabay.com/photos/beach-birds-dawn-dusk-hd-wallpaper-1852945/)
-   `beach9.jpg` was found [[here](https://pixabay.com/photos/coast-elgol-isle-of-skye-stones-540123/)

## Special Thanks

In addition to everyone that attended our meetup, we also want to give a special shoutout to [Patrick Youells](https://www.linkedin.com/in/patrick-youells-2919a559/) for introducing us to the CDD concept! The methods used in this project draw inspiration from work we have done on previous projects together.

```

```
