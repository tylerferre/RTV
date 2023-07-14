import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import IssueList from './IssueList'

const Public = () => {

    const {issues} = useContext(UserContext)

    return(
        <div className='public'>
            <h3>All Posts</h3>
            <IssueList issues={issues}/>
        </div>
    )
}

export default Public