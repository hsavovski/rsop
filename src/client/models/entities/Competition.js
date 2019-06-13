import Model from '../CompetitionsModel';

export default class Competition
{
    constructor()
    {
        this.id = null;
        this.name = null;
        this.year = null;
        this.universityId = null;
        this.domain = null;
    }

    get host()
    {
        if(Model['universities'] != null)
        {
            return Model['universities'][this.universityId];
        }
        return {};
    }

    get problems()
    {
        let problems = Model['problems'];
        let result = {};
        if(problems != null)
        {
            for(let el in problems)
            {
                if(problems[el].competitionId == this.id)
                {
                    resutl[el] = problems[el];
                }
            }
        }

        return result;
    }

    get teams()
    {
        let teams = Model['teams'];
        let result = {};
        if(teams != null)
        {
            for(let el in teams)
            {
                if(teams[el].competitionId == this.id)
                {
                    result[el] = teams[el];
                }
            }
        }

        return result;
    }

    get universities()
    {
        let teams = this.teams;
        let universities = Model['universities'];
        let result = {};
        if(teams != null && universities != null)
        {
            for(let el in teams)
            {
                let uniId = teams[el].universityId;
                if(result[uniId] == null)
                {
                    result[uniId] = universities[uniId];
                }
            }
        }

        return result;
    }

    get universityRanking()
    {
        let universities = this.universities;
        let ranking = [];
        for(let el in universities)
        {
            ranking.push(universities[el].bestTeamInCompetition(this.id))
        }

        ranking.sort((a,b) =>{
            if(a.solvedProblems != b.solvedProblems){
                return b.solvedProblems - a.solvedProblems
            }
            else
            {
                return b.score - a.score
            }
        });
        let result = {};
        for(let i=0; i < ranking.length; i++)
        {
            result[i + 1] = ranking[i].universityId; 
        }

        return result;
    }

    
}
