import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Unified Framework',
    Svg: require('@site/static/img/icon_unified.svg').default,
    description: (
      <>
        Build agents using a single, consistent interface across multiple frameworks like LangGraph, CrewAI, and AWS Strands.
      </>
    ),
  },
  {
    title: 'Enterprise Ready',
    Svg: require('@site/static/img/icon_enterprise.svg').default,
    description: (
      <>
        Includes production-grade features like request isolation, authentication, database logging, and observability out of the box.
      </>
    ),
  },
  {
    title: 'Extensible Tooling',
    Svg: require('@site/static/img/icon_tools.svg').default,
    description: (
      <>
        Easily integrate custom tools, LangChain community tools, and Model Context Protocol (MCP) servers to empower your agents.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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