import { create } from 'zustand';
import { PersonalInfo } from '@/types/Onboarding/Talent/PersonalInfo';
import { PhysicalAttributes } from '@/types/Onboarding/Talent/PhysicalAttributes';
import { GovernmentID } from '@/types/Onboarding/Talent/GovernmentID';
import { BankDetails } from '@/types/Onboarding/Talent/BankDetails';
import { ProfileSocials } from '@/types/Onboarding/Talent/ProfileSocials';
import { TalentProfileData } from '@/types/TalentProfileData';

interface TalentOnboardingState {
    personalInfo: PersonalInfo;
    physicalAttributes: PhysicalAttributes;
    governmentID: GovernmentID | null;
    bankDetails: BankDetails;
    profileSocials: ProfileSocials;
    talentData: TalentProfileData;
    setPersonalInfo: (data: PersonalInfo) => void;
    setPhysicalAttributes: (data: PhysicalAttributes) => void;
    setGovernmentID: (data: GovernmentID | null) => void;
    setBankDetails: (data: BankDetails) => void;
    setProfileSocials: (data: ProfileSocials) => void;
    setTalentData: (data: TalentProfileData) => void;
    clearOnboardingData: () => void;
}

const useTalentOnboardingStore = create<TalentOnboardingState>((set) => ({
    personalInfo: {
        firstname: null,
        lastname: null,
        date_of_birth: null,
        gender: null,
        phone_number: null,
    },
    physicalAttributes: {
        height: null,
        weight: null,
        ethnicity: null,
    },
    governmentID: null,
    bankDetails: {
        bankName: null,
        accountNumber: null,
        iban: null,
        accountHolderName: null,
    },
    profileSocials: {
        website: null,
        social_media_links: {
            twitter: null,
            facebook: null,
            instagram: null,
            linkedin: null,
        },
    },
    talentData: {
        user: null,
        headshot: null,
        date_of_birth: null,
        gender: null,
        phone_number: null,
        nationality: null,
        skills: [],
        height: null,
        weight: null,
        ethnicity: null,
        government_id: null,
        banking_details: null,
        portfolio_pdf: null,
        additional_images: null,
        is_verified: false,
        verification_notification_sent: false,
        created_at: '',
        updated_at: '',
    },
    setPersonalInfo: (data) => set({ personalInfo: data }),
    setPhysicalAttributes: (data) => set({ physicalAttributes: data }),
    setGovernmentID: (data) => set({ governmentID: data }),
    setBankDetails: (data) => set({ bankDetails: data }),
    setProfileSocials: (data) => set({ profileSocials: data }),
    setTalentData: (data) => set({ talentData: data }),
    clearOnboardingData: () => set({
        personalInfo: {
            user: null,
            date_of_birth: null,
            gender: null,
            phone_number: null,
        },
        physicalAttributes: {
            height: null,
            weight: null,
            ethnicity: null,
        },
        governmentID: null,
        bankDetails: {
            bankName: null,
            accountNumber: null,
            iban: null,
            accountHolderName: null,
        },
        profileSocials: {
            website: null,
            social_media_links: {
                twitter: null,
                facebook: null,
                instagram: null,
                linkedin: null,
            },
        },
        talentData: {
            user: null,
            headshot: null,
            date_of_birth: null,
            gender: null,
            phone_number: null,
            nationality: null,
            skills: [],
            height: null,
            weight: null,
            ethnicity: null,
            government_id: null,
            banking_details: null,
            portfolio_pdf: null,
            additional_images: null,
            is_verified: false,
            verification_notification_sent: false,
            created_at: '',
            updated_at: '',
        },
    }),
}));

export default useTalentOnboardingStore;