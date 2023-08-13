import React, { useCallback, useState } from 'react';
import { Page } from '@/widgets/Page';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import cls from './AboutPage.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { AppTechStack } from '../AppTechStack/AppTechStack';
import { AppDescription } from '../AppDescription/AppDescription';
import { AboutPageContentSwitcher } from '../AboutPageContentSwitcher/AboutPageContentSwitcher';
import { ProjectInfo } from '../../model/const/const';

const AboutPage = () => {
    const [renderContent, setRenderContent] = useState(
        ProjectInfo.AboutWebsite,
    );

    const onChangeRenderContentHandler = useCallback((content: ProjectInfo) => {
        setRenderContent(content);
    }, []);

    const content = (
        <Page data-testid="AboutPage">
            <VStack max gap="8">
                {renderContent === ProjectInfo.AboutWebsite ? (
                    <AppDescription />
                ) : (
                    <AppTechStack />
                )}
            </VStack>
        </Page>
    );

    return (
        <StickyContentLayout
            content={content}
            right={
                <AboutPageContentSwitcher
                    value={renderContent}
                    onChangeType={onChangeRenderContentHandler}
                    className={cls.rightbar}
                />
            }
        />
    );
};

export default AboutPage;
