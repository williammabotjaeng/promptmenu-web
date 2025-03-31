import { create } from 'zustand';
import { CompanyInfo } from '@/types/Onboarding/Client/CompanyInfo';
import { ContactInfo } from '@/types/Onboarding/Client/ContactInfo';
import { SocialMediaLinks } from '@/types/Onboarding/Client/SocialMediaLinks';


interface ClientOnboardingState {
    companyInfo: CompanyInfo;
    contactInfo: ContactInfo;
    socialMediaLinks: SocialMediaLinks;
    setCompanyInfo: (data: CompanyInfo) => void;
    setContactInfo: (data: ContactInfo) => void;
    setSocialMediaLinks: (data: SocialMediaLinks) => void;
    clearOnboardingData: () => void;
}

const useClientOnboardingStore = create<ClientOnboardingState>((set) => ({
    companyInfo: {
        name: '',
        logo: null,
        slogan: '',
        description: '',
    },
    contactInfo: {
        address: '',
        phone_number: '',
        whatsapp_number: '',
    },
    socialMediaLinks: {
        website: '',
        social_media_links: {
            twitter: '',
            facebook: '',
            instagram: '',
            linkedin: '',
        },
    },
    setCompanyInfo: (data) => set({ companyInfo: data }),
    setContactInfo: (data) => set({ contactInfo: data }),
    setSocialMediaLinks: (data) => set({ socialMediaLinks: data }),
    clearOnboardingData: () => set({
        companyInfo: {
            name: '',
            logo: null,
            slogan: '',
            description: '',
        },
        contactInfo: {
            address: '',
            phone_number: '',
            whatsapp_number: '',
        },
        socialMediaLinks: {
            website: '',
            social_media_links: {
                twitter: '',
                facebook: '',
                instagram: '',
                linkedin: '',
            },
        },
    }),
}));

export default useClientOnboardingStore;