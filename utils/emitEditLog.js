const { createItem } = require('@keystonejs/server-side-graphql-client')
const { keystone } = require('../index')

const axios = require('axios')

const { app } = require('../configs/config.js')

const emitEditLog = async ({
    operation,
    originalInput,
    existingItem,
    context,
    updatedItem,
}) => {
    try {
        const { authedItem, req } = context

        const editorName = authedItem.name
        const postId = updatedItem?.id || existingItem?.id
        let editedData = { ...originalInput }

        switch (operation) {
            case 'create':
            case 'update':
                editedData = { ...originalInput }
                break
            case 'delete':
                editedData = { ...existingItem }
                break

            default:
                break
        }

        // remove unwanted field
        editedData = removeUnusedKey(editedData)
        editedData = removeHtmlAndApiData(editedData)

        const variables = generateVariablesForGql(
            operation,
            editorName,
            editedData.slug,
            editedData
        )

        const editLog = await createItem({
            keystone,
            listKey: 'EditLog',
            item: variables,
            returnFields: `id`,
            context,
        })

        console.log('===Editlog emitted===\n')
    } catch (err) {
        console.log('======err from catch in emit editLog======')
        console.log(err)
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

function generateVariablesForGql(operation, editorName, postSlug, editedData) {
    // TODO: this editLog is for tv only
    const currentCmsName = app.project
    let fieldsArray

    switch (currentCmsName) {
        case 'mirror-tv':
            fieldsArray = ['brief', 'content']
            break

        case 'mirrormedia':
            fieldsArray = ['brief', 'content']
            break

        case 'readr':
            // fieldsArray = ['summary', 'content']
            fieldsArray = ['summary', 'content', 'actionList', 'citation']
            break

        default:
            break
    }

    let variables = {
        name: editorName,
        operation: operation,
        postSlug: postSlug,
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
              $postSlug: String!
              $summary: String!
              $brief: String!
              $content: String!
              $changedList: String!
              ) {
              createEditLog(
                data: {
                  name: $name
                  operation:$operation
                  postSlug: $postSlug
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
              $postSlug: String!
              $brief: String!
              $content: String!
              $changedList: String!
              ) {
              createEditLog(
                data: {
                  name: $name
                  operation:$operation
                  postSlug: $postSlug
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
              $postSlug: String!
              $brief: String!
              $content: String!
              $changedList: String!
              ) {
              createEditLog(
                data: {
                  name: $name
                  operation:$operation
                  postSlug: $postSlug
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
              $postSlug: String!
              $brief: String!
              $content: String!
              $changedList: String!
              ) {
              createEditLog(
                data: {
                  name: $name
                  operation:$operation
                  postSlug: $postSlug
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
