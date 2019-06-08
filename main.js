function setCounter() {
    
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