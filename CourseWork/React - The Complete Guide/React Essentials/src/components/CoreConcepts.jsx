import { CORE_CONCEPTS } from '../data.js';
import CoreConcept from './CoreConcept';
import Section from './Section.jsx';

const CoreConcepts = () => {
    return (
      <Section id="core-concepts" title="Core Concepts">
        <ul>
          {CORE_CONCEPTS.map((item) => (
            <CoreConcept {...item} />
          ))}
        </ul>
      </Section>
  )
};

export default CoreConcepts;


