// import customedItemHeaderActions from './customedItemHeaderActions';
import React from 'react'
import K5Logo from './components/K5Logo/K5Logo'
import {
    ItemId,
    AddNewItem,
    CreateItem,
} from '@keystonejs/app-admin-ui/components'
import PreviewBtn from './components/PreviewBtn/PreviewBtn'
import './style/hooks.style.css'

import Search from './components/Search/Search'

import { useList } from '@keystonejs/app-admin-ui/client/providers/List'

export default {
    // custom landing page logo
    logo: () => <K5Logo />,
    itemHeaderActions: () => {
        return (
            <div className="item-header-actions">
                <ItemId />
                <PreviewBtn />
                <AddNewItem />
            </div>
        )
    },
    listHeaderActions: () => {
        const { list } = useList()
        return (
            <div className="list-header-actions">
                <Search list={list} />
                <CreateItem />
            </div>
        )
    },
}
