import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type ChapterItem = {
  title: string;
  slug: string;
  description: ReactNode;
};

type SectionItem = {
  label: string;
  chapters: ChapterItem[];
};

const sections: SectionItem[] = [
  {
    label: 'Getting Started',
    chapters: [
      {
        title: 'GUI to BUI to DWC',
        slug: '/gui-to-bui-to-dwc',
        description: (
          <>
            Learn the fundamentals of transitioning from BBj GUI applications to
            Browser User Interface (BUI) and Dynamic Web Client (DWC).
          </>
        ),
      },
      {
        title: 'Browser Developer Tools, CSS, and Themes',
        slug: '/browser-developer-tools',
        description: (
          <>
            Master browser Developer Tools, CSS fundamentals, CSS custom
            properties, and DWC themes for styling your applications.
          </>
        ),
      },
      {
        title: 'DWC Debugging',
        slug: '/dwc-debugging',
        description: (
          <>
            Explore debugging techniques specific to the Dynamic Web Client
            including the DWC debug console and browser tools.
          </>
        ),
      },
    ],
  },
  {
    label: 'Core Concepts',
    chapters: [
      {
        title: 'Upgrading Apps to DWC',
        slug: '/upgrading-apps',
        description: (
          <>
            Learn how to upgrade existing GUI or BUI applications to DWC,
            including working with ARC files and BBjGrids.
          </>
        ),
      },
      {
        title: 'DWC Controls With Extended Attributes',
        slug: '/dwc-controls',
        description: (
          <>
            Discover BBj controls implemented as web components with extended
            attributes, themes, and enhanced functionality.
          </>
        ),
      },
      {
        title: 'Flow Layouts and CSS for Responsive Design',
        slug: '/flow-layouts',
        description: (
          <>
            Master CSS layout strategies including Flexbox and Grid to create
            responsive BBj applications that adapt to any screen size.
          </>
        ),
      },
    ],
  },
  {
    label: 'Advanced Topics',
    chapters: [
      {
        title: 'Icon Pools',
        slug: '/icon-pools',
        description: (
          <>
            Learn to use built-in icon pools to easily add icons to your BBj
            controls without managing image files.
          </>
        ),
      },
      {
        title: 'Control Validation',
        slug: '/control-validation',
        description: (
          <>
            Implement control validation with visual feedback using built-in
            validation capabilities and custom validation logic.
          </>
        ),
      },
      {
        title: 'Browser Constraints',
        slug: '/browser-constraints',
        description: (
          <>
            Understand browser environment constraints and limitations including
            file handling, printing, and security considerations.
          </>
        ),
      },
      {
        title: 'Embedding 3rd Party Components',
        slug: '/embedding-components',
        description: (
          <>
            Embed third-party JavaScript components like charts, maps, and
            widgets into your DWC applications.
          </>
        ),
      },
      {
        title: 'Advanced Responsive Design',
        slug: '/advanced-responsive',
        description: (
          <>
            Master advanced responsive design techniques including media queries
            and CSS transitions for engaging user experiences.
          </>
        ),
      },
    ],
  },
  {
    label: 'Deployment',
    chapters: [
      {
        title: 'Deployment Options',
        slug: '/deployment',
        description: (
          <>
            Explore deployment options including embedded deployment and
            Progressive Web Apps (PWA) for mobile and offline support.
          </>
        ),
      },
    ],
  },
];

function ChapterCard({title, slug, description}: ChapterItem) {
  return (
    <div className="col col--4">
      <Link to={slug} className={styles.card}>
        <Heading as="h3" className={styles.cardTitle}>
          {title}
        </Heading>
        <p className={styles.cardDescription}>{description}</p>
      </Link>
    </div>
  );
}

export default function ChapterCards(): ReactNode {
  return (
    <section className={styles.chapters}>
      <div className="container">
        {sections.map((section, idx) => (
          <div key={idx} className={styles.section}>
            <Heading as="h2" className={styles.sectionTitle}>
              {section.label}
            </Heading>
            <div className="row">
              {section.chapters.map((chapter, cIdx) => (
                <ChapterCard key={cIdx} {...chapter} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
