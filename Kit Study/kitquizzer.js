//IMPORTS

//import classes pertaining to kit data
import { Weapon,Sub,Special,WClass,renderListItems,listColors } from './kitdata.js';

//VARIABLES

//pool of weapons for correct weapon to chose from
//starts as list of every weapon, and removes the correct one after each try
let weaponPool = [];

//current correct weapon of tester as an index of the weapon pool
let correctWeaponID;

//whether or not the answer has been revealed
let revealed = false;

//How many times you've gotten the weapon wrong
let nopeStreak = 0;

//FUNCTIONS

//for when a weapon image from a list is clicked
function weaponClick(id) {
    if (!revealed) {
        const weapon = Weapon.allWeapons[id];
        if (weapon.sameKit(getCorrectWeapon())) {
            if (document.getElementById('automaticReset').checked) {
                resetCorrectWeapon();
            } else {
                revealAnswer(weapon);
            }
        } else {
            nopeStreak++;
            document.getElementById("responseWindow").style.height='3em';
            document.getElementById("textResponse").textContent=
            "Nope!"+(nopeStreak>1?" x"+nopeStreak:"");

            const weaponList = document.getElementById('weaponList');
            weaponList.style.backgroundColor=listColors.red;
            weaponList.style.border=listColors.redBorder;
        }
    }   
}
window.weaponClick = weaponClick;

//for when a weapon class image from a list is clicked
function wclassClick(name) {
    renderListItems('weaponList', Weapon.getWeaponsOf(new WClass(name)));
}
window.wclassClick = wclassClick;

//show correct answer with given selected weapon
function revealAnswer() {
    //first weapon displayed
    let weapon;
    //get whether this was called from getting it correct or the button
    let congradulate=arguments.length === 1
    //set first weapon to either chosen one or default one
    if (congradulate) {
        weapon=arguments[0];

        const weaponList = document.getElementById('weaponList');
        weaponList.style.backgroundColor=listColors.green;
        weaponList.style.border=listColors.greenBorder;
    } else {
        weapon=getCorrectWeapon();
    }
    let correctWeapons = [];
    correctWeapons.push(weapon);
    correctWeapons.push(...weapon.getWeaponsOfDupeKit());
    const textResponse=document.getElementById("textResponse");
    textResponse.textContent='';
    textResponse.textContent=textResponse.textContent+
    (congradulate?"Correct!":"");
    for (let i=0;i<correctWeapons.length;i++) {
        textResponse.textContent=textResponse.textContent+
        (i==0?" ":" & ")+
        correctWeapons[i].getName();
    }
    document.getElementById("weaponResponse").style.width=(correctWeapons.length*140).toString()+'px';
    renderListItems('weaponResponse',correctWeapons);
    document.getElementById("responseWindow").style.height='10em';

    revealed=true;
    document.getElementById("revealButton").style.display="none";
    document.getElementById("revealButton").style.display="none";
}
window.revealAnswerClick = revealAnswer;

//reset correct weapon and hide weapon list
function resetCorrectWeapon() {
    //chose new weapon
    pickNewWeapon();
    //hide weapon list
    const weaponList = document.getElementById('weaponList');
    weaponList.style.display="none";
    weaponList.style.backgroundColor=listColors.orange;
    weaponList.style.border=listColors.orangeBorder;
    
    //display hint text
    console.log(correctWeaponID+"\t"+weaponPool.length);
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

    //hide answer text and images and show reveal button
    document.getElementById("textResponse").textContent='';
    document.getElementById("weaponResponse").innerHTML='';
    document.getElementById("weaponResponse").style.height='0em';
    document.getElementById("responseWindow").style.height='0em';
    document.getElementById("revealButton").style.display='inline-block';
    revealed=false;
    nopeStreak=0;
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
    //remove chosen weapon from weapon pool
    weaponPool.splice(correctWeaponID,1);

    //assign id of current weapon to new weapon of pool options
    correctWeaponID = Math.floor(Math.random() * weaponPool.length);

    //fill weapon pool if it's been depleted
    if (weaponPool.length == 0) {fillWeaponPool();}
}

//SCRIPT

//render wclass list on boot
renderListItems('wclassList',WClass.allWClasses);

//start with fresh weapon pool
fillWeaponPool();

//chose weapon on start
resetCorrectWeapon();