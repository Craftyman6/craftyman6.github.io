//IMPORTS

//import classes pertaining to kit data
import { Weapon,Sub,Special,WClass } from './kitdata.js';

//VARIABLES

let weaponChoices = getNewChoices();

let correctWeapon = weaponChoices[Math.floor(Math.random()*4)];

let hint = getHint();

let correctWeapons = getCorrectWeapons();

//eventually replace this alert with display of kit
alert('Who used the '+hint.getName()+'?');

//FUNCTIONS

//for when a weapon image from a list is clicked
function weaponClick(id) {
    const clickedWeapon = Weapon.allWeapons[id];
    let correct = false;
    correctWeapons.forEach(weapon => {
        if (clickedWeapon.equals(weapon)) {
            correct = true;
        }
    })
    //eventually replace this alert with display
    alert(correct ? 'Correct!' : 'Incorrect');
    if (correct && document.getElementById('automaticReset').checked) {
        resetCorrectWeapon();
    }
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

//for when a weapon class image from a list is clicked (not needed)
function wclassClick(name) {

}
window.wclassClick = wclassClick;

//returns a list of four random weapons
function getNewChoices() {
    let ret=[]
    for (let i=0; i<4; i++) {
        ret.push(Weapon.getRandomWeapon());
    }
    return ret;
}

//returns either the sub or the special of the correct weapon
function getHint() {
    if (Math.random() > .5) {
        return correctWeapon.getSub();
    } else {
        return correctWeapon.getSpecial();
    }
}

//return all weapons from choices that validate as correct answers
function getCorrectWeapons() {
    let ret = [];
    weaponChoices.forEach(weapon => {
        if (weapon.has(hint)) {
            ret.push(weapon);
        }
    })
    return ret;
}

//sets the weapon choice display with the new weapon choices
function updateWeaponChoiceDisplay() {
    const container = document.getElementById("weaponChoices")

    container.innerHTML = '';

    weaponChoices.forEach(weapon => {
        const listItem = document.createElement('div');
        listItem.innerHTML = weapon.getImgHTML();
        container.appendChild(listItem);
    })
}
updateWeaponChoiceDisplay();

//show correct answer(s)
function answer() {
    let al = '';
    correctWeapons.forEach(weapon => {
        al=al.concat(weapon.getName());
    })
    alert(al);
}
window.answerClick = answer;

//reset weapon choices and choose new correct weapon
function resetCorrectWeapon() {
    weaponChoices = getNewChoices();
    correctWeapon = weaponChoices[Math.floor(Math.random()*4)];
    hint = getHint();
    correctWeapons = getCorrectWeapons();

    updateWeaponChoiceDisplay();

    //eventually replace this alert with display of kit
    alert('Who used the '+hint.getName()+'?');
}
window.resetClick = resetCorrectWeapon;

//SCRIPT