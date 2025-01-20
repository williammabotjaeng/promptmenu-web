import * as React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { StepItem } from './StepItem';
import { AttributeInput } from './AttributeInput';
import { DropdownAttribute } from './DropdownAttribute';

const steps = [
    { number: 1, title: 'Headshot' },
    { number: 2, title: 'Skills' },
    { number: 3, title: 'Payment' },
    { number: 4, title: 'Attributes', isActive: true },
    { number: 5, title: 'Social' },
    { number: 6, title: 'ID' },
    { number: 7, title: 'Portfolio' },
    { number: 8, title: 'Review' }
];

export const PhysicalAttributes: React.FC = () => {
    return (
        <Box className="flex flex-col bg-black bg-opacity-0">
            <Box className="flex flex-col items-start w-full bg-black pb-[786px] max-md:pb-24">
                <Box className="flex flex-wrap gap-5 justify-between items-start self-stretch px-6 pt-6 pb-1 w-full text-2xl font-bold text-orange-300">
                    <Typography variant="h5" sx={{ py: 1 }}>
                        Staffing Solutions Hub
                    </Typography>
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/377ce87affad673cf7f5d3138d3d1ee6b127df7b315de3bffa354e6283205327?apiKey=7fae980a988640eea8add1e49a5d542e&"
                        alt=""
                        style={{ objectFit: 'contain', width: '18px' }}
                    />
                </Box>
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/04941e81747f3ecb6811e1684b15614793214440d6dff851abf37ed98ca1961c?apiKey=7fae980a988640eea8add1e49a5d542e&"
                    alt=""
                    style={{ objectFit: 'contain', zIndex: 10, marginTop: '-44px', marginLeft: '128px', maxWidth: '100%', width: '121px' }}
                />
                <Box className="flex z-10 flex-col items-center self-stretch px-16 -mt-24 w-full text-white">
                    <Box className="flex flex-wrap gap-5 justify-between pl-1.5 ml-6 max-w-full">
                        {steps.map((step) => (
                            <StepItem
                                key={step.number}
                                number={step.number}
                                title={step.title}
                                isActive={step.isActive}
                            />
                        ))}
                    </Box>
                </Box>
                <Box className="flex flex-col items-end px-20 mt-20 max-w-full">
                    <Paper className="flex flex-col p-8 max-w-full rounded-xl bg-stone-500 bg-opacity-10 w-[768px]">
                        <Typography variant="h5" sx={{ pt: 0.25, pb: 2, color: 'orange' }}>
                            Physical Attributes
                        </Typography>
                        <Box className="flex flex-col mt-6 w-full">
                            <Box className="flex flex-wrap gap-4">
                                <AttributeInput label="Height" placeholder="cm" />
                                <AttributeInput label="Weight" placeholder="kg" />
                            </Box>
                            <Box className="flex flex-wrap gap-4 mt-4 text-orange-300">
                                <DropdownAttribute label="Eye Color" value="Brown" />
                                <DropdownAttribute label="Hair Color" value="Black" />
                            </Box>
                        </Box>
                    </Paper>
                </Box>
                <Typography variant="caption" sx={{ px: 16, py: 7, mt: 20, mb: 0, ml: 5, color: 'gray', textAlign: 'center' }}>
                    Step 4 of 8 - Physical Attributes
                </Typography>
            </Box>
        </Box>
    );
};