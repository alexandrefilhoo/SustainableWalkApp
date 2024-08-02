// Random contact messages
const dummyMessages = [

  {
    id: "1",
    name: "Aline Thomas",
    degree: "MSc Medicine",
    university: "King's College London",
    image: require("../images/person-14.webp"),
    time: "",
    message: "",
  },
  {
    id: "2",
    name: "Clarisse Alves",
    degree: "MSc Biomedicine",
    university: "Imperial College London",
    image: require("../images/person-2.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "3",
    name: "Barbara Johnson",
    degree: "BSc Entrepreneurship",
    university: "University College London",
    image: require("../images/person-4.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "4",
    name: "Paul Lewis",
    degree: "MSc Medicine",
    university: "University of Birmingham",
    image: require("../images/person-3.jpeg"),
    time: "",
    message: "",
      
  },
  {
    id: "5",
    name: "Elton Thomas",
    degree: "BSc Graphic Design",
    university: "University of Westminster",
    image: require("../images/person-18.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "6",
    name: "Amanda Jones",
    degree: "BSc Computer Science",
    university: "University of Glasgow",
    image: require("../images/person-9.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "7",
    name: "Wei Li ",
    degree: "BSc Archaeology",
    university: "University College London",
    image: require("../images/person-20.jpeg"),
    time: "",
    message: "",
      
  },
  {
    id: "8",
    name: "Alexandra Moore",
    degree: "MSc Data Science",
    university: "King’s  College London",
    image: require("../images/person-21.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "9",
    name: "Stefano Cipriani ",
    degree: "BSc Entrepreneurship",
    university: "Imperial College London",
    image: require("../images/person-23.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "10",
    name: "Min Zhou",
    degree: "BSc Business Administration",
    university: "King’s College London",
    image: require("../images/person-22.jpeg"),
    time: "",
    message: "",
      
  },
  {
    id: "11",
    name: "Raj Patel",
    degree: "BSc Computer Science",
    university: "University of Oxford",
    image: require("../images/person-26.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "12",
    name: "Omar Rohan",
    degree: "MSc Artificial Intelligence",
    university: "Imperial College London",
    image: require("../images/person-25.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "13",
    name: "Sara Willians",
    degree: "MSc Environmetal Engineering",
    university: "Imperial College London",
    image: require("../images/person-28.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "14",
    name: "Clare Giordano",
    degree: "BSc Psychology ",
    university: "University of Greenwich",
    image: require("../images/person-29.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "15",
    name: "Samantha Ferrari",
    degree: "BSc  Geology",
    university: "University of Birmingham",
    image: require("../images/person-30.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "16",
    name: "Sofia Turner",
    degree: "BSc Law",
    university: "Queen Mary, University of London",
    image: require("../images/person-31.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "17",
    name: "Steven Harris",
    degree: "MSc Biomedicine",
    university: "Imperial  College London",
    image: require("../images/person-36.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "18",
    name: "Sasha Bianchi",
    degree: "BSc Entrepreneurship",
    university: "King’s College London",
    image: require("../images/person-32.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "19",
    name: "Pedro Sanchez",
    degree: "BSc Computer Science",
    university: "City, University of London",
    image: require("../images/person-13.png"),
    time: "",
    message: "",
  },
  {
    id: "20",
    name: "Lucia Menotti",
    degree: "BSc Chemical Engineering",
    university: "University of Bath",
    image: require("../images/person-11.jpg"),
    time: "",
    message: "",
  },
  {
    id: "21",
    name: "Barbara Robbins",
    degree: "BSc Architecture",
    university: "University of Cambridge",
    image: require("../images/person-27.jpg"),
    time: "",
    message: "",
  },
  {
    id: "22",
    name: "Min Zhang",
    degree: "BSc Geology",
    university: "University of Bath",
    image: require("../images/person-50.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "23",
    name: "Alicia Schmidt ",
    degree: "BSc Physics",
    university: "University of  Sunderland",
    image: require("../images/person-33.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "24",
    name: "Steph  Robbins",
    degree: "BSc Politics",
    university: "Queen Mary, University of London",
    image: require("../images/person-52.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "25",
    name: "Chris  Heritage",
    degree: "MSc Architecture ",
    university: "University of East London",
    image: require("../images/person-55.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "26",
    name: "Iago Bocelli",
    degree: "BSc Photography",
    university: "University of Arts, London",
    image: require("../images/person-39.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "27",
    name: "Amanda Hoffmann",
    degree: "BSc Fashion",
    university: "University of Arts, London",
    image: require("../images/person-47.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "28",
    name: "Steven Isaac ",
    degree: "BSc Cyber Security ",
    university: "City, University of London",
    image: require("../images/person-56.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "29",
    name: "Fang Yang ",
    degree: "BSc Petroleum Engineering",
    university: "Imperial College London",
    image: require("../images/person-57.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "30",
    name: "Caroline  Queiroz",
    degree: "BSc Public Relations",
    university: "University of Birgminham",
    image: require("../images/person-58.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "31",
    name: "Stella Artois",
    degree: "BSc Business Management ",
    university: "London School of Economics",
    image: require("../images/person-59.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "32",
    name: "Ji-Hoon Jang",
    degree: "BSc Law",
    university: "King’s College London",
    image: require("../images/person-60.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "33",
    name: "Vicky Simon",
    degree: "BSc Chemistry",
    university: "Imperial College London",
    image: require("../images/person-61.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "34",
    name: "Claudia Benitez",
    degree: "BSc Computer Science",
    university: "City, University of London",
    image: require("../images/person-62.jpg"),
    time: "",
    message: "",
    
  },
  {
    id: "35",
    name: "Sandro Andre",
    degree: "BSc Chemical Engineering",
    university: "University of Bath",
    image: require("../images/person-63.jpg"),
    time: "",
    message: "",
      
  },
  {
    id: "36",
    name: "Alexander Miller",
    degree: "BSc Computer Science",
    university: "University of Cambridge",
    image: require("../images/person-64.jpg"),
    time: "",
    message: "",
      
  },
];

export default dummyMessages;
