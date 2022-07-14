<div id="top"></div>
<br />

<div>
  <a href="https://tools.huffmanks.com">
        <img src="./public/logos/stratools-banner.png" alt="example screenshot">
    </a>
    <p>
        Tools to help speed the web development process.
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
  </ol>
</details>
<br />

<!-- ABOUT THE PROJECT -->

## About The Project

I built these tools to help speed my development process.
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
| `from`    | `string` &nbsp; OR &nbsp; `number` | Left unit select  | in, 4     |
| `to`      | `string` &nbsp; OR &nbsp; `number` | Right unit select | km, 5     |

<br />

The string can be any variant of the word. i.e. kilometers, kilo, km, etc.

<br />

<table>
    <thead>
        <tr>
            <th>Digital Storage</th>
            <th>Temperature</th>
            <th>Weight</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <table>
                    <tbody>
                        <tr>
                            <th>Unit</th>
                            <th>Short</th>
                        </tr>
                        <tr>
                            <td>terabytes</td>
                            <td>TB</td>
                        </tr>
                        <tr>
                            <td>gigabytes</td>
                            <td>GB</td>
                        </tr>
                        <tr>
                            <td>megabytes</td>
                            <td>MB</td>
                        </tr>
                        <tr>
                            <td>kilobytes</td>
                            <td>KB</td>
                        </tr>
                        <tr>
                            <td>bytes</td>
                            <td>B</td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td>
                <table>
                    <tbody>
                        <tr>
                            <th>Unit</th>
                            <th>Short</th>
                        </tr>
                        <tr>
                            <td>celsius</td>
                            <td>C</td>
                        </tr>
                        <tr>
                            <td>fahrenheit</td>
                            <td>F</td>
                        </tr>
                        <tr>
                            <td>kelvin</td>
                            <td>K</td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td>
                <table>
                    <tbody>
                        <tr>
                            <th>Unit</th>
                            <th>Short</th>
                        </tr>
                        <tr>
                            <td>US tons</td>
                            <td>ton</td>
                        </tr>
                        <tr>
                            <td>pounds</td>
                            <td>lbs</td>
                        </tr>
                        <tr>
                            <td>ounces</td>
                            <td>oz</td>
                        </tr>
                        <tr>
                            <td>kilograms</td>
                            <td>kg</td>
                        </tr>
                        <tr>
                            <td>grams</td>
                            <td>g</td>
                        </tr>
                        <tr>
                            <td>milligrams</td>
                            <td>mg</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>

<br />

<table>
    <thead>
        <tr>
            <th>Length</th>
            <th>Volume</th>
            <th>Time</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <table>
                    <tbody>
                        <tr>
                            <th>Unit</th>
                            <th>Short</th>
                        </tr>
                        <tr>
                            <td>miles</td>
                            <td>mi</td>
                        </tr>
                        <tr>
                            <td>yards</td>
                            <td>yd</td>
                        </tr>
                        <tr>
                            <td>feet</td>
                            <td>ft</td>
                        </tr>
                        <tr>
                            <td>inches</td>
                            <td>in</td>
                        </tr>
                        <tr>
                            <td>kilometers</td>
                            <td>km</td>
                        </tr>
                        <tr>
                            <td>meters</td>
                            <td>m</td>
                        </tr>
                        <tr>
                            <td>centimeters</td>
                            <td>cm</td>
                        </tr>
                        <tr>
                            <td>millimeters</td>
                            <td>mm</td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td>
                <table>
                    <tbody>
                        <tr>
                            <th>Unit</th>
                            <th>Short</th>
                        </tr>
                        <tr>
                            <td>US liquid gallons</td>
                            <td>gal</td>
                        </tr>
                        <tr>
                            <td>US liquid quarts</td>
                            <td>qt</td>
                        </tr>
                        <tr>
                            <td>US liquid pints</td>
                            <td>p</td>
                        </tr>
                        <tr>
                            <td>US legal cups</td>
                            <td>c</td>
                        </tr>
                        <tr>
                            <td>US fluid ounces</td>
                            <td>oz</td>
                        </tr>
                        <tr>
                            <td>US tablespoons</td>
                            <td>tbsp</td>
                        </tr>
                        <tr>
                            <td>US teaspoons</td>
                            <td>tsp</td>
                        </tr>
                        <tr>
                            <td>liters</td>
                            <td>L</td>
                        </tr>
                        <tr>
                            <td>milliliters</td>
                            <td>mL</td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td>
                <table>
                    <tbody>
                        <tr>
                            <th>Unit</th>
                            <th>Short</th>
                        </tr>
                        <tr>
                            <td>years</td>
                            <td>yr</td>
                        </tr>
                        <tr>
                            <td>months</td>
                            <td>mo</td>
                        </tr>
                        <tr>
                            <td>weeks</td>
                            <td>wk</td>
                        </tr>
                        <tr>
                            <td>days</td>
                            <td>d</td>
                        </tr>
                        <tr>
                            <td>hours</td>
                            <td>hr</td>
                        </tr>
                        <tr>
                            <td>minutes</td>
                            <td>min</td>
                        </tr>
                        <tr>
                            <td>seconds</td>
                            <td>s</td>
                        </tr>
                        <tr>
                            <td>milliseconds</td>
                            <td>ms</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>

<br />

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

-   [x] Aspect Ratio Calculator
-   [x] Color Picker
-   [x] Unit Converter
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

Project Link: [https://tools.huffmanks.com](https://tools.huffmanks.com)

<p align="right">(<a href="#top">back to top</a>)</p>
