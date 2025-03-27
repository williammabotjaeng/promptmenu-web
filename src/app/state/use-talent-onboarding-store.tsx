"use client";

import { create } from 'zustand';
import { PersonalInfo } from '@/types/Onboarding/Talent/PersonalInfo';
import { PhysicalAttributes } from '@/types/Onboarding/Talent/PhysicalAttributes';
import { GovernmentID } from '@/types/Onboarding/Talent/GovernmentID';
import { BankDetails } from '@/types/Onboarding/Talent/BankDetails';
import { PaymentMethods } from '@/types/Onboarding/Talent/PaymentMethods';
import { ProfileSocials } from '@/types/Onboarding/Talent/ProfileSocials';
import { TalentProfileData } from '@/types/TalentProfileData';
import { SkillType } from '@/types/Props/SkillTagProps';

interface TalentOnboardingState {
    personalInfo: PersonalInfo;
    physicalAttributes: PhysicalAttributes;
    governmentID: GovernmentID | null;
    bankDetails: BankDetails;
    profileSocials: ProfileSocials;
    talentData: TalentProfileData;
    paymentMethods: PaymentMethods;
    setPersonalInfo: (data: PersonalInfo) => void;
    setPhysicalAttributes: (data: PhysicalAttributes) => void;
    setGovernmentID: (data: GovernmentID | null) => void;
    setBankDetails: (data: BankDetails) => void;
    setPaymentMethods: (data: PaymentMethods) => void;
    setProfileSocials: (data: ProfileSocials) => void;
    setTalentData: (data: TalentProfileData) => void;
    clearOnboardingData: () => void;
}

const useTalentOnboardingStore = create<TalentOnboardingState>((set) => ({
    personalInfo: {
        firstname: null,
        lastname: null,
        date_of_birth: null,
        gender: 'male',
        phone_number: null,
        whatsapp_number: null,
        legalFullName: null,
        stageName: null
    },
    physicalAttributes: {
        height: null,
        weight: null,
        eyeColor: null,
        hairColor: null
    },
    paymentMethods: {
        payment_method: 'creditCard',
        ccNumber: '',
        ccFirstName: '',
        ccLastName: '',
        ccExpiry: '',
        ccCVC: '',
        paypalEmail: '',
        stripeDetails: '',
        accountNumber: '',
        bankName: '',
        iBAN: ''
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
        eyeColor: null,
        hairColor: null,
        government_id_front: null,
        government_id_back: null,
        banking_details: null,
        portfolio_pdf: null,
        portfolio_video: null,
        additional_images: null,
        is_verified: false,
        verification_notification_sent: false,
        created_at: '',
        updated_at: '',
        website: '',
        social_media_links: undefined,
        legalFullName: '',
        stageName: '',
        niches: [],
        profile_progress: 0,
        profile_views: 0,
        applied_jobs: 0,
        upcoming_auditions: 0,
        unread_messages: 0,
        followerCounts: null,
        engagementRates: undefined,
        audienceDemographics: undefined,
        hired_jobs: 0
    },
    setPersonalInfo: (data) => set({ personalInfo: data }),
    setPhysicalAttributes: (data) => set({ physicalAttributes: data }),
    setGovernmentID: (data) => set({ governmentID: data }),
    setBankDetails: (data) => set({ bankDetails: data }),
    setPaymentMethods: (data) => set({ paymentMethods: data }),
    setProfileSocials: (data) => set({ profileSocials: data }),
    setTalentData: (data) => set({ talentData: data }),
    clearOnboardingData: () => set({
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
            eyeColor: null,
            hairColor: null,
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
        paymentMethods: {
            payment_method: 'creditCard',
            ccNumber: '',
            ccFirstName: '',
            ccLastName: '',
            ccExpiry: '',
            ccCVC: '',
            paypalEmail: '',
            stripeDetails: '',
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
            eyeColor: null,
            hairColor: null,
            government_id_front: null,
            government_id_back: null,
            banking_details: null,
            portfolio_pdf: null,
            additional_images: null,
            is_verified: false,
            verification_notification_sent: false,
            created_at: '',
            updated_at: '',
            website: '',
            social_media_links: undefined,
            legalFullName: '',
            stageName: '',
            niches: [],
            profile_progress: 0,
            profile_views: 0,
            applied_jobs: 0,
            upcoming_auditions: 0,
            unread_messages: 0,
            followerCounts: null,
            engagementRates: undefined,
            audienceDemographics: undefined,
            hired_jobs: 0
        },
    }),
}));

export default useTalentOnboardingStore;