# Random Songs From A Random Year - General Assembly Project 2

[Project Overview](#project-overview) | [Getting Started](#getting-started) | [Project Brief and Timeframe](#project-brief-and-timeframe) | [Technologies Used](#technologies-used) | [Process](#process) | [Wins](#wins) | [Challenges](#challenges) | [Bugs & Future Improvements](#bugs--future-improvements) | [Key Learnings](#key-learnings)

# Project Overview

This was the second project of my General Assembly Software Engineering Immersive course and my first group project. The project's task was to create a React app consuming an external API. My project partner Wyndham ([github.com/wyndhams](https://github.com/wyndhams)) and I created an application that uses the Napster API to display a random song with song information and an audio snippet based on a user’s selected year of choice.

**Link to deployment:** [https://randosongsrandoyears.netlify.app/](https://randosongsrandoyears.netlify.app/)

# Getting Started

- Clone or download the source code
- In CLI, install node modules with `npm install`
- In CLI, run `npm start`

# Project Brief and Timeframe

Timeframe: The project was set out to be a hackathon. We started on a Thursday and presented on the following Monday. My teammate and I also used Sunday to work on the project.

## Project Brief

Technical Requirements/ App must:

- Consume a public API – this could be anything but it must make sense for your project.
- Have several components - At least one classical and one functional.
- The app can have a router - with several "pages", this is up to your discretion and if it makes sense for your project.
- Include wireframes - that you designed before building the app.
- Be deployed online and accessible to the public.

Necessary Deliverables

- A working application, hosted somewhere on the internet
- A link to your hosted working app in the URL section of your Github repo
- A git repository hosted on Github, with a link to your hosted project, and frequent commits dating back to the very beginning of the project
- A readme.md file with:
- Explanations of the technologies used
- A couple of paragraphs about the general approach you took
- Installation instructions for any dependencies
- Link to your wireframes – sketches of major views / interfaces in your application
- Descriptions of any unsolved problems or major hurdles your team had to overcome

# Technologies Used

- React
- JavaScript (ES6)
- HTML5
- SCSS
- Npm
- Axios
- react-router-dom
- react-notify-toast
- react-datepicker
- Napster API
- Postman
- Git/GitHub
- Bulma
- Excalidraw
- Google Chrome dev tools
- Netlify

# Demonstration

![Project Walkthrough](./src/assets/project_walkthrough.gif 'Project Walkthrough')

Main Features:

- Select a year from given range
- Receive random song suggestion
- Play audio snippet
- Receive another song suggestion

# Process

## Planning

We first started by researching APIs and settled on the Napster API, with the idea to display a random song based on the selected birth year of the user (spoiler alert: it didn’t work out quite that way). We knew that the Napster API allowed a good enough rate limit for API calls (enough for our needs) and that it can return information on artist, album, song and a song audio snipped, which was exactly what we needed (or so we thought). We then registered with Napster to get an API key.

We then created mock-ups of how we wanted our application to be structured and the features we wanted it to have and wrote down components we would need. Besides showing a random song, we also wanted users to register and log in in order to save songs.

![Excalidraw Mock-Up](./src/assets/excalidraw_mockup.png 'Excalidraw Mock-Up')

## Execution

We were provided with starter code which included React, Bulma and Axios. Doing pair-programming, we then set up basic files like App.js, including routes and the main basic component with placeholder code. After that we split tasks and worked on our assigned tasks on different branches, while using Slack and Zoom to communicate.

### Home and Song page component

- My first task was to write the code for the home page and song page structure, using placeholders for the data we’d later pull from the API.
- I researched components for date selectors and implemented react-datepicker on our home page component. Once a user selects a year, a handleSelect() function navigates the user to the song component with the selected year as a parameter, which is then used to filter through the returned API call results.

```javascript
const handleSelect = () => {
  navigate(`/song/${startDate.getFullYear()}`);
};

//function component return body
// date picker component inside of the return

<DatePicker
  selected={startDate}
  onChange={handleChange}
  showYearPicker
  dateFormat="yyyy"
  minDate={subtractYears(date, 12)}
  maxDate={new Date()}
/>;
```

- As we were restricted by the type of endpoint and it’s limited returns (see below), we had to restrict the range of selectable

### Calling Endpoints

- Early into the development process (but too late to find another API), we encountered issues with the Napster API, as we found out there wasn’t a perfect endpoint to get our desired information. For one, the endpoints we could use would only return “top 1000” results, out of which Napster limits the return to a maximum of 200 results in one endpoint call. To mitigate this restriction, we figured out that we could use the limit and offset parameters to get the broadest range of results.

```javascript
const ALBUMS_URL = 'https://api.napster.com/v2.0/albums/top';

const getParams = (offset) => ({
  params: {
    limit: 200,
    apikey: 'YTY2NzM4ODgtMTdhNi00MWQ5LTkyZDktMmZjODBkYzA4N2Qw',
    offset
  }
});

export const getAlbums = (offset) => {
  return axios.get(ALBUMS_URL, getParams(offset));
};
```

- Additionally, while Napster provides many endpoints, none of it provided all the information we needed in one, so we had to create multiple nested API calls. As the returns were limited and there was a chance that none of the results included the selected year as a parameter, we had to create a recursive API call (see Songs.js for full code). When we did get results back from the albums endpoint, we pulled a random result from which we pulled a random track.

```javascript
// get album data, code block inside of useEffect hook calling the napster API

  getAlbum(randomAlbumId)
    .then((res) => {
      const randomSongId =
        res.data.tracks[
          Math.floor(Math.random() * res.data.tracks.length)
        ]
      console.log('FILTERED TRACK', randomSong
      getTrack(randomSongId)
        .then((res) => setTrack(res.data))
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
```

- At some point, Napster’s v2.2 albums endpoint didn’t return any results anymore, so we had to use the 2.0 version, which returned only a total of 200 results. When I last checked, v2.2 does seem to work again
- From the endpoints, we extracted information on album name, artist, song name, release year, album cover and track snippet mp3
- For all of the above, we set up a collection on Postman to have a better overview of all the data returned by the different endpoints and their parameter modifications
- Unfortunately we didn’t have enough time to implement the register/login, nor the song saving functionality

## Styling

- We used the Bulma CSS framework for a lot of element stylings (like buttons or cards), as we had used the framework in class before. It was easy and straightforward to use.
- We didn’t have much time for more in-depth styling but Wyn managed to add album cover images to the homepage, background color and font styling

# Wins

- It was great pair-programming, bouncing off ideas and working on collaboration skills. I initially found it hard fully understanding others' code or explaining mine, but this project really helped me to improve it.
- Despite the challenges, it was a really good exercise to deal with changes of plan and to quickly adapt the product idea to what we could work with. It also “forced” us to work more collaboratively to solve issues.

# Challenges

- It turned out that the Napster API was more difficult to work with than we initially thought. It wasn’t immediately clear to us that only the endpoint returning album information includes information on release year (rather than an endpoint returning songs), and that even then the endpoint only returned a limited amount of results (in our dream world, it would have included all albums/songs to ever exist). By the time we realised we couldn’t cater to our initial idea of a user selecting their birth year, it was too late to try and find another API that could serve our needs.
- As we spent a good chunk problem-solving, we couldn’t implement as many features like register and login or styling as we set out to have

# Bugs & Future Improvements

As we were given only a few days to hack this up and spend a lot of time figuring out nesting API calls, we couldn’t implement all the features we planned out and couldn’t invest more time into styling. If I can get back on this, I would:

- Change the current v.2.0 endpoint back to v.2.2 (if it works)
- Add a save functionality and either save it in localstorage or create a mini-backend
- Find a way to decrease loading time
- Update the styling and make the home page more responsive

# Key Learnings:

This process taught me that external APIs might not always straightforwardly meet my desired project requirements and I know now to always carefully read API documentation. I also learned that it’s important to clearly draw up a plan of must-haves and additional wants, as this helped us prioritise building important features first instead of investing time into easy but not-crucial features.
