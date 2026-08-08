export const ROOT = '/api/v1';

const setPath = (root: string, sub: string) => {
  if (sub.startsWith('/')) {
    return `${root}${sub}`;
  }

  return `${root}/${sub}`;
};

const endpoint = {
    vehicles: {
        list: setPath(ROOT, '/vehicles'),
        summary: setPath(ROOT, '/vehicles/summary'),
        agingActionsByVehicle: setPath(ROOT, '/vehicles/:vehicleId/aging-actions'),
        makes: setPath(ROOT, '/vehicles/makes'),
        modelsByMake: setPath(ROOT, '/vehicles/:make/models'),
    }
}

export default endpoint;