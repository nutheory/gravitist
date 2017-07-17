import { print as printGraphQL } from 'graphql/language/printer';
import RecursiveIterator from 'recursive-iterator';
import objectPath from 'object-path';

function createNetworkInterface(url){
  return {
    query(request) {
      console.log('))))))))))))))))))))))))))',request);

      const formData  = new FormData();
      if(request.variables != undefined){
        console.log('++++++++++++++++++++++++++++',request);
        // search for File objects on the request and set it as formData
        for(let { node, path } of new RecursiveIterator(request.variables)) {
            console.log('))))))))))))))))))))))))))',node);
            if (node instanceof File) {
                const id = Math.random().toString(36);
                formData.append(id, node);
                objectPath.set(request.variables, path.join('.'), id);
            }
        }

        formData.append('query', printGraphQL(request.query));
        formData.append('variables', JSON.stringify(request.variables || {}));
        formData.append('debugName', JSON.stringify(request.debugName || ''));
        formData.append('operationName', JSON.stringify(request.operationName || ''));
      }
      return fetch(url, {
          headers: { Accept: '*/*' },
          body: formData,
          method: 'POST',
      }).then(result => {result.json()});
    }
  }
}

module.exports = { createNetworkInterface }
