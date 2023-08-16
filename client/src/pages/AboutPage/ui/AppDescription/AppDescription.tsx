import React, { memo } from 'react';
import { Text } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';
import { appDescription } from '../../model/textContent/textContent';
import { Icon } from '@/shared/ui/Icon';
import AppLogo from '@/shared/assets/icons/applogo.svg';
import { Card } from '@/shared/ui/Card';

interface AppDescriptionProps {
    className?: string;
}

export const AppDescription = memo((props: AppDescriptionProps) => {
    const { className } = props;
    return (
        <Card max padding="24" className={className}>
            <VStack max align="center">
                <Icon Svg={AppLogo} width={200} height={200} />
                <VStack max gap="16">
                    {appDescription.map((block, index) => (
                        <React.Fragment key={index}>
                            {block.title && block.text && (
                                <VStack max gap="8">
                                    <Text title={block.title} bold size="l" />
                                    <Text text={block.text} />
                                </VStack>
                            )}
                            {block.title && block.paragraphs && (
                                <VStack key={index} gap="8">
                                    <Text title={block.title} bold size="l" />
                                    {block.paragraphs.map(
                                        (paragraph, index) => (
                                            <Text
                                                key={index}
                                                text={paragraph}
                                            />
                                        ),
                                    )}
                                </VStack>
                            )}
                        </React.Fragment>
                    ))}
                </VStack>
            </VStack>
        </Card>
    );
});
