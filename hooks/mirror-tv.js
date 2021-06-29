// import customedItemHeaderActions from './customedItemHeaderActions';
import React from 'react'
import K5Logo from './components/K5Logo/K5Logo'
import { ItemId, AddNewItem } from '@keystonejs/app-admin-ui/components'
import PreviewBtn from './components/PreviewBtn/PreviewBtn'
import './style/hooks.style.css'
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
}
