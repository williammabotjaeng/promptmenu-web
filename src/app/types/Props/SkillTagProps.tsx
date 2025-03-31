export interface SkillType {
    name: string;
}

export interface NicheType {
    name: string;
}
export interface SkillTagProps {
    skill: SkillType;
    handleSkillClick: (skill: SkillType) => void;
    selectedSkills: SkillType[];
}