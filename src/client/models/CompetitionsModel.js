import BaseModel from './BaseModel';
import {
    getCompetitions, getUniversities, getCompetitorGroups, 
    getCompetitors, getProblems, getTeams, getTeamLeaders
} from '../controllers/Actions';

class CompetitionsModel extends BaseModel
{
	constructor()
	{
		super();

		this.getDataHelpers["competitions"] = {
			action:getCompetitions,
			initial:{}
		};

        this.getDataHelpers["competitors"] = {
            action:getCompetitors,
            initial:{}
        };

        this.getDataHelpers["teamLeaders"] = {
            action:getTeamLeaders,
            initial:{}
        };

        this.getDataHelpers["competitorGroups"] = {
            action:getCompetitorGroups,
            initial:{}
        };

        this.getDataHelpers["problems"] = {
            action:getProblems,
            initial:{}
        };

        this.getDataHelpers["teams"] = {
            action:getTeams,
            initial:{}
        };

        this.getDataHelpers["universities"] = {
            action:getUniversities,
            initial:{}
        };

        this.addRecord = {team: null, competitorGroup: null};
    }
    

	get competitions()
    {
        return this.getProperty("competitions");
    }

    set competitions(value)
    {
        this.setProperty("competitions", value);
    }

    get competitors()
    {
        return this.getProperty("competitors");
    }

    set competitors(value)
    {
        this.setProperty("competitors", value);
    }

    get competitorGroups()
    {
        return this.getProperty("competitorGroups");
    }

    set competitorGroups(value)
    {
        this.setProperty("competitorGroups", value);
    }

    get problems()
    {
        return this.getProperty("problems");
    }

    set problems(value)
    {
        this.setProperty("problems", value);
    }

    get teams()
    {
        return this.getProperty("teams");
    }


    set teams(value)
    {
        this.setProperty("teams", value);
    }
    
    
    get teamLeaders()
    {
        return this.getProperty("teamLeaders");
    }


    set teamLeaders(value)
    {
        this.setProperty("teamLeaders", value);
    }
    

    get universities()
    {
        return this.getProperty("universities");
    }

    set universities(value)
    {
        this.setProperty("universities", value);
    }

    get addRecord()
    {
        return this.getProperty("addRecord");
    }

    set addRecord(value)
    {

        this.setProperty("addRecord", value);
    }

}

export default new CompetitionsModel();
