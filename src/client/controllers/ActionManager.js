import dispatcher from './dispatcher';
// GET
import getUniversities from './requests/get/Universities';
import getCompetitions from './requests/get/Competitions';
import getCompetitors from './requests/get/Competitors';
import getCompetitorGroups from './requests/get/CompetitorGroups';
import getTeamLeaders from './requests/get/TeamLeaders';
import getTeams from './requests/get/Teams';
import getProblems from './requests/get/Problems';
// POST
import postUniversities from './requests/post/Universities';
import postCompetitions from './requests/post/Competitions';
import postCompetitors from './requests/post/Competitors';
import postCompetitorGroups from './requests/post/CompetitorGroups';
import postTeamLeaders from './requests/post/TeamLeaders';
import postTeams from './requests/post/Teams';
import postProblems from './requests/post/Problems';
// UPDATE
import updateUniversities from './requests/update/Universities';
import updateCompetitions from './requests/update/Competitions';
import updateCompetitors from './requests/update/Competitors';
import updateCompetitorGroups from './requests/update/CompetitorGroups';
import updateTeamLeaders from './requests/update/TeamLeaders';
import updateTeams from './requests/update/Teams';
import updateProblems from './requests/update/Problems';

class ActionManager
{
    static get GET_UNIVERSITIES () { return "GET_UNIVERSITIES" };
    static get GET_COMPETITIONS () { return "GET_COMPETITIONS" };
    static get GET_COMPETITORS () { return "GET_COMPETITORS" };
    static get GET_COMPETITOR_GROUPS () { return "GET_COMPETITOR_GROUPS" };
    static get GET_TEAM_LEADERS () { return "GET_TEAM_LEADERS" };
    static get GET_TEAMS () { return "GET_TEAMS" };
    static get GET_PROBLEMS () { return "GET_PROBLEMS" };

    static get POST_UNIVERSITIES () { return "POST_UNIVERSITIES" };
    static get POST_COMPETITIONS () { return "POST_COMPETITIONS" };
    static get POST_COMPETITORS () { return "POST_COMPETITORS" };
    static get POST_COMPETITOR_GROUPS () { return "POST_COMPETITOR_GROUPS" };
    static get POST_TEAM_LEADERS () { return "POST_TEAM_LEADERS" };
    static get POST_TEAMS () { return "POST_TEAMS" };
    static get POST_PROBLEMS () { return "POST_PROBLEMS" };

    static get UPDATE_UNIVERSITIES () { return "UPDATE_UNIVERSITIES" };
    static get UPDATE_COMPETITIONS () { return "UPDATE_COMPETITIONS" };
    static get UPDATE_COMPETITORS () { return "UPDATE_COMPETITORS" };
    static get UPDATE_COMPETITOR_GROUPS () { return "UPDATE_COMPETITOR_GROUPS" };
    static get UPDATE_TEAM_LEADERS () { return "UPDATE_TEAM_LEADERS" };
    static get UPDATE_TEAMS () { return "UPDATE_TEAMS" };
    static get UPDATE_PROBLEMS () { return "UPDATE_PROBLEMS" };
    constructor()
    {
        var map = {};

        map[ActionManager.GET_UNIVERSITIES] = getUniversities;
        map[ActionManager.GET_COMPETITIONS] = getCompetitions;
        map[ActionManager.GET_COMPETITORS] = getCompetitors;
        map[ActionManager.GET_COMPETITOR_GROUPS] = getCompetitorGroups;
        map[ActionManager.GET_PROBLEMS] = getProblems;
        map[ActionManager.GET_TEAMS] = getTeams;
        map[ActionManager.GET_TEAM_LEADERS] = getTeamLeaders;

        map[ActionManager.POST_UNIVERSITIES] = postUniversities;
        map[ActionManager.POST_COMPETITIONS] = postCompetitions;
        map[ActionManager.POST_COMPETITORS] = postCompetitors;
        map[ActionManager.POST_COMPETITOR_GROUPS] = postCompetitorGroups;
        map[ActionManager.POST_PROBLEMS] = postProblems;
        map[ActionManager.POST_TEAMS] = postTeams;
        map[ActionManager.POST_TEAM_LEADERS] = postTeamLeaders;

        map[ActionManager.UPDATE_UNIVERSITIES] = updateUniversities;
        map[ActionManager.UPDATE_COMPETITIONS] = updateCompetitions;
        map[ActionManager.UPDATE_COMPETITORS] = updateCompetitors;
        map[ActionManager.UPDATE_COMPETITOR_GROUPS] = updateCompetitorGroups;
        map[ActionManager.UPDATE_PROBLEMS] = updateProblems;
        map[ActionManager.UPDATE_TEAMS] = updateTeams;
        map[ActionManager.UPDATE_TEAM_LEADERS] = updateTeamLeaders;

        this.commandMap = map;

        this.handleActions = this.handleActions.bind(this);
    }

    handleActions(action)
    {
        if(this.commandMap[action.type] == null)
        {
        }
        else
        {
            this.commandMap[action.type](action.data);
        }
    }
}

const actionManager = new ActionManager();

dispatcher.register(actionManager.handleActions);

export default ActionManager;
