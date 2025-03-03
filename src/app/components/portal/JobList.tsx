import React, { useEffect } from "react";
import { JobCard } from "./JobCard";
import { JobPayload, RoleDetails } from "@/types/JobRoleData";

interface Props {
  jobData: JobPayload[];
}

const JobList: React.FC<Props> = ({ jobData }) => {
  useEffect(() => {
    console.log("Job Data:", jobData);
  }, []);
  return (
    <>
      {jobData?.map((job, jobIndex) =>
        job?.role &&
        Array?.isArray(job?.role) &&
        job?.role?.map((roleItem: RoleDetails, roleIndex: number) => (
          <JobCard
            key={`${jobIndex}-${roleIndex}`} 
            title={roleItem?.title}
            location={roleItem?.location}
            hourlyPay={roleItem.hourlyPay}
            dailyPay={roleItem?.dailyPay}
            projectPay={roleItem?.projectPay}
            genders={roleItem?.genders}
            ethnicities={roleItem?.ethnicities}
            skill={roleItem?.skill}
            openings={roleItem?.openings}
            softDeadline={roleItem?.softDeadline}
            hardDeadline={roleItem?.hardDeadline}
            notes={roleItem?.notes}
          />
        ))
      )}
    </>
  );
};

export default JobList;