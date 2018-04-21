
const id            = 'todos'; 
const storage       = Storage.load(id);
const model         = new Model(storage || undefined);

model.attach('change', storage => Storage.save(storage, id));

const view          = new View();
const controller    = new Controller(model, view);