const { gQL, gQLget, gQLpost, generateUserData, generateAddressData, cleanUpTestItem,
  cleanUpTestItemAsAdmin, responseFactory, logInAgent, logInPilot, logInEditor } = require('../utils/helpers')

const Orders = (() => {

  const joinOrLeaveCollaboration = async ( variables ) => {
    const query = `
      mutation($input: CollaborationInput) {
        joinOrLeaveCollaboration(input: $input) {
          order {
            status
            pilotAcceptedAt
            editorAcceptedAt
            agentAcceptedAt
            editor {
              id
              type
            }
            agent {
              id
              type
            }
            pilot {
              id
              type
            }
          }
        }
      }
    `
    const result = await gQLpost({ query, variables })
    if(result.data && result.data.errors){console.log("ERR", result.data.errors)}
    return result
  }

  const getFlights = async ( variables ) => {
    const query = `
      query($input: GetListInput){
        getFlights(input: $input){
          distanceFromLocation
          plan
          status
          agent {
            type
          }
          address {
            zipCode
          }
        }
      }
    `
    const result = await gQLpost({ query, variables })
    if(result.data && result.data.errors){console.log("ERR", result.data.errors)}
    return result
  }

  const getMissions = async ( variables ) => {
    const query = `
      query($input: GetListInput){
        getMissions(input: $input){
          id
          plan
          status
          distanceFromLocation
          pilotId
          agent {
            type
          }
          address {
            zipCode
          }
        }
      }
    `
    const result = await gQLpost({ query, variables })
    if(result.data && result.data.errors){console.log("ERR", result.data.errors)}
    return result
  }

  const getOrders = async ( variables ) => {
    const query = `
      query($input: GetListInput){
        getOrders(input: $input){
          id
          plan
          address {
            zipCode
          }
          agent {
            id
            type
          }
          pilot {
            id
            type
          }
          editor {
            id
            type
          }
        }
      }
    `
    const result = await gQLpost({ query, variables })
    if(result.data && result.data.errors){console.log("ERR", result.data.errors)}
    return result
  }

  const getOrder = async ( variables ) => {
    const query = `
      query($input: GetProtectedInput){
        getOrder(input: $input){
          order {
            id
            plan
            status
            assets {
              url
            }
            address {
              zipCode
            }
            agent {
              id
              type
            }
            pilot {
              id
            }
            editor {
              id
            }
          }
        }
      }
    `
    const result = await gQLpost({query, variables})
    if(result.data && result.data.errors){console.log("ERR", result.data.errors)}
    return result
  }

  const create = async ( mutationName, attrs = {} ) => {
    const query = `
      mutation($input: ${mutationName}Input){
        create${mutationName}(input: $input){
          order {
            id
            plan
            receiptId
            status
            address {
              zipCode
              lat
            }
            agent {
              id
              type
              name
            }
          }
          auth {
            token
          }
        }
      }
    `
    const variables = { input: attrs }
    const result = await gQLpost({ query, variables })
    return {
      result,
      async cleanUpOrder(){
        const order = result[`create${mutationName}`].order
        if (result[`create${mutationName}`].auth){
          gQL.defaults.headers.common.authorization = result[`create${mutationName}`].auth.token
        }
        const wait = await cleanUpTestItem("order", { input: { id: order.id, authorizedId: order.agent.id }}).then(res => {
          if (result[`create${mutationName}`].auth){
            gQL.defaults.headers.common.authorization = ''
          }
          return res
        })
      }
    }
  }

  const update = async ( variables ) => {
    const query = `
      mutation($input: UpdateOrderInput) {
        updateOrder(input: $input){
          order {
            status
            address {
              address1
            }
          }
        }
      }`
    const result = await gQLpost({query, variables})
    if(result.data && result.data.errors){console.log("ERR", result.data.errors)}
    return result
  }

  const destroy = async ( variables ) => {
    const query = `
      mutation($input: DestroyOrderInput){
        destroyOrder(input: $input){
          order {
            plan
            receiptId
            address {
              zipCode
            }
          }
        }
      }`
    const result = await gQLpost({query, variables})
    if(result.data && result.data.errors){console.log("ERR", result.data.errors)}
    return result
  }

  return {
    joinOrLeaveCollaboration,
    getFlights,
    getMissions,
    getOrders,
    getOrder,
    create,
    update,
    destroy
  }
})()

module.exports = Orders
