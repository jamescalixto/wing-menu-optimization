# wing-menu-optimization
Repository for everything related to my [wing menu optimization](https://jamescalixto.com/wing-ordering/) project. Check it out there!

## Background
Inspired by the image in `img/meme.png`. There was, somewhere on this planet at some point in time, a restaurant with an unusual wing menu. This sparked a lot of internet conversation about how to order wings most efficiently, although all the analysis I could find only went as far as to find average prices and marginal price differences and such. It seems that nobody who knew about linear optimization saw that menu or bothered to comment, so I developed this to satisfy my own curiosity.

## Directories and files
### `ampl_solver`
This directory holds the files responsible for solving the integer optimization problem. In order to run this, you'll need both an AMPL installation and a Python 3 installation. (AMPL is a great linear/integer optimization solver, for which the personal edition is free.) Run the `solver.py` script and it should output an `optimal_wings.csv` file containing the optimal wing orders for a specified range of orders.

### `data`
This directory holds `optimal_wings.csv` for the final project as well as `menu_cost.csv`, the transcribed cost of menu items from the original image.

### `helper`
This directory holds the third-party `papaparse.js` and `odometer.js` files for file reading and number formatting. Refer to the documentation for [Papa Parse](https://www.papaparse.com/) and [odometer.js](https://github.com/HubSpot/odometer) for more.

### `img`
This directory holds the favicon for returning to my website ([check it out](https://jamescalixto.com/), it's great) and the original image of the menu, since the account that first tweeted it is now suspended.

### `main.html`, `main.js`, `styles.css`
These three files make up the main body of the project and are the visible segments of [the project on my website](https://jamescalixto.com/wing-ordering/).