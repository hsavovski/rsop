import dispatcher from './dispatcher';
import ActionManager from './ActionManager';


// -------- GET ----------

export function getUniversities()
{
    dispatcher.dispatch({
        type:ActionManager.GET_UNIVERSITIES,
        data:null
    });
}

export function getCompetitions()
{
    dispatcher.dispatch({
        type:ActionManager.GET_COMPETITIONS,
        data:null
    });
}

export function getCompetitors()
{
    dispatcher.dispatch({
        type:ActionManager.GET_COMPETITORS,
        data:null
    });
}

export function getCompetitorGroups()
{
    dispatcher.dispatch({
        type:ActionManager.GET_COMPETITOR_GROUPS,
        data:null
    });
}

export function getProblems()
{
    dispatcher.dispatch({
        type:ActionManager.GET_PROBLEMS,
        data:null
    });
}

export function getTeams()
{
    dispatcher.dispatch({
        type:ActionManager.GET_TEAMS,
        data:null
    });
}

export function getTeamLeaders()
{
    dispatcher.dispatch({
        type:ActionManager.GET_TEAM_LEADERS,
        data:null
    });
}

// -------- POST ----------

export function postUniversities(data)
{
    dispatcher.dispatch({
        type:ActionManager.POST_UNIVERSITIES,
        data:data
    });
}

export function postCompetitions(data)
{
    dispatcher.dispatch({
        type:ActionManager.POST_COMPETITIONS,
        data:data
    });
}

export function postCompetitors(data)
{
    dispatcher.dispatch({
        type:ActionManager.POST_COMPETITORS,
        data:data
    });
}

export function postCompetitorGroups(data)
{
    dispatcher.dispatch({
        type:ActionManager.POST_COMPETITOR_GROUPS,
        data:data
    });
}

export function postProblems(data)
{
    dispatcher.dispatch({
        type:ActionManager.POST_PROBLEMS,
        data:data
    });
}

export function postTeams(data)
{
    dispatcher.dispatch({
        type:ActionManager.POST_TEAMS,
        data:data
    });
}

export function postTeamLeaders(data)
{
    dispatcher.dispatch({
        type:ActionManager.POST_TEAM_LEADERS,
        data:data
    });
}

// -------- UPDATE ----------

export function updateUniversities(data)
{
    dispatcher.dispatch({
        type:ActionManager.UPDATE_UNIVERSITIES,
        data:data
    });
}

export function updateCompetitions(data)
{
    dispatcher.dispatch({
        type:ActionManager.UPDATE_COMPETITIONS,
        data:data
    });
}

export function updateCompetitors(data)
{
    dispatcher.dispatch({
        type:ActionManager.UPDATE_COMPETITORS,
        data:data
    });
}

export function updateCompetitorGroups(data)
{
    dispatcher.dispatch({
        type:ActionManager.UPDATE_COMPETITOR_GROUPS,
        data:data
    });
}

export function updateProblems(data)
{
    dispatcher.dispatch({
        type:ActionManager.UPDATE_PROBLEMS,
        data:data
    });
}

export function updateTeams(data)
{
    dispatcher.dispatch({
        type:ActionManager.UPDATE_TEAMS,
        data:data
    });
}

export function updateTeamLeaders(data)
{
    dispatcher.dispatch({
        type:ActionManager.UPDATE_TEAM_LEADERS,
        data:data
    });
}