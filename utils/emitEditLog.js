const axios = require('axios')
const { app } = require('../configs/config.js')

const emitEditLog = async (
    operation,
    resolvedData,
    existingItem,
    context,
    updatedItem
) => {
    try {
        const { authedItem, req } = context

        const editorName = authedItem.name
        const postId = updatedItem.id
        let editedData = { ...resolvedData }

        // remove unwanted field
        editedData = removeUnusedKey(editedData)
        editedData = removeHtmlAndApiData(editedData)

        const variables = generateVariablesForGql(
            operation,
            editorName,
            postId,
            editedData
        )
        const { data, errors } = await keystone.executeGraphQL({
            query: generateGqlQueryByCMS(),
            variables: variables,
        })

        if (errors) {
            console.log('======err from executeGraphQL in emit editLog======')
            console.log(errors)
        } else {
            console.log('===Editlog emitted===\n')
            console.log(data)
        }
    } catch (err) {
        console.log('======err from catch in emit editLog======')
        console.log(error)
    }
}

function removeHtmlAndApiData(editData) {
    // 1: get keys except for id and updatedAt
    const fieldsArray = [
        'summaryHtml',
        'summaryApiData',
        'briefHtml',
        'briefApiData',
        'contentHtml',
        'contentApiData',
    ]

    fieldsArray.forEach((item) => {
        // if (editData[item]) {
        //     delete editData[item]
        // }
        delete editData[item]
    })

    return editData
}

function removeUnusedKey(editData) {
    const fieldsArray = ['createdBy', 'updatedBy', 'createdAt', 'updatedAt']

    fieldsArray.forEach((item) => {
        if (editData[item]) {
            delete editData[item]
        }
    })

    return editData
}

function generateVariablesForGql(operation, editorName, postId, editedData) {
    const fieldsArray = ['summary', 'brief', 'content']
    let variables = {
        name: editorName,
        operation: operation,
        postId: postId,
    }

    // pull out draft editor field from editedData
    // put them to variables obj, then delete original one
    fieldsArray.forEach((draftField) => {
        if (editedData[draftField]) {
            variables[draftField] = editedData[draftField]
            delete editedData[draftField]
        } else {
            // empty draft state
            variables[draftField] = ''
        }
    })

    // put rest of fields into variables.changeList
    variables.changedList = JSON.stringify(editedData)

    return variables
}

function generateGqlQueryByCMS() {
    switch (app.project) {
        case 'readr':
            return `
            mutation CreateLogList(
              $name: String!
              $operation:String!
              $postId: String!
              $summary: String!
              $brief: String!
              $content: String!
              $changedList: String!
              ) {
              createEditLog(
                data: {
                  name: $name
                  operation:$operation
                  postId: $postId
                  summary: $summary
                  brief: $brief
                  content: $content
                  changedList: $changedList
                }
              ) {
                name
              }
            }
            `

        case 'mirrormedia':
            ;`
            mutation CreateLogList(
              $name: String!
              $operation:String!
              $postId: String!
              $brief: String!
              $content: String!
              $changedList: String!
              ) {
              createEditLog(
                data: {
                  name: $name
                  operation:$operation
                  postId: $postId
                  brief: $brief
                  content: $content
                  changedList: $changedList
                }
              ) {
                name
              }
            }
            `

        case 'mirror-tv':
            return `
            mutation CreateLogList(
              $name: String!
              $operation:String!
              $postId: String!
              $brief: String!
              $content: String!
              $changedList: String!
              ) {
              createEditLog(
                data: {
                  name: $name
                  operation:$operation
                  postId: $postId
                  brief: $brief
                  content: $content
                  changedList: $changedList
                }
              ) {
                name
              }
            }
            `
        default:
            return `
            mutation CreateLogList(
              $name: String!
              $operation:String!
              $postId: String!
              $brief: String!
              $content: String!
              $changedList: String!
              ) {
              createEditLog(
                data: {
                  name: $name
                  operation:$operation
                  postId: $postId
                  brief: $brief
                  content: $content
                  changedList: $changedList
                }
              ) {
                name
              }
            }
            `
    }
}

module.exports = { emitEditLog }
