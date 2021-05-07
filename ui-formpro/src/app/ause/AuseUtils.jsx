class EventEmitter {
    constructor(){
        this.events ={}
    }
    _getEventListByName(eventName)
    {
        if ( typeof this.events[eventName] === 'undefined' )
        {
            this.events[eventName] = new Set();
        }
        return this.events[eventName]
    }

    on(eventName , fn){
        this._getEventListByName(eventName).add(fn);
    }
}
class AuseUtils {
    static setRoutes(config) {
        let routes = [...config.routes]
        return [...routes];
    }
    static generateRoutesFromConfigs(configs) {
        let allRoutes = [];
        configs.forEach((config) => {

            allRoutes = [
                ...allRoutes,
                ...this.setRoutes(config)
            ]
        });
        return allRoutes;
    }
}
export default AuseUtils;
