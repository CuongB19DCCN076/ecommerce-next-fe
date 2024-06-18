// ** react
import { useState } from 'react';

// ** mui
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Box, BoxProps, IconButton, styled } from '@mui/material';

// ** icon
import IconifyIcon from 'src/components/Icon';
import { LANGUAGE_OPTIONS } from 'src/configs/i18n';
import { useTranslation } from 'react-i18next';

interface IBox extends BoxProps {
    selected: boolean
}

const StyledItemLanguage = styled(Box)<IBox>(({ selected }) => {

    return ({
        margin: "5px",
        borderRadius: "10px",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "red",
        },
        "& .MuiTypography-root": {
            padding: "10px 20px",
            color: selected ? "#7367f0" : "inherit",
        },
        "& .MuiTypography-root:hover": {
            color: "white",
        },
    })
}
);

const LanguageDropdown = () => {
    // state
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    // const {i18} = use

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const { i18n } = useTranslation();
    const handleChangeLanguage = (language: string) => {
        i18n.changeLanguage(language);
        setAnchorEl(null);
    }
    const open = Boolean(anchorEl);

    return (
        <div>
            <IconButton color='default' size='large' id={"language-dropdown"} onClick={handleClick}>
                {/* <Image fill src={"/images/english-logo.png"} alt={"language"} /> */}
                <IconifyIcon icon={"material-symbols:g-translate"} />
            </IconButton>
            <Popover
                id={"language-dropdown"}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {LANGUAGE_OPTIONS.map((language) => (
                    <StyledItemLanguage selected={language.value === i18n.language} key={language.value} onClick={() => handleChangeLanguage(language.value)}><Typography >{language.lang}</Typography></StyledItemLanguage>
                ))}

            </Popover>
        </div>
    );
}

export default LanguageDropdown;