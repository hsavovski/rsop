import CompetitionsModel from '../../../models/CompetitionsModel.js';
import Competition from '../../../models/entities/Competition.js';
import BaseRequest from '../BaseRequest.js';

class Universites extends BaseRequest
{
    get address()
    {
        return "/competitions/" + this.id;
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
            "competitions",
            Competition);
    }
}
export default new Universites().execute
