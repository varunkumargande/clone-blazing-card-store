import React, { useState } from "react";

const TabsComponent = (props) => {
    const {
        tabs,
        getStreamCards
    } = props;

    const [activeTab, setActiveTab] = useState(tabs && tabs.length > 0 ? tabs[0].key : "");
    const [activeComponent, setActiveComponent] = useState(tabs && tabs.length > 0 ? tabs[0].component : "")

    const renderTab = (tab, key) => {
        return (
            <div className="category-list" key={key}>
                <button onClick={() => {setActiveTab(tab.key); setActiveComponent(tab.component)}} className={`title ${activeTab === tab.key && "active"}`}>{tab.title}(8)</button>
            </div>
        )
    }

    return (
        <div className="overflow-none">
            <section className="category-wrapper cotegories-border mb35">
                <div className="overflow-wrap">
                    <div className="Category-list-wrap inner-container flex">
                        {tabs && (
                            tabs.map((tab, index) => (renderTab(tab, index)))
                        )}
                    </div>
                </div>
            </section>
            <div className="card-wrap flex inner-container">
                {activeComponent}
            </div>
        </div>
    )
}

export default TabsComponent;