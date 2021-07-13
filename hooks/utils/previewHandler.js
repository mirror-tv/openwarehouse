const { app, project } = require('../../configs/config')
const axios = require('axios')

function getPostIdFromUrl() {
    const currentUrl = document.location.href

    const devideArray = currentUrl.split('/')
    if (devideArray.length > 2) {
        const id = devideArray[devideArray.length - 1]
        const currentListName = devideArray[devideArray.length - 2]
        return { id, currentListName }
    } else {
        return {
            id: null,
            currentListName: null,
        }
    }
}

function getPreviewUrl(postId) {
    return new Promise((resolve, reject) => {
        // get post slug with postId
        axios({
            url: 'http://api-dev.mnews.tw/admin/api',
            method: 'post',
            data: {
                query: `
                    query getPost($id: ID!){
                        Post(where:{id:$id}){
                            slug
                        } 
                    }
                `,
                variables: {
                    id: postId,
                },
            },
        })
            .then((result) => {
                // distructure and combine it with path
                const { data } = result.data
                const { slug } = data.Post
                resolve(`/preview/posts/${slug}`)
            })
            .catch((err) => {
                console.log(err.message)
                // if error happened,return empty string
                reject('')
            })
    })
}

module.exports = { getPostIdFromUrl, getPreviewUrl }
