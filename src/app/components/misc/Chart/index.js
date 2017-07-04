import * as m from "mithril";
import * as Chartist from "chartist";
import "chartist-plugin-tooltips";
import "./chart.scss";

export default {
    oncreate({ attrs, dom, state }) {
        const el = dom.querySelector(".chart-element");
        const Chart = Chartist[attrs.type];
        if (!Chart) {
            console.error(`type "${attrs.type} is not valid"`);
        }
        const opts = attrs.options || {};
        opts.plugins = [Chartist.plugins.tooltip()];
        state.chart = new Chart(el, attrs.data, opts, attrs.responsiveOptions || {});
        // state.onResize = () => state.chart.update();
        // window.addEventListener("resize", state.onResize);
    },
    onremove({ state }) {
        // window.removeEventListener("resize", state.onResize);
    },
    view({ attrs, state }) {
        return (
            <div className="chart-container">
                <div className="chart-header">
                    <div className="chart-title">{attrs.title}</div>
                    <div className="chart-legend">
                        {attrs.data.series.map(series => [(
                            <div className="chart-legenditem">
                                <div className={"indicator "+ series.className}></div>
                                <div>{series.name}</div>
                            </div>
                        )])}
                    </div>
                </div>
                <div className="chart-element"></div>
            </div>
        );
    }
}