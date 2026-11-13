import { memo, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Drawer } from '@/shared/ui/Drawer';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';

export const ArticlePageGreeting = memo(() => {
    const [isOpen, setIsOpen] = useState(false);
    const { isArticlesPageWasOpened } = useJsonSettings();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isArticlesPageWasOpened) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsOpen(true);
            dispatch(saveJsonSettings({ isArticlesPageWasOpened: true }));
        }
    }, [dispatch, isArticlesPageWasOpened]);

    const onClose = () => setIsOpen(false);

    const text = (
        <Text
            title="Добро пожаловать на страницу сатей"
            text="Здесь Вы можете искать и просматривать статьи на различные темы"
        />
    );

    if (isMobile) {
        return <Drawer>{text}</Drawer>;
    }

    return (
        <Modal lazy isOpen={isOpen} onClose={onClose}>
            {text}
        </Modal>
    );
});

ArticlePageGreeting.displayName = 'ArticlePageGreeting';
