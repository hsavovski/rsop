import Model from '../CompetitionsModel';

export default class Team
{
    constructor()
    {
        this.id = null;
        this.name = null;
        this.teamLeaderId = null;
        this.competitionId = null;
        this.universityId = null;
        this.score = null;
        this.solvedProblems = null;
    }

    get competitors()
    {
        let competitors = Model['competitorGroups'];
        let result = {};
        if(competitors != null)
        {
            for(let entity in competitors)
            {
                if(competitors[entity].teamId == this.id)
                {
                    result[entity] = competitors[entity];
                }
            }
        }

        return result;
    }

    get teamLeader()
    {
        if(Model['teamLeaders'] != null)
        {
            return Model['teamLeaders'][this.teamLeaderId];
        }

    }
}
