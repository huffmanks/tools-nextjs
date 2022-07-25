<div id="top"></div>
<br />

<div>
  <a href="https://tools.huffmanks.com">
        <img src="./public/logos/stratools-stacked.png" alt="example screenshot">
    </a>
    <p>
    <br />
        Tools to help speed the web development process.
        <br />
        <br />
        <a href="https://tools.huffmanks.com">View Demo</a>
        ·
        <a href="https://github.com/huffmanks/tools-nextjs/issues">Report Bug</a>
        ·
        <a href="https://github.com/huffmanks/tools-nextjs/issues">Request Feature</a>
    </p>

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

<br />

### Color Picker

![Color Picker](https://github.com/huffmanks/tools-nextjs/blob/main/public/readme/color-picker.png?raw=true)

[Google Color Picker](https://www.google.com/search?q=color+picker)
\
[Stratools Color Picker](https://tools.huffmanks.com/picker/color)

-   Option to copy any code not just HEX.
-   Similar shades displayed so I could pick lighter/darker versions.

<br />

### Unit Calculator

![Unit Calculator](https://github.com/huffmanks/tools-nextjs/blob/main/public/readme/unit-calculator.png?raw=true)

[Google Unit Calculator](https://www.google.com/search?q=unit+converter)
\
[Stratools Unit Calculator](https://tools.huffmanks.com/calculate/units)

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

### Stratools Unit Calculator

BASE_URL = https://tools.huffmanks.com/calculate/units

#### Query params

```
/?type=length&num=3&unit=kilometer
```

```
/?t=len&n=3&u=km
```

```
/?t=2&n=3&u=5
```

All three of these examples get the same result.

<br />

| Parameter     | Type                 | Description       | Example   |
| :------------ | :------------------- | :---------------- | :-------- |
| `type` OR `t` | `string` OR `number` | Measurement types | length, 2 |
| `num` OR `n`  | `number`             | Number to compare | 4         |
| `unit` OR `u` | `string` OR `number` | Unit to select    | km, 5     |

<br />

The string can be any variant of the word. i.e. kilometers, kilo, km, etc.

<br />

<table>
    <thead>
        <tr>
            <th>Digital Storage, type=1</th>
            <th>Temperature, type=4</th>
            <th>Weight, type=6</th>
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
            <th>Length, type=2</th>
            <th>Volume, type=3</th>
            <th>Time, type=5</th>
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
-   [x] Unit Calculator
-   [x] Email Signature
-   [x] Text Formatter
-   [x] Password Generator
-   [ ] Random Picker
    -   [x] Get random number(s) from a number range
    -   [ ] Pick a random item from a list
-   [ ] Todo/shopping list
-   [ ] Calculator
-   [ ] Keyboard shortcuts

\
\
See the [open issues](https://github.com/huffmanks/tools-nextjs/issues) for a full list of proposed features (and known issues).

Project Link: [https://tools.huffmanks.com](https://tools.huffmanks.com)

<p align="right">(<a href="#top">back to top</a>)</p>
