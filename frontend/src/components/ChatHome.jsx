import React from 'react'
import { useHistory } from 'react-router'
import { SocketContext } from '../context/SocketContextProvider'
import styles from "./ChatHome.module.css"
export const ChatHome = () => {
    const { socket } = React.useContext(SocketContext)
    const history = useHistory()
    // console.log(socket)
    const [userName, setUserName] = React.useState("")
    const [group, setGroupName] = React.useState("")
    let temp = 1
    const GroupSubmitHandler = (e) => {
        e.preventDefault() //Preventing from form submission 
        socket.emit("joinGroup", { userName, group }, error => {
            temp = null
            if (error) {
                alert(error)
            }
            history.push("/")
        }) // Users Getting added to the Group
        // console.log(temp)
        if (temp) {
            history.push(`/chat?name=${userName}&room=${group}`)
            // console.log("hello")
        }
        // Redirecting to the chat group
        // pathname: `/chat`,

        // state: { group, userName }
        // )
    }
    // console.log(history)
    const inputMargin = `${styles.InnerContainer_input} ${styles.margin20}`
    return (
        <div className={styles.chatLoginContainer}>
            <div className={styles.InnerContainer}>
                <div className={styles.InnerContainer_header}>
                    <h1>Welcome To Chat Room</h1>
                    <p>Type your Name, Your desired group name. <br /> Invite your friends to have fun😃.</p>
                </div>
                <form onSubmit={GroupSubmitHandler}>
                    <input type="text" value={userName} placeholder="Enter User Name" onChange={(e) => setUserName(e.target.value)} required className={inputMargin} />
                    <br />
                    <input type="text" value={group} placeholder="Ex. JavaScript" onChange={(e) => setGroupName(e.target.value)} required className={inputMargin} />
                    <br />
                    <button type="submit" className={styles.InnerContainer_Btn}>Join Group</button>
                </form>
            </div>
        </div >
    )
}
