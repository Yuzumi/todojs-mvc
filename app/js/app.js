
const storage       = Storage.load();

const model         = new Model(storage || undefined);

model.attach('change', storage => Storage.save(storage));

const view          = new View();
const controller    = new Controller(model, view);