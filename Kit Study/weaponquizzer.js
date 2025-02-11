//IMPORTS

//import classes pertaining to kit data
import { Weapon,Sub,Special,WClass,renderListItems,listColors } from './kitdata.js';

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

let answered=false;

//FUNCTIONS

//for when a weapon image from a list is clicked (not needed)
function weaponClick(id) {
    
}
window.weaponClick = weaponClick;

//for when a sub weapon image from a list is clicked
function subClick(name) {
    if (!answered) {
        selectedSub = new Sub(name);
        renderSelectedGroup();
        if (selectedSpecial != null) {
            guessAttempt();
        }
    }
}
window.subClick = subClick;

//for when a special weapon image from a list is clicked
function specialClick(name) {
    if (!answered) {
        selectedSpecial = new Special(name);
        renderSelectedGroup();
        if (selectedSub != null) {
            guessAttempt();
        }
    }
}
window.specialClick = specialClick;

//show correct answer
function answer() {
    displayAnswer(getCorrectWeapon().getSub().getName()+' and '+getCorrectWeapon().getSpecial().getName());
    answered=true;
    selectedSub=getCorrectWeapon().getSub();
    selectedSpecial=getCorrectWeapon().getSpecial();
    renderSelectedGroup();
    document.getElementById('answerButton').style.display='none';
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
    renderSelectedGroup();
    
    renderHint();
    displayAnswer('');
    answered=false;
    document.getElementById('answerButton').style.display='inline-block';
    
    const selectedGroup = document.getElementById('selectedGroup');
    selectedGroup.style.backgroundColor=listColors.blue;
}
window.resetClick = resetCorrectWeapon;

//returns correct weapon as Weapon object
function getCorrectWeapon() {
    return weaponPool[correctWeaponID];
}

//run when user has selected both a sub and a special
function guessAttempt() {
    const correct=getCorrectWeapon().sameKit(selectedSub,selectedSpecial);
    displayAnswer(correct ? "Correct! "+getCorrectWeapon().getSub().getName()+' and '+getCorrectWeapon().getSpecial().getName() : "Nope!");
    const selectedGroup = document.getElementById('selectedGroup');
    if (correct) {
        if (document.getElementById('automaticReset').checked) {
            let done = false;
            let interval = setInterval(() => {
                if (!done) {resetCorrectWeapon(); done=true;}
            }, 1000);
        }
        answered=true;
        document.getElementById('answerButton').style.display='none';

        selectedGroup.style.backgroundColor=listColors.green;
    } else {
        

        selectedGroup.style.backgroundColor=listColors.red;
    }
}

//render the text of the hint
function renderHint() {
    document.getElementById('textHint').textContent=
    'What kit does '+getCorrectWeapon().getName()+' have?';
    renderListItems('imgHint',[getCorrectWeapon()]);
}

function displayAnswer(str) {
    document.getElementById('textAnswer').textContent=str;
}

//render the group of selected sub and special
function renderSelectedGroup() {
    let selectedGroup = [];
    let size=0;
    if (selectedSub != null) {
        selectedGroup.push(selectedSub);
        size++;
    }
    if (selectedSpecial != null) {
        selectedGroup.push(selectedSpecial);
        size++;
    }
    renderListItems('selectedGroup',selectedGroup);
    document.getElementById('selectedGroup').style.width=(size*70).toString()+'px';
}

//SCRIPT

// render sub and special list on boot
renderListItems('subMenu', Sub.allSubs);
renderListItems('specialMenu', Special.allSpecials);
renderSelectedGroup();
renderHint();