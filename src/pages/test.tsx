import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import { } from "@iconify/react"
import IconifyIcon from "src/components/Icon";
import CustomTextField from "src/components/text-field";




const TestPage: NextPage = () => {
    const [expand, setExpand] = useState<string | false>(false);
    const handleExpand = (isExpand: boolean, panel: string) => {
        setExpand(isExpand ? panel : false)
    }

    return (
        <div>
            <CustomTextField label={"Hello"} helperText={"âsssss"} />
            <Accordion expanded={expand === "panel1"} onChange={(e: any, isExpand) => handleExpand(isExpand, "panel1")}>
                <AccordionSummary id="panel-header" aria-controls="panel-content" expandIcon={<IconifyIcon icon={"ooui:expand"} />}>
                    <Typography component={"h1"} variant="h2">Accordion</Typography>
                </AccordionSummary>
                <AccordionDetails >
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsam quibusdam saepe, architecto fugiat eveniet culpa explicabo sed molestias itaque iste, earum unde deserunt atque perspiciatis neque nisi numquam perferendis!
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expand === "panel2"} onChange={(e: any, isExpand) => handleExpand(isExpand, "panel2")}>
                <AccordionSummary id="panel2-header" aria-controls="panel2-content" expandIcon={<IconifyIcon icon={"ooui:expand"} />}>
                    <Typography component={"h1"} variant="h2">Accordion</Typography>
                </AccordionSummary>
                <AccordionDetails >
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsam quibusdam saepe, architecto fugiat eveniet culpa explicabo sed molestias itaque iste, earum unde deserunt atque perspiciatis neque nisi numquam perferendis!
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expand === "panel3"} onChange={(e: any, isExpand) => handleExpand(isExpand, "panel3")}>
                <AccordionSummary id="panel3-header" aria-controls="panel3-content" expandIcon={<IconifyIcon icon={"ooui:expand"} />}>
                    <Typography component={"h1"} variant="h2">Accordion</Typography>
                </AccordionSummary>
                <AccordionDetails >
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsam quibusdam saepe, architecto fugiat eveniet culpa explicabo sed molestias itaque iste, earum unde deserunt atque perspiciatis neque nisi numquam perferendis!
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default TestPage;

