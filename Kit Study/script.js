//IMPORTS

//import the arrays of strings containing data of Splatoon weapons elements
import { weapons,subs,specials,wclasses } from './weapons.js';

//CLASSES

//
//Sub weapon object used to represent a sub weapon
//
class Sub{
    //constructor filled with a name of string
    constructor(name) {
        this.name = name;
        this.imgSrc = "img/Sub Weapons/"+name+".png";
        this.imgHTML = "<img src=\""+this.imgSrc+"\" onclick=\"subClick('"+this.name+"')\">";
    }

    //get name function
    getName() {return this.name;}

    //get imgSrc function
    getImgSrc() {return this.imgSrc;}

    //get imgHTML function
    getImgHTML() {return this.imgHTML;}

    //an equals function that returns whether a sub weapons object is
    //equal to this one
    equals(sub) {return sub.getName() == this.name;}
}

//
//Special weapon object used to represent a special weapon
//
class Special{
    //constructor filled with a name of string
    constructor(name) {
        this.name = name;
        this.imgSrc = "img/Special Weapons/"+name+".png";
        this.imgHTML = "<img src=\""+this.imgSrc+"\" onclick=\"specialClick('"+this.name+"')\">"
    }

    //get name function
    getName() {return this.name;}

    //get imgSrc function
    getImgSrc() {return this.imgSrc;}

    //get imgHTML function
    getImgHTML() {return this.imgHTML;}

    //an equals function that returns whether a special weapon object is
    //equal to this one
    equals(special) {return special.getName() == this.name;}
}

//
//Weapon class object used to represent a weapon class
//
class WClass{
    //constructor filled with a name of string
    constructor(name) {
        this.name = name;
        this.imgSrc = "img/Weapon Classes/"+name+".png";
        this.imgHTML = "<img src=\""+this.imgSrc+"\" onclick=\"wclassClick('"+this.name+"')\">"
    }

    //get name function
    getName() {return this.name;}

    //get imgSrc function
    getImgSrc() {return this.imgSrc;}

    //get imgHTML function
    getImgHTML() {return this.imgHTML;}

    //equals function that returns whether a weapon class object is
    //equal to this one
    equals(wclass) {return wclass.getName() == this.name;}
}

//
//Weapon object used to represent a weapon
//
class Weapon {
    //constructor fille with array of weapon name, sub name, special name,
    //and weapon class name
    constructor(arr) {
        this.name = arr.name;
        this.sub = new Sub(arr.sub);
        this.special = new Special(arr.special);
        this.wclass = new WClass(arr.wclass);
        this.imgSrc = "img/Main Weapons/"+arr.name+".png";
        this.imgHTML = "<img src=\""+this.imgSrc+"\" onclick=\"weaponClick("+arr.id+")\">";
    }

    //get name function
    getName() {return this.name;}

    //get sub function
    getSub() {return this.sub;}

    //get special function
    getSpecial() {return this.special;}

    //get weapon class function
    getWClass() {return this.wclass;}

    //get imgSrc function
    getImgSrc() {return this.imgSrc;}

    //get imgHTML function
    getImgHTML() {return this.imgHTML;}

    //equals function the returns whether a weapon object is
    //equal to this one
    equals(weapon) {return weapon.getName() == this.name;}
}

//CONSTANTS

//an array of all weapons
const allWeapons = [];
for (const weapon of weapons) {
    allWeapons.push(new Weapon(weapon));
}

//an array of all sub weapons
const allSubs = [];
for (const sub of subs) {
    allSubs.push(new Weapon(sub));
}

//an array of all special weapons
const allSpecials = [];
for (const special of specials) {
    allSpecials.push(new Special(special));
}

//an array of all weapon classes
const allWClasses = [];
for (const wclass of wclasses) {
    allWClasses.push(new WClass(wclass));
}

//VARIABLES

//integer variable for the current page that's being displayed
let page=0;
//current weapon being tested for the kit tester
let kitTesterWeapon;
//current wepaon being tested for the weapon tester
let weaponTesterWeapon;

document.getElementById('specWeaponMenu').style.display="none";

//FUNCTIONS

//for when a weapon image from a list is clicked
function weaponClick(id) {
    const weapon = allWeapons[id];
    //do things with clicked weapon
    console.log("Here are the weapons that share a kit with "+weapon.getName()+":");
    for (const searchedWeapon of getWeaponsOf(weapon.getSub(),weapon.getSpecial())) {
        if (!searchedWeapon.equals(weapon)) {
            console.log(searchedWeapon.getName());
        }
    }
}
window.weaponClick = weaponClick;

//for when a sub weapon image from a list is clicked
function subClick(name) {
    const sub = new Sub(name);
    //do things with clicked sub weapon
    console.log("Here's a random weapon with "+sub.getName()+":");
    console.log(getRandomWeaponOf(getWeaponsOf(sub)).getName());
}
window.subClick = subClick;

//for when a special weapon image from a list is clicked
function specialClick(name) {
    const special = new Special(name);
    //do things with clicked special weapon
    console.log("Here's a completely random weapon:");
    console.log(getRandomWeapon().getName());
}
window.specialClick = specialClick;

//for when a weapon class image from a list is clicked
function wclassClick(name) {
    const wclass = new WClass(name);
    //do things with clicked weapon class
    console.log("This is a "+wclass.name+"!");
    listClick('specWeaponMenu', getWeaponsOf(wclass));
    document.getElementById('specWeaponMenu').style.display="inline-flex";
}
window.wclassClick = wclassClick

//returns a list of weapons that have the given parameter
//Can take one parameter to search for a weapon of given sub, special or wclass
//Can take two parameters to serch for a weapon of given sub and special
function getWeaponsOf() {
    if (arguments.length === 1) {
        const search = arguments[0];
        let found = [];
        for (const weapon of allWeapons) {
            if (search instanceof Sub) {
                if (weapon.getSub().equals(search)) {
                    found.push(weapon);
                }
            } else if (search instanceof Special) {
                if (weapon.getSpecial().equals(search)) {
                    found.push(weapon);
                }
            } else if (search instanceof WClass) {
                if (weapon.getWClass().equals(search)) {
                    found.push(weapon);
                }
            }
        }
        return found;
    } else if (arguments.length === 2) {
        const sub = arguments[0];
        const special = arguments[1];
        let found = [];
        for (const weapon of getWeaponsOf(sub)) {
            if (weapon.getSpecial().equals(special)) {
                found.push(weapon);
            }
        }
        return found;
    } else {return []}
}

//returns a random weapon from all the weapons
function getRandomWeapon() {
    return allWeapons[Math.floor(Math.random() * allWeapons.length)];
}

//returns a random weapon from a given array of weapons
function getRandomWeaponOf(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

//SCRIPT

// Render weapon classes
function renderWeaponTypes(containerId, weaponClasses) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }

    // Clear the container to prevent duplication
    container.innerHTML = '';

    // Add each weapon class as a child to the container
    weaponClasses.forEach(wclass => {
        const listItem = document.createElement('div');
        listItem.innerHTML = wclass.getImgHTML();
        container.appendChild(listItem);
    });
}
// Call the function to render weapon classes
renderWeaponTypes('weaponTypeScroll', allWClasses);


function listClick(containerId, weaponType){
    //functions the same as the last function (renderWeaponTypes), but NEEDS to only render the category of weapons clicked.
    //prob another for each loop or something related to that to sort arrays and go from there. I'm just too tired to do it rn. A mimir - CMS
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }

    container.innerHTML = '';

    weaponType.forEach(weapon => {
        const listItem = document.createElement('div');
        listItem.innerHTML = weapon.getImgHTML();
        container.appendChild(listItem);
    });
}
window.listClick = listClick;