export interface ApplicationFormData {
    id: string;
    type: string;
    attributes: {
        coverImage?: string;
        customisedQuestions?: QuestionTemplate[];
        personalInformation: {
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
        };
        profile?: {
            education: ProfileTemplate;
            experience: ProfileTemplate;
            resume: ProfileTemplate;
            profileQuestions?: QuestionTemplate[];
        };
    };
}

export interface ApplicationForm {
    data: ApplicationFormData;
}

export interface PersonalInformationTemplate {
    internalUse: boolean;
    show: boolean;
}
  
export interface ProfileTemplate {
    mandatory: boolean;
    show: boolean;
}

export interface QuestionTemplate {
    id?: string;
    type:
      | "Paragraph"
      | "ShortAnswer"
      | "YesNo"
      | "Dropdown"
      | "MultipleChoice"
      | "Date"
      | "Number"
      | "FileUpload";
    question: string;
    choices?: string[];
    maxChoice?: number;
    disqualify?: boolean;
    other?: boolean;
}
  