//IMPORTS

//import classes pertaining to kit data
import { Weapon,Sub,Special,WClass,renderListItems,listColors } from './kitdata.js';

//VARIABLES

let weaponChoices;

let correctWeapon;

let hint;

let correctWeapons;

let answered = false;

//FUNCTIONS

//for when a weapon image from a list is clicked
function weaponClick(id) {
    if (!answered) {
        const clickedWeapon = Weapon.allWeapons[id];
        let correct = false;
        correctWeapons.forEach(weapon => {
            if (clickedWeapon.equals(weapon)) {
                correct = true;
            }
        })
        //eventually replace this alert with display
        if (correct) { 
            if (document.getElementById('automaticReset').checked){
                resetCorrectWeapon();
            } else {
                const textAnswer=document.getElementById('textAnswer');
                textAnswer.textContent='Correct! ';
                for (let i=0;i<correctWeapons.length;i++) {
                    textAnswer.textContent=textAnswer.textContent+
                    (i==0?" ":" or ")+
                    correctWeapons[i].getName();
                }
                answered=true;
                document.getElementById('revealButton').style.display='none';
                renderListItems('imgAnswer',correctWeapons);
                document.getElementById('infoWindow').style.height='16em';

            }
            
            document.getElementById('weaponChoices').style.backgroundColor=listColors.green;
            document.getElementById('weaponChoices').style.border=listColors.greenBorder;
        } else {
            document.getElementById('textAnswer').textContent='Nope!';
            document.getElementById('infoWindow').style.height='10em';
            
            document.getElementById('weaponChoices').style.backgroundColor=listColors.red;
            document.getElementById('weaponChoices').style.border=listColors.redBorder;
        }
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

//show correct answer(s)
function answer() {
    let al = '';
    correctWeapons.forEach(weapon => {
        al=al.concat(weapon.getName());
    })
    const textAnswer=document.getElementById('textAnswer');
    textAnswer.textContent='';
    for (let i=0;i<correctWeapons.length;i++) {
        textAnswer.textContent=textAnswer.textContent+
        (i==0?" ":" or ")+
        correctWeapons[i].getName();
    }
    answered=true;
    renderListItems('imgAnswer',correctWeapons);
    document.getElementById('revealButton').style.display='none';
    document.getElementById('infoWindow').style.height='16em';
}
window.answerClick = answer;

//reset weapon choices and choose new correct weapon
function resetCorrectWeapon() {
    weaponChoices = getNewChoices();
    correctWeapon = weaponChoices[Math.floor(Math.random()*4)];
    hint = getHint();
    correctWeapons = getCorrectWeapons();
    answered=false;
    document.getElementById('revealButton').style.display='inline-block';

    renderListItems('weaponChoices',weaponChoices)
    document.getElementById('weaponChoices').style.backgroundColor=listColors.orange;
    document.getElementById('weaponChoices').style.border=listColors.orangeBorder;
    
    document.getElementById('textHint').textContent=
    'Who used the '+hint.getName()+'?';
    renderListItems('imgHint',[hint]);

    document.getElementById('infoWindow').style.height='8em';
    document.getElementById('textAnswer').textContent='';
    renderListItems('imgAnswer',[]);
}
window.resetClick = resetCorrectWeapon;

//SCRIPT
resetCorrectWeapon();
renderListItems('weaponChoices',weaponChoices)