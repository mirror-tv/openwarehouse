const axios = require('axios')

function getPreviewUrl(postId) {
    // get post slug with postId
    return axios({
        // fetch post's slug from api which depend on server's type (dev || staging || prod)
        url: getApiUrl(),
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
            return `/story/${slug}`
        })
        .catch((err) => {
            // if error happened,return empty string
            return ''
        })
}

function getApiUrl() {
    const { origin } = document.location

    return `${origin}/admin/api`
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
