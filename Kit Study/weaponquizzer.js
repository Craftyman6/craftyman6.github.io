//IMPORTS

//import classes pertaining to kit data
import { Weapon,Sub,Special,WClass } from './kitdata.js';

//VARIABLES

//currently selected sub weapon
let selectedSub = null;

//currently selected special weapon
let selectedSpecial = null;

//pool of weapons for correct weapon to chose from
//starts as list of every weapon, and removes the correct one after each try
let weaponPool = [];
weaponPool.push(...Weapon.allWeapons);

//current correct weapon of tester as an index of the weapon pool
let correctWeaponID = Math.floor(Math.random() * weaponPool.length);

//eventually replace this alert with display of weapon
alert('What kit does '+getCorrectWeapon().getName()+' have?');

//FUNCTIONS

//for when a weapon image from a list is clicked (not needed)
function weaponClick(id) {
    
}
window.weaponClick = weaponClick;

//for when a sub weapon image from a list is clicked
function subClick(name) {
    selectedSub = new Sub(name);
    document.getElementById("selectedSub").src=selectedSub.getImgSrc();
    if (selectedSpecial != null) {
        guessAttempt();
    }
}
window.subClick = subClick;

//for when a special weapon image from a list is clicked
function specialClick(name) {
    selectedSpecial = new Special(name);
    document.getElementById("selectedSpecial").src=selectedSpecial.getImgSrc();
    if (selectedSub != null) {
        guessAttempt();
    }
}
window.specialClick = specialClick;

//show correct answer
function answer() {
    alert(getCorrectWeapon().getSub().getName()+' and '+getCorrectWeapon().getSpecial().getName());
}
window.answerClick = answer;

//reset correct weapon and hide weapon list
function resetCorrectWeapon() {
    weaponPool.splice(correctWeaponID,1);
    if (weaponPool.length == 0) {
        weaponPool.push(...Weapon.allWeapons);
    }
    correctWeaponID = Math.floor(Math.random() * weaponPool.length);
    
    selectedSub = null;
    selectedSpecial = null;
    document.getElementById("selectedSub").src='';
    document.getElementById("selectedSpecial").src='';
    
    //eventually replace this alert with display of weapon
    alert('What kit does '+getCorrectWeapon().getName()+' have?');
}
window.resetClick = resetCorrectWeapon;

//for when a weapon class image from a list is clicked (not needed)
function wclassClick(name) {

}
window.wclassClick = wclassClick;

//returns correct weapon as Weapon object
function getCorrectWeapon() {
    return weaponPool[correctWeaponID];
}

//run when user has selected both a sub and a special
function guessAttempt() {
    alert(getCorrectWeapon().sameKit(selectedSub,selectedSpecial) ? "Correct!" : "Incorrect");
}


//SCRIPT

// Render sub weapon menu
function renderSubMenu(containerId, subs) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }

    // Clear the container to prevent duplication
    container.innerHTML = '';

    // Add each weapon class as a child to the container
    subs.forEach(sub => {
        const listItem = document.createElement('div');
        listItem.innerHTML = sub.getImgHTML();
        container.appendChild(listItem);
    });
}
// Call the function to render weapon classes
renderSubMenu('subMenu', Sub.allSubs);


// Render special weapon menu
function renderSpecialMenu(containerId, specials) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }

    // Clear the container to prevent duplication
    container.innerHTML = '';

    // Add each weapon class as a child to the container
    specials.forEach(special => {
        const listItem = document.createElement('div');
        listItem.innerHTML = special.getImgHTML();
        container.appendChild(listItem);
    });
}
// Call the function to render weapon classes
renderSpecialMenu('specialMenu', Special.allSpecials);