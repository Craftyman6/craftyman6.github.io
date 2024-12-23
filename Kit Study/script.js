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
    }

    //get name function
    getName() {return this.name;}

    //get imgSrc function
    getImgSrc() {return this.imgSrc;}

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
    }

    //get name function
    getName() {return this.name;}

    //get imgSrc function
    getImgSrc() {return this.imgSrc;}

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
    }

    //get name function
    getName() {return this.name;}

    //get imgSrc function
    getImgSrc() {return this.imgSrc;}

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


//SCRIPT

//***This is purely for test purposes to show all images and objects are functional
//for each weapon, append images of its elements and a title to the test display block
for (const weapon of allWeapons) {
    document.getElementById("weaponListTestDisplay").innerHTML=
    document.getElementById("weaponListTestDisplay").innerHTML+
    "<img src=\""+weapon.getImgSrc()+"\">"+
    "<img src=\""+weapon.getSub().getImgSrc()+"\">"+
    "<img src=\""+weapon.getSpecial().getImgSrc()+"\">"+
    "<img src=\""+weapon.getWClass().getImgSrc()+"\"><br><p>"+
    weapon.getName()+"<p><br>";
}


