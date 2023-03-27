export interface SkillType {
    name : string
    image : string
}

export interface SkillDictionaryType {
    [index : string] : SkillType
}