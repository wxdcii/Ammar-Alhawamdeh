import backgroundSprLarge from '~/assets/backgroundRTC.jpg';
import backgroundSprPlaceholder from '~/assets/backgroundRTC.jpg';
import imageSprBackgroundVolcanismLarge from '~/assets/backgroundRTC.jpg';
import imageSprBackgroundVolcanismPlaceholder from '~/assets/backgroundRTC.jpg';
import imageSprBackgroundVolcanism from '~/assets/backgroundRTC.jpg';
import backgroundSpr from '~/assets/backgroundRTC.jpg';
import imageSprComponentsDarkLarge from '~/assets/obys1.png';
import imageSprComponentsDarkPlaceholder from '~/assets/obys1.png';
import imageSprComponentsDark from '~/assets/obys1.png';
import imageSprComponentsLightLarge from '~/assets/obys1.png';
import imageSprComponentsLightPlaceholder from '~/assets/obys1.png';
import imageSprComponentsLight from '~/assets/obys1.png';
import imageSprDesignSystemDarkLarge from '~/assets/obys2.png';
import imageSprDesignSystemDarkPlaceholder from '~/assets/obys2.png';
import imageSprDesignSystemDark from '~/assets/obys2.png';
import imageSprDesignSystemLightLarge from '~/assets/obys2.png';
import imageSprDesignSystemLightPlaceholder from '~/assets/obys2.png';
import imageSprDesignSystemLight from '~/assets/obys2.png';
import imageSprLessonBuilderDarkLarge from '~/assets/obys.png';
import imageSprLessonBuilderDarkPlaceholder from '~/assets/obys.png';
import imageSprLessonBuilderDark from '~/assets/obys.png';
import imageSprLessonBuilderLightLarge from '~/assets/obys.png';
import imageSprLessonBuilderLightPlaceholder from '~/assets/obys.png';
import imageSprLessonBuilderLight from '~/assets/obys.png';
import videoSprMotionLarge from '~/assets/obys.mp4';
import videoSprMotionPlaceholder from '~/assets/obys3.png';
import videoSprMotion from '~/assets/obys.mp4';
import { Button } from '~/components/button';
import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
import { SegmentedControl, SegmentedControlOption } from '~/components/segmented-control';
import { ThemeProvider, useTheme } from '~/components/theme-provider';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import { media } from '~/utils/style';
import { Suspense, lazy, useMemo } from 'react';
import styles from './smart-sparrow.module.css';

const Earth = lazy(() => import('./earth').then(module => ({ default: module.Earth })));
const EarthSection = lazy(() =>
  import('./earth').then(module => ({ default: module.EarthSection }))
);

const title = 'Obys Agency - Crafting Award-Winning Digital Experiences';
const description =
  'Designing world-class web, branding, and interactive products for an award-winning creative studio.';
const roles = [
  'Art Direction',
  'UX & UI Design',
  'Front-End Development',
  'Branding',
  'Interactive & Motion Design',
];
const projectUrl = 'https://obys.agency/';

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const SmartSparrow = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const themes = ['dark', 'light'];

  const handleThemeChange = index => {
    toggleTheme(themes[index]);
  };

  return (
    <>
      <ProjectContainer>
        <ProjectBackground
          opacity={isDark ? 0.5 : 0.8}
          src={backgroundSpr}
          srcSet={`${backgroundSpr} 1080w, ${backgroundSprLarge} 2160w`}
          placeholder={backgroundSprPlaceholder}
        />
        <ProjectHeader
          title={title}
          description={description}
          url={projectUrl}
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              raised
              key={theme}
              srcSet={
                isDark
                  ? `${imageSprLessonBuilderDark} 1280w, ${imageSprLessonBuilderDarkLarge} 2560w`
                  : `${imageSprLessonBuilderLight} 1280w, ${imageSprLessonBuilderLightLarge} 2560w`
              }
              width={1280}
              height={800}
              placeholder={
                isDark
                  ? imageSprLessonBuilderDarkPlaceholder
                  : imageSprLessonBuilderLightPlaceholder
              }
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="Obys Agency hero section with bold typography and featured work."
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>The problem</ProjectSectionHeading>
            <ProjectSectionText>
              Obys Agency needed a digital platform that did more than list services.
              The previous presence lacked clarity around the studio's strengths, awards,
              and the breadth of work across design, development, and branding. The site
              needed to communicate creative identity with precision and support diverse
              case study formats.
            </ProjectSectionText>
            <Button
              secondary
              iconHoverShift
              className={styles.linkButton}
              icon="chevron-right"
              href={projectUrl}
            >
              Check website
            </Button>
          </ProjectTextRow>
        </ProjectSection>
        <ProjectSection light={isDark}>
          <ProjectSectionContent>
            <Image
              key={theme}
              srcSet={
                isDark
                  ? `${imageSprComponentsDark} 1024w, ${imageSprComponentsDarkLarge} 2048w`
                  : `${imageSprComponentsLight} 1024w, ${imageSprComponentsLightLarge} 2048w`
              }
              width={1024}
              hright={800}
              placeholder={
                isDark
                  ? imageSprComponentsDarkPlaceholder
                  : imageSprComponentsLightPlaceholder
              }
              alt={`A set of ${theme} themed components for the Obys visual system`}
              sizes="100vw"
            />
            <ProjectTextRow>
              <SegmentedControl
                currentIndex={themes.indexOf(theme)}
                onChange={handleThemeChange}
              >
                <SegmentedControlOption>Dark theme</SegmentedControlOption>
                <SegmentedControlOption>Light theme</SegmentedControlOption>
              </SegmentedControl>
            </ProjectTextRow>
            <ProjectTextRow>
              <ProjectSectionHeading>Scope of work</ProjectSectionHeading>
              <ProjectSectionText>
                Art direction, UX and UI design, branding, front-end development, and
                interactive motion design for a world-class agency presence.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              raised
              key={theme}
              srcSet={
                isDark
                  ? `${imageSprDesignSystemDark} 1280w, ${imageSprDesignSystemDarkLarge} 2560w`
                  : `${imageSprDesignSystemLight} 1280w, ${imageSprDesignSystemLightLarge} 2560w`
              }
              width={1280}
              height={800}
              placeholder={
                isDark
                  ? imageSprDesignSystemDarkPlaceholder
                  : imageSprDesignSystemLightPlaceholder
              }
              alt="Obys design system documentation with typography, layout, and cards."
              sizes="100vw"
            />
            <ProjectTextRow>
              <ProjectSectionHeading>Design system</ProjectSectionHeading>
              <ProjectSectionText>
                A unified visual system maintained consistency across the portfolio while
                preserving creative flexibility. Typography, grid layout, and interaction
                cues were standardized to keep the experience cohesive and scalable.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection
          backgroundOverlayOpacity={0.5}
          backgroundElement={
            <Image
              srcSet={`${imageSprBackgroundVolcanism} 1280w, ${imageSprBackgroundVolcanismLarge} 2560w`}
              width={1280}
              height={900}
              placeholder={imageSprBackgroundVolcanismPlaceholder}
              alt="Obys Agency background imagery."
              sizes="100vw"
            />
          }
        >
          <ProjectSectionColumns width="full">
            <ProjectSectionContent width="full">
              <ProjectTextRow width="s">
                <ProjectSectionHeading>Motion design</ProjectSectionHeading>
                <ProjectSectionText>
                  Subtle micro-interactions and animated transitions reinforce engagement,
                  highlight project thumbnails, and guide visitors through the portfolio.
                </ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
            <Image
              raised
              className={styles.video}
              srcSet={`${videoSprMotion} 1280w, ${videoSprMotionLarge} 2560w`}
              width={1280}
              height={800}
              placeholder={videoSprMotionPlaceholder}
              alt="A tour of Obys project highlights and portfolio sections."
              sizes={`(max-width: ${media.mobile}px) 100vw, 50vw`}
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection
          backgroundOverlayOpacity={0.5}
          backgroundElement={
            <Image
              srcSet={`${imageSprBackgroundVolcanism} 1280w, ${imageSprBackgroundVolcanismLarge} 2560w`}
              width={1280}
              height={900}
              placeholder={imageSprBackgroundVolcanismPlaceholder}
              alt="Obys Agency hero background."
              sizes="100vw"
            />
          }
        >
          <ProjectSectionContent>
            <ProjectTextRow center>
              <ProjectSectionHeading>Hero visual and messaging</ProjectSectionHeading>
              <ProjectSectionText>
                A bold, minimalist hero with high-contrast typography and dynamic content
                blocks introduces Obys as a creative leader and signals the studio's
                aesthetic and strategic thinking.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ThemeProvider theme="dark" data-invert>
          <Suspense>
            <Earth
              className={styles.earth}
              hideMeshes={useMemo(
                () => ['Atmosphere', 'EarthPartial', 'Chunk', 'EarthFull'],
                []
              )}
              position={useMemo(() => [0, 0, 0], [])}
              labels={useMemo(
                () => [
                  {
                    position: [0.54, 0.19, 0.18],
                    text: 'Portfolio',
                    hidden: true,
                  },
                  {
                    position: [0.47, -0.38, 0.04],
                    text: 'Awards',
                    hidden: true,
                  },
                  {
                    position: [0.22, 0.44, -0.35],
                    text: 'Branding',
                    hidden: true,
                  },
                  {
                    position: [0.16, -0.06, 0.58],
                    text: 'Interaction',
                    hidden: true,
                  },
                  {
                    position: [0.11, 0.2, -0.56],
                    text: 'Web',
                    hidden: true,
                  },
                  {
                    position: [0.52, 0.2, -0.23],
                    text: 'Motion',
                    hidden: true,
                  },
                  {
                    position: [-0.24, 0.75, 0.24],
                    text: 'Strategy',
                    delay: 800,
                    hidden: true,
                  },
                  {
                    position: [-0.24, 0.55, 0.24],
                    text: 'Identity',
                    delay: 800,
                    hidden: true,
                  },
                  {
                    position: [-0.24, 0.35, 0.24],
                    text: 'Recognition',
                    delay: 800,
                    hidden: true,
                  },
                ],
                []
              )}
              scale={0.6}
            >
              <EarthSection
                scrim
                animations={['0:loop']}
                camera={[0, 0, 1.5]}
                meshes={['Atmosphere', 'EarthFull']}
              >
                <ProjectSection>
                  <ProjectSectionContent>
                    <ProjectTextRow center>
                      <ProjectSectionHeading>Global impact</ProjectSectionHeading>
                      <ProjectSectionText>
                        A bold, award-focused presentation that positions Obys as a
                        globally recognized studio with a diverse portfolio and clear
                        creative identity.
                      </ProjectSectionText>
                    </ProjectTextRow>
                  </ProjectSectionContent>
                </ProjectSection>
              </EarthSection>
              <EarthSection
                animations={['0:loop']}
                camera={[0, 0, 2.4]}
                meshes={['Atmosphere', 'EarthFull']}
              />
              <EarthSection
                animations={['0:loop']}
                camera={[1.14, -1.39, 0.94]}
                meshes={['Atmosphere', 'EarthFull']}
              >
                <ProjectSection>
                  <ProjectSectionContent width="xl">
                    <ProjectTextRow justify="end" width="s">
                      <ProjectSectionHeading level={4} as="h3">
                        Portfolio storytelling
                      </ProjectSectionHeading>
                      <ProjectSectionText>
                        Clear category structure and case study formats keep the work
                        easy to explore while preserving the agency's distinctive tone.
                      </ProjectSectionText>
                    </ProjectTextRow>
                  </ProjectSectionContent>
                </ProjectSection>
              </EarthSection>
              <EarthSection
                animations={['0:loop']}
                camera={[1.17, 0.69, -1.47]}
                meshes={['Atmosphere', 'EarthFull']}
                labels={[
                  'Portfolio',
                  'Awards',
                  'Branding',
                  'Interaction',
                  'Web',
                  'Motion',
                ]}
              >
                <ProjectSection>
                  <ProjectSectionContent width="xl">
                    <ProjectTextRow justify="start" width="s">
                      <ProjectSectionHeading level={4} as="h3">
                        Awards and credibility
                      </ProjectSectionHeading>
                      <ProjectSectionText>
                        Awards, recognitions, and highlights are surfaced alongside work
                        to build trust with global clients.
                      </ProjectSectionText>
                    </ProjectTextRow>
                  </ProjectSectionContent>
                </ProjectSection>
              </EarthSection>
              <EarthSection
                animations={['0:loop']}
                camera={[1.81, 0.51, 0.43]}
                meshes={['Atmosphere', 'EarthFull']}
                labels={[
                  'Portfolio',
                  'Awards',
                  'Branding',
                  'Interaction',
                  'Web',
                  'Motion',
                ]}
              />
              <EarthSection
                animations={['0:loop']}
                camera={[0.37, 1.02, 1.84]}
                meshes={['EarthPartial', 'Chunk']}
                labels={['Strategy', 'Identity', 'Recognition']}
              >
                <ProjectSection>
                  <ProjectSectionContent width="xl">
                    <ProjectTextRow justify="end" width="s">
                      <ProjectSectionHeading level={4} as="h3">
                        Scalable system
                      </ProjectSectionHeading>
                      <ProjectSectionText>
                        The system supports new work, awards, and long-form storytelling
                        without sacrificing clarity or performance.
                      </ProjectSectionText>
                    </ProjectTextRow>
                  </ProjectSectionContent>
                </ProjectSection>
              </EarthSection>
              <EarthSection
                scrimReverse
                animations={['0:loop']}
                camera={[0.37, 1.02, 1.84]}
                meshes={['Atmosphere', 'EarthFull']}
              />
            </Earth>
          </Suspense>
        </ThemeProvider>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
            <ProjectSectionHeading>Project outcomes</ProjectSectionHeading>
            <ProjectSectionText>
                A refined web presence that communicates Obys' design leadership, improves
                portfolio clarity, and supports future growth with scalable content.
            </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
};
