import CompetitionsModel from '../../../models/CompetitionsModel';
import Problem from '../../../models/entities/Problem.js';
import BaseRequest from '../BaseRequest.js';

class Universites extends BaseRequest
{
    get address()
    {
        return "/problems/" + this.id;
    }

    get method()
    {
        return "PATCH";
    }

    execute(data)
    {
        this.id = data.id;
        super.execute(data);
    }

    setModel(data)
    {
        this.updateModel(
            data,
            CompetitionsModel,
            "problems",
            Problem);
    }
}
export default new Universites().execute
