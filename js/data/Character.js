
export class Character {
    constructor(name, dateOfBirth, house, wizard, ancestry, hogwartsRole, image ){
        this.name = name;
        this.dateOfBirth = dateOfBirth? dateOfBirth:"-",
        this.house = house? house:"-",
        this.wizard = wizard,
        this.ancestry = ancestry? ancestry:"-",
        this.hogwartsRole = hogwartsRole,
        this.image = image
    }

    static calculateHogwartsRole(rawCharacterData){
        if(rawCharacterData.hogwartsStudent){
            return 'student';
        } else if(rawCharacterData.hogwartsStaff){
            return 'staff';
        } 
        return 'no information';
    }

    static isEqual(character1, character2){
        return character1.name == character2.name;
    }
}