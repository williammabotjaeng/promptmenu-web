export interface JobCardProps {
    title: string;
    status: 'Active' | 'Pending';
    requirements: string;
    location: string;
    daysAgo: number;
    salary: string;
}
