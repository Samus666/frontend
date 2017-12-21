import * as m from "mithril";
import Searchbar from "components/misc/Searchbar";
import "./home.scss";

const idRegex = /[\da-zA-Z]{8}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{12}/;

const showPlayer = id => e => page("/player/" + id);

export default {
    oncreate({ dom }) {
        const search = dom.querySelector(".search-input input");
        if (search && !window.ontouchstart) {
            search.focus();
        }
    },
    view({ attrs, state }) {
        return (
            <div className="home">
                <Searchbar className="home__search" search={attrs.search} />
                <div className="home__disclaimer">
                    Old season ranks are temporarily missing. <br />
                    Waiting for UBI to fix.
                </div>
            </div>
        );
    },
};