import { useState } from "react";

import TabButton from "./TabButton";
import Section from './Section.jsx';
import { EXAMPLES } from "../data";
import Tabs from "./Tabs";

const Examples = () => {
    const [selectedTab, updateSelectedTab] = useState();
  
    const selectHandler = (selectedButton) => {
        updateSelectedTab(selectedButton);
    };

    return (
        <Section id="examples" title="Examples">
            <Tabs 
                buttons={
                    <>
                        <TabButton
                            isSelected={selectedTab === "components"}
                            onClick={() => selectHandler("components")}
                        >
                            Components
                        </TabButton>
                        <TabButton 
                            isSelected={selectedTab === "jsx"}
                            onClick={() => selectHandler("jsx")}
                        >
                            JSX
                        </TabButton>
                        <TabButton 
                            isSelected={selectedTab === "props"}
                            onClick={() => selectHandler("props")}
                        >
                            Props
                        </TabButton>
                        <TabButton 
                            isSelected={selectedTab === "state"}
                            onClick={() => selectHandler("state")}
                        >
                            State
                        </TabButton>
                    </>
                }
            >
                {!selectedTab && <p>Please select a topic.</p>}
                {selectedTab && (
                    <div id="tab-content">
                    <h3>{EXAMPLES[selectedTab].title}</h3>
                    <p>{EXAMPLES[selectedTab].description}</p>
                    <pre>
                        <code>{EXAMPLES[selectedTab].code}</code>
                    </pre>
                    </div>
                )}
            </Tabs>
            </Section>
    )
};

export default Examples;