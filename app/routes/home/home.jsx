import smartToolsLarge from '~/assets/smart-tools.jpeg';
import smartToolsPlaceholder from '~/assets/smart-tools.jpeg';
import smartTools from '~/assets/smart-tools.jpeg';
import ourAiLarge from '~/assets/our-ai.jpeg';
import ourAiPlaceholder from '~/assets/our-ai.jpeg';
import ourAi from '~/assets/our-ai.jpeg';
import obysTextureLarge from '~/assets/obys.png';
import obysTexturePlaceholder from '~/assets/obys.png';
import obysTexture from '~/assets/obys.png';
import rctTextureLarge from '~/assets/rct.png';
import rctTexturePlaceholder from '~/assets/rct.png';
import rctTexture from '~/assets/rct.png';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Software Developer',
    description: `Portfolio of ${config.name} - a software developer building web, app, and AI experiences with modern JavaScript.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Obys Agency - Crafting Award-Winning Digital Experiences"
        description="Designing world-class web, branding, and interactive products"
        buttonText="View project"
        buttonLink="/projects/smart-sparrow"
        model={{
          type: 'laptop',
          alt: 'Obys Agency homepage with bold typography and featured work',
          textures: [
            {
              srcSet: `${obysTexture} 800w, ${obysTextureLarge} 1920w`,
              placeholder: obysTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="EazyTalk - AI-Powered Accessible Communication App"
        description="Designing inclusive communication through AI and sign language"
        buttonText="View project"
        buttonLink="/projects/volkihar-knight"
        model={{
          type: 'phone',
          alt: 'EazyTalk mobile app interface',
          textures: [
            {
              srcSet: `${ourAi} 375w, ${ourAiLarge} 750w`,
              placeholder: ourAiPlaceholder,
            },
            {
              srcSet: `${smartTools} 375w, ${smartToolsLarge} 750w`,
              placeholder: smartToolsPlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Royal Class Travel & Tourism Website"
        description="Designing a premium digital experience for luxury travel"
        buttonText="View project"
        buttonLink="/projects/slice"
        model={{
          type: 'laptop',
          alt: 'Royal Class Travel and Tourism website homepage',
          textures: [
            {
              srcSet: `${rctTexture} 800w, ${rctTextureLarge} 1920w`,
              placeholder: rctTexturePlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
