import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import { useCurrentUser } from '../../features/Queries/authQuerie';

export default function Home() {
    const {user,} = useSelector(state => state.auth);
    const {isError,isLoading} = useCurrentUser()
    console.log("user in home " , user);
    
    if (isLoading) {
        return <Loading size="large" />;
    }
    
    return (
        <div>
            HOME 
            {user?.userName}
        </div>
    )
}

