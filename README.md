## Documentation

My main goal was to get something that the user could navigate to and see launches with minimal breakage. I had to compromise due to the time limit and the fact that this was my first time setting up this sort of map page. I definitely felt a little slower than I wanted to be. As is, the user can go to the page, see a map of the world with launches for the last 3 months, and can select a new time range for launches which will then be displayed. Hovering over one point displays information for all points (yuk, more on this below). 

### Libraries Used

#### Map

- [react-simple-maps](https://www.react-simple-maps.io/)

##### Pros

- It was very easy to get started with this library. I haven't worked with maps before so I wanted something I could use to produce a result that looked acceptable. I don't have a Google API Key and I knew it would take too long to set up given the amount of time I had to complete the test. If I had unlimited time, I would have either used Google API or found a better mapping library. 

##### Cons

- Although react-simple-maps gave me something I could work with, it was very limiting in the data I could pull from the Launch Library and use in the map. 
- Because it came with so many pre-built features, adding my own features (e.g. hovering over a point gives the info for only that point) was difficult. 
- The hover is the thing that annoys me the most. Currently hovering over one point shows the information for all of them. The first thing I would change is either use a different library/Google API or dig into this one more so that only the information for the point currently hovered over is displayed.
- I would update the Marker interface I set up on lines 15 - 19 to include all the other information needed e.g. success, time, etc. I was so focused on getting it set up, I honestly didn't notice I needed to do this until I was writing up the documentation. 

#### Moment.js and Dates

- [moment.js](https://momentjs.com/)

- I didn't want to hardcode in the 3 month upcoming launch window, so I used moment.js to get the current date and the date 3 months ahead. I thought this was important since hardcoding the dates would have been fine for today, but that is not at all how a real website would work - I wanted it to be responsive and dynamic. 
- If I had the time I would have added in more checks for the date. E.g. make sure the user can't select an end date before the start date

### Other Comments 

- I meant to change the type any on line 54 - I would not leave it as type any normally. I didn't notice I hadn't changed it til reviewing for documentation.
- I would like to have set up a redux store to manage state, this would have made adding tests much easier as well. But I'm not as familiar with using redux/jest with typescript so I decided having a working product was the priority.
- I have one component MapChart - I would like to break this up and make it a bit more modular if possible. 
- I added a little user feedback - an alert if there is a problem reaching the API. I don't care for how alerts look and would prefer to use something prettier e.g. react-bootstrap has nice alerts, I just didn't get to implement it and figured some alert was better than none. 

## Other

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
