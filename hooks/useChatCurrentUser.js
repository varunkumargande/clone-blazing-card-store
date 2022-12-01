import React, { useState } from 'react'

function getChatCurrentUser(keyName) {
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const currentUser = JSON.parse(window.localStorage?.getItem(keyName))
        return currentUser
    }
}

export const useChatCurrentUser = (keyName) => {
    const [value, setValue] = useState(() => {
        return getChatCurrentUser(keyName)
    })
    return [value, setValue]
}
