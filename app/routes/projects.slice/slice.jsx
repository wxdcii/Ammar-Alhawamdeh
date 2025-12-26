import backgroundRctLarge from '~/assets/backgroundRTC.jpg';
import backgroundRctPlaceholder from '~/assets/backgroundRTC.jpg';
import backgroundRct from '~/assets/backgroundRTC.jpg';
import rctHeroLarge from '~/assets/rct.png';
import rctHeroPlaceholder from '~/assets/rct.png';
import rctHero from '~/assets/rct.png';
import rctShowcaseLarge from '~/assets/rct1.png';
import rctShowcasePlaceholder from '~/assets/rct1.png';
import rctShowcase from '~/assets/rct1.png';
import rctSystemLarge from '~/assets/rct2.png';
import rctSystemPlaceholder from '~/assets/rct2.png';
import rctSystem from '~/assets/rct2.png';
import rctVideoLarge from '~/assets/RCT.mp4';
import rctVideoPlaceholder from '~/assets/rct2.png';
import rctVideo from '~/assets/RCT.mp4';
import { Button } from '~/components/button';
import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
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
import styles from './slice.module.css';

const title = 'Royal Class Travel & Tourism Website';
const description = 'Designing a premium digital experience for luxury travel.';
const roles = [
  'Art Direction',
  'UX & UI Design',
  'Front-End Development',
  'Responsive Design',
  'Motion & Interaction Design',
];
const projectUrl = 'https://rct-uae.com/';

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const Slice = () => {
  return (
    <ProjectContainer className={styles.slice}>
      <ProjectBackground
        src={backgroundRct}
        srcSet={`${backgroundRct} 1280w, ${backgroundRctLarge} 2560w`}
        width={1280}
        height={800}
        placeholder={backgroundRctPlaceholder}
        opacity={0.8}
      />
      <ProjectHeader title={title} description={description} url={projectUrl} roles={roles} />
      <ProjectSection padding="top">
        <ProjectSectionContent>
          <ProjectImage
            raised
            srcSet={`${rctHero} 800w, ${rctHeroLarge} 1920w`}
            width={800}
            height={500}
            placeholder={rctHeroPlaceholder}
            alt="Royal Class Travel website hero and featured offers."
            sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
          />
        </ProjectSectionContent>
      </ProjectSection>
      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>The problem</ProjectSectionHeading>
          <ProjectSectionText>
            Royal Class Travel & Tourism needed a modern digital presence that reflected
            its premium services and competitive positioning in the UAE travel market.
            The visual identity felt outdated, package-heavy content was difficult to
            browse, and enquiry paths were not clear. The experience also needed to
            support frequent updates, multiple destinations, seasonal campaigns, and a
            responsive, multilingual-ready layout.
          </ProjectSectionText>
          <Button secondary iconHoverShift icon="chevron-right" href={projectUrl}>
            Check website
          </Button>
        </ProjectTextRow>
      </ProjectSection>
      <ProjectSection light>
        <ProjectSectionContent>
          <Image
            srcSet={`${rctShowcase} 800w, ${rctShowcaseLarge} 1920w`}
            width={800}
            height={500}
            placeholder={rctShowcasePlaceholder}
            alt="Royal Class travel packages and offers layout."
            sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
          />
          <ProjectTextRow>
            <ProjectSectionHeading>Scope of work</ProjectSectionHeading>
            <ProjectSectionText>
              Art direction, UX and UI design, front-end development, responsive design,
              and light motion and interaction design for a luxury travel platform.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSectionContent>
      </ProjectSection>
      <ProjectSection>
        <ProjectSectionContent>
          <Image
            raised
            srcSet={`${rctSystem} 800w, ${rctSystemLarge} 1920w`}
            width={800}
            height={500}
            placeholder={rctSystemPlaceholder}
            alt="Royal Class design system components and layout."
            sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
          />
          <ProjectTextRow>
            <ProjectSectionHeading>Design system</ProjectSectionHeading>
            <ProjectSectionText>
              A lightweight UI system ensured consistency across offers, packages, and
              landing pages while staying flexible for seasonal campaigns. Typography,
              cards, CTAs, and responsive behaviors were documented to keep delivery
              fast and scalable.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSectionContent>
      </ProjectSection>
      <ProjectSection
        backgroundOverlayOpacity={0.5}
        backgroundElement={
          <Image
            srcSet={`${backgroundRct} 1280w, ${backgroundRctLarge} 2560w`}
            width={1280}
            height={900}
            placeholder={backgroundRctPlaceholder}
            alt="Luxury travel destination imagery background."
            sizes="100vw"
          />
        }
      >
        <ProjectSectionColumns width="full">
          <ProjectSectionContent width="full">
            <ProjectTextRow width="s">
              <ProjectSectionHeading>Motion design</ProjectSectionHeading>
              <ProjectSectionText>
                Subtle motion and interaction feedback were used to enhance clarity
                without distracting from content. Hover states and smooth transitions
                guide attention to offers, pricing, and calls to action.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
          <Image
            raised
            srcSet={`${rctVideo} 1280w, ${rctVideoLarge} 2560w`}
            width={1280}
            height={800}
            placeholder={rctVideoPlaceholder}
            alt="A tour of Royal Class travel packages and featured offers."
            sizes={`(max-width: ${media.mobile}px) 100vw, 50vw`}
          />
        </ProjectSectionColumns>
      </ProjectSection>
      <ProjectSection>
        <ProjectSectionContent>
          <ProjectTextRow center centerMobile noMargin>
            <ProjectSectionHeading>Project outcomes</ProjectSectionHeading>
            <ProjectSectionText>
              The website generated over 2M AED in sales through improved discovery,
              clearer enquiry paths, and a premium, trust-building experience.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSectionContent>
      </ProjectSection>
      <Footer />
    </ProjectContainer>
  );
};
