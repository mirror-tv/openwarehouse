# Openwarehouse Changelog

## Version 1.1.0
### Notable Changes
- feat: add custom PreviewApp to handle preview-related router
- feat: add graphQL read access depends on server's type, such as CMS, QGL and PREVIEW
- feat: add db schema sql for tv dev
- feat: update atTracking field to handle timezone
- feat: customize admin-ui component, such as SEARCH, LOGO and filter

### Commits
* [[`a3b0fc2568`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/a3b0fc2568)] - **chore**: update package.json#version to 1.1.0 (liyibass)
* [[`cee2f4de29`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/cee2f4de29)] - **fix**: set proxyTarget in createPreviewServerProxy (liyibass)
* [[`5e56c09346`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/5e56c09346)] - **feat**: add /api/\* router in PreviewApp (liyibass)
* [[`63ac9024d3`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/63ac9024d3)] - Merge pull request #45 from mirror-media/nuxt (LIYI)
* [[`2273ddcd6a`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/2273ddcd6a)] - **refactor**: update apiUrl in previewHandler (liyibass)
* [[`23ce437905`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/23ce437905)] - **refactor**: optimize PreviewApp's middleware structure (liyibass)
* [[`9183c63213`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/9183c63213)] - **refactor**: optimize previewBtn, udpate code structure (liyibass)
* [[`1be16ebe99`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/1be16ebe99)] - **fix**: update getPreviewUrl's get ApiUrl method (liyibass)
* [[`25149d7bea`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/25149d7bea)] - Feat/add db schema sql for tv dev (#36) (Baron Chiu)
* [[`040138cbe4`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/040138cbe4)] - Feat/add db schema sql for tv dev (#36) (Baron Chiu)
* [[`c02cdeea3f`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/c02cdeea3f)] - **feat**: update getApiUrl function in previewBtn (api endpoint depend on server type) (liyibass)
* [[`431ff32c0b`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/431ff32c0b)] - **feat**: change proxy target to localhost:3001 (liyibass)
* [[`c93a3a157c`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/c93a3a157c)] - **feat**: change route path from prevew to story (in order to proxy nuxt website correctly) (liyibass)
* [[`d7eea41b44`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/d7eea41b44)] - **refactor**: add router to handle webpack\_hmr (liyibass)
* [[`56c71128c5`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/56c71128c5)] - **fix**: add additional router to handle nuxt file and api in preview page (liyibass)
* [[`b344add3b7`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/b344add3b7)] - **feat**: add additional router which handle huxt's corresponding file & api (liyibass)
* [[`927125a13e`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/927125a13e)] - **feat**: update preview url path, refactor PreviewBtn (liyibass)
* [[`32b89aa04c`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/32b89aa04c)] - **fix**: change preview url from id to slug (liyibass)
* [[`dc7cc08451`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/dc7cc08451)] - **feat**: migrate custom AddFilterPopout, adjust Options's maxheight to fix mobile issue (liyibass)
* [[`f63e942157`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/f63e942157)] - **feat**: add custom ActiveFilter from app-admin-ui (liyibass)
* [[`37c3474bb5`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/37c3474bb5)] - **feat**: update atTracking to NewDateTime  in all lists (liyibass)
* [[`39106ff367`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/39106ff367)] - refactor(NewDateTime): remove unuse package and console.log (liyibass)
* [[`ae9b2889c8`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/ae9b2889c8)] - feat(atTracking): customize atTracking's field to NewDateTime, fix NewDateTime time error after saved (liyibass)
* [[`61d727d406`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/61d727d406)] - Merge pull request #40 from mirror-media/previewRouter (nick)
* [[`285d375d1a`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/285d375d1a)] - **feat**: add customize Search component in hook (liyibass)
* [[`ec08fabe27`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/ec08fabe27)] - **feat**: update User access control (liyibass)
* [[`709b69f91a`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/709b69f91a)] - **refactor**: adjust previewApp's folder structure, remove unuse console.log (liyibass)
* [[`abd4f8d9fd`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/abd4f8d9fd)] - **feat**: optimize image upload method and increase speed (liyibass)
* [[`81a101a002`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/81a101a002)] - **refactor**: change blockFieldToAnonymous's name to ListAccessHandler (liyibass)
* [[`b8f95e4919`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/b8f95e4919)] - **fix**: set yarn start back into keystone start (liyibass)
* [[`6c588190d1`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/6c588190d1)] - **refactor**: create new custom app 'PreviewApp' to handle preview route (liyibass)
* [[`2671a4f871`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/2671a4f871)] - **refactor**: set CMS as server's default type (liyibass)
* [[`fee4f8dfe6`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/fee4f8dfe6)] - **rafactor**: put input router into index.js (liyibass)
* [[`f316626e7c`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/f316626e7c)] - **rafactor**: set serviceType's value is came from process.env.K5\_SERVICE\_TYPE (liyibass)
* [[`a656d7fffd`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/a656d7fffd)] - **refactor**: remove unuse code (liyibass)
* [[`bafeeb4207`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/bafeeb4207)] - **feat**: make proxy target url (for tv's preview page) as process.env.K5\_PREVIEW\_URL (liyibass)
* [[`ea60f2ba94`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/ea60f2ba94)] - **feat**: update Post's read access control methods via K5\_SERVICE\_TYPE (liyibass)
* [[`f36b87beb3`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/f36b87beb3)] - **feat**: add preview router (liyibass)
* [[`6eb3ae5c5b`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/6eb3ae5c5b)] - Merge pull request #39 from nickhsine/docs-for-cicd (nick)
* [[`727e857b06`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/727e857b06)] - **docs**: update README.md. Add CI/CD documentation (nickhsine)
* [[`d584b9c092`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/d584b9c092)] - **feat**: adjust preview btn, show btn only in post list (liyibass)
* [[`245ce4bf51`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/245ce4bf51)] - **feat**: add gql anonymous filter in Post, EditorChoice and VideoEditorChoice (liyibass)
* [[`3bc03ae96e`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/3bc03ae96e)] - **feat**: update draft, update embedded code data property (liyibass)
* [[`baf76225e8`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/baf76225e8)] - feat(Preview): add preview btn and its basic function (liyibass)
* [[`29f2689d40`](https://github.com/The KeystoneJS Development Team/example-projects-blank/commit/29f2689d40)] - **feat**: add new logos in login page (liyibass)

## Version 1.0.0
This is initial version.