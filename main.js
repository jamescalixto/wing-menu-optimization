function makeNewOrder() {
    // Get a new order between the defined wing range.
    let MIN_WINGS = 10;
    let MAX_WINGS = 400;
    var num_wings = Math.floor(Math.random() * (MAX_WINGS - MIN_WINGS + 1) ) + MIN_WINGS;

    // Set target and current counters to target and 0, respectively.
    document.getElementById("order-target-wings-number").innerHTML = num_wings;
    document.getElementById("order-current-wings-number").innerHTML = 0;

    // Reset pricing information.
    document.getElementById("order-target-price").innerHTML = "???";
    document.getElementById("order-current-price").innerHTML = "$0.00";

    // Reset message.
    document.getElementById("order-message-number").innerHTML = num_wings;
}

function buildMenuItems(menu_cost) {
    for (row of menu_cost) {
        createMenuItem(parseInt(row.wings, 10), parseFloat(row.cost));
    }
}

function createMenuItem(wings, cost) {
    var menuItem = document.getElementById("menu-item-template");

    var clone = menuItem.cloneNode(true); // Make copy.
    clone.id = "menu-item-" + wings; // Rename copy to be unique.
    clone.style.display="block"; // Make copy visible.

    // Set display texts.
    wing_element = clone.children.namedItem("wing-");
    wing_element.innerHTML = wings + " wings";
    
    cost_element = clone.children.namedItem("cost-");
    cost_element.innerHTML = "$" + cost.toFixed(2);

    // Rename all children to be unique.
    for (let item of clone.children) {
        item.id += wings;
    }

    document.getElementById("button-container").appendChild(clone)
}

function ding() {
    console.log("ding-a-ling!!");
    window.alert("ding-a-ling!!");
}