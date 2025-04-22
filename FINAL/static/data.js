// static/data.js

const ingredients = [
    { name: "Milk", img: "https://raw.githubusercontent.com/olivia-long127/coms4170_final/9e297d423cab1c01fadea5f7f92af61f5cc22507/FINAL/static/milk.jpg" },
    { name: "Ground Coffee", img: "https://raw.githubusercontent.com/olivia-long127/coms4170_final/9e297d423cab1c01fadea5f7f92af61f5cc22507/FINAL/static/ground_coffee.jpg"},
    { name: "Matcha Powder", img: "https://raw.githubusercontent.com/olivia-long127/coms4170_final/9e297d423cab1c01fadea5f7f92af61f5cc22507/FINAL/static/matcha_powder.jpg"},
    { name: "Steam Wand", img: "https://raw.githubusercontent.com/olivia-long127/coms4170_final/9e297d423cab1c01fadea5f7f92af61f5cc22507/FINAL/static/steam_wand.jpg"},
    { name: "Hojicha Powder", img: "https://raw.githubusercontent.com/olivia-long127/coms4170_final/9e297d423cab1c01fadea5f7f92af61f5cc22507/FINAL/static/hojicha_powder.jpg"},
    { name: "Hot Water", img: "https://raw.githubusercontent.com/olivia-long127/coms4170_final/refs/heads/main/FINAL/static/hot_water.jpg"},
    { name: "Chai Powder", img: "https://raw.githubusercontent.com/olivia-long127/coms4170_final/9e297d423cab1c01fadea5f7f92af61f5cc22507/FINAL/static/chai_powder.jpg"},

];



let unlockedRecipes = [];
const unlockedAll = 7;

/* Notes for Daniel:

Created unlockedAll variable to test the length of unlockedRecipes -- only when length = unlockedAll should the user
be able to access the quiz/learning elements + proceed from the simulator.

Separated ingredients from tools with combo + tool list. I believe this would simplify the quiz, and it
would avoid the scenario in which we iterate through the combo + dosage lists and access a null reference
(since if a whisk was added to the combo list, it would make the lengths of the lists mismatched).

Created the hasRecipe variable so we don't have to quiz users on steamed milk and espresso -- it would be unnecessary.

When hasRecipe and isUnlocked are both true, we will move the recipe to the unlockedRecipes list. Which is great,
since steamed milk and espresso won't be included.

As mentioned above, the dosage and combo lists must be the same length.

Additionally, please enumerate within the recipe list -- we don't want to figure out auto-enumerating. We should put each
list item into a bootstrap row.

*/

const recipes = [
    { name: "Steamed Milk", combo: ["Milk"], tool: ["Steam Wand"], 
        dosage: [], hasRecipe: false, isUnlocked: false, recipe: [], img: "https://raw.githubusercontent.com/olivia-long127/coms4170_final/refs/heads/main/FINAL/static/steamed_milk.jpg" },

    { name: "Espresso", combo: ["Ground Coffee", "Hot Water"], tool: [], 
        dosage: [], hasRecipe: false, isUnlocked: false, 
        img: "https://raw.githubusercontent.com/olivia-long127/coms4170_final/refs/heads/main/FINAL/static/espresso.jpg" },

    { name: "Macchiato", combo: ["Steamed Milk", "Espresso"], tool: [], 
        dosage: ["fill in here"], hasRecipe: true, isUnlocked: false, recipe: ["1. fill in here", "2. fill in here"],
    img: "" }, //make sure each item has an associated dosage

    { name: "Matcha Latte", combo: ["Matcha Tea", "Steamed Milk"], tool: [], 
        dosage: ["3g", "6oz", "2oz"], hasRecipe: true, isUnlocked: false, recipe: ["1. Whisk 3g of matcha powder with 2oz of water.", "2. Combine with 6oz of your favorite milk."],
        img: "https://raw.githubusercontent.com/olivia-long127/coms4170_final/9e297d423cab1c01fadea5f7f92af61f5cc22507/FINAL/static/matcha.jpg"},

    { name: "Matcha Tea", combo: ["Matcha Powder", "Hot Water"], tool: ["Whisk"],
            dosage: ["fill in here"], hasRecipe: false, isUnlocked: false, 
            img: "https://raw.githubusercontent.com/olivia-long127/coms4170_final/refs/heads/main/FINAL/static/matcha_tea.jpg" },

    { name: "Latte", combo: ["Espresso", "Steamed Milk"], tool: [],
        dosage: ["36g", "4oz"], hasRecipe: true, isUnlocked: false, recipe: ["1. Pull a shot of espresso with 18g of ground coffee.", "2. Combine with 4oz of your favorite milk."],
    img: "https://raw.githubusercontent.com/olivia-long127/coms4170_final/9e297d423cab1c01fadea5f7f92af61f5cc22507/FINAL/static/latte_lightest.jpg" },

    { name: "Cappuccino", combo: ["Espresso", "Steamed Milk"], tool: [], 
        dosage: ["fill in here"], hasRecipe: true, isUnlocked: false, recipe: ["1. Whisk 3g of hojicha powder with 2oz of water.", "2. Combine with 6oz of your favorite milk."] },

    { name: "Chai Latte", combo: ["Chai", "Steamed Milk"], tool: [], 
        dosage: ["fill in here"], hasRecipe: true, isUnlocked: false, 
        img: "https://raw.githubusercontent.com/olivia-long127/coms4170_final/refs/heads/main/FINAL/static/chai_light.jpg" },

    { name: "Chai", combo: ["Chai Powder", "Hot Water"],  tool: ["Whisk"],
            dosage: ["fill in here"], hasRecipe: false, isUnlocked: false,
    img: "https://raw.githubusercontent.com/olivia-long127/coms4170_final/refs/heads/main/FINAL/static/chai_tea.jpg" },

    { name: "Hojicha Latte", combo: ["Hojicha Tea", "Steamed Milk"], tool: [], 
        dosage: ["3g", "6oz", "2oz"], hasRecipe: true, isUnlocked: false,
    img: "https://raw.githubusercontent.com/olivia-long127/coms4170_final/9e297d423cab1c01fadea5f7f92af61f5cc22507/FINAL/static/hojicha_light.jpg"},

    { name: "Hojicha Tea", combo: ["Hojicha Powder", "Hot Water"],  tool: ["Whisk"],
            dosage: ["fill in here"], hasRecipe: false, isUnlocked: false, 
    img: "https://raw.githubusercontent.com/olivia-long127/coms4170_final/refs/heads/main/FINAL/static/hojicha_tea.jpg" },

    { name: "Flat White", combo: ["Espresso", "Steamed Milk"], tool: [], 
        dosage: ["fill in here"], hasRecipe: true, isUnlocked: false }
];