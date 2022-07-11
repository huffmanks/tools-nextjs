<div id="top"></div>
<br />

<div>
    <h1>Stratools</h1>
    <p>
        List of tools to help speed web development.
        <br />
        <br />
        <a href="https://tools.huffmanks.com">View Demo</a>
        ·
        <a href="https://github.com/huffmanks/tools-nextjs/issues">Report Bug</a>
        ·
        <a href="https://github.com/huffmanks/tools-nextjs/issues">Request Feature</a>
    </p>
    <br />
    <a href="https://tools.huffmanks.com">
        <img src="https://github.com/huffmanks/tools-nextjs/blob/main/public/preview/stratools-preview.png?raw=true" alt="example screenshot">
    </a>
</div>

<br />
<br />

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#instructions">Instructions</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>
<br />

<!-- ABOUT THE PROJECT -->

## About The Project

I wanted to build some tools that would help speed up my development process. A couple of these tools exist on Google but I wanted some extra or different features.
\
\
\
![Color Picker](https://github.com/huffmanks/tools-nextjs/blob/main/public/preview/color-picker-preview.png?raw=true)
\
\
\
[Google Color Picker](https://www.google.com/search?q=color+picker)
\
[Stratools Color Picker](https://tools.huffmanks.com/color-picker)

-   Option to copy any code not just HEX.
-   Similar shades displayed so I could pick lighter/darker versions.

\
\
\
![Unit Converter](https://github.com/huffmanks/tools-nextjs/blob/main/public/preview/unit-converter-preview.png?raw=true)
\
\
\
[Google Unit Converter](https://www.google.com/search?q=unit+converter)
\
[Stratools Unit Converter](https://tools.huffmanks.com/unit-converter)

-   Wanted all the units to be displayed so I could see the differences.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- BUILT WITH -->

## Built With

-   [Next.js](https://nextjs.org/)
-   [MUI](https://mui.com/)
-   [change-case](https://www.npmjs.com/package/change-case)
-   [colord](https://www.npmjs.com/package/colord)
-   [convert](https://www.npmjs.com/package/convert)
-   [react-colorful](https://www.npmjs.com/package/react-colorful)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

1. Clone the repo
    ```sh
    git clone https://github.com/huffmanks/tools-nextjs.git
    ```
2. Install NPM packages
    ```sh
    yarn
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- INSTRUCTIONS -->

## Instructions

### Stratools Unit Converter

BASE_URL = https://tools.huffmanks.com/unit-converter

```http
GET /?m=length&left=in&right=km
```

```http
GET /?m=2&left=4&right=5
```

<br />

| Parameter | Type                               | Description       | Example   |
| :-------- | :--------------------------------- | :---------------- | :-------- |
| `m`       | `string` &nbsp; OR &nbsp; `number` | Measurement types | length, 2 |
| `left`    | `string` &nbsp; OR &nbsp; `number` | Left unit select  | in, 4     |
| `right`   | `string` &nbsp; OR &nbsp; `number` | Right unit select | km, 5     |

<br />

The string can be any variant of the word. i.e. kilometers, kilo, km, etc.

<br />

### Digital Storage

| Unit      | Short |
| :-------- | :---- |
| terabytes | TB    |
| gigabytes | GB    |
| megabytes | MB    |
| kilobytes | KB    |
| bytes     | B     |

<br />

### Length

| Unit        | Short |
| :---------- | :---- |
| miles       | mi    |
| yards       | yd    |
| feet        | ft    |
| inches      | in    |
| kilometers  | km    |
| meters      | m     |
| centimeters | cm    |
| millimeters | mm    |

<br />

### Volume

| Unit              | Short |
| :---------------- | :---- |
| US liquid gallons | gal   |
| US liquid quarts  | qt    |
| US liquid pints   | p     |
| US legal cups     | c     |
| US fluid ounces   | oz    |
| US tablespoons    | tbsp  |
| US teaspoons      | tsp   |
| liters            | L     |
| milliliters       | mL    |

<br />

### Temperature

| Unit       | Short |
| :--------- | :---- |
| celsius    | C     |
| fahrenheit | F     |
| kelvin     | K     |

<br />

### Time

| Unit         | Short |
| :----------- | :---- |
| years        | yr    |
| months       | mo    |
| weeks        | wk    |
| days         | d     |
| hours        | hr    |
| minutes      | min   |
| seconds      | s     |
| milliseconds | ms    |

<br />

### Weight

| Unit       | Short |
| :--------- | :---- |
| US tons    | ton   |
| pounds     | lbs   |
| ounces     | oz    |
| kilograms  | kg    |
| grams      | g     |
| milligrams | mg    |

<br />

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

-   [x] Aspect Ratio Calculator
    -   [ ] Error validation
-   [x] Color Picker
-   [x] Unit Converter
    -   [ ] Better layout
-   [x] Email Signature
-   [x] Text formatter
-   [ ] Password generator
-   [ ] Number picker
    -   [ ] Get a random number
    -   [ ] Get a random number from a list of numbers
    -   [ ] Get multiple numbers from a list of numbers

\
\
See the [open issues](https://github.com/huffmanks/tools-nextjs/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Kevin Huffman - huff9121@gmail.com

Project Link: [https://tools.huffmanks.com](https://tools.huffmanks.com)

<p align="right">(<a href="#top">back to top</a>)</p>
