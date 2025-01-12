//IMPORTS

//import classes pertaining to kit data
import { Weapon,Sub,Special,WClass } from './kitdata.js';

//FUNCTIONS

//for when a weapon image from a list is clicked
function weaponClick(id) {
    updateWeaponDisplay(Weapon.allWeapons[id]);
}
window.weaponClick = weaponClick;

//for when a sub weapon image from a list is clicked (not needed)
function subClick(name) {
    renderListItems('weaponList', Weapon.getWeaponsOf(new Sub(name)));
}
window.subClick = subClick;

//for when a special weapon image from a list is clicked (not needed)
function specialClick(name) {
    renderListItems('weaponList', Weapon.getWeaponsOf(new Special(name)));
}
window.specialClick = specialClick;

//for when a weapon class image from a list is clicked
function wclassClick(name) {
    renderListItems('weaponList', Weapon.getWeaponsOf(new WClass(name)));
}
window.wclassClick = wclassClick;

//updates the display with the selected weapon's name, kit, and dupes
function updateWeaponDisplay(weapon) {
    document.getElementById("infoWindow").style.display="block";

    document.getElementById("weaponName").textContent=weapon.getName();

    const weaponImg=document.getElementById("weaponImg");
    weaponImg.style.display="block";
    weaponImg.innerHTML='';
    const newImage = document.createElement("div");
    newImage.innerHTML=weapon.getImgHTML();
    weaponImg.appendChild(newImage);

    let utilityGroup=document.getElementById("utilityGroup");
    utilityGroup.innerHTML='';
    
    const subImg = document.createElement('div');
    subImg.innerHTML = weapon.getSub().getImgHTML();
    utilityGroup.appendChild(subImg);
    
    const specialImg = document.createElement('div');
    specialImg.innerHTML = weapon.getSpecial().getImgHTML();
    utilityGroup.appendChild(specialImg);

    let dupes=weapon.getWeaponsOfDupeKit();
    const dupeKitTitle=document.getElementById("dupeKitTitle");
    const dupeKitList=document.getElementById("dupeKitList");
    const infoWindow=document.getElementById("infoWindow");
    if (dupes.length == 0) {
        dupeKitTitle.style.display="none";
        dupeKitList.style.display="none";
        infoWindow.style.height="12em"
    } else {
        dupeKitTitle.style.display="block";
        dupeKitList.style.display="inline-flex";
        infoWindow.style.height="17em"

        dupeKitList.innerHTML='';
        dupeKitList.style.width=(dupes.length*70).toString()+'px';
        dupes.forEach(weapon => {
            const dupeWeapon = document.createElement('div');
            dupeWeapon.innerHTML = weapon.getImgHTML();
            dupeKitList.appendChild(dupeWeapon);
        })
    }
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

//Render all sort lists on boot
renderListItems('wclassList', WClass.allWClasses);
renderListItems('subList', Sub.allSubs);
renderListItems('specialList', Special.allSpecials);