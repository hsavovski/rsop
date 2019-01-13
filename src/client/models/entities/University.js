import Model from '../CompetitionsModel';

export default class Univeristy
{
    constructor()
    {
        this.id = null;
        this.abbreviation = null;
        this.name = null;
        this.city = null;
        this.type = null;
    }

    get teams()
    {
        let teams = Model['teams'];
        let result = {};
            
        if(teams != null)
        {
            for(let el in teams)
            {
                if(teams[el].universityId == this.id)
                {
                    result[el] = teams[el];
                }
            }
        }
        return result;
    }

    bestTeamInCompetition(compId)
    {
        let teams = this.teams;
        let teamsInComp = {};
        if(teams != null)
        {
            for(let el in teams)
            {
                if(teams[el].competitionId == compId)
                {
                    teamsInComp[el] = teams[el];
                }
            }
        }

        let max = -1,
            result;
        for(let el in teamsInComp)
        { 
            let solved = teamsInComp[el].solvedProblems;
            let score = teamsInComp[el].score;
            
            if(solved > max)
            {
                max = solved;
                result = el;
            }
            else if(solved == max)
            {
                if(teamsInComp[result].score < score)
                {
                    result = el;
                }
            }
        }
        return teamsInComp[result];
    }
    
}
