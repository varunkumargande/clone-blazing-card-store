import React, { useState } from 'react'

function getLocalStorageValue(keyName) {
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const currentUser = JSON.parse(window.localStorage?.getItem(keyName))
        return currentUser
    }
}

export const useLocalStorage = (keyName) => {
    const [value, setValue] = useState(() => {
        return getLocalStorageValue(keyName)
    })
    return [value, setValue]
}
