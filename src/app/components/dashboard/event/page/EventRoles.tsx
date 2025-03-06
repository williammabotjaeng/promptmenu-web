import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import { useStore } from "zustand";
import { useRouter, redirect } from "next/navigation";
import useEventStore from "@/state/use-event-store";
import { useEvent } from "@/providers/event-provider";
import { useCompany } from "@/providers/company-provider";
import { useCookies } from "react-cookie";
import SaveIcon from "@mui/icons-material/Save"; 
import { uploadFileToS3 } from "@/services/s3UploadUtils";
import RolesOverview from "./RolesOverview";

interface EventRolesProps {
    event: any;
}

const EventRoles: React.FC<EventRolesProps> = ({ event }) => {

    const { eventDetails, eventMedia } = useStore(useEventStore);
    const [cookies] = useCookies([
      'event_id', 'username', 
      'access', 'event_video',
      'event_photos','event_poster',
      'company_id'
    ]);

    const router = useRouter();

    const eventID = cookies['event_id'];
    const userName = cookies['username'];
    const accessToken = cookies['access'];
    const companyID = cookies['company_id'];

    const { updateEvent } = useEvent();

    const { updateCompany, company, fetchCompany } = useCompany();

    const handleSave = () => {

    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                justifyContent: 'center',
                padding: { xs: 2, md: 4 }, 
                pb: { xs: 12, md: 6 },
                width: '100%',
            }}
        >
                <RolesOverview />
                <Button
                    onClick={handleSave}
                    variant="contained"
                    sx={{
                        backgroundColor: '#977342',
                        width: { xs: '120px', md: '160px' }, 
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#CEAB76'
                        }
                    }}
                    aria-label="Next Step"
                >
                    Save Section
                    <SaveIcon sx={{ marginLeft: '8px' }} />
                </Button>
            </Box>
    )
};

export default EventRoles;