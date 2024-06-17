import { Collapse, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { List } from '@mui/material';
import { NextPage } from 'next/types';
import React, { useEffect, useState } from 'react';
import IconifyIcon from 'src/components/Icon';
import { VerticalItems } from 'src/configs/layout';

type TProps = {
    open: boolean;
};

type RecursiveListItemProps = {
    items: any;
    level: number;
    disabled: boolean;
    openItems: { [key: string]: boolean };
    setOpenItems: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
};

const RecursiveListItem: React.FC<RecursiveListItemProps> = ({ items, level, openItems, setOpenItems, disabled }) => {
    const handleClick = (title: string) => {
        setOpenItems((prev) => ({
            ...prev,
            [title]: !prev[title]
        }));
    };

    return (
        <>
            {items.map((item: any) => (
                <React.Fragment key={item.title}>
                    <ListItemButton
                        sx={{ padding: `4px 10px 4px ${level * 10}px` }}
                        onClick={() => {
                            if (item.childrens) {
                                handleClick(item.title);
                            }
                        }}
                    >
                        <ListItemIcon sx={{ padding: '9px' }}>
                            <IconifyIcon icon={item.icon} />
                        </ListItemIcon>
                        {!disabled && <ListItemText primary={item.title} />}
                        {item.childrens && item.childrens.length > 0 && (
                            <>
                                {openItems[item.title] ? (
                                    <IconifyIcon icon="ic:outline-expand-less" />
                                ) : (
                                    <IconifyIcon icon="ic:outline-expand-more" />
                                )}
                            </>
                        )}
                    </ListItemButton>
                    {item.childrens && item.childrens.length > 0 && (
                        <Collapse in={openItems[item.title]} timeout="auto" unmountOnExit>
                            <RecursiveListItem items={item.childrens} level={level + 1} openItems={openItems} setOpenItems={setOpenItems} disabled={disabled} />
                        </Collapse>
                    )}
                </React.Fragment>
            ))}
        </>
    );
};

const ListVerticalLayout: NextPage<TProps> = ({ open }) => {
    const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
    useEffect(() => {
        if (!open) {
            setOpenItems({});
        }
    }, [open]);

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <RecursiveListItem items={VerticalItems} level={1} openItems={openItems} setOpenItems={setOpenItems} disabled={!open} />
        </List>
    );
};

export default ListVerticalLayout;
