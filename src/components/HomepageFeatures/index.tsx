import React from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Effiziente C-Implementierung",
    icon: "💻",
    description: (
      <>
        Unser Client für das Neunermühle-Spiel ist in C implementiert, was
        höchste Leistung und Effizienz gewährleistet.
      </>
    ),
  },
  {
    title: "Modulare Struktur",
    icon: "🧩",
    description: (
      <>
        Das Projekt ist in Module wie args_parser, shared_memory, und
        tcp_performConnection unterteilt, was die Wartbarkeit und
        Erweiterbarkeit verbessert.
      </>
    ),
  },
  {
    title: "Umfangreiche Tests",
    icon: "🧪",
    description: (
      <>
        Mit unserem umfassenden Testsystem, einschließlich Unit-Tests und
        Integrationstests, stellen wir die Zuverlässigkeit des Clients sicher.
      </>
    ),
  },
];

function Feature({ title, icon, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className={styles.featureItem}>
        <div className={styles.featureIcon}>{icon}</div>
        <div className={styles.featureContent}>
          <Heading as="h3" className={styles.featureTitle}>
            {title}
          </Heading>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
