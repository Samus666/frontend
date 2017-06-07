import * as m from "mithril";
import IdCard from "./modules/IdCard";
import RankOverview from "./modules/RankOverview";
import RankSeason from "./modules/RankSeason";
import Aliases from "./modules/Aliases";
import GameModes from "./modules/GameModes";
import StatOverview from "./modules/StatOverview";
import "./profile.scss";

export default {
    view({ attrs }) {
        return (
            <div className={`profile ${attrs.id}`}>
                <div className="profile-sidebar">
                    <IdCard {...attrs} />
                    <RankOverview {...attrs} />
                    <Aliases {...attrs} />
                </div>
                <div className="profile-statarea">
                    <div className="profile-center">
                        <StatOverview {...attrs} />
                        <RankSeason {...attrs} />
                    </div>
                    <div className="profile-aside">
                        <GameModes {...attrs} />
                    </div>
                </div>
            </div>
        )
    }
}