import backgroundRctLarge from '~/assets/backgroundRTC.jpg';
import backgroundRctPlaceholder from '~/assets/backgroundRTC.jpg';
import backgroundRct from '~/assets/backgroundRTC.jpg';
import smartToolsLarge from '~/assets/smart-tools.jpeg';
import smartToolsPlaceholder from '~/assets/smart-tools.jpeg';
import smartTools from '~/assets/smart-tools.jpeg';
import ourAiLarge from '~/assets/our-ai.jpeg';
import ourAiPlaceholder from '~/assets/our-ai.jpeg';
import ourAi from '~/assets/our-ai.jpeg';
import signLanguageModelLarge from '~/assets/sign-language-model.jpeg';
import signLanguageModelPlaceholder from '~/assets/sign-language-model.jpeg';
import signLanguageModel from '~/assets/sign-language-model.jpeg';
import stsLarge from '~/assets/sts.jpeg';
import stsPlaceholder from '~/assets/sts.jpeg';
import sts from '~/assets/sts.jpeg';
import ttsLarge from '~/assets/tts.jpeg';
import ttsPlaceholder from '~/assets/tts.jpeg';
import tts from '~/assets/tts.jpeg';
import chatLarge from '~/assets/chat.jpeg';
import chatPlaceholder from '~/assets/chat.jpeg';
import chat from '~/assets/chat.jpeg';
import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
import { Loader } from '~/components/loader';
import { deviceModels } from '~/components/model/device-models';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import { media } from '~/utils/style';
import { Suspense, lazy, useState } from 'react';
import { useHydrated } from '~/hooks/useHydrated';
import styles from './volkihar-knight.module.css';

const Model = lazy(() => import('~/components/model').then(module => ({ default: module.Model })));

const title = 'EazyTalk - AI-Powered Accessible Communication App';
const description =
  'Designing inclusive communication through AI and sign language.';
const roles = [
  'Product Strategy',
  'UX & UI Design',
  'Mobile App Design',
  'Accessibility-Focused Design',
  'Interaction & Motion Design',
];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const VolkiharKnight = () => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [secondaryModelLoaded, setSecondaryModelLoaded] = useState(false);
  const [tertiaryModelLoaded, setTertiaryModelLoaded] = useState(false);
  const isHydrated = useHydrated();
  const phoneSizes = `(max-width: ${media.tablet}px) 60vw, 30vw`;

  function handleModelLoad() {
    setModelLoaded(true);
  }
  function handleSecondaryModelLoad() {
    setSecondaryModelLoaded(true);
  }
  function handleTertiaryModelLoad() {
    setTertiaryModelLoaded(true);
  }

  return (
    <ProjectContainer className={styles.volkiharKnight}>
      <ProjectBackground
        src={backgroundRct}
        srcSet={`${backgroundRct} 1280w, ${backgroundRctLarge} 2560w`}
        width={1280}
        height={800}
        placeholder={backgroundRctPlaceholder}
        opacity={0.8}
      />
      <ProjectHeader title={title} description={description} roles={roles} />
        <ProjectSection padding="top">
          <ProjectSectionContent>
          <div className={styles.phoneModel}>
            {!modelLoaded && (
              <Loader center className={styles.phoneLoader} />
            )}
            {isHydrated && (
              <Suspense>
                <div className={styles.model} data-device="phone">
                <Model
                  alt="EazyTalk mobile app screens"
                  cameraPosition={{ x: 0, y: 0, z: 11.5 }}
                  showDelay={300}
                  onLoad={handleModelLoad}
                  show
                  models={[
                    {
                      ...deviceModels.phone,
                      position: { x: -0.6, y: 1.1, z: 0 },
                      texture: {
                        srcSet: `${smartTools} 375w, ${smartToolsLarge} 750w`,
                        placeholder: smartToolsPlaceholder,
                        sizes: phoneSizes,
                      },
                    },
                    {
                      ...deviceModels.phone,
                      position: { x: 0.6, y: -0.5, z: 0.3 },
                      texture: {
                        srcSet: `${ourAi} 375w, ${ourAiLarge} 750w`,
                        placeholder: ourAiPlaceholder,
                        sizes: phoneSizes,
                      },
                    },
                  ]}
                />
                </div>
              </Suspense>
            )}
          </div>
        </ProjectSectionContent>
      </ProjectSection>
      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>The problem</ProjectSectionHeading>
          <ProjectSectionText>
            Communication barriers remain a major challenge for deaf and hard-of-hearing
            individuals. Existing solutions were fragmented, overly technical, or lacked
            a user-friendly mobile experience that combines chat, speech, and sign
            language in one place.
          </ProjectSectionText>
        </ProjectTextRow>
      </ProjectSection>
      <ProjectSection light>
        <ProjectSectionColumns width="full">
          <div className={styles.phoneModel}>
            {!tertiaryModelLoaded && (
              <Loader center className={styles.phoneLoader} />
            )}
            {isHydrated && (
              <Suspense>
                <div className={styles.model} data-device="phone">
                  <Model
                    alt="EazyTalk text-to-speech and chat screens"
                    cameraPosition={{ x: 0, y: 0, z: 11.5 }}
                    showDelay={300}
                    onLoad={handleTertiaryModelLoad}
                    show
                    models={[
                      {
                        ...deviceModels.phone,
                        position: { x: -0.6, y: 1.1, z: 0 },
                        texture: {
                          srcSet: `${tts} 375w, ${ttsLarge} 750w`,
                          placeholder: ttsPlaceholder,
                          sizes: phoneSizes,
                        },
                      },
                      {
                        ...deviceModels.phone,
                        position: { x: 0.6, y: -0.5, z: 0.3 },
                        texture: {
                          srcSet: `${chat} 375w, ${chatLarge} 750w`,
                          placeholder: chatPlaceholder,
                          sizes: phoneSizes,
                        },
                      },
                    ]}
                  />
                </div>
              </Suspense>
            )}
          </div>
          <ProjectSectionContent width="full">
            <ProjectTextRow>
              <ProjectSectionHeading>Design system</ProjectSectionHeading>
              <ProjectSectionText>
                A mobile-first UI system prioritized accessibility, clarity, and
                consistency. It supports chat, speech-to-text, and sign translation
                workflows while keeping navigation predictable and easy to use.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSectionColumns>
      </ProjectSection>
      <ProjectSection>
        <ProjectSectionColumns width="full">
          <ProjectSectionContent width="full">
            <ProjectTextRow width="s">
              <ProjectSectionHeading>Encouraging accessibility</ProjectSectionHeading>
              <ProjectSectionText>
                EazyTalk adapts to user preferences with AI chat, speech-to-text, and
                sign language translation. The flow favors fast mode switching and
                clear feedback so users can communicate confidently.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
          <div className={styles.phoneModel}>
            {!secondaryModelLoaded && (
              <Loader center className={styles.phoneLoader} />
            )}
            {isHydrated && (
              <Suspense>
                <div className={styles.model} data-device="phone">
                  <Model
                    alt="EazyTalk sign language and speech-to-text screens"
                    cameraPosition={{ x: 0, y: 0, z: 11.5 }}
                    showDelay={300}
                    onLoad={handleSecondaryModelLoad}
                    show
                    models={[
                      {
                        ...deviceModels.phone,
                        position: { x: -0.6, y: 1.1, z: 0 },
                        texture: {
                          srcSet: `${signLanguageModel} 375w, ${signLanguageModelLarge} 750w`,
                          placeholder: signLanguageModelPlaceholder,
                          sizes: phoneSizes,
                        },
                      },
                      {
                        ...deviceModels.phone,
                        position: { x: 0.6, y: -0.5, z: 0.3 },
                        texture: {
                          srcSet: `${sts} 375w, ${stsLarge} 750w`,
                          placeholder: stsPlaceholder,
                          sizes: phoneSizes,
                        },
                      },
                    ]}
                  />
                </div>
              </Suspense>
            )}
          </div>
        </ProjectSectionColumns>
      </ProjectSection>
      <ProjectSection>
        <ProjectSectionContent>
          <ProjectTextRow center centerMobile noMargin>
            <ProjectSectionHeading>Project outcomes</ProjectSectionHeading>
            <ProjectSectionText>
              Delivered a clean, inclusive mobile experience that unified AI
              communication tools, improved usability through clear navigation, and
              established a scalable foundation for future features.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSectionContent>
      </ProjectSection>
      <Footer />
    </ProjectContainer>
  );
};
