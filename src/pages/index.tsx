import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Dokumentation anzeigen
          </Link>
        </div>
      </div>
    </header>
  );
}

function Features() {
  const FeatureList = [
    {
      title: 'Leistungsstark',
      icon: '🚀',
      description: 'Entwickelt in C für optimale Leistung und Effizienz.',
    },
    {
      title: 'Gut dokumentiert',
      icon: '📚',
      description: 'Umfassende Dokumentation für einfache Nutzung und Erweiterung.',
    },
    {
      title: 'Open Source',
      icon: '🌐',
      description: 'Frei verfügbar auf GitHub für Zusammenarbeit und Verbesserungen.',
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Feature({title, icon, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureItem}>
        <div className={styles.featureIcon}>{icon}</div>
        <div className={styles.featureContent}>
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Willkommen bei ${siteConfig.title}`}
      description="Beschreibung wird in einem Meta-Tag im <head /> erscheinen"
    >
      <HomepageHeader />
      <main>
        <Features />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
