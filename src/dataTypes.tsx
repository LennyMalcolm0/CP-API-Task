export interface ApplicationFormData {
    id: string;
    type: string;
    attributes: ApplicationFormDataAttributes;
}

export interface ApplicationForm {
    data: ApplicationFormData;
}

export interface ApplicationFormDataAttributes {
    coverImage?: string;
    customisedQuestions?: QuestionTemplate[];
    personalInformation: PersonalInformationData;
    profile?: ProfileData;
}

export interface PersonalInformationData {
    firstName: PersonalInformationTemplate;
    lastName: PersonalInformationTemplate;
    emailId: PersonalInformationTemplate;
    phoneNumber: PersonalInformationTemplate;
    nationality: PersonalInformationTemplate;
    currentResidence: PersonalInformationTemplate;
    idNumber: PersonalInformationTemplate;
    dateOfBirth: PersonalInformationTemplate;
    gender: PersonalInformationTemplate;
    personalQuestions?: QuestionTemplate[];
}
export interface PersonalInformationTemplate {
    internalUse: boolean;
    show: boolean;
}
  
export interface ProfileData {
    education: ProfileTemplate;
    experience: ProfileTemplate;
    resume: ProfileTemplate;
    profileQuestions?: QuestionTemplate[];
}
export interface ProfileTemplate {
    mandatory: boolean;
    show: boolean;
}

export type QuestionType = "Paragraph" | "ShortAnswer" | "YesNo" | "Dropdown" | "MultipleChoice" | "Date" | "Number" | "FileUpload";

export interface QuestionTemplate {
    id?: string;
    type: QuestionType;
    question: string;
    choices?: string[];
    maxChoice?: number;
    disqualify?: boolean;
    other?: boolean;
}
  