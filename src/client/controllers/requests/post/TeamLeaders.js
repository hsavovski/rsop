import CompetitionsModel from '../../../models/CompetitionsModel';
import TeamLeader from '../../../models/entities/TeamLeader.js';
import BaseRequest from '../BaseRequest.js';

class Universites extends BaseRequest
{
    get address()
    {
        return "/teamLeaders";
    }

    get method()
    {
        return "POST";
    }

    setModel(data)
    {
        this.updateModel(
            data,
            CompetitionsModel,
            "teamLeaders",
            TeamLeader);
    }
}
export default new Universites().execute
