import { Server, Model } from 'miragejs';

function makeServer({ environment = 'development' } = {}) {
  return new Server({
    environment,

    models: {
      todo: Model,
    },

    seeds(server) {
      server.create('todo', { content: 'Learn Mirage JS' });
      server.create('todo', { content: 'Integrate With Vue.js' });
    },

    routes() {
      this.namespace = 'api';

      this.get('/todos', (schema) => {
        return schema.todos.all();
      });
    },
  });
}

export default makeServer;
