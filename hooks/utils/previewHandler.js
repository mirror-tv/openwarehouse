const axios = require('axios')

function getPreviewUrl(postId) {
    return new Promise((resolve, reject) => {
        // get post slug with postId
        axios({
            url: getApiUrl(process.env.NODE_ENV),
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
                resolve(`/story/${slug}`)
            })
            .catch((err) => {
                console.log(err.message)
                // if error happened,return empty string
                reject('')
            })
    })
}

function getApiUrl(env) {
    switch (env) {
        case 'prod':
            return 'https://cms.mnews.tw/admin/api'

        case 'staging':
            return 'https://cms-staging.mnews.tw/admin/api'

        case 'dev':
            return 'https://cms-dev.mnews.tw/admin/api'

        case 'local':
        default:
            return 'http://localhost:3000/admin/api'
    }
}

// get current url from browser
// then parse url
// get current list name and post id from path
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
module.exports = { getPostIdFromUrl, getPreviewUrl }
