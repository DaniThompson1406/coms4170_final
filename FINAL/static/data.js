// static/data.js

const ingredients = [
    { name: "Milk"},
    { name: "Ground Coffee"},
    { name: "Matcha Powder"},
    { name: "Steam Wand"},
    { name: "Hojicha Powder"},
    { name: "Hot Water"},
    { name: "Chai Powder"},
    { name: "Whisk"}
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
        dosage: [], hasRecipe: false, isUnlocked: false, recipe: [] },

    { name: "Espresso", combo: ["Ground Coffee", "Hot Water"], tool: [], 
        dosage: [], hasRecipe: false, isUnlocked: false },

    { name: "Macchiato", combo: ["Steamed Milk", "Espresso"], tool: [], 
        dosage: ["fill in here"], hasRecipe: true, isUnlocked: false, recipe: ["1. fill in here", "2. fill in here"] }, //make sure each item has an associated dosage

    { name: "Matcha Latte", combo: ["Matcha Powder", "Steamed Milk", "Hot Water"], tool: ["Whisk"], 
        dosage: ["3g", "6oz", "2oz"], hasRecipe: true, isUnlocked: false, recipe: ["1. Whisk 3g of matcha powder with 2oz of water.", "2. Combine with 6oz of your favorite milk."] },

    { name: "Latte", combo: ["Espresso", "Steamed Milk"], tool: [],
        dosage: ["36g", "4oz"], hasRecipe: true, isUnlocked: false, recipe: ["1. Pull a shot of espresso with 18g of ground coffee.", "2. Combine with 4oz of your favorite milk."] },

    { name: "Cappuccino", combo: ["Espresso", "Steamed Milk"], tool: [], 
        dosage: ["fill in here"], hasRecipe: true, isUnlocked: false, recipe: ["1. Whisk 3g of hojicha powder with 2oz of water.", "2. Combine with 6oz of your favorite milk."] },

    { name: "Chai Latte", combo: ["Chai Powder", "Steamed Milk", "Hot Water"], tool: ["Whisk"], 
        dosage: ["fill in here"], hasRecipe: true, isUnlocked: false },

    { name: "Hojicha Latte", combo: ["Hojicha Powder", "Steamed Milk", "Hot Water"], tool: ["Whisk"], 
        dosage: ["3g", "6oz", "2oz"], hasRecipe: true, isUnlocked: false },

    { name: "Flat White", combo: ["Espresso", "Steamed Milk"], tool: [], 
        dosage: ["fill in here"], hasRecipe: true, isUnlocked: false }
];
