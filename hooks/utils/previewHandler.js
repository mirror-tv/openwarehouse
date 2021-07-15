const axios = require('axios')

function getPreviewUrl(postId) {
    return new Promise((resolve, reject) => {
        // get post slug with postId
        axios({
            // fetch post's slug from api which depend on server's type (dev || staging || prod)
            url: getApiUrl(process.env.RELEASE_TARGET || 'dev'),
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

function getApiUrl(releaseTarget) {
    switch (releaseTarget) {
        case 'prod':
            return 'https://cms.mnews.tw/admin/api'

        case 'staging':
            return 'https://cms-staging.mnews.tw/admin/api'

        case 'local':
            return 'http://localhost:3000/admin/api'

        case 'dev':
        default:
            return 'https://cms-dev.mnews.tw/admin/api'
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
