/**
 * These are the walking paths data, provided in the application. Each walking path contains a id to identify the path,
 * along with title, distance in km, difficulty level, duration, three images, description, and a map of the path.
 */
const walkingPaths = [
  {
    id: "1",
    title: "Thames Path: Embankment to Greenwich",
    distance: "13 Km",
    difficulty: "Moderate",
    duration: "Est. 2 hrs 53 mins",
    images: [
      require("../images/thames-path-1.jpg"),
      require("../images/thames-path-2.jpg"),
      require("../images/thames-path-3.jpg"),
    ],
    description:
      "Explore this 13.0 km point-to-point path in the vicinity of London's City of London. It takes an average of 2 hours and 53 minutes to complete, and is generally regarded as a moderately hard course. This track is excellent for walking, running, and trekking, and you won't likely come across many other visitors while exploring.",
    map: require("../images/thames-path-map.webp"),
  },
  {
    id: "2",
    title: "Covent Garden Wander",
    distance: "7.6 Km",
    difficulty: "Moderate",
    duration: "Est. 1 hrs 26 mins",
    images: [
      require("../images/covent-garden-1.jpg"),
      require("../images/covent-garden-2.jpg"),
      require("../images/covent-garden-3.jpg"),
    ],
    description:
      "Explore this 7.6-kilometer round trip route close to Westminster, London. It takes an average of 1 hour 26 minutes to complete and is generally regarded as a moderately hard route. It's doubtful that you'll come across many other people while exploring, and this track is excellent for walking.",
    map: require("../images/covent-garden-wander-map.webp"),
  },
  {
    id: "3",
    title: "Covent Garden Circular",
    distance: "2.3 Km",
    difficulty: "Easy",
    duration: "Est. 27 mins",
    images: [
      require("../images/covent-garden-circular-1.jpeg"),
      require("../images/covent-garden-circular-2.jpg"),
      require("../images/covent-garden-circular-3.jpg"),
    ],
    description:
      "Explore this 2.3-kilometer loop track in the vicinity of Westminster, London. It takes an average of 27 minutes to complete and is generally regarded as an easy route. This track is excellent for walking and road riding, and you won't likely run into many other visitors while exploring. The route is lovely to explore at any time of year and is open year-round. Dogs are allowed, nevertheless they have to be leashed.",
    map: require("../images/covent-garden-circular-map.webp"),
  },
  {
    id: "4",
    title: "Buckingham Palace, St. James's Park, and Palace of Whitehall",
    distance: "4.8 Km",
    difficulty: "Easy",
    duration: "Est. 1 hrs 6 mins",
    images: [
      require("../images/Buckingham-palace-1.jpg"),
      require("../images/Buckingham-palace-2-st-james's-park.jpg"),
      require("../images/Buckingham-palace-3-st-james's-park.jpg"),
    ],
    description:
      "Explore this 4.8-kilometer loop track in the vicinity of Westminster, London. It takes an average of 1 hour and 6 minutes to complete, and is generally regarded as an easy route. Since this is a highly well-liked walking area, you will probably run into other people while you are exploring. Visit this trail between January and November for the best results.",
    map: require("../images/buckingham-palace-map.webp"),
  },
  {
    id: "5",
    title: "Hyde Park and Kensington Gardens",
    distance: "6.1 Km",
    difficulty: "Easy",
    duration: "Est. 1 hrs 21 mins",
    images: [
      require("../images/hyde-park-1.jpg"),
      require("../images/hyde-park-2.jpg"),
      require("../images/hyde-park-3.jpg"),
    ],
    description:
      "Discover this 6.1-kilometer loop track in the vicinity of Westminster, London. It takes an average of 1 hour 21 minutes to complete, and is generally regarded as an easy route. Since this is a well-liked location for walking, jogging, and hiking, you'll probably meet into other visitors while exploring. The route is lovely to explore at any time of year and is open year-round. Dogs are allowed, however they have to be leashed.",
    map: require("../images/hyde-park-map.webp"),
  },
];

export default walkingPaths;
