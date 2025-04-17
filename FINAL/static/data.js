// static/data.js

const ingredients = [
    { name: "Milk", emoji: "🥛" },
    { name: "Coffee", emoji: "☕" },
    { name: "Matcha", emoji: "🍵" },
    { name: "Steamer", emoji: "🛠️" }
];

let unlockedRecipes = [];

const recipes = [
    { name: "Steamed Milk", combo: ["Milk", "Steamer"] },
    { name: "Macchiato", combo: ["Milk", "Coffee"] },
    { name: "Matcha Latte", combo: ["Matcha", "Milk"] },
    { name: "Latte", combo: ["Espresso", "Milk"] },
    { name: "Cappuccino", combo: ["Espresso", "Milk"] },
    { name: "Chai Latte", combo: ["Chai", "Milk"] },
    { name: "Hojicha Latte", combo: ["Hojicha", "Milk"] },
    { name: "Flat White", combo: ["Espresso", "Milk"] }
];
