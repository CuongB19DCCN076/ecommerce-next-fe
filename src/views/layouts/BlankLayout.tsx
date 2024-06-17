// ** next
import { NextPage } from "next";

// ** mui
import { Box, BoxProps, styled } from "@mui/material";

type TProps = {
    children: React.ReactNode;
};

const BlankLayoutWrapper = styled(Box)<BoxProps>(({ }) => ({
    height: "100vh"
}));

const BlankLayout: NextPage<TProps> = ({ children }) => {
    return (
        <BlankLayoutWrapper>
            <Box sx={{
                overflow: "hidden",
                minHeight: "100vh" // Đặt chiều cao tối thiểu cho Box là 100vh
            }}>
                {children}
            </Box>
        </BlankLayoutWrapper>
    );
};

export default BlankLayout;
