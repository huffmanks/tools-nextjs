export const initialValues = {
    measurement: 'digitalStorage',
    numInput: '',
    unitSelection: 'terabytes',
}

export const measurements = [
    {
        id: 1,
        type: 'digitalStorage',
        label: 'Digital Storage',
        units: [
            {
                id: '1',
                unit: 'terabytes',
                label: 'Terabytes',
                short: 'TB',
            },
            {
                id: '2',
                unit: 'gigabytes',
                label: 'Gigabytes',
                short: 'GB',
            },
            {
                id: '3',
                unit: 'megabytes',
                label: 'Megabytes',
                short: 'MB',
            },
            {
                id: '4',
                unit: 'kilobytes',
                label: 'Kilobytes',
                short: 'KB',
            },
            {
                id: '5',
                unit: 'bytes',
                label: 'Bytes',
                short: 'B',
            },
        ],
    },
    {
        id: 2,
        type: 'length',
        label: 'Length',
        units: [
            {
                id: '1',
                unit: 'miles',
                label: 'Miles',
                short: 'mi',
            },
            {
                id: '2',
                unit: 'yards',
                label: 'Yards',
                short: 'yd',
            },
            {
                id: '3',
                unit: 'feet',
                label: 'Feet',
                short: 'ft',
            },
            {
                id: '4',
                unit: 'inches',
                label: 'Inches',
                short: 'in',
            },
            {
                id: '5',
                unit: 'kilometers',
                label: 'Kilometers',
                short: 'km',
            },
            {
                id: '6',
                unit: 'meters',
                label: 'Meters',
                short: 'm',
            },
            {
                id: '7',
                unit: 'centimeters',
                label: 'Centimeters',
                short: 'cm',
            },
            {
                id: '8',
                unit: 'millimeters',
                label: 'Millimeters',
                short: 'mm',
            },
        ],
    },
    {
        id: 3,
        type: 'volume',
        label: 'Volume',
        units: [
            {
                id: '1',
                unit: 'US liquid gallons',
                label: 'Gallons',
                short: 'gal',
            },
            {
                id: '2',
                unit: 'US liquid quarts',
                label: 'Quarts',
                short: 'qt',
            },
            {
                id: '3',
                unit: 'US liquid pints',
                label: 'Pints',
                short: 'p',
            },
            {
                id: '4',
                unit: 'US legal cups',
                label: 'Cups',
                short: 'c',
            },
            {
                id: '5',
                unit: 'US fluid ounces',
                label: 'Ounces',
                short: 'oz',
            },
            {
                id: '6',
                unit: 'US tablespoons',
                label: 'Tablespoons',
                short: 'tbsp',
            },
            {
                id: '7',
                unit: 'US teaspoons',
                label: 'Teaspoons',
                short: 'tsp',
            },
            {
                id: '8',
                unit: 'liters',
                label: 'Liters',
                short: 'L',
            },
            {
                id: '9',
                unit: 'milliliters',
                label: 'Milliliters',
                short: 'mL',
            },
        ],
    },
    {
        id: 4,
        type: 'temperature',
        label: 'Temperature',
        units: [
            {
                id: '1',
                unit: 'fahrenheit',
                label: 'Fahrenheit',
                short: '°F',
            },
            {
                id: '2',
                unit: 'celsius',
                label: 'Celsius',
                short: '°C',
            },
            {
                id: '3',
                unit: 'kelvin',
                label: 'Kelvin',
                short: '°K',
            },
        ],
    },
    {
        id: 5,
        type: 'time',
        label: 'Time',
        units: [
            {
                id: '1',
                unit: 'years',
                label: 'Years',
                short: 'yr',
            },
            {
                id: '2',
                unit: 'months',
                label: 'Months',
                short: 'mo',
            },
            {
                id: '3',
                unit: 'weeks',
                label: 'Weeks',
                short: 'wk',
            },
            {
                id: '4',
                unit: 'days',
                label: 'Days',
                short: 'd',
            },
            {
                id: '5',
                unit: 'hours',
                label: 'Hours',
                short: 'hr',
            },
            {
                id: '6',
                unit: 'minutes',
                label: 'Minutes',
                short: 'min',
            },
            {
                id: '7',
                unit: 'seconds',
                label: 'Seconds',
                short: 's',
            },
            {
                id: '8',
                unit: 'milliseconds',
                label: 'Milliseconds',
                short: 'ms',
            },
        ],
    },
    {
        id: 6,
        type: 'weight',
        label: 'Weight',
        units: [
            {
                id: '1',
                unit: 'US tons',
                label: 'Tons',
                short: 'ton',
            },
            {
                id: '2',
                unit: 'pounds',
                label: 'Pounds',
                short: 'lbs',
            },
            {
                id: '3',
                unit: 'ounces',
                label: 'Ounces',
                short: 'oz',
            },
            {
                id: '4',
                unit: 'kilograms',
                label: 'Kilograms',
                short: 'kg',
            },
            {
                id: '5',
                unit: 'grams',
                label: 'Grams',
                short: 'g',
            },
            {
                id: '6',
                unit: 'milligrams',
                label: 'Milligrams',
                short: 'mg',
            },
        ],
    },
]
