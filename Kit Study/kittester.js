//IMPORTS

//import classes pertaining to kit data
import { Weapon,Sub,Special,WClass } from './kitdata.js';

//hide weapon display on boot
document.getElementById('specWeaponMenu').style.display="none";

//VARIABLES

//pool of weapons for correct weapon to chose from
let weaponPool = Weapon.allWeapons;

//current correct weapon of tester as an index of the weapon pool
let correctWeaponID = Math.floor(Math.random() * weaponPool.length);

//eventually replace this alert with display of kit
alert('What weapon has '+getCorrectWeapon().getSub().getName()+
' and '+getCorrectWeapon().getSpecial().getName()+'?');

//FUNCTIONS

//for when a weapon image from a list is clicked
function weaponClick(id) {
    const weapon = Weapon.allWeapons[id];
    //do things with clicked weapon
    alert(getCorrectWeapon().equals(weapon) ? "Correct!" : "Incorrect");
}
window.weaponClick = weaponClick;

//for when a sub weapon image from a list is clicked (not needed)
function subClick(name) {

}
window.subClick = subClick;

//for when a special weapon image from a list is clicked (not needed)
function specialClick(name) {
    
}
window.specialClick = specialClick;

//for when a weapon class image from a list is clicked
function wclassClick(name) {
    const wclass = new WClass(name);
    //do things with clicked weapon class
    listClick('specWeaponMenu', Weapon.getWeaponsOf(wclass));
    document.getElementById('specWeaponMenu').style.display="inline-flex";
}
window.wclassClick = wclassClick;

//show correct answer
function answer() {
    alert(getCorrectWeapon().getName());
}
window.answerClick = answer;

//reset correct weapon and hide weapon list
function resetCorrectWeapon() {
    weaponPool.splice(correctWeaponID);
    if (weaponPool.length == 0) {
        weaponPool = Weapon.allWeapons;
    }
    correctWeaponID = Math.floor(Math.random() * weaponPool.length);
    document.getElementById('specWeaponMenu').style.display="none";
    //eventually replace this alert with display of kit
    alert('What weapon has '+getCorrectWeapon().getSub().getName()+
    ' and '+getCorrectWeapon().getSpecial().getName()+'?');
}
window.resetClick = resetCorrectWeapon;

//returns correct weapon as Weapon object
function getCorrectWeapon() {
    return weaponPool[correctWeaponID];
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
renderWeaponTypes('weaponTypeScroll', WClass.allWClasses);


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