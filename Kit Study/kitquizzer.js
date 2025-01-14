//IMPORTS

//import classes pertaining to kit data
import { Weapon,Sub,Special,WClass } from './kitdata.js';

//VARIABLES

//pool of weapons for correct weapon to chose from
//starts as list of every weapon, and removes the correct one after each try
let weaponPool = [];

//current correct weapon of tester as an index of the weapon pool
let correctWeaponID;

//FUNCTIONS

//for when a weapon image from a list is clicked
function weaponClick(id) {
    const weapon = Weapon.allWeapons[id];
    //do things with clicked weapon
    alert(getCorrectWeapon().sameKit(weapon) ? "Correct!" : "Incorrect");
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
    renderListItems('weaponList', Weapon.getWeaponsOf(new WClass(name)));
}
window.wclassClick = wclassClick;

//show correct answer
function revealAnswer() {
    alert(getCorrectWeapon().getName());
}
window.revealAnswerClick = revealAnswer;

//reset correct weapon and hide weapon list
function resetCorrectWeapon() {
    //chose new weapon
    pickNewWeapon();
    //hide weapon list
    document.getElementById('weaponList').style.display="none";
    
    //display hint text
    document.getElementById("textHint").textContent='What weapon has '+getCorrectWeapon().getSub().getName()+
    ' and '+getCorrectWeapon().getSpecial().getName()+'?';

    //display hint images
    const kitHintGroup=document.getElementById("kitHintGroup");
    kitHintGroup.innerHTML='';
    const subImg = document.createElement('div');
    subImg.innerHTML = getCorrectWeapon().getSub().getImgHTML();
    kitHintGroup.appendChild(subImg);
    const specialImg = document.createElement('div');
    specialImg.innerHTML = getCorrectWeapon().getSpecial().getImgHTML();
    kitHintGroup.appendChild(specialImg);
}
window.newWeaponClick = resetCorrectWeapon;

//returns correct weapon as Weapon object
function getCorrectWeapon() {
    return weaponPool[correctWeaponID];
}

//refills the weapon pool with every weapon
function fillWeaponPool() {
    weaponPool.push(...Weapon.allWeapons);
}

//choose new weapon from the weapon pool
function pickNewWeapon() {
    //assign id of current weapon to new weapon of pool options
    correctWeaponID = Math.floor(Math.random() * weaponPool.length);

    //remove chosen weapon from weapon pool
    weaponPool.splice(correctWeaponID,1);

    //fill weapon pool if it's been depleted
    if (weaponPool.length == 0) {fillWeaponPool();}
}

// Render list images
function renderListItems(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }

    // Clear the container to prevent duplication
    container.innerHTML = '';

    // Add each item as a child to the container
    items.forEach(item => {
        const listItem = document.createElement('div');
        listItem.innerHTML = item.getImgHTML();
        container.appendChild(listItem);
    });

    //Make sure list is displayed
    document.getElementById(containerId).style.display="inline-flex";
}

//SCRIPT

//render wclass list on boot
renderListItems('wclassList',WClass.allWClasses);

//start with fresh weapon pool
fillWeaponPool();

//chose weapon on start
resetCorrectWeapon();