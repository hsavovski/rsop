import Model from '../CompetitionsModel';

export default class CompetitorGroup
{
    constructor()
    {
        this.id = null;
        this.competitorId = null;
        this.teamId = null;
        this.major = null;
        this.course = null;
    }

    get competitor()
    {
        if(Model['competitors'] != null)
        {
            return Model['competitors'][this.competitorId];
        }
        return {};
    }
}
