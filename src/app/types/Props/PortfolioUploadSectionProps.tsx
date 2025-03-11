export interface PortfolioUploadSectionProps {
    title: string;
    description: string;
    buttonText: string;
    handleFileUpload: (event: React.ChangeEvent<any>) => void;
    handleFileDelete: (event: React.ChangeEvent<any>) => void;
    portfolioFile: any;
  }