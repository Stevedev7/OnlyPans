import { useEffect, useState } from "react"
import { useLazyVerifyQuery } from '../slices/usersApi'
import { useDispatch } from "react-redux";
import { removeUserId, removeUserName, setAuthenticated, setUserId, setUserName } from "../slices/auth";


export const useVerify = ({token }: { token: string | null}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [verify, { error }] = useLazyVerifyQuery();
    const dispatch = useDispatch();
    useEffect(() => {
        verify(token as string)
            .then((res) => res)
                .then((data) => {
                    if(data.error){
                        setIsAuthenticated(false)
                        removeUserName()
                        removeUserId()
                    } else {
                        dispatch(setUserName(data.data.data.valid.emailId))
                        dispatch(setUserId(data.data.data.valid.id))
                        dispatch(setAuthenticated(true))
                        setIsAuthenticated(true)
                    }
                })
                    .catch(error => alert(JSON.stringify(error)))
    }, [token])
    return isAuthenticated
}