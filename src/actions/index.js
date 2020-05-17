export const createMap = ({mapName, markers}) => {
    const listOfCords = formatMarkerToCord(markers);

    return new Promise((res, rej) => {
        window.Visualforce.remoting.Manager.invokeAction(
            window.RemoteActions.CreateMap,
            mapName,
            listOfCords,
            function(mapId, ev) {
                if (ev.statusCode === 200) {
                    if (!mapId) {
                        console.log('failed to create');
                        rej(ev)
                    } else {
                        res(mapId)
                    }
                }
            },
            { escape: false }
        );
    });
}

export const updateMap = ({mapId, mapName = '', markersToDelete = null, markersToInsert = null}) => {
    const listOfCordsToInsert = formatMarkerToCord(markersToInsert);
    const listOfCordsToDelete = formatMarkerToCord(markersToDelete);

    return new Promise((res, rej) => {
        window.Visualforce.remoting.Manager.invokeAction(
            window.RemoteActions.UpdateMap,
            mapId,
            mapName,
            listOfCordsToInsert,
            listOfCordsToDelete,
            function(response, ev) {
                if (ev.statusCode === 200) {
                    if (!response.success) {
                        console.log('failed to update');
                        console.log(response.error);
                        rej(ev);
                    }
                    res(response.success);
                } else {
                    rej(ev);
                }
            },
            { escape: false }
        );
    });
}

export const getMap = (mapId) => {
    return new Promise((res, rej) => {
        window.Visualforce.remoting.Manager.invokeAction(
            window.RemoteActions.GetMap,
            mapId,
            function(response, ev) {
                if (ev.statusCode === 200) {
                    if (!response) {
                        console.log('failed to get');
                        rej(ev);
                    }
                    const markers = formatCordToMarker(response.mapCords);
                    res({map: response.map, markers});
                } else {
                    rej(ev);
                }
            },
            { escape: false }
        );
    });
}

const formatMarkerToCord = (markers) => {
    if (!markers) { return null; }

    return markers.map((marker) => 
        ({ 'Latitude': marker.location[0],'Longitude': marker.location[1] }));
}

const formatCordToMarker = (cords) => {
    if (!cords) { return []; }

    return cords.map((cord) => 
        ({
            location: [Number(cord.Latitude__c), Number(cord.Longitude__c)],
            id:  cord.Id
        }));
}