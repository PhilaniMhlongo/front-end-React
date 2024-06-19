# React 
to start a create a React application you have to say
```shell
npx create-react-app my-app

```
to start the server
```shell
npm start
```


## Introduction to code Sand box
codesandbox.io

### html
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>JSX</title>
        <link rel="stylesheet" href="styles.css">
    </head>

    <body>
    <div id="root"></div>
    <script src="../src/index.js" type="text/JSX"></script>
    </body>

</html>  
```
## JXS
All of our code will be written in `index.js` file
```javascript
// var React =require("react");
// //Inorder to use packages in react we have to require them
// var ReactDOM =require("react-dom");
import React from "react";
import ReactDOM from "react-dom";

//ReactDOM.render(WHAT TO SHOW,WHERE TO SHOW IT)
ReactDOM.render(<h1> Hello World<h1>,document.getElementById("root" ));
// we injected html to our website
    
//     Since render can only impose one HTML element, we can use a trick by puting it all into a div 
    ReactDOM.render(
    <div>
    <h1> Hello World<h1> 
        <p>This is a paragraph</p>
    </div>,
        document.getElementById("root" ));    

```

## JXS Code Practice

```javascript

import React from "react";
import ReactDOM from "react-dom";

 ReactDOM.render(
    <div>
    <h1> My Top 5 Games<h1>
        <ul>
        <li>GTA 5</li>
        <li>Ori</li>
        <li>Cyberpunk 2077</li>
        <li>Diablo 4</li>
        <li>State of Decay 2</li>
            </ul>
    </div>,
        document.getElementById("root" ));    

```

## Javascript Expression in JSX
If We want to use constant
We have injet javastript into html by using {} but it only expression not statement

```javascript

import React from "react";
import ReactDOM from "react-dom";

const name = "Philani";
const last="Philani";
const number=7;
 ReactDOM.render(
    <div>
    // <h1> Hello {name} {last}<h1>
        <h1> Hello {`${name} ${last}`}<h1> //Using ES6 
      <p> My lucky number is {number}</p>
    </div>,
        document.getElementById("root" ));    

```

## Javascript Expression in JSX Practice

// create a react app from scratch
// it should display 2 paragraph of html elements
// the paragraph should say:
//Created by YOURNAME
// Copyright CurrentYear
```javascript
import React from "react";
import ReactDOM from "react-dom";

const YourName="Philani";
const year= new Date().getFullYear();

ReactDOM.render(
    <div>
        <p>Created by {YourName}</p>
        <p>Copyright {year}</p>
    </div>,
    document.getElementById("root")
)
```

## JSX Attributes and Styling React Elements

```javascript
import React from "react";
import ReactDOM from "react-dom";
// when writing attribute from html you have to make them carmel case
ReactDOM.render(
    <div>
        <h1 className="heading"> My Favourite Foods</h1>
            <ul>
                <li>Pasta</li>
                <li>Becon</li>
                <li>Amasi<li>
            </ul>
    </div>,
    document.getElementById("root")
);
```
styles.css
```css

// to style a header in css we have to create a class in html

.heading{
    color: aquamarine;
}
ul{
    color: red; 
}

.food-img{
    height: 100px;
    width: 100px;
}

```

#### Challege for JSX Attributes and Styling React Elements
```javascript
import React from "react";
import ReactDOM from "react-dom";
// when writing attribute from html you have to make them carmel case
const img="https://picsum.photos/200"
ReactDOM.render(
    <div>
        <h1 className="heading"> My Favourite Foods</h1>
        <div>
            <img className="food-img" src="Pasta"></img>
            <img className="food-img" src="Becon"></img>
            <img className="food-img" src="Amasi"></img>
            <img className="food-img" src={img}></img>
        </div>
    </div>,
    document.getElementById("root")
);
```


### Inline styles
```javascript

import React from "react";
import ReactDOM from "react-dom";

// javastript object are key-value pair {key: value}
const customStyle={
    color: "red", 
    fontSize: "20px",
    border: "1px solid black"
}

customStyle.color="blue" // inline styling change on the go

ReactDOM.render(<h1 style={{color: "red"}}> Hello World<h1>,document.getElementById("root" ));
 

```

### React Inline styles

//Create a react app from sctrach
// Show a single that says "Good morning" if it between midnight and 12pm
// or "Good Afternoon" if between 12:PM amd 4:pm
//or "Good evening" if between 6PM and midnight\
// Apply the "heading" style in the css
// Dynmincally change the color of h1 using inline can style
// Morining=red, Afternoon=green , Night=blue

```javascript

```

