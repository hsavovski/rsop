exports.Queue = class Queue
{
    constructor()
    {
        this._q = [];
    }

    finish()
    {
        console.log("queue finished");
    }

    addNext(func, assets, obj)
    {
        this._q.unshift({func:func, assets:assets, obj:obj});
    }

    add(func, assets, obj)
    {
        this._q.push({func:func, assets:assets, obj:obj});
    }

    next()
    {
        if(this._q.length > 0)
        {
            var obj = this._q.shift();
            obj.func.apply(obj.obj, obj.assets);
        }
        else
        {
            this.finish();
        }
    }
}
