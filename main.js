// Set up a new odometer for current price.
// Workaround for nonfunctional odometer.js options >:(
function setUpCurrentPriceOdometer() {
    let el = document.getElementById("order-current-price");
    let od = new Odometer({
        el: el,
        format: '(,ddd).ddd'
    });
    el.innerText = 9.999; // Workaround for odometer.
}

// Set up a new odometer for target price.
// Workaround for nonfunction odometer.js options >:(
function setUpTargetPriceOdometer(target_price) {
    let el = document.getElementById("order-target-price");
    let od = new Odometer({
        el: el,
        format: '(,ddd).ddd'
    });
    el.innerHTML = target_price / 100.0 + 0.001; // Workaround for odometer.
}

// Sets target price to revealed or not.
function setTargetPriceVisibility(revealed, target_price) {
    if (revealed) {
        document.getElementById("order-target-price-unknown").style.display = "none";
        document.getElementById("order-target-price-header").style.display = "inline";
        document.getElementById("order-target-price").style.display = "inline-block";
        setUpTargetPriceOdometer(target_price);
    } else {
        document.getElementById("order-target-price-unknown").style.display = "inline";
        document.getElementById("order-target-price-header").style.display = "none";
        document.getElementById("order-target-price").style.display = "none";
    }
}

// Creates a new order and sets up all of the counters and such.
function makeNewOrder() {
    // Get a new order between the defined wing range.
    let MIN_WINGS = 10;
    let MAX_WINGS = 400;
    let SMALLER_BIAS = 2; // Exponent, to weight rng towards smaller numbers.
    
    let adj_random = Math.pow(Math.random(), SMALLER_BIAS);
    var target_wings = Math.floor(adj_random * (MAX_WINGS - MIN_WINGS + 1) ) + MIN_WINGS;

    // Set target and current counters to target and 0, respectively.
    document.getElementById("order-target-wings-number").innerHTML = target_wings;
    document.getElementById("order-current-wings-number").innerHTML = 0;

    // Reset pricing information.
    document.getElementById("order-target-price").innerHTML = "???";
    document.getElementById("order-current-price").innerHTML = "0.001";

    // Reset message.
    document.getElementById("order-message-number").innerHTML = target_wings;

    // Reset button status.
    setCheckButtonStatus(false);

    // Return target.
    return target_wings;
}

// Sets order information.
// Note: takes in current cost in cents.
function setCurrentOrder(current_wings, current_cost) {
    document.getElementById("order-current-wings-number").innerHTML = current_wings;
    let display_value = parseFloat((current_cost / 100.0).toFixed(2) + "1");
    document.getElementById("order-current-price").innerHTML = display_value;
}

// Sets button status.
function setCheckButtonStatus(enabled) {
    let check_button = document.getElementById("order-button-check");
    if (enabled) {
        check_button.disabled = false;
        check_button.innerText = "I think I got it"
    } else {
        check_button.disabled = true;
        check_button.innerText = "Not enough wings"
    }
}

// Rebuilds all of the handy clickable menu items.
function rebuildMenuItems(menu_cost, update_function) {
    // Array to handily store these items.
    var current_order = [];

    // Delete the buttons.
    let container = document.getElementById("button-container");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Create new buttons.
    for (row of menu_cost) {
        current_order.push(createMenuItem(parseInt(row.wings, 10), parseInt(row.cost), update_function));
    }

    return current_order;
}

// Creates an individual menu item.
function createMenuItem(wings, cost, update_function) {
    // Get and copy template.
    var menuItem = document.getElementById("menu-item-template");
    var clone = menuItem.cloneNode(true); // Make copy.
    clone.id = "menu-item-" + wings; // Rename copy to be unique.
    clone.style.display="block"; // Make copy visible.

    // Set display texts.
    var wing_element = clone.children.namedItem("wing-");
    wing_element.innerHTML = wings + " wings";
    var cost_element = clone.children.namedItem("cost-");
    cost_element.innerHTML = "$" + (cost/100).toFixed(2);

    // Step function and callback variant.
    function button_step(step) {
        let MIN_ORDER_QUANTITY = 0;
        let MAX_ORDER_QUANTITY = 25;
        let check_val = parseInt(clone.querySelectorAll('[id^="user-"]')[0].innerHTML, 10) + step;
        if (MIN_ORDER_QUANTITY <= check_val && check_val <= MAX_ORDER_QUANTITY) {
            clone.querySelectorAll('[id^="user-"]')[0].innerHTML = check_val;
            if (check_val > 0) {
                clone.style.color = "black";
            } else {
                clone.style.color = "darkgray";
            }
        }
        update_function();
    }

    // Set callbacks.
    var decrement_button = clone.querySelectorAll('[id^="decrement-button"]')[0];
    decrement_button.onclick = function() { return button_step(-1); };
    var increment_button = clone.querySelectorAll('[id^="increment-button-"]')[0];
    increment_button.onclick = function() { return button_step(1); };

    // Create a handy container item.
    let button_item = {
        wings: wings,
        cost: cost,
        current: clone.querySelectorAll('[id^="num-"]')[0]
    };

    // Rename all children to be unique.
    increment_button.id += wings;
    decrement_button.id += wings;
    for (let item of clone.children.namedItem("action-container-")
                            .children.namedItem("num-").children) {
        item.id += wings;
    }
    for (let item of clone.children.namedItem("action-container-").children) {
        item.id += wings;
    }
    for (let item of clone.children) {
        item.id += wings;
    }

    // Add it to the DOM.
    document.getElementById("button-container").appendChild(clone)

    return button_item;
}

// When you truly, absolutely need a test function that runs
// and will let you know in no uncertain terms that it runs :)
function ding() {
    console.log("ding-a-ling!!");
    window.alert("ding-a-ling!!");
}