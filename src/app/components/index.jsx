import * as m from "mithril";
import AsyncComponent from "components/misc/AsyncComponent";
import Loading from "components/misc/Loading";
import Searchbar from "components/misc/Searchbar";
import Menu from "components/misc/Menu";
import Drawer from "components/misc/Drawer";
import Page from "components/misc/Page";
import Footer from "components/misc/Footer";
import Icon, { GLYPHS } from "components/misc/Icon";
import { connect } from "lib/store/connect";
import { NOT_FOUND } from "redux-first-router";

import "./base.scss";
import "./app.scss";

const componentMap = {
    HOME: () => import("./Pages/Home"),
    SEARCH: () => import("./Pages/Search"),
    FAQ: () => import("./Pages/Faq"),
    LEADERBOARD: () => import("./Pages/Leaderboard"),
    CHANKABOARD: () => import("./Pages/Leaderboard/Chankaboard"),
    PLAYER: () => import("./Pages/Player"),
    SIMPLE: () => import("./Pages/Simple"),
    PLAYERTABS: () => import("./Pages/Player"),
    COMPARISON: () => import("./Pages/Comparison"),
    ABOUT: () => import("./Pages/About"),
    [NOT_FOUND]: () => import("./Pages/Errors/NotFound"),
};
const App = {
    view({ attrs, state }) {
        return (
            <div className={"app " + attrs.location}>
                <div className="app__content">
                    <Drawer>
                        <Menu platform={attrs.platform} />
                    </Drawer>
                    <div className="app__page">
                        {attrs.loading ? (
                            <div>
                                <Page>
                                    <Page.Head />
                                    <Page.Content />
                                </Page>
                                <Loading />
                            </div>
                        ) : (
                            <AsyncComponent importFn={attrs.importFn} />
                        )}
                        <Footer />
                    </div>
                </div>
            </div>
        );
    },
};

const mapStateToProps = getState => {
    const { platform, search, location, loading } = getState();
    return {
        location: location.type,
        importFn: componentMap[location.type],
        loading,
        platform,
    };
};

export default connect(mapStateToProps)(App);
