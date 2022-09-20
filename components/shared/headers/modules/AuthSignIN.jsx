import React from 'react'
//import {ConnectPlugin} from '../../../connectPlugins';
import AccountQuickLinks from './AccountQuickLinks'
import SignINLINks from './SignINLINks';
function AuthSignIN({ auth }) {

  console.log(auth.isLoggedIn)

  return (
    <>
      {auth.isLoggedIn && Boolean(auth.isLoggedIn) ? (<AccountQuickLinks isLoggedIn={true} />) :
        (
          <>
            <SignINLINks />
          </>
        )}
    </>
  )
}
export default AuthSignIN