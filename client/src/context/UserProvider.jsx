import React, { useState, createContext, useEffect } from "react";
import axios from 'axios'

const UserContext = createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const UserProvider = (props) => {
    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || '',
        issues: []
    }
    const [comments, setComments] = useState([])
    const [userState, setUserState] = useState(initState)

    const signup = (credentials) => {
        axios.post('/proxy/auth/signup', credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevState => ({
                ...prevState,
                user,
                token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    const login = (credentials) => {
        axios.post('/proxy/auth/login', credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            getUserIssues()
            setUserState(prevState => ({
                ...prevState,
                user,
                token
            }))

        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: '',
            issues: [],
            errMsg: '',
        })
    }

    const handleAuthErr = (errMsg) => {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    const resetAuthErr = () => {
        setUserState(prevState => ({
            ...prevState,
            errMsg: ''
        }))
    }

    const getUserIssues = () => {
        userAxios.get('/proxy/api/issue/user')
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                issues: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const getPublicIssues = () => {
        userAxios.get('/proxy/api/issue/public/issue')
        .then(res => {
            const sorted = res.data.map(item => item).sort((a, b) => b.upVotes.length-a.upVotes.length)
            setUserState(prevState => ({
                ...prevState,
                issues: sorted
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const addIssue = (newIssue) => {
        userAxios.post('/proxy/api/issue', newIssue)
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, res.data]
            }))
            getUserIssues()
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const deleteIssue = (issueId) => {
        userAxios.delete(`/proxy/api/issue/${issueId}`)
        .then(res => setUserState(prevState => (
            {...prevState, issues: prevState.issues.filter(issue => issue._id !== issueId)}
        )))
        .catch(err => console.log(err.response.data.errMsg))
    }

    const upVote = (issueId) => {
            userAxios.put(`/proxy/api/issue/upVote/${issueId}`)
        .then(res => setUserState(prevUserState => (
            {...prevUserState, issues: prevUserState.issues.map(issues => 
                issueId !== issues._id ? issues : res.data)})))
        .catch(err => console.log(err.response.data.errMsg))
    }

    const downVote = (issueId) => {
        userAxios.put(`/proxy/api/issue/downVote/${issueId}`)
        .then(res => setUserState(prevUserState => (
            {...prevUserState, issues: prevUserState.issues.map(issues =>
                 issueId !== issues._id ? issues : res.data)})))
        .catch(err => console.log(err.response.data.errMsg))
    }

    const addComment = (newComment, commentId) => {
        userAxios.post(`/proxy/api/comment/${commentId}`, newComment)
        .then(res => {
            setComments(prevState => ([
                ...prevState,
                res.data
            ]))
            getComments()
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const getComments = () => {
        userAxios.get(`/proxy/api/comment/`)
        .then(res => {
            setComments(res.data)
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const deleteComment = (commentId) => {
        userAxios.delete(`proxy/api/comment/${commentId}`)
        .then(res => setComments(prevState => (
            prevState.filter(item => item._id !== commentId))))
        .catch(err => console.log(err.response.data.errMsg))
    }

    useEffect(()=>{
        getComments()
    }, [userState])

    return(
        <UserContext.Provider 
            value={{
                ...userState,
                signup,
                login,
                logout,
                addIssue,
                deleteIssue,
                getUserIssues,
                addComment,
                getComments,
                deleteComment,
                comments,
                getPublicIssues,
                resetAuthErr,
                upVote,
                downVote,
                setUserState,
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}